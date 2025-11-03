import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { IPopoverComponent } from '../popover';
import { frame, task } from '../core/utils/utils';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../icon-button';
import { ITextFieldComponent, TEXT_FIELD_CONSTANTS } from '../text-field';
import {
  getCurrentTimeOfDayMillis,
  hoursToMillis,
  ITimePickerAdapter,
  ITimePickerComponent,
  ITimePickerCore,
  ITimePickerOption,
  ITimePickerOptionValue,
  mergeDateWithTime,
  millisToTimeString,
  timeStringToMillis,
  TIME_PICKER_CONSTANTS
} from './';

import '../text-field';
import './time-picker';

const POPOVER_ANIMATION_DURATION = 200;

// Type definitions for internal APIs
type TimePickerAdapterInternal = ITimePickerAdapter & {
  _targetElement: HTMLElement;
  _toggleElement: HTMLElement;
};

type TimePickerCoreInternal = ITimePickerCore & {
  _adapter: TimePickerAdapterInternal;
  _isInitialized: boolean;
  _identifier: string;
  _dropdownConfig: { visibleStartIndex: number };
  _onSelect(value: ITimePickerOptionValue): void;
  _handleInput(value: string): void;
};

type TimePickerWithCore = ITimePickerComponent & {
  _core: TimePickerCoreInternal;
};

/**
 * Test harness for managing time picker test interactions
 */
class TimePickerTestHarness {
  constructor(
    public component: TimePickerWithCore,
    public inputElement: HTMLInputElement,
    public toggleElement: HTMLButtonElement
  ) {}

  public get core(): TimePickerCoreInternal {
    return this.component._core;
  }

  public get adapter(): TimePickerAdapterInternal {
    return this.core._adapter;
  }

  public get identifier(): string {
    return `forge-time-picker-${this.core._identifier}`;
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
    this.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
  }

  public async closeDropdown(): Promise<void> {
    this.component.open = false;
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
    this.component.remove();
  }
}

/**
 * Test fixture factory functions
 */
class TimePickerFixtures {
  public static async createBasic(): Promise<TimePickerTestHarness> {
    const element = await fixture<TimePickerWithCore>(html`
      <forge-time-picker>
        <input type="text" />
        <button forge-time-picker-toggle></button>
      </forge-time-picker>
    `);

    const inputElement = element.querySelector('input') as HTMLInputElement;
    const toggleElement = element.querySelector('button') as HTMLButtonElement;

    return new TimePickerTestHarness(element, inputElement, toggleElement);
  }

  public static async createWithTextField(): Promise<TimePickerTestHarness> {
    const element = await fixture<TimePickerWithCore>(html`
      <forge-time-picker>
        <forge-text-field>
          <input type="text" />
        </forge-text-field>
      </forge-time-picker>
    `);

    const inputElement = element.querySelector('input') as HTMLInputElement;
    const toggleElement = element.querySelector('button') as HTMLButtonElement;

    return new TimePickerTestHarness(element, inputElement, toggleElement);
  }

  public static async createWithoutToggle(): Promise<TimePickerTestHarness> {
    const element = await fixture<TimePickerWithCore>(html`
      <forge-time-picker>
        <input type="text" />
      </forge-time-picker>
    `);

    const inputElement = element.querySelector('input') as HTMLInputElement;
    const toggleElement = element.querySelector('button') as HTMLButtonElement;

    return new TimePickerTestHarness(element, inputElement, toggleElement);
  }

  public static async createDetached(): Promise<TimePickerTestHarness> {
    const component = document.createElement('forge-time-picker') as TimePickerWithCore;
    const inputElement = document.createElement('input');
    const toggleElement = document.createElement('button');

    toggleElement.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
    component.appendChild(inputElement);
    component.appendChild(toggleElement);

    return new TimePickerTestHarness(component, inputElement, toggleElement);
  }

  public static async createDetachedWithoutInput(): Promise<TimePickerTestHarness> {
    const component = document.createElement('forge-time-picker') as TimePickerWithCore;
    const inputElement = document.createElement('input');
    const toggleElement = document.createElement('button');

    toggleElement.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
    component.appendChild(toggleElement);
    document.body.appendChild(component);

    return new TimePickerTestHarness(component, inputElement, toggleElement);
  }
}

describe('TimePickerComponent', () => {
  let harness: TimePickerTestHarness;

  afterEach(() => {
    harness?.cleanup();
  });

  describe('Initialization', () => {
    it('should instantiate component instance with shadow root', async () => {
      harness = await TimePickerFixtures.createBasic();
      expect(harness.component.shadowRoot).to.exist;
    });

    it('should have default value of null', async () => {
      harness = await TimePickerFixtures.createBasic();
      expect(harness.component.value).to.be.null;
    });

    it('should wait for input element to initialize', async () => {
      harness = await TimePickerFixtures.createDetachedWithoutInput();

      expect(harness.core._isInitialized).to.be.false;

      await task(100);
      harness.component.appendChild(harness.inputElement);
      await frame();

      expect(harness.core._isInitialized).to.be.true;
    });
  });

  describe('Value Setting', () => {
    it('should set value in default 12 hour format', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '15:00';
      const expectedTimeString = '03:00 PM';
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set value in 24 hour format', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '15:00';
      const expectedTimeString = '15:00';
      harness.component.use24HourTime = true;
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should toggle existing value between 12 and 24 hour formats', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '15:30';
      const expected12hourTimeString = '03:30 PM';
      harness.component.value = expectedTimeValue;

      expect(harness.inputElement.value).to.equal(expected12hourTimeString);

      const expected24HourTimeString = '15:30';
      harness.component.use24HourTime = true;

      expect(harness.inputElement.value).to.equal(expected24HourTimeString);

      harness.component.use24HourTime = false;
      expect(harness.inputElement.value).to.equal(expected12hourTimeString);
    });

    it('should set value to null if invalid time is provided', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '96:12';
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal('');
    });

    it('should set default value in 12 hour mode', async () => {
      harness = await TimePickerFixtures.createDetached();

      const expectedTimeValue = '00:30';
      const expectedTimeString = '12:30 AM';
      harness.component.value = expectedTimeValue;
      document.body.appendChild(harness.component);
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set default value in 24 hour mode', async () => {
      harness = await TimePickerFixtures.createDetached();

      const expectedTimeValue = '00:30';
      harness.component.value = expectedTimeValue;
      harness.component.use24HourTime = true;
      document.body.appendChild(harness.component);
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeValue);
    });

    it('should set default value in 12 hour mode with seconds', async () => {
      harness = await TimePickerFixtures.createDetached();

      const expectedTimeValue = '23:30:55';
      const expectedTimeString = '11:30:55 PM';
      harness.component.value = expectedTimeValue;
      harness.component.allowSeconds = true;
      document.body.appendChild(harness.component);
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set default value in 24 hour mode with seconds', async () => {
      harness = await TimePickerFixtures.createDetached();

      const expectedTimeValue = '23:30:55';
      harness.component.value = expectedTimeValue;
      harness.component.use24HourTime = true;
      harness.component.allowSeconds = true;
      document.body.appendChild(harness.component);
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeValue);
    });
  });

  describe('Seconds Support', () => {
    it('should set value in 12 hour format with seconds', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '14:45:15';
      const expectedTimeString = '02:45:15 PM';
      harness.component.allowSeconds = true;
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set value in 24 hour format with seconds', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '14:45:15';
      harness.component.use24HourTime = true;
      harness.component.allowSeconds = true;
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeValue);
    });

    it("should remove seconds in 12 hour time if value is set with seconds but aren't allowed", async () => {
      harness = await TimePickerFixtures.createBasic();

      const timeValue = '14:45:15';
      const expectedTimeValue = '14:45';
      const expectedTimeString = '02:45 PM';
      harness.component.value = timeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should remove seconds from time value when allowSeconds is set to false', async () => {
      harness = await TimePickerFixtures.createBasic();

      const timeValueWithSeconds = '08:45:25';
      const timeValueWithoutSeconds = '08:45';

      harness.component.allowSeconds = true;
      harness.component.value = timeValueWithSeconds;
      harness.component.allowSeconds = false;

      expect(harness.component.value).to.equal(timeValueWithoutSeconds);
    });

    it('should set seconds when time is set by default', async () => {
      harness = await TimePickerFixtures.createDetached();

      const timeValueWithSeconds = '14:45:25';
      const timeInputValue = '02:45:25 PM';

      harness.component.allowSeconds = true;
      harness.component.value = timeValueWithSeconds;
      document.body.appendChild(harness.component);
      await frame();

      expect(harness.component.value).to.equal(timeValueWithSeconds);
      expect(harness.inputElement.value).to.equal(timeInputValue);
    });
  });

  describe('Disabled State', () => {
    it('should set disabled', async () => {
      harness = await TimePickerFixtures.createBasic();

      expect(harness.component.disabled).to.be.false;
      expect(harness.inputElement.disabled).to.be.false;
      expect(harness.toggleElement.disabled).to.be.false;

      harness.component.disabled = true;
      await frame();

      expect(harness.component.disabled).to.be.true;
      expect(harness.inputElement.disabled).to.be.true;
      expect(harness.toggleElement.disabled).to.be.true;
    });

    it('should enable field after being disabled by default', async () => {
      harness = await TimePickerFixtures.createDetached();

      harness.component.disabled = true;
      document.body.appendChild(harness.component);
      await frame();

      harness.component.disabled = false;
      await frame();

      expect(harness.component.disabled).to.be.false;
      expect(harness.inputElement.disabled).to.be.false;
      expect(harness.toggleElement.disabled).to.be.false;
    });

    it('should toggle disabled', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.disabled = true;
      await frame();

      expect(harness.component.disabled).to.be.true;
      expect(harness.inputElement.disabled).to.be.true;

      harness.component.disabled = false;
      await frame();

      expect(harness.component.disabled).to.be.false;
      expect(harness.inputElement.disabled).to.be.false;
    });

    it('should not open dropdown if disabled', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.disabled = true;
      harness.clickToggle();

      expect(harness.getPopup()).to.be.null;
      expect(harness.component.open).to.be.false;
    });
  });

  describe('Min/Max Validation', () => {
    it('should not set value if below min', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.min = '08:00';
      harness.component.value = '06:00';

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal('');
    });

    it('should remove value if setting min and value is below min', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeEventSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '06:00';
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);

      harness.component.min = '08:00';

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal('');
      expect(changeEventSpy).to.have.been.calledOnce;
      expect(changeEventSpy.firstCall.args[0].detail).to.be.null;
    });

    it('should not set value if above max', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.max = '15:00';
      harness.component.value = '17:00';

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal('');
    });

    it('should not allow min to be set if invalid format', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.min = '95:30';

      expect(harness.component.min).to.be.null;
    });

    it('should not allow max to be set if invalid format', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.max = '95:30';

      expect(harness.component.max).to.be.null;
    });
  });

  describe('Input Masking', () => {
    it('should retain value when toggling input mask', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '20:07';
      const expectedTimeString = '08:07 PM';
      harness.component.value = expectedTimeValue;

      await frame();
      harness.component.masked = false;
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should use input mask', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.masked = true;

      expect(harness.component.masked).to.be.true;

      harness.inputElement.value = '0101';
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(harness.inputElement.value).to.equal('01:01');
    });

    it('should set value through input element when unmasked', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.masked = false;

      const timeValue = '1111';
      harness.inputElement.value = timeValue;

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal(timeValue);

      harness.dispatchInput();
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.component.value).to.equal('11:11');
      expect(harness.inputElement.value).to.equal('11:11 AM');
    });

    it('should select mask when shown on focus', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.masked).to.be.true;
      expect(harness.component.showMaskFormat).to.be.true;
      harness.inputElement.focus();

      expect(harness.inputElement.selectionStart).to.equal(0);
      expect(harness.inputElement.selectionEnd).to.equal('__:__ __'.length);
    });

    it('should only show default mask format on focus', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.masked).to.be.true;
      expect(harness.component.showMaskFormat).to.be.true;
      expect(harness.inputElement.value).to.equal('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).to.equal('__:__ __');
    });

    it('should clear mask format on blur', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.masked).to.be.true;
      expect(harness.component.showMaskFormat).to.be.true;
      expect(harness.inputElement.value).to.equal('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).to.equal('__:__ __');
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));
      harness.inputElement.blur();

      expect(harness.inputElement.value).to.be.empty;
    });

    it('should mask input value', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '1111';
      harness.dispatchInput('insertFromPaste');
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).to.equal('11:11 AM');
    });

    it('should mask input value when valid format is entered in 12 hour time', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '01:30';
      harness.dispatchInput();
      await frame();
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).to.equal('01:30 AM');
    });

    it('should only show 24 hour mask format on focus', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME, '');

      expect(harness.component.masked).to.be.true;
      expect(harness.component.showMaskFormat).to.be.true;
      expect(harness.component.use24HourTime).to.be.true;
      expect(harness.inputElement.value).to.equal('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).to.equal('__:__');
    });

    it('should only show seconds mask format on focus', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, '');
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS, '');

      expect(harness.component.masked).to.be.true;
      expect(harness.component.showMaskFormat).to.be.true;
      expect(harness.component.allowSeconds).to.be.true;
      expect(harness.inputElement.value).to.equal('');
      harness.inputElement.focus();
      expect(harness.inputElement.value).to.equal('__:__:__ __');
    });
  });

  describe('Additional Min/Max Tests', () => {
    it('should remove value if setting max and value is above max', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeEventSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '17:00';
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);

      harness.component.max = '12:00';

      expect(harness.component.value).to.be.null;
      expect(harness.inputElement.value).to.equal('');
      expect(changeEventSpy).to.have.been.calledOnce;
      expect(changeEventSpy.firstCall.args[0].detail).to.be.null;
    });

    it('should not allow startTime to be set if invalid format', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.startTime = '95:30';

      expect(harness.component.startTime).to.be.null;
    });
  });

  describe('Change Events', () => {
    it('should not emit change event when setting value via input element property', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeEventSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      harness.inputElement.value = '08:00';

      expect(changeEventSpy).to.not.have.been.called;
    });

    it('should emit change event when valid time string is entered', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeEventSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      const expectedTimeValue = '08:00';
      harness.core._handleInput(expectedTimeValue);

      expect(changeEventSpy).to.have.been.calledOnce;
      expect(changeEventSpy.firstCall.args[0].detail).to.equal(expectedTimeValue);
    });

    it('should not emit change event when invalid time string is entered', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeEventSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);

      harness.core._handleInput('asdf');

      expect(changeEventSpy).to.not.have.been.called;
    });

    it('should not dispatch change event if selecting time that is already set', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
      const timeString = millisToTimeString(value.time, true, false) ?? '';
      harness.component.value = timeString;

      harness.core._onSelect(value);

      expect(harness.component.value).to.equal(timeString);
      expect(changeSpy).to.not.have.been.called;
    });

    it('should not set time value if change event is cancelled', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeSpy = sinon.spy((evt: CustomEvent<string>) => evt.preventDefault());
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      const value: ITimePickerOptionValue = { time: hoursToMillis(5) };
      const timeString = millisToTimeString(value.time, true, false) ?? '';

      harness.core._onSelect(value);

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.equal(timeString);
      expect(harness.inputElement.value).to.equal('');
      expect(harness.component.value).to.not.equal(timeString);
    });
  });

  describe('Additional Attribute Tests', () => {
    it('should set value via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '14:30';
      const expectedTimeString = '02:30 PM';
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.VALUE, expectedTimeValue);

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set masked via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MASKED, 'false');
      expect(harness.component.masked).to.be.false;
    });

    it('should set showMaskFormat via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_MASK_FORMAT, 'true');
      expect(harness.component.showMaskFormat).to.be.true;
    });

    it('should set allowInvalidTime via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME, 'true');
      expect(harness.component.allowInvalidTime).to.be.true;
    });

    it('should set showNow via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_NOW, '');
      expect(harness.component.showNow).to.be.true;
    });

    it('should set showHourOptions via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.SHOW_HOUR_OPTIONS, 'false');
      expect(harness.component.showHourOptions).to.be.false;
    });

    it('should set min via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      const expectedTimeValue = '19:32';
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MIN, expectedTimeValue);
      expect(harness.component.min).to.equal(expectedTimeValue);
    });

    it('should set max via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      const expectedTimeValue = '03:15';
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.MAX, expectedTimeValue);
      expect(harness.component.max).to.equal(expectedTimeValue);
    });

    it('should set startTime via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      const expectedTimeValue = '08:00';
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.START_TIME, expectedTimeValue);
      expect(harness.component.startTime).to.equal(expectedTimeValue);
    });

    it('should set popupClasses via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.POPUP_CLASSES, 'test');
      expect(harness.component.popupClasses).to.deep.equal(['test']);
    });

    it('should set allowDropdown via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_DROPDOWN, 'false');
      expect(harness.component.allowDropdown).to.be.false;
    });

    it('should set step via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      const expectedMinutes = 15;
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.STEP, `${expectedMinutes}`);
      expect(harness.component.step).to.equal(expectedMinutes);
    });

    it('should set allowInput via attribute', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.setAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INPUT, 'false');
      expect(harness.component.allowInput).to.be.false;
    });
  });

  describe('Additional Validation Tests', () => {
    it('should set value without mask applied in 12 hour format', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '23:59';
      const expectedTimeString = '11:59 PM';
      harness.component.masked = false;
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeString);
    });

    it('should set value without mask applied in 24 hour format', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedTimeValue = '23:59';
      harness.component.masked = false;
      harness.component.use24HourTime = true;
      harness.component.value = expectedTimeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeValue);
    });

    it("should remove seconds in 24 hour time if value is set with seconds but aren't allowed", async () => {
      harness = await TimePickerFixtures.createBasic();

      const timeValue = '14:45:15';
      const expectedTimeValue = '14:45';
      harness.component.use24HourTime = true;
      harness.component.value = timeValue;

      expect(harness.component.value).to.equal(expectedTimeValue);
      expect(harness.inputElement.value).to.equal(expectedTimeValue);
    });

    it('should use input mask', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.masked = true;

      expect(harness.component.masked).to.be.true;

      harness.inputElement.value = '0101';
      harness.inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(harness.inputElement.value).to.equal('01:01');
    });

    it('should mask input value when large number entered', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).to.equal('09:');
    });

    it('should toggle mask off then on', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.masked = false;
      await frame();

      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).to.equal('9');
      harness.inputElement.value = '';

      harness.component.masked = true;
      harness.inputElement.value = '9';
      harness.dispatchInput();
      await frame();

      expect(harness.inputElement.value).to.equal('09:');
    });

    it('should allow invalid input value when allowInvalidTime is true', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.allowInvalidTime = true;
      harness.component.masked = false;

      const invalidTimeValue = 'xyz';
      harness.inputElement.value = invalidTimeValue;
      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).to.equal(invalidTimeValue);
    });

    it('should pad leading zero when entering hour of 1', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '1';
      harness.dispatchInput();

      expect(harness.component.value).to.equal('01:00');
      expect(harness.inputElement.value).to.equal('01:');
    });

    it('should pad leading zero when entering hour of 2', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '2';
      harness.dispatchInput();

      expect(harness.component.value).to.equal('02:00');
      expect(harness.inputElement.value).to.equal('02:');
    });

    it('should pad leading zero when entering initial hour of 3 or higher', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '3';
      harness.dispatchInput();

      expect(harness.component.value).to.equal('03:00');
      expect(harness.inputElement.value).to.equal('03:');
    });
  });

  describe('Keyboard Interaction', () => {
    it('should set time to current time when "n" key is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      const millis = getCurrentTimeOfDayMillis(false);
      const expectedTimeValue = millisToTimeString(millis, true, false) ?? '';

      harness.dispatchKeydown('KeyN');
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
    });

    it('should set time to current time when "n" key is pressed with seconds', async () => {
      harness = await TimePickerFixtures.createBasic();

      const millis = getCurrentTimeOfDayMillis(true);
      const expectedTimeValue = millisToTimeString(millis, true, true) ?? '';
      harness.component.allowSeconds = true;

      harness.dispatchKeydown('KeyN');
      await frame();

      expect(harness.component.value).to.equal(expectedTimeValue);
    });

    it('should clear value if shift + delete is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.value = '08:00';
      await frame();

      expect(harness.inputElement.value).to.not.equal('');
      harness.dispatchKeydown('Delete', { shiftKey: true });
      await frame();

      expect(harness.inputElement.value).to.equal('');
    });

    it('should clear value if shift + backspace is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.value = '08:00';
      await frame();

      expect(harness.inputElement.value).to.not.equal('');
      harness.dispatchKeydown('Backspace', { shiftKey: true });
      await frame();

      expect(harness.inputElement.value).to.equal('');
    });

    it('should not open dropdown when focused and allowInput false', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.allowInput = false;
      harness.inputElement.focus();
      await frame();

      expect(harness.component.open).to.be.false;
    });

    it('should open dropdown when focused via mouse and allowInput false', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.allowInput = false;
      harness.inputElement.dispatchEvent(new MouseEvent('mousedown'));
      await frame();

      expect(harness.component.open).to.be.true;
    });
  });

  describe('Dropdown Interaction', () => {
    it('should open dropdown when toggle is clicked', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.not.be.null;
    });

    it('should close dropdown when toggle is clicked', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.getPopup()).to.not.be.null;

      harness.clickToggle();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.be.null;
    });

    it('should open dropdown when down arrow key is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.not.be.null;
    });

    it('should close dropdown when escape key is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.getPopup()).to.not.be.null;

      harness.dispatchKeydown('Escape');
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.be.null;
    });

    it('should select matching time in dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      const timeString = '08:00';
      const timeMillis = timeStringToMillis(timeString, true, false);
      harness.component.value = timeString;
      harness.component.open = true;

      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const matchingListItem = listItems.find(li => li.selected);

      expect(matchingListItem).to.exist;
      expect(matchingListItem?.value.time).to.equal(timeMillis);
    });

    it('should highlight option in dropdown when opened via arrow down key', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.dispatchKeydown('ArrowDown');
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const activeListItemIndex = listItems.findIndex(li => li.active);

      expect(activeListItemIndex).to.equal(harness.core._dropdownConfig.visibleStartIndex);
    });

    it('should select highlighted time in dropdown when tab key is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      harness.dispatchKeydown('ArrowDown');
      harness.dispatchKeydown('Tab');
      harness.inputElement.blur();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.value).to.not.be.null;
    });

    it('should select matching value in dropdown when opened when startTime is set', async () => {
      harness = await TimePickerFixtures.createBasic();

      const startTime = '08:00';
      const timeString = '15:00';
      const timeMillis = timeStringToMillis(timeString, true, false);
      harness.component.value = timeString;
      harness.component.startTime = startTime;
      harness.component.open = true;

      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const activeListItem = listItems.find(li => li.selected);

      expect(activeListItem).to.exist;
      expect(activeListItem?.value.time).to.equal(timeMillis);
    });

    it('should open and close dropdown via open property', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.not.be.null;
      expect(harness.component.open).to.be.true;

      harness.component.open = false;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.be.null;
      expect(harness.component.open).to.be.false;
    });

    it('should close dropdown when toggling allow dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await frame();

      harness.component.allowDropdown = false;
      await frame();

      expect(harness.component.open).to.be.false;
    });

    it('should close dropdown when typing into input if open', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.masked = false;
      harness.component.open = true;
      await frame();

      harness.inputElement.value = '1';
      harness.dispatchInput();
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.component.open).to.be.false;
      expect(harness.getPopup()).to.be.null;
    });

    it('should remove popover when removed from DOM while open', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.not.be.null;

      harness.component.remove();

      expect(harness.getPopup()).to.be.null;
    });

    it('should not allow time to be selected if exists in restricted times', async () => {
      harness = await TimePickerFixtures.createBasic();

      const restrictedTimes = ['08:00', '10:00'];
      const firstRestrictedTimeMillis = timeStringToMillis(restrictedTimes[0], true, false);
      harness.component.restrictedTimes = restrictedTimes;

      expect(harness.component.restrictedTimes).to.deep.equal(restrictedTimes);

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const restrictedListItem = listItems.find(li => li.value.time === firstRestrictedTimeMillis);
      expect(restrictedListItem).to.exist;
      const buttonEl = restrictedListItem!.querySelector('button') as HTMLButtonElement;

      expect(buttonEl.disabled).to.be.true;

      harness.component.value = restrictedTimes[0];

      expect(harness.component.value).to.be.null;
    });

    it('should propagate down arrow key to dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      let activeListItemIndex = listItems.findIndex(li => li.active);

      expect(activeListItemIndex).to.equal(-1);

      harness.dispatchKeydown('ArrowDown');

      activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).to.equal(harness.core._dropdownConfig.visibleStartIndex);
    });

    it('should propagate up arrow key to dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();
      const originalActiveListItemIndex = listItems.findIndex(li => li.active);

      expect(originalActiveListItemIndex).to.equal(-1);

      harness.dispatchKeydown('ArrowUp');

      const activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).to.equal(harness.core._dropdownConfig.visibleStartIndex);
    });

    it('should propagate home and end key to dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems();

      harness.dispatchKeydown('End');
      let activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).to.equal(listItems.length - 1);

      harness.dispatchKeydown('Home');
      activeListItemIndex = listItems.findIndex(li => li.active);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should select active option in dropdown when enter key is pressed', async () => {
      harness = await TimePickerFixtures.createBasic();

      const changeSpy = sinon.spy();
      harness.component.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      harness.dispatchKeydown('End');
      harness.dispatchKeydown('Enter');

      const selectedListItem = listItems[listItems.length - 1];
      const selectedTimeString = millisToTimeString(selectedListItem.value.time, true, false) ?? '';

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.equal(selectedTimeString);
      expect(harness.component.value).to.equal(selectedTimeString);
    });

    it('should show "now" as the first option in the dropdown', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.showNow = true;
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const listItem = listItems[0];

      expect(listItem.value.time).to.be.null;
      expect(listItem.innerText).to.equal('Now');
      expect(listItem.value.metadata).to.equal('now');
    });

    it('should show "now" as the only option in the dropdown when showHourOptions is false and showNow is true and customOptions is empty', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.showNow = true;
      harness.component.showHourOptions = false;
      harness.component.customOptions = [];
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      const firstListItem = listItems[0];

      expect(listItems.length).to.equal(1);
      expect(firstListItem.value.time).to.be.null;
      expect(firstListItem.innerText).to.equal('Now');
      expect(firstListItem.value.metadata).to.equal('now');
    });

    it('should not show dropdown when showNow is false and showHourOptions is false and customOptions is empty', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.component.showNow = false;
      harness.component.showHourOptions = false;
      harness.component.customOptions = [];
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.getPopup()).to.be.null;
    });

    it('should show custom options', async () => {
      harness = await TimePickerFixtures.createBasic();

      const customOptions: ITimePickerOption[] = [
        { label: 'Custom 1', value: 100, toMilliseconds: () => 10000000 },
        { label: 'Custom 2', value: 200, toMilliseconds: () => 20000000 }
      ];
      harness.component.customOptions = customOptions;
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      expect(harness.component.customOptions).to.deep.equal(customOptions);

      const firstListItem = listItems[0];
      expect(firstListItem.innerText).to.equal(customOptions[0].label);
      expect(firstListItem.value.time).to.be.null;
      expect(firstListItem.value.metadata).to.equal(customOptions[0].value);
      expect(firstListItem.value.isCustom).to.be.true;

      const secondListItem = listItems[1];
      expect(secondListItem.innerText).to.equal(customOptions[1].label);
      expect(secondListItem.value.time).to.be.null;
      expect(secondListItem.value.metadata).to.equal(customOptions[1].value);
      expect(secondListItem.value.isCustom).to.be.true;
    });

    it('should call toMilliseconds function when selecting custom options', async () => {
      harness = await TimePickerFixtures.createBasic();

      const customOptions: ITimePickerOption[] = [{ label: 'Custom', value: 'custom', toMilliseconds: () => 10000000 }];
      const toMillisSpy = sinon.spy(customOptions[0], 'toMilliseconds');
      harness.component.customOptions = customOptions;
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      harness.dispatchKeydown('Home');
      harness.dispatchKeydown('Enter');

      expect(toMillisSpy).to.have.been.calledOnceWith(customOptions[0].value);
    });

    it('should show options between min and max', async () => {
      harness = await TimePickerFixtures.createBasic();

      const min = '08:00';
      const max = '15:00';
      harness.component.min = min;
      harness.component.max = max;
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const firstListItemMillis = timeStringToMillis(min, true, false);
      const lastListItemMillis = timeStringToMillis(max, true, false);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];

      expect(listItems[0].value.time).to.equal(firstListItemMillis);
      expect(listItems[listItems.length - 1].value.time).to.equal(lastListItemMillis);
    });

    it('should show options between min and max if wrapping around midnight', async () => {
      harness = await TimePickerFixtures.createBasic();

      const min = '23:00';
      const max = '02:00';
      harness.component.min = min;
      harness.component.max = max;
      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      const firstListItemMillis = timeStringToMillis(min, true, false);
      const lastListItemMillis = timeStringToMillis(max, true, false);

      const listItems = harness.getListItems() as IListItemComponent<ITimePickerOptionValue>[];
      expect(listItems[0].value.time).to.equal(firstListItemMillis);
      expect(listItems[listItems.length - 1].value.time).to.equal(lastListItemMillis);
    });
  });

  describe('Selection Handling', () => {
    it('should handle selection', async () => {
      harness = await TimePickerFixtures.createBasic();

      const value: ITimePickerOptionValue = {
        time: 1 * 60 * 60 * 1000
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';

      harness.core._onSelect(value);

      expect(harness.component.value).to.equal(expectedTimeString);
    });

    it('should handle selecting "now" option', async () => {
      harness = await TimePickerFixtures.createBasic();

      const value: ITimePickerOptionValue = {
        time: getCurrentTimeOfDayMillis(false),
        metadata: 'now'
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';

      harness.core._onSelect(value);

      expect(harness.component.value).to.equal(expectedTimeString);
    });

    it('should handle selecting "custom" option', async () => {
      harness = await TimePickerFixtures.createBasic();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true,
        customCallback: () => 100000
      };
      const expectedTimeString = millisToTimeString(value.time, true, false) ?? '';
      harness.core._onSelect(value);

      expect(harness.component.value).to.equal(expectedTimeString);
    });

    it("should throw if custom option doesn't provide customCallback", async () => {
      harness = await TimePickerFixtures.createBasic();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true
      };

      expect(() => harness.core._onSelect(value)).to.throw();
    });

    it("should throw if custom option doesn't return a number type", async () => {
      harness = await TimePickerFixtures.createBasic();

      const value: ITimePickerOptionValue = {
        time: 100000,
        metadata: 'custom',
        isCustom: true,
        customCallback: () => 'test' as unknown as number
      };

      expect(() => harness.core._onSelect(value)).to.throw();
    });
  });

  describe('Custom Callbacks', () => {
    it('should use custom callbacks to control values', async () => {
      harness = await TimePickerFixtures.createBasic();

      const timeString = 'custom';
      const timeValue = 10000000;
      const expectedTimeString = millisToTimeString(timeValue, true, false) ?? '';
      const validateCbSpy = sinon.spy((value: string) => true);
      const parseCbSpy = sinon.spy((value: string) => timeValue);
      const formatCbSpy = sinon.spy((value: number) => timeString);

      harness.component.masked = false;
      harness.component.validationCallback = validateCbSpy;
      harness.component.parseCallback = parseCbSpy;
      harness.component.formatCallback = formatCbSpy;

      harness.component.value = '08:00';
      await frame();

      expect(harness.component.masked).to.be.false;
      expect(validateCbSpy).to.have.been.called;
      expect(parseCbSpy).to.have.been.calledOnce;
      expect(formatCbSpy).to.have.been.calledOnce;
      expect(harness.component.value).to.equal(expectedTimeString);
      expect(harness.inputElement.value).to.equal(timeString);
    });

    it('should call custom coercion callback when masked', async () => {
      harness = await TimePickerFixtures.createBasic();

      const coercionSpy = sinon.spy((value: string, coerced: string, allowSeconds: boolean) => coerced);
      harness.component.coercionCallback = coercionSpy;

      harness.inputElement.value = '120';
      harness.dispatchInput('insertFromPaste');

      expect(coercionSpy).to.have.been.calledOnceWith('12:0', '12:00', false);
    });

    it('should call custom coercion callback when unmasked', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.masked = false;

      const coercionSpy = sinon.spy((value: string, coerced: string, allowSeconds: boolean) => coerced);
      harness.component.coercionCallback = coercionSpy;

      harness.inputElement.value = '120';
      harness.dispatchInput();

      expect(coercionSpy).to.have.been.calledOnceWith('120', '01:20', false);
    });

    it('should use custom coercion callback value', async () => {
      harness = await TimePickerFixtures.createBasic();

      const expectedValue = '12:00 PM';
      const coercionSpy = sinon.spy((_value: string, _coerced: string, _allowSeconds: boolean) => expectedValue);
      harness.component.coercionCallback = coercionSpy;

      harness.inputElement.focus();
      harness.inputElement.value = '120';
      harness.dispatchInput();
      await frame();

      expect(harness.component.value).to.equal('12:00');

      harness.dispatchBlur();
      await frame();

      expect(harness.inputElement.value).to.equal(expectedValue);
    });
  });

  describe('Input Editing', () => {
    it('should coerce special case 3-digit shorthand values when unmasked', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.masked = false;

      harness.inputElement.value = '123';
      harness.dispatchInput();

      expect(harness.component.value).to.equal('01:23');
    });

    it('should overwrite hours if 1 is entered', async () => {
      harness = await TimePickerFixtures.createBasic();

      await harness.writeValue('1', 0);
      await harness.writeValue('2', 2);

      expect(harness.component.value).to.equal('12:00');
    });

    it('should overwrite hours if entered with format visible', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.showMaskFormat = true;

      await harness.writeValue('1', 0);
      expect(harness.component.value).to.equal('01:00');

      await harness.writeValue('2', 2);
      expect(harness.component.value).to.equal('12:00');
    });

    it('should not overwrite hours if > 2 is entered', async () => {
      harness = await TimePickerFixtures.createBasic();

      await harness.writeValue('1', 0);
      await harness.writeValue('3', 2, true);

      expect(harness.component.value).to.equal('01:03');
    });

    it('should overwrite hours if <= 2 is entered in 24 hour time', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.use24HourTime = true;

      await harness.writeValue('2', 0);
      await harness.writeValue('1', 2);

      expect(harness.component.value).to.equal('21:00');
    });

    it('should not overwrite hours if > 2 is entered in 24 hour time', async () => {
      harness = await TimePickerFixtures.createBasic();
      harness.component.use24HourTime = true;

      await harness.writeValue('3', 0);
      await harness.writeValue('1', 2, true);

      expect(harness.component.value).to.equal('03:01');
    });
  });

  describe('Utility Functions', () => {
    it('should merge date with time via utility', () => {
      const date = new Date('01/01/2020');
      const time = '04:00 PM';
      const expected = new Date('2020-01-01 16:00');

      const merged = mergeDateWithTime(date, time);

      expect(merged).to.deep.equal(expected);
    });

    it('should merge date with time with seconds via utility', () => {
      const date = new Date('01/01/2020');
      const time = '08:30:45 AM';
      const expected = new Date('2020-01-01 8:30:45');

      const merged = mergeDateWithTime(date, time, true);

      expect(merged).to.deep.equal(expected);
    });
  });

  describe('Text Field Integration - Additional Tests', () => {
    it('should automatically create toggle when Forge text-field component is used as a child', async () => {
      harness = await TimePickerFixtures.createDetached();

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.component.removeChild(harness.toggleElement);
      harness.component.appendChild(textField);
      document.body.appendChild(harness.component);
      await frame();

      const iconButton = harness.component.querySelector(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
      expect(iconButton).to.not.be.null;
    });

    it('should set popup target to internal Forge text-field element when text-field is used as child', async () => {
      harness = await TimePickerFixtures.createDetached();

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.component.removeChild(harness.toggleElement);
      harness.component.appendChild(textField);
      document.body.appendChild(harness.component);
      await frame();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.adapter._targetElement).to.equal(textField.popoverTargetElement);
    });

    it('should use custom popup target', async () => {
      harness = await TimePickerFixtures.createDetached();

      const textField = document.createElement('forge-text-field') as ITextFieldComponent;
      textField.appendChild(harness.inputElement);
      harness.component.removeChild(harness.toggleElement);
      harness.component.appendChild(textField);
      document.body.appendChild(harness.component);

      harness.component.popupTarget = TEXT_FIELD_CONSTANTS.elementName;

      await frame();

      harness.component.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.popupTarget).to.equal(TEXT_FIELD_CONSTANTS.elementName);
      expect(harness.adapter._targetElement).to.equal(textField);
    });

    it('should not use existing toggle element if provided', async () => {
      harness = await TimePickerFixtures.createDetached();

      const textField = document.createElement('forge-text-field');
      textField.appendChild(harness.inputElement);
      harness.component.removeChild(harness.toggleElement);
      harness.component.appendChild(textField);

      const button = document.createElement('forge-icon-button');
      button.setAttribute(TIME_PICKER_CONSTANTS.attributes.TOGGLE, '');
      textField.appendChild(button);

      document.body.appendChild(harness.component);
      await frame();

      expect(harness.adapter._toggleElement).to.equal(button);
    });
  });
});
