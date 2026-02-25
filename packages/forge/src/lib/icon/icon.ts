import { CUSTOM_ELEMENT_NAME_PROPERTY, isDefined } from '@tylertech/forge-core';
import { PropertyValues, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { ICON_CONSTANTS, IconExternalType, IconTheme, IconUrlBuilder } from './icon-constants.js';
import { IconRegistry, IIconDescriptor } from './icon-registry.js';
import { awaitIconDefinition, createSanitizedSvg, fetchIconContent, getCachedIcon, removeIconListener, sanitizeExternalType } from './icon-utils.js';

import styles from './icon.scss';

export interface IIconProperties {
  name?: string;
  src?: string;
  lazy: boolean;
  external: boolean;
  /** @deprecated This will be removed in a future version. */
  externalType: IconExternalType;
  externalUrlBuilder?: IconUrlBuilder;
  theme?: IconTheme;
  viewbox?: string;
}

/** @deprecated - This will be removed in the future. Please switch to using IconComponent. */
export interface IIconComponent extends IIconProperties, IBaseComponent {
  layout(): void;
}

/**
 * @tag forge-icon
 *
 * @summary Icons are used to represent information visually. The icon component is a wrapper around SVG icons that are registered in the icon registry.
 *
 * @cssproperty --forge-icon-color - The color of the icon.
 * @cssproperty --forge-icon-size - The size of the icon. Defaults to the font-size of the context it is placed in.
 * @cssproperty --forge-icon-width - The width of the icon.
 * @cssproperty --forge-icon-height - The height of the icon.
 * @cssproperty --forge-icon-font-size - The font size of the icon.
 *
 * @csspart svg - The internal SVG element.
 *
 * @cssclass forge-icon - The icon element.
 */
@customElement(ICON_CONSTANTS.elementName)
export class IconComponent extends BaseLitElement implements IIconComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = ICON_CONSTANTS.elementName;

  // TODO: Remove attribute reflection
  // TODO: Clarify types -- do any of these truly allow undefined values? Should the documentation reflect that?

  /**
   * The name of the icon to render.
   * @attribute
   */
  public set name(value: string | undefined) {
    if (isDefined(value)) {
      this.#name = value?.replace(/\s+/, '');
    } else {
      this.#name = undefined;
    }
  }
  @property({ reflect: true })
  public get name(): string | undefined {
    return this.#name;
  }
  #name?: string;

  /**
   * Provides the ability to set the SVG string content directly.
   * @attribute
   */
  @property({ reflect: true })
  public src?: string;

  /**
   * Controls whether the icon will be loaded dynamically when it comes into view.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public lazy = false;

  /**
   * Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't already defined in the registry.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public external = false;

  /**
   * **(Deprecated)** The type of icon to load externally. Possible values: "all" (default), "standard", "extended", "custom".
   * @default "all"
   * @attribute
   * @deprecated The icon libraries are no longer split into separate types.
   */
  @property({ attribute: 'external-type', reflect: true })
  public set externalType(value: IconExternalType) {
    this.#externalType = sanitizeExternalType(value);
  }
  public get externalType(): IconExternalType {
    return this.#externalType;
  }
  #externalType: IconExternalType = 'all';

  /**
   * A callback that can be provided to generate a URL that will be used to fetch an SVG icon.
   */
  @property({ attribute: false })
  public externalUrlBuilder?: IconUrlBuilder;

  /**
   * A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
   * @attribute
   */
  @property({ reflect: true })
  public viewbox?: string;

  /**
   * The theme to apply to the icon.
   * @attribute
   */
  @property({ reflect: true })
  public theme?: IconTheme;

  #applyTimer?: number;
  #visibilityObserver?: IntersectionObserver;
  #registrationListener?: () => void;

  public connectedCallback(): void {
    super.connectedCallback();
    this.#applyIcon();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#visibilityObserver?.disconnect();
    this.#tryRemoveRegistrationListener(this.name);
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('name') || changedProperties.has('external')) {
      this.#tryRemoveRegistrationListener(changedProperties.get('name') ?? this.name);
    }

    const applyOnProps: (keyof IconComponent)[] = ['name', 'src', 'lazy', 'external', 'externalType', 'externalUrlBuilder'];
    if (applyOnProps.some(prop => changedProperties.has(prop))) {
      this.#safeApplyIcon();
    }

    if (changedProperties.has('viewbox')) {
      this.#setViewBox(this.viewbox);
    }
  }

  //
  // Public Methods
  //

  public layout(): void {
    if (this.isConnected) {
      this.#applyIcon();
    }
  }

  //
  // Retrieval and Rendering
  //

  #applyIcon(): void {
    if (this.lazy && !!window.IntersectionObserver) {
      this.#initVisibilityObserver();
    } else {
      this.#loadIcon();
    }
  }

  #safeApplyIcon(): void {
    if (this.isConnected) {
      this.#clearIconQueue();
      this.#queueIconUpdate();
    }
  }

  #clearIconQueue(): void {
    if (this.#applyTimer) {
      clearTimeout(this.#applyTimer);
      this.#applyTimer = undefined;
    }
  }

  #queueIconUpdate(): void {
    this.#applyTimer = window.setTimeout(() => {
      this.#applyTimer = undefined;
      this.#applyIcon();
    });
  }

  async #loadIcon(): Promise<void> {
    try {
      if (this.src) {
        // We were provided direct icon source content so just set that
        const node = createSanitizedSvg(this.src);
        this.#setContent(node);
      } else if (this.name) {
        // Let's attempt to get our icon from the registry
        const descriptor = this.#tryGetIcon(this.name);

        // Short circuit here if we already have the node from a previous usage
        if (descriptor?.node) {
          return this.#setContent(descriptor.node);
        }

        let svgEl: SVGElement | null = null;

        if (!descriptor) {
          if (!this.external) {
            // We attach a listener to the registry to let us know when the icon is registered
            this.#registrationListener = () => this.#applyIcon();
            awaitIconDefinition(this.name, this.#registrationListener);

            // For now, we render nothing...
            return this.#setContent(null);
          }

          // We don't have a registry icon, so let's try the network to fetch it
          if (!this.externalType) {
            this.externalType = 'standard';
          }

          const url = this.#getExternalUrl(this.name, this.externalType);
          if (url) {
            const content = await fetchIconContent(url, this.name);
            if (content) {
              svgEl = createSanitizedSvg(content, this.viewbox);
            }
          }
        } else if (descriptor.raw) {
          svgEl = createSanitizedSvg(descriptor.raw, this.viewbox);
        }

        if (svgEl) {
          if (!descriptor?.node) {
            // Store the node for future use to improve performance
            IconRegistry.setNode(this.name, svgEl);
          }
          this.#setContent(svgEl);
        }
      } else {
        this.#setContent(null);
      }
    } catch (e) {
      this.#setContent(null);
      throw e;
    }
  }

  #tryGetIcon(key: string): IIconDescriptor | undefined {
    return getCachedIcon(key);
  }

  #setContent(svgElement: SVGElement | null): void {
    const shadowRoot = this.shadowRoot as ShadowRoot;
    shadowRoot.querySelectorAll(':not(style)').forEach(child => child.remove());

    const clone = svgElement?.cloneNode(true) as SVGElement | null;
    if (!clone) {
      return;
    }

    if (this.viewbox) {
      clone.setAttribute('viewBox', this.viewbox);
    }
    clone.part = 'svg';
    clone.setAttribute('aria-hidden', 'true');
    shadowRoot.appendChild(clone);
  }

  #setViewBox(viewbox?: string): void {
    const svgElement = this.shadowRoot?.querySelector('svg');
    if (viewbox) {
      return svgElement?.setAttribute('viewBox', viewbox);
    }
    svgElement?.removeAttribute('viewBox');
  }

  //
  // Lazy Loading
  //

  #initVisibilityObserver(): void {
    this.#visibilityObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          this.#destroyVisibilityObserver();
          this.#loadIcon();
        }
      },
      { rootMargin: `${ICON_CONSTANTS.numbers.LAZY_ROOT_MARGIN}px` }
    );
    this.#visibilityObserver.observe(this);
  }

  //
  // External
  //

  #getExternalUrl(name: string, type: IconExternalType): string {
    if (typeof this.externalUrlBuilder === 'function') {
      return this.externalUrlBuilder(name, type);
    }

    const setName = sanitizeExternalType(this.externalType);
    if (['standard', 'extended', 'custom'].includes(setName)) {
      return `${ICON_CONSTANTS.strings.DEFAULT_NETWORK_BASE_URL}/${setName}/${name}.svg`;
    }

    return `${ICON_CONSTANTS.strings.ALL_NETWORK_BASE_URL}/${name}.svg`;
  }

  //
  // Teardown Logic
  //

  #tryRemoveRegistrationListener(key?: string): void {
    if (key && this.#registrationListener) {
      removeIconListener(key, this.#registrationListener);
      this.#registrationListener = undefined;
    }
  }

  #destroyVisibilityObserver(): void {
    this.#visibilityObserver?.disconnect();
    this.#visibilityObserver = undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon': IIconComponent;
  }
}
