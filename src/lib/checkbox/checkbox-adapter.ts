import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { internals } from '../constants';
import { BaseAdapter, IBaseAdapter, INPUT_PROPERTIES, SlottedElementAdapter, cloneAttributes, cloneProperties, cloneValidationMessage, forwardAttributes } from '../core';
import { StateLayerComponent } from '../state-layer';
import { ICheckboxComponent } from './checkbox';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition, CheckboxState } from './checkbox-constants';

export interface ICheckboxAdapter extends IBaseAdapter {
  initialize(): void;
  setChecked(value: boolean): void;
  setDefaultChecked(value: boolean): void;
  setIndeterminate(value: boolean): void;
  setValue(value: string): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: CheckboxLabelPosition): void;
  addRootListener(event: string, callback: EventListener): void;
  addInputSlotListener(callback: EventListener): void;
  detectInputElement(): void;
  proxyClick(): void;
  proxyLabel(value: string | null): void;
  syncValue(value: string | null, state: CheckboxState): void;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class CheckboxAdapter extends BaseAdapter<ICheckboxComponent> implements ICheckboxAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;
  private readonly _inputSlotElement: HTMLSlotElement;
  private readonly _stateLayerElement: StateLayerComponent;
  private readonly _inputAdapter: SlottedElementAdapter<HTMLInputElement>;
  private _forwardObserver?: MutationObserver;
  private _forwardedAriaLabel?: string;
  private _labelElementText?: string;

  private get _activeInputElement(): HTMLInputElement {
    return this._inputAdapter.el ?? this._inputElement;
  }

  constructor(component: ICheckboxComponent) {
    super(component);
    
    this._rootElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.LABEL);
    this._inputSlotElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.INPUT_SLOT) as HTMLSlotElement;
    this._stateLayerElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
    this._inputAdapter = new SlottedElementAdapter();
  }

  public initialize(): void {
    const slottedInput = this._component.querySelector(CHECKBOX_CONSTANTS.selectors.SLOTTED_INPUT) as HTMLInputElement;
    if (slottedInput) {
      slottedInput.slot = 'input';
      this._switchInput(slottedInput, this._inputElement);
    } else {
      this._initializeForwardObserver(this._inputElement);
    }
    this._observeInput(slottedInput ?? this._inputElement);
  }

  public setChecked(value: boolean): void {
    this._activeInputElement.checked = value;
  }

  public setDefaultChecked(value: boolean): void {
    this._activeInputElement.toggleAttribute('checked', value);
  }

  public setIndeterminate(value: boolean): void {
    this._activeInputElement.indeterminate = value;
  }

  public setValue(value: string): void {
    this._activeInputElement.value = value;
  }

  public setDisabled(value: boolean): void {
    this._activeInputElement.disabled = value;
    this._stateLayerElement.disabled = value;
  }

  public setRequired(value: boolean): void {
    this._activeInputElement.required = value;
  }

  public setReadonly(value: boolean): void {
    this._activeInputElement.readOnly = value;
    toggleAttribute(this._activeInputElement, value, 'aria-readonly', value.toString());
    this._stateLayerElement.disabled = value;
  }

  public setLabelPosition(value: CheckboxLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public addRootListener(event: string, callback: EventListener): void {
    this._rootElement.addEventListener(event, callback);
  }

  public addInputSlotListener(callback: EventListener): void {
    this._inputSlotElement.addEventListener('slotchange', callback);
  }

  public detectInputElement(): void {
    const inputElement = this._inputSlotElement.assignedElements()[0] as HTMLInputElement;
    if (inputElement) {
      this._inputAdapter.attachElement(inputElement);
    } else {
      this._inputAdapter.attachElement(this._inputElement);
    }
  }

  public proxyClick(): void {
    this._activeInputElement.click();
    // TODO: use `{ focusVisble: false }` when supported.
    this._activeInputElement.focus();
  }

  public proxyLabel(value: string | null): void {
    this._labelElementText = value ?? undefined;
    this._setAriaLabel();
  }

  public syncValue(value: string | null, state: CheckboxState): void {
    const data = value ? new FormData() : null;
    if (data && value) {
      data.append(this._component.name, value);
    }
    this._component.setFormValue(data, state);
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    if (hasCustomValidityError) {
      this._activeInputElement.setCustomValidity(this._component[internals].validationMessage);
    } else {
      this._activeInputElement.setCustomValidity('');
    }

    this._component[internals].setValidity(this._activeInputElement.validity, this._activeInputElement.validationMessage, this._activeInputElement);
  }

  public setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void {
    this._component[internals].setValidity(flags, message, this._activeInputElement);
  }

  private _initializeInput(): void {
    this._forwardObserver?.disconnect();
    this._initializeForwardObserver(this._activeInputElement);
  }

  private _initializeForwardObserver(el: HTMLElement): void {
    this._forwardObserver = forwardAttributes(this._component, CHECKBOX_CONSTANTS.forwardedAttributes, (name, value) => {
      // Use the connected label element as a fallback if aria-label is removed. Store the value so
      // it can be used to determine whether an updated label element should take effect.
      if (name === 'aria-label') {
        this._forwardedAriaLabel = value ?? undefined;
        this._setAriaLabel();
        return;
      }
      // Otherwise forward the attribute to the element.
      toggleAttribute(el, !!value, name, value ?? undefined);
    });
  }

  private _setAriaLabel(): void {
    const hasAriaLabel = !!this._forwardedAriaLabel || !!this._labelElementText;
    toggleAttribute(this._activeInputElement, hasAriaLabel, 'aria-label', this._forwardedAriaLabel ?? this._labelElementText);
  }
  
  private _switchInput(newEl: HTMLInputElement, oldEl: HTMLInputElement): void {
    cloneAttributes(oldEl, newEl, ['type', 'checked', 'aria-readonly']);
    cloneProperties(oldEl, newEl, INPUT_PROPERTIES);
    cloneValidationMessage(oldEl, newEl);
  }

  private _observeInput(el: HTMLInputElement = this._inputElement): void {
    this._inputAdapter.initialize(el, (newEl, oldEl) => {
      this._switchInput(newEl, oldEl);
      this._initializeInput();
    });
  }
}
