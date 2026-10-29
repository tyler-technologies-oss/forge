import { consume, ContextRoot } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons';
import { html, nothing, TemplateResult, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { removeDefaultAttribute, removeEmptyAttribute } from '../../core/utils/lit-utils.js';
import { FocusIndicatorComponent, IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import { IconButtonComponent } from '../../icon-button/index.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IconComponent } from '../../icon/icon.js';
import { IStateLayerComponent, StateLayerComponent } from '../../state-layer/index.js';
import { CHIP_SET_CONSTANTS, CHIP_SET_DENSE, CHIP_SET_DISABLED, CHIP_SET_INVALID, CHIP_SET_THEME, CHIP_SET_TYPE } from '../chip-set/chip-set-constants.js';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipNavigateEventData, IChipSelectEventData } from './chip-constants.js';

import styles from './chip.scss';

/** @deprecated - This will be removed in the future. Please switch to using ChipComponent. */
export interface IChipComponent extends BaseLitElement {
  type: ChipType;
  value: unknown;
  selected: boolean;
  invalid: boolean;
  disabled: boolean;
  dense: boolean;
  theme: ChipTheme;
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
  removeButtonLabel?: string;
  focusRemoveButton(): void;
}

declare global {
  interface HTMLElementEventMap {
    'forge-chip-delete': CustomEvent<IChipDeleteEventData>;
    'forge-chip-select': CustomEvent<IChipSelectEventData>;
  }
}

type ChipSetInheritedProperty = 'type' | 'dense' | 'disabled' | 'invalid' | 'theme';

const CHIP_TYPES: ChipType[] = ['action', 'choice', 'filter', 'input', 'field'];
const SELECTABLE_CHIP_TYPES: ChipType[] = ['filter', 'choice', 'input'];
const CHIP_SET_DEFAULTS: Record<ChipSetInheritedProperty, unknown> = {
  type: CHIP_CONSTANTS.defaults.TYPE,
  dense: false,
  disabled: false,
  invalid: false,
  theme: CHIP_CONSTANTS.defaults.THEME
};

/**
 * @summary A compact, interactive element that represents an entity, action, or attribute with support for selection, removal, and various styling options.
 *
 * @tag forge-chip
 *
 * @fires {CustomEvent<IChipDeleteEventData>} forge-chip-delete - Event fired when the chip is deleted.
 * @fires {CustomEvent<IChipSelectEventData>} forge-chip-select - Event fired when the chip is selected.
 *
 * @cssproperty --forge-chip-background - The background color of the chip.
 * @cssproperty --forge-chip-color - The background color of the chip.
 * @cssproperty --forge-chip-shape - The shape of the chip.
 * @cssproperty --forge-chip-spacing - The spacing between chips.
 * @cssproperty --forge-chip-height - The height of the chip.
 * @cssproperty --forge-chip-padding-inline - The inline padding of the chip.
 * @cssproperty --forge-chip-padding-block - The block padding of the chip.
 * @cssproperty --forge-chip-cursor - The cursor style of the chip.
 * @cssproperty --forge-chip-icon-font-size - The font size of the chip icon.
 * @cssproperty --forge-chip-focus-indicator-color - The color of the focus indicator.
 * @cssproperty --forge-chip-disabled-opacity - The opacity of the disabled chip.
 * @cssproperty --forge-chip-disabled-cursor - The cursor style of the disabled chip.
 * @cssproperty --forge-chip-dense-height - The height of the dense chip.
 * @cssproperty --forge-chip-dense-padding-inline - The inline padding of the dense chip.
 * @cssproperty --forge-chip-dense-spacing - The spacing between dense chips.
 * @cssproperty --forge-chip-dense-font-size - The font size of the dense chip.
 * @cssproperty --forge-chip-dense-font-weight - The font weight of the dense chip.
 * @cssproperty --forge-chip-dense-focus-indicator-offset - The offset of the focus indicator for dense chips.
 * @cssproperty --forge-chip-dense-icon-font-size - The font size of the icon in dense chips.
 * @cssproperty --forge-chip-remove-button-spacing - The spacing of the remove button in chips.
 * @cssproperty --forge-chip-remove-button-height-dense - The height of the remove button in dense chips.
 * @cssproperty --forge-chip-remove-button-icon-size-dense - The icon size of the remove button in dense chips.
 * @cssproperty --forge-chip-remove-button-spacing-dense - The spacing of the remove button in dense chips.
 * @cssproperty --forge-chip-selected-background - The background color of the selected chip.
 * @cssproperty --forge-chip-selected-color - The text color of the selected chip.
 * @cssproperty --forge-chip-invalid-color - The text color of the invalid chip.
 * @cssproperty --forge-chip-invalid-selected-background - The background color of the invalid selected chip.
 * @cssproperty --forge-chip-invalid-selected-color - The text color of the invalid selected chip.
 * @cssproperty --forge-chip-border-width - The width of the chip border.
 * @cssproperty --forge-chip-border-style - The style of the chip border.
 * @cssproperty --forge-chip-border-color - The color of the chip border.
 * @cssproperty --forge-chip-field-background - The background color of the chip field.
 * @cssproperty --forge-chip-field-color - The text color of the chip field.
 * @cssproperty --forge-chip-field-shape - The shape of the chip field.
 * @cssproperty --forge-chip-field-border-color - The color of the chip field border.
 * @cssproperty --forge-chip-field-cursor - The cursor style of the chip field.
 * @cssproperty --forge-chip-checkmark-size - The size of the checkmark in chips.
 * @cssproperty --forge-chip-checkmark-color - The color of the checkmark in chips.
 * @cssproperty --forge-chip-checkmark-spacing - The spacing of the checkmark in chips.
 * @cssproperty --forge-chip-avatar-size - The size of the avatar in chips.
 * @cssproperty --forge-chip-avatar-size-dense - The size of the avatar in dense chips.
 * @cssproperty --forge-chip-avatar-font-size - The font size of the avatar in chips.
 * @cssproperty --forge-chip-avatar-font-size-dense - The font size of the avatar in dense chips.
 * @cssproperty --forge-chip-avatar-spacing - The spacing of the avatar in chips.
 * @cssproperty --forge-chip-avatar-spacing-dense - The spacing of the avatar in dense chips.
 * @cssproperty --forge-chip-transition-duration - The duration of the chip transition.
 * @cssproperty --forge-chip-transition-easing - The easing function of the chip transition.
 * @cssproperty --forge-chip-checkmark-transition-delay - The delay of the checkmark transition in chips.
 *
 * @csspart root - The component's root element.
 * @csspart trigger - The trigger element of the chip.
 * @csspart focus-indicator - The focus indicator of the chip.
 * @csspart state-layer - The state layer surface.
 *
 * @cssclass forge-chip - The interactive button-like element.
 * @cssclass forge-chip--invalid - Invalid chips.
 * @cssclass forge-chip--selected - Selected chips.
 * @cssclass forge-chip--field - Renders a chip in its field variant (for use within inputs).
 * @cssclass forge-chip--dense - Uses a smaller font size and height.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 * @dependency forge-icon-button
 * @dependency forge-icon
 *
 * @slot - The content of the chip.
 * @slot start - The start content of the chip.
 * @slot end - The end content of the chip.
 */
export class ChipComponent extends BaseLitElement implements IChipComponent {
  public static styles = unsafeCSS(styles);

  /** @internal */
  public static contextRoot = new ContextRoot();

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CHIP_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent, IconButtonComponent, IconComponent];

  static {
    IconRegistry.define(tylIconClose);
  }

  /**
   * The type of chip.
   * @default 'action'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: ChipType) => removeDefaultAttribute(value, CHIP_CONSTANTS.defaults.TYPE) }
  })
  public set type(value: ChipType) {
    this.#type = CHIP_TYPES.includes(value) ? value : CHIP_CONSTANTS.defaults.TYPE;
  }
  public get type(): ChipType {
    return this.#type;
  }
  #type: ChipType = CHIP_CONSTANTS.defaults.TYPE;

  /**
   * The value of the chip.
   * @attribute
   */
  @property()
  public value: unknown;

  /**
   * Whether the chip is selected.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Whether the chip is invalid.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Whether the chip is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether the chip is dense.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  /**
   * The theme of the chip.
   * @default 'primary'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: ChipTheme) => removeDefaultAttribute(value, CHIP_CONSTANTS.defaults.THEME) }
  })
  public set theme(value: ChipTheme) {
    this.#theme = value ?? CHIP_CONSTANTS.defaults.THEME;
  }
  public get theme(): ChipTheme {
    return this.#theme;
  }
  #theme: ChipTheme = CHIP_CONSTANTS.defaults.THEME;

  /**
   * The href of the chip. Setting this renders the chip as an anchor.
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: (value?: string) => removeEmptyAttribute(value?.trim() ?? '') } })
  public href?: string;

  /**
   * The target of the chip anchor.
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: (value?: string) => removeEmptyAttribute(value?.trim() ?? '') } })
  public target?: string;

  /**
   * The download attribute of the chip anchor.
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: (value?: string) => removeEmptyAttribute(value?.trim() ?? '') } })
  public download?: string;

  /**
   * The rel attribute of the chip anchor.
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: (value?: string) => removeEmptyAttribute(value?.trim() ?? '') } })
  public rel?: string;

  /**
   * The custom aria-label for the remove button.
   * @attribute remove-button-label
   */
  @property({ attribute: 'remove-button-label' })
  public removeButtonLabel?: string;

  // *****
  // Context setters
  // *****

  readonly #inheritedProperties = new Set<ChipSetInheritedProperty>();

  @consume({ context: CHIP_SET_TYPE, subscribe: true })
  private set _chipSetType(value: ChipType) {
    if (this.#shouldInherit('type', value)) {
      this.type = value;
    }
  }

  @consume({ context: CHIP_SET_DENSE, subscribe: true })
  private set _chipSetDense(value: boolean) {
    if (this.#shouldInherit('dense', value)) {
      this.dense = value;
    }
  }

  @consume({ context: CHIP_SET_DISABLED, subscribe: true })
  private set _chipSetDisabled(value: boolean) {
    if (this.#shouldInherit('disabled', value)) {
      this.disabled = value;
    }
  }

  @consume({ context: CHIP_SET_INVALID, subscribe: true })
  private set _chipSetInvalid(value: boolean) {
    if (this.#shouldInherit('invalid', value)) {
      this.invalid = value;
    }
  }

  @consume({ context: CHIP_SET_THEME, subscribe: true })
  private set _chipSetTheme(value: ChipTheme) {
    if (this.#shouldInherit('theme', value)) {
      this.theme = value;
    }
  }

  @query('#trigger', true) private _trigger?: HTMLButtonElement | HTMLAnchorElement;
  @query('#remove-button', true) private _removeButton?: IconButtonComponent;
  @query('forge-focus-indicator', true) private _focusIndicator?: IFocusIndicatorComponent;
  @query('forge-state-layer', true) private _stateLayer?: IStateLayerComponent;

  #renderedTrigger?: HTMLElement;

  public override connectedCallback(): void {
    // Ensures context is provided even if the chip is upgraded before the chip set
    const chipSet = this.closest(CHIP_SET_CONSTANTS.elementName);
    if (chipSet) {
      ChipComponent.contextRoot.attach(chipSet);
    }

    super.connectedCallback();
  }

  public override updated(): void {
    const trigger = this._trigger;
    if (this.#renderedTrigger && this.#renderedTrigger !== trigger) {
      // The trigger element was swapped between a button and an anchor
      if (this._focusIndicator) {
        this._focusIndicator.targetElement = trigger;
      }
      if (this._stateLayer) {
        this._stateLayer.targetElement = trigger ?? null;
      }
    }
    this.#renderedTrigger = trigger;
  }

  public override focus(options?: FocusOptions): void {
    this._trigger?.focus({ preventScroll: true, ...options });
  }

  /** Moves focus to the remove button, if one is rendered. */
  public focusRemoveButton(): void {
    this._removeButton?.focus();
  }

  public override click(): void {
    this._trigger?.click();
  }

  public render(): TemplateResult {
    const isAnchor = this.#isAnchor;
    const isDisabled = this.disabled && !isAnchor;
    const hasRemoveButton = this.type === 'input' || this.type === 'field';

    return html`
      <div class="forge-chip" part="root" @click=${this.#onClick} @keydown=${this.#onKeydown}>
        ${this.type === 'filter' ? this.#renderCheckmark() : nothing} ${isAnchor ? this.#renderAnchor() : this.#renderButton()}
        ${isDisabled ? nothing : html`<forge-focus-indicator target="trigger" part="focus-indicator"></forge-focus-indicator>`}
        ${isDisabled || this.type === 'field' ? nothing : html`<forge-state-layer target="trigger" exportparts="surface:state-layer"></forge-state-layer>`}
        ${hasRemoveButton ? this.#renderRemoveButton(isDisabled) : nothing}
      </div>
    `;
  }

  get #isAnchor(): boolean {
    return !!this.href?.trim();
  }

  #renderCheckmark(): TemplateResult {
    return html`
      <div class="checkmark" aria-hidden="true">
        <svg viewBox="-2 -3 30 30">
          <path fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
        </svg>
      </div>
    `;
  }

  #renderButton(): TemplateResult {
    return html`
      <button
        type="button"
        id="trigger"
        class="trigger"
        part="trigger"
        ?disabled=${this.disabled}
        tabindex=${this.disabled ? -1 : nothing}
        aria-pressed=${this.selected ? 'true' : nothing}>
        ${this.#renderTriggerContent()}
      </button>
    `;
  }

  #renderAnchor(): TemplateResult {
    return html`
      <a
        id="trigger"
        class="trigger"
        part="trigger"
        href=${this.href?.trim() || nothing}
        target=${this.target || nothing}
        download=${this.download || nothing}
        rel=${this.rel || nothing}>
        ${this.#renderTriggerContent()}
      </a>
    `;
  }

  #renderTriggerContent(): TemplateResult {
    // The checkmark replaces any leading content when a filter chip is selected
    const hideStart = this.type === 'filter' && this.selected;
    return html`
      <slot name="start" style=${hideStart ? 'display: none' : nothing}>
        <slot name="leading"></slot>
      </slot>
      <slot></slot>
      <slot name="end">
        <slot name="trailing"></slot>
      </slot>
    `;
  }

  #renderRemoveButton(isDisabled: boolean): TemplateResult {
    const label = this.removeButtonLabel;
    return html`
      <forge-icon-button
        id="remove-button"
        class="remove"
        part="remove-button"
        density="small"
        ?disabled=${isDisabled}
        aria-label=${label ? label.trim() : nothing}
        aria-labelledby=${label ? nothing : 'remove-text trigger'}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
      <span id="remove-text" style="display: none">Remove</span>
    `;
  }

  #shouldInherit(key: ChipSetInheritedProperty, value: unknown): boolean {
    // Only inherit the chip set's initial value if it differs from the default to avoid clobbering the chip's own values
    const shouldInherit = this.#inheritedProperties.has(key) || value !== CHIP_SET_DEFAULTS[key];
    this.#inheritedProperties.add(key);
    return shouldInherit;
  }

  #onClick(evt: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    if (this.#isRemoveButton(evt)) {
      evt.stopImmediatePropagation();
      this.#dispatchDeleteEvent();
    } else {
      this.#handleSelectInteraction();
    }
  }

  #onKeydown(evt: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (evt.key) {
      case 'Delete':
      case 'Backspace':
        if (this.type === 'input') {
          evt.preventDefault();
          this.#dispatchDeleteEvent();
        }
        break;
      case 'Enter':
      case ' ':
        evt.preventDefault();
        if (this.#isRemoveButton(evt)) {
          evt.stopImmediatePropagation();
          if (evt.key === 'Enter') {
            this._removeButton?.click();
          }
        } else {
          this.click();
          if (this.#isAnchor) {
            this._stateLayer?.playAnimation();
          }
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.#tryNavigate(evt);
        break;
      case 'Tab':
        if (this.type === 'input' && this.#isRemoveButton(evt)) {
          this.#tryNavigate(evt);
        }
        break;
    }
  }

  #tryNavigate(evt: KeyboardEvent): void {
    if (this.type === 'input') {
      const isRemoveButtonFocused = !!this._removeButton?.matches(':focus');
      if (isRemoveButtonFocused) {
        evt.stopPropagation();
        evt.preventDefault();

        if (evt.key === 'ArrowLeft') {
          this.focus();
          return;
        }
      } else if (evt.key === 'ArrowRight') {
        this.#tryFocusRemoveButton();
        return;
      }
    }

    const detail: IChipNavigateEventData = {
      direction: evt.key === 'ArrowRight' || evt.key === 'Tab' ? 'next' : 'previous'
    };
    this.dispatchEvent(new CustomEvent(CHIP_CONSTANTS.events.NAVIGATE, { bubbles: true, detail }));
  }

  #tryFocusRemoveButton(): void {
    if (this._removeButton) {
      this._removeButton.focus({ preventScroll: true, focusVisible: true } as FocusOptions);
    } else {
      this.focus();
    }
  }

  #isRemoveButton(evt: Event): boolean {
    return !!this._removeButton && evt.composedPath().includes(this._removeButton);
  }

  #handleSelectInteraction(): void {
    const originalSelected = this.selected;

    // Reflect the pending state on the event target while the select event is dispatched
    this.selected = !originalSelected;
    const wasDefaultPrevented = this.#dispatchSelectEvent();
    this.selected = originalSelected;

    if (!wasDefaultPrevented && SELECTABLE_CHIP_TYPES.includes(this.type)) {
      this.selected = !originalSelected;
    }
  }

  #dispatchSelectEvent(): boolean {
    const detail: IChipSelectEventData = {
      selected: this.selected,
      value: this.value
    };
    const event = new CustomEvent(CHIP_CONSTANTS.events.SELECT, { detail, bubbles: true, cancelable: true });
    this.dispatchEvent(event);
    return event.defaultPrevented;
  }

  #dispatchDeleteEvent(): void {
    const detail: IChipDeleteEventData = { value: this.value };
    this.dispatchEvent(new CustomEvent(CHIP_CONSTANTS.events.DELETE, { detail, bubbles: true }));
  }
}

tryDefine(CHIP_CONSTANTS.elementName, ChipComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip': IChipComponent;
  }
}
