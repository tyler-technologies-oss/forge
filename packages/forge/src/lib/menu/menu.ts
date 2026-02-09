import { attachShadowTemplate, coerceBoolean, customElement, ensureChild, coreProperty, isDefined } from '@tylertech/forge-core';
import { tylIconArrowRightAlt } from '@tylertech/tyler-icons';
import { PositionPlacement } from '../core/utils/position-utils.js';
import { IconRegistry } from '../icon/index.js';
import { ListComponent } from '../list/index.js';
import { IListDropdownAware, ListDropdownAware } from '../list-dropdown/list-dropdown-aware.js';
import type { IOverlayOffset } from '../overlay/overlay-constants.js';
import { PopoverComponent } from '../popover/index.js';
import { MenuAdapter } from './menu-adapter.js';
import {
  IMenuActiveChangeEventData,
  IMenuOption,
  IMenuOptionGroup,
  IMenuSelectEventData,
  MenuMode,
  MenuOptionBuilder,
  MenuOptionFactory,
  MENU_CONSTANTS
} from './menu-constants.js';
import { MenuCore } from './menu-core.js';
import { TooltipComponent } from '../tooltip/index.js';

import template from './menu.html';
import styles from './menu.scss';

export interface IMenuComponent extends IListDropdownAware {
  open: boolean;
  options: Array<IMenuOption | IMenuOptionGroup> | MenuOptionFactory;
  selectedIndex: number;
  selectedValue: number;
  placement: PositionPlacement;
  fallbackPlacements: PositionPlacement[];
  dense: boolean;
  iconClass: string;
  persistSelection: boolean;
  mode: MenuMode;
  popupOffset: IOverlayOffset;
  optionBuilder: MenuOptionBuilder | undefined;
  popupElement: HTMLElement | undefined;
  popupTarget: string | null;
  propagateKeyEvent(evt: KeyboardEvent): void;
  activateFirstOption(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-menu': IMenuComponent;
  }

  interface HTMLElementEventMap {
    'forge-menu-select': CustomEvent<IMenuSelectEventData>;
    'forge-menu-open': CustomEvent<void>;
    'forge-menu-close': CustomEvent<void>;
    'forge-menu-active-change': CustomEvent<IMenuActiveChangeEventData>;
  }
}

/**
 * @tag forge-menu
 *
 * @summary Menus display a list of options or actions that users can select from a dropdown. Menus wrap button or list item elements to provide the trigger for displaying the menu options.
 *
 * @dependency forge-popover
 * @dependency forge-list
 *
 * @event {CustomEvent<IMenuSelectEventData>} forge-menu-select - Dispatches when a menu option is selected.
 * @event {CustomEvent<void>} forge-menu-open - Dispatches when the menu is opened.
 * @event {CustomEvent<void>} forge-menu-close - Dispatches when the menu is closed.
 * @event {CustomEvent<IMenuActiveChangeEventData>} forge-menu-active-change - Dispatches when the active menu option changes.
 */
@customElement({
  name: MENU_CONSTANTS.elementName,
  dependencies: [PopoverComponent, ListComponent, TooltipComponent]
})
export class MenuComponent extends ListDropdownAware implements IMenuComponent {
  public static get observedAttributes(): string[] {
    return [
      ...ListDropdownAware.observedAttributes,
      MENU_CONSTANTS.attributes.OPEN,
      MENU_CONSTANTS.attributes.PLACEMENT,
      MENU_CONSTANTS.attributes.SELECTED_INDEX,
      MENU_CONSTANTS.attributes.SELECTED_VALUE,
      MENU_CONSTANTS.attributes.DENSE,
      MENU_CONSTANTS.attributes.ICON_CLASS,
      MENU_CONSTANTS.attributes.PERSIST_SELECTION,
      MENU_CONSTANTS.attributes.MODE,
      MENU_CONSTANTS.attributes.SYNC_POPUP_WIDTH,
      MENU_CONSTANTS.attributes.POPUP_CLASSES,
      MENU_CONSTANTS.attributes.OPTION_LIMIT,
      MENU_CONSTANTS.attributes.OBSERVE_SCROLL,
      MENU_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD,
      MENU_CONSTANTS.attributes.POPUP_TARGET
    ];
  }

  private _core: MenuCore;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowRightAlt);
    this._core = new MenuCore(new MenuAdapter(this));
    attachShadowTemplate(this, template, styles);
  }

  public connectedCallback(): void {
    if (this.querySelector(MENU_CONSTANTS.selectors.TOGGLE)) {
      this._core.initialize();
    } else {
      ensureChild(this, MENU_CONSTANTS.selectors.TOGGLE).then(() => this._core.initialize());
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case MENU_CONSTANTS.attributes.OPEN:
        this._core.open = isDefined(newValue);
        break;
      case MENU_CONSTANTS.attributes.PLACEMENT:
        this._core.placement = newValue as PositionPlacement;
        break;
      case MENU_CONSTANTS.attributes.SELECTED_INDEX:
        this._core.selectedIndex = Number(newValue);
        break;
      case MENU_CONSTANTS.attributes.SELECTED_VALUE:
        this._core.selectedValue = newValue;
        break;
      case MENU_CONSTANTS.attributes.DENSE:
        this._core.dense = coerceBoolean(newValue);
        break;
      case MENU_CONSTANTS.attributes.ICON_CLASS:
        this._core.iconClass = newValue;
        break;
      case MENU_CONSTANTS.attributes.PERSIST_SELECTION:
        this.persistSelection = coerceBoolean(newValue);
        break;
      case MENU_CONSTANTS.attributes.MODE:
        this.mode = newValue as MenuMode;
        break;
      case MENU_CONSTANTS.attributes.POPUP_TARGET:
        this._core.popupTarget = isDefined(newValue) ? newValue : null;
        break;
    }
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  /**
   * Gets/sets the open state.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public open: boolean;

  /**
   * Gets/sets the array of options to display in the menu.
   * @default []
   */
  @coreProperty()
  declare public options: Array<IMenuOption | IMenuOptionGroup> | MenuOptionFactory;

  /**
   * Gets/sets the selected option to the index. Does not support cascading menus.
   * @attribute selected-index
   * @deprecated Do not use menus for selection. Consider a `<forge-select>` instead.
   */
  @coreProperty()
  declare public selectedIndex: number;

  /**
   * Gets/sets the value of the option to select.
   * @deprecated Do not use menus for selection. Consider a `<forge-select>` instead.
   * @attribute selected-value
   */
  @coreProperty()
  declare public selectedValue: any;

  /**
   * Gets/sets the menu placement (default is bottom-left).
   * @default "bottom-start"
   * @attribute
   */
  @coreProperty()
  declare public placement: `${PositionPlacement}`;

  /**
   * Gets/sets the fallback menu placement for overriding the default of any side.
   * @attribute fallback-placements
   */
  @coreProperty()
  declare public fallbackPlacements: `${PositionPlacement}`[];

  /**
   * Gets/sets dense state of the list options used in the menu popup.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public dense: boolean;

  /**
   * Gets/sets the class name to use for option icons.
   * @attribute icon-class
   */
  @coreProperty()
  declare public iconClass: string;

  /**
   * Gets/sets whether selection of menu items is persisted.
   * @deprecated Please use `<forge-select-dropdown>` for handling selection states.
   */
  @coreProperty()
  declare public persistSelection: boolean;

  /**
   * Gets/sets the mode that this menu is using.
   * @default "click"
   * @attribute
   */
  @coreProperty()
  declare public mode: MenuMode;

  /**
   * Sets the position adjustment on the internal popup element.
   */
  @coreProperty()
  declare public popupOffset: IOverlayOffset;

  /**
   * Sets the callback that will be executed for each option in the dropdown for producing custom option templates.
   */
  @coreProperty()
  declare public optionBuilder: MenuOptionBuilder;

  /**
   * Gets the currently active popup element when the dropdown is open.
   * @readonly
   */
  @coreProperty({ set: false })
  declare public popupElement: HTMLElement | undefined;

  /**
   * Gets/sets the ID of the element to use as the popup anchor for positioning.
   * When null or empty, the target element (button) is used for both interaction and positioning.
   * This is useful for cases like forge-list-item > button where the menu should be
   * attached to the button for listeners but positioned relative to the list item.
   * @default null
   * @attribute popup-target
   */
  @coreProperty()
  declare public popupTarget: string | null;

  /**
   * Force propagates the key event from another element to this component.
   */
  public propagateKeyEvent(evt: KeyboardEvent): void {
    this._core.onKeydown(evt);
  }

  /**
   * Activates the first option in the menu when open.
   */
  public activateFirstOption(): void {
    this._core.activateFirstOption();
  }
}
