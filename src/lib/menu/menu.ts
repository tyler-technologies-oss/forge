import { attachShadowTemplate, coerceBoolean, customElement, ensureChild, coreProperty, isDefined } from '@tylertech/forge-core';
import { tylIconArrowRight } from '@tylertech/tyler-icons/standard';
import { PositionPlacement } from '../core/utils/position-utils';
import { IconRegistry } from '../icon';
import { ListComponent } from '../list';
import { IListDropdownAware, ListDropdownAware } from '../list-dropdown/list-dropdown-aware';
import type { IOverlayOffset } from '../overlay/overlay-constants';
import { PopoverComponent } from '../popover';
import { MenuAdapter } from './menu-adapter';
import { IMenuActiveChangeEventData, IMenuOption, IMenuOptionGroup, IMenuSelectEventData, MenuMode, MenuOptionBuilder, MenuOptionFactory, MENU_CONSTANTS } from './menu-constants';
import { MenuCore } from './menu-core';

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
 */
@customElement({
  name: MENU_CONSTANTS.elementName,
  dependencies: [
    PopoverComponent,
    ListComponent
  ]
})
export class MenuComponent extends ListDropdownAware implements IMenuComponent {
  public static get observedAttributes(): string[] {
    return [
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
      MENU_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD
    ];
  }

  private _core: MenuCore;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowRight);
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
    }
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }

  /** Gets/sets the open state. */
  @coreProperty()
  public declare open: boolean;

  /** Gets/sets the array of options to display in the menu. */
  @coreProperty()
  public declare options: Array<IMenuOption | IMenuOptionGroup> | MenuOptionFactory;

  /** Gets/sets the selected option to the index. Does not support cascading menus. */
  @coreProperty()
  public declare selectedIndex: number;

  /** Gets/sets the value of the option to select. */
  @coreProperty()
  public declare selectedValue: any;

  /** Gets/sets the menu placement (default is bottom-left). */
  @coreProperty()
  public declare placement: `${PositionPlacement}`;

  /** Gets/sets the fallback menu placement for overriding the default of any side. */
  @coreProperty()
  public declare fallbackPlacements: `${PositionPlacement}`[];

  /** Gets/sets dense state of the list options used in the menu popup. */
  @coreProperty()
  public declare dense: boolean;

  /** Gets/sets the class name to use for option icons. */
  @coreProperty()
  public declare iconClass: string;

  /**
   * Gets/sets whether selection of menu items is persisted.
   * @deprecated Please use `<forge-select-dropdown>` for handling selection states.
   */
  @coreProperty()
  public declare persistSelection: boolean;

  /** Gets/sets the mode that this menu is using. */
  @coreProperty()
  public declare mode: MenuMode;

  /** Sets the position adjustment on the internal popup element. */
  @coreProperty()
  public declare popupOffset: IOverlayOffset;

  /** Sets the callback that will be executed for each option in the dropdown for producing custom option templates. */
  @coreProperty()
  public declare optionBuilder: MenuOptionBuilder;

  /**
   * Gets the currently active popup element when the dropdown is open.
   * @readonly
   */
  @coreProperty({ set: false })
  public declare popupElement: HTMLElement | undefined;

  /** Force propagates the key event from another element this component. */
  public propagateKeyEvent(evt: KeyboardEvent): void {
    this._core.onKeydown(evt);
  }

  public activateFirstOption(): void {
    this._core.activateFirstOption();
  }
}
