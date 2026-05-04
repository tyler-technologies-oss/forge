import { consume } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { ExperimentalFocusOptions, playStateLayerAnimation } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { toggleState } from '../../core/index.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { StateLayerComponent } from '../../state-layer/state-layer.js';
import {
  TAB_BAR_CONSTANTS,
  TAB_BAR_DISABLED,
  TAB_BAR_INVERTED,
  TAB_BAR_REMOVABLE,
  TAB_BAR_SECONDARY,
  TAB_BAR_STACKED,
  TAB_BAR_VERTICAL
} from '../tab-bar/tab-bar-constants.js';
import { TAB_CONSTANTS } from './tab-constants.js';

import styles from './tab.scss';

/** @deprecated - This will be removed in the future. Please switch to using TabComponent. */
export interface ITabComponent extends BaseLitElement {
  disabled: boolean;
  selected: boolean;
  vertical: boolean;
  stacked: boolean;
  /** @deprecated This will be removed in a future version */
  secondary: boolean;
  inverted: boolean;
  removable: boolean;
  focus(options?: ExperimentalFocusOptions): void;
}

/**
 * @tag forge-tab
 *
 * @summary Tab components represent a single tab inside a tab bar.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @event {CustomEvent<void>} forge-tab-select - Dispatched when the tab is selected. This event bubbles and it can be useful to capture it on the `<forge-tab-bar>` element.
 * @event {Event} forge-tab-remove - Dispatched when the tab is removed by the user.
 * @event {Event} forge-tab-menu - Dispatched when the tab's menu is invoked (by pressing Shift+F10).
 *
 * @cssproperty --forge-tab-active-color - The primary color of the tab when active.
 * @cssproperty --forge-tab-active-focus-icon-color - The color of the icon when the tab is active and focused.
 * @cssproperty --forge-tab-active-focus-label-text-color - The color of the label text when the tab is active and focused.
 * @cssproperty --forge-tab-active-hover-icon-color - The color of the icon when the tab is active and hovered.
 * @cssproperty --forge-tab-active-hover-label-text-color - The color of the label text when the tab is active and hovered.
 * @cssproperty --forge-tab-active-icon-color - The color of the icon when the tab is active.
 * @cssproperty --forge-tab-active-label-text-color - The color of the label text when the tab is active.
 * @cssproperty --forge-tab-active-pressed-icon-color - The color of the icon when the tab is active and pressed.
 * @cssproperty --forge-tab-active-pressed-label-text-color - The color of the label text when the tab is active and pressed.
 * @cssproperty --forge-tab-container-color - The color of the tab container.
 * @cssproperty --forge-tab-container-height - The height of the tab container.
 * @cssproperty --forge-tab-container-shape - The shape of the tab container.
 * @cssproperty --forge-tab-content-height - The height of the tab content.
 * @cssproperty --forge-tab-content-padding - The padding value for both block and inline of the tab content.
 * @cssproperty --forge-tab-content-padding-block - The block padding of the tab content.
 * @cssproperty --forge-tab-content-padding-inline - The inline padding of the tab content.
 * @cssproperty --forge-tab-content-spacing - The spacing between tab content elements.
 * @cssproperty --forge-tab-disabled-opacity - The opacity of the tab when disabled.
 * @cssproperty --forge-tab-focus-icon-color - The color of the icon when the tab is focused.
 * @cssproperty --forge-tab-focus-label-text-color - The color of the label text when the tab is focused.
 * @cssproperty --forge-tab-height - The height of the tab.
 * @cssproperty --forge-tab-hover-icon-color - The color of the icon when the tab is hovered.
 * @cssproperty --forge-tab-hover-label-text-color - The color of the label text when the tab is hovered.
 * @cssproperty --forge-tab-icon-color - The color of the icon.
 * @cssproperty --forge-tab-icon-size - The size of the icon.
 * @cssproperty --forge-tab-inactive-color - The primary color of the tab when inactive.
 * @cssproperty --forge-tab-indicator-color - The color of the active tab indicator.
 * @cssproperty --forge-tab-indicator-height - The height of the active tab indicator.
 * @cssproperty --forge-tab-indicator-shape - The shape of the active tab indicator.
 * @cssproperty --forge-tab-inverted-indicator-shape - The shape of the active tab indicator when inverted.
 * @cssproperty --forge-tab-label-text-color - The color of the label text.
 * @cssproperty --forge-tab-padding-block - The block padding of the tab.
 * @cssproperty --forge-tab-padding-inline - The inline padding of the tab.
 * @cssproperty --forge-tab-pressed-icon-color - The color of the icon when the tab is pressed.
 * @cssproperty --forge-tab-pressed-label-text-color - The color of the label text when the tab is pressed.
 * @cssproperty --forge-tab-stacked-height - The height of the tab when stacked.
 * @cssproperty --forge-tab-vertical-indicator-shape - The shape of the active tab indicator when vertical.
 * @cssproperty --forge-tab-vertical-inverted-indicator-shape - The shape of the active tab indicator when vertical and inverted.
 *
 * @csspart container - The tab container.
 * @csspart content - The tab content container.
 * @csspart label - The tab label container.
 * @csspart indicator - The tab active indicator.
 * @csspart state-layer - The state layer surface.
 * @csspart focus-indicator - The focus indicator.
 *
 * @state selected - Applied when the tab is selected.
 * @state disabled - Applied when the tab is disabled.
 * @state vertical - Applied when the tab is vertical.
 *
 * @slot - The tab label.
 * @slot start - Content before the label.
 * @slot end - Content after the label.
 */
@customElement(TAB_CONSTANTS.elementName)
export class TabComponent extends BaseLitElement implements ITabComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAB_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent];

  #internals: ElementInternals;

  // TODO: Remove attribute reflection except for `name`

  /**
   * The name of the tab.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public name = '';

  /**
   * The disabled state of the tab. Should not be set if using the disabled property on `forge-tab-bar`.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The selected state of the tab.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Controls whether the tab is vertical or horizontal.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * Controls whether the tab is taller to allow for slotted leading/trailing elements.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public stacked = false;

  /**
   * Controls whether the tab is styled as secondary tab navigation.
   * @default false
   * @attribute
   * @deprecated This will be removed in a future version.
   */
  @property({ type: Boolean, reflect: true })
  public secondary = false;

  /**
   * Controls whether the tab indicator is rendered on the opposite side of the tab.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public inverted = false;

  /**
   * Controls whether the tab can be removed with the delete key.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public removable = false;

  // *****
  // Context setters
  // *****

  #disabledContextHasUpdated = false;
  @consume({ context: TAB_BAR_DISABLED, subscribe: true })
  private set _disabled(value: boolean) {
    // Only enable from context if this is not the initial value
    this.disabled = this.#disabledContextHasUpdated ? value : value || this.disabled;
    this.#disabledContextHasUpdated = true;
  }

  @consume({ context: TAB_BAR_VERTICAL, subscribe: true })
  private set _vertical(value: boolean) {
    this.vertical = value;
  }

  @consume({ context: TAB_BAR_STACKED, subscribe: true })
  private set _stacked(value: boolean) {
    this.stacked = value;
  }
  @consume({ context: TAB_BAR_SECONDARY, subscribe: true })
  private set _secondary(value: boolean) {
    this.secondary = value;
  }

  @consume({ context: TAB_BAR_INVERTED, subscribe: true })
  private set _inverted(value: boolean) {
    this.inverted = value;
  }

  @consume({ context: TAB_BAR_REMOVABLE, subscribe: true })
  private set _removable(value: boolean) {
    this.removable = value;
  }

  @query('.indicator', true) private _indicator?: HTMLElement;
  @query('forge-focus-indicator', true) private _focusIndicator?: FocusIndicatorComponent;
  @query('forge-state-layer', true) private _stateLayer?: StateLayerComponent;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.style.scrollMargin = `${TAB_BAR_CONSTANTS.numbers.SCROLL_MARGIN}px`;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'tab'
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('selected')) {
      toggleState(this.#internals, 'selected', this.selected);
      setDefaultAria(this, this.#internals, {
        ariaSelected: this.selected ? 'true' : 'false'
      });
      this.#dispatchSelectedChangeEvent();
    }

    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
      setDefaultAria(this, this.#internals, {
        ariaDisabled: this.disabled ? 'true' : 'false'
      });

      // Blur the tab if it becomes disabled while focused
      if (this.disabled && this.matches(':focus-within')) {
        this.blur();
      }
    }

    if (changedProperties.has('vertical')) {
      toggleState(this.#internals, 'vertical', this.vertical);
    }

    // TabIndex management: -1 when disabled or not selected, 0 when selected
    // TODO: This may not be necessary with the tab bar's focus group managing tab indices
    if (changedProperties.has('disabled') || changedProperties.has('selected')) {
      this.tabIndex = this.disabled ? -1 : this.selected ? 0 : -1;
    }

    if (changedProperties.has('name')) {
      this.#verifyName();
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-tab': true,
      vertical: this.vertical,
      inverted: this.inverted,
      stacked: this.stacked
    };
    return html`
      <div class=${classMap(classes)} part="container">
        <span class="content" part="content">
          <slot name="start">
            <slot name="leading"></slot>
          </slot>
          <span class="label" part="label">
            <slot></slot>
          </span>
          <slot name="end">
            <slot name="trailing"></slot>
          </slot>
          <span class="indicator" part="indicator"></span>
        </span>
        <forge-state-layer exportparts="surface:state-layer" target=":host" .disabled=${this.disabled}></forge-state-layer>
        <forge-focus-indicator part="focus-indicator" target=":host" .inward=${true}></forge-focus-indicator>
      </div>
    `;
  }

  public override focus(options?: ExperimentalFocusOptions): void {
    super.focus(options);
    if (options?.focusVisible && this._focusIndicator) {
      this._focusIndicator.active = true;
    }
  }

  public select(value = true): void {
    this.selected = value;
  }

  /**
   * Plays the state layer animation.
   */
  public [playStateLayerAnimation](): void {
    this._stateLayer?.playAnimation();
  }

  /**
   * Logs a warning if the name is not unique within the parent tab bar.
   */
  #verifyName(): void {
    if (!this.name) {
      // TODO: In the future we may want to require a name. For now we'll ignore it for backwards compatibility.
      return;
    }

    const tabBar = this.closest(TAB_BAR_CONSTANTS.elementName);
    if (!tabBar) {
      // Tabs are nonfunctonal outside of a tab bar
      return;
    }

    const duplicateTab = tabBar.querySelector(`${TAB_CONSTANTS.elementName}[name="${this.name}"]`);
    if (duplicateTab && duplicateTab !== this) {
      console.warn(`Duplicate tab name "${this.name}" found. Tab names should be unique to ensure proper functionality.`);
    }
  }

  #dispatchSelectedChangeEvent(): void {
    this.dispatchEvent(
      new Event(TAB_CONSTANTS.events.SELECT_CHANGE, {
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab': ITabComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-select': CustomEvent<void>;
  }

  interface HTMLElementEventMap {
    'forge-tab-remove': Event;
  }

  interface HTMLElementEventMap {
    'forge-tab-menu': Event;
  }

  interface HTMLElementEventMap {
    'forge-tab-selected-change': Event;
  }
}
