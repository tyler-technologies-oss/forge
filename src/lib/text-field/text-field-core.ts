import { FieldLabelPosition, FIELD_CONSTANTS } from '../field';
import { BaseFieldCore, IBaseFieldCore } from '../field/base/base-field-core';
import { ITextFieldAdapter, TextFieldAdapter } from './text-field-adapter';
import { TextFieldInputAttributeObserver, TextFieldValueChangeListener, TEXT_FIELD_CONSTANTS, TextFieldObservedInputAttributes } from './text-field-constants';

export interface ITextFieldCore extends IBaseFieldCore {
  readonly popoverTargetElement: HTMLElement;
  showClear: boolean;
}

export class TextFieldCore extends BaseFieldCore<ITextFieldAdapter> implements ITextFieldCore {
  private _showClear = false;
  private _slotChangeListener: EventListener = this._onSlotChange.bind(this);
  private _inputAttributeListener: TextFieldInputAttributeObserver = this._onInputAttributeChange.bind(this);
  private _valueChangeListener: TextFieldValueChangeListener = this._onValueChange.bind(this);
  private _inputListener: EventListener = this._onValueChange.bind(this);
  private _clearButtonClickListener: EventListener = (evt: PointerEvent) => this._onClearButtonClick(evt);

  constructor(protected _adapter: TextFieldAdapter) {
    super(_adapter);
  }

  public initialize(): void {
    this._adapter.tryApplyGlobalConfiguration(['labelPosition', 'variant']);
    this._adapter.addRootListener('slotchange', this._slotChangeListener);
    this._adapter.addRootListener('input', this._inputListener);
    this._initializeSlots();
  }

  public destroy(): void {
    this._adapter.removeRootListener('slotchange', this._slotChangeListener);
    this._adapter.removeRootListener('input', this._inputListener);
    this._adapter.removeValueChangeListener();
  }

  public get popoverTargetElement(): HTMLElement {
    return this._adapter.popoverTargetElement;
  }

  private _initializeSlots(): void {
    this._adapter.getAllSlotElements().forEach(slot => this._handleSlotChange(slot.name));
  }

  private _onSlotChange(evt: Event): void {
    const target = evt.target as HTMLSlotElement;
    this._handleSlotChange(target.name);
  }

  private _handleSlotChange(name: string): void {
    switch (name) {
      case 'label':
        this._adapter.tryConnectSlottedLabel();
        break;
      case '':
        this._adapter.handleDefaultSlotChange(this._inputAttributeListener);
        this._adapter.tryAddValueChangeListener(this, this._valueChangeListener);
        this._tryFloatLabel();
        break;
    }
  }

  private _onInputAttributeChange(name: TextFieldObservedInputAttributes, value: string | null): void {
    switch (name) {
      case 'disabled':
        this.disabled = value !== null;
        break;
      case 'placeholder':
        this._tryFloatLabel();
        break;
    }
  }

  private _onClearButtonClick(evt: Event): void {
    const event = new CustomEvent(TEXT_FIELD_CONSTANTS.events.CLEAR, {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    this._adapter.dispatchHostEvent(event);
    if (!event.defaultPrevented) {
      this._adapter.clearInput();
    }
  }

  private _onValueChange(): void {
    this._tryFloatLabel();
    this._toggleClearButtonVisibility();
  }

  private _toggleClearButtonVisibility(): void {
    this._adapter.toggleClearButtonVisibility(this._showClear && this._hasValue && !this.disabled);
  }

  public get showClear(): boolean {
    return this._showClear;
  }
  public set showClear(value: boolean) {
    if (this._showClear !== value) {
      this._showClear = value;
      this._adapter.toggleHostAttribute(TEXT_FIELD_CONSTANTS.attributes.SHOW_CLEAR, value);

      if (value) {
        this._adapter.connectClearButton(this._clearButtonClickListener);
      } else {
        this._adapter.disconnectClearButton(this._clearButtonClickListener);
      }
      this._toggleClearButtonVisibility();
    }
  }

  public override get disabled(): boolean {
    return super.disabled;
  }
  public override set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DISABLED, value);
      this._adapter.setFieldProperty('disabled', value);
      this._adapter.disableInput(value);
      this._toggleClearButtonVisibility();
    }
  }

  public override get labelPosition(): FieldLabelPosition {
    return super.labelPosition;
  }
  public override set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION, true, value);
      this._adapter.setFieldProperty('labelPosition', value);
      this._tryFloatLabel();
    }
  }
}
