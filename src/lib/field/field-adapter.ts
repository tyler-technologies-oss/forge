import { addClass, calculateFontWidth, getShadowElement, IFontInfo, listenOwnProperty, Platform, removeClass, getActiveElement, createElementAttributeObserver, toggleClass, toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { FloatingLabel, IFloatingLabel } from '../floating-label/floating-label';
import { IFieldComponent } from './field';
import { FIELD_CONSTANTS } from './field-constants';

export interface IFieldAdapter extends IBaseAdapter {
  // root
  setRootClass(classes: string | string[]): void;
  removeRootClass(classes: string | string[]): void;

  // input
  addInputListener(type: string, listener: (evt: Event) => void): void;
  removeInputListener(type: string, listener: (evt: Event) => void): void;
  setInputClass(className: string): void;
  removeInputClass(className: string): void;

  // label
  addLabelSlotListener(listener: (evt: Event) => void): void;
  removeLabelSlotListener(listener: (evt: Event) => void): void;
  setLabelClass(name: string): void;
  removeLabelClass(name: string): void;
  isLabelFloating(): boolean;

  // leading
  addLeadingSlotListener(listener: (evt: Event) => void): void;
  removeLeadingSlotListener(listener: (evt: Event) => void): void;

  // trailing
  addTrailingSlotListener(listener: (evt: Event) => void): void;
  removeTrailingSlotListener(listener: (evt: Event) => void): void;

  // add on end
  addAddonEndSlotListener(listener: (evt: Event) => void): void;
  removeAddonEndSlotListener(listener: (evt: Event) => void): void;

  // state selectors
  hasAddonEndNodes(): boolean;
  hasLabel(): boolean;
  hasLeadingNodes(): boolean;
  hasPlaceholder(): boolean;
  hasTrailingNodes(): boolean;
  inputHasFocus(target?: EventTarget | null): boolean;
  inputHasValue(): boolean;
  fieldHasValue(): boolean;
  isDisabled(): boolean;
  isReadonly(): boolean;
  getLabelFontMetrics(): IFontInfo;
  getLabelWidth(fontSize: number, fontFamily: string): number;

  // state actions
  initialize(rootSelector: string): void;
  initializeFloatingLabel(): IFloatingLabel;
  ensureLabelOrder(): void;
  ensureSlottedLabel(): void;
  destroy(): void;
  setValueChangedListener(context: any, listener: (value: any) => void): void;
  destroyValueChangeListener(): void;
  detectLabel(): void;
  setRoomy(isRoomy: boolean): void;
  setDense(isDense: boolean): void;
  setInputAttributeObserver(listener: (name: string, value: string | null) => void): void;
}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  protected _rootElement: HTMLElement;
  protected _labelSlot: HTMLSlotElement;
  protected _leadingSlot: HTMLSlotElement;
  protected _trailingSlot: HTMLSlotElement;
  protected _addonEndSlot: HTMLSlotElement;
  protected _labelElement: HTMLLabelElement;
  protected _inputElement: HTMLInputElement;
  protected _inputMutationObserver: MutationObserver;
  protected _valueChangeListeners: Array<() => void> = [];

  constructor(component: IFieldComponent) {
    super(component);
  }

  public initialize(rootSelector: string): void {
    this._rootElement = getShadowElement(this._component, rootSelector);
    this._labelSlot = getShadowElement(this._component, 'slot[name=label]') as HTMLSlotElement;
    this._leadingSlot = getShadowElement(this._component, 'slot[name=leading]') as HTMLSlotElement;
    this._trailingSlot = getShadowElement(this._component, 'slot[name=trailing]') as HTMLSlotElement;
    this._addonEndSlot = getShadowElement(this._component, 'slot[name=addon-end]') as HTMLSlotElement;
    this._inputElement = this._component.querySelector('input:not([type=checkbox]):not([type=radio])') as HTMLInputElement;
    this.detectLabel();
  }

  public destroy(): void {
    if (this._inputMutationObserver) {
      this._inputMutationObserver.disconnect();
    }
  }

  public hasLabel(): boolean {
    return !!this._labelElement;
  }

  public ensureSlottedLabel(): void {
    this._labelElement.slot = 'label';
  }

  public ensureLabelOrder(): void {
    if (this._labelElement) {
      const children = Array.from(this._component.children);
      if (children.length > 1 && children.indexOf(this._labelElement) < children.indexOf(this._inputElement)) {
        this._component.appendChild(this._labelElement);
      }
    }
  }

  public addLabelSlotListener(listener: (evt: Event) => void): void {
    this._labelSlot.addEventListener('slotchange', listener);
  }

  public removeLabelSlotListener(listener: (evt: Event) => void): void {
    if (this._labelSlot) {
      this._labelSlot.removeEventListener('slotchange', listener);
    }
  }

  public addLeadingSlotListener(listener: (evt: Event) => void): void {
    this._leadingSlot.addEventListener('slotchange', listener);
  }

  public removeLeadingSlotListener(listener: (evt: Event) => void): void {
    if (this._leadingSlot) {
      this._leadingSlot.removeEventListener('slotchange', listener);
    }
  }

  public addTrailingSlotListener(listener: (evt: Event) => void): void {
    this._trailingSlot.addEventListener('slotchange', listener);
  }

  public removeTrailingSlotListener(listener: (evt: Event) => void): void {
    if (this._trailingSlot) {
      this._trailingSlot.removeEventListener('slotchange', listener);
    }
  }

  public addAddonEndSlotListener(listener: (evt: Event) => void): void {
    this._addonEndSlot.addEventListener('slotchange', listener);
  }

  public removeAddonEndSlotListener(listener: (evt: Event) => void): void {
    if (this._addonEndSlot) {
      this._addonEndSlot.removeEventListener('slotchange', listener);
    }
  }

  public addInputListener(type: string, listener: (evt: Event) => void): void {
    this._inputElement.addEventListener(type, listener);
  }
  public removeInputListener(type: string, listener: (evt: Event) => void): void {
    if (this._inputElement) {
      this._inputElement.removeEventListener(type, listener);
    }
  }

  public setValueChangedListener(context: any, listener: (value: any) => void): void {
    this.destroyValueChangeListener();
    const destroyListener = listenOwnProperty(context, this._inputElement, 'value', listener);
    this._valueChangeListeners.push(destroyListener);
  }

  public destroyValueChangeListener(): void {
    this._valueChangeListeners.forEach(cb => cb());
  }

  public detectLabel(): void {
    this._labelElement = this._component.querySelector('label') as HTMLLabelElement;
  }

  public initializeFloatingLabel(): IFloatingLabel {
    return new FloatingLabel(this._labelElement);
  }

  public inputHasValue(): boolean {
    return this._inputElement.value ? this._inputElement.value.trim().length > 0 : false;
  }

  // An overrideable method for more generic field values where input.value is not the value.
  public fieldHasValue(): boolean {
    return this.inputHasValue();
  }

  public hasPlaceholder(): boolean {
    return this._inputElement.placeholder ? this._inputElement.placeholder.trim().length > 0 : false;
  }

  public inputHasFocus(target?: EventTarget | null): boolean {
    return this._inputElement === target || this._inputElement === getActiveElement();
  }

  public setLabelClass(name: string): void {
    if (this._labelElement) {
      this._labelElement.classList.add(name);
    }
  }

  public removeLabelClass(name: string): void {
    if (this._labelElement) {
      this._labelElement.classList.remove(name);
    }
  }

  public isLabelFloating(): boolean {
    return this._component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING);
  }

  public setRoomy(isRoomy: boolean): void {
    toggleClass(this._rootElement, isRoomy, FIELD_CONSTANTS.classes.ROOMY);
  }

  public setDense(isDense: boolean): void {
    toggleClass(this._rootElement, isDense, FIELD_CONSTANTS.classes.DENSE);
  }

  public hasLeadingNodes(): boolean {
    if (!this._leadingSlot) {
      return false;
    }
    return this._leadingSlot.assignedNodes().length > 0;
  }

  public hasTrailingNodes(): boolean {
    if (!this._trailingSlot) {
      return false;
    }
    return this._trailingSlot.assignedNodes().length > 0;
  }

  public hasAddonEndNodes(): boolean {
    if (!this._addonEndSlot) {
      return false;
    }
    return this._addonEndSlot.assignedNodes().length > 0;
  }

  public setInputClass(className: string): void {
    this._inputElement.classList.add(className);
  }

  public removeInputClass(className: string): void {
    this._inputElement.classList.remove(className);
  }

  public setRootClass(classes: string | string[]): void {
    addClass(classes, this._rootElement);
  }

  public removeRootClass(classes: string | string[]): void {
    removeClass(classes, this._rootElement);
  }

  public setInputAttributeObserver(listener: (name: string, value: string | null) => void): void {
    this._inputMutationObserver = createElementAttributeObserver(this._inputElement, listener, FIELD_CONSTANTS.observedInputAttributes);
  }

  public isDisabled(): boolean {
    return this._inputElement.hasAttribute('disabled');
  }

  public isReadonly(): boolean {
    return this._inputElement.hasAttribute('readonly');
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
}
