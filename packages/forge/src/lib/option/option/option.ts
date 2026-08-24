import { consume } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconCheck, tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconDrag, tylIconDragHorizontal } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { playStateLayerAnimation, SELECT_LIKE_MULTIPLE, SELECT_LIKE_READONLY, toggleFocusIndicator } from '../../constants.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { IconComponent, IconRegistry } from '../../icon/index.js';
import { LISTBOX_DRAG_OUT, LISTBOX_DENSE, LISTBOX_REORDERABLE, LISTBOX_TAG_NAME } from '../../listbox/listbox.js';
import { StateLayerComponent } from '../../state-layer/state-layer.js';
import type { IOptionConfigComponent } from './option-config.js';
import { OptionConfigComponent } from './option-config.js';
import { OPTION_CONSTANTS } from './option-constants.js';

import styles from './option.scss';

/** @deprecated - This will be removed in the future. Please switch to using OptionComponent. */
export interface IOptionComponent extends IOptionConfigComponent {}

/**
 * The reason an option's `forge-option-update` event was dispatched.
 */
export type OptionUpdateReason = 'added' | 'selected' | 'deselected' | 'value-changed';

/**
 * @tag forge-option
 *
 * @summary Options represent individual selectable items within a `<forge-select>`, `<forge-menu>`,
 * or `<forge-listbox>` component.
 *
 * @slot - The default slot for the option's label.
 * @slot start - The slot for content to be placed at the start of the option.
 * @slot secondary - The slot for content to be placed below the option's label.
 * @slot tertiary - The slot for content to be placed below the option's secondary content.
 * @slot end - The slot for content to be placed at the end of the option.
 *
 * @state disabled - Whether the option is disabled.
 * @state readonly - Whether the option is read only.
 * @state selected - Whether the option is selected.
 *
 * @cssproperty --forge-option-background - The background color of an option.
 * @cssproperty --forge-option-shape - The shape (border-radius) of an option.
 * @cssproperty --forge-option-padding - The padding of an option.
 * @cssproperty --forge-option-margin - The margin of an option.
 * @cssproperty --forge-option-height - The height of an option.
 * @cssproperty --forge-option-dense-height - The height of an option when `dense`.
 * @cssproperty --forge-option-cursor - The cursor of an option.
 * @cssproperty --forge-option-gap - The gap between an option's content.
 * @cssproperty --forge-option-text-color - The text color of an option's secondary/tertiary content.
 * @cssproperty --forge-option-text-font-size - The font size of an option's label.
 * @cssproperty --forge-option-text-font-weight - The font weight of an option's label.
 * @cssproperty --forge-option-text-line-height - The line height of an option's label.
 * @cssproperty --forge-option-selected-color - The text color of an option when selected.
 * @cssproperty --forge-option-selected-opacity - The opacity of the selected background overlay of an option.
 * @cssproperty --forge-option-selected-text-color - The color of an option's secondary/tertiary content when selected.
 * @cssproperty --forge-option-disabled-opacity - The opacity of an option when disabled.
 * @cssproperty --forge-option-disabled-cursor - The cursor of an option when disabled.
 * @cssproperty --forge-option-two-line-height - The height of an option when `two-line`.
 * @cssproperty --forge-option-three-line-height - The height of an option when `three-line`.
 * @cssproperty --forge-option-dense-gap - The gap between an option's content when `dense`.
 * @cssproperty --forge-option-dense-font-size - The font size of an option's label when `dense`.
 * @cssproperty --forge-option-dense-two-line-height - The height of an option when `dense` and `two-line`.
 * @cssproperty --forge-option-dense-three-line-height - The height of an option when `dense` and `three-line`.
 * @cssproperty --forge-option-drag-handle-color - The color of an option's drag handle icon.
 *
 * @csspart root - The root element of the option.
 * @csspart label - The label element of the option.
 * @csspart checkbox - The checkbox icon of the option (only visible when `multiple` is true).
 * @csspart checkmark - The checkmark icon of the option (only visible when `multiple` is false).
 * @csspart drag-handle - The drag handle icon of the option.
 * @csspart focus-indicator - The focus indicator of the option.
 * @csspart state-layer - The state layer of the option.
 */
@customElement(OPTION_CONSTANTS.elementName)
export class OptionComponent extends OptionConfigComponent implements IOptionComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = OPTION_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, IconComponent, StateLayerComponent];

  static {
    IconRegistry.define([tylIconCheck, tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconDrag, tylIconDragHorizontal]);
  }

  /**
   * Whether the option is selected. __Applies only to declarative options.__
   * @attribute
   * @default false
   */
  @property({ type: Boolean })
  public selected = false;

  /**
   * Sets the option's height to fit two lines of text. __Applies only to declarative options.__
   * @attribute two-line
   * @default false
   */
  @property({ type: Boolean, attribute: 'two-line' })
  public twoLine = false;

  /**
   * Sets the option's height to fit three lines of text. __Applies only to declarative options.__
   * @attribute three-line
   * @default false
   */
  @property({ type: Boolean, attribute: 'three-line' })
  public threeLine = false;

  /**
   * Whether the option uses a dense layout. __Applies only to declarative options.__
   * @attribute
   * @default false
   */
  @consume({ context: LISTBOX_DENSE, subscribe: true })
  @property({ type: Boolean })
  public dense = false;

  /**
   * Whether the option is read only. __Applies only to declarative options.__
   * @attribute
   * @default false
   */
  @consume({ context: SELECT_LIKE_READONLY, subscribe: true })
  @property({ type: Boolean })
  public readonly = false;

  @consume({ context: SELECT_LIKE_MULTIPLE, subscribe: true })
  @state()
  private _multiple = false;

  @consume({ context: LISTBOX_REORDERABLE, subscribe: true })
  @state()
  private _reorderable = false;

  @consume({ context: LISTBOX_DRAG_OUT, subscribe: true })
  @state()
  private _dragOut = false;

  @state()
  private _focusIndicatorActive = false;

  @query('forge-state-layer', true)
  private _stateLayer!: StateLayerComponent;

  #internals: ElementInternals;
  #configOnly = true;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._dispatchUpdate('added');
  }

  public willUpdate(_changedProperties: PropertyValues<this>): void {
    if (_changedProperties.has('disabled')) {
      setDefaultAria(this, this.#internals, { ariaDisabled: this.disabled ? 'true' : null });
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (_changedProperties.has('readonly')) {
      toggleState(this.#internals, 'readonly', this.readonly);
    }

    if (_changedProperties.has('_multiple' as any) || _changedProperties.has('selected')) {
      setDefaultAria(this, this.#internals, {
        ariaChecked: this.selected ? (this._multiple ? 'true' : null) : null,
        ariaSelected: this.selected ? (this._multiple ? null : 'true') : null
      });
      toggleState(this.#internals, 'selected', this.selected);
    }

    if (_changedProperties.has('selected')) {
      this._dispatchUpdate(this.selected ? 'selected' : 'deselected');
    }
  }

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    // Check if this option should render its own DOM
    this.#configOnly = !this.closest(LISTBOX_TAG_NAME);

    if (this.#configOnly) {
      return this; // Light DOM for config-only option
    }

    this.#setupAria();
    return super.createRenderRoot();
  }

  public render(): TemplateResult {
    // Only render template when using shadow root (within listbox)
    if (this.#configOnly) {
      return html``;
    }

    const classes = {
      'forge-option': true,
      disabled: this.disabled,
      readonly: this.readonly,
      selected: this.selected,
      'two-line': this.twoLine && !this.threeLine,
      'three-line': this.threeLine,
      dense: this.dense
    };

    return html`
      <div class=${classMap(classes)} part="root">
        ${this.#tryRenderDragHandle()} ${this.#tryRenderCheckbox()}
        <slot name="start"></slot>
        <div class="label" part="label">
          <slot></slot>
          <slot name="secondary"></slot>
          <slot name="tertiary"></slot>
        </div>
        <slot name="end"></slot>
        ${this.#tryRenderCheckmark()}
        <forge-focus-indicator part="focus-indicator" .active=${this._focusIndicatorActive} inward></forge-focus-indicator>
        ${this.disabled || this.readonly ? nothing : html`<forge-state-layer exportparts="surface:state-layer" target=":host"></forge-state-layer>`}
      </div>
    `;
  }

  #tryRenderCheckbox(): TemplateResult | typeof nothing {
    if (!this._multiple) {
      return nothing;
    }
    return html`<forge-icon class="checkbox" part="checkbox" name=${this.selected ? 'check_box' : 'check_box_outline_blank'}></forge-icon>`;
  }

  #tryRenderCheckmark(): TemplateResult | typeof nothing {
    if (this._multiple) {
      return nothing;
    }
    return this.selected ? html`<forge-icon class="checkmark" part="checkmark" name="check"></forge-icon>` : nothing;
  }

  #tryRenderDragHandle(): TemplateResult | typeof nothing {
    if (this._reorderable || this._dragOut) {
      return html`<forge-icon class="drag-handle" part="drag-handle" name=${this._dragOut ? 'drag' : 'drag_horizontal'} draggable="true"></forge-icon>`;
    }
    return nothing;
  }

  public [playStateLayerAnimation](): void {
    this._stateLayer.playAnimation();
  }

  public [toggleFocusIndicator](active?: boolean): void {
    this._focusIndicatorActive = active ?? !this._focusIndicatorActive;
  }

  #setupAria(): void {
    if (this.isConnected) {
      setDefaultAria(this, this.#internals, { role: 'option' });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option': IOptionComponent;
  }
  interface HTMLElementEventMap {
    'forge-option-value-change': CustomEvent<any>;
    'forge-option-update': CustomEvent<{ reason: OptionUpdateReason }>;
  }
}
