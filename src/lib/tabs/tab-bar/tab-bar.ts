import { CustomElement, attachShadowTemplate, coerceNumber, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight } from '@tylertech/tyler-icons/standard';
import { TabComponent } from '../tab/tab';
import { IconButtonComponent } from '../../icon-button';
import { TAB_BAR_CONSTANTS, TabBarLayoutMode, TabBarLayoutAlign, ITabBarActivateEventData } from './tab-bar-constants';
import { TabBarFoundation } from './tab-bar-foundation';
import { TabBarAdapter } from './tab-bar-adapter';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './tab-bar.html';
import styles from './tab-bar.scss';

export interface ITabBarComponent extends IBaseComponent {
  activeTab: number;
  layoutMode: TabBarLayoutMode;
  layoutAlign: TabBarLayoutAlign;
  underline: boolean;
  autoActivate: boolean;
  stacked: boolean;
  scrollButtons: boolean;
  forceScrollButtons: boolean;
  activateTab(index: number): void;
  scrollTabIntoView(index: number): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab-bar': ITabBarComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-bar-activate': CustomEvent<ITabBarActivateEventData>;
  }
}

/**
 * The custom element class behind the `<forge-tab-bar>` element.
 * 
 * @tag forge-tab-bar
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
      TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB,
      TAB_BAR_CONSTANTS.attributes.LAYOUT_MODE,
      TAB_BAR_CONSTANTS.attributes.LAYOUT_ALIGN,
      TAB_BAR_CONSTANTS.attributes.UNDERLINE,
      TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE,
      TAB_BAR_CONSTANTS.attributes.STACKED,
      TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS,
      TAB_BAR_CONSTANTS.attributes.FORCE_SCROLL_BUTTONS
    ];
  }

  private _foundation: TabBarFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new TabBarFoundation(new TabBarAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB:
        this.activeTab = coerceNumber(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.LAYOUT_MODE:
        this.layoutMode = newValue as TabBarLayoutMode;
        break;
      case TAB_BAR_CONSTANTS.attributes.LAYOUT_ALIGN:
        this.layoutAlign = newValue as TabBarLayoutAlign;
        break;
      case TAB_BAR_CONSTANTS.attributes.UNDERLINE:
        this.underline = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE:
        this.autoActivate = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.STACKED:
        this.stacked = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS:
        this.scrollButtons = coerceBoolean(newValue);
        break;
      case TAB_BAR_CONSTANTS.attributes.FORCE_SCROLL_BUTTONS:
        this.forceScrollButtons = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets and sets the active tab index. */
  @FoundationProperty()
  public activeTab: number;

  /** Gets/sets the layout mode that controls how the tabs are sized and rendered. */
  @FoundationProperty()
  public layoutMode: TabBarLayoutMode;

  /** Gets/sets the layout alignment. Only pertains to non-full width layout modes. */
  @FoundationProperty()
  public layoutAlign: TabBarLayoutAlign;

  /** Gets/sets whether the component displays an underline or not. Default is `false`. */
  @FoundationProperty()
  public underline: boolean;

  /** Gets/sets whether tabs are auto-activated when using arrow keys. Default is `true` */
  @FoundationProperty()
  public autoActivate: boolean;

  /** Gets/sets whether the tabs are displayed with as their stacked variant. Default is `false`. */
  @FoundationProperty()
  public stacked: boolean;

  /** Gets/sets whether the scroll buttons can be displayed or not. Default is `true`. The component handles visibility automatically. */
  @FoundationProperty()
  public scrollButtons: boolean;

  /** Gets/sets whether the scroll buttons are visible indefinitely or not. Default is `false`. */
  @FoundationProperty()
  public forceScrollButtons: boolean;

  /**
   * Activates the tab at the given index.
   * @param index The index of the tab.
   */
  public activateTab(index: number): void {
    this._foundation.activateTab(index);
  }

  /**
   * Scrolls the tab at the given index into view.
   * @param index The index of the tab.
   */
  public scrollTabIntoView(index: number): void {
    this._foundation.scrollIntoView(index);
  }
}
