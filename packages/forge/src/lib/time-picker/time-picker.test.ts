import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list/index.js';
import { IPopoverComponent } from '../popover/index.js';
import { frame, task } from '../core/utils/utils.js';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../icon-button/index.js';
import { ITextFieldComponent, TEXT_FIELD_CONSTANTS } from '../text-field/index.js';
import { TestHarness } from '../core/testing/test-harness.js';
import {
  getCurrentTimeOfDayMillis,
  hoursToMillis,
  ITimePickerComponent,
  ITimePickerOption,
  ITimePickerOptionValue,
  mergeDateWithTime,
  millisToTimeString,
  timeStringToMillis,
  TIME_PICKER_CONSTANTS
} from './index.js';

import './time-picker.js';

const POPOVER_ANIMATION_DURATION = 200;

class TimePickerHarness extends TestHarness<ITimePickerComponent> {
  public inputElement: HTMLInputElement;
  public toggleElement: HTMLButtonElement;

  public initElementRefs(): void {
    this.inputElement = this.element.querySelector('input') as HTMLInputElement;
    this.toggleElement = this.element.querySelector('button') as HTMLButtonElement;
  }

  public get identifier(): string {
    return `forge-time-picker-${(this.element as any)._core._identifier}`;
  }

  public getPopup(): IPopoverComponent | null {
    return document.querySelector(`[id=list-dropdown-popup-${this.identifier}]`) as IPopoverComponent;
  }

  public getListItems(): IListItemComponent[] {
    const popup = this.getPopup();
    return popup ? Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) : [];
  }

  public async writeValue(char: string, pos: number, clear = false): Promise<void> {
    await this.setCursorPos(pos);
    const value = this._setCharAtPos(this.inputElement.value, char, pos, clear);
    await this.setInputValue(value);
    await this.setCursorPos(pos);
  }

  public async setInputValue(value: string): Promise<void> {
    this.inputElement.value = value;
    this.inputElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
    await frame();
  }

  public async setCursorPos(pos: number): Promise<void> {
    this.inputElement.focus();
    this.inputElement.setSelectionRange(pos, pos);
    await frame();
  }

  private _setCharAtPos(str: string, char: string, pos: number, replace: boolean): string {
    const startAdj = replace || pos === 0 ? 0 : 1;
    const endAdj = pos === 0 ? 1 : 0;
    return [str.slice(0, pos - startAdj), char, str.slice(pos + endAdj)].join('');
  }

  public async openDropdown(): Promise<void> {
    this.element.open = true;
    await task(POPOVER_ANIMATION_DURATION);
  }

  public async closeDropdown(): Promise<void> {
    this.element.open = false;
    await task(POPOVER_ANIMATION_DURATION);
  }

  public dispatchKeydown(code: string, options: Partial<KeyboardEventInit> = {}): void {
    this.inputElement.dispatchEvent(new KeyboardEvent('keydown', { code, ...options }));
  }

  public dispatchInput(inputType = 'insertText'): void {
    this.inputElement.dispatchEvent(new InputEvent('input', { inputType }));
  }

  public dispatchBlur(): void {
    this.inputElement.dispatchEvent(new Event('blur'));
  }

  public clickToggle(): void {
    this.toggleElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  }

  public cleanup(): void {
    const popup = this.getPopup();
    popup?.remove();
    this.element.remove();
  }
}

interface TimePickerFixtureConfig {
  withTextField?: boolean;
  withoutToggle?: boolean;
  detached?: boolean;
}

async function createFixture(config: TimePickerFixtureConfig = {}): Promise<TimePickerHarness> {
  if (config.detached) {
    const component = document.createElement('forge-time-picker') as ITimePickerComponent;
    const inputElement = document.createElement('input');
    const toggleElement = document.createElement('button');

    toggleElement.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
    component.appendChild(inputElement);
    component.appendChild(toggleElement);

    const harness = new TimePickerHarness(component);
    harness.inputElement = inputElement;
    harness.toggleElement = toggleElement;
    return harness;
  }

  if (config.withTextField) {
    const screenTextField = render(html`
      <forge-time-picker>
        <forge-text-field>
          <input type="text" />
        </forge-text-field>
      </forge-time-picker>
    `);
    const timePickerEl = screenTextField.container.querySelector('forge-time-picker') as ITimePickerComponent;
    return new TimePickerHarness(timePickerEl);
  }

  if (config.withoutToggle) {
    const screenNoToggle = render(html`
      <forge-time-picker>
        <input type="text" />
      </forge-time-picker>
    `);
    const timePickerEl = screenNoToggle.container.querySelector('forge-time-picker') as ITimePickerComponent;
    return new TimePickerHarness(timePickerEl);
  }

  const screen = render(html`
    <forge-time-picker>
      <input type="text" />
      <button forge-time-picker-toggle></button>
    </forge-time-picker>
  `);
  const el = screen.container.querySelector('forge-time-picker') as ITimePickerComponent;
  return new TimePickerHarness(el);
}

async function createDetachedWithoutInput(): Promise<TimePickerHarness> {
  const component = document.createElement('forge-time-picker') as ITimePickerComponent;
  const inputElement = document.createElement('input');
  const toggleElement = document.createElement('button');

  toggleElement.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
  component.appendChild(toggleElement);
  document.body.appendChild(component);

  const harness = new TimePickerHarness(component);
  harness.inputElement = inputElement;
  harness.toggleElement = toggleElement;
  return harness;
}

describe('TimePickerComponent', () => {
  let harness: TimePickerHarness;

  afterEach(() => {
    harness?.cleanup();
  });

  describe('Initialization', () => {
    it('should instantiate component instance with shadow root', async () => {
      harness = await createFixture();
      expect(harness.element.shadowRoot).not.toBeNull();
    });

    it('should have default value of null', async () => {
      harness = await createFixture();
      expect(harness.element.value).toBeNull();
    });

    it('should wait for input element to initialize', async () => {
      harness = await createDetachedWithoutInput();

      expect((harness.element as any)._core._isInitialized).toBe(false);

      await task(100);
      harness.element.appendChild(harness.inputElement);
      await frame();

      expect((harness.element as any)._core._isInitialized).toBe(true);
    });
  });

  describe('Value Setting', () => {
    it('should set value in default 12 hour format', async () => {
      harness = await createFixture();

      const expectedTimeValue = '15:00';
      const expectedTimeString = '03:00 PM';
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set value in 24 hour format', async () => {
      harness = await createFixture();

      const expectedTimeValue = '15:00';
      const expectedTimeString = '15:00';
      harness.element.use24HourTime = true;
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should toggle existing value between 12 and 24 hour formats', async () => {
      harness = await createFixture();

      const expectedTimeValue = '15:30';
      const expected12hourTimeString = '03:30 PM';
      harness.element.value = expectedTimeValue;

      expect(harness.inputElement.value).toBe(expected12hourTimeString);

      const expected24HourTimeString = '15:30';
      harness.element.use24HourTime = true;

      expect(harness.inputElement.value).toBe(expected24HourTimeString);

      harness.element.use24HourTime = false;
      expect(harness.inputElement.value).toBe(expected12hourTimeString);
    });

    it('should set value to null if invalid time is provided', async () => {
      harness = await createFixture();

      const expectedTimeValue = '96:12';
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe('');
    });

    it('should set default value in 12 hour mode', async () => {
      harness = await createFixture({ detached: true });

      const expectedTimeValue = '00:30';
      const expectedTimeString = '12:30 AM';
      harness.element.value = expectedTimeValue;
      document.body.appendChild(harness.element);
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set default value in 24 hour mode', async () => {
      harness = await createFixture({ detached: true });

      const expectedTimeValue = '00:30';
      harness.element.value = expectedTimeValue;
      harness.element.use24HourTime = true;
      document.body.appendChild(harness.element);
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeValue);
    });

    it('should set default value in 12 hour mode with seconds', async () => {
      harness = await createFixture({ detached: true });

      const expectedTimeValue = '23:30:55';
      const expectedTimeString = '11:30:55 PM';
      harness.element.value = expectedTimeValue;
      harness.element.allowSeconds = true;
      document.body.appendChild(harness.element);
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set default value in 24 hour mode with seconds', async () => {
      harness = await createFixture({ detached: true });

      const expectedTimeValue = '23:30:55';
      harness.element.value = expectedTimeValue;
      harness.element.use24HourTime = true;
      harness.element.allowSeconds = true;
      document.body.appendChild(harness.element);
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeValue);
    });
  });

  describe('Seconds Support', () => {
    it('should set value in 12 hour format with seconds', async () => {
      harness = await createFixture();

      const expectedTimeValue = '14:45:15';
      const expectedTimeString = '02:45:15 PM';
      harness.element.allowSeconds = true;
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set value in 24 hour format with seconds', async () => {
      harness = await createFixture();

      const expectedTimeValue = '14:45:15';
      harness.element.use24HourTime = true;
      harness.element.allowSeconds = true;
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeValue);
    });

    it("should remove seconds in 12 hour time if value is set with seconds but aren't allowed", async () => {
      harness = await createFixture();

      const timeValue = '14:45:15';
      const expectedTimeValue = '14:45';
      const expectedTimeString = '02:45 PM';
      harness.element.value = timeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should remove seconds from time value when allowSeconds is set to false', async () => {
      harness = await createFixture();

      const timeValueWithSeconds = '08:45:25';
      const timeValueWithoutSeconds = '08:45';

      harness.element.allowSeconds = true;
      harness.element.value = timeValueWithSeconds;
      harness.element.allowSeconds = false;

      expect(harness.element.value).toBe(timeValueWithoutSeconds);
    });

    it('should set seconds when time is set by default', async () => {
      harness = await createFixture({ detached: true });

      const timeValueWithSeconds = '14:45:25';
      const timeInputValue = '02:45:25 PM';

      harness.element.allowSeconds = true;
      harness.element.value = timeValueWithSeconds;
      document.body.appendChild(harness.element);
      await frame();

      expect(harness.element.value).toBe(timeValueWithSeconds);
      expect(harness.inputElement.value).toBe(timeInputValue);
    });
  });

  describe('Disabled State', () => {
    it('should set disabled', async () => {
      harness = await createFixture();

      expect(harness.element.disabled).toBe(false);
      expect(harness.inputElement.disabled).toBe(false);
      expect(harness.toggleElement.disabled).toBe(false);
      expect(harness.toggleElement.tabIndex).toBe(-1);

      harness.element.disabled = true;
      await frame();

      expect(harness.element.disabled).toBe(true);
      expect(harness.inputElement.disabled).toBe(true);
      expect(harness.toggleElement.disabled).toBe(true);
      expect(harness.toggleElement.tabIndex).toBe(-1);
    });

    it('should enable field after being disabled by default', async () => {
      harness = await createFixture({ detached: true });

      harness.element.disabled = true;
      document.body.appendChild(harness.element);
      await frame();

      harness.element.disabled = false;
      await frame();

      expect(harness.element.disabled).toBe(false);
      expect(harness.inputElement.disabled).toBe(false);
      expect(harness.toggleElement.disabled).toBe(false);
    });

    it('should toggle disabled', async () => {
      harness = await createFixture();

      harness.element.disabled = true;
      await frame();

      expect(harness.element.disabled).toBe(true);
      expect(harness.inputElement.disabled).toBe(true);

      harness.element.disabled = false;
      await frame();

      expect(harness.element.disabled).toBe(false);
      expect(harness.inputElement.disabled).toBe(false);
      expect(harness.toggleElement.tabIndex).toBe(-1);
    });

    it('should not open dropdown if disabled', async () => {
      harness = await createFixture();

      harness.element.disabled = true;
      harness.clickToggle();

      expect(harness.getPopup()).toBeNull();
      expect(harness.element.open).toBe(false);
    });
  });

  describe('Min/Max Validation', () => {
    it('should not set value if below min', async () => {
      harness = await createFixture();

      harness.element.min = '08:00';
      harness.element.value = '06:00';

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe('');
    });

    it('should remove value if setting min and value is below min', async () => {
      harness = await createFixture();

      const changeEventSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '06:00';
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);

      harness.element.min = '08:00';

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe('');
      expect(changeEventSpy).toHaveBeenCalledOnce();
      expect(changeEventSpy.mock.calls[0][0].detail).toBeNull();
    });

    it('should not set value if above max', async () => {
      harness = await createFixture();

      harness.element.max = '15:00';
      harness.element.value = '17:00';

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe('');
    });

    it('should not allow min to be set if invalid format', async () => {
      harness = await createFixture();

      harness.element.min = '95:30';

      expect(harness.element.min).toBeNull();
    });

    it('should not allow max to be set if invalid format', async () => {
      harness = await createFixture();

      harness.element.max = '95:30';

      expect(harness.element.max).toBeNull();
    });
  });

  describe('Input Masking', () => {
    it('should retain value when toggling input mask', async () => {
      harness = await createFixture();

      const expectedTimeValue = '20:07';
      const expectedTimeString = '08:07 PM';
      harness.element.value = expectedTimeValue;

      await frame();
      harness.element.masked = false;
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should use input mask', async () => {
      harness = await createFixture();
      harness.element.masked = true;

      expect(harness.element.masked).toBe(true);

      harness.inputElement.value = '0101';
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(harness.inputElement.value).toBe('01:01');
    });

    it('should set value through input element when unmasked', async () => {
      harness = await createFixture();
      harness.element.masked = false;

      const timeValue = '1111';
      harness.inputElement.value = timeValue;

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe(timeValue);

      harness.dispatchInput();
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.element.value).toBe('11:11');
      expect(harness.inputElement.value).toBe('11:11 AM');
    });

    it('should select mask when shown on focus', async () => {
      harness = await createFixture();

      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.element.masked).toBe(true);
      expect(harness.element.showMaskFormat).toBe(true);
      harness.inputElement.focus();

      expect(harness.inputElement.selectionStart).toBe(0);
      expect(harness.inputElement.selectionEnd).toBe('__:__ __'.length);
    });

    it('should only show default mask format on focus', async () => {
      harness = await createFixture();

      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.element.masked).toBe(true);
      expect(harness.element.showMaskFormat).toBe(true);
      expect(harness.inputElement.value).toBe('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).toBe('__:__ __');
    });

    it('should clear mask format on blur', async () => {
      harness = await createFixture();

      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.element.masked).toBe(true);
      expect(harness.element.showMaskFormat).toBe(true);
      expect(harness.inputElement.value).toBe('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).toBe('__:__ __');
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));
      harness.inputElement.blur();

      expect(harness.inputElement.value).toBe('');
    });

    it('should mask input value', async () => {
      harness = await createFixture();

      harness.inputElement.value = '1111';
      harness.dispatchInput('insertFromPaste');
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).toBe('11:11 AM');
    });

    it('should mask input value when valid format is entered in 12 hour time', async () => {
      harness = await createFixture();

      harness.inputElement.value = '01:30';
      harness.dispatchInput();
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).toBe('01:30 AM');
    });

    it('should only show 24 hour mask format on focus', async () => {
      harness = await createFixture();

      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME, '');

      expect(harness.element.masked).toBe(true);
      expect(harness.element.showMaskFormat).toBe(true);
      expect(harness.element.use24HourTime).toBe(true);
      expect(harness.inputElement.value).toBe('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).toBe('__:__');
    });

    it('should only show seconds mask format on focus', async () => {
      harness = await createFixture();

      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS, '');

      expect(harness.element.masked).toBe(true);
      expect(harness.element.showMaskFormat).toBe(true);
      expect(harness.element.allowSeconds).toBe(true);
      expect(harness.inputElement.value).toBe('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).toBe('__:__:__ __');
    });
  });

  describe('Additional Min/Max Tests', () => {
    it('should remove value if setting max and value is above max', async () => {
      harness = await createFixture();

      const changeEventSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '17:00';
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);

      harness.element.max = '12:00';

      expect(harness.element.value).toBeNull();
      expect(harness.inputElement.value).toBe('');
      expect(changeEventSpy).toHaveBeenCalledOnce();
      expect(changeEventSpy.mock.calls[0][0].detail).toBeNull();
    });

    it('should not allow startTime to be set if invalid format', async () => {
      harness = await createFixture();

      harness.element.startTime = '95:30';

      expect(harness.element.startTime).toBeNull();
    });
  });

  describe('Change Events', () => {
    it('should not emit change event when setting value via input element property', async () => {
      harness = await createFixture();

      const changeEventSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      harness.inputElement.value = '08:00';

      expect(changeEventSpy).not.toHaveBeenCalled();
    });

    it('should emit change event when valid time string is entered', async () => {
      harness = await createFixture();

      const changeEventSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '08:00';
      (harness.element as any)._core._handleInput(expectedTimeValue);

      expect(changeEventSpy).toHaveBeenCalledOnce();
      expect(changeEventSpy.mock.calls[0][0].detail).toBe(expectedTimeValue);
    });

    it('should not emit change event when invalid time string is entered', async () => {
      harness = await createFixture();

      const changeEventSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      (harness.element as any)._core._handleInput('asdf');

      expect(changeEventSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch change event if selecting time that is already set', async () => {
      harness = await createFixture();

      const changeSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
      const timeString = millisToTimeString(value.time, true, false) ?? '';
      harness.element.value = timeString;

      (harness.element as any)._core._onSelect(value);

      expect(harness.element.value).toBe(timeString);
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not set time value if change event is cancelled', async () => {
      harness = await createFixture();

      const changeSpy = vi.fn((evt: CustomEvent<string>) => evt.preventDefault());
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
      const timeString = millisToTimeString(value.time, true, false) ?? '';

      (harness.element as any)._core._onSelect(value);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toBe(timeString);
      expect(harness.inputElement.value).toBe('');
      expect(harness.element.value).not.toBe(timeString);
    });
  });

  describe('Additional Attribute Tests', () => {
    it('should set value via attribute', async () => {
      harness = await createFixture();

      const expectedTimeValue = '14:30';
      const expectedTimeString = '02:30 PM';
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.VALUE, expectedTimeValue);

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set masked via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, 'false');
      expect(harness.element.masked).toBe(false);
    });

    it('should set showMaskFormat via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, 'true');
      expect(harness.element.showMaskFormat).toBe(true);
    });

    it('should set allowInvalidTime via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME, 'true');
      expect(harness.element.allowInvalidTime).toBe(true);
    });

    it('should set showNow via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_NOW, '');
      expect(harness.element.showNow).toBe(true);
    });

    it('should set showHourOptions via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_HOUR_OPTIONS, 'false');
      expect(harness.element.showHourOptions).toBe(false);
    });

    it('should set min via attribute', async () => {
      harness = await createFixture();
      const expectedTimeValue = '19:32';
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MIN, expectedTimeValue);
      expect(harness.element.min).toBe(expectedTimeValue);
    });

    it('should set max via attribute', async () => {
      harness = await createFixture();
      const expectedTimeValue = '03:15';
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.MAX, expectedTimeValue);
      expect(harness.element.max).toBe(expectedTimeValue);
    });

    it('should set startTime via attribute', async () => {
      harness = await createFixture();
      const expectedTimeValue = '08:00';
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.START_TIME, expectedTimeValue);
      expect(harness.element.startTime).toBe(expectedTimeValue);
    });

    it('should set popupClasses via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.POPUP_CLASSES, 'test');
      expect(harness.element.popupClasses).toEqual(['test']);
    });

    it('should set allowDropdown via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_DROPDOWN, 'false');
      expect(harness.element.allowDropdown).toBe(false);
    });

    it('should set step via attribute', async () => {
      harness = await createFixture();
      const expectedMinutes = 15;
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.STEP, `${expectedMinutes}`);
      expect(harness.element.step).toBe(expectedMinutes);
    });

    it('should set allowInput via attribute', async () => {
      harness = await createFixture();
      harness.element.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INPUT, 'false');
      expect(harness.element.allowInput).toBe(false);
    });
  });

  describe('Additional Validation Tests', () => {
    it('should set value without mask applied in 12 hour format', async () => {
      harness = await createFixture();

      const expectedTimeValue = '23:59';
      const expectedTimeString = '11:59 PM';
      harness.element.masked = false;
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeString);
    });

    it('should set value without mask applied in 24 hour format', async () => {
      harness = await createFixture();

      const expectedTimeValue = '23:59';
      harness.element.masked = false;
      harness.element.use24HourTime = true;
      harness.element.value = expectedTimeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeValue);
    });

    it("should remove seconds in 24 hour time if value is set with seconds but aren't allowed", async () => {
      harness = await createFixture();

      const timeValue = '14:45:15';
      const expectedTimeValue = '14:45';
      harness.element.use24HourTime = true;
      harness.element.value = timeValue;

      expect(harness.element.value).toBe(expectedTimeValue);
      expect(harness.inputElement.value).toBe(expectedTimeValue);
    });

    it('should use input mask', async () => {
      harness = await createFixture();
      harness.element.masked = true;

      expect(harness.element.masked).toBe(true);

      harness.inputElement.value = '0101';
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(harness.inputElement.value).toBe('01:01');
    });

    it('should mask input value when large number entered', async () => {
      harness = await createFixture();

      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).toBe('09:');
    });

    it('should toggle mask off then on', async () => {
      harness = await createFixture();

      harness.element.masked = false;
      await frame();

      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).toBe('9');
      harness.inputElement.value = '';

      harness.element.masked = true;
      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).toBe('09:');
    });

    it('should allow invalid input value when allowInvalidTime is true', async () => {
      harness = await createFixture();

      harness.element.allowInvalidTime = true;
      harness.element.masked = false;

      const invalidTimeValue = 'xyz';
      harness.inputElement.value = invalidTimeValue;
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).toBe(invalidTimeValue);
    });

    it('should pad leading zero when entering hour of 1', async () => {
      harness = await createFixture();

      harness.inputElement.value = '1';
      harness.dispatchInput();

      expect(harness.element.value).toBe('01:00');
      expect(harness.inputElement.value).toBe('01:');
    });

    it('should pad leading zero when entering hour of 2', async () => {
      harness = await createFixture();

      harness.inputElement.value = '2';
      harness.dispatchInput();

      expect(harness.element.value).toBe('02:00');
      expect(harness.inputElement.value).toBe('02:');
    });

    it('should pad leading zero when entering initial hour of 3 or higher', async () => {
      harness = await createFixture();

      harness.inputElement.value = '3';
      harness.dispatchInput();

      expect(harness.element.value).toBe('03:00');
      expect(harness.inputElement.value).toBe('03:');
    });
  });

  describe('Keyboard Interaction', () => {
    it('should set time to current time when "n" key is pressed', async () => {
      harness = await createFixture();

      const millis = getCurrentTimeOfDayMillis(false);
      const expectedTimeValue = millisToTimeString(millis, true, false) ?? '';

      harness.dispatchKeydown('KeyN');
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
    });

    it('should set time to current time when "n" key is pressed with seconds', async () => {
      harness = await createFixture();

      const millis = getCurrentTimeOfDayMillis(true);
      const expectedTimeValue = millisToTimeString(millis, true, true) ?? '';
      harness.element.allowSeconds = true;

      harness.dispatchKeydown('KeyN');
      await frame();

      expect(harness.element.value).toBe(expectedTimeValue);
    });

    it('should clear value if shift + delete is pressed', async () => {
      harness = await createFixture();

      harness.element.value = '08:00';
      await frame();

      expect(harness.inputElement.value).not.toBe('');
      harness.dispatchKeydown('Delete', { shiftKey: true });
      await frame();

      expect(harness.inputElement.value).toBe('');
    });

    it('should clear value if shift + backspace is pressed', async () => {
      harness = await createFixture();

      harness.element.value = '08:00';
      await frame();

      expect(harness.inputElement.value).not.toBe('');
      harness.dispatchKeydown('Backspace', { shiftKey: true });
      await frame();

      expect(harness.inputElement.value).toBe('');
    });

    it('should not open dropdown when focused and allowInput false', async () => {
      harness = await createFixture();

      harness.element.allowInput = false;
      harness.inputElement.focus();
      await frame();

      expect(harness.element.open).toBe(false);
    });

    it('should open dropdown when focused via mouse and allowInput false', async () => {
      harness = await createFixture();

      harness.element.allowInput = false;
      harness.inputElement.dispatchEvent(new MouseEvent('mousedown'));
      await frame();

      expect(harness.element.open).toBe(true);
    });
  });

  describe('Dropdown Interaction', () => {
    it('should open dropdown when toggle is clicked', async () => {
      harness = await createFixture();

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).not.toBeNull();
    });

    it('should close dropdown when toggle is clicked', async () => {
      harness = await createFixture();

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.getPopup()).not.toBeNull();

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).toBeNull();
    });

    it('should open dropdown when down arrow key is pressed', async () => {
      harness = await createFixture();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).not.toBeNull();
    });

    it('should close dropdown when escape key is pressed', async () => {
      harness = await createFixture();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.getPopup()).not.toBeNull();

      harness.dispatchKeydown('Escape');
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).toBeNull();
    });

    it('should select matching time in dropdown', async () => {
      harness = await createFixture();

      const timeString = '08:00';
      const timeMillis = timeStringToMillis(timeString, true, false);
      harness.element.value = timeString;
      harness.element.open = true;

      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const matchingListItem = listItems.find(li => li.selected);

      expect(matchingListItem).toBeTruthy();
      expect(matchingListItem?.value.time).toBe(timeMillis);
    });

    it('should highlight option in dropdown when opened via arrow down key', async () => {
      harness = await createFixture();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const activeListItemIndex = listItems.findIndex(li => li.active);

      expect(activeListItemIndex).toBe((harness.element as any)._core._dropdownConfig.visibleStartIndex);
    });

    it('should select highlighted time in dropdown when tab key is pressed', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      harness.dispatchKeydown('ArrowDown');
      harness.dispatchKeydown('Tab');
      harness.inputElement.blur();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.element.value).not.toBeNull();
    });

    it('should select matching value in dropdown when opened when startTime is set', async () => {
      harness = await createFixture();

      const startTime = '08:00';
      const timeString = '15:00';
      const timeMillis = timeStringToMillis(timeString, true, false);
      harness.element.value = timeString;
      harness.element.startTime = startTime;
      harness.element.open = true;

      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const activeListItem = listItems.find(li => li.selected);

      expect(activeListItem).toBeTruthy();
      expect(activeListItem?.value.time).toBe(timeMillis);
    });

    it('should open and close dropdown via open property', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).not.toBeNull();
      expect(harness.element.open).toBe(true);

      harness.element.open = false;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).toBeNull();
      expect(harness.element.open).toBe(false);
    });

    it('should close dropdown when toggling allow dropdown', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await frame();

      harness.element.allowDropdown = false;
      await frame();

      expect(harness.element.open).toBe(false);
    });

    it('should close dropdown when typing into input if open', async () => {
      harness = await createFixture();

      harness.element.masked = false;
      harness.element.open = true;
      await frame();

      harness.inputElement.value = '1';
      harness.dispatchInput();
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.element.open).toBe(false);
      expect(harness.getPopup()).toBeNull();
    });

    it('should remove popover when removed from DOM while open', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).not.toBeNull();

      harness.element.remove();

      expect(harness.getPopup()).toBeNull();
    });

    it('should display seconds in dropdown options when allowSeconds is true', async () => {
      harness = await createFixture();

      harness.element.allowSeconds = true;
      await frame();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const firstLabel = listItems[0].innerText.trim();

      expect(firstLabel).toMatch(/\d{2}:\d{2}:\d{2}\s?(AM|PM)/);
    });

    it('should display seconds in dropdown options when allowSeconds is true in 24 hour mode', async () => {
      harness = await createFixture();

      harness.element.allowSeconds = true;
      harness.element.use24HourTime = true;
      await frame();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const firstLabel = listItems[0].innerText.trim();

      expect(firstLabel).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('should not allow time to be selected if exists in restricted times', async () => {
      harness = await createFixture();

      const restrictedTimes = ['08:00', '10:00'];
      const firstRestrictedTimeMillis = timeStringToMillis(restrictedTimes[0], true, false);
      harness.element.restrictedTimes = restrictedTimes;

      expect(harness.element.restrictedTimes).toEqual(restrictedTimes);

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const restrictedListItem = listItems.find(li => li.value.time === firstRestrictedTimeMillis);
      expect(restrictedListItem).toBeTruthy();
      const buttonEl = restrictedListItem!.querySelector('button') as HTMLButtonElement;

      expect(buttonEl.disabled).toBe(true);

      harness.element.value = restrictedTimes[0];

      expect(harness.element.value).toBeNull();
    });

    it('should propagate down arrow key to dropdown', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      let activeListItemIndex = listItems.findIndex(li => li.active);

      expect(activeListItemIndex).toBe(-1);

      harness.dispatchKeydown('ArrowDown');

      activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).toBe((harness.element as any)._core._dropdownConfig.visibleStartIndex);
    });

    it('should propagate up arrow key to dropdown', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const originalActiveListItemIndex = listItems.findIndex(li => li.active);

      expect(originalActiveListItemIndex).toBe(-1);

      harness.dispatchKeydown('ArrowUp');

      const activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).toBe((harness.element as any)._core._dropdownConfig.visibleStartIndex);
    });

    it('should propagate home and end key to dropdown', async () => {
      harness = await createFixture();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();

      harness.dispatchKeydown('End');
      let activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).toBe(listItems.length - 1);

      harness.dispatchKeydown('Home');
      activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).toBe(0);
    });

    it('should select active option in dropdown when enter key is pressed', async () => {
      harness = await createFixture();

      const changeSpy = vi.fn();
      harness.element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      harness.dispatchKeydown('End');
      harness.dispatchKeydown('Enter');

      const selectedListItem = listItems[listItems.length - 1];
      const selectedTimeString = millisToTimeString(selectedListItem.value.time, true, false) ?? '';

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toBe(selectedTimeString);
      expect(harness.element.value).toBe(selectedTimeString);
    });

    it('should show "now" as the first option in the dropdown', async () => {
      harness = await createFixture();

      harness.element.showNow = true;
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const listItem = listItems[0];

      expect(listItem.value.time).toBeNull();
      expect(listItem.innerText).toBe('Now');
      expect(listItem.value.metadata).toBe('now');
    });

    it('should show "now" as the only option in the dropdown when showHourOptions is false and showNow is true and customOptions is empty', async () => {
      harness = await createFixture();

      harness.element.showNow = true;
      harness.element.showHourOptions = false;
      harness.element.customOptions = [];
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const firstListItem = listItems[0];

      expect(listItems.length).toBe(1);
      expect(firstListItem.value.time).toBeNull();
      expect(firstListItem.innerText).toBe('Now');
      expect(firstListItem.value.metadata).toBe('now');
    });

    it('should not show dropdown when showNow is false and showHourOptions is false and customOptions is empty', async () => {
      harness = await createFixture();

      harness.element.showNow = false;
      harness.element.showHourOptions = false;
      harness.element.customOptions = [];
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).toBeNull();
    });

    it('should show custom options', async () => {
      harness = await createFixture();

      const customOptions: ITimePickerOption[] = [
        { label: 'Custom 1', value: 100, toMilliseconds: () => 10000000 },
        { label: 'Custom 2', value: 200, toMilliseconds: () => 20000000 }
      ];
      harness.element.customOptions = customOptions;
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      expect(harness.element.customOptions).toEqual(customOptions);

      const firstListItem = listItems[0];
      expect(firstListItem.innerText).toBe(customOptions[0].label);
      expect(firstListItem.value.time).toBeNull();
      expect(firstListItem.value.metadata).toBe(customOptions[0].value);
      expect(firstListItem.value.isCustom).toBe(true);

      const secondListItem = listItems[1];
      expect(secondListItem.innerText).toBe(customOptions[1].label);
      expect(secondListItem.value.time).toBeNull();
      expect(secondListItem.value.metadata).toBe(customOptions[1].value);
      expect(secondListItem.value.isCustom).toBe(true);
    });

    it('should call toMilliseconds function when selecting custom options', async () => {
      harness = await createFixture();

      const customOptions: ITimePickerOption[] = [{ label: 'Custom', value: 'custom', toMilliseconds: () => 10000000 }];
      const toMillisSpy = vi.spyOn(customOptions[0], 'toMilliseconds');
      harness.element.customOptions = customOptions;
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      harness.dispatchKeydown('Home');
      harness.dispatchKeydown('Enter');

      expect(toMillisSpy).toHaveBeenCalledOnce();
      expect(toMillisSpy).toHaveBeenCalledWith(customOptions[0].value);
    });

    it('should show options between min and max', async () => {
      harness = await createFixture();

      const min = '08:00';
      const max = '15:00';
      harness.element.min = min;
      harness.element.max = max;
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const firstListItemMillis = timeStringToMillis(min, true, false);
      const lastListItemMillis = timeStringToMillis(max, true, false);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      expect(listItems[0].value.time).toBe(firstListItemMillis);
      expect(listItems[listItems.length - 1].value.time).toBe(lastListItemMillis);
    });

    it('should show options between min and max if wrapping around midnight', async () => {
      harness = await createFixture();

      const min = '23:00';
      const max = '02:00';
      harness.element.min = min;
      harness.element.max = max;
      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const firstListItemMillis = timeStringToMillis(min, true, false);
      const lastListItemMillis = timeStringToMillis(max, true, false);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      expect(listItems[0].value.time).toBe(firstListItemMillis);
      expect(listItems[listItems.length - 1].value.time).toBe(lastListItemMillis);
    });
  });

  describe('Selection Handling', () => {
    it('should handle selection', async () => {
      harness = await createFixture();

      const value: ITimePickerOptionValue = {
        time: 1 * 60 * 60 * 1000
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';

      (harness.element as any)._core._onSelect(value);

      expect(harness.element.value).toBe(expectedTimeString);
    });

    it('should handle selecting "now" option', async () => {
      harness = await createFixture();

      const value: ITimePickerOptionValue = {
        time: getCurrentTimeOfDayMillis(false),
        metadata: 'now'
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';

      (harness.element as any)._core._onSelect(value);

      expect(harness.element.value).toBe(expectedTimeString);
    });

    it('should handle selecting "custom" option', async () => {
      harness = await createFixture();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true,
        customCallback: () => 100000
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';
      (harness.element as any)._core._onSelect(value);

      expect(harness.element.value).toBe(expectedTimeString);
    });

    it("should throw if custom option doesn't provide customCallback", async () => {
      harness = await createFixture();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true
      };

      expect(() => (harness.element as any)._core._onSelect(value)).toThrow();
    });

    it("should throw if custom option doesn't return a number type", async () => {
      harness = await createFixture();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true,
        customCallback: () => 'test' as unknown as number
      };

      expect(() => (harness.element as any)._core._onSelect(value)).toThrow();
    });
  });

  describe('Custom Callbacks', () => {
    it('should use custom callbacks to control values', async () => {
      harness = await createFixture();

      const timeString = 'custom';
      const timeValue = 10000000;
      const expectedTimeString = millisToTimeString(timeValue, true, false) ?? '';
      const validateCbSpy = vi.fn((_value: string) => true);
      const parseCbSpy = vi.fn((_value: string) => timeValue);
      const formatCbSpy = vi.fn((_value: number) => timeString);

      harness.element.masked = false;
      harness.element.validationCallback = validateCbSpy;
      harness.element.parseCallback = parseCbSpy;
      harness.element.formatCallback = formatCbSpy;

      harness.element.value = '08:00';
      await frame();

      expect(harness.element.masked).toBe(false);
      expect(validateCbSpy).toHaveBeenCalled();
      expect(parseCbSpy).toHaveBeenCalledOnce();
      expect(formatCbSpy).toHaveBeenCalledOnce();
      expect(harness.element.value).toBe(expectedTimeString);
      expect(harness.inputElement.value).toBe(timeString);
    });

    it('should call custom coercion callback when masked', async () => {
      harness = await createFixture();

      const coercionSpy = vi.fn((_value: string, coerced: string, _allowSeconds: boolean) => coerced);
      harness.element.coercionCallback = coercionSpy;

      harness.inputElement.value = '120';
      harness.dispatchInput('insertFromPaste');

      expect(coercionSpy).toHaveBeenCalledOnce();
      expect(coercionSpy).toHaveBeenCalledWith('12:0', '12:00', false);
    });

    it('should call custom coercion callback when unmasked', async () => {
      harness = await createFixture();
      harness.element.masked = false;

      const coercionSpy = vi.fn((_value: string, coerced: string, _allowSeconds: boolean) => coerced);
      harness.element.coercionCallback = coercionSpy;

      harness.inputElement.value = '120';
      harness.dispatchInput();

      expect(coercionSpy).toHaveBeenCalledOnce();
      expect(coercionSpy).toHaveBeenCalledWith('120', '01:20', false);
    });

    it('should use custom coercion callback value', async () => {
      harness = await createFixture();

      const expectedValue = '12:00 PM';
      const coercionSpy = vi.fn((_value: string, _coerced: string, _allowSeconds: boolean) => expectedValue);
      harness.element.coercionCallback = coercionSpy;

      harness.inputElement.focus();
      harness.inputElement.value = '120';
      harness.dispatchInput();
      await frame();

      expect(harness.element.value).toBe('12:00');

      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).toBe(expectedValue);
    });
  });

  describe('Input Editing', () => {
    it('should coerce special case 3-digit shorthand values when unmasked', async () => {
      harness = await createFixture();
      harness.element.masked = false;

      harness.inputElement.value = '123';
      harness.dispatchInput();

      expect(harness.element.value).toBe('01:23');
    });

    it('should overwrite hours if 1 is entered', async () => {
      harness = await createFixture();

      await harness.writeValue('1', 0);
      await harness.writeValue('2', 2);

      expect(harness.element.value).toBe('12:00');
    });

    it('should overwrite hours if entered with format visible', async () => {
      harness = await createFixture();
      harness.element.showMaskFormat = true;

      await harness.writeValue('1', 0);
      expect(harness.element.value).toBe('01:00');

      await harness.writeValue('2', 2);
      expect(harness.element.value).toBe('12:00');
    });

    it('should not overwrite hours if > 2 is entered', async () => {
      harness = await createFixture();

      await harness.writeValue('1', 0);
      await harness.writeValue('3', 2, true);

      expect(harness.element.value).toBe('01:03');
    });

    it('should overwrite hours if <= 2 is entered in 24 hour time', async () => {
      harness = await createFixture();
      harness.element.use24HourTime = true;

      await harness.writeValue('2', 0);
      await harness.writeValue('1', 2);

      expect(harness.element.value).toBe('21:00');
    });

    it('should not overwrite hours if > 2 is entered in 24 hour time', async () => {
      harness = await createFixture();
      harness.element.use24HourTime = true;

      await harness.writeValue('3', 0);
      await harness.writeValue('1', 2, true);

      expect(harness.element.value).toBe('03:01');
    });
  });

  describe('Utility Functions', () => {
    it('should merge date with time via utility', () => {
      const date = new Date('01/01/2020');
      const time = '04:00 PM';
      const expected = new Date('2020-01-01 16:00');

      const merged = mergeDateWithTime(date, time);

      expect(merged).toEqual(expected);
    });

    it('should merge date with time with seconds via utility', () => {
      const date = new Date('01/01/2020');
      const time = '08:30:45 AM';
      const expected = new Date('2020-01-01 8:30:45');

      const merged = mergeDateWithTime(date, time, true);

      expect(merged).toEqual(expected);
    });
  });

  describe('Text Field Integration - Additional Tests', () => {
    it('should automatically create toggle when Forge text-field component is used as a child', async () => {
      harness = await createFixture({ detached: true });

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.element.removeChild(harness.toggleElement);
      harness.element.appendChild(textField);
      document.body.appendChild(harness.element);
      await frame();

      const iconButton = harness.element.querySelector(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
      expect(iconButton).not.toBeNull();
    });

    it('should set popup target to internal Forge text-field element when text-field is used as child', async () => {
      harness = await createFixture({ detached: true });

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.element.removeChild(harness.toggleElement);
      harness.element.appendChild(textField);
      document.body.appendChild(harness.element);
      await frame();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect((harness.element as any)._core._adapter._targetElement).toBe(textField.popoverTargetElement);
    });

    it('should use custom popup target', async () => {
      harness = await createFixture({ detached: true });

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.element.removeChild(harness.toggleElement);
      harness.element.appendChild(textField);
      document.body.appendChild(harness.element);

      harness.element.popupTarget = TEXT_FIELD_CONSTANTS.elementName;

      await frame();

      harness.element.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.element.popupTarget).toBe(TEXT_FIELD_CONSTANTS.elementName);
      expect((harness.element as any)._core._adapter._targetElement).toBe(textField);
    });

    it('should not use existing toggle element if provided', async () => {
      harness = await createFixture({ detached: true });

      const textField = document.createElement('forge-text-field');
      textField.appendChild(harness.inputElement);
      harness.element.removeChild(harness.toggleElement);
      harness.element.appendChild(textField);

      const button = document.createElement('forge-icon-button');
      button.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
      textField.appendChild(button);

      document.body.appendChild(harness.element);
      await frame();

      expect((harness.element as any)._core._adapter._toggleElement).toBe(button);
    });
  });
});
