import { MDCRipple } from '@material/ripple';
import { addClass, getShadowElement, removeClass, removeElement, walkUpUntil, elementFromHTML, toggleClass } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IChipSetComponent } from '../chip-set/chip-set';
import { CHIP_SET_CONSTANTS } from '../chip-set/chip-set-constants';
import { IChipComponent } from './chip';
import { CHIP_CONSTANTS, IChipState } from './chip-constants';
import { ICON_CONSTANTS, IIconComponent } from '../../icon';

export interface IChipAdapter extends IBaseAdapter {
  addButtonListener(type: string, listener: (evt: Event) => void): void;
  removeButtonListener(type: string, listener: (evt: Event) => void): void;
  initializeRipple(): MDCRipple;
  clearTypeClass(): void;
  addRootClass(className: string): void;
  removeRootClass(name: string): void;
  setCheckmarkVisibility(isVisible: boolean): void;
  setSelected(value: boolean): void;
  setDisabled(value: boolean): void;
  setDense(value: boolean): void;
  setDeleteButtonVisibility(isVisible: boolean, listener: (evt: KeyboardEvent) => void): void;
  setLeadingSlotVisibility(isVisible: boolean): void;
  getChipSetState(): IChipState | null;
  setFocus(): void;
  setEmulatedFocus(value: boolean): void;
}

import checkmarkTemplate from './chip-checkmark.html';

export class ChipAdapter extends BaseAdapter<IChipComponent> implements IChipAdapter {
  private _buttonElement: HTMLButtonElement;
  private _deleteButton: HTMLElement;
  private _deleteButtonTouchTarget: HTMLDivElement;
  private _leadingSlotElement: HTMLSlotElement;
  private _checkmarkElement: HTMLElement;

  constructor(component: IChipComponent) {
    super(component);
    this._buttonElement = getShadowElement(this._component, CHIP_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    this._leadingSlotElement = getShadowElement(this._component, 'slot[name=leading]') as HTMLSlotElement;
  }

  public addButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener(type, listener);
  }

  public removeButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.removeEventListener(type, listener);
  }

  public initializeRipple(): MDCRipple {
    return new MDCRipple(this._buttonElement);
  }

  public clearTypeClass(): void {
    removeClass([CHIP_CONSTANTS.classes.ACTION, CHIP_CONSTANTS.classes.CHOICE, CHIP_CONSTANTS.classes.FILTER, CHIP_CONSTANTS.classes.INPUT], this._buttonElement);
  }

  public addRootClass(className: string): void {
    this._buttonElement.classList.add(className);
  }

  public removeRootClass(name: string): void {
    this._buttonElement.classList.remove(name);
  }

  public setCheckmarkVisibility(isVisible: boolean): void {
    if (isVisible) {
      if (!this._checkmarkElement) {
        this._checkmarkElement = elementFromHTML(checkmarkTemplate) as HTMLElement;
      }
      this._buttonElement.insertBefore(this._checkmarkElement, this._buttonElement.firstChild);
    } else if (this._checkmarkElement && this._checkmarkElement.isConnected) {
      removeElement(this._checkmarkElement);
    }
  }

  public setSelected(value: boolean): void {
    toggleClass(this._buttonElement, value, CHIP_CONSTANTS.classes.SELECTED);
  }

  public setDisabled(value: boolean): void {
    this._buttonElement.disabled = value;
  }

  public setDense(value: boolean): void {
    toggleClass(this._buttonElement, value, CHIP_CONSTANTS.classes.DENSE);
  }

  public setDeleteButtonVisibility(isVisible: boolean, listener: (evt: KeyboardEvent) => void): void {
    if (isVisible) {
      if (!this._deleteButton) {
        this._deleteButton = this._createDeleteButton(listener);
      }
      if (!this._deleteButtonTouchTarget) {
        this._deleteButtonTouchTarget = this._createDeleteButtonTouchTarget(listener);
      }
      this._deleteButton.appendChild(this._deleteButtonTouchTarget);
      this._buttonElement.appendChild(this._deleteButton);
    } else {
      if (this._deleteButtonTouchTarget) {
        removeElement(this._deleteButtonTouchTarget);
      }
      if (this._deleteButton) {
        removeElement(this._deleteButton);
      }
    }
  }

  public setLeadingSlotVisibility(isVisible: boolean): void {
    toggleClass(this._leadingSlotElement, !isVisible, CHIP_CONSTANTS.classes.LEADING_HIDDEN);
  }

  public getChipSetState(): IChipState | null {
    let state: IChipState | null = null;
    const chipSet = walkUpUntil(this._component, node => node && node.nodeName === CHIP_SET_CONSTANTS.elementName.toUpperCase()) as IChipSetComponent;
    if (chipSet) {
      state = {
        type: chipSet.type,
        disabled: chipSet.disabled,
        dense: chipSet.dense
      };
    }
    return state;
  }

  private _createDeleteButton(listener: (evt: KeyboardEvent) => void): HTMLElement {
    const el = document.createElement(ICON_CONSTANTS.elementName) as IIconComponent;
    el.name = 'cancel';
    el.tabIndex = 0;
    el.setAttribute('aria-label', 'Delete');
    el.setAttribute('role', 'button');
    addClass([CHIP_CONSTANTS.classes.DELETE_BUTTON], el);
    el.addEventListener('keydown', listener);
    return el;
  }

  private _createDeleteButtonTouchTarget(listener: (evt: KeyboardEvent) => void): HTMLDivElement {
    const el = document.createElement('div');
    addClass(CHIP_CONSTANTS.classes.DELETE_BUTTON_TOUCH_TARGET, el);
    el.addEventListener('keydown', listener);
    el.addEventListener('click', listener);
    return el;
  }

  public setFocus(): void {
    this._buttonElement.focus();
  }

  public setEmulatedFocus(value: boolean): void {
    this._buttonElement.classList.toggle('mdc-ripple-upgraded--background-focused', value);
  }
}
