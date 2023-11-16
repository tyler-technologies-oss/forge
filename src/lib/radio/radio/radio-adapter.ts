import { BaseAdapter, IBaseAdapter, forwardAttributes } from '@tylertech/forge/core';
import { ARIAMixinStrict, restoreDefaultAria, setDefaultAria, supportsElementInternalsAria } from '@tylertech/forge/core/utils/a11y-utils';
import { RadioSelectionManager } from '../core/radio-selection-manager';
import { IRadioComponent } from './radio';
import { RADIO_CONSTANTS, RadioLabelPosition } from './radio-constants';
import { getShadowElement } from '@tylertech/forge-core';
import { StateLayerComponent } from '@tylertech/forge/state-layer';

export interface IRadioAdapter extends IBaseAdapter {
  initialize(): void;
  setChecked(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: RadioLabelPosition): void;
  setInputProperty<T extends keyof HTMLInputElement>(name: T, value: HTMLInputElement[T]): void;
  setUncheckedRadioGroupFocus(event: 'focus' | 'blur'): void;
  focusNext(): void;
  focusPrevious(): void;
}

export class RadioAdapter extends BaseAdapter<IRadioComponent> implements IRadioAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;
  private readonly _stateLayerElement: StateLayerComponent;

  constructor(component: IRadioComponent) {
    super(component);

    this._rootElement = getShadowElement(component, RADIO_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, RADIO_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, RADIO_CONSTANTS.selectors.LABEL);
    this._stateLayerElement = getShadowElement(component, RADIO_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
  }

  public initialize(): void {
    const observedAttributes = supportsElementInternalsAria(this._component.internals)
      ? []
      : ['role', 'aria-checked', 'aria-disabled', 'aria-label', 'aria-readonly', 'aria-required'];
    
    forwardAttributes(this._component, observedAttributes, (name: keyof ARIAMixinStrict, value) => {
      if (!value) {
        restoreDefaultAria(this._component, name);
      }
    }, false);
    this._interceptInputEvents();
  }

  public setChecked(value: boolean): void {
    setDefaultAria(this._component, this._component.internals, {
      ariaChecked: value ? 'true' : 'false'
    }, true);
    if (value) {
      RadioSelectionManager.setSelectedRadioInGroup(this._component);
    }
  }

  public setDisabled(value: boolean): void {
    setDefaultAria(this._component, this._component.internals, {
      ariaDisabled: value ? 'true' : 'false'
    });
    this._inputElement.disabled = value;
    this._stateLayerElement.disabled = value;
  }

  public setRequired(value: boolean): void {
    setDefaultAria(this._component, this._component.internals, {
      ariaRequired: value ? 'true' : 'false'
    });
    this._inputElement.required = value;
  }

  public setReadonly(value: boolean): void {
    setDefaultAria(this._component, this._component.internals, {
      ariaReadOnly: value ? 'true' : 'false'
    });
    this._inputElement.readOnly = value;
  }

  public setLabelPosition(value: RadioLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public setInputProperty<T extends keyof HTMLInputElement>(name: T, value: HTMLInputElement[T]): void {
    this._inputElement[name] = value;
  }

  public setUncheckedRadioGroupFocus(event: 'focus' | 'blur'): void {
    RadioSelectionManager.setUncheckedRadioGroupFocus(this._component, event);
  }

  public focusNext(): void {
    RadioSelectionManager.focusNextRadioInGroup(this._component);
  }

  public focusPrevious(): void {
    RadioSelectionManager.focusPreviousRadioInGroup(this._component);
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    if (hasCustomValidityError) {
      this._inputElement.setCustomValidity(this._component.internals.validationMessage);
    } else {
      this._inputElement.setCustomValidity('');
    }

    this._component.internals.setValidity(this._inputElement.validity, this._inputElement.validationMessage, this._inputElement);
  }

  private _interceptInputEvents(): void {
    this._inputElement.addEventListener('input', evt => evt.stopPropagation());
  }
}
