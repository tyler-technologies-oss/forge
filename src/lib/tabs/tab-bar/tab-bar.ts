import { attachShadowTemplate, coerceBoolean, coerceNumber, coreProperty, customElement } from '@tylertech/forge-core';
import { tylIconKeyboardArrowDown, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp } from '@tylertech/tyler-icons/standard';
import { setDefaultAria } from '../../constants';
import { Nullable } from '../../core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { TabComponent } from '../tab/tab';
import { TabBarAdapter } from './tab-bar-adapter';
import { ITabBarChangeEventData, TAB_BAR_CONSTANTS } from './tab-bar-constants';
import { TabBarCore } from './tab-bar-core';

import template from './tab-bar.html';
import styles from './tab-bar.scss';

export interface ITabBarComponent extends IBaseComponent, IWithDefaultAria, IWithElementInternals {
  disabled: boolean;
  activeTab: Nullable<number>;
  vertical: boolean;
  clustered: boolean;
  stacked: boolean;
  /** @deprecated This will be removed in a future version */
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
 * @property {boolean} [disabled=false] - Sets the disabled state of all child tabs.  If true, any new tabs added to the DOM will be disabled by default. This can be used instead of setting individual tab disabled properties, mixing the two methods of disabling is not supported.
 * @property {number} [activeTab=null] - The index of the active tab.
 * @property {boolean} [vertical=false] - Controls whether the tab bar is vertical or horizontal.
 * @property {boolean} [clustered=false] - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @property {boolean} [stacked=false] - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @property {boolean} [secondary=false] - Deprecated. Controls whether the tabs are styled as secondary tab navigation.
 * @property {boolean} [inverted=false] - Controls whether the tabs are rendered inverted (tab indicator at top instead of bottom).
 * @property {boolean} [autoActivate=false] - Controls whether the tabs are automatically activated when receiving focus.
 * @property {boolean} [scrollButtons=false] - Controls whether scroll buttons are displayed when the tabs overflow their container.
 *
 * @attribute {boolean} [disabled=false] - The disabled state of the tab bar.
 * @attribute {number} [active-tab=null] - The index of the active tab.
 * @attribute {boolean} [vertical=false] - Controls whether the tab bar is vertical or horizontal.
 * @attribute {boolean} [clustered=false] - Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
 * @attribute {boolean} [stacked=false] - Controls whether the tabs are taller to allow for slotted leading/trailing elements.
 * @attribute {boolean} [secondary=false] - Deprecated. Controls whether the tabs are styled as secondary tab navigation.
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
  dependencies: [TabComponent, IconButtonComponent, IconComponent]
})
export class TabBarComponent extends WithDefaultAria(WithElementInternals(BaseComponent)) implements ITabBarComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TAB_BAR_CONSTANTS.observedAttributes);
  }

  private _core: TabBarCore;

  constructor() {
    super();
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp, tylIconKeyboardArrowDown]);
    attachShadowTemplate(this, template, styles);
    this._core = new TabBarCore(new TabBarAdapter(this));
  }

  public connectedCallback(): void {
    this[setDefaultAria]({ role: 'tablist' }, { setAttribute: true });
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
  declare public disabled: boolean;

  @coreProperty()
  declare public activeTab: Nullable<number>;

  @coreProperty()
  declare public vertical: boolean;

  @coreProperty()
  declare public clustered: boolean;

  @coreProperty()
  declare public stacked: boolean;

  /** @deprecated This will be removed in a future version */
  @coreProperty()
  declare public secondary: boolean;

  @coreProperty()
  declare public inverted: boolean;

  @coreProperty()
  declare public autoActivate: boolean;

  @coreProperty()
  declare public scrollButtons: boolean;
}
