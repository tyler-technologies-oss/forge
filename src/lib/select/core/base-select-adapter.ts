import { isDefined, removeElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IBaseSelectComponent } from './base-select';
import { ListDropdown, IListDropdown } from '../../list-dropdown';
import { IListDropdownConfig, ListDropdownIconType } from '../../list-dropdown/list-dropdown-constants';
import { IOptionComponent, OPTION_CONSTANTS } from '../option';
import { IOptionGroupComponent, OPTION_GROUP_CONSTANTS } from '../option-group';
import { ISelectOption, ISelectOptionGroup, SelectOptionListenerDestructor } from './base-select-constants';
import { isOptionGroupObject } from './select-utils';
import { IPopupComponent, POPUP_CONSTANTS } from '../../popup';

export interface IBaseSelectAdapter extends IBaseAdapter {
  initializeAccessibility(): void;
  addClickListener(listener: (evt: Event) => void): void;
  removeClickListener(listener: (evt: Event) => void): void;
  addTargetListener(type: string, listener: (evt: Event) => void): void;
  removeTargetListener(type: string, listener: (evt: Event) => void): void;
  getOptions(): ISelectOption[] | ISelectOptionGroup[];
  setOptions(options: ISelectOption[] | ISelectOptionGroup[], clear?: boolean): void;
  open(config: IListDropdownConfig): void;
  close(): void;
  setDismissListener(listener: () => void): void;
  scrollSelectedOptionIntoView(): void;
  activateSelectedOption(): void;
  activateFirstOption(): void;
  getActiveOptionIndex(): number;
  highlightActiveOption(index: number): void;
  toggleOptionMultiple(index: number, isSelected: boolean): void;
  patchSelectedValues(selectedValues: string[]): void;
  updateActiveDescendant(id: string): void;
  setOptionsListener(listener: (options: ISelectOption[] | ISelectOptionGroup[]) => void): SelectOptionListenerDestructor;
  setDropdownOptions(options: ISelectOption[] | ISelectOptionGroup[]): void;
  appendDropdownOptions(options: ISelectOption[] | ISelectOptionGroup[]): void;
  setMultiple(multiple: boolean): void;
  isFocusWithinPopup(target: HTMLElement): boolean;
  popupElement: HTMLElement | undefined;
}

export abstract class BaseSelectAdapter extends BaseAdapter<IBaseSelectComponent> implements IBaseSelectAdapter {
  private _listDropdown?: IListDropdown;
  protected _targetElement: HTMLElement;

  constructor(component: IBaseSelectComponent) {
    super(component);
  }

  public abstract initializeAccessibility(): void;
  public abstract updateActiveDescendant(id: string): void;
  public abstract addClickListener(listener: (evt: Event) => void): void;
  public abstract removeClickListener(listener: (evt: Event) => void): void;
  public abstract addTargetListener(type: string, listener: (evt: Event) => void): void;
  public abstract removeTargetListener(type: string, listener: (evt: Event) => void): void;
  public abstract setMultiple(multiple: boolean): void;

  public get popupElement(): HTMLElement | undefined {
    return this._listDropdown?.dropdownElement;
  }

  public getOptions(): ISelectOption[] | ISelectOptionGroup[] {
    const optionGroupElements = Array.from(this._component.querySelectorAll(OPTION_GROUP_CONSTANTS.elementName)) as IOptionGroupComponent[];
    if (optionGroupElements.length) {
      return optionGroupElements.map(optionGroupElement => {
        const optionElements = Array.from(optionGroupElement.querySelectorAll(OPTION_CONSTANTS.elementName)) as IOptionComponent[];
        const options = this._createOptionsFromElements(optionElements);
        return { text: optionGroupElement.label, options } as ISelectOptionGroup;
      });
    } else {
      const optionElements = Array.from(this._component.querySelectorAll(OPTION_CONSTANTS.elementName)) as IOptionComponent[];
      return this._createOptionsFromElements(optionElements);
    }
  }

  private _createOptionsFromElements(optionElements: IOptionComponent[]): ISelectOption[] {
    return optionElements.map(o => {
      let optionClass = o.hasAttribute(OPTION_CONSTANTS.attributes.OPTION_CLASS) ? o.getAttribute(OPTION_CONSTANTS.attributes.OPTION_CLASS) as string : o.optionClass;
      if (typeof optionClass === 'string') {
        optionClass = optionClass.split(' ');
      }

      return {
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        label: o.hasAttribute(OPTION_CONSTANTS.attributes.LABEL) ? o.getAttribute(OPTION_CONSTANTS.attributes.LABEL) as string : (isDefined(o.label) ? o.label : o.innerText),
        value: o.hasAttribute(OPTION_CONSTANTS.attributes.VALUE) ? o.getAttribute(OPTION_CONSTANTS.attributes.VALUE) : o.value,
        disabled: o.hasAttribute(OPTION_CONSTANTS.attributes.DISABLED),
        divider: o.hasAttribute(OPTION_CONSTANTS.attributes.DIVIDER),
        optionClass,
        leadingIcon: o.hasAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON) ? o.getAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON) as string : o.leadingIcon,
        leadingIconClass: o.hasAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_CLASS) ? o.getAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_CLASS) as string : o.leadingIconClass,
        leadingIconType: o.hasAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_TYPE) ? o.getAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_TYPE) as ListDropdownIconType : o.leadingIconType,
        trailingIcon: o.hasAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON) ? o.getAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON) as string : o.trailingIcon,
        trailingIconClass: o.hasAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_CLASS) ? o.getAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_CLASS) as string : o.trailingIconClass,
        trailingIconType: o.hasAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE) ? o.getAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE) as ListDropdownIconType : o.trailingIconType,
        leadingBuilder: o.leadingBuilder,
        trailingBuilder: o.trailingBuilder
      };
    });
  }

  public open(config: IListDropdownConfig): void {
    this._listDropdown = new ListDropdown(this._targetElement, config);
    this._listDropdown.open();
  }

  public close(): void {
    if (this._listDropdown) {
      this._listDropdown.close();
      this._listDropdown.destroy();
      this._listDropdown = undefined;
    }
  }

  public setDismissListener(listener: () => void): void {
    if (!this._listDropdown || !this._listDropdown.dropdownElement) {
      return;
    }
    const dropdownElement = this._listDropdown.dropdownElement as IPopupComponent;
    if (dropdownElement.targetElement) {
      dropdownElement.targetElement.addEventListener(POPUP_CONSTANTS.events.BLUR, listener);
    }
  }

  public toggleOptionMultiple(index: number, isSelected: boolean): void {
    this._listDropdown?.toggleOptionMultiple(index, isSelected);
  }

  public getActiveOptionIndex(): number {
    return this._listDropdown?.getActiveOptionIndex() ?? -1;
  }

  public activateSelectedOption(): void {
    this._listDropdown?.activateSelectedOption();
  }

  public activateFirstOption(): void {
    this._listDropdown?.activateFirstOption();
  }

  public highlightActiveOption(index: number): void {
    this._listDropdown?.activateOption(index);
  }

  public patchSelectedValues(selectedValues: string[]): void {
    this._listDropdown?.setSelectedValues(selectedValues);
  }

  public setOptionsListener(listener: (options: ISelectOption[] | ISelectOptionGroup[]) => void): SelectOptionListenerDestructor {
    const observer = new MutationObserver(() => listener(this.getOptions()));
    observer.observe(this._component, { childList: true, subtree: true });
    return () => observer.disconnect();
  }

  public setOptions(options: ISelectOption[] | ISelectOptionGroup[], clear = true): void {
    if (clear) {
      this._clearOptions();
    }

    for (const opt of options) {
      if (isOptionGroupObject(opt)) {
        const optionGroupElement = this._createOptionGroupElement(opt);
        for (const option of opt.options) {
          const optionElement = this._createOptionElement(option);
          optionGroupElement.appendChild(optionElement);
        }
        this._component.appendChild(optionGroupElement);
      } else {
        const optionElement = this._createOptionElement(opt);
        this._component.appendChild(optionElement);
      }
    }
  }

  public appendDropdownOptions(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._listDropdown?.appendOptions(options);
  }

  public setDropdownOptions(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._listDropdown?.setOptions(options);
  }

  public scrollSelectedOptionIntoView(): void {
    this._listDropdown?.scrollSelectedOptionIntoView();
  }

  public isFocusWithinPopup(target: HTMLElement): boolean {
    if (!this._listDropdown || !this._listDropdown.dropdownElement) {
      return false;
    }
    return this._listDropdown.dropdownElement.contains(target);
  }

  private _clearOptions(): void {
    // First we remove all option group elements
    const existingOptionGroupElements = Array.from(this._component.querySelectorAll(OPTION_GROUP_CONSTANTS.elementName));
    existingOptionGroupElements.forEach((optGroup: IOptionGroupComponent) => removeElement(optGroup));

    // Then find all top-level option elements that aren't inside of a group, and ensure that those are removed as well
    const existingOptionElements = Array.from(this._component.querySelectorAll(OPTION_CONSTANTS.elementName));
    existingOptionElements.forEach((o: HTMLElement) => removeElement(o));
  }


  private _createOptionGroupElement(group: ISelectOptionGroup): HTMLElement {
    const optionGroupElement = document.createElement(OPTION_GROUP_CONSTANTS.elementName) as IOptionGroupComponent;
    optionGroupElement.label = group.text || '';
    return optionGroupElement;
  }

  private _createOptionElement(option: ISelectOption): HTMLElement {
    const optionElement = document.createElement(OPTION_CONSTANTS.elementName) as IOptionComponent;
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    if (option.disabled) {
      optionElement.disabled = option.disabled;
    }
    return optionElement;
  }
}
