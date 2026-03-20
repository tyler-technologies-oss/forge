import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, LiveAnnouncer } from '@tylertech/forge-core';
import { tylIconEyeClosed, tylIconEyeOutline } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { toggleState } from '../core/utils/utils.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { TooltipComponent } from '../tooltip/index.js';
import { ButtonComponent } from '../button/index.js';

import styles from './secret.scss';

export type SecretVariant = 'blur' | 'dots';
export type SecretButtonPosition = 'start' | 'end';

export const SECRET_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-secret';

/**
 * @tag forge-secret
 *
 * @summary A component that conceals content with a blur or dot mask, revealing it on user interaction.
 *
 * @description
 * The secret component blurs or masks content and provides a connected button to reveal it.
 * Content is revealed on click/keyboard interaction, with optional hover reveal. Multiple instances
 * sharing a name act as a radio group where only one can be revealed at a time.
 *
 * @cssproperty --forge-secret-blur - The radius of the blur effect.
 * @cssproperty --forge-secret-gap - The space between the button and content.
 * @cssproperty --forge-secret-button-background - The background color of the button.
 * @cssproperty --forge-secret-button-color - The text and icon color of the button.
 * @cssproperty --forge-secret-button-shape - The button's border radius.
 * @cssproperty --forge-secret-icon-size - The icon's size.
 * @cssproperty --forge-secret-text-button-shape - The text button's border radius.
 * @cssproperty --forge-secret-text-decoration-line - The decoration line applied to open inline content.
 * @cssproperty --forge-secret-text-decoration-style - The style of the text decoration line.
 * @cssproperty --forge-secret-text-decoration-color - The color of the text decoration line.
 * @cssproperty --forge-secret-text-underline-offset - The spacing between the inline content and the text decoration line.
 * @cssproperty --forge-secret-transition-duration - The duration of transitions.
 * @cssproperty --forge-secret-transition-easing - The timing function of transitions.
 *
 * @slot - Default slot for the secret content
 * @slot visible-icon - An icon that is shown when the secret is visible
 * @slot hidden-icon - An icon that is shown when the secret is hidden
 * @slot label - Text content that appears in the tooltip attached to the button or as the button text when set to block
 *
 * @state open - Indicates that the content is visible
 * @state block - Indicates that the secret is displayed as a block element instead of inline
 *
 * @csspart root - The root container
 * @csspart content - The content container
 * @csspart button - The toggle button element
 * @csspart text-button - The toggle button element when the secret is set to block
 *
 * @fires {ToggleEvent} toggle - Dispatched when the secret opens or closes
 */
@customElement(SECRET_TAG_NAME)
export class SecretComponent extends BaseLitElement {
  static {
    IconRegistry.define([tylIconEyeOutline, tylIconEyeClosed]);
  }

  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SECRET_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonComponent, IconButtonComponent, IconComponent, TooltipComponent];

  /**
   * Whether the secret content is visible.
   * @attribute
   * @default false
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * The style applied to hidden content when the secret is set to inline. Possible values are blur and dots.
   * @attribute
   * @default 'blur'
   */
  @property()
  public variant: SecretVariant = 'blur';

  /**
   * The mask pattern to use with the dots variant. When empty the slotted text content is used as the mask.
   * @attribute
   * @default ''
   */
  @property()
  public mask = '';

  /**
   * The character to replace characters with in the dots variant.
   * @attribute mask-character
   * @default '●'
   */
  @property({ attribute: 'mask-character' })
  public maskCharacter = '●';

  /**
   * Characters that will not be replaced by the mask character in the dots variant.
   * @attribute
   * @default ''
   */
  @property()
  public allow = '';

  /**
   * Whether the secret content should be displayed as a block element instead of inline with text.
   * @attribute
   * @default false
   */
  @property({ type: Boolean })
  public block = false;

  /**
   * The position of the button when the secret is set to inline. Possible values are start and end.
   * @attribute button-position
   * @default 'end'
   */
  @property({ attribute: 'button-position' })
  public buttonPosition: SecretButtonPosition = 'end';

  /**
   * Whether to reveal content on hover/focus in addition to clicks.
   * @attribute show-on-hover
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-on-hover' })
  public showOnHover = false;

  /**
   * When set, secrets with the same name will close when another secret with that name is opened.
   * @attribute
   * @default ''
   */
  @property({ reflect: true })
  public name = '';

  @query(':is(forge-button, forge-icon-button)')
  private _buttonElement!: ButtonComponent | IconButtonComponent;

  @queryAssignedNodes({ flatten: true })
  private _contentNodes: NodeListOf<ChildNode>;

  @state()
  private _mask = '';

  #toggleTextRef = createRef();

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override firstUpdated(): void {
    setDefaultAria(this, this.#internals, { role: 'group', ariaLabel: 'secret' });
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('block')) {
      toggleState(this.#internals, 'block', this.block);
    }
    if (changedProperties.has('open')) {
      toggleState(this.#internals, 'open', this.open);

      if (this.open && this.name) {
        this.#hideOtherSecretsInGroup();
      }
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    this.#tryUpdateInternalMask(changedProperties);
    if (changedProperties.has('open') && this.open) {
      this.#announceContent();
    }
  }

  public render(): TemplateResult {
    return html`
      <span
        part="root"
        class=${classMap({ 'forge-secret': true, reverse: this.buttonPosition === 'start', 'show-on-hover': this.showOnHover })}
        @click="${this.#handleClick}">
        <span
          class=${classMap({
            content: true,
            blur: !this.open && (this.block || this.variant === 'blur'),
            dots: !this.open && !this.block && this.variant === 'dots'
          })}
          part="content"
          ?inert=${!this.open}
          data-mask=${this._mask || nothing}>
          <slot></slot>
        </span>
        ${this.block ? this.#renderTextButton() : this.#renderIconButton()}
      </span>
    `;
  }

  #renderTextButton(): TemplateResult {
    return html`
      <forge-button
        class="text-button"
        exportparts="text-button"
        dense
        aria-expanded="${this.open}"
        .ariaControlsElements=${[this]}
        @keydown="${this.#handleKeyDown}">
        ${this.#renderIcon()}
        <slot name="label">${this.open ? 'Hide' : 'Show'}</slot>
      </forge-button>
    `;
  }

  #renderIconButton(): TemplateResult {
    const buttonAriaLabelledByElements: Element[] = [this];
    if (this.#toggleTextRef.value) {
      buttonAriaLabelledByElements.unshift(this.#toggleTextRef.value);
    }
    return html`
      <span hidden ${ref(this.#toggleTextRef)}>Toggle</span>
      <forge-icon-button
        class="button"
        exportparts="button"
        aria-expanded="${this.open}"
        .ariaControlsElements=${[this]}
        .ariaLabelledByElements=${buttonAriaLabelledByElements}
        @keydown="${this.#handleKeyDown}">
        ${this.#renderIcon()}
      </forge-icon-button>
      <forge-tooltip anchor="button" placement="top">
        <slot name="label">${this.open ? 'Hide' : 'Show'}</slot>
      </forge-tooltip>
    `;
  }

  #renderIcon(): TemplateResult {
    return html`
      <slot name="${this.open ? 'visible-icon' : 'hidden-icon'}">
        <forge-icon class="icon" .name=${this.open ? 'eye_closed' : 'eye_outline'}></forge-icon>
      </slot>
    `;
  }

  #handleClick(evt: PointerEvent): void {
    const didClickButton = evt.composedPath().indexOf(this._buttonElement) !== -1;
    if (!didClickButton) {
      // Ignore clicks from the content when visible
      if (this.open) {
        return;
      }
      // Focus the button as if it were clicked instead of the content
      this._buttonElement.focus({ focusVisible: false });
    }

    this.open = !this.open;
    this.#dispatchToggleEvent();
  }

  #handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open) {
      event.stopPropagation();
      this.open = false;
      this.#dispatchToggleEvent();
    }
  }

  #hideOtherSecretsInGroup(): void {
    const root = this.getRootNode() as Document | ShadowRoot;
    const allSecrets = Array.from(root.querySelectorAll<SecretComponent>('forge-secret'));
    allSecrets
      .filter(secret => secret !== this && secret.name === this.name && secret.open)
      .forEach(secret => {
        secret.open = false;
        secret.#dispatchToggleEvent();
      });
  }

  #dispatchToggleEvent(): void {
    const event = new ToggleEvent('toggle', { oldState: (!this.open).toString(), bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  #getTextContent(): string {
    return Array.from(this._contentNodes)
      .map(node => node.textContent)
      .join(' ')
      .trim();
  }

  #announceContent(): void {
    LiveAnnouncer.instance.announce(this.#getTextContent(), 'polite');
  }

  #tryUpdateInternalMask(changedProperties: PropertyValues<this>): void {
    if (this.block || this.variant === 'blur') {
      return;
    }

    const maskRelatedProperties: (keyof SecretComponent)[] = ['allow', 'block', 'mask', 'maskCharacter', 'variant'];
    if (!maskRelatedProperties.some(prop => changedProperties.has(prop))) {
      return;
    }

    const content = this.mask || this.#getTextContent();
    const regex = new RegExp(`[^${this.allow.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`, 'g');
    this._mask = content.replace(regex, this.maskCharacter);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-secret': SecretComponent;
  }
}
