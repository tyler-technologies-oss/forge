import { addClass, listenOwnProperty, getActiveElement, createElementAttributeObserver } from '@tylertech/forge-core';
import { ITextFieldComponent } from './text-field';
import { FieldAdapter, IFieldAdapter } from '../field/field-adapter';
import { TEXT_FIELD_CONSTANTS } from './text-field-constants';
import { FIELD_CONSTANTS } from '../field/field-constants';

export interface ITextFieldAdapter extends IFieldAdapter {
  detectTextarea(): void;
}

export class TextFieldAdapter extends FieldAdapter implements ITextFieldAdapter {
  protected _inputElements: Array<HTMLInputElement | HTMLTextAreaElement> = [];
  protected _inputMutationObserverInstances: MutationObserver[] = [];

  constructor(component: ITextFieldComponent) {
    super(component);
  }

  public initialize(): void {
    super.initialize(TEXT_FIELD_CONSTANTS.selectors.ROOT);
    this._inputElements = Array.from(this._component.querySelectorAll('input:not([type=checkbox]):not([type=radio]), textarea'));
    if (this._inputElements.length > 1) {
      this._handleMultiInputs();
    }
  }

  public override destroy(): void {
    super.destroy();
    if (this._inputMutationObserverInstances) {
      this._inputMutationObserverInstances.forEach(mo => mo.disconnect());
    }
  }

  public detectTextarea(): void {
    this._applyToInputs(input => {
      if (input instanceof HTMLTextAreaElement) {
        this._rootElement.classList.add(TEXT_FIELD_CONSTANTS.classes.TEXTAREA);
      } else {
        this._rootElement.classList.remove(TEXT_FIELD_CONSTANTS.classes.TEXTAREA);
      }
    });
  }

  public override addInputListener(type: string, listener: (evt: Event) => void): void {
    this._applyToInputs(input => input.addEventListener(type, listener));
  }
  public override removeInputListener(type: string, listener: (evt: Event) => void): void {
    if (this._inputElements && this._inputElements.length > 0) {
      this._applyToInputs(input => input.removeEventListener(type, listener));
    }
  }

  public override setValueChangedListener(context: any, listener: (value: any) => void): void {
    this.destroyValueChangeListener();
    this._applyToInputs(input => {
      const destroyListener = listenOwnProperty(context, input, 'value', listener);
      this._valueChangeListeners.push(destroyListener);
    });
  }

  public override inputHasValue(): boolean {
    return this._inputsSome(input => input.value ? input.value.trim().length > 0 : false);
  }

  public override hasPlaceholder(): boolean {
    return this._inputsSome(input => input.placeholder ? input.placeholder.trim().length > 0 : false);
  }

  public override inputHasFocus(target?: EventTarget | null): boolean {
    const activeElement = getActiveElement(this._component.ownerDocument);
    return this._inputsSome(input => input === target || input === activeElement);
  }

  public override setInputClass(className: string): void {
    this._applyToInputs(input => input.classList.add(className));
  }

  public override removeInputClass(className: string): void {
    this._applyToInputs(input => input.classList.remove(className));
  }

  public override setInputAttributeObserver(listener: (name: string, value: string) => void): void {
    this._applyToInputs(input => {
      const observer = createElementAttributeObserver(input, listener, FIELD_CONSTANTS.observedInputAttributes);
      this._inputMutationObserverInstances.push(observer);
    });
  }

  public override isDisabled(): boolean {
    return this._inputsSome(input => input.hasAttribute('disabled'));
  }

  public override isReadonly(): boolean {
    return this._inputsSome(input => input.hasAttribute('readonly'));
  }

  protected _inputsSome(action: (input: HTMLInputElement) => boolean): boolean {
    return this._inputElements.some(action);
  }

  protected _applyToInputs(action: (input: HTMLInputElement, index: number) => void): void {
    this._inputElements.forEach(action);
  }

  protected _handleMultiInputs(): void {
    addClass(TEXT_FIELD_CONSTANTS.classes.MULTI_INPUT, this._rootElement);
    this._applyToInputs((input, index) => {
      input.setAttribute(`${TEXT_FIELD_CONSTANTS.attributes.MULTI_INPUT}-${index}`, '');
      if (index % 2 !== 1) {
        Promise.resolve().then(() => input.insertAdjacentElement('afterend', this._createSeperatorElement()));
      }
    });
  }

  private _createSeperatorElement(): HTMLElement {
    const divider = document.createElement('span');
    divider.setAttribute(TEXT_FIELD_CONSTANTS.attributes.MULTI_INPUT_SEPARATOR, '');
    divider.textContent = '-';
    return divider;
  }
}
