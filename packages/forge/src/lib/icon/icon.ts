import { customElement, attachShadowTemplate, coreProperty, coerceBoolean } from '@tylertech/forge-core';
import { IconAdapter } from './icon-adapter';
import { IconCore } from './icon-core';
import { ICON_CONSTANTS, IconUrlBuilder, IconExternalType, IconTheme } from './icon-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './icon.html';
import styles from './icon.scss';

export interface IIconProperties {
  name: string | undefined;
  src: string | undefined;
  lazy: boolean;
  external: boolean;
  /** @deprecated This will be removed in a future version. */
  externalType: IconExternalType;
  externalUrlBuilder: IconUrlBuilder;
  theme: IconTheme;
  viewbox: string;
}

export interface IIconComponent extends IIconProperties, IBaseComponent {
  layout(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon': IIconComponent;
  }
}

/**
 * @tag forge-icon
 *
 * @summary Icons are used to represent information visually. The icon component is a wrapper around SVG icons that are registered in the icon registry.
 *
 * @property {string} name - The name of the icon to render.
 * @property {string} src - Provides the ability to set the SVG string content directly.
 * @property {boolean} [lazy=false] - Controls whether the icon will be loaded dynamically when it comes into view. False by default.
 * @property {boolean} [external=false] - Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't already defined in the registry.
 * @property {IconExternalType} [externalType="all"] - **(Deprecated)** The type of icon to load externally. Possible values: "all" (default), "standard", "extended", "custom".
 * @property {IconUrlBuilder} externalUrlBuilder - A callback that can be provided to generate a URL that will be used to fetch an SVG icon.
 * @property {string} viewbox - A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
 * @property {IconTheme} theme - The theme to apply to the icon.
 *
 * @attribute {string} name - The name of the icon to render.
 * @attribute {string} src - Provides the ability to set the SVG string content directly.
 * @attribute {boolean} [lazy=false] - Controls whether the icon will be loaded dynamically when it comes into view. False by default.
 * @attribute {boolean} [external=false] - Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't already defined in the registry.
 * @attribute {string} viewbox - A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
 * @attribute {IconTheme} theme - The theme to apply to the icon.
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
@customElement({
  name: ICON_CONSTANTS.elementName
})
export class IconComponent extends BaseComponent implements IIconComponent {
  public static get observedAttributes(): string[] {
    return Object.values(ICON_CONSTANTS.observedAttributes);
  }

  private _core: IconCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new IconCore(new IconAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_CONSTANTS.observedAttributes.NAME:
        this.name = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.SRC:
        this.src = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.LAZY:
        this.lazy = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.observedAttributes.EXTERNAL:
        this.external = coerceBoolean(newValue);
        break;
      case ICON_CONSTANTS.observedAttributes.EXTERNAL_TYPE:
        this.externalType = newValue as IconExternalType;
        break;
      case ICON_CONSTANTS.observedAttributes.VIEWBOX:
        this.viewbox = newValue;
        break;
      case ICON_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as IconTheme;
        break;
    }
  }

  /**
   * The name of the icon within the icon registry to be used.
   */
  @coreProperty()
  declare public name: string | undefined;

  /**
   * Provides the ability to set the SVG string content directly.
   */
  @coreProperty()
  declare public src: string | undefined;

  /**
   * Controls whether the icon will be loaded dynamically when it comes into view. False by default.
   */
  @coreProperty()
  declare public lazy: boolean;

  /**
   * Controls whether external network requests are allowed for this icon. Only pertains for icons that aren't defined in the registry.
   */
  @coreProperty()
  declare public external: boolean;

  /**
   * The type of icon to load externally. Possible values: "standard", "extended", "custom".
   * @deprecated This will be removed in a future version.
   * @attribute external-type
   */
  @coreProperty()
  declare public externalType: IconExternalType;

  /**
   * A callback that can be provided to generate a URL that will be used to fetch an SVG icon.
   * @attribute external-url-builder
   */
  @coreProperty()
  declare public externalUrlBuilder: IconUrlBuilder;

  /**
   * A custom value to apply to the `viewBox` attribute on the internal `<svg>` element.
   */
  @coreProperty()
  declare public viewbox: string;

  @coreProperty()
  declare public theme: IconTheme;

  /**
   * Forces a reload of the icon.
   */
  public layout(): void {
    this._core.layout();
  }
}
