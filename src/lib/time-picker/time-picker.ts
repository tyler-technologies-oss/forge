import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, coerceNumber, ensureChild } from '@tylertech/forge-core';
import { tylIconClockOutline } from '@tylertech/tyler-icons/extended';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { TimePickerAdapter } from './time-picker-adapter';
import { TimePickerCore } from './time-picker-core';
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
 * @tag forge-time-picker
 */
@customElement({
  name: TIME_PICKER_CONSTANTS.elementName,
  dependencies: [ListComponent, ListItemComponent, IconButtonComponent, IconComponent, PopoverComponent, IconComponent, DialogComponent]
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

  private _core: TimePickerCore;

  constructor() {
    super();
    IconRegistry.define([tylIconClockOutline, tylIconClose]);
    attachShadowTemplate(this, template, styles);
    this._core = new TimePickerCore(new TimePickerAdapter(this));
  }

  public connectedCallback(): void {
    if (this.querySelector(TIME_PICKER_CONSTANTS.selectors.INPUT)) {
      this._core.initialize();
    } else {
      ensureChild(this, TIME_PICKER_CONSTANTS.selectors.INPUT).then(() => this._core.initialize());
    }
  }

  public disconnectedCallback(): void {
    this._core.destroy();
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

  /**
   * The current value of the time picker.
   * @default undefined
   * @attribute
   */
  @coreProperty()
  public declare value: string | null | undefined;

  /**
   * Whether or not the time picker is open.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare open: boolean;

  /**
   * Whether or not to allow seconds in the time picker.
   * @default false
   * @attribute allow-seconds
   */
  @coreProperty()
  public declare allowSeconds: boolean;

  /**
   * Whether or not the time picker input should be masked.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare masked: boolean;

  /**
   * Whether or not to show the mask format in the input.
   * @default false
   * @attribute show-mask-format
   */
  @coreProperty()
  public declare showMaskFormat: boolean;

  /**
   * Whether or not to use 24-hour time.
   * @default false
   * @attribute use-24-hour-time
   */
  @coreProperty()
  public declare use24HourTime: boolean;

  /**
   * Whether or not to allow invalid times.
   * @default false
   * @attribute allow-invalid-time
   */
  @coreProperty()
  public declare allowInvalidTime: boolean;

  /**
   * The minimum time that can be selected.
   * @default undefined
   * @attribute
   */
  @coreProperty()
  public declare min: string | null | undefined;

  /**
   * The maximum time that can be selected.
   * @default undefined
   * @attribute
   */
  @coreProperty()
  public declare max: string | null | undefined;

  /**
   * An array of times that cannot be selected.
   * @default []
   * @attribute restricted-times
   */
  @coreProperty()
  public declare restrictedTimes: string[];

  /**
   * The time to start the time picker at.
   * @default undefined
   * @attribute start-time
   */
  @coreProperty()
  public declare startTime: string | null | undefined;

  /**
   * The step interval for the time picker.
   * @default undefined
   * @attribute
   */
  @coreProperty()
  public declare step: number;

  /**
   * Whether or not to allow manual input of the time.
   * @default false
   * @attribute allow-input
   */
  @coreProperty()
  public declare allowInput: boolean;

  /**
   * Whether or not to show a "Now" button.
   * @default false
   * @attribute show-now
   */
  @coreProperty()
  public declare showNow: boolean;

  /**
   * Whether or not to display hour options in dropdown.
   * @default false
   * @attribute show-hour-options
   */
  @coreProperty()
  public declare showHourOptions: boolean;

  /**
   * An array of custom time picker options.
   * @default []
   * @attribute custom-options
   */
  @coreProperty()
  public declare customOptions: ITimePickerOption[];

  /**
   * A callback function to validate the time.
   * @default undefined
   * @attribute validation-callback
   */
  @coreProperty()
  public declare validationCallback: TimePickerValidationCallback;

  /**
   * A callback function to parse the time.
   * @default undefined
   * @attribute parse-callback
   */
  @coreProperty()
  public declare parseCallback: TimePickerParseCallback;

  /**
   * A callback function to format the time.
   * @default undefined
   * @attribute format-callback
   */
  @coreProperty()
  public declare formatCallback: TimePickerFormatCallback;

  /**
   * A callback function to coerce the time.
   * @default undefined
   * @attribute coercion-callback
   */
  @coreProperty()
  public declare coercionCallback: TimePickerCoercionCallback;

  /**
   * A callback function to prepare the mask.
   * @default undefined
   * @attribute prepare-mask-callback
   */
  @coreProperty()
  public declare prepareMaskCallback: TimePickerPrepareMaskCallback;

  /**
   * Whether or not the time picker is disabled.
   * @default false
   * @attribute disabled
   */
  @coreProperty()
  public declare disabled: boolean;

  /**
   * The classes to apply to the time picker popup.
   * @default undefined
   * @attribute popup-classes
   */
  @coreProperty()
  public declare popupClasses: string | string[];

  /**
   * Whether or not to allow the time picker to be a dropdown.
   * @default false
   * @attribute allow-dropdown
   */
  @coreProperty()
  public declare allowDropdown: boolean;

  /**
   * The target element to attach the popup to.
   * @default undefined
   * @attribute popup-target
   */
  @coreProperty()
  public declare popupTarget: string;
}
