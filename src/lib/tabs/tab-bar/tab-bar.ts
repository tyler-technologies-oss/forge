import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, coreProperty } from '@tylertech/forge-core';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { TabComponent } from '../tab/tab';
import { TabBarAdapter } from './tab-bar-adapter';
import { ITabBarChangeEventData, TAB_BAR_CONSTANTS } from './tab-bar-constants';
import { TabBarCore } from './tab-bar-core';
import { tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons/standard';

import template from './tab-bar.html';
import styles from './tab-bar.scss';

export interface ITabBarComponent extends IBaseComponent {
  disabled: boolean;
  activeTab: number | null | undefined;
  vertical: boolean;
  clustered: boolean;
  stacked: boolean;
  secondary: boolean;
  inverted: boolean;
  autoActivate: boolean;
  scrollButtons: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab-bar': ITabBarComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-bar-change': CustomEvent<ITabBarChangeEventData>;
  }
}

/**
 * @tag forge-tab-bar
 * 
 * @summary Tabs organize content across different screens and views.
 * 
 * @description
 * Use tabs to group content into helpful categories. Tabs are typically placed
 * above the content they relate to. Tabs can be used to navigate between screens,
 * or to group related content within a screen.
 * 
 * @dependency forge-tab
 * @dependency forge-icon-button
 * @dependency forge-icon
 * 
 * @property {boolean} [disabled=false] - The disabled state of the tab bar.
 * @property {number} [activeTab=null] - The index of the active tab.
 * @property {boolean} [vertical=false] - Controls whether the tab bar is vertical or horizontal.
 * @property {boolean} [clustered=false] - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @property {boolean} [stacked=false] - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @property {boolean} [secondary=false] - Controls whether the tabs are styled as secondary tab navigation.
 * @property {boolean} [inverted=false] - Controls whether the tabs are rendered inverted (tab indicator at top instead of bottom).
 * @property {boolean} [autoActivate=false] - Controls whether the tabs are automatically activated when receiving focus.
 * @property {boolean} [scrollButtons=false] - Controls whether scroll buttons are displayed when the tabs overflow their container.
 * 
 * @attribute {boolean} [disabled=false] - The disabled state of the tab bar.
 * @attribute {number} [active-tab=null] - The index of the active tab.
 * @attribute {boolean} [vertical=false] - Controls whether the tab bar is vertical or horizontal.
 * @attribute {boolean} [clustered=false] - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @attribute {boolean} [stacked=false] - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @attribute {boolean} [secondary=false] - Controls whether the tabs are styled as secondary tab navigation.
 * @attribute {boolean} [auto-activate=false] - Controls whether the tabs are automatically activated when receiving focus.
 * @attribute {boolean} [scroll-buttons=false] - Controls whether scroll buttons are displayed when the tabs overflow their container.
 * 
 * @event {CustomEvent<ITabBarChangeEventData>} forge-tab-bar-change - Dispatches when the active tab changes.
 * 
 * @cssproperty --forge-tab-bar-justify - The `justify-content` value for the tab bar flex container.
 * @cssproperty --forge-tab-bar-stretch - The `flex` value for the child `<forge-tab>` elements.
 * @cssproperty --forge-tab-bar-divider-color - The color of the divider.
 * @cssproperty --forge-tab-bar-divider-thickness - The thickness of the divider.
 * 
 * @csspart container - The container element.
 * @csspart scroll-container - The scroll container element.
 */
@customElement({
  name: TAB_BAR_CONSTANTS.elementName,
  dependencies: [
    TabComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class TabBarComponent extends BaseComponent implements ITabBarComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TAB_BAR_CONSTANTS.observedAttributes);
  }

  private _core: TabBarCore;

  constructor() {
    super();
    IconRegistry.define([
      tylIconKeyboardArrowLeft,
      tylIconKeyboardArrowRight,
      tylIconKeyboardArrowUp,
      tylIconKeyboardArrowDown
    ]);
    attachShadowTemplate(this, template, styles);
    this._core = new TabBarCore(new TabBarAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TAB_BAR_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.ACTIVE_TAB:
        this.activeTab = newValue ? coerceNumber(newValue) : undefined;
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.CLUSTERED:
        this.clustered = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.STACKED:
        this.stacked = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.SECONDARY:
        this.secondary = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.AUTO_ACTIVATE:
        this.autoActivate = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.observedAttributes.SCROLL_BUTTONS:
        this.scrollButtons = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare activeTab: number | null | undefined;

  @coreProperty()
  public declare vertical: boolean;

  @coreProperty()
  public declare clustered: boolean;

  @coreProperty()
  public declare stacked: boolean;

  @coreProperty()
  public declare secondary: boolean;

  @coreProperty()
  public declare inverted: boolean;

  @coreProperty()
  public declare autoActivate: boolean;

  @coreProperty()
  public declare scrollButtons: boolean;
}
