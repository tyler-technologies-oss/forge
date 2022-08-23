import { isDefined, getEventPath } from '@tylertech/forge-core';
import { IBaseSelectFoundation, ISelectOption, BaseSelectFoundation } from '../core';
import { SELECT_CONSTANTS } from './select-constants';
import { IFloatingLabel } from '../../floating-label';
import { ISelectAdapter } from './select-adapter';
import { FieldDensityType, FieldFloatLabelType, FieldShapeType, FIELD_CONSTANTS } from '../../field/field-constants';

export interface ISelectFoundation extends IBaseSelectFoundation {
  label: string;
  disabled: boolean;
  density: FieldDensityType;
  invalid: boolean;
  required: boolean;
  floatLabelType: FieldFloatLabelType;
  placeholder: string;
}

/**
 * The foundation class behind the `<forge-select>` component.
 */
export class SelectFoundation extends BaseSelectFoundation<ISelectAdapter> implements ISelectFoundation {
  private _floatingLabelInstance: IFloatingLabel | undefined;
  private _shape: FieldShapeType = 'default';
  private _label = '';
  private _disabled = false;
  private _invalid = false;
  private _required = false;
  private _floatLabelType: FieldFloatLabelType = 'auto';
  private _placeholder: string;
  private _density: FieldDensityType = 'default';
  private _isInitialized = false;
  private _leadingChangeListener: (evt: Event) => void;
  private _addonEndChangeListener: (evt: Event) => void;
  private _mousedownListener: (evt: MouseEvent) => void;

  constructor(adapter: ISelectAdapter) {
    super(adapter);
    this._leadingChangeListener = evt => this._onLeadingSlotChanged(evt);
    this._addonEndChangeListener = evt => this._onAddonEndSlotChanged(evt);
    this._targetWidthCallback = () => this._adapter.getTargetWidth();
    this._mousedownListener = evt => this._onMouseDown(evt);
  }

  public initialize(): void {
    super.initialize();
    super.initializeTarget();
    this._initializeLabel();
    this._initializeAccessibility();

    this._adapter.setPlaceholderText(this._placeholder);
    this._applyDensity();
    this._setShapeType();

    this._detectLeadingElement();
    this._detectAddonEndContent();
    this._adapter.addMouseDownListener(this._mousedownListener);
    this._adapter.setLeadingListener(this._leadingChangeListener);
    this._adapter.setAddonEndListener(this._addonEndChangeListener);

    if (this._disabled) {
      this._adapter.setDisabled(true);
    }

    if (this._invalid) {
      this._adapter.setInvalid(true);
    }

    this._isInitialized = true;
  }

  public disconnect(): void {
    super.disconnect();
    this._adapter.removeMouseDownListener(this._mousedownListener);
    this._adapter.removeLeadingListener(this._leadingChangeListener);
    this._adapter.removeAddonEndListener(this._leadingChangeListener);

    if (this._floatingLabelInstance) {
      this._floatingLabelInstance.destroy();
      this._floatingLabelInstance = undefined;
    }
  }

  private _initializeLabel(): void {
    this._adapter.initializeLabel();
    this._updateLabel();
    this._floatingLabelInstance = this._adapter.initializeFloatingLabel();
    if (this._floatLabelType === 'always') {
      this._floatLabel(true);
    } else {
      const hasText = !!this._getSelectedText();
      const hasPlaceholder = !!this._placeholder;
      this._floatLabel(hasText || hasPlaceholder);
    }
  }

  private _destroyLabel(): void {
    if (this._floatingLabelInstance) {
      this._floatingLabelInstance.destroy();
      this._floatingLabelInstance = undefined;
    }
  }

  protected _initializeValue(): void {
    super._initializeValue();
    if (this._selectedValues.length) {
      this._floatLabel(true);
    }
  }

  private _initializeAccessibility(): void {
    this._adapter.setMultiple(this._multiple);
    if (this._required) {
      this._adapter.setHostAttribute('aria-required', 'true');
    }
    if (this._disabled) {
      this._adapter.setHostAttribute('aria-disabled', 'true');
    }
    if (this._invalid) {
      this._adapter.setHostAttribute('aria-invalid', 'true');
    }
  }

  private _onMouseDown(evt: MouseEvent): void {
    const isElementWithinSelf = this._adapter.isWithinSelf(evt.target as HTMLElement);
    if (isElementWithinSelf) {
      evt.preventDefault();
    }
  }

  /** Called when the `slotchange` event fires on the "leading" slot element. */
  private _onLeadingSlotChanged(evt: Event): void {
    this._detectLeadingElement();
  }

  /** Called when the `slotchange` event fires on the "addon-end" slot element. */
  private _onAddonEndSlotChanged(evt: Event): void {
    this._detectAddonEndContent();
  }

  /** Updates the component state based on the existance of elements within the "leading" slot. */
  private _detectLeadingElement(): void {
    if (this._adapter.hasLeadingElement()) {
      this._adapter.addRootClass(FIELD_CONSTANTS.classes.LEADING);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.LEADING);
    }
  }

  private _detectAddonEndContent(): void {
    if (this._adapter.hasAddonEndNodes()) {
      this._adapter.addRootClass(FIELD_CONSTANTS.classes.ADDON_END);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.ADDON_END);
    }
  }

  protected _onClick(evt: MouseEvent): void {
    if (this._disabled) {
      return;
    }

    // We ignore clicks events that originate from without our addon-end container
    const composedPath = getEventPath(evt);
    if (composedPath.find(el => el.classList && el.classList.contains(FIELD_CONSTANTS.classes.ADDON_END_CONTAINER))) {
      return;
    }

    this.setFocus();
    super._onClick(evt);
  }

  /** Handles receiving focus on the selected text element. */
  protected _onFocus(evt: Event): void {
    if (this._disabled) {
      return;
    }
    this._setFocused();
    super._onFocus(evt);
  }

  protected _floatLabel(value: boolean): void {
    if (!this._floatingLabelInstance) {
      return;
    }

    if (value) {
      this._adapter.addRootClass(SELECT_CONSTANTS.classes.LABEL_FLOAT);
    } else {
      this._adapter.removeRootClass(SELECT_CONSTANTS.classes.LABEL_FLOAT);
    }

    if (this._floatLabelType === 'always') {
      value = true;
    }

    this._floatingLabelInstance.float(value, this._floatLabelType === 'always');
  }

  /** Handles losing focus on the selected text element. */
  protected _onBlur(evt: FocusEvent): void {
    super._onBlur(evt);
    this._setBlurred();
  }

  protected _onDismiss(): void {
    super._onDismiss();
    this._setBlurred();
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
        this._adapter.setFocus();
      }
    }
    return result;
  }

  /** Updates the state of the component to contain focus. */
  private _setFocused(): void {
    this._adapter.addRootClass(FIELD_CONSTANTS.classes.FOCUSED);
    this._floatLabel(true);
  }

  /** Updates the state of the component to not contain focus. */
  private _setBlurred(): void {
    this._adapter.removeRootClass(FIELD_CONSTANTS.classes.FOCUSED);
    if (!this._selectedValues.length && !this._placeholder?.length) {
      this._floatLabel(false);
    }
  }

  /** Resets the state of the component to original values. */
  protected _reset(): void {
    super._reset();
    this._adapter.setSelectedText('');
    this._floatLabel(!this._placeholder?.length);
  }

  private _updateLabel(): void {
    if (this._adapter.hasLabel()) {
      this._adapter.setLabel(this._label);
    }
    if (this._label && this._density !== 'dense') {
      this._adapter.addRootClass(FIELD_CONSTANTS.classes.LABEL);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.LABEL);
    }
  }

  protected _applyValue(value: string | string[]): void {
    super._applyValue(value);

    // Update the state of the component based on the existence of a selected value
    const text = this._getSelectedText();
    this._adapter.setSelectedText(text);
    if (!this._open) {
      this._floatLabel(!!text || !!this._placeholder);
    }
  }

  private _applyDensity(): void {
    this._adapter.setRoomy(this._density === 'roomy');
    this._adapter.setDense(this._density === 'dense');
  }

  protected _setShapeType(): void {
    if (this._shape === 'rounded') {
      this._adapter.addRootClass(FIELD_CONSTANTS.classes.SHAPE_ROUNDED);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.SHAPE_ROUNDED);
    }
  }

  public setFocus(): void {
    this._adapter.setFocus();
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
        this._adapter.setHostAttribute(SELECT_CONSTANTS.attributes.LABEL, this._label);
      } else {
        this._destroyLabel();
        this.required = false;
        this._adapter.removeHostAttribute(SELECT_CONSTANTS.attributes.LABEL);
      }
    }
  }

  public get shape(): FieldShapeType {
    return this._shape;
  }
  public set shape(value: FieldShapeType) {
    if (this._shape !== value) {
      this._shape = value;

      if (this._isInitialized) {
        this._setShapeType();
      }

      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.SHAPE, this._shape);
    }
  }

  /** Gets/sets the disabled state. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._initializeLabel();
    }
  }

  /** Gets/sets the invalid state. */
  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;
      this._adapter.setInvalid(this._invalid);
    }
  }

  /** Gets/sets the required state which controls the visibility of the asterisk in the label. */
  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setRequired(this._required);
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  /** Gets/sets the dense state. */
  public get density(): FieldDensityType {
    return this._density;
  }
  public set density(value: FieldDensityType) {
    if (this._density !== value) {
      this._density = value;
      this._applyDensity();
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.DENSITY, this._density.toString());
      this._initializeLabel(); // This ensures label is removed while dense
    }
  }

  /** Gets/sets the floating label type. */
  public get floatLabelType(): FieldFloatLabelType {
    return this._floatLabelType;
  }
  public set floatLabelType(value: FieldFloatLabelType) {
    if (this._floatLabelType !== value) {
      this._floatLabelType = value;
      this._floatLabel(this._floatLabelType === 'always' || !!this._placeholder);
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, isDefined(this._floatLabelType) ? this._floatLabelType.toString() : '');
    }
  }

  /** Gets/sets the placeholder text. */
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
}
