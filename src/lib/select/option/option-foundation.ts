import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseListDropdownOption, ListDropdownIconType } from '../../list-dropdown/list-dropdown-constants';
import { IOptionAdapter } from './option-adapter';
import { OPTION_CONSTANTS } from './option-constants';

export interface IOptionFoundation extends ICustomElementFoundation, Required<IBaseListDropdownOption> {}

/** The foundation class behind the `<forge-option>` element. */
export class OptionFoundation implements IOptionFoundation {
  private _value: any;
  private _label: string;
  private _disabled = false;
  private _divider = false;
  private _optionClass: string[] = [];
  private _leadingIcon: string;
  private _leadingIconClass: string;
  private _leadingIconType: ListDropdownIconType;
  private _trailingIcon: string;
  private _trailingIconClass: string;
  private _trailingIconType: ListDropdownIconType;
  private _leadingBuilder: () => HTMLElement;
  private _trailingBuilder: () => HTMLElement;

  constructor(private _adapter: IOptionAdapter) {}

  /** Gets/sets the value of this option. */
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.emitHostEvent(OPTION_CONSTANTS.events.VALUE_CHANGE, this._value);
    }
  }

  /** Gets/sets the label of this option. */
  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.LABEL, !!this._label, this._label);
    }
  }

  /** Gets/sets the disabled status of this option. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  /** Gets/sets the whether this option is a divider. */
  public get divider(): boolean {
    return this._divider;
  }
  public set divider(value: boolean) {
    if (this._divider !== value) {
      this._divider = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.DIVIDER, this._divider);
    }
  }

  /** Gets/sets the classes of this option. */
  public get optionClass(): string | string[] {
    return this._optionClass;
  }
  public set optionClass(value: string | string[]) {
    if (!value) {
      value = [];
    } else if (typeof value === 'string') {
      value = value.split(' ');
    }

    value = value.filter(v => v && !/\s+/.test(v));

    if (this._optionClass.toString() !== value.toString()) {
      this._optionClass = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.OPTION_CLASS, this._optionClass && !!this._optionClass.length, this._optionClass.join(' '));
    }
  }

  /** Gets/sets the leading icon of this option. */
  public get leadingIcon(): string {
    return this._leadingIcon;
  }
  public set leadingIcon(value: string) {
    if (this._leadingIcon !== value) {
      this._leadingIcon = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON, !!this._leadingIcon, this._leadingIcon);
    }
  }

  /** Gets/sets the leading icon class of this option. */
  public get leadingIconClass(): string {
    return this._leadingIconClass;
  }
  public set leadingIconClass(value: string) {
    if (this._leadingIconClass !== value) {
      this._leadingIconClass = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_CLASS, !!this._leadingIconClass, this._leadingIconClass);
    }
  }

  /** Gets/sets the leading icon type of this option. */
  public get leadingIconType(): ListDropdownIconType {
    return this._leadingIconType;
  }
  public set leadingIconType(value: ListDropdownIconType) {
    if (this._leadingIconType !== value) {
      this._leadingIconType = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.LEADING_ICON_TYPE, !!this._leadingIconType, this._leadingIconType);
    }
  }

  /** Gets/sets the trailing icon of this option. */
  public get trailingIcon(): string {
    return this._trailingIcon;
  }
  public set trailingIcon(value: string) {
    if (this._trailingIcon !== value) {
      this._trailingIcon = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON, !!this._trailingIcon, this._trailingIcon);
    }
  }

  /** Gets/sets the trailing icon class of this option. */
  public get trailingIconClass(): string {
    return this._trailingIconClass;
  }
  public set trailingIconClass(value: string) {
    if (this._trailingIconClass !== value) {
      this._trailingIconClass = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_CLASS, !!this._trailingIconClass, this._trailingIconClass);
    }
  }

  /** Gets/sets the trailing icon type of this option. */
  public get trailingIconType(): ListDropdownIconType {
    return this._trailingIconType;
  }
  public set trailingIconType(value: ListDropdownIconType) {
    if (this._trailingIconType !== value) {
      this._trailingIconType = value;
      this._adapter.toggleHostAttribute(OPTION_CONSTANTS.attributes.TRAILING_ICON_TYPE, !!this._trailingIconType, this._trailingIconType);
    }
  }

  /** Gets/sets the leading builder of this option. */
  public get leadingBuilder(): (() => HTMLElement) {
    return this._leadingBuilder;
  }
  public set leadingBuilder(value: (() => HTMLElement)) {
    if (this._leadingBuilder !== value) {
      this._leadingBuilder = value;
    }
  }

  /** Gets/sets the trailing builder of this option. */
  public get trailingBuilder(): (() => HTMLElement) {
    return this._trailingBuilder;
  }
  public set trailingBuilder(value: (() => HTMLElement)) {
    if (this._trailingBuilder !== value) {
      this._trailingBuilder = value;
    }
  }
}
