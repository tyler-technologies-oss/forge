import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IFloatingLabel } from '../floating-label/floating-label';
import { IFieldAdapter } from './field-adapter';
import { FIELD_CONSTANTS, FieldFloatLabelType, FieldShapeType, FieldDensityType } from './field-constants';

export interface IFieldFoundation extends ICustomElementFoundation {
  density: FieldDensityType;
  floatLabelType: FieldFloatLabelType;
  shape: FieldShapeType;
  invalid: boolean;
  required: boolean;
  floatLabel(value: boolean): void;
}

export class FieldFoundation {
  protected _density: FieldDensityType = 'default';
  protected _floatingLabel: IFloatingLabel | undefined;
  protected _shape: FieldShapeType = 'default';
  protected _invalid = false;
  protected _required = false;
  protected _floatLabelType: FieldFloatLabelType = 'auto';
  protected _isInitialized = false;
  protected _labelSlotListener: (evt: Event) => void;
  protected _leadingSlotListener: (evt: Event) => void;
  protected _trailingSlotListener: (evt: Event) => void;
  protected _addonEndSlotListener: (evt: Event) => void;
  protected _focusListener: (evt: Event) => void;
  protected _blurListener: (evt: Event) => void;
  protected _valueChangedListener: (value: any) => void;
  protected _inputAttributeChangedListener: (name: string, value: string) => void;

  constructor(protected _adapter: IFieldAdapter) {
    this._labelSlotListener = evt => this._onLabelSlotChanged(evt);
    this._leadingSlotListener = evt => this._onLeadingSlotChanged(evt);
    this._trailingSlotListener = evt => this._onTrailingSlotChanged(evt);
    this._addonEndSlotListener = evt => this._onAddonEndSlotChanged(evt);
    this._focusListener = (evt: Event) => this._onFocus(evt);
    this._blurListener = (evt: Event) => this._onBlur(evt);
    this._valueChangedListener = (value: any) => this._onValueChanged(value);
    this._inputAttributeChangedListener = (name, value) => this._onInputAttributeChanged(name, value);
  }

  //
  // Public
  //

  public initialize(): void {
    this._adapter.initialize(this._required, '');

    if (this._adapter.hasLabel()) {
      this._adapter.ensureSlottedLabel();
    }

    this._initializeLabel();

    if (this._adapter.hasPlaceholder()) {
      this._floatLabelType = 'always';
    }

    this._detectSlottedContent();
    this._adapter.addLabelSlotListener(this._labelSlotListener);
    this._adapter.addLeadingSlotListener(this._leadingSlotListener);
    this._adapter.addTrailingSlotListener(this._trailingSlotListener);
    this._adapter.addAddonEndSlotListener(this._addonEndSlotListener);
    this._adapter.setValueChangedListener(this, this._valueChangedListener);
    this._adapter.addInputListener('focus', this._focusListener);
    this._adapter.addInputListener('blur', this._blurListener);
    this._adapter.setInputAttributeObserver(this._inputAttributeChangedListener);
    this._applyDensity();
    this._setShapeType();
    this._setValidity();

    if (this._adapter.isDisabled()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.DISABLED);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.DISABLED);
    }

    if (this._adapter.isReadonly()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.READONLY);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.READONLY);
    }

    if (this._floatLabelType === 'always') {
      this.floatLabel(true);
    }

    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;
    this._adapter.destroy();

    if (this._floatingLabel) {
      this._floatingLabel.destroy();
      this._floatingLabel = undefined;
    }

    this._adapter.removeLabelSlotListener(this._labelSlotListener);
    this._adapter.removeLeadingSlotListener(this._leadingSlotListener);
    this._adapter.removeTrailingSlotListener(this._trailingSlotListener);
    this._adapter.removeAddonEndSlotListener(this._addonEndSlotListener);
    this._adapter.removeInputListener('focus', this._focusListener);
    this._adapter.removeInputListener('blur', this._blurListener);
    this._adapter.destroyValueChangeListener();
  }

  public get density(): FieldDensityType {
    return this._density;
  }
  public set density(value: FieldDensityType) {
    if (this._density !== value) {
      this._density = value;

      if (this._isInitialized) {
        this._applyDensity();
        this._initializeLabel();
      }

      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.DENSITY, this._density.toString());
    }
  }

  public get floatLabelType(): FieldFloatLabelType {
    return this._floatLabelType;
  }
  public set floatLabelType(value: FieldFloatLabelType) {
    if (this._floatLabelType !== value) {
      this._floatLabelType = value;

      if (this._isInitialized) {
        this.floatLabel(this._floatLabelType === 'always');
      }

      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, this._floatLabelType);
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

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;

      if (this._isInitialized) {
        this._setValidity();
      }
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;

      if (this._isInitialized) {
        this._setValidity();
      }

      if (this._required) {
        this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
      } else {
        this._adapter.removeHostAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
      }
    }
  }

  public floatLabel(value: boolean): void {
    if (this._floatingLabel?.isFloating === value) {
      return;
    }

    if (!value && this._floatLabelType === 'always') {
      if (this._floatingLabel) {
        this._floatingLabel.float(true, true);
      }
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING, '');
      return;
    }

    if (this._floatingLabel) {
      this._floatingLabel.float(value, this._floatLabelType === 'always');

      if (value) {
        this._adapter.setInputClass(FIELD_CONSTANTS.classes.INPUT_FOCUSED);
        this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING, '');
      } else {
        this._adapter.removeInputClass(FIELD_CONSTANTS.classes.INPUT_FOCUSED);
        this._adapter.removeHostAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING);
      }
    }
  }

  //
  // Protected
  //

  protected _onLabelSlotChanged(evt: Event): void {
    this._initializeLabel();
  }

  protected _onLeadingSlotChanged(evt: Event): void {
    this._detectLeadingContent();
  }

  protected _onTrailingSlotChanged(evt: Event): void {
    this._detectTrailingContent();
  }

  protected _onAddonEndSlotChanged(evt: Event): void {
    this._detectAddonEndContent();
  }

  protected _initializeLabel(): void {
    if (this._floatingLabel) {
      this._floatingLabel.destroy();
    }
    this._adapter.detectLabel(this._required);
    if (this._adapter.hasLabel() && this._density !== 'dense') {
      this._floatingLabel = this._adapter.initializeFloatingLabel();
      this._adapter.ensureLabelOrder();
      this.floatLabel(this._floatLabelType === 'always' || this._adapter.fieldHasValue() || this._adapter.hasPlaceholder());
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.LABEL);
    } else {
      this._adapter.removeHostAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING);
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.LABEL);
      this._floatingLabel = undefined;
    }
  }

  protected _detectLeadingContent(): void {
    if (this._adapter.hasLeadingNodes()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.LEADING);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.LEADING);
    }
  }

  protected _detectTrailingContent(): void {
    if (this._adapter.hasTrailingNodes()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.TRAILING);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.TRAILING);
    }
  }

  protected _detectAddonEndContent(): void {
    if (this._adapter.hasAddonEndNodes()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.ADDON_END);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.ADDON_END);
    }
  }

  protected _detectSlottedContent(): void {
    this._detectLeadingContent();
    this._detectTrailingContent();
    this._detectAddonEndContent();
  }

  protected _onFocus(event: Event): void {
    this._adapter.setRootClass(FIELD_CONSTANTS.classes.FOCUSED);
    this._adapter.setLabelClass(FIELD_CONSTANTS.classes.LABEL_FOCUSED);
    this.floatLabel(true);
  }

  protected _onBlur(event: Event): void {
    if (this._adapter.inputHasFocus()) {
      return;
    }

    this._adapter.removeRootClass(FIELD_CONSTANTS.classes.FOCUSED);
    this._adapter.removeLabelClass(FIELD_CONSTANTS.classes.LABEL_FOCUSED);

    if (!this._adapter.fieldHasValue() && !this._adapter.hasPlaceholder()) {
      this.floatLabel(false);
    }
  }

  protected _onValueChanged(value: any): void {
    if (this._adapter.fieldHasValue()) {
      this.floatLabel(true);
    } else if (!this._adapter.inputHasFocus()) {
      this.floatLabel(false);
    }
  }

  protected _onInputAttributeChanged(name: string, value: string | null): void {
    if (this._adapter.isDisabled()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.DISABLED);
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.FOCUSED);
      this._adapter.removeInputClass(FIELD_CONSTANTS.classes.INPUT_FOCUSED);
      this._adapter.removeLabelClass(FIELD_CONSTANTS.classes.LABEL_FOCUSED);

      if (!this._adapter.fieldHasValue() && !this._adapter.hasPlaceholder() && this._floatingLabel) {
        this.floatLabel(false);
      }
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.DISABLED);
    }

    if (this._adapter.isReadonly()) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.READONLY);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.READONLY);
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.FOCUSED);
      this._adapter.removeInputClass(FIELD_CONSTANTS.classes.INPUT_FOCUSED);
    }

    switch (name) {
      case 'readonly':
      case 'disabled':
        // If we are changing the readonly or disabled attribute, we want to make sure that we apply
        // the focus state properly if the input element also now has focus
        if (this._adapter.inputHasFocus()) {
          this._adapter.setRootClass(FIELD_CONSTANTS.classes.FOCUSED);
          this._adapter.setInputClass(FIELD_CONSTANTS.classes.INPUT_FOCUSED);
          this._adapter.setLabelClass(FIELD_CONSTANTS.classes.LABEL_FOCUSED);
        }
        break;
      case 'value':
        if (this._floatingLabel) {
          this.floatLabel(this._adapter.fieldHasValue());
        }
        break;
      case 'placeholder':
        if (this._floatingLabel) {
          const float = (!!value && !!value.trim()) || this._adapter.fieldHasValue();
          if (float !== this._floatingLabel.isFloating) {
            this.floatLabel(float);
          }
        }
        break;
    }
  }

  protected _setShapeType(): void {
    if (this._shape === 'rounded') {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.SHAPE_ROUNDED);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.SHAPE_ROUNDED);
    }
  }

  protected _setValidity(): void {
    if (this._invalid) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.INVALID);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.INVALID);
    }

    if (this._required) {
      this._adapter.setRootClass(FIELD_CONSTANTS.classes.REQUIRED);
    } else {
      this._adapter.removeRootClass(FIELD_CONSTANTS.classes.REQUIRED);
    }
  }

  protected _applyDensity(): void {
    this._adapter.setRoomy(this._density === 'roomy');
    this._adapter.setDense(this._density === 'dense');
  }
}
