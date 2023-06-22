import { IListDropdownOption, IListDropdownOpenConfig, IListDropdownOptionGroup, LIST_DROPDOWN_CONSTANTS } from './list-dropdown-constants';
import { createDropdown, createList, createListItems, createAsyncElement, createBusyElement, createCheckboxElement } from './list-dropdown-utils';
import { IPopupComponent, POPUP_CONSTANTS } from '../popup';
import { IListComponent } from '../list/list';
import { LIST_ITEM_CONSTANTS, IListItemComponent, IListItemSelectEventData } from '../list/list-item';
import { ScrollEvents, getShadowElement, IScrollObserverConfiguration, ScrollAxisObserver, removeAllChildren, isFunction, removeElement, replaceElement, createVisuallyHiddenElement, isDeepEqual, tryScrollIntoView } from '@tylertech/forge-core';
import { ILinearProgressComponent } from '../linear-progress';
import { ICON_CONSTANTS, IIconComponent } from '../icon';

export interface IListDropdownAdapter {
  dropdownElement: HTMLElement | undefined;
  open(config: IListDropdownOpenConfig, selectCallback: (value: any, id: string) => void, closeCb: () => void): void;
  close(): void;
  setScrollBottomListener(listener: () => void, scrollThreshold: number): void;
  removeScrollBottomListener(listener: () => void): void;
  getActiveOptionIndex(): number;
  getSelectedOptionIndex(): number;
  getActiveOptionIdByIndex(index: number): string | null;
  toggleOptionMultiple(index: number, isSelected: boolean): void;
  scrollOptionIntoView(index: number): void;
  scrollSelectedOptionIntoView(animate?: boolean): void;
  activateSelectedOption(config: IListDropdownOpenConfig): void;
  activateOption(index: number, activeChangeCallback: ((id: string) => void) | undefined, animate?: boolean): void;
  setSelectedValues(values: any[], multiple?: boolean): void;
  clearActiveOption(): void;
  syncWidth(sync: boolean, targetWidthCallback?: () => number): void;
  setOptions(config: IListDropdownOpenConfig): void;
  appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>, config: IListDropdownOpenConfig): void;
  setBusyVisibility(isVisible: boolean): void;
  getScreenWidth(): number;
}

export class ListDropdownAdapter implements IListDropdownAdapter {
  private _dropdownElement: IPopupComponent | undefined;
  private _listElement: IListComponent | undefined;
  private _announcerElement: HTMLElement | undefined;
  private _scrollObserver: ScrollAxisObserver | undefined;
  private _asyncElement: HTMLElement | undefined;
  private _busyElement: ILinearProgressComponent;
  private _headerElement: HTMLElement;
  private _footerElement: HTMLElement;

  constructor(private _targetElement: HTMLElement) {}

  public get dropdownElement(): HTMLElement | undefined {
    return this._dropdownElement;
  }

  public open(config: IListDropdownOpenConfig, selectCallback: (value: any, id: string) => void, closeCb: () => void): void {
    // Now lets create the popup and append the children
    this._dropdownElement = createDropdown(config, this._targetElement);
    this.syncWidth(!!config.syncWidth, config.targetWidthCallback);

    // If we are configured to show a busy indicator (linear progress bar across the top), then create and append it first
    if (config.allowBusy) {
      this._busyElement = createBusyElement();
      this._busyElement.style.display = 'none';
      this._dropdownElement.appendChild(this._busyElement);
    }

    // Create the header element if a builder exists
    if (config.headerBuilder) {
      this._headerElement = config.headerBuilder();
      if (this._headerElement) {
        this._headerElement.setAttribute(LIST_DROPDOWN_CONSTANTS.attributes.DATA_ALLOW_FOCUS, '');
      }
    }
    
    // Create the footer element if a builder exists
    if (config.footerBuilder) {
      this._footerElement = config.footerBuilder();
      if (this._footerElement) {
        this._footerElement.setAttribute(LIST_DROPDOWN_CONSTANTS.attributes.DATA_ALLOW_FOCUS, '');
      }
    }

    // Create the list from our config
    this._listElement = createList(config);

    // Add the listener for when list items are selected from the dropdown
    this._listElement.addEventListener('forge-list-item-select', evt => {
      evt.detail.listItem.setAttribute('aria-selected', 'true');
      selectCallback(evt.detail.value, evt.detail.listItem.id);
    });

    // Determine if we need to show the list or the async element first
    if (config.options.length) {
      // Now we can create an append the list items
      createListItems(config, this._listElement);
      this._dropdownElement.appendChild(this._listElement);

      // Always append the optional header element **first**
      if (this._headerElement) {
        this._dropdownElement.insertAdjacentElement('afterbegin', this._headerElement);
      }

      // Always append the optional footer element **last**
      if (this._footerElement) {
        this._dropdownElement.appendChild(this._footerElement);
      }
    } else if (config.allowBusy) {
      this._asyncElement = createAsyncElement(config.asyncStyle);
      this._dropdownElement.appendChild(this._asyncElement);
    }

    // Create the announcer element for a11y
    this._announcerElement = createVisuallyHiddenElement();
    this._announcerElement.id = `${config.id}-activedescendant`;
    this._dropdownElement.appendChild(this._announcerElement);

    // Open the popup
    this._dropdownElement.open = true;
  }

  public close(): void {
    if (!this._dropdownElement) {
      return;
    }
    this._dropdownElement.open = false;
    this._dropdownElement = undefined;
    this._listElement = undefined;
    this._announcerElement = undefined;
  }

  public setScrollBottomListener(listener: () => void, scrollThreshold: number): void {
    if (this._dropdownElement) {
      if (!this._scrollObserver) {
        const scrollTarget = getShadowElement(this._dropdownElement, POPUP_CONSTANTS.selectors.CONTAINER);
        const scrollConfig: IScrollObserverConfiguration = { scrollThreshold };
        this._scrollObserver = new ScrollAxisObserver(scrollTarget, scrollConfig);
        this._scrollObserver.addListener(ScrollEvents.ScrolledEnd, listener);
      }
    }
  }

  public removeScrollBottomListener(listener: () => void): void {
    if (this._scrollObserver) {
      this._scrollObserver.removeListener(ScrollEvents.ScrolledEnd, listener);
    }
  }

  public getActiveOptionIndex(): number {
    if (!this._dropdownElement) {
      return -1;
    }
    const listItems = this._getListItemElements();
    const activeListItem = [...listItems].reverse().find(li => li.active);
    return activeListItem ? listItems.indexOf(activeListItem) : -1;
  }

  public getSelectedOptionIndex(): number {
    const listItems = this._getListItemElements();
    return listItems.findIndex(li => li.selected);
  }

  public getActiveOptionIdByIndex(index: number): string | null {
    if (!this._dropdownElement) {
      return null;
    }
    const listItems = this._getListItemElements();
    const item = listItems[index];
    return item ? item.id : null;
  }

  public toggleOptionMultiple(index: number, isSelected: boolean): void {
    if (!this._dropdownElement) {
      return;
    }

    const listItems = this._getListItemElements();
    if (listItems.length && listItems[index]) {
      this._toggleSelectedOption(listItems[index], isSelected);
    }
  }

  public scrollOptionIntoView(index: number, animate = true): void {
    const listItem = this._getListItemElements()[index];
    if (listItem) {
      this._scrollListItemIntoView(listItem, animate ? 'smooth' : 'auto', 'center');
    }
  }

  public scrollSelectedOptionIntoView(animate = true): void {
    const listItem = this._getSelectedListItem();
    this._scrollListItemIntoView(listItem, animate ? 'smooth' : 'auto', 'center');
  }

  public activateSelectedOption(config: IListDropdownOpenConfig): void {
    const listItems = this._getListItemElements();
    if (listItems.length) {
      const activeListItems = listItems.filter(li => li.active);
      activeListItems.forEach(li => li.active = false);
    }
    
    const listItem = this._getSelectedListItem();
    if (listItem) {
      this._activateListOption(listItem, config.activeChangeCallback);
    }
  }

  public activateOption(index: number, activeChangeCallback: ((id: string) => void) | undefined, animate = true): void {
    if (!this._dropdownElement) {
      return;
    }
    const listItems = this._getListItemElements();
    if (listItems.length) {
      const activeListItems = listItems.filter(li => li.active);
      activeListItems.forEach(li => li.active = false);
      this._activateListOption(listItems[index], activeChangeCallback);
      this._scrollListItemIntoView(listItems[index], animate ? 'smooth' : 'auto');
    }
  }

  public setSelectedValues(values: any[], multiple = false): void {
    if (!this._dropdownElement) {
      return;
    }
    const listItems = this._getListItemElements();
    for (const listItem of listItems) {
      const isSelected = values.some(v => isDeepEqual(v, listItem.value));
      listItem.selected = isSelected;

      if (multiple) {
        const checkboxElement = listItem.querySelector(`[${LIST_DROPDOWN_CONSTANTS.attributes.CHECKBOX_ELEMENT}]`) as IIconComponent;
        if (checkboxElement) {
          const newCheckboxElement = createCheckboxElement(isSelected);
          replaceElement(newCheckboxElement, checkboxElement);
        }
      }
    }
  }

  public clearActiveOption(): void {
    const listItems = this._getListItemElements();
    listItems.forEach(li => li.active = false);
  }

  public syncWidth(sync: boolean, targetWidthCallback?: () => number): void {
    if (this._dropdownElement) {
      this._dropdownElement.style[sync ? 'width' : 'minWidth'] = `${this._getTargetElementWidth(targetWidthCallback)}px`;
    }
  }

  public setOptions(config: IListDropdownOpenConfig): void {
    if (!this._dropdownElement || !this._listElement) {
      return;
    }
    if (this._asyncElement && this._asyncElement.isConnected) {
      removeElement(this._asyncElement);
    }
    if (this._busyElement) {
      this._busyElement.style.display = 'none';
    }
    if (!this._listElement.isConnected) {
      this._dropdownElement.appendChild(this._listElement);
    }
    
    removeAllChildren(this._listElement);
    createListItems(config, this._listElement);

    if (this._headerElement && !this._headerElement.isConnected) {
      this._dropdownElement.insertAdjacentElement('afterbegin', this._headerElement);
    }
    if (this._footerElement && !this._footerElement.isConnected) {
      this._dropdownElement.insertAdjacentElement('beforeend', this._footerElement);
    }
    if ('position' in this._dropdownElement && typeof this._dropdownElement.position === 'function') {
      this._dropdownElement.position();
    }
  }

  public appendOptions(options: Array<IListDropdownOption | IListDropdownOptionGroup>, config: IListDropdownOpenConfig): void {
    if (!this._dropdownElement || !this._listElement) {
      return;
    }
    createListItems(config, this._listElement, options);
  }

  public setBusyVisibility(isVisible: boolean): void {
    if (!this._dropdownElement) {
      return;
    }
    if (isVisible) {
      this._busyElement.style.removeProperty('display');
    } else {
      this._busyElement.style.display = 'none';
    }
  }

  public getScreenWidth(): number {
    return window.innerWidth;
  }

  private _getListItemElements(): IListItemComponent[] {
    return this._dropdownElement ? Array.from(this._dropdownElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[] : [];
  }

  private _toggleSelectedOption(listItem: IListItemComponent, isSelected: boolean): void {
    if (!this._dropdownElement) {
      return;
    }

    // First we need to remove the active state from any other list items
    const listItems = this._getListItemElements();
    if (listItems.length) {
      const activeItems = listItems.filter(li => li !== listItem && li.active);
      if (activeItems.length) {
        activeItems.forEach(ai => ai.active = false);
      }
    }

    // Now we can toggle the selected state and sync the active state
    listItem.selected = isSelected;
    listItem.setAttribute('aria-selected', `${isSelected}`);
    listItem.setAttribute('aria-checked', `${isSelected}`);

    if (isSelected) {
      listItem.active = true;
    }

    // Toggle the checkbox icon based on the selected state
    const checkboxElement = listItem.querySelector(`${ICON_CONSTANTS.elementName}[slot=leading]`) as IIconComponent;
    if (checkboxElement) {
      const newCheckboxElement = createCheckboxElement(isSelected);
      replaceElement(newCheckboxElement, checkboxElement);
    }
  }

  private _getTargetElementWidth(cb?: () => number): number {
    if (cb && isFunction(cb)) {
      return cb();
    }
    return this._targetElement.getBoundingClientRect().width;
  }

  private _activateListOption(listItem: IListItemComponent | undefined, activeChangeCallback?: (id: string) => void): void {
    if (listItem && !listItem.disabled) {
      listItem.active = true;
      if (activeChangeCallback && isFunction(activeChangeCallback)) {
        activeChangeCallback(listItem.id);
      }
    }
  }

  private _scrollListItemIntoView(listItem: HTMLElement | undefined, behavior: 'auto' | 'smooth' = 'auto', block: 'nearest' | 'center' = 'nearest'): void {
    if (listItem && this._dropdownElement && this._dropdownElement.isConnected) {
      const scrollContainer = getShadowElement(this._dropdownElement, POPUP_CONSTANTS.selectors.CONTAINER);
      if (scrollContainer) {
        tryScrollIntoView(scrollContainer, listItem, behavior, block);
      }
    }
  }

  private _getSelectedListItem(): IListItemComponent | undefined {
    const listItems = this._getListItemElements();
    return listItems.find(li => li.selected);
  }
}
