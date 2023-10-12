import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, InputAdapter, cloneAttributes, cloneInputProperties, cloneValidationMessage, forwardAttributes } from '../core';
import { StateLayerComponent } from '../state-layer';
import { FocusIndicatorComponent } from '../focus-indicator';
import { ICheckboxComponent, forwardedAttributes } from './checkbox';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition } from './checkbox-constants';

export interface ICheckboxAdapter extends IBaseAdapter {
  initialize(): void;
  setChecked(value: boolean): void;
  setDefaultChecked(value: boolean): void;
  setIndeterminate(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: CheckboxLabelPosition): void;
  addRootListener(event: string, callback: EventListener): void;
  addInputSlotListener(callback: EventListener): void;
  detectInputElement(): void;
  syncValue(value: string | null): void;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class CheckboxAdapter extends BaseAdapter<ICheckboxComponent> implements ICheckboxAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;
  private readonly _inputSlotElement: HTMLSlotElement;
  private readonly _stateLayerElement: StateLayerComponent;
  private readonly _focusIndicatorElement: FocusIndicatorComponent;
  private readonly _inputAdapter: InputAdapter;
  private _forwardObserver?: MutationObserver;

  constructor(component: ICheckboxComponent) {
    super(component);
    this._rootElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.LABEL);
    this._inputSlotElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.INPUT_SLOT) as HTMLSlotElement;
    this._stateLayerElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
    this._focusIndicatorElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.FOCUS_INDICATOR) as FocusIndicatorComponent;
    this._inputAdapter = new InputAdapter();
  }

  public initialize(): void {
    this._inputAdapter.initialize(this._inputElement, (newEl, oldEl) => {
      if (oldEl) {
        cloneAttributes(oldEl, newEl, ['checked', 'aria-readonly']);
        cloneInputProperties(oldEl, newEl);
        cloneValidationMessage(oldEl, newEl);
      }

      this._forwardObserver?.disconnect();
      this._initializeForwardObserver(newEl);

      this._stateLayerElement.targetElement = newEl;
      this._focusIndicatorElement.targetElement = newEl;
    });
  }

  public setChecked(value: boolean): void {
    this._inputAdapter.el.checked = value;
  }

  public setDefaultChecked(value: boolean): void {
    this._inputAdapter?.el.toggleAttribute('checked', value);
  }

  public setIndeterminate(value: boolean): void {
    this._inputAdapter.el.indeterminate = value;
  }

  public setDisabled(value: boolean): void {
    this._inputAdapter.el.disabled = value;
  }

  public setRequired(value: boolean): void {
    this._inputAdapter.el.required = value;
  }

  public setReadonly(value: boolean): void {
    this._inputAdapter.el.readOnly = value;
    toggleAttribute(this._inputAdapter.el, value, 'aria-readonly', value.toString());
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
      this._inputAdapter.attachInput(inputElement);
    } else {
      this._inputAdapter.attachInput(this._inputElement);
    }
  }

  public syncValue(value: string | null): void {
    if (value === null) {
      this._component.internals.setFormValue(null);
      return;
    }

    const data = new FormData();
    data.append(this._component.name, value);
    this._component.internals.setFormValue(data, value);
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    if (hasCustomValidityError) {
      this._inputAdapter.el.setCustomValidity(this._component.internals.validationMessage);
    } else {
      this._inputAdapter.el.setCustomValidity('');
    }

    this._component.internals.setValidity(this._inputAdapter.el.validity, this._inputAdapter.el.validationMessage, this._inputAdapter.el);
  }

  public setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void {
    this._component.internals.setValidity(flags, message, this._inputAdapter.el);
  }

  private _initializeForwardObserver(el: HTMLElement): void {
    this._forwardObserver = forwardAttributes(this._component, forwardedAttributes, (name, value) => {
      toggleAttribute(el, !!value, name, value ?? undefined);
    });
  }
}
