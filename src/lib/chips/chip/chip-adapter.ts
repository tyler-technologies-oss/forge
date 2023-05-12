import { addClass, elementFromHTML, getActiveElement, getShadowElement, removeClass, removeElement, toggleClass, walkUpUntil } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ICON_CONSTANTS } from '../../icon';
import { ForgeRipple, ForgeRippleAdapter, ForgeRippleCapableSurface, ForgeRippleFoundation } from '../../ripple';
import { IChipSetComponent } from '../chip-set/chip-set';
import { CHIP_SET_CONSTANTS } from '../chip-set/chip-set-constants';
import { IChipComponent } from './chip';
import checkmarkTemplate from './chip-checkmark.html';
import { CHIP_CONSTANTS, IChipState } from './chip-constants';

export interface IChipAdapter extends IBaseAdapter {
  addRootListener(type: string, listener: (evt: Event) => void): void;
  removeRootListener(type: string, listener: (evt: Event) => void): void;
  addButtonListener(type: string, listener: (evt: Event) => void): void;
  removeButtonListener(type: string, listener: (evt: Event) => void): void;
  initializeRipple(): ForgeRipple;
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
  tryFocusDelete(): void;
  setEmulatedFocus(value: boolean): void;
  tryMoveFocusPrevious(): void;
  tryMoveFocusNext(): void;
}


export class ChipAdapter extends BaseAdapter<IChipComponent> implements IChipAdapter, ForgeRippleCapableSurface {
  private _rootElement: HTMLElement;
  private _rippleInstance: ForgeRipple;
  private _buttonElement: HTMLButtonElement;
  private _deleteButton: HTMLElement;
  private _deleteButtonTouchTarget: HTMLDivElement;
  private _leadingSlotElement: HTMLSlotElement;
  private _checkmarkElement: HTMLElement;

  constructor(component: IChipComponent) {
    super(component);
    this._rootElement = getShadowElement(this._component, CHIP_CONSTANTS.selectors.ROOT);
    this._buttonElement = getShadowElement(this._component, CHIP_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    this._leadingSlotElement = getShadowElement(this._component, 'slot[name=leading]') as HTMLSlotElement;
    this._rootElement.addEventListener('click', evt => {
      if (evt.target === this._deleteButton) {
        return;
      }
      this._buttonElement.focus();
    }, { capture: true });
  }

  // ForgeRippleCapableSurface
  public get root(): Element {
    return this._rootElement;
  }
  public get unbounded(): boolean | undefined {
    return false;
  }
  public get disabled(): boolean | undefined {
    return this._buttonElement?.disabled;
  }

  public addRootListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeRootListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public addButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener(type, listener);
  }

  public removeButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.removeEventListener(type, listener);
  }

  public initializeRipple(): ForgeRipple {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      registerInteractionHandler: (evtType, handler) => {
        if (['focus', 'blur', 'keydown'].includes(evtType)) {
          this._buttonElement.addEventListener(evtType, handler, { passive: true });
        } else {
          this._rootElement.addEventListener(evtType, handler, { passive: true });
        }
      },
      deregisterInteractionHandler: (evtType, handler) => {
        if (['focus', 'blur', 'keydown'].includes(evtType)) {
          this._buttonElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions);
        } else {
          this._rootElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions);
        }
      },
      isSurfaceActive: () => this._buttonElement.matches(':active'),
      isUnbounded: () => Boolean(this.unbounded),
      isSurfaceDisabled: () => this._buttonElement.disabled,
      addClass: className => addClass(className, this._rootElement),
      removeClass: className => removeClass(className, this._rootElement),
      updateCssVariable: (varName, value) => this._rootElement.style.setProperty(varName, value)
    };
    this._rippleInstance = new ForgeRipple(this._rootElement, new ForgeRippleFoundation(adapter));
    return this._rippleInstance;
  }

  public clearTypeClass(): void {
    removeClass([CHIP_CONSTANTS.classes.ACTION, CHIP_CONSTANTS.classes.CHOICE, CHIP_CONSTANTS.classes.FILTER, CHIP_CONSTANTS.classes.INPUT], this._buttonElement);
  }

  public addRootClass(className: string): void {
    this._rootElement.classList.add(className);
  }

  public removeRootClass(name: string): void {
    this._rootElement.classList.remove(name);
  }

  public setCheckmarkVisibility(isVisible: boolean): void {
    if (isVisible) {
      if (!this._checkmarkElement) {
        this._checkmarkElement = elementFromHTML(checkmarkTemplate) as HTMLElement;
      }
      this._rootElement.insertBefore(this._checkmarkElement, this._rootElement.firstChild);
    } else if (this._checkmarkElement && this._checkmarkElement.isConnected) {
      removeElement(this._checkmarkElement);
    }
  }

  public setSelected(value: boolean): void {
    toggleClass(this._rootElement, value, CHIP_CONSTANTS.classes.SELECTED);
  }

  public setDisabled(value: boolean): void {
    this._buttonElement.disabled = value;
    this._buttonElement.tabIndex = value ? -1 : 0;
    toggleClass(this._rootElement, value, CHIP_CONSTANTS.classes.DISABLED);
  }

  public setDense(value: boolean): void {
    toggleClass(this._rootElement, value, CHIP_CONSTANTS.classes.DENSE);
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
      this._rootElement.appendChild(this._deleteButton);
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
    const el = document.createElement(ICON_CONSTANTS.elementName);
    el.id = 'remove-button';
    el.name = 'cancel';
    el.tabIndex = -1;
    el.setAttribute('aria-hidden', 'false');
    el.setAttribute('aria-label', `Remove ${this._component.innerText}`);
    el.setAttribute('role', 'button');
    el.classList.add(CHIP_CONSTANTS.classes.DELETE_BUTTON);
    el.addEventListener('keydown', listener);
    return el;
  }

  private _createDeleteButtonTouchTarget(listener: (evt: KeyboardEvent) => void): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add(CHIP_CONSTANTS.classes.DELETE_BUTTON_TOUCH_TARGET);
    el.addEventListener('keydown', listener);
    el.addEventListener('click', listener);
    return el;
  }

  public setFocus(): void {
    this._buttonElement.focus();
  }

  public tryFocusDelete(): void {
    if (this._deleteButton) {
      this._deleteButton.focus();
    } else {
      this.setFocus();
    }
  }

  public setEmulatedFocus(value: boolean): void {
    this._buttonElement.classList.toggle('mdc-ripple-upgraded--background-focused', value);
  }

  public tryMoveFocusNext(): void {
    const activeElement = getActiveElement();
    if (activeElement === this._buttonElement) {
      if (this._deleteButton) {
        this._deleteButton.focus();
      } else {
        this.emitHostEvent(CHIP_CONSTANTS.events.FOCUS_NEXT);
      }
    } else if (activeElement === this._deleteButton) {
      this.emitHostEvent(CHIP_CONSTANTS.events.FOCUS_NEXT);
    }
  }

  public tryMoveFocusPrevious(): void {
    const activeElement = getActiveElement();
    if (activeElement === this._deleteButton) {
      this._buttonElement.focus();
    } else if (activeElement === this._buttonElement) {
      this.emitHostEvent(CHIP_CONSTANTS.events.FOCUS_PREVIOUS);
    }
  }
}
