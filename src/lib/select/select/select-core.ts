import { BaseSelectCore, IBaseSelectCore, ISelectOption } from '../core';
import { ISelectAdapter } from './select-adapter';
import { SELECT_CONSTANTS } from './select-constants';

export interface ISelectCore extends IBaseSelectCore {
  label: string;
  placeholder: string;
  readonly required: boolean;
  syncFloatingLabelState(opts: { force?: boolean }): void;
  setDisabled(value: boolean): void;
}

export class SelectCore extends BaseSelectCore<ISelectAdapter> implements ISelectCore {
  private _label = '';
  private _placeholder: string;
  private readonly _required = false;
  private _permanentlyFloatLabel = false;
  private _mousedownListener: EventListener = this._onMouseDown.bind(this);

  constructor(adapter: ISelectAdapter) {
    super(adapter);
  }

  public initialize(): void {
    this._adapter.tryApplyGlobalConfiguration(['labelPosition', 'variant']);
    super.initialize();
    super.initializeTarget();
    this._initializeLabel();
    this._initializeAccessibility();
    this._adapter.addTargetListener('mousedown', this._mousedownListener);
  }

  public destroy(): void {
    super.destroy();
    this._adapter.removeTargetListener('mousedown', this._mousedownListener);
  }

  public syncFloatingLabelState({ force }: { force?: boolean } = {}): void {
    if (force !== undefined) {
      this._permanentlyFloatLabel = force;
    }
    this._updateLabel();
    this._tryFloatLabel();
  }

  public setDisabled(value: boolean): void {
    this._adapter.setDisabled(value);
  }

  private _initializeLabel(): void {
    this._updateLabel();
    this._tryFloatLabel();
  }

  protected _initializeValue(): void {
    super._initializeValue();
    this._tryFloatLabel();
  }

  private _initializeAccessibility(): void {
    this._adapter.initializeAccessibility();
  }

  private _onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
  }

  protected _onClick(evt: MouseEvent): void {
    if (this._adapter.fieldElement.disabled) {
      return;
    }

    // We ignore clicks events that originate from within the field accessory slot
    const composedPath = evt.composedPath() as HTMLElement[];
    if (composedPath.find(el => el.matches?.('slot[name=accessory]'))) {
      return;
    }

    this._adapter.focusHost();
    super._onClick(evt);
  }

  protected override _openDropdown(): void {
    super._openDropdown();
    if (this._open) {
      this._adapter.toggleHostAttribute(SELECT_CONSTANTS.attributes.OPEN, true);
    }
  }

  protected override _closeDropdown(): void {
    super._closeDropdown();
    if (!this._open) {
      this._adapter.toggleHostAttribute(SELECT_CONSTANTS.attributes.OPEN, false);
    }
  }

  protected override _onDismiss(): void {
    super._onDismiss();
  }

  protected _onDropdownScrollEnd(): void {
    this._adapter.emitHostEvent(SELECT_CONSTANTS.events.SCROLLED_BOTTOM);
  }

  /**
   * Handles selecting an item in the dropdown.
   * @param {ISelectOption} option The selected option.
   * @param {number} optionIndex The index of the selected option.
   */
  protected async _onSelect(option: ISelectOption, optionIndex: number, closeDropdown = true): Promise<boolean> {
    const result = await super._onSelect(option, optionIndex, closeDropdown);
    if (result) {
      this._adapter.setSelectedText(this._getSelectedText());
      if (closeDropdown && !this._multiple) {
        this._adapter.focusHost();
      }
    }
    this._tryFloatLabel();
    this._adapter.syncValue(this._value);
    return result;
  }

  protected _reset(): void {
    super._reset();
    this._adapter.setSelectedText('');
    this._tryFloatLabel();
  }

  private _tryFloatLabel(): void {
    if (this._permanentlyFloatLabel) {
      this._adapter.floatLabel(true);
      return;
    }

    const hasValue = !!this._getSelectedText() || !!this._selectedValues.length;
    const hasPlaceholder = !!this._placeholder;
    this._adapter.floatLabel(hasValue || hasPlaceholder);
  }

  private _updateLabel(): void {
    this._adapter.setLabel(this._label);
  }

  protected _applyValue(value: string | string[]): void {
    super._applyValue(value);

    this._adapter.syncValue(this._value);

    // Update the state of the component based on the existence of a selected value
    const text = this._getSelectedText();
    this._adapter.setSelectedText(text);
    if (!this._open) {
      this._tryFloatLabel();
    }
  }

  /** Gets/sets the label text. */
  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._updateLabel();
      if (this._label) {
        this._initializeLabel();
      }
      this._adapter.toggleHostAttribute(SELECT_CONSTANTS.attributes.LABEL, !!this._label, this._label);
    }
  }

  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(value: string) {
    if (this._placeholder !== value) {
      this._placeholder = value;
      this._adapter.setPlaceholderText(this._placeholder);
      this._initializeLabel();
    }
  }

  public override get multiple(): boolean {
    return super.multiple;
  }
  public override set multiple(value: boolean) {
    if (this._multiple !== value) {
      super.multiple = value;
      this._adapter.toggleHostAttribute(SELECT_CONSTANTS.attributes.MULTIPLE, value);
    }
  }

  /** Sets whether the select is required. */
  public set required(value: boolean) {
    if (this._required !== value) {
      this._adapter.setRequired();
    }
  }
}
