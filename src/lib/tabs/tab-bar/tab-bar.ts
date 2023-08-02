import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { TabComponent } from '../tab/tab';
import { TabBarAdapter } from './tab-bar-adapter';
import { TAB_BAR_CONSTANTS } from './tab-bar-constants';
import { TabBarFoundation } from './tab-bar-foundation';
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
    'forge-tab-bar-change': CustomEvent<number>;
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
 * @property {boolean} disabled - The disabled state of the tab bar.
 * @property {number} activeTab - The index of the active tab.
 * @property {boolean} vertical - Controls whether the tab bar is vertical or horizontal.
 * @property {boolean} clustered - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @property {boolean} stacked - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @property {boolean} secondary - Controls whether the tabs are styled as secondary tab navigation.
 * @property {boolean} inverted - Controls whether the tabs are rendered inverted (tab indicator at top instead of bottom).
 * @property {boolean} autoActivate - Controls whether the tabs are automatically activated when receiving focus.
 * @property {boolean} scrollButtons - Controls whether scroll buttons are displayed when the tabs overflow their container.
 * 
 * @attribute disabled - The disabled state of the tab bar.
 * @attribute active-tab - The index of the active tab.
 * @attribute vertical - Controls whether the tab bar is vertical or horizontal.
 * @attribute clustered - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @attribute stacked - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @attribute secondary - Controls whether the tabs are styled as secondary tab navigation.
 * @attribute auto-activate - Controls whether the tabs are automatically activated when receiving focus.
 * @attribute scroll-buttons - Controls whether scroll buttons are displayed when the tabs overflow their container.
 * 
 * @event forge-tab-bar-change {CustomEvent<number>} - Dispatches when the active tab changes.
 * 
 * @cssproperty --forge-tab-bar-justify - The `justify-content` value for the tab bar flex container.
 * @cssproperty --forge-tab-bar-stretch - The `flex` value for the child `<forge-tab>` elements.
 * @cssproperty --forge-tab-bar-divider-color - The color of the divider.
 * @cssproperty --forge-tab-bar-divider-thickness - The thickness of the divider.
 * 
 * @csspart container - The container element.
 * @csspart scroll-container - The scroll container element.
 */
@CustomElement({
  name: TAB_BAR_CONSTANTS.elementName,
  dependencies: [
    TabComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class TabBarComponent extends BaseComponent implements ITabBarComponent {
  public static get observedAttributes(): string[] {
    return [
      TAB_BAR_CONSTANTS.attributes.DISABLED,
      TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB,
      TAB_BAR_CONSTANTS.attributes.VERTICAL,
      TAB_BAR_CONSTANTS.attributes.CLUSTERED,
      TAB_BAR_CONSTANTS.attributes.STACKED,
      TAB_BAR_CONSTANTS.attributes.SECONDARY,
      TAB_BAR_CONSTANTS.attributes.INVERTED,
      TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE,
      TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS
    ];
  }

  private _foundation: TabBarFoundation;

  constructor() {
    super();
    IconRegistry.define([
      tylIconKeyboardArrowLeft,
      tylIconKeyboardArrowRight,
      tylIconKeyboardArrowUp,
      tylIconKeyboardArrowDown
    ]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new TabBarFoundation(new TabBarAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TAB_BAR_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB:
        this.activeTab = newValue ? coerceNumber(newValue) : undefined;
        break;
      case TAB_BAR_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.CLUSTERED:
        this.clustered = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.STACKED:
        this.stacked = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.SECONDARY:
        this.secondary = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE:
        this.autoActivate = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS:
        this.scrollButtons = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare activeTab: number | null | undefined;

  @FoundationProperty()
  public declare vertical: boolean;

  @FoundationProperty()
  public declare clustered: boolean;

  @FoundationProperty()
  public declare stacked: boolean;

  @FoundationProperty()
  public declare secondary: boolean;

  @FoundationProperty()
  public declare inverted: boolean;

  @FoundationProperty()
  public declare autoActivate: boolean;

  @FoundationProperty()
  public declare scrollButtons: boolean;
}
