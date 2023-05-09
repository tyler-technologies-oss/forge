import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ForgeRipple } from '../../ripple';
import { IChipAdapter } from './chip-adapter';
import { ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipSelectEventData } from './chip-constants';

export interface IChipFoundation extends ICustomElementFoundation {
  type: ChipType;
  selected: boolean;
  disabled: boolean;
  invalid: boolean;
  value: any;
  dense: boolean;
  emulateFocus: boolean;
  setFocus(): void;
  tryFocusDelete(): void;
}

export class ChipFoundation implements IChipFoundation {
  private _type: ChipType = CHIP_CONSTANTS.defaults.TYPE as ChipType;
  private _selected = false;
  private _disabled = false;
  private _invalid = false;
  private _value: any = null;
  private _dense = false;
  private _emulateFocus = false;
  private _isInitialized = false;
  private _rippleInstance: ForgeRipple | undefined;
  private _clickListener: (evt: MouseEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _deleteKeydownListener: (evt: KeyboardEvent) => void;
  private _buttonFocusListener: (evt: FocusEvent) => void;
  private _buttonBlurListener: (evt: FocusEvent) => void;

  constructor(private _adapter: IChipAdapter) {
    this._clickListener = evt => this._onClick(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._deleteKeydownListener = evt => this._onDeleteKeydown(evt);
    this._buttonFocusListener = evt => this._onButtonFocus(evt);
    this._buttonBlurListener = evt => this._onButtonBlur(evt);
  }

  public initialize(): void {
    this._rippleInstance = this._adapter.initializeRipple();
    this._adapter.addRootListener('click', this._clickListener);
    this._adapter.addRootListener('keydown', this._keydownListener);
    this._adapter.addButtonListener('focus', this._buttonFocusListener);
    this._adapter.addButtonListener('blur', this._buttonBlurListener);
    this._applyState();
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._destroyRipple();
    this._adapter.removeRootListener('click', this._clickListener);
    this._adapter.removeRootListener('keydown', this._keydownListener);
    this._adapter.removeButtonListener('focus', this._buttonFocusListener);
    this._adapter.removeButtonListener('blur', this._buttonBlurListener);
    this._isInitialized = false;
  }

  private _destroyRipple(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
      this._rippleInstance = undefined;
    }
  }

  private _applyState(): void {
    // Attempt to inherit state from the parent chip-set component
    // Note: this should only inherit properties that need to be the same across the chips within a set
    const chipSetState = this._adapter.getChipSetState();
    if (chipSetState) {
      this._type = chipSetState.type;
      this._disabled = chipSetState.disabled;
      this._dense = chipSetState.dense;
    }

    // Ensure that only non-action chips can be selected
    if (this._type === 'action') {
      this._selected = false;
    }

    this._applyDisabled();
    this._applyType();
    this._applySelected();
    this._applyDense();
    this._applyEmulateFocus();
  }

  private _onClick(evt: MouseEvent): void {
    const target = evt.target as HTMLElement;
    const isDeleteButton = target.classList.contains(CHIP_CONSTANTS.classes.DELETE_BUTTON) ||
                           target.classList.contains(CHIP_CONSTANTS.classes.DELETE_BUTTON_TOUCH_TARGET);
    if (isDeleteButton) {
      this._handleDeleteInteraction(evt);
    } else {
      this._handleSelectInteraction();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'Delete':
      case 'Backspace':
        if (this._type === 'input') {
          evt.preventDefault();
          this._emitDeleteEvent();
        }
        break;
      case 'Enter':
      case ' ':
        evt.preventDefault();
        this._rippleInstance?.animate();
        this._handleSelectInteraction();
        break;
      case 'ArrowLeft':
        evt.preventDefault();
        this._adapter.tryMoveFocusPrevious();
        break;
      case 'ArrowRight':
        evt.preventDefault();
        this._adapter.tryMoveFocusNext();
        break;
    }
  }

  private _onDeleteKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter') {
      this._handleDeleteInteraction(evt);
    }
  }

  private _onButtonFocus(evt: FocusEvent): void {
    this._adapter.setHostAttribute('focused');
  }

  private _onButtonBlur(evt: FocusEvent): void {
    this._adapter.removeHostAttribute('focused');
  }

  private _handleDeleteInteraction(evt: Event): void {
    // The delete event can only be fired when the `input` or `field` type is used
    const target = evt.target as HTMLElement;
    const isDeleteButton = target.classList.contains(CHIP_CONSTANTS.classes.DELETE_BUTTON) ||
                           target.classList.contains(CHIP_CONSTANTS.classes.DELETE_BUTTON_TOUCH_TARGET);
    if (isDeleteButton) {
      evt.stopPropagation();
      this._emitDeleteEvent();
    }
  }

  private _handleSelectInteraction(): void {
    const wasDefaultPrevented = this._emitSelectEvent();
    const isSelectableType = ['filter', 'choice', 'input'].includes(this._type);

    // We only toggle the selected state for certain types (and if default wasn't prevented on the event)
    if (!wasDefaultPrevented && isSelectableType) {
      this._selected = !this._selected;
      this._applySelected();
    }
  }

  private _emitSelectEvent(): boolean {
    const selectEventData: IChipSelectEventData = {
      selected: !this._selected,
      value: this._value
    };
    return !this._adapter.emitHostEvent(CHIP_CONSTANTS.events.SELECT, selectEventData, true, true);
  }

  private _emitDeleteEvent(): void {
    const deleteEventData: IChipDeleteEventData = { value: this._value };
    this._adapter.emitHostEvent(CHIP_CONSTANTS.events.DELETE, deleteEventData, true, true);
  }

  private _applyType(): void {
    this._adapter.clearTypeClass();

    switch (this._type) {
      case 'action':
        this._adapter.addRootClass(CHIP_CONSTANTS.classes.ACTION);
        break;
      case 'choice':
        this._adapter.addRootClass(CHIP_CONSTANTS.classes.CHOICE);
        break;
      case 'filter':
        this._adapter.addRootClass(CHIP_CONSTANTS.classes.FILTER);
        break;
      case 'input':
        this._adapter.addRootClass(CHIP_CONSTANTS.classes.INPUT);
        break;
      case 'field':
        this._adapter.addRootClass(CHIP_CONSTANTS.classes.FIELD);
        break;
    }

    this._adapter.setCheckmarkVisibility(this._type === 'filter');
    const showDeleteButton = this._type === 'input' || this._type === 'field';
    this._adapter.setDeleteButtonVisibility(showDeleteButton, this._deleteKeydownListener);
    this._adapter.setLeadingSlotVisibility(!this._selected);
    this._adapter.setHostAttribute(CHIP_CONSTANTS.attributes.TYPE, this._type);
  }

  private _applySelected(): void {
    this._adapter.setSelected(this._selected);

    // If using the filter type, we need to hide the leading slot to ensure that
    // the checkmark shows in place of any leading elements
    if (this._type === 'filter') {
      this._adapter.setLeadingSlotVisibility(!this._selected);
    }

    this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.SELECTED, this._selected);
  }

  private _applyDisabled(): void {
    this._adapter.setDisabled(this._disabled);
    this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.DISABLED, this._disabled);
  }

  private _applyDense(): void {
    this._adapter.setDense(this._dense);
    this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.DISABLED, this._disabled);
  }

  private _applyEmulateFocus(): void {
    this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.EMULATE_FOCUS, this._emulateFocus);
    this._adapter.setEmulatedFocus(this._emulateFocus);
  }

  public get type(): ChipType {
    return this._type;
  }
  public set type(value: ChipType) {
    if (this._type !== value) {
      this._type = value;
      if (this._isInitialized) {
        const isValidType = ['action', 'choice', 'filter', 'input', 'field'].includes(this._type);
        if (!isValidType) {
          this._type = 'action';
        }
        if (this._type === 'action') {
          this._selected = false;
          this._applySelected();
        }
        this._applyType();
      }
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      if (this._isInitialized) {
        if (this._type === 'action') {
          this._selected = false;
        }
        this._applySelected();
      }
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._isInitialized) {
        this._applyDisabled();
      }
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(val: boolean) {
    if (this._invalid === val) {
      return;
    }
    
    this._invalid = val;
    if (val) {
      this._adapter.setHostAttribute(CHIP_CONSTANTS.attributes.INVALID, '');
      this._adapter.addRootClass(CHIP_CONSTANTS.classes.INVALID);
    } else {
      this._adapter.removeHostAttribute(CHIP_CONSTANTS.attributes.INVALID);
      this._adapter.removeRootClass(CHIP_CONSTANTS.classes.INVALID);
    }
  }

  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      if (this._isInitialized) {
        this._applyDense();
      }
    }
  }

  public get emulateFocus(): boolean {
    return this._emulateFocus;
  }
  public set emulateFocus(value: boolean) {
    if (this._emulateFocus !== value) {
      this._emulateFocus = value;
      if (this._isInitialized) {
        this._applyEmulateFocus();
      }
    }
  }

  public setFocus(): void {
    this._adapter.setFocus();
  }

  public tryFocusDelete(): void {
    if (this._type === 'input') {
      this._adapter.tryFocusDelete();
      return;
    }
    this.setFocus();
  }
}
