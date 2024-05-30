import { coerceBoolean } from '@tylertech/forge-core';
import { AbstractConstructor, MixinBase } from '../../constants';
import { IBaseComponent } from '../../core/base/base-component';
import { IFieldComponent } from '../field';
import { FIELD_CONSTANTS } from '../field-constants';
import {
  FieldLabelPosition,
  FieldLabelAlignment,
  FieldVariant,
  FieldTheme,
  FieldShape,
  FieldDensity,
  FieldSupportTextInset,
  BASE_FIELD_CONSTANTS
} from './base-field-constants';

/**
 * Provides a consistent passthrough API to the underlying field component, for
 * field-like wrapper components.
 */
export interface IWithBaseField extends IBaseComponent {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  floatLabel: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  shape: FieldShape;
  density: FieldDensity;
  dense: boolean;
  popoverIcon: boolean;
  supportTextInset: FieldSupportTextInset;

  initializeFieldInstance(fieldElement: IFieldComponent): void;
  floatLabelWithoutAnimation(value: boolean): void;
}

export declare abstract class WithBaseFieldContract {
  public get labelPosition(): FieldLabelPosition;
  public set labelPosition(value: FieldLabelPosition);

  public get labelAlignment(): FieldLabelAlignment;
  public set labelAlignment(value: FieldLabelAlignment);
  
  public get invalid(): boolean;
  public set invalid(value: boolean);
  
  public get required(): boolean;
  public set required(value: boolean);
  
  public get optional(): boolean;
  public set optional(value: boolean);
  
  public get disabled(): boolean;
  public set disabled(value: boolean);
  
  public get floatLabel(): boolean;
  public set floatLabel(value: boolean);
  
  public get variant(): FieldVariant;
  public set variant(value: FieldVariant);
  
  public get theme(): FieldTheme;
  public set theme(value: FieldTheme);
  
  public get shape(): FieldShape;
  public set shape(value: FieldShape);

  public get density(): FieldDensity;
  public set density(value: FieldDensity);

  public get dense(): boolean;
  public set dense(value: boolean);
  
  public get popoverIcon(): boolean;
  public set popoverIcon(value: boolean);
  
  public get supportTextInset(): FieldSupportTextInset;
  public set supportTextInset(value: FieldSupportTextInset);
  
  public initializeFieldInstance(fieldElement: IFieldComponent): void;
  public floatLabelWithoutAnimation(value: boolean): void;
}

/**
 * Provides a consistent passthrough API to the underlying field component, for
 * field-like wrapper components.
 * 
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithBaseField<TBase extends MixinBase>(base: TBase) {
  abstract class BaseFieldComponent extends base implements IWithBaseField {
    private _fieldElement: IFieldComponent;

    constructor(...args: any[]) {
      super(...args);
    }

    /**
     * @internal
     */
    public initializeFieldInstance(fieldElement: IFieldComponent): void {
      this._fieldElement = fieldElement;

      // Ensure the field element is upgraded if it hasn't been already.
      // This is necessary for imperative creation of elements before they
      // are connected to the DOM.
      if (!this._fieldElement.shadowRoot) {
        window.customElements.upgrade(this._fieldElement);
      }
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      switch (name) {
        case BASE_FIELD_CONSTANTS.observedAttributes.LABEL_POSITION:
          this.labelPosition = newValue as FieldLabelPosition;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.LABEL_ALIGNMENT:
          this.labelAlignment = newValue as FieldLabelAlignment;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.INVALID:
          this.invalid = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.REQUIRED:
          this.required = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.OPTIONAL:
          this.optional = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.DISABLED:
          this.disabled = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.FLOAT_LABEL:
          this.floatLabel = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.VARIANT:
          this.variant = newValue as FieldVariant;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.THEME:
          this.theme = newValue as FieldTheme;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.SHAPE:
          this.shape = newValue as FieldShape;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.DENSITY:
          this.density = newValue as FieldDensity;
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.DENSE:
          this.dense = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.POPOVER_ICON:
          this.popoverIcon = coerceBoolean(newValue);
          return;
        case BASE_FIELD_CONSTANTS.observedAttributes.SUPPORT_TEXT_INSET:
          this.supportTextInset = newValue as FieldSupportTextInset;
          return;
      }
      super.attributeChangedCallback?.(name, oldValue, newValue);
    }

    /**
     * The position of the label.
     * @default "inset"
     * @attribute label-position
     */
    public get labelPosition(): FieldLabelPosition {
      return this._fieldElement.labelPosition;
    }
    public set labelPosition(value: FieldLabelPosition) {
      if (this._fieldElement.labelPosition !== value) {
        this._fieldElement.labelPosition = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION, value);
      }
    }
  
    /**
     * The alignment of the label.
     * @default "default"
     * @attribute label-alignment
     */
    public get labelAlignment(): FieldLabelAlignment {
      return this._fieldElement.labelAlignment;
    }
    public set labelAlignment(value: FieldLabelAlignment) {
      if (this._fieldElement.labelAlignment !== value) {
        this._fieldElement.labelAlignment = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT, value);
      }
    }
  
    /**
     * Whether the field is invalid.
     * @default false
     * @attribute
     */
    public get invalid(): boolean {
      return this._fieldElement.invalid;
    }
    public set invalid(value: boolean) {
      if (this._fieldElement.invalid !== value) {
        this._fieldElement.invalid = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.INVALID, value);
      }
    }
  
    /**
     * Whether the field is required.
     * @default false
     * @attribute
     */
    public get required(): boolean {
      return this._fieldElement.required;
    }
    public set required(value: boolean) {
      if (this._fieldElement.required !== value) {
        this._fieldElement.required = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.REQUIRED, value);
      }
    }
  
    /**
     * Whether the field is optional.
     * @default false
     * @attribute
     */
    public get optional(): boolean {
      return this._fieldElement.optional;
    }
    public set optional(value: boolean) {
      if (this._fieldElement.optional !== value) {
        this._fieldElement.optional = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.OPTIONAL, value);
      }
    }
  
    /**
     * Whether the field is disabled.
     * @default false
     * @attribute
     */
    public get disabled(): boolean {
      return this._fieldElement.disabled;
    }
    public set disabled(value: boolean) {
      if (this._fieldElement.disabled !== value) {
        this._fieldElement.disabled = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.DISABLED, value);
      }
    }
  
    /**
     * Whether the label floats above the field.
     * @default false
     * @attribute
     */
    public get floatLabel(): boolean {
      return this._fieldElement.floatLabel;
    }
    public set floatLabel(value: boolean) {
      if (this._fieldElement.floatLabel !== value) {
        this._fieldElement.floatLabel = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL, value);
      }
    }
  
    /**
     * The variant of the field.
     * @default "outlined"
     * @attribute
     */
    public get variant(): FieldVariant {
      return this._fieldElement.variant;
    }
    public set variant(value: FieldVariant) {
      if (this._fieldElement.variant !== value) {
        this._fieldElement.variant = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.VARIANT, value);
      }
    }
  
    /**
     * The theme of the field.
     * @default "default"
     * @attribute
     */
    public get theme(): FieldTheme {
      return this._fieldElement.theme;
    }
    public set theme(value: FieldTheme) {
      if (this._fieldElement.theme !== value) {
        this._fieldElement.theme = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.THEME, value);
      }
    }
  
    /**
     * The shape of the field.
     * @default "default"
     * @attribute
     */
    public get shape(): FieldShape {
      return this._fieldElement.shape;
    }
    public set shape(value: FieldShape) {
      if (this._fieldElement.shape !== value) {
        this._fieldElement.shape = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.SHAPE, value);
      }
    }
  
    /**
     * The density of the field.
     * @default "medium"
     * @attribute
     */
    public get density(): FieldDensity {
      return this._fieldElement.density;
    }
    public set density(value: FieldDensity) {
      if (this._fieldElement.density !== value) {
        this._fieldElement.density = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, value);
      }
    }
  
    /**
     * Whether the field is dense.
     * @default false
     * @attribute
     */
    public get dense(): boolean {
      return this._fieldElement.dense;
    }
    public set dense(value: boolean) {
      if (this._fieldElement.dense !== value) {
        this._fieldElement.dense = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.DENSE, value);
      }
    }
  
    /**
     * Whether the popover icon is displayed.
     * @default false
     * @attribute
     */
    public get popoverIcon(): boolean {
      return this._fieldElement.popoverIcon;
    }
    public set popoverIcon(value: boolean) {
      if (this._fieldElement.popoverIcon !== value) {
        this._fieldElement.popoverIcon = value;
        this.toggleAttribute(FIELD_CONSTANTS.attributes.POPOVER_ICON, value);
      }
    }
  
    /**
     * The inset of the support text.
     * @default "none"
     * @attribute support-text-inset
     */
    public get supportTextInset(): FieldSupportTextInset {
      return this._fieldElement.supportTextInset;
    }
    public set supportTextInset(value: FieldSupportTextInset) {
      if (this._fieldElement.supportTextInset !== value) {
        this._fieldElement.supportTextInset = value;
        this.setAttribute(FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET, value);
      }
    }

    /** Floats the label without an animation. Only applies when the label is inset. */
    public floatLabelWithoutAnimation(value: boolean): void {
      this._fieldElement.floatLabelWithoutAnimation(value);
    }
  }
  return BaseFieldComponent as AbstractConstructor<WithBaseFieldContract> & TBase;
}
