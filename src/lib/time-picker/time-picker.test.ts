import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { IPopoverComponent } from '../popover';
import { frame, task } from '../core/utils/utils';
import { ITimePickerAdapter, ITimePickerComponent, ITimePickerCore, ITimePickerOptionValue, mergeDateWithTime, TIME_PICKER_CONSTANTS } from './';

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

  describe('Additional Attribute Tests', () => {
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

    it('should pad leading zero when entering initial hour of 3 or higher', async () => {
      harness = await TimePickerFixtures.createBasic();

      harness.inputElement.value = '3';
      harness.dispatchInput();

      expect(harness.component.value).to.equal('03:00');
      expect(harness.inputElement.value).to.equal('03:');
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
