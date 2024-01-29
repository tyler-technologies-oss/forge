import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IFieldAdapter } from './field-adapter';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldSlot, FieldTheme, FieldVariant, FIELD_CONSTANTS } from './field-constants';

export interface IFieldFoundation extends ICustomElementFoundation {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  floatLabel: boolean;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  density: FieldDensity;
  dense: boolean;
  popoverIcon: boolean;
  popoverExpanded: boolean;
  initialize(): void;
}

export class FieldFoundation implements IFieldFoundation {
  private _labelPosition: FieldLabelPosition = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION;
  private _labelAlignment: FieldLabelAlignment = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT;
  private _floatLabel = false;
  private _invalid = false;
  private _required = false;
  private _optional = false;
  private _disabled = false;
  private _variant: FieldVariant = FIELD_CONSTANTS.defaults.DEFAULT_VARIANT;
  private _theme: FieldTheme = FIELD_CONSTANTS.defaults.DEFAULT_THEME;
  private _density: FieldDensity = FIELD_CONSTANTS.defaults.DEFAULT_DENSITY;
  private _dense = false;
  private _popoverIcon = false;
  private _popoverExpanded = false;
  private _isInitialized = false;

  private _startSlotListener: () => void;
  private _endSlotListener: () => void;
  private _accessorySlotListener: () => void;
  private _helperStartSlotListener: () => void;
  private _helperEndSlotListener: () => void;
  private _popoverIconClickListener: () => void;

  constructor(private _adapter: IFieldAdapter) {
    this._startSlotListener = () => this._onSlotChange('start');
    this._endSlotListener = () => this._onSlotChange('end');
    this._accessorySlotListener = () => this._onSlotChange('accessory');
    this._helperStartSlotListener = () => this._onSlotChange('helper-start');
    this._helperEndSlotListener = () => this._onSlotChange('helper-end');
    this._popoverIconClickListener = () => this._onPopoverIconClick();
  }

  public initialize(): void {
    this._adapter.addSlotChangeListener('start', this._startSlotListener);
    this._adapter.addSlotChangeListener('end', this._endSlotListener);
    this._adapter.addSlotChangeListener('accessory', this._accessorySlotListener);
    this._adapter.addSlotChangeListener('helper-start', this._helperStartSlotListener);
    this._adapter.addSlotChangeListener('helper-end', this._helperEndSlotListener);
    if (this._popoverIcon) {
      this._adapter.addPopoverIconClickListener(this._popoverIconClickListener);
    }
    this._isInitialized = true;
  }

  private _onSlotChange(slotName: FieldSlot): void {
    this._adapter.handleSlotChange(slotName);
  }

  private _onPopoverIconClick(): void {
    this._adapter.emitHostEvent(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK);
  }

  public get labelPosition(): FieldLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
      this._adapter.setLabelPosition(this._labelPosition);
    }
  }

  public get labelAlignment(): FieldLabelAlignment {
    return this._labelAlignment;
  }
  public set labelAlignment(value: FieldLabelAlignment) {
    if (this._labelAlignment !== value) {
      this._labelAlignment = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT, this._labelAlignment);
    }
  }

  public get floatLabel(): boolean {
    return this._floatLabel;
  }
  public set floatLabel(value: boolean) {
    if (this._floatLabel !== value) {
      this._floatLabel = value;
      this._adapter.setFloatingLabel(this._floatLabel);
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL, this._floatLabel);
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.INVALID, this._invalid);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get optional(): boolean {
    return this._optional;
  }
  public set optional(value: boolean) {
    if (this._optional !== value) {
      this._optional = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.OPTIONAL, this._optional);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get variant(): FieldVariant {
    return this._variant;
  }
  public set variant(value: FieldVariant) {
    if (this._variant !== value) {
      this._variant = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.VARIANT, this._variant);
    }
  }

  public get theme(): FieldTheme {
    return this._theme;
  }
  public set theme(value: FieldTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.THEME, this._theme);
    }
  }

  public get density(): FieldDensity {
    return this._density;
  }
  public set density(value: FieldDensity) {
    if (this._density !== value) {
      this._density = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.DENSITY, this._density);
    }
  }

  // `dense` takes precedence over `density`
  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get popoverIcon(): boolean {
    return this._popoverIcon;
  }
  public set popoverIcon(value: boolean) {
    if (this._popoverIcon !== value) {
      this._popoverIcon = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.POPOVER_ICON, this._popoverIcon);

      if (!this._isInitialized) {
        return;
      }

      if (this._popoverIcon) {
        this._adapter.addPopoverIconClickListener(this._popoverIconClickListener);
      } else {
        this._adapter.removePopoverIconClickListener(this._popoverIconClickListener);
      }
    }
  }

  public get popoverExpanded(): boolean {
    return this._popoverExpanded;
  }
  public set popoverExpanded(value: boolean) {
    if (this._popoverExpanded !== value) {
      this._popoverExpanded = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.POPOVER_EXPANDED, this._popoverExpanded);
    }
  }
}
