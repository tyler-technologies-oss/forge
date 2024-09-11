import { defineTimePickerComponent, ITimePickerComponent, ITimePickerCore, TIME_PICKER_CONSTANTS, ITimePickerOptionValue, ITimePickerAdapter, ITimePickerOption } from '@tylertech/forge/time-picker';
import { IPopoverComponent, IListItemComponent, LIST_ITEM_CONSTANTS, ICON_BUTTON_CONSTANTS, IIconButtonComponent, TEXT_FIELD_CONSTANTS, defineTextFieldComponent } from '@tylertech/forge';
import { task, frame } from '@tylertech/forge/core/utils/utils';
import { getCurrentTimeOfDayMillis, millisToTimeString, hoursToMillis, timeStringToMillis, mergeDateWithTime } from '@tylertech/forge/time-picker/time-picker-utils';

const POPOVER_ANIMATION_DURATION = 200;

interface ITestContext {
  context: ITimePickerTestContext;
}

interface ITimePickerTestContext {
  component: ITimePickerComponent;
  core: ITimePickerCore;
  adapter: ITimePickerAdapter;
  inputElement: HTMLInputElement;
  toggleElement: HTMLButtonElement;
  identifier: string;
  getPopup(): IPopoverComponent;
  getListItems(): IListItemComponent[];
  writeValue(char: string, pos: number, clear?: boolean): void;
}

describe('TimePickerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineTextFieldComponent();
    defineTimePickerComponent();
  });

  afterEach(function(this: ITestContext) {
    if (this.context) {
      const popup = this.context.getPopup();
      popup?.remove();
      this.context.component.remove();
      this.context = undefined as any;
    }
  });

  it('should instantiate component instance with shadow root', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  it('should have default value of null', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    expect(this.context.component.value).toBeNull();
  });

  it('should set value in default 12 hour format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '15:00';
    const expectedTimeString = '03:00 PM';
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set value in 24 hour format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '15:00';
    const expectedTimeString = '15:00';
    this.context.component.use24HourTime = true;
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should toggle existing value between 12 and 24 hour formats', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '15:30';
    const expected12hourTimeString = '03:30 PM';
    this.context.component.value = expectedTimeValue;
    
    expect(this.context.inputElement.value).toBe(expected12hourTimeString);
    
    const expected24HourTimeString = '15:30';
    this.context.component.use24HourTime = true;
    
    expect(this.context.inputElement.value).toBe(expected24HourTimeString, 'Expected 24 hour time string to match original value');
    
    this.context.component.use24HourTime = false;
    expect(this.context.inputElement.value).toBe(expected12hourTimeString, 'Expected 12 hour time string to match original value');
  });

  it('should set disabled', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    expect(this.context.component.disabled).toBeFalse();
    expect(this.context.inputElement.disabled).toBeFalse();
    expect(this.context.toggleElement.disabled).toBeFalse();

    this.context.component.disabled = true;

    expect(this.context.component.disabled).toBeTrue();
    expect(this.context.inputElement.disabled).toBeTrue();
    expect(this.context.toggleElement.disabled).toBeTrue();
  });

  it('should set value in 12 hour format with seconds', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '14:45:15';
    const expectedTimeString = '02:45:15 PM';
    this.context.component.allowSeconds = true;
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set value in 24 hour format with seconds', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '14:45:15';
    this.context.component.use24HourTime = true;
    this.context.component.allowSeconds = true;
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeValue);
  });

  it('should set remove seconds in 12 hour time if value is set with seconds but aren\'t allowed', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const timeValue = '14:45:15';
    const expectedTimeValue = '14:45';
    const expectedTimeString = '02:45 PM';
    this.context.component.value = timeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should remove seconds in 24 hour time if value is set with seconds but aren\'t allowed', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const timeValue = '14:45:15';
    const expectedTimeValue = '14:45';
    this.context.component.use24HourTime = true;
    this.context.component.value = timeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeValue);
  });

  it('should set default value in 12 hour mode', function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const expectedTimeValue = '00:30';
    const expectedTimeString = '12:30 AM';
    this.context.component.value = expectedTimeValue;
    document.body.appendChild(this.context.component);
    
    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });
  
  it('should set default value in 24 hour mode', function(this: ITestContext) {
    this.context = _createTimePickerContext(false);
    
    const expectedTimeValue = '00:30';
    this.context.component.value = expectedTimeValue;
    this.context.component.use24HourTime = true;
    document.body.appendChild(this.context.component);

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeValue);
  });

  it('should set default value in 12 hour mode with seconds', function(this: ITestContext) {
    this.context = _createTimePickerContext(false);
    
    const expectedTimeValue = '23:30:55';
    const expectedTimeString = '11:30:55 PM';
    this.context.component.value = expectedTimeValue;
    this.context.component.allowSeconds = true;
    document.body.appendChild(this.context.component);

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set default value in 24 hour mode with seconds', function(this: ITestContext) {
    this.context = _createTimePickerContext(false);
    
    const expectedTimeValue = '23:30:55';
    this.context.component.value = expectedTimeValue;
    this.context.component.use24HourTime = true;
    this.context.component.allowSeconds = true;
    document.body.appendChild(this.context.component);

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeValue);
  });

  it('should enable field after being disabled by default', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);
    
    this.context.component.disabled = true;
    document.body.appendChild(this.context.component);

    await frame();
    this.context.component.disabled = false;

    expect(this.context.component.disabled).toBeFalse();
    expect(this.context.inputElement.disabled).toBeFalse();
    expect(this.context.toggleElement.disabled).toBeFalse();
  });

  it('should set value to null if invalid time is provided', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '96:12';
    this.context.component.value = expectedTimeValue;
    
    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe('');
  });

  it('should retain value when toggling input mask', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '20:07';
    const expectedTimeString = '08:07 PM';
    this.context.component.value = expectedTimeValue;

    await frame();
    this.context.component.masked = false;
    await frame();

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set value without mask applied in 12 hour format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '23:59';
    const expectedTimeString = '11:59 PM';
    this.context.component.masked = false;
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set value without mask applied in 24 hour format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '23:59';
    this.context.component.masked = false;
    this.context.component.use24HourTime = true;
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeValue);
  });

  it('should set value through input element when unmasked', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.masked = false;

    const timeValue = '1111';
    this.context.inputElement.value = timeValue;

    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe(timeValue);
    
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    this.context.inputElement.dispatchEvent(new Event('blur'));
    
    expect(this.context.component.value).toBe('11:11');
    expect(this.context.inputElement.value).toBe('11:11 AM');
  });

  it('should not set value if below min', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.min = '08:00';
    this.context.component.value = '06:00';

    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe('');
  });

  it('should remove value if setting min and value is below min', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '06:00';
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);

    this.context.component.min = '08:00';

    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe('');
  });

  it('should not set value if above max', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.max = '15:00';
    this.context.component.value = '17:00';

    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe('');
  });

  it('should remove value if setting max and value is above max', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '17:00';
    this.context.component.value = expectedTimeValue;

    expect(this.context.component.value).toBe(expectedTimeValue);

    this.context.component.max = '12:00';

    expect(this.context.component.value).toBeNull();
    expect(this.context.inputElement.value).toBe('');
  });

  it('should not emit change event when setting value via input element property', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeEventSpy = jasmine.createSpy('change spy');
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

    this.context.inputElement.value = '08:00';

    expect(changeEventSpy).not.toHaveBeenCalled();
  });

  it('should emit change event when valid time string is entered', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeEventSpy = jasmine.createSpy('change spy');
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

    const expectedTimeValue = '08:00';
    this.context.core['_handleInput'](expectedTimeValue);

    expect(changeEventSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: expectedTimeValue }));
  });

  it('should not emit change event when invalid time string is entered', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeEventSpy = jasmine.createSpy('change spy');
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

    const expectedTimeValue = 'asdf';
    this.context.core['_handleInput'](expectedTimeValue);

    expect(changeEventSpy).not.toHaveBeenCalled();
  });

  it('should set time to current time when "n" key is pressed', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const millis = getCurrentTimeOfDayMillis(false);
    const expectedTimeValue = millisToTimeString(millis, true, false) || '';
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyN' }));

    expect(this.context.component.value).toBe(expectedTimeValue);
  });

  it('should set time to current time when "n" key is pressed with seconds', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const millis = getCurrentTimeOfDayMillis(true);
    const expectedTimeValue = millisToTimeString(millis, true, true) || '';
    this.context.component.allowSeconds = true;
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyN' }));

    expect(this.context.component.value).toBe(expectedTimeValue);
  });

  it('should open dropdown when toggle is clicked', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.toggleElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    
    expect(this.context.getPopup()).toBeTruthy();
  });

  it('should close dropdown when toggle is clicked', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.toggleElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(this.context.getPopup()).toBeTruthy();

    await frame();
    this.context.toggleElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await frame();
    await task(POPOVER_ANIMATION_DURATION);
    
    expect(this.context.getPopup()).toBeFalsy();
  });

  it('should open dropdown when down arrow key is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    
    expect(this.context.getPopup()).toBeTruthy();
  });

  it('should close dropdown when down escape key is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await task(POPOVER_ANIMATION_DURATION);
    expect(this.context.getPopup()).toBeTruthy();

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.getPopup()).toBeFalsy();
  });

  it('should set value via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedTimeValue = '14:30';
    const expectedTimeString = '02:30 PM';
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.VALUE, expectedTimeValue);

    expect(this.context.component.value).toBe(expectedTimeValue);
    expect(this.context.inputElement.value).toBe(expectedTimeString);
  });

  it('should set masked via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, 'false');
    expect(this.context.component.masked).toBeFalse();
  });

  it('should set showMaskFormat via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, 'true');
    expect(this.context.component.showMaskFormat).toBeTrue();
  });

  it('should set allowInvalidTime via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME, 'true');
    expect(this.context.component.allowInvalidTime).toBeTrue();
  });

  it('should set showNow via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_NOW, '');
    expect(this.context.component.showNow).toBeTrue();
  });

  it('should set showHourOptions via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_HOUR_OPTIONS, 'false');
    expect(this.context.component.showHourOptions).toBeFalse();
  });

  it('should set min via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const expectedTimeValue = '19:32';
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MIN, expectedTimeValue);
    expect(this.context.component.min).toBe(expectedTimeValue);
  });

  it('should set max via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const expectedTimeValue = '03:15';
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MAX, expectedTimeValue);
    expect(this.context.component.max).toBe(expectedTimeValue);
  });

  it('should set max via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const expectedTimeValue = '08:00';
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.START_TIME, expectedTimeValue);
    expect(this.context.component.startTime).toBe(expectedTimeValue);
  });

  it('should set step via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const expectedMinutes = 15;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.STEP, `${expectedMinutes}`);
    expect(this.context.component.step).toBe(expectedMinutes);
  });

  it('should set allowInput via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INPUT, 'false');
    expect(this.context.component.allowInput).toBeFalse();
  });

  it('should set popupClasses via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.POPUP_CLASSES, 'test');
    expect(this.context.component.popupClasses).toEqual(['test']);
  });

  it('should set allowDropdown via attribute', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_DROPDOWN, 'false');
    expect(this.context.component.allowDropdown).toBeFalse();
  });

  it('should handle selection', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const value: ITimePickerOptionValue = {
      time: 1 * 60 * 60 * 1000
    };
    const expectedTimeString = millisToTimeString(value.time, true, false);
    this.context.core['_onSelect'](value);

    expect(this.context.component.value).toBe(expectedTimeString);
  });

  it('should handle selecting "now" option', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const value: ITimePickerOptionValue = {
      time: getCurrentTimeOfDayMillis(false),
      metadata: 'now'
    };
    const expectedTimeString = millisToTimeString(value.time, true, false);
    this.context.core['_onSelect'](value);

    expect(this.context.component.value).toBe(expectedTimeString);
  });

  it('should handle selecting "custom" option', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const value: ITimePickerOptionValue = {
      time: 100000,
      metadata: 'custom',
      isCustom: true,
      customCallback: metadata => 100000
    };
    const expectedTimeString = millisToTimeString(value.time, true, false);
    this.context.core['_onSelect'](value);

    expect(this.context.component.value).toBe(expectedTimeString);
  });

  it('should throw if custom option doesn\'t provide customCallback', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const value: ITimePickerOptionValue = {
      time: 100000,
      metadata: 'custom',
      isCustom: true
    };
    const action = () => this.context.core['_onSelect'](value);

    expect(action).toThrowError();
  });

  it('should throw if custom option doesn\'t return a number type', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const value: ITimePickerOptionValue = {
      time: 100000,
      metadata: 'custom',
      isCustom: true,
      customCallback: () => 'test' as any
    };
    const action = () => this.context.core['_onSelect'](value);

    expect(action).toThrowError();
  });

  it('should not dispatch change event if selecting time that is already set', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeSpy = jasmine.createSpy('change spy');
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

    const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
    const timeString = millisToTimeString(value.time, true, false);
    this.context.component.value = timeString;
    this.context.core['_onSelect'](value);
    
    expect(this.context.component.value).toBe(timeString);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should not set time value if change event is cancelled', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeSpy = jasmine.createSpy('change spy', (evt: CustomEvent<string>) => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

    const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
    const timeString = millisToTimeString(value.time, true, false);
    this.context.core['_onSelect'](value);
    
    expect(changeSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: timeString }));
    expect(this.context.inputElement.value).toBe('');
    expect(this.context.component.value).not.toBe(timeString);
  });

  it('should select matching time in dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const timeString = '08:00';
    const timeMillis = timeStringToMillis(timeString, true, false);
    this.context.component.value = timeString;
    this.context.component.open = true;

    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const matchingListItem = listItems.find(li => li.selected) as IListItemComponent<ITimePickerOptionValue>;

    expect(matchingListItem.value.time).toBe(timeMillis);
  });

  it('should highlight option in dropdown when opened via arrow down key', async function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const activeListItemIndex = listItems.findIndex(li => li.active);

    expect(activeListItemIndex).toBe(this.context.core['_dropdownConfig'].visibleStartIndex);
  });

  it('should select highlighted time in dropdown when tab key is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.open = true;

    await task(POPOVER_ANIMATION_DURATION);
    
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
    this.context.inputElement.blur();

    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.component.value).not.toBeNull();
  });

  it('should select matching value in dropdown when opened when startTime is set', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const startTime = '08:00';
    const timeString = '15:00';
    const timeMillis = timeStringToMillis(timeString, true, false);
    this.context.component.value = timeString;
    this.context.component.startTime = startTime;
    this.context.component.open = true;

    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const activeListItem = listItems.find(li => li.selected) as IListItemComponent<ITimePickerOptionValue>;

    expect(activeListItem.value.time).toBe(timeMillis);
  });

  it('should open and close dropdown via open property', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.getPopup()).toBeTruthy();
    expect(this.context.component.open).toBe(true);

    this.context.component.open = false;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.getPopup()).toBeFalsy();
    expect(this.context.component.open).toBe(false);
  });

  it('should not allow time to be selected if exists in restricted times', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const restrictedTimes = ['08:00', '10:00'];
    const firstRestrictedTimeMillis = timeStringToMillis(restrictedTimes[0], true, false);
    this.context.component.restrictedTimes = restrictedTimes;

    expect(this.context.component.restrictedTimes).toEqual(restrictedTimes);

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const restrictedListItem = listItems.find((li: IListItemComponent<ITimePickerOptionValue>) => li.value.time === firstRestrictedTimeMillis) as IListItemComponent;
    const buttonEl = restrictedListItem.querySelector('button') as HTMLButtonElement;

    expect(buttonEl.disabled).toBeTrue();

    this.context.component.value = restrictedTimes[0];

    expect(this.context.component.value).toBeNull();
  });

  it('should not allow startTime to be set if invalid format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.startTime = '95:30';

    expect(this.context.component.startTime).toBeNull();
  });

  it('should not allow min to be set if invalid format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.min = '95:30';

    expect(this.context.component.min).toBeNull();
  });

  it('should not allow max to be set if invalid format', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.max = '95:30';

    expect(this.context.component.max).toBeNull();
  });

  it('should automatically create toggle when Forge text-field component is used as a child', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const textField = document.createElement('forge-text-field');
    textField.appendChild(this.context.inputElement);
    this.context.component.removeChild(this.context.toggleElement);
    this.context.component.appendChild(textField);
    document.body.appendChild(this.context.component);

    await frame();

    const iconButton = this.context.component.querySelector(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
    expect(iconButton).toBeTruthy();
  });

  it('should not use existing toggle element if provided', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const textField = document.createElement('forge-text-field');
    textField.appendChild(this.context.inputElement);
    this.context.component.removeChild(this.context.toggleElement);
    this.context.component.appendChild(textField);

    const button = document.createElement('forge-icon-button');
    button.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
    textField.appendChild(button);

    document.body.appendChild(this.context.component);
    await frame();

    expect(this.context.adapter['_toggleElement']).toBe(button);
  });

  it('should set popup target to internal Forge text-field element when text-field is used as child', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const textField = document.createElement('forge-text-field');
    textField.appendChild(this.context.inputElement);
    this.context.component.removeChild(this.context.toggleElement);
    this.context.component.appendChild(textField);
    document.body.appendChild(this.context.component);

    await frame();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.adapter['_targetElement']).toBe(textField.popoverTargetElement);
  });

  it('should use custom popup target', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const textField = document.createElement('forge-text-field');
    textField.appendChild(this.context.inputElement);
    this.context.component.removeChild(this.context.toggleElement);
    this.context.component.appendChild(textField);
    document.body.appendChild(this.context.component);

    this.context.component.popupTarget = TEXT_FIELD_CONSTANTS.elementName;

    await frame();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.component.popupTarget).toBe(TEXT_FIELD_CONSTANTS.elementName);
    expect(this.context.adapter['_targetElement']).toBe(textField);
  });

  it('should propagate down arrow key to dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    let activeListItemIndex = listItems.findIndex(li => li.active);

    expect(activeListItemIndex).toBe(-1);

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

    activeListItemIndex = listItems.findIndex(li => li.active);
    expect(activeListItemIndex).toBe(this.context.core['_dropdownConfig'].visibleStartIndex);
  });

  it('should propagate up arrow key to dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const originalActiveListItemIndex = listItems.findIndex(li => li.active);

    expect(originalActiveListItemIndex).toBe(-1);

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));

    const activeListItemIndex = listItems.findIndex(li => li.active);
    expect(activeListItemIndex).toBe(this.context.core['_dropdownConfig'].visibleStartIndex);
  });

  it('should propagate home and end key to dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    let activeListItemIndex = listItems.findIndex(li => li.active);
    expect(activeListItemIndex).toBe(listItems.length - 1);
    
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    
    activeListItemIndex = listItems.findIndex(li => li.active);
    expect(activeListItemIndex).toBe(0);
  });

  it('should select active option in dropdown when enter key is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const changeSpy = jasmine.createSpy('change spy');
    this.context.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));      
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

    const selectedListItem = listItems[listItems.length - 1] as IListItemComponent<ITimePickerOptionValue>;
    const selectedTimeString = millisToTimeString(selectedListItem.value.time, true, false);

    expect(changeSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: selectedTimeString }));
    expect(this.context.component.value).toBe(selectedTimeString);
  });

  it('should clear value if shift + delete is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.value = '08:00';
    await frame();

    expect(this.context.inputElement.value).toBeTruthy();
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Delete', shiftKey: true }));

    expect(this.context.inputElement.value).toBe('');
  });

  it('should clear value if shift + backspace is pressed', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.value = '08:00';
    await frame();

    expect(this.context.inputElement.value).toBeTruthy();
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Backspace', shiftKey: true }));

    expect(this.context.inputElement.value).toBe('');
  });

  it('should wait for input element to initialize', async function(this: ITestContext) {
    this.context = _createTimePickerContext(true, false);

    expect(this.context.component['_core']['_isInitialized']).toBe(false);

    await task(100);
    this.context.component.appendChild(this.context.inputElement);
    await frame();

    expect(this.context.component['_core']['_isInitialized']).toBe(true);
  });

  it('should show "now" as the first option in the dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.showNow = true;
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const listItem = listItems[0] as IListItemComponent<ITimePickerOptionValue>;

    expect(listItem.value.time).toBeNull();
    expect(listItem.innerText).toBe('Now');
    expect(listItem.value.metadata).toBe('now');
  });

  it('should show "now" as the only option in the dropdown when showHourOptions is false and showNow is true and customOptions is empty', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.showNow = true;
    this.context.component.showHourOptions = false;
    this.context.component.customOptions = [];
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();
    const firstListItem = listItems[0] as IListItemComponent<ITimePickerOptionValue>;

    expect(listItems.length).toBe(1);
    expect(firstListItem.value.time).toBeNull();
    expect(firstListItem.innerText).toBe('Now');
    expect(firstListItem.value.metadata).toBe('now');
  });

  it('should should not show dropdown when showNow is false and showHourOptions is false and customOptions is empty', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.showNow = false;
    this.context.component.showHourOptions = false;
    this.context.component.customOptions = [];
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.getPopup()).toBeFalsy();
  });

  it('should show custom options', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const customOptions: ITimePickerOption[] = [
      { label: 'Custom 1', value: 100, toMilliseconds: () => 10000000 },
      { label: 'Custom 2', value: 200, toMilliseconds: () => 20000000 }
    ];
    this.context.component.customOptions = customOptions;
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = this.context.getListItems();

    expect(this.context.component.customOptions).toEqual(customOptions);

    const firstListItem = listItems[0] as IListItemComponent<ITimePickerOptionValue>;
    expect(firstListItem.innerText).toBe(customOptions[0].label);
    expect(firstListItem.value.time).toBeNull();
    expect(firstListItem.value.metadata).toBe(customOptions[0].value);
    expect(firstListItem.value.isCustom).toBeTrue();

    const secondListItem = listItems[1] as IListItemComponent<ITimePickerOptionValue>;
    expect(secondListItem.innerText).toBe(customOptions[1].label);
    expect(secondListItem.value.time).toBeNull();
    expect(secondListItem.value.metadata).toBe(customOptions[1].value);
    expect(secondListItem.value.isCustom).toBeTrue();
  });

  it('should call toMilliseconds function when selecting custom options', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const customOptions: ITimePickerOption[] = [
      { label: 'Custom', value: 'custom', toMilliseconds: () => 10000000 }
    ];
    const toMillisSpy = spyOn<any>(customOptions[0], 'toMilliseconds').and.callThrough();
    this.context.component.customOptions = customOptions;
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' })); // Custom options are displayed first
    this.context.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

    expect(toMillisSpy).toHaveBeenCalledOnceWith(customOptions[0].value);
  });

  it('should show options between min and max', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const min = '08:00';
    const max = '15:00';
    this.context.component.min = min;
    this.context.component.max = max;
    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const firstListItemMillis = timeStringToMillis(min, true, false);
    const lastListItemMillis = timeStringToMillis(max, true, false);

    const listItems = this.context.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

    expect(listItems[0].value.time).toBe(firstListItemMillis);
    expect(listItems[listItems.length - 1].value.time).toBe(lastListItemMillis);
  });

  it('should allow invalid input value when allowInvalidTime is true', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.allowInvalidTime = true;
    this.context.component.masked = false;

    const invalidTimeValue = 'xyz';
    this.context.inputElement.value = invalidTimeValue;
    this.context.inputElement.dispatchEvent(new Event('blur'));

    expect(this.context.inputElement.value).toBe(invalidTimeValue);
  });

  it('should use input mask', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.masked = true;

    expect(this.context.component.masked).toBe(true);

    const inputElement = this.context.inputElement;

    inputElement.value = '0101';
    inputElement.dispatchEvent(new KeyboardEvent('input'));

    expect(inputElement.value).toBe('01:01');
  });

  it('should select mask when shown on focus', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const inputElement = this.context.inputElement;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

    expect(this.context.component.masked).toBe(true);
    expect(this.context.component.showMaskFormat).toBe(true);
    inputElement.focus();

    expect(inputElement.selectionStart).toEqual(0);
    expect(inputElement.selectionEnd).toEqual('__:__ __'.length);
  });

  it('should only show default mask format on focus', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const inputElement = this.context.inputElement;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

    expect(this.context.component.masked).toBe(true);
    expect(this.context.component.showMaskFormat).toBe(true);
    expect(inputElement.value).toBe('');
    inputElement.focus();
    expect(inputElement.value).toBe('__:__ __');
  });

  it('should only show 24hour mask format on focus', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const inputElement = this.context.inputElement;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME, '');

    expect(this.context.component.masked).toBe(true);
    expect(this.context.component.showMaskFormat).toBe(true);
    expect(this.context.component.use24HourTime).toBe(true);
    expect(inputElement.value).toBe('');
    inputElement.focus();
    expect(inputElement.value).toBe('__:__');
  });

  it('should only show seconds mask format on focus', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const inputElement = this.context.inputElement;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS, '');

    expect(this.context.component.masked).toBe(true);
    expect(this.context.component.showMaskFormat).toBe(true);
    expect(this.context.component.allowSeconds).toBe(true);
    expect(inputElement.value).toBe('');
    inputElement.focus();
    expect(inputElement.value).toBe('__:__:__ __');
  });

  it('should clear mask format on blur', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    const inputElement = this.context.inputElement;
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
    this.context.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

    expect(this.context.component.masked).toBe(true);
    expect(this.context.component.showMaskFormat).toBe(true);
    expect(inputElement.value).toBe('');
    inputElement.focus();
    expect(inputElement.value).toBe('__:__ __');
    inputElement.dispatchEvent(new KeyboardEvent('input'));
    inputElement.blur();

    expect(inputElement.value).toBeFalsy();
  });

  it('should use custom callbacks to control values', async function(this: ITestContext) {
    this.context = _createTimePickerContext(); 

    const timeString = 'custom';
    const timeValue = 10000000;
    const expectedTimeString = millisToTimeString(timeValue, true, false);
    const validateCbSpy = jasmine.createSpy('validation cb', time => true).and.callThrough();
    const parseCbSpy = jasmine.createSpy('parse cb', time => timeValue).and.callThrough();
    const formatCbSpy = jasmine.createSpy('format cb', value => timeString).and.callThrough();

    this.context.component.masked = false;
    this.context.component.validationCallback = validateCbSpy;
    this.context.component.parseCallback = parseCbSpy;
    this.context.component.formatCallback = formatCbSpy;

    this.context.component.value = '08:00';

    await frame();

    expect(this.context.component.masked).toBeFalse();
    expect(validateCbSpy).toHaveBeenCalled();
    expect(parseCbSpy).toHaveBeenCalledTimes(1);
    expect(formatCbSpy).toHaveBeenCalledTimes(1);
    expect(this.context.component.value).toBe(expectedTimeString!);
    expect(this.context.inputElement.value).toBe(timeString);
  });

  it('should not open dropdown when focused and allowInput false', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.allowInput = false;
    this.context.inputElement.focus();

    expect(this.context.component.open).toBeFalse();
  });

  it('should open dropdown when focused via mouse and allowInput false', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.allowInput = false;
    this.context.inputElement.dispatchEvent(new MouseEvent('mousedown'));
    await frame();

    expect(this.context.component.open).toBeTrue();
  });

  it('should not open dropdown if disabled', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.disabled = true;
    this.context.toggleElement.dispatchEvent(new MouseEvent('mousedown'));
    
    expect(this.context.getPopup()).toBeFalsy();
    expect(this.context.component.open).toBeFalse();
  });

  it('should toggle disabled', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.disabled = true;
    await frame();

    expect(this.context.component.disabled).toBeTrue();
    expect(this.context.inputElement.disabled).toBeTrue();

    this.context.component.disabled = false;
    await frame();

    expect(this.context.component.disabled).toBeFalse();
    expect(this.context.inputElement.disabled).toBeFalse();
  });

  it('should close dropdown when toggling allow dropdown', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await frame();

    this.context.component.allowDropdown = false;
    await frame();

    expect(this.context.component.open).toBeFalse();
  });

  it('should close dropdown when typing into input if open', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.masked = false;
    this.context.component.open = true;
    await frame();
    
    this.context.inputElement.value = '1';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    
    expect(this.context.component.open).toBeFalse();
    expect(this.context.getPopup()).toBeFalsy();
  });

  it('should mask input value', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '1111';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste' }));
    this.context.inputElement.dispatchEvent(new Event('blur'));

    expect(this.context.inputElement.value).toBe('11:11 AM');
  });

  it('should mask input value when valid format is entered in 12 hour time', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '01:30';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    this.context.inputElement.dispatchEvent(new Event('blur'));

    expect(this.context.inputElement.value).toBe('01:30 AM');
  });

  it('should mask input value when large number entered', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '9';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();

    expect(this.context.inputElement.value).toBe('09:');
  });

  it('should toggle mask off then on', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.masked = false;
    await frame();

    this.context.inputElement.value = '9';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();
    
    expect(this.context.inputElement.value).toBe('9');
    this.context.inputElement.value = '';
    
    this.context.component.masked = true;
    this.context.inputElement.value = '9';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();

    expect(this.context.inputElement.value).toBe('09:');
  });

  it('should remove seconds from time value when allowSeconds is set to false', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const timeValueWithSeconds = '08:45:25';
    const timeValueWithoutSeconds = '08:45';

    this.context.component.allowSeconds = true;
    this.context.component.value = timeValueWithSeconds;
    this.context.component.allowSeconds = false;

    expect(this.context.component.value).toBe(timeValueWithoutSeconds);
  });

  it('should set seconds when time is set by default', async function(this: ITestContext) {
    this.context = _createTimePickerContext(false);

    const timeValueWithSeconds = '14:45:25';
    const timeInputValue = '02:45:25 PM';

    this.context.component.allowSeconds = true;
    this.context.component.value = timeValueWithSeconds;
    document.body.appendChild(this.context.component);
    await frame();

    expect(this.context.component.value).toBe(timeValueWithSeconds);
    expect(this.context.inputElement.value).toBe(timeInputValue);
  });

  it('should call custom coercion callback when masked', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const coercionSpy = jasmine.createSpy('coercionCallback', (val, coercedStr, allowSeconds) => coercedStr).and.callThrough();
    this.context.component.coercionCallback = coercionSpy;

    const value = '120';
    this.context.inputElement.value = value;
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste' }));

    expect(coercionSpy).toHaveBeenCalledOnceWith('12:0', '12:00', false);
  });

  it('should call custom coercion callback when unmasked', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.masked = false;

    const coercionSpy = jasmine.createSpy('coercionCallback', (_val, coercedStr, _allowSeconds) => coercedStr).and.callThrough();
    this.context.component.coercionCallback = coercionSpy;

    const value = '120';
    this.context.inputElement.value = value;
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

    expect(coercionSpy).toHaveBeenCalledOnceWith('120', '01:20', false);
  });

  it('should use custom coercion callback value', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    const expectedValue = '12:00 PM';
    const coercionSpy = jasmine.createSpy('coercionCallback', (val, coercedStr, allowSeconds) => expectedValue).and.callThrough();
    this.context.component.coercionCallback = coercionSpy;

    const value = '120';
    this.context.inputElement.focus();
    this.context.inputElement.value = value;
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();

    expect(this.context.component.value).toBe('12:00');

    this.context.inputElement.dispatchEvent(new Event('blur'));
    await frame();

    expect(this.context.inputElement.value).toBe(expectedValue);
  });

  it('should merge date with time via utility', function(this: ITestContext) {
    const date = new Date('01/01/2020');
    const time = '04:00 PM';
    const expected = new Date('2020-01-01 16:00');

    const merged = mergeDateWithTime(date, time);

    expect(merged).toEqual(expected);
  });

  it('should merge date with time with seconds via utility', function(this: ITestContext) {
    const date = new Date('01/01/2020');
    const time = '08:30:45 AM';
    const expected = new Date('2020-01-01 8:30:45');

    const merged = mergeDateWithTime(date, time, true);

    expect(merged).toEqual(expected);
  });

  it('should pad leading zero when entering hour of 1', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '1';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

    expect(this.context.component.value).toBe('01:00');
    expect(this.context.inputElement.value).toBe('01:');
  });

  it('should pad leading zero when entering hour of 2', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '2';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

    expect(this.context.component.value).toBe('02:00');
    expect(this.context.inputElement.value).toBe('02:');
  });

  it('should pad leading zero when entering initial hour of 3 or higher', function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.inputElement.value = '3';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

    expect(this.context.component.value).toBe('03:00');
    expect(this.context.inputElement.value).toBe('03:');
  });

  it('should coerce special case 3-digit shorthand values when unmasked', function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.masked = false;

    this.context.inputElement.value = '123';
    this.context.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

    expect(this.context.component.value).toBe('01:23');
  });

  it('should overwrite hours if 1 is entered', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    await this.context.writeValue('1', 0);
    await this.context.writeValue('2', 2);

    expect(this.context.component.value).toBe('12:00');
  });

  it('should overwrite hours if entered with format visible', async function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.showMaskFormat = true;

    await this.context.writeValue('1', 0);
    expect(this.context.component.value).toBe('01:00');

    await this.context.writeValue('2', 2);
    expect(this.context.component.value).toBe('12:00');
  });

  it('should not overwrite hours if > 2 is entered', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    await this.context.writeValue('1', 0);
    await this.context.writeValue('3', 2, true);

    expect(this.context.component.value).toBe('01:03');
  });

  it('should overwrite hours if <= 2 is entered in 24 hour time', async function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.use24HourTime = true;

    await this.context.writeValue('2', 0);
    await this.context.writeValue('1', 2);

    expect(this.context.component.value).toBe('21:00');
  });

  it('should not overwrite hours if > 2 is entered in 24 hour time', async function(this: ITestContext) {
    this.context = _createTimePickerContext();
    this.context.component.use24HourTime = true;

    await this.context.writeValue('3', 0);
    await this.context.writeValue('1', 2, true);

    expect(this.context.component.value).toBe('03:01');
  });

  it('should remove popover when removed from DOM while open', async function(this: ITestContext) {
    this.context = _createTimePickerContext();

    this.context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    expect(this.context.getPopup()).toBeTruthy();

    this.context.component.remove();

    expect(this.context.getPopup()).toBeFalsy();
  });

  function _createTimePickerContext(append = true, hasInput = true): ITimePickerTestContext {
    const component = document.createElement('forge-time-picker');
	  const inputElement = document.createElement('input');
    if (hasInput) {
      component.appendChild(inputElement);
    }

    const toggleElement = document.createElement('button');
    toggleElement.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
    component.appendChild(toggleElement);
    if (append) {
      document.body.appendChild(component);
    }
    const core = component['_core'];
    const identifier = `forge-time-picker-${core['_identifier']}`;
    const getPopup = () => document.querySelector(`[id=list-dropdown-popup-${identifier}]`) as IPopoverComponent;

    return {
      component,
      core,
      adapter: component['_core']['_adapter'],
      inputElement,
      toggleElement,
      identifier,
      getPopup,
      getListItems: () => {
        const popup = getPopup();
        return Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName));
      },
      writeValue: async (key: string, pos: number, replace = false) => {
        await setCursorPos(inputElement, pos);
        const value = setCharAtPos(inputElement.value, key, pos, replace);
        await setInputValue(inputElement, value);
        await setCursorPos(inputElement, pos);
      }
    };
  }

  async function setInputValue(inputElement: HTMLInputElement, value: string): Promise<void> {
    inputElement.value = value;
    inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();
  }

  async function setCursorPos(inputElement: HTMLInputElement, pos: number): Promise<void> {
    inputElement.focus();
    inputElement.setSelectionRange(pos, pos);
    await frame();
  }

  function setCharAtPos(str: string, char: string, pos: number, replace: boolean) {
    const startAdj = replace || pos === 0 ? 0 : 1;
    const endAdj = pos === 0 ? 1 : 0;
    return [str.slice(0, pos - startAdj), char, str.slice(pos + endAdj)].join('');
  }
});
