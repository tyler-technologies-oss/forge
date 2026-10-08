import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { DateTimeInputMask, getDateTimeMaskFormat, type IDateTimeInputMaskOptions } from './date-time-input-mask.js';

// imask applies cursor changes on a 10ms timer, so keys are typed slower than that like a real user
const KEY_DELAY = 25;

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

let mask: DateTimeInputMask | undefined;

function setup(options: IDateTimeInputMaskOptions = {}): HTMLInputElement {
  const input = document.createElement('input');
  document.body.appendChild(input);
  mask = new DateTimeInputMask(input, options);
  input.focus();
  return input;
}

async function type(keys: string): Promise<void> {
  for (const key of keys) {
    await userEvent.keyboard(key);
    await wait(KEY_DELAY);
  }
}

async function select(input: HTMLInputElement, start: number, end: number): Promise<void> {
  input.setSelectionRange(start, end);
  await wait(KEY_DELAY);
}

function paste(input: HTMLInputElement, text: string): void {
  input.value = text;
  input.setSelectionRange(text.length, text.length);
  input.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste', data: text, bubbles: true }));
}

/** Inserts several chars in one `insertText` event, like IME, dictation, or automation tools. */
function insertText(input: HTMLInputElement, text: string): void {
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? start;
  input.value = `${input.value.slice(0, start)}${text}${input.value.slice(end)}`;
  input.setSelectionRange(start + text.length, start + text.length);
  input.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: text, bubbles: true }));
}

describe('DateTimeInputMask', () => {
  afterEach(() => {
    mask?.destroy();
    mask = undefined;
    document.body.querySelectorAll('input').forEach(input => input.remove());
  });

  describe('date portion', () => {
    it('should pad a single month digit greater than 1', async () => {
      const input = setup();
      await type('3');
      expect(input.value).toBe('03/');
    });

    it('should pad the month when a slash follows a single digit', async () => {
      const input = setup();
      await type('1/');
      expect(input.value).toBe('01/');
    });

    it('should pad a single day digit greater than 3', async () => {
      const input = setup();
      await type('1/5');
      expect(input.value).toBe('01/05/');
    });

    it('should add a slash automatically after a two digit month when the format is hidden', async () => {
      const input = setup();
      await type('12');
      expect(input.value).toBe('12/');
    });

    it('should pad the month in the format guide when the format is shown', async () => {
      const input = setup({ showMaskFormat: true });
      await type('3');
      expect(input.value).toBe('03/__/____ __:__ __');
      expect(input.selectionStart).toBe(3);
    });

    it('should pad the month and day with a slash key when the format is shown', async () => {
      const input = setup({ showMaskFormat: true });
      await type('1/2/');
      expect(input.value).toBe('01/02/____ __:__ __');
      expect(input.selectionStart).toBe(6);
    });
  });

  describe('caret placement', () => {
    const steps: [string, string, string, number][] = [
      ['3', '03/', '03/__/____ __:__ __', 3],
      ['1', '03/1', '03/1_/____ __:__ __', 4],
      ['5', '03/15/', '03/15/____ __:__ __', 6],
      ['2026', '03/15/2026', '03/15/2026 __:__ __', 10],
      ['9', '03/15/2026 09:', '03/15/2026 09:__ __', 13],
      ['3', '03/15/2026 09:03 ', '03/15/2026 09:03 __', 16],
      ['0', '03/15/2026 09:30 ', '03/15/2026 09:30 __', 16],
      ['a', '03/15/2026 09:30 A', '03/15/2026 09:30 A_', 18],
      ['m', '03/15/2026 09:30 AM', '03/15/2026 09:30 AM', 19]
    ];

    for (const showMaskFormat of [false, true]) {
      it(`should place the caret after each auto-pad when showMaskFormat is ${showMaskFormat}`, async () => {
        const input = setup({ showMaskFormat });
        for (const [keys, lazyValue, guideValue, caret] of steps) {
          await type(keys);
          expect(input.value, `after ${keys}`).toBe(showMaskFormat ? guideValue : lazyValue);
          expect(input.selectionStart, `caret after ${keys}`).toBe(caret);
        }
      });

      it(`should enter a full value typed one key at a time when showMaskFormat is ${showMaskFormat}`, async () => {
        const input = setup({ showMaskFormat });
        await type('3152026930a');
        expect(input.value).toBe(showMaskFormat ? '03/15/2026 09:30 A_' : '03/15/2026 09:30 A');
        await type('m');
        expect(input.value).toBe('03/15/2026 09:30 AM');
      });

      it(`should place the caret after the slash when padding with a slash key when showMaskFormat is ${showMaskFormat}`, async () => {
        const input = setup({ showMaskFormat });
        await type('1/');
        expect(input.selectionStart).toBe(3);
        await type('2/');
        expect(input.selectionStart).toBe(6);
      });

      it(`should type at human speed without misplacing chars when showMaskFormat is ${showMaskFormat}`, async () => {
        const input = setup({ showMaskFormat });
        for (const key of '3152026930am') {
          await userEvent.keyboard(key);
          await wait(150);
        }
        expect(input.value).toBe('03/15/2026 09:30 AM');
      });
    }
  });

  describe('continuing into time', () => {
    it('should move into the time portion after the year without an extra key', async () => {
      const input = setup();
      await type('010220255');
      expect(input.value).toBe('01/02/2025 05:');
      expect(input.selectionStart).toBe(13);
    });

    it('should skip over the separator when a space is typed', async () => {
      const input = setup();
      await type('01022025 5');
      expect(input.value).toBe('01/02/2025 05:');
    });

    it('should move into the time portion when the format is shown', async () => {
      const input = setup({ showMaskFormat: true });
      await type('010220255');
      expect(input.value).toBe('01/02/2025 05:__ __');
    });
  });

  describe('time portion', () => {
    it('should combine two hour digits', async () => {
      const input = setup();
      await type('0102202512');
      expect(input.value).toBe('01/02/2025 12:');
    });

    it('should pad a single hour digit when a colon is typed', async () => {
      const input = setup();
      await type('010220251:');
      expect(input.value).toBe('01/02/2025 01:');
    });

    it('should pad a single minute digit', async () => {
      const input = setup();
      await type('0102202512:5');
      expect(input.value).toBe('01/02/2025 12:05 ');
    });

    it('should not combine hour digits above 12 in 12 hour time', async () => {
      const input = setup();
      await type('0102202523');
      expect(input.value).toBe('01/02/2025 02:03 ');
    });

    it('should accept a meridiem and uppercase it', async () => {
      const input = setup();
      await type('01022025530pm');
      expect(input.value).toBe('01/02/2025 05:30 PM');
    });

    it('should accept an AM meridiem', async () => {
      const input = setup();
      await type('01022025930am');
      expect(input.value).toBe('01/02/2025 09:30 AM');
    });

    it('should combine hour digits up to 23 in 24 hour time', async () => {
      const input = setup({ use24HourTime: true });
      await type('0102202523');
      expect(input.value).toBe('01/02/2025 23:');
    });

    it('should not combine hour digits above 23 in 24 hour time', async () => {
      const input = setup({ use24HourTime: true });
      await type('0102202524');
      expect(input.value).toBe('01/02/2025 02:04');
    });

    it('should enter seconds when seconds are shown', async () => {
      const input = setup({ showSeconds: true });
      await type('01022025093015pm');
      expect(input.value).toBe('01/02/2025 09:30:15 PM');
    });

    it('should reset the time when only the time portion is selected and a digit is typed', async () => {
      const input = setup();
      await type('01022025930am');
      await select(input, 11, input.value.length);
      await type('7');
      expect(input.value).toBe('01/02/2025 07:');
    });
  });

  describe('select-all overwrite', () => {
    it('should clear the value and start over in the date portion', async () => {
      const input = setup();
      await type('01022025930am');
      input.select();
      await wait(KEY_DELAY);
      await type('5');
      expect(input.value).toBe('05/');
    });

    it('should start over in the date portion when the format is shown', async () => {
      const input = setup({ showMaskFormat: true });
      await type('01022025930am');
      input.select();
      await wait(KEY_DELAY);
      await type('5');
      expect(input.value).toBe('05/__/____ __:__ __');
    });
  });

  describe('paste', () => {
    it('should fill the whole value', () => {
      const input = setup();
      paste(input, '01/02/2025 09:30 AM');
      expect(input.value).toBe('01/02/2025 09:30 AM');
      expect(mask!.unmaskedValue).toBe('01/02/2025 09:30AM');
    });

    it('should uppercase a pasted meridiem', () => {
      const input = setup();
      paste(input, '01/02/2025 09:30 pm');
      expect(input.value).toBe('01/02/2025 09:30 PM');
    });

    it('should fill a 24 hour value with seconds', () => {
      const input = setup({ use24HourTime: true, showSeconds: true });
      paste(input, '01/02/2025 13:45:10');
      expect(input.value).toBe('01/02/2025 13:45:10');
    });
  });

  describe('multi-char insert', () => {
    for (const letterGuide of [false, true]) {
      for (const showMaskFormat of [false, true]) {
        it(`should fill the value from one insert when letterGuide is ${letterGuide} and showMaskFormat is ${showMaskFormat}`, () => {
          const input = setup({ letterGuide, showMaskFormat });
          input.setSelectionRange(0, 0);
          insertText(input, '122820261045am');
          expect(input.value).toBe('12/28/2026 10:45 AM');
          expect(input.selectionStart).toBe(19);
        });
      }
    }

    it('should continue typing one key at a time after a partial insert', async () => {
      const input = setup({ letterGuide: true, showMaskFormat: true });
      input.setSelectionRange(0, 0);
      insertText(input, '1228');
      expect(input.value).toBe('12/28/YYYY hh:mm aa');
      await select(input, 6, 6);
      await type('2026');
      expect(input.value).toBe('12/28/2026 hh:mm aa');
    });
  });

  describe('datePart and timePart', () => {
    it('should return the date and time portions', () => {
      setup();
      mask!.maskedValue = '01/02/2025 09:30 AM';
      expect(mask!.datePart).toBe('01/02/2025');
      expect(mask!.timePart).toBe('09:30 AM');
    });

    it('should return guide chars when the format is shown', () => {
      setup({ showMaskFormat: true });
      expect(mask!.datePart).toBe('__/__/____');
      expect(mask!.timePart).toBe('__:__ __');
    });

    it('should replace the date and keep the time', () => {
      setup();
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.datePart = '12/31/2024';
      expect(mask!.maskedValue).toBe('12/31/2024 09:30 AM');
    });

    it('should replace the time and keep the date', () => {
      setup();
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.timePart = '11:15 pm';
      expect(mask!.maskedValue).toBe('01/02/2025 11:15 PM');
    });

    it('should set only the date when there is no time', () => {
      setup();
      mask!.datePart = '01/02/2025';
      expect(mask!.maskedValue).toBe('01/02/2025');
    });

    it('should clear the time and keep the date', () => {
      setup();
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.timePart = '';
      expect(mask!.maskedValue).toBe('01/02/2025');
    });

    it('should keep the time when replacing the date with the format shown', () => {
      setup({ showMaskFormat: true });
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.datePart = '03/04/2026';
      expect(mask!.maskedValue).toBe('03/04/2026 09:30 AM');
    });

    it('should drop the time when the date is incomplete', () => {
      setup({ showMaskFormat: true });
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.datePart = '01/0_/____';
      expect(mask!.maskedValue).toBe('01/0_/____ __:__ __');
    });

    it('should keep a 24 hour time when replacing the date', () => {
      setup({ use24HourTime: true });
      mask!.maskedValue = '01/02/2025 13:45';
      mask!.datePart = '03/04/2026';
      expect(mask!.maskedValue).toBe('03/04/2026 13:45');
    });
  });

  describe('setShowMaskFormat', () => {
    it('should show the format guide and keep the caret', async () => {
      const input = setup();
      await type('0102');
      await select(input, 2, 2);
      mask!.setShowMaskFormat(true);
      expect(input.value).toBe('01/02/____ __:__ __');
      expect(input.selectionStart).toBe(2);
      expect(input.selectionEnd).toBe(2);
    });

    it('should hide the format guide and keep the caret', async () => {
      const input = setup({ showMaskFormat: true });
      await type('0102');
      await select(input, 3, 3);
      mask!.setShowMaskFormat(false);
      expect(input.value).toBe('01/02/');
      expect(input.selectionStart).toBe(3);
    });
  });

  describe('onChange', () => {
    it('should be called with the masked value when the value changes', async () => {
      const onChange = vi.fn();
      setup({ onChange });
      await type('3');
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith('03/');
    });

    it('should not be called after destroy', async () => {
      const onChange = vi.fn();
      setup({ onChange });
      mask!.destroy();
      mask = undefined;
      await type('3');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('letter guide', () => {
    const steps: [string, string, number][] = [
      ['3', '03/DD/YYYY hh:mm aa', 3],
      ['1', '03/1D/YYYY hh:mm aa', 4],
      ['5', '03/15/YYYY hh:mm aa', 6],
      ['2026', '03/15/2026 hh:mm aa', 10],
      ['9', '03/15/2026 09:mm aa', 13],
      ['3', '03/15/2026 09:03 aa', 16],
      ['0', '03/15/2026 09:30 aa', 16],
      ['a', '03/15/2026 09:30 AM', 19],
      ['m', '03/15/2026 09:30 AM', 19]
    ];

    it('should show the format letters when the format is shown', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      expect(input.value).toBe('MM/DD/YYYY hh:mm aa');
    });

    it('should show 24 hour and seconds letters for those options', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true, use24HourTime: true, showSeconds: true });
      expect(input.value).toBe('MM/DD/YYYY HH:mm:ss');
    });

    it('should show the meridiem letters with seconds in 12 hour time', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true, showSeconds: true });
      expect(input.value).toBe('MM/DD/YYYY hh:mm:ss aa');
    });

    it('should place the caret after each auto-pad when letterGuide is on', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      for (const [keys, value, caret] of steps) {
        await type(keys);
        expect(input.value, `after ${keys}`).toBe(value);
        expect(input.selectionStart, `caret after ${keys}`).toBe(caret);
      }
    });

    it('should show typed digits followed by the remaining letters', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('122');
      expect(input.value).toBe('12/2D/YYYY hh:mm aa');
    });

    it('should restore the letter when a digit is deleted with Backspace', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('122');
      await userEvent.keyboard('{Backspace}');
      await wait(KEY_DELAY);
      expect(input.value).toBe('12/DD/YYYY hh:mm aa');
    });

    it('should hide the letters when the format is hidden', async () => {
      const input = setup({ letterGuide: true });
      await type('122');
      expect(input.value).toBe('12/2');
    });

    it('should read unfilled slots as underscores', async () => {
      setup({ showMaskFormat: true, letterGuide: true });
      expect(mask!.normalizedValue).toBe('__/__/____ __:__ __');
      expect(mask!.datePart).toBe('__/__/____');
      expect(mask!.timePart).toBe('__:__ __');
      await type('122');
      expect(mask!.datePart).toBe('12/2_/____');
    });

    it('should not read a typed meridiem as the guide', async () => {
      setup({ showMaskFormat: true, letterGuide: true });
      await type('01022025930a');
      expect(mask!.timePart).toBe('09:30 AM');
    });

    it.each([
      ['a', '01/02/2026 10:45 AM'],
      ['A', '01/02/2026 10:45 AM'],
      ['p', '01/02/2026 10:45 PM'],
      ['P', '01/02/2026 10:45 PM']
    ])('should fill the whole meridiem when %s is typed', async (key, expected) => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type(`010220261045${key}`);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(19);
    });

    it('should fill the whole meridiem when the format is hidden', async () => {
      const input = setup({ letterGuide: true });
      await type('010220261045p');
      expect(input.value).toBe('01/02/2026 10:45 PM');
    });

    it('should ignore an m typed after the filled meridiem', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('010220261045pm');
      expect(input.value).toBe('01/02/2026 10:45 PM');
      expect(input.selectionStart).toBe(19);
    });

    it('should replace an existing meridiem when a or p is typed over it', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('010220261045a');
      await select(input, 17, 17);
      await type('p');
      expect(input.value).toBe('01/02/2026 10:45 PM');
      await select(input, 17, 19);
      await type('a');
      expect(input.value).toBe('01/02/2026 10:45 AM');
    });

    it.each([
      ['010220261045p', '01/02/2026 10:45 PM'],
      ['01/02/2026 10:45 pm', '01/02/2026 10:45 PM'],
      ['01/02/2026 10:45a', '01/02/2026 10:45 AM']
    ])('should fill the whole meridiem when %s is inserted at once', (text, expected) => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      input.setSelectionRange(0, 0);
      insertText(input, text);
      expect(input.value).toBe(expected);
    });

    it('should fill the whole meridiem when a value with a lone meridiem letter is pasted', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      paste(input, '01/02/2026 10:45 p');
      expect(input.value).toBe('01/02/2026 10:45 PM');
    });

    it('should not add a meridiem in 24 hour time', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true, use24HourTime: true });
      await type('010220261045a');
      expect(input.value).toBe('01/02/2026 10:45');
    });

    it('should drop the time when the date is incomplete', () => {
      setup({ showMaskFormat: true, letterGuide: true });
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.datePart = '01/0_/____';
      expect(mask!.maskedValue).toBe('01/0D/YYYY hh:mm aa');
    });

    it('should keep the time when replacing the date', () => {
      setup({ showMaskFormat: true, letterGuide: true });
      mask!.maskedValue = '01/02/2025 09:30 AM';
      mask!.datePart = '03/04/2026';
      expect(mask!.maskedValue).toBe('03/04/2026 09:30 AM');
    });

    it('should not set a meridiem when the guide is hidden after a partial time', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('010220261030');
      expect(input.value).toBe('01/02/2026 10:30 aa');
      mask!.setShowMaskFormat(false);
      expect(input.value.trimEnd()).toBe('01/02/2026 10:30');
      expect(mask!.timePart.trimEnd()).toBe('10:30');
      mask!.setShowMaskFormat(true);
      expect(input.value).toBe('01/02/2026 10:30 aa');
    });

    it('should keep a typed meridiem when the guide is toggled', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('010220261030p');
      mask!.setShowMaskFormat(false);
      expect(input.value).toBe('01/02/2026 10:30 PM');
      mask!.setShowMaskFormat(true);
      expect(input.value).toBe('01/02/2026 10:30 PM');
    });

    it('should not set a meridiem when a display string with guide letters is set', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      mask!.maskedValue = '01/02/2026 10:30 aa';
      expect(input.value).toBe('01/02/2026 10:30 aa');
      expect(mask!.timePart).toBe('10:30 __');
      mask!.maskedValue = '01/02/2026 10:30 Aa';
      expect(mask!.timePart).toBe('10:30 AM');
    });

    it('should keep a lowercase meridiem that is set programmatically', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      mask!.maskedValue = '01/02/2026 10:30 am';
      expect(input.value).toBe('01/02/2026 10:30 AM');
    });

    it('should show the letters and keep the caret when the guide is toggled on', async () => {
      const input = setup({ letterGuide: true });
      await type('0102');
      await select(input, 2, 2);
      mask!.setShowMaskFormat(true);
      expect(input.value).toBe('01/02/YYYY hh:mm aa');
      expect(input.selectionStart).toBe(2);
    });
  });

  describe('getDateTimeMaskFormat', () => {
    it('should return the format for each time option', () => {
      expect(getDateTimeMaskFormat(false, false)).toBe('MM/DD/YYYY hh:mm aa');
      expect(getDateTimeMaskFormat(false, true)).toBe('MM/DD/YYYY hh:mm:ss aa');
      expect(getDateTimeMaskFormat(true, false)).toBe('MM/DD/YYYY HH:mm');
      expect(getDateTimeMaskFormat(true, true)).toBe('MM/DD/YYYY HH:mm:ss');
    });
  });
});
