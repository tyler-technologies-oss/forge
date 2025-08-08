import { FocusIndicatorFocusMode } from '../focus-indicator';
import {
  FieldDensity,
  FieldLabelAlignment,
  FieldLabelPosition,
  FieldShape,
  FieldSupportTextInset,
  FieldTheme,
  FieldVariant
} from './base/base-field-constants';
import { IFieldAdapter } from './field-adapter';
import { FIELD_CONSTANTS } from './field-constants';

export interface IFieldCore {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  floatLabel: boolean;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  shape: FieldShape;
  density: FieldDensity;
  dense: boolean;
  popoverIcon: boolean;
  popoverExpanded: boolean;
  multiline: boolean;
  supportTextInset: FieldSupportTextInset;
  focusIndicatorTargetElement: HTMLElement | undefined;
  focusIndicatorFocusMode: FocusIndicatorFocusMode;
  focusIndicatorAllowFocus: boolean;
  initialize(): void;
  floatLabelWithoutAnimation(value: boolean): void;
}

export class FieldCore implements IFieldCore {
  private _labelPosition: FieldLabelPosition = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION;
  private _labelAlignment: FieldLabelAlignment = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT;
  private _floatLabel = false;
  private _invalid = false;
  private _required = false;
  private _optional = false;
  private _disabled = false;
  private _variant: FieldVariant = FIELD_CONSTANTS.defaults.DEFAULT_VARIANT;
  private _theme: FieldTheme = FIELD_CONSTANTS.defaults.DEFAULT_THEME;
  private _shape: FieldShape = FIELD_CONSTANTS.defaults.DEFAULT_SHAPE;
  private _density: FieldDensity = FIELD_CONSTANTS.defaults.DEFAULT_DENSITY;
  private _dense = false;
  private _popoverIcon = false;
  private _popoverExpanded = false;
  private _multiline = false;
  private _supportTextInset: FieldSupportTextInset = FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET;

  private _slotChangeListener: EventListener = this._onSlotChange.bind(this);
  private _popoverIconClickListener: EventListener = this._onPopoverIconClick.bind(this);
  private _popoverIconMousedownListener: EventListener = this._onPopoverIconMousedown.bind(this);

  constructor(private _adapter: IFieldAdapter) {}

  public initialize(): void {
    this._adapter.addRootListener('slotchange', this._slotChangeListener);
    this._adapter.initializeSlots();
    this._adapter.tryApplyGlobalConfiguration(['labelPosition', 'variant']);
    this._adapter.setLabelPosition(this._labelPosition);

    if (this._popoverIcon) {
      this._adapter.addPopoverIconListener('click', this._popoverIconClickListener);
      this._adapter.addPopoverIconListener('mousedown', this._popoverIconMousedownListener);
    }
  }

  private _onSlotChange(evt: Event): void {
    this._adapter.handleSlotChange(evt.target as HTMLSlotElement);
  }

  private _onPopoverIconClick(): void {
    this._adapter.dispatchHostEvent(new CustomEvent(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, { bubbles: true, composed: true }));
  }

  private _onPopoverIconMousedown(evt: Event): void {
    const popoverEvent = new CustomEvent(FIELD_CONSTANTS.events.POPOVER_ICON_MOUSEDOWN, { bubbles: true, composed: true, cancelable: true });
    this._adapter.dispatchHostEvent(popoverEvent);
    if (popoverEvent.defaultPrevented) {
      evt.preventDefault();
    }
  }

  public floatLabelWithoutAnimation(value: boolean): void {
    if (this._floatLabel !== value) {
      this._floatLabel = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL, this._floatLabel);
    }
  }

  public get labelPosition(): FieldLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);

      if (!this._adapter.isConnected) {
        return;
      }

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
      if (this._adapter.hasSlottedLabel) {
        this._adapter.setFloatingLabel(this._floatLabel);
      }
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

  public get shape(): FieldShape {
    return this._shape;
  }
  public set shape(value: FieldShape) {
    if (this._shape !== value) {
      this._shape = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.SHAPE, this._shape);
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

      if (!this._adapter.isConnected) {
        return;
      }

      if (this._popoverIcon) {
        this._adapter.addPopoverIconListener('click', this._popoverIconClickListener);
        this._adapter.addPopoverIconListener('mousedown', this._popoverIconMousedownListener);
      } else {
        this._adapter.removePopoverIconListener('click', this._popoverIconClickListener);
        this._adapter.removePopoverIconListener('mousedown', this._popoverIconMousedownListener);
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

  public get multiline(): boolean {
    return this._multiline;
  }
  public set multiline(value: boolean) {
    if (this._multiline !== value) {
      this._multiline = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.MULTILINE, this._multiline);
    }
  }

  public get supportTextInset(): FieldSupportTextInset {
    return this._supportTextInset;
  }
  public set supportTextInset(value: FieldSupportTextInset) {
    if (this._supportTextInset !== value) {
      this._supportTextInset = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET, this._supportTextInset);
    }
  }

  public get focusIndicatorTargetElement(): HTMLElement | undefined {
    return this._adapter.focusIndicator.targetElement;
  }
  public set focusIndicatorTargetElement(value: HTMLElement | undefined) {
    this._adapter.focusIndicator.targetElement = value;
  }

  public get focusIndicatorFocusMode(): FocusIndicatorFocusMode {
    return this._adapter.focusIndicator.focusMode;
  }
  public set focusIndicatorFocusMode(value: FocusIndicatorFocusMode) {
    this._adapter.focusIndicator.focusMode = value;
  }

  public get focusIndicatorAllowFocus(): boolean {
    return this._adapter.focusIndicator.allowFocus;
  }
  public set focusIndicatorAllowFocus(value: boolean) {
    this._adapter.focusIndicator.allowFocus = value;
  }
}
