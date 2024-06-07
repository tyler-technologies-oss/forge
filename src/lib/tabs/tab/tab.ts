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
 * @property {boolean} [disabled=false] - The disabled state of the tab.
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
 * @attribute [secondary=false] - Controls whether the tab is styled as secondary tab navigation.
 * @attribute [inverted=false] - Controls whether the tab indicator is rendered on the opposite side of the tab.
 *
 * @event {CustomEvent<void>} forge-tab-select - Dispatched when the tab is selected. This event bubbles and it can be useful to capture it on the `<forge-tab-bar>` element.
 *
 * @cssproperty --forge-tab-indicator-color - The color of the tab indicator. Defaults to the primary theme.
 * @cssproperty --forge-tab-indicator-height - The height of the tab indicator.
 * @cssproperty --forge-tab-indicator-shape - The shape of the tab indicator.
 * @cssproperty --forge-tab-container-color - The color of the tab container. Defaults to the surface theme.
 * @cssproperty --forge-tab-height - The height of the tab.
 * @cssproperty --forge-tab-shape - The shape of the tab.
 * @cssproperty --forge-tab-disabled-opacity - The opacity of the tab when disabled.
 * @cssproperty --forge-tab-active-focus-icon-color - The color of the icon when the tab is active and focused. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-hover-icon-color - The color of the icon when the tab is active and hovered. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-icon-color - The color of the icon when the tab is active. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-pressed-icon-color - The color of the icon when the tab is active and pressed. Defaults to the primary theme.
 * @cssproperty --forge-tab-icon-size - The size of the icon.
 * @cssproperty --forge-tab-focus-icon-color - The color of the icon when the tab is focused. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-hover-icon-color - The color of the icon when the tab is hovered. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-icon-color - The color of the icon. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-pressed-icon-color - The color of the icon when the tab is pressed. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-active-focus-label-text-color - The color of the label text when the tab is active and focused. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-hover-label-text-color - The color of the label text when the tab is active and hovered. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-label-text-color - The color of the label text when the tab is active. Defaults to the primary theme.
 * @cssproperty --forge-tab-active-pressed-label-text-color - The color of the label text when the tab is active and pressed. Defaults to the primary theme.
 * @cssproperty --forge-tab-focus-label-text-color - The color of the label text when the tab is focused. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-hover-label-text-color - The color of the label text when the tab is hovered. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-label-text-color - The color of the label text. Defaults to the text-on-background theme.
 * @cssproperty --forge-tab-pressed-label-text-color - The color of the label text when the tab is pressed. Defaults to the text-on-background theme.
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

  @coreProperty()
  public declare secondary: boolean;

  @coreProperty()
  public declare inverted: boolean;
}
