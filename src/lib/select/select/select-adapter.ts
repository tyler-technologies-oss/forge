import { calculateFontWidth, getShadowElement, IFontInfo, toggleClass, toggleAttribute } from '@tylertech/forge-core';
import { FloatingLabel, IFloatingLabel } from '../../floating-label/floating-label';
import { ISelectComponent } from './select';
import { SELECT_CONSTANTS } from './select-constants';
import { IBaseSelectAdapter, BaseSelectAdapter } from '../core';
import { IListDropdownConfig } from '../../list-dropdown/list-dropdown-constants';
import { FIELD_CONSTANTS } from '../../field/field-constants';
import { tryCreateAriaControlsPlaceholder, setAriaControls } from '../../core/utils';

export type OptionListenerDestructor = () => void;

export interface ISelectAdapter extends IBaseSelectAdapter {
  initializeFloatingLabel(): IFloatingLabel;
  initializeLabel(): void;
  hasLabel(): boolean;
  setLabel(value: string): void;
  addRootClass(name: string): void;
  removeRootClass(name: string): void;
  setPlaceholderText(value: string): void;
  setSelectedText(value: string): void;
  addMouseDownListener(listener: (evt: MouseEvent) => void): void;
  removeMouseDownListener(listener: (evt: MouseEvent) => void): void;
  setLeadingListener(listener: (evt: Event) => void): void;
  removeLeadingListener(listener: (evt: Event) => void): void;
  setAddonEndListener(listener: (evt: Event) => void): void;
  removeAddonEndListener(listener: (evt: Event) => void): void;
  hasLeadingElement(): boolean;
  setDisabled(isDisabled: boolean): void;
  setInvalid(isInvalid: boolean): void;
  setRequired(isRequired: boolean): void;
  setRoomy(isRoomy: boolean): void;
  setDense(isDense: boolean): void;
  getLabelWidth(fontSize: number, fontFamily: string): number;
  getLabelFontMetrics(): IFontInfo;
  getTargetWidth(): number;
  hasAddonEndNodes(): boolean;
  setFocus(): void;
  isWithinSelf(element: HTMLElement): boolean;
}

/**
 * The DOM adapter behind the `<forge-select>` component.
 */
export class SelectAdapter extends BaseSelectAdapter implements ISelectAdapter {
  private _selectElement: HTMLElement;
  private _labelElement: HTMLLabelElement;
  private _selectedTextElement: HTMLElement;
  private _leadingSlot: HTMLSlotElement;
  private _addonEndSlot: HTMLSlotElement;

  constructor(component: ISelectComponent) {
    super(component);
    this._selectElement = getShadowElement(component, SELECT_CONSTANTS.selectors.ROOT);
    this._leadingSlot = getShadowElement(component, SELECT_CONSTANTS.selectors.LEADING_SLOT) as HTMLSlotElement;
    this._addonEndSlot = getShadowElement(this._component, SELECT_CONSTANTS.selectors.ADDON_END_SLOT) as HTMLSlotElement;
    this._selectedTextElement = getShadowElement(component, SELECT_CONSTANTS.selectors.SELECTED_TEXT) as HTMLElement;
    this._targetElement = this._selectElement;
  }

  public initializeLabel(): void {
    this._labelElement = getShadowElement(this._component, SELECT_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
  }

  public hasLabel(): boolean {
    return !!this._labelElement;
  }

  public initializeAccessibility(): void {
    this._component.setAttribute('role', 'combobox');
    this._component.setAttribute('aria-haspopup', 'true');
    this._component.setAttribute('aria-expanded', 'false');
    tryCreateAriaControlsPlaceholder();
    setAriaControls(this._component);

    // We need to ensure the host element receives a non-negative tabindex for our interactions to work properly
    if (!this._component.hasAttribute('tabindex') || this._component.tabIndex === -1) {
      this._component.tabIndex = 0;
    }
  }

  public initializeFloatingLabel(): IFloatingLabel {
    return new FloatingLabel(this._labelElement);
  }

  public setLabel(value: string): void {
    if (!this._component.hasAttribute('aria-label') || this._component.getAttribute('aria-label') === this._labelElement.textContent) {
      this._component.setAttribute('aria-label', value);
    }
    this._labelElement.textContent = value;
  }

  public addRootClass(name: string): void {
    this._selectElement.classList.add(name);
  }

  public removeRootClass(name: string): void {
    this._selectElement.classList.remove(name);
  }

  public setPlaceholderText(value: string): void {
    toggleAttribute(this._selectedTextElement, !!value, 'placeholder', value);
  }

  public addClickListener(listener: (evt: Event) => void): void {
    this._component.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: Event) => void): void {
    this._component.removeEventListener('click', listener);
  }

  public addMouseDownListener(listener: (evt: MouseEvent) => void): void {
    this._component.addEventListener('mousedown', listener);
  }

  public removeMouseDownListener(listener: (evt: MouseEvent) => void): void {
    this._component.removeEventListener('mousedown', listener);
  }

  public addTargetListener(type: string, listener: (evt: Event) => void): void {
    this._component.addEventListener(type, listener);
  }

  public removeTargetListener(type: string, listener: (evt: Event) => void): void {
    this._component.removeEventListener(type, listener);
  }

  public open(config: IListDropdownConfig): void {
    super.open(config);
    this._component.setAttribute('aria-controls', `list-dropdown-popup-${config.id}`);
    this._component.setAttribute('aria-expanded', 'true');
    toggleClass(this._selectElement, true, SELECT_CONSTANTS.classes.OPENED);
  }

  public close(): void {
    this._component.setAttribute('aria-expanded', 'false');
    this._component.removeAttribute('aria-activedescendant');
    setAriaControls(this._component);
    toggleClass(this._selectElement, false, SELECT_CONSTANTS.classes.OPENED);
    super.close();
  }

  public updateActiveDescendant(id: string): void {
    toggleAttribute(this._component, !!id, 'aria-activedescendant', id);
  }

  public setSelectedText(value: string): void {
    this._selectedTextElement.textContent = value;
  }

  public setLeadingListener(listener: (evt: Event) => void): void {
    this._leadingSlot.addEventListener('slotchange', listener);
  }

  public removeLeadingListener(listener: (evt: Event) => void): void {
    this._leadingSlot.removeEventListener('slotchange', listener);
  }

  public setAddonEndListener(listener: (evt: Event) => void): void {
    this._addonEndSlot.addEventListener('slotchange', listener);
  }

  public removeAddonEndListener(listener: (evt: Event) => void): void {
    this._addonEndSlot.removeEventListener('slotchange', listener);
  }

  public hasLeadingElement(): boolean {
    return this._leadingSlot.assignedNodes().length > 0;
  }

  public setDisabled(isDisabled: boolean): void {
    toggleClass(this._selectElement, isDisabled, FIELD_CONSTANTS.classes.DISABLED);
    toggleAttribute(this._component, isDisabled, 'aria-disabled', 'true');
    this._component.tabIndex = isDisabled ? -1 : 0;
  }

  public setInvalid(isInvalid: boolean): void {
    toggleClass(this._selectElement, isInvalid, FIELD_CONSTANTS.classes.INVALID);
    toggleAttribute(this._component, isInvalid, 'aria-invalid', 'true');
  }

  public setRequired(isRequired: boolean): void {
    toggleClass(this._selectElement, isRequired, FIELD_CONSTANTS.classes.REQUIRED);
    toggleAttribute(this._component, isRequired, 'aria-required', 'true');
  }

  public setRoomy(isRoomy: boolean): void {
    toggleClass(this._selectElement, isRoomy, FIELD_CONSTANTS.classes.ROOMY);
  }

  public setDense(isDense: boolean): void {
    toggleClass(this._selectElement, isDense, FIELD_CONSTANTS.classes.DENSE);
  }

  public getLabelWidth(fontSize: number, fontFamily: string): number {
    return calculateFontWidth(this._labelElement.innerText, { fontSize, fontFamily });
  }

  public getLabelFontMetrics(): IFontInfo {
    const style = getComputedStyle(this._labelElement);
    return {
      fontSize: parseInt(style.fontSize || '16', 10),
      fontFamily: style.fontFamily || 'Roboto'
    };
  }

  public getTargetWidth(): number {
    return this._selectElement.getBoundingClientRect().width;
  }

  public hasAddonEndNodes(): boolean {
    if (!this._addonEndSlot) {
      return false;
    }
    return this._addonEndSlot.assignedNodes().length > 0;
  }

  public setFocus(): void {
    this._component.focus();
  }

  public isWithinSelf(element: HTMLElement): boolean {
    const isShadowChild = !!this._component.shadowRoot && this._component.shadowRoot.contains(element);
    return isShadowChild || this._component.contains(element);
  }
}
