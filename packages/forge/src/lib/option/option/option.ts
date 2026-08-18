import { consume } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconCheck, tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconDrag, tylIconDragHorizontal } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { playStateLayerAnimation, SELECT_LIKE_MULTIPLE, toggleFocusIndicator } from '../../constants.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { IconComponent, IconRegistry } from '../../icon/index.js';
import { LISTBOX_ALLOW_DRAG_OUT, LISTBOX_REORDERABLE, LISTBOX_TAG_NAME } from '../../listbox/listbox.js';
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
 * @fires {CustomEvent<any>} forge-option-value-change - Emitted when the option value changes.
 * @fires {CustomEvent<{ reason: OptionUpdateReason }>} forge-option-update - Emitted when the option is
 * connected, selected, deselected, or its value changes. Used by `forge-listbox` to keep its `value` in
 * sync with option selection state.
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
   * Whether the option is selected.
   * @default false
   */
  @property({ type: Boolean })
  public selected = false;

  @consume({ context: SELECT_LIKE_MULTIPLE, subscribe: true })
  @state()
  private _multiple = false;

  @consume({ context: LISTBOX_REORDERABLE, subscribe: true })
  @state()
  private _reorderable = false;

  @consume({ context: LISTBOX_ALLOW_DRAG_OUT, subscribe: true })
  @state()
  private _allowDragOut = false;

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
      selected: this.selected
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.#tryRenderDragHandle()} ${this.#tryRenderCheckbox()}
        <slot name="start"></slot>
        <div class="center" part="center">
          <slot></slot>
          <slot name="secondary"></slot>
          <slot name="tertiary"></slot>
        </div>
        <slot name="end"></slot>
        ${this.#tryRenderCheckmark()}
        <forge-focus-indicator part="focus-indicator" .active=${this._focusIndicatorActive} inward></forge-focus-indicator>
        ${this.disabled ? nothing : html`<forge-state-layer part="state-layer" target=":host"></forge-state-layer>`}
      </div>
    `;
  }

  #tryRenderCheckbox(): TemplateResult | typeof nothing {
    if (!this._multiple) {
      return nothing;
    }
    return html`<forge-icon class="checkbox" name=${this.selected ? 'check_box' : 'check_box_outline_blank'}></forge-icon>`;
  }

  #tryRenderCheckmark(): TemplateResult | typeof nothing {
    if (this._multiple) {
      return nothing;
    }
    return this.selected ? html`<forge-icon class="checkmark" name="check"></forge-icon>` : nothing;
  }

  #tryRenderDragHandle(): TemplateResult | typeof nothing {
    if (this._reorderable || this._allowDragOut) {
      return html`<forge-icon class="drag-handle" name=${this._allowDragOut ? 'drag' : 'drag_horizontal'} draggable="true"></forge-icon>`;
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
