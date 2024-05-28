import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IMenuOption } from './index';
import { IMenuComponent } from './menu';
import { MENU_CONSTANTS, IMenuSelectEventData, IMenuOptionGroup } from './menu-constants';
import { IListDropdownConfig, IListDropdown, ListDropdown } from '../list-dropdown';
import { IListComponent, IListItemComponent, LIST_CONSTANTS, LIST_ITEM_CONSTANTS } from '../list';

export interface IMenuAdapter extends IBaseAdapter {
  getDropdownElement(): HTMLElement | null;
  initializeTarget(): void;
  initializeAccessibility(id: string): void;
  hasTargetElement(): boolean;
  addTargetListener(event: string, callback: (event: Event) => void, bubbles?: boolean): void;
  removeTargetListener(event: string, callback: (event: Event) => void): void;
  destroyListDropdown(): void;
  attachMenu(config: IListDropdownConfig): void;
  detachMenu(): Promise<void>;
  setOptions(options: Array<IMenuOption | IMenuOptionGroup>): void;
  getActiveOptionIndex(): number;
  setActiveOption(index: number): void;
  activateFirstOption(): void;
  setCascadeTargetInactive(): void;
  propagateKey(key: string): void;
  proxyKeyboardEventToChild(evt: KeyboardEvent, id: string): void;
  toggleChildMenu(index: number, open?: boolean): void;
  focusTarget(): void;
  isTargetFocused(): boolean;
  updateActiveDescendant(id: string): void;
  isOwnElement(element: Element): boolean;
  addDropdownListener(type: string, listener: (evt: any) => void): void;
  createChildMenu(index: number, parentValue: any, openCb: (index: number) => void, closeCb: (index: number) => void, selectCb: (data: IMenuSelectEventData) => void): IMenuComponent;
  closeOtherChildMenus(excludeIndex?: number): void;
  setSelectedValues(values: any[]): void;
}

export class MenuAdapter extends BaseAdapter<IMenuComponent> implements IMenuAdapter {
  private _targetElement: HTMLElement | null;
  private _listDropdown: IListDropdown | undefined;
  private _childMenus = new Map<number, IMenuComponent>();

  constructor(component: IMenuComponent) {
    super(component);
  }

  public getDropdownElement(): HTMLElement | null {
    return this._listDropdown?.dropdownElement ?? null;
  }

  public hasTargetElement(): boolean {
    return !!this._targetElement;
  }

  public initializeTarget(): void {
    this._targetElement = this._component.querySelector(MENU_CONSTANTS.selectors.TOGGLE);
    if (!this._targetElement) {
      this._targetElement = this._component.firstElementChild as HTMLElement;
    }
  }

  public initializeAccessibility(id: string): void {
    if (!this._targetElement) {
      return;
    }

    this._targetElement.setAttribute('aria-atomic', 'true');
    this._targetElement.setAttribute('aria-live', 'assertive');
    this._targetElement.setAttribute('aria-haspopup', 'true');
    this._targetElement.setAttribute('aria-expanded', 'false');

    if (!this._targetElement.hasAttribute('aria-label')) {
      this._targetElement.setAttribute('aria-label', this._targetElement.textContent || '');
    }
  }

  public addTargetListener(event: string, callback: (event: Event) => void, bubbles = false): void {
    if (this._targetElement) {
      this._targetElement.addEventListener(event, callback, bubbles);
    }
  }

  public removeTargetListener(event: string, callback: (event: Event) => void): void {
    if (this._targetElement) {
      this._targetElement.removeEventListener(event, callback);
    }
  }

  public attachMenu(config: IListDropdownConfig): void {
    if (this._listDropdown || !this._targetElement) {
      return;
    }
    this._listDropdown = new ListDropdown(this._targetElement as HTMLElement, config);
    this._listDropdown.open();
    this._targetElement.setAttribute('aria-expanded', 'true');
    this._targetElement.setAttribute('aria-controls', `list-dropdown-popup-${config.id}`);
  }

  public setOptions(options: Array<IMenuOption | IMenuOptionGroup>): void {
    this._listDropdown?.setOptions(options);
  }

  public destroyListDropdown(): void {
    this._listDropdown?.destroy();
    this._listDropdown = undefined;
  }

  public async detachMenu(): Promise<void> {
    this._targetElement?.removeAttribute('aria-activedescendant');
    this._targetElement?.removeAttribute('aria-expanded');
    this._targetElement?.removeAttribute('aria-controls');

    await this._listDropdown?.close();
    this._listDropdown?.destroy();
    this._listDropdown = undefined;
  }

  public setActiveOption(index: number): void {
    this._listDropdown?.activateOption(index);
  }

  public activateFirstOption(): void {
    this._listDropdown?.activateFirstOption();
  }

  public setCascadeTargetInactive(): void {
    const listItem = this._targetElement as IListItemComponent;
    if (listItem?.active) {
      listItem.active = false;
    }
  }

  public getActiveOptionIndex(): number {
    return this._listDropdown?.getActiveOptionIndex() ?? -1;
  }

  public focusTarget(): void {
    this._targetElement?.focus();
  }

  public isTargetFocused(): boolean {
    return document.activeElement === this._targetElement;
  }

  public updateActiveDescendant(id: string): void {
    if (!this._targetElement) {
      return;
    }
    if (id) {
      this._targetElement.setAttribute('aria-activedescendant', id);
    } else {
      this._targetElement.removeAttribute('aria-activedescendant');
    }
  }

  public addDropdownListener(type: string, listener: (evt: any) => void): void {
    if (!this._listDropdown || !this._listDropdown.dropdownElement) {
      return;
    }
    this._listDropdown.dropdownElement.addEventListener(type, listener);
  }

  public isOwnElement(el: Element): boolean {
    if (!this._targetElement || !this._listDropdown || !this._listDropdown.dropdownElement) {
      return false;
    }
    return this._targetElement.contains(el) || !!this._listDropdown.dropdownElement.contains(el);
  }

  public propagateKey(key: string): void {
    this._listDropdown?.handleKey(key);
  }

  public proxyKeyboardEventToChild(evt: KeyboardEvent, id: string): void {
    if (!this.getDropdownElement()) {
      return;
    }
    const openMenu = this._getOpenChildMenu(id);
    if (openMenu) {
      openMenu.propagateKeyEvent(evt);
    }
  }

  public toggleChildMenu(index: number, open?: boolean): void {
    const listItems = this._getListItems();
    const listItem = listItems[index];
    const childMenu = listItem.parentElement as IMenuComponent;
    if (childMenu && childMenu.tagName.toLowerCase() === MENU_CONSTANTS.elementName) {
      if (open === undefined) {
        childMenu.open = !childMenu.open;
      } else {
        childMenu.open = open;
      }
      childMenu.activateFirstOption();
    }
  }

  public createChildMenu(index: number, parentValue: any, openCb: (index: number) => void, closeCb: (index: number) => void, selectCb: (data: IMenuSelectEventData) => void): IMenuComponent {
    const menu = document.createElement('forge-menu');
    menu.style.display = 'block';

    // Set listeners to notify the parent menu when anything important happens within a child menu that needs to be propagated to the root menu
    menu.addEventListener(MENU_CONSTANTS.events.OPEN, () => {
      this._childMenus.set(index, menu);
      openCb(index);
    });
    menu.addEventListener(MENU_CONSTANTS.events.CLOSE, () => {
      this._childMenus.delete(index);
      closeCb(index);
    });
    menu.addEventListener(MENU_CONSTANTS.events.SELECT, (evt: CustomEvent<IMenuSelectEventData>) => {
      evt.stopPropagation();
      selectCb({ ...evt.detail, parentValue });
    });

    return menu;
  }

  public closeOtherChildMenus(excludeIndex?: number): void {
    const menusToRemove: number[] = [];
    this._childMenus.forEach((menu, index) => {
      if (index !== excludeIndex) {
        menu.open = false;
        menusToRemove.push(index);
      }
    });
    menusToRemove.forEach(index => this._childMenus.delete(index));
  }

  public setSelectedValues(values: any[]): void {
    this._listDropdown?.setSelectedValues(values);
  }

  private _getOpenChildMenu(id: string): IMenuComponent | null {
    if (!this.getDropdownElement()) {
      return null;
    }
    const list = this._getOwnList(id);
    return list ? list.querySelector(`${MENU_CONSTANTS.elementName}[${MENU_CONSTANTS.attributes.OPEN}]`) : null;
  }

  private _getOwnList(id: string): IListComponent | null {
    const popup = this.getDropdownElement();
    if (!popup) {
      return null;
    }
    return popup.querySelector(`${LIST_CONSTANTS.elementName}[id="list-dropdown-list-${id}"]`);
  }

  private _getListItems(): IListItemComponent[] {
    const popup = this.getDropdownElement();
    if (!popup) {
      return [];
    }
    const listElement = popup.querySelector(LIST_CONSTANTS.elementName);
    if (listElement) {
      return Array.from(listElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
    }
    return [];
  }
}
