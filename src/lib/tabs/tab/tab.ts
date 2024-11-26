import { customElement, attachShadowTemplate, coerceBoolean, coreProperty } from '@tylertech/forge-core';

import { TabAdapter } from './tab-adapter';
import { TabCore } from './tab-core';
import { TAB_CONSTANTS } from './tab-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../../state-layer/state-layer';

import template from './tab.html';
import styles from './tab.scss';

export interface ITabComponent extends IBaseComponent {
  disabled: boolean;
  selected: boolean;
  vertical: boolean;
  stacked: boolean;
  /** @deprecated This will be removed in a future version */
  secondary: boolean;
  inverted: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab': ITabComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-select': CustomEvent<void>;
  }
}

/**
 * @tag forge-tab
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @property {boolean} [disabled=false] - The disabled state of the tab. Should not be set if using the disabled property on `forge-tab-bar`.
 * @property {boolean} [selected=false] - The selected state of the tab.
 * @property {boolean} [vertical=false] - Controls whether the tab is vertical or horizontal.
 * @property {boolean} [stacked=false] - Controls whether the tab is taller to allow for slotted leading/trailing elements.
 * @property {boolean} [secondary=false] - Controls whether the tab is styled as secondary tab navigation.
 * @property {boolean} [inverted=false] - Controls whether the tab indicator is rendered on the opposite side of the tab.
 *
 * @attribute [disabled=false] - The disabled state of the tab.
 * @attribute [selected=false] - The selected state of the tab.
 * @attribute [vertical=false] - Controls whether the tab is vertical or horizontal.
 * @attribute [stacked=false] - Controls whether the tab is taller to allow for slotted leading/trailing elements.
 * @attribute [secondary=false] - Deprecated. Controls whether the tab is styled as secondary tab navigation.
 * @attribute [inverted=false] - Controls whether the tab indicator is rendered on the opposite side of the tab.
 *
 * @event {CustomEvent<void>} forge-tab-select - Dispatched when the tab is selected. This event bubbles and it can be useful to capture it on the `<forge-tab-bar>` element.
 *
 * @cssproperty --forge-tab-active-color - The primary color of the contents when active.
 * @cssproperty --forge-tab-inactive-color - The primary color of the contents when inactive.
 * @cssproperty --forge-tab-height - The height of the tab.
 * @cssproperty --forge-tab-stacked-height - The height of the tab when stacked.
 * @cssproperty --forge-tab-padding-block - The block space between the tab contents and the bounds of the tab.
 * @cssproperty --forge-tab-padding-inline - The inline space between the tab contents and the bounds of the tab.
 * @cssproperty --forge-tab-disabled-opacity - The opacity of the tab when disabled.
 * @cssproperty --forge-tab-indicator-color - The color of the active tab indicator.
 * @cssproperty --forge-tab-indicator-height - The height of the active tab indicator.
 * @cssproperty --forge-tab-indicator-shape - The shape of the active tab indicator.
 * @cssproperty --forge-tab-vertical-indicator-shape - The shape of the active tab indicator when vertical.
 * @cssproperty --forge-tab-inverted-indicator-shape - The shape of the active tab indicator when inverted.
 * @cssproperty --forge-tab-vertical-inverted-indicator-shape - The shape of the active tab indicator when vertical and inverted.
 * @cssproperty --forge-tab-container-color - The color of the tab container.
 * @cssproperty --forge-tab-container-height - The height of the tab container.
 * @cssproperty --forge-tab-container-shape - The shape of the tab container.
 * @cssproperty --forge-tab-content-height - The height of the tab content.
 * @cssproperty --forge-tab-content-spacing - The spacing between tab contents.
 * @cssproperty --forge-tab-content-padding - The padding value for both block and inline of the tab content.
 * @cssproperty --forge-tab-content-padding-block - The block padding of the tab content.
 * @cssproperty --forge-tab-content-padding-inline - The inline padding of the tab content.
 * @cssproperty --forge-tab-active-focus-icon-color - The color of the icon when the tab is active and focused.
 * @cssproperty --forge-tab-active-hover-icon-color - The color of the icon when the tab is active and hovered.
 * @cssproperty --forge-tab-active-icon-color - The color of the icon when the tab is active.
 * @cssproperty --forge-tab-active-pressed-icon-color - The color of the icon when the tab is active and pressed.
 * @cssproperty --forge-tab-icon-size - The size of the icon.
 * @cssproperty --forge-tab-focus-icon-color - The color of the icon when the tab is focused.
 * @cssproperty --forge-tab-hover-icon-color - The color of the icon when the tab is hovered.
 * @cssproperty --forge-tab-icon-color - The color of the icon.
 * @cssproperty --forge-tab-pressed-icon-color - The color of the icon when the tab is pressed.
 * @cssproperty --forge-tab-active-focus-label-text-color - The color of the label text when the tab is active and focused.
 * @cssproperty --forge-tab-active-hover-label-text-color - The color of the label text when the tab is active and hovered.
 * @cssproperty --forge-tab-active-label-text-color - The color of the label text when the tab is active.
 * @cssproperty --forge-tab-active-pressed-label-text-color - The color of the label text when the tab is active and pressed.
 * @cssproperty --forge-tab-focus-label-text-color - The color of the label text when the tab is focused.
 * @cssproperty --forge-tab-hover-label-text-color - The color of the label text when the tab is hovered.
 * @cssproperty --forge-tab-label-text-color - The color of the label text.
 * @cssproperty --forge-tab-pressed-label-text-color - The color of the label text when the tab is pressed.
 *
 * @csspart container - The tab container.
 * @csspart content - The tab content container.
 * @csspart label - The tab label container.
 * @csspart indicator - The tab active indicator.
 *
 * @slot - The tab label.
 * @slot start - Content before the label.
 * @slot end - Content after the label.
 */
@customElement({
  name: TAB_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class TabComponent extends BaseComponent implements ITabComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TAB_CONSTANTS.observedAttributes);
  }

  private _core: TabCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new TabCore(new TabAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TAB_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.observedAttributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.observedAttributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.observedAttributes.STACKED:
        this.stacked = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.observedAttributes.SECONDARY:
        this.secondary = coerceBoolean(newValue);
        break;
      case TAB_CONSTANTS.observedAttributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare selected: boolean;

  @coreProperty()
  public declare vertical: boolean;

  @coreProperty()
  public declare stacked: boolean;

  /** @deprecated This will be removed in a future version */
  @coreProperty()
  public declare secondary: boolean;

  @coreProperty()
  public declare inverted: boolean;
}
