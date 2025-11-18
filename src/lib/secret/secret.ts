import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element';
import { setDefaultAria } from '../core/utils/a11y-utils';
import { toggleState } from '../core/utils/utils';

import styles from './secret.scss';

export type SecretVariant = 'blur' | 'dots';

export const SECRET_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-secret';

/**
 * @tag forge-secret
 * @summary A component that conceals inline content with a blur or dots effect, revealing it on user interaction.
 *
 * @description
 * The secret component overlays a button on content to hide it with visual effects (blur or dots).
 * Content is revealed on click/keyboard interaction, with optional hover reveal. Multiple instances
 * sharing a name act as a radio group where only one can be revealed at a time.
 *
 * @cssproperty --forge-secret-blur - The blur intensity for the blur variant. Default: spacing.variable(xsmall)
 * @cssproperty --forge-secret-button-shape - The shape of the button. Default: shape.variable(medium)
 * @cssproperty --forge-secret-label-background - Background color of the label. Default: theme.variable(surface-inverse)
 * @cssproperty --forge-secret-label-color - Text color of the label. Default: theme.variable(on-surface-inverse)
 * @cssproperty --forge-secret-label-padding - Padding around the label. Default: spacing.variable(xxxsmall) spacing.variable(xsmall)
 * @cssproperty --forge-secret-label-shape - The shape of the label. Default: shape.variable(full)
 * @cssproperty --forge-secret-icon-size - Size of the icon. Default: typography.font-size-relative('1000')
 * @cssproperty --forge-secret-transition-duration - Animation duration for reveal/conceal transitions. Default: animation.variable(duration-short4)
 *
 * @slot - Default slot for the secret content (displayed inline after label)
 * @slot label - Optional label displayed inline before the secret content
 * @slot visible-icon - Custom icon to show when content is visible
 * @slot hidden-icon - Custom icon to show when content is hidden
 *
 * @state visible - Indicates whether the content is currently visible
 *
 * @csspart root - The root container span
 * @csspart content - The content container
 * @csspart button - The overlay button
 * @csspart label - The label container
 * @csspart icon - The icon container
 *
 * @fires {CustomEvent<{visible: boolean}>} forge-secret-change - Dispatched when the visible state changes
 */
@customElement(SECRET_TAG_NAME)
export class SecretComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SECRET_TAG_NAME;

  /** Whether the secret content is currently visible */
  @property({ type: Boolean })
  public visible = false;

  /** The visual effect variant to apply when content is hidden */
  @property({ type: String })
  public variant: SecretVariant = 'blur';

  /** Whether to reveal content on hover/focus in addition to click */
  @property({ type: Boolean, attribute: 'show-on-hover' })
  public showOnHover = false;

  /** Whether the label is hidden */
  @property({ type: Boolean, attribute: 'no-label' })
  public noLabel = false;

  /** Group name for radio-like behavior. Only one secret with the same name can be visible at a time */
  @property({ type: String })
  public name = '';

  @query('[aria-live]')
  private _liveRegion?: HTMLElement;

  @queryAssignedNodes({ flatten: true })
  private _contentNodes: NodeListOf<ChildNode>;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override firstUpdated(): void {
    setDefaultAria(this, this.#internals, { role: 'group', ariaLabel: 'secret' });
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('visible')) {
      toggleState(this.#internals, 'visible', this.visible);

      // Handle radio group behavior
      if (this.visible && this.name) {
        this.#hideOtherSecretsInGroup();
      }
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('visible')) {
      // Announce content to screen readers when revealed
      if (!this._liveRegion) {
        return;
      }

      if (this.visible) {
        const contentText = Array.from(this._contentNodes)
          .map(node => node.textContent)
          .join(' ')
          .trim();
        this._liveRegion.textContent = contentText || '';
      } else {
        this._liveRegion.textContent = '';
      }
    }
  }

  #handleClick(): void {
    this.visible = !this.visible;
    this.#dispatchChangeEvent();
  }

  #handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.visible) {
      event.stopPropagation();
      this.visible = false;
      this.#dispatchChangeEvent();
    }
  }

  #hideOtherSecretsInGroup(): void {
    const root = this.getRootNode() as Document | ShadowRoot;
    const allSecrets = Array.from(root.querySelectorAll<SecretComponent>('forge-secret'));

    allSecrets
      .filter(secret => secret !== this && secret.name === this.name && secret.visible)
      .forEach(secret => {
        secret.visible = false;
        secret.#dispatchChangeEvent();
      });
  }

  #dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent('forge-secret-change', {
        detail: { visible: this.visible },
        bubbles: true,
        composed: true
      })
    );
  }

  #renderIcon(): TemplateResult | typeof nothing {
    if (this.variant !== 'dots') {
      return nothing;
    }

    return html`
      <span class="icon" part="icon">
        ${this.visible
          ? html`
              <slot name="visible-icon">
                <forge-icon name="eye_off"></forge-icon>
              </slot>
            `
          : html`
              <slot name="hidden-icon">
                <forge-icon name="eye"></forge-icon>
              </slot>
            `}
      </span>
    `;
  }

  #renderStateLayer(): TemplateResult {
    return html`<forge-state-layer target=":host"></forge-state-layer>`;
  }

  #renderTooltip(): TemplateResult | typeof nothing {
    if (!this.visible && !this.noLabel && !this.showOnHover) {
      return nothing;
    }

    return html`<forge-tooltip anchor="button" placement="top">${this.visible ? 'Hide' : 'Show'}</forge-tooltip>`;
  }

  public render(): TemplateResult {
    const showLabel = !this.noLabel && this.variant !== 'dots';

    return html`
      <span part="root" class=${classMap({ 'forge-secret': true, 'show-on-hover': this.showOnHover })} @click="${this.#handleClick}">
        <span
          ?inert=${!this.visible}
          part="content"
          class=${classMap({ content: true, blur: !this.visible && this.variant === 'blur', dots: !this.visible && this.variant === 'dots' })}>
          ${this.#renderIcon()}
          <slot></slot>
        </span>
        <button type="button" part="button" id="button" aria-expanded="${this.visible}" @keydown="${this.#handleKeyDown}">
          <div part="label" class=${classMap({ label: true, 'label--hidden': !showLabel })}>
            <slot name="label">Show</slot>
            ${showLabel ? this.#renderStateLayer() : nothing}
          </div>
          <forge-focus-indicator></forge-focus-indicator>
          ${this.variant === 'dots' ? this.#renderStateLayer() : nothing}
        </button>
        ${this.#renderTooltip()}
        <div class="announcer" aria-live="polite" aria-atomic="true"></div>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-secret': SecretComponent;
  }
}
