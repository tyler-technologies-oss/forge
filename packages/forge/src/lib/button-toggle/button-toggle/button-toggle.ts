import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ExperimentalFocusOptions } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { task } from '../../core/utils/utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { StateLayerComponent } from '../../state-layer/state-layer.js';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants.js';

import styles from './button-toggle.scss';

/** @deprecated - This will be removed in the future. Please switch to using ButtonToggleComponent. */
export interface IButtonToggleComponent<T = unknown> extends BaseLitElement {
  value: T;
  selected: boolean;
  disabled: boolean;
  readonly: boolean;
  focus(options?: ExperimentalFocusOptions): void;
}

/**
 * @tag forge-button-toggle
 *
 * @summary Button toggles allow users to select from a group of choices with single or multiple selection.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @event {CustomEvent<IButtonToggleSelectEventData>} forge-button-toggle-select - Dispatches when the user toggles the button.
 *
 * @cssproperty --forge-button-toggle-display - The `display` style for the button toggle container element.
 * @cssproperty --forge-button-toggle-min-width - The minimum width.
 * @cssproperty --forge-button-toggle-spacing - The spacing between the button toggle and its content.
 * @cssproperty --forge-button-toggle-padding-block - The padding on the block axis.
 * @cssproperty --forge-button-toggle-padding-inline - The padding on the inline axis.
 * @cssproperty --forge-button-toggle-color - The color of the button toggle content.
 * @cssproperty --forge-button-toggle-background - The background of the button toggle.
 * @cssproperty --forge-button-toggle-cursor - The cursor of the button toggle.
 * @cssproperty --forge-button-toggle-border-width - The border-width of the button toggle.
 * @cssproperty --forge-button-toggle-border-style - The border-style of the button toggle.
 * @cssproperty --forge-button-toggle-border-color - The border-color of the button toggle.
 * @cssproperty --forge-button-toggle-shape - The shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-start-start - The start-start shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-start-end - The start-end shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-end-start - The end-start shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-end-end - The end-end shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-selected-background - The background of the button toggle when selected.
 * @cssproperty --forge-button-toggle-selected-color - The color of the button toggle content when selected.
 * @cssproperty --forge-button-toggle-selected-disabled-background - The background of the button toggle when selected and disabled.
 * @cssproperty --forge-button-toggle-disabled-opacity - The opacity of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-cursor - The cursor of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-color - The color of the button toggle content when disabled.
 * @cssproperty --forge-button-toggle-disabled-background - The background of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-transition-duration - The transition-duration of various properties.
 * @cssproperty --forge-button-toggle-transition-timing - The transition-timing of various properties.
 *
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer surface element.
 *
 * @slot - The default/unnamed slot for the button toggle's content.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 */
export class ButtonToggleComponent<T = unknown> extends BaseLitElement implements IButtonToggleComponent<T> {
  public static styles = unsafeCSS(styles);

  public static override get observedAttributes(): string[] {
    return [...super.observedAttributes, BUTTON_TOGGLE_CONSTANTS.attributes.TABINDEX];
  }

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BUTTON_TOGGLE_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent];

  #internals: ElementInternals;
  #selected = false;
  #externalTabIndex: number | null = null;
  #isUpdatingTabIndex = false;

  /**
   * The value of the button toggle.
   * @attribute
   */
  @property()
  public value!: T;

  /**
   * Whether or not the button is selected.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set selected(value: boolean) {
    this.#selected = !!value;
  }
  public get selected(): boolean {
    return this.#selected;
  }

  /**
   * Whether or not the button is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether or not the button is readonly.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  @query('forge-focus-indicator', true) private _focusIndicator?: FocusIndicatorComponent;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.addEventListener('click', () => this.#handleClick());
    this.addEventListener('keydown', (evt: KeyboardEvent) => this.#handleKeyDown(evt));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'button' }, { setAttribute: !this.hasAttribute('role') });
    this.#updateTabIndex();
  }

  public override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name !== BUTTON_TOGGLE_CONSTANTS.attributes.TABINDEX || this.#isUpdatingTabIndex) {
      return;
    }

    if (newValue === null) {
      this.#externalTabIndex = null;
      this.#updateTabIndex();
      return;
    }

    this.#externalTabIndex = this.tabIndex;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('selected') || !this.hasUpdated) {
      setDefaultAria(this, this.#internals, { ariaPressed: `${this.selected}` });
    }

    if (changedProperties.has('disabled')) {
      setDefaultAria(this, this.#internals, { ariaDisabled: `${this.disabled}` });
      this.#updateTabIndex();
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-button-toggle" part="root">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <forge-focus-indicator target=":host" part="focus-indicator"></forge-focus-indicator>
        <forge-state-layer target=":host" exportparts="surface:state-layer" .disabled=${this.disabled}></forge-state-layer>
      </div>
    `;
  }

  /** @ignore */
  public override focus(options: ExperimentalFocusOptions = { focusVisible: true }): void {
    super.focus(options);

    if (options.focusVisible && this._focusIndicator) {
      this._focusIndicator.active = true;
    }
  }

  #updateTabIndex(): void {
    if (!this.isConnected) {
      return;
    }
    this.#isUpdatingTabIndex = true;
    this.tabIndex = this.#externalTabIndex ?? (this.disabled ? -1 : 0);
    this.#isUpdatingTabIndex = false;
  }

  async #handleClick(): Promise<void> {
    if (this.disabled || this.readonly) {
      return;
    }

    // The toggled state is applied directly to the backing field so that listeners of the select event (such as the
    // group) observe the pending state without the attribute and ARIA state being updated until the event is resolved.
    const originalSelected = this.#selected;
    this.#selected = !originalSelected;

    const detail: IButtonToggleSelectEventData = {
      value: this.value,
      selected: this.#selected
    };
    const evt = new CustomEvent(BUTTON_TOGGLE_CONSTANTS.events.SELECT, { detail, bubbles: true, cancelable: true });
    this.dispatchEvent(evt);

    await task();

    this.#selected = originalSelected;

    if (evt.defaultPrevented) {
      return;
    }

    this.selected = !originalSelected;
  }

  #handleKeyDown(evt: KeyboardEvent): void {
    if (this.disabled || this.readonly) {
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      this.click();
    }
  }
}

tryDefine(BUTTON_TOGGLE_CONSTANTS.elementName, ButtonToggleComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-toggle': IButtonToggleComponent;
  }

  interface HTMLElementEventMap {
    'forge-button-toggle-select': CustomEvent<IButtonToggleSelectEventData>;
  }
}
