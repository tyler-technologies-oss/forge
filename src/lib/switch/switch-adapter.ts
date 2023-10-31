import { getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, INPUT_PROPERTIES, SlottedElementAdapter, cloneAttributes, cloneProperties, cloneValidationMessage, forwardAttributes } from '../core';
import { StateLayerComponent } from '../state-layer';
import { ISwitchComponent } from './switch';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export interface ISwitchAdapter extends IBaseAdapter {
  initialize(): void;
  setOn(value: boolean): void;
  setDefaultOn(value: boolean): void;
  setValue(value: string): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setIconVisibility(value: SwitchIconVisibility): void;
  setLabelPosition(value: SwitchLabelPosition): void;
  addRootListener(event: string, callback: EventListener): void;
  addInputSlotListener(callback: EventListener): void;
  detectInputElement(): void;
  syncValue(value: string | null): void;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class SwitchAdapter extends BaseAdapter<ISwitchComponent> implements ISwitchAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;
  private readonly _iconOnElement: HTMLElement;
  private readonly _iconOffElement: HTMLElement;
  private readonly _inputSlotElement: HTMLSlotElement;
  private readonly _stateLayerElement: StateLayerComponent;
  private readonly _inputAdapter: SlottedElementAdapter<HTMLInputElement>;
  private _forwardObserver?: MutationObserver;

  private get _activeInputElement(): HTMLInputElement {
    return this._inputAdapter.el ?? this._inputElement;
  }

  constructor(component: ISwitchComponent) {
    super(component);
    
    this._rootElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.LABEL);
    this._iconOnElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_ON);
    this._iconOffElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_OFF);
    this._stateLayerElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
    this._inputAdapter = new SlottedElementAdapter();
  }

  public initialize(): void {
    const slottedInput = this._component.querySelector(SWITCH_CONSTANTS.selectors.SLOTTED_INPUT) as HTMLInputElement;
    if (slottedInput) {
      slottedInput.slot = 'input';
      this._switchInput(slottedInput, this._inputElement);
    } else {
      this._initializeForwardObserver(this._inputElement);
    }
    this._observeInput(slottedInput ?? this._inputElement);
  }

  public setOn(value: boolean): void {
    this._activeInputElement.checked = value;
  }

  public setDefaultOn(value: boolean): void {
    this._activeInputElement.toggleAttribute('checked', value);
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

  public setIconVisibility(value: SwitchIconVisibility): void {
    const hideOn = value === 'none' || value === 'off';
    const hideOff = value === 'none' || value === 'on';
    toggleClass(this._iconOnElement, hideOn, SWITCH_CONSTANTS.classes.HIDDEN);
    toggleClass(this._iconOffElement, hideOff, SWITCH_CONSTANTS.classes.HIDDEN);
  }

  public setLabelPosition(value: SwitchLabelPosition): void {
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
    this._inputElement.addEventListener('slotchange', callback);
  }

  public detectInputElement(): void {
    const inputElement = this._inputSlotElement.assignedElements()[0] as HTMLInputElement;
    if (inputElement) {
      this._inputAdapter.attachElement(inputElement);
    } else {
      this._inputAdapter.attachElement(this._inputElement);
    }
  }

  public syncValue(value: string | null): void {
    if (value === null) {
      this._component.internals.setFormValue(null, SWITCH_CONSTANTS.state.OFF);
      return;
    }

    const data = new FormData();
    data.append(this._component.name, value);
    this._component.internals.setFormValue(data, SWITCH_CONSTANTS.state.ON);
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    if (hasCustomValidityError) {
      this._activeInputElement.setCustomValidity(this._component.internals.validationMessage);
    } else {
      this._activeInputElement.setCustomValidity('');
    }

    this._component.internals.setValidity(this._activeInputElement.validity, this._activeInputElement.validationMessage, this._activeInputElement);
  }

  public setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void {
    this._component.internals.setValidity(flags, message, this._activeInputElement);
  }

  private _initializeInput(): void {
    this._forwardObserver?.disconnect();
    this._initializeForwardObserver(this._activeInputElement);
  }

  private _initializeForwardObserver(el: HTMLElement): void {
    this._forwardObserver = forwardAttributes(this._component, SWITCH_CONSTANTS.forwardedAttributes, (name, value) => {
      toggleAttribute(el, !!value, name, value ?? undefined);
    });
  }

  private _switchInput(newEl: HTMLInputElement, oldEl: HTMLInputElement): void {
    cloneAttributes(oldEl, newEl, ['type', 'role', 'checked', 'aria-readonly']);
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
