import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber, ensureChild } from '@tylertech/forge-core';
import { tylIconClockOutline } from '@tylertech/tyler-icons/extended';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { TimePickerAdapter } from './time-picker-adapter';
import { TimePickerFoundation } from './time-picker-foundation';
import {
  TIME_PICKER_CONSTANTS,
  ITimePickerOption,
  TimePickerParseCallback,
  TimePickerValidationCallback,
  TimePickerFormatCallback,
  TimePickerCoercionCallback,
  TimePickerPrepareMaskCallback
} from './time-picker-constants';
import { IconRegistry, IconComponent } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { DialogComponent } from '../dialog';
import { ListComponent, ListItemComponent } from '../list';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { PopoverComponent } from '../popover/popover';

import template from './time-picker.html';
import styles from './time-picker.scss';

export interface ITimePickerComponent extends IBaseComponent {
  value: string | null | undefined;
  open: boolean;
  allowSeconds: boolean;
  masked: boolean;
  showMaskFormat: boolean;
  use24HourTime: boolean;
  allowInvalidTime: boolean;
  min: string | null | undefined;
  max: string | null | undefined;
  restrictedTimes: string[];
  startTime: string | null | undefined;
  step: number;
  allowInput: boolean;
  showNow: boolean;
  showHourOptions: boolean;
  customOptions: ITimePickerOption[];
  validationCallback: TimePickerValidationCallback;
  parseCallback: TimePickerParseCallback;
  formatCallback: TimePickerFormatCallback;
  coercionCallback: TimePickerCoercionCallback;
  prepareMaskCallback: TimePickerPrepareMaskCallback;
  disabled: boolean;
  popupClasses: string | string[];
  allowDropdown: boolean;
  popupTarget: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-time-picker': ITimePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-time-picker-open': CustomEvent<void>;
    'forge-time-picker-close': CustomEvent<void>;
    'forge-time-picker-input': Event;
    'forge-time-picker-change': CustomEvent<string | null>;
  }
}

/**
 * The web component class behind the `<forge-time-picker>` custom element.
 * 
 * @tag forge-time-picker
 * 
 * @property {string | null | undefined} [value=undefined] - The current value of the time picker.
 * @property {boolean} [open=false] - Whether or not the time picker is open.
 * @property {boolean} [allowSeconds=false] - Whether or not to allow seconds in the time picker.
 * @property {boolean} [masked=false] - Whether or not the time picker input should be masked.
 * @property {boolean} [showMaskFormat=false] - Whether or not to show the mask format in the input.
 * @property {boolean} [use24HourTime=false] - Whether or not to use 24-hour time.
 * @property {boolean} [allowInvalidTime=false] - Whether or not to allow invalid times.
 * @property {string | null | undefined} [min=undefined] - The minimum time that can be selected.
 * @property {string | null | undefined} [max=undefined] - The maximum time that can be selected.
 * @property {string[]} [restrictedTimes=[]] - An array of times that cannot be selected.
 * @property {string | null | undefined} [startTime=undefined] - The time to start the time picker at.
 * @property {number} [step=undefined] - The step interval for the time picker.
 * @property {boolean} [allowInput=false] - Whether or not to allow manual input of the time.
 * @property {boolean} [showNow=false] - Whether or not to show a "Now" button.
 * @property {boolean} [showHourOptions=false] - Whether or not to display hour options in dropdown.
 * @property {ITimePickerOption[]} [customOptions=[]] - An array of custom time picker options.
 * @property {TimePickerValidationCallback} [validationCallback=undefined] - A callback function to validate the time.
 * @property {TimePickerParseCallback} [parseCallback=undefined] - A callback function to parse the time.
 * @property {TimePickerFormatCallback} [formatCallback=undefined] - A callback function to format the time.
 * @property {TimePickerCoercionCallback} [coercionCallback=undefined] - A callback function to coerce the time.
 * @property {TimePickerPrepareMaskCallback} [prepareMaskCallback=undefined] - A callback function to prepare the mask.
 * @property {boolean} [disabled=false] - Whether or not the time picker is disabled.
 * @property {string | string[]} [popupClasses=undefined] - The classes to apply to the time picker popup.
 * @property {boolean} [allowDropdown=false] - Whether or not to allow the time picker to be a dropdown.
 * @property {string} [popupTarget=undefined] - The target element to attach the popup to.
 * 
 */
@CustomElement({
  name: TIME_PICKER_CONSTANTS.elementName,
  dependencies: [
    ListComponent,
    ListItemComponent,
    IconButtonComponent,
    IconComponent,
    PopoverComponent,
    IconComponent,
    DialogComponent
  ]
})
export class TimePickerComponent extends BaseComponent implements ITimePickerComponent {
  public static get observedAttributes(): string[] {
    return [
      TIME_PICKER_CONSTANTS.attributes.VALUE,
      TIME_PICKER_CONSTANTS.attributes.OPEN,
      TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS,
      TIME_PICKER_CONSTANTS.attributes.MASKED,
      TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT,
      TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME,
      TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME,
      TIME_PICKER_CONSTANTS.attributes.MIN,
      TIME_PICKER_CONSTANTS.attributes.MAX,
      TIME_PICKER_CONSTANTS.attributes.START_TIME,
      TIME_PICKER_CONSTANTS.attributes.STEP,
      TIME_PICKER_CONSTANTS.attributes.ALLOW_INPUT,
      TIME_PICKER_CONSTANTS.attributes.SHOW_NOW,
      TIME_PICKER_CONSTANTS.attributes.SHOW_HOUR_OPTIONS,
      TIME_PICKER_CONSTANTS.attributes.DISABLED,
      TIME_PICKER_CONSTANTS.attributes.POPUP_CLASSES,
      TIME_PICKER_CONSTANTS.attributes.ALLOW_DROPDOWN
    ];
  }

  private _foundation: TimePickerFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconClockOutline, tylIconClose]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new TimePickerFoundation(new TimePickerAdapter(this));
  }

  public connectedCallback(): void {
    if (this.querySelector(TIME_PICKER_CONSTANTS.selectors.INPUT)) {
      this._foundation.initialize();
    } else {
      ensureChild(this, TIME_PICKER_CONSTANTS.selectors.INPUT).then(() => this._foundation.initialize());
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TIME_PICKER_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case TIME_PICKER_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS:
        this.allowSeconds = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.MASKED:
        this.masked = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT:
        this.showMaskFormat = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME:
        this.use24HourTime = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME:
        this.allowInvalidTime = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.SHOW_NOW:
        this.showNow = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.SHOW_HOUR_OPTIONS:
        this.showHourOptions = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.MIN:
        this.min = newValue;
        break;
      case TIME_PICKER_CONSTANTS.attributes.MAX:
        this.max = newValue;
        break;
      case TIME_PICKER_CONSTANTS.attributes.START_TIME:
        this.startTime = newValue;
        break;
      case TIME_PICKER_CONSTANTS.attributes.STEP:
        this.step = coerceNumber(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.ALLOW_INPUT:
        this.allowInput = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case TIME_PICKER_CONSTANTS.attributes.POPUP_CLASSES:
        this.popupClasses = newValue;
        break;
      case TIME_PICKER_CONSTANTS.attributes.ALLOW_DROPDOWN:
        this.allowDropdown = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare value: string | null | undefined;

  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare allowSeconds: boolean;

  @FoundationProperty()
  public declare masked: boolean;

  @FoundationProperty()
  public declare showMaskFormat: boolean;

  @FoundationProperty()
  public declare use24HourTime: boolean;

  @FoundationProperty()
  public declare allowInvalidTime: boolean;

  @FoundationProperty()
  public declare min: string | null | undefined;

  @FoundationProperty()
  public declare max: string | null | undefined;

  @FoundationProperty()
  public declare restrictedTimes: string[];

  @FoundationProperty()
  public declare startTime: string | null | undefined;

  @FoundationProperty()
  public declare step: number;

  @FoundationProperty()
  public declare allowInput: boolean;

  @FoundationProperty()
  public declare showNow: boolean;

  /** Whether or not to display hour options in dropdown */
  @FoundationProperty()
  public declare showHourOptions: boolean;

  @FoundationProperty()
  public declare customOptions: ITimePickerOption[];

  @FoundationProperty()
  public declare validationCallback: TimePickerValidationCallback;
  
  @FoundationProperty()
  public declare parseCallback: TimePickerParseCallback;

  @FoundationProperty()
  public declare formatCallback: TimePickerFormatCallback;

  @FoundationProperty()
  public declare coercionCallback: TimePickerCoercionCallback;

  @FoundationProperty()
  public declare prepareMaskCallback: TimePickerPrepareMaskCallback;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare popupClasses: string | string[];

  @FoundationProperty()
  public declare allowDropdown: boolean;

  @FoundationProperty()
  public declare popupTarget: string;
}
