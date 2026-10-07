import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { TimeInputMask, type ITimeInputMaskOptions } from './time-input-mask.js';

// imask applies cursor changes on a 10ms timer, so keys are typed slower than that like a real user
const KEY_DELAY = 25;

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

let mask: TimeInputMask | undefined;

function setup(options: ITimeInputMaskOptions = {}): HTMLInputElement {
  const input = document.createElement('input');
  document.body.appendChild(input);
  mask = new TimeInputMask(input, options);
  input.focus();
  return input;
}

async function type(keys: string): Promise<void> {
  for (const key of keys) {
    await userEvent.keyboard(key);
    await wait(KEY_DELAY);
  }
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

describe('TimeInputMask', () => {
  afterEach(() => {
    mask?.destroy();
    mask = undefined;
    document.body.querySelectorAll('input').forEach(input => input.remove());
  });

  describe('12 hour time', () => {
    it.each([
      ['5', '05:', 2],
      ['12', '12:', 3],
      ['1:', '01:', 3],
      ['23', '02:03 ', 5],
      ['12:5', '12:05 ', 5],
      ['930', '09:30 ', 5],
      ['0930p', '09:30 P', 7],
      ['530p', '05:30 P', 7],
      ['0', '0', 1]
    ])('should produce the expected value when typing %s', async (keys, expected, caret) => {
      const input = setup();
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });

    it.each([
      ['5', '05:__ __'],
      ['12', '12:__ __'],
      ['0930p', '09:30 P_']
    ])('should produce the expected value when typing %s with the format shown', async (keys, expected) => {
      const input = setup({ showMaskFormat: true });
      await type(keys);
      expect(input.value).toBe(expected);
    });
  });

  describe('24 hour time', () => {
    it.each([
      ['23', '23:', 3],
      ['24', '02:04', 5],
      ['19', '19:', 3],
      ['0930p', '09:30', 5]
    ])('should produce the expected value when typing %s', async (keys, expected, caret) => {
      const input = setup({ use24HourTime: true });
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });
  });

  describe('with seconds', () => {
    it.each([
      ['093015p', '09:30:15 P', 10],
      ['5:3:', '05:03:', 6],
      ['12:5', '12:05:', 5]
    ])('should produce the expected value when typing %s', async (keys, expected, caret) => {
      const input = setup({ showSeconds: true });
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });
  });

  describe('letter guide', () => {
    it.each([
      [{}, '5', '05:mm aa'],
      [{}, '12', '12:mm aa'],
      [{}, '0930p', '09:30 Pa'],
      [{ use24HourTime: true }, '23', '23:mm'],
      [{ showSeconds: true }, '5', '05:mm:ss aa'],
      [{ use24HourTime: true, showSeconds: true }, '0930', '09:30:ss']
    ])('should show the remaining format letters with options %o after typing %s', async (options, keys, expected) => {
      const input = setup({ ...options, showMaskFormat: true, letterGuide: true });
      await type(keys);
      expect(input.value).toBe(expected);
    });

    it('should restore the letter when a digit is deleted with Backspace', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('930');
      await userEvent.keyboard('{Backspace}');
      await wait(KEY_DELAY);
      expect(input.value).toBe('09:3m aa');
    });

    it('should read unfilled slots as underscores', async () => {
      setup({ showMaskFormat: true, letterGuide: true });
      await type('0930p');
      expect(mask!.normalizedValue).toBe('09:30 P_');
    });

    it('should uppercase a pasted meridiem so it is not read as the guide', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      paste(input, '09:30 pm');
      expect(input.value).toBe('09:30 PM');
      expect(mask!.normalizedValue).toBe('09:30 PM');
    });

    it('should not set a meridiem when the guide is hidden after a partial time', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('1030');
      expect(input.value).toBe('10:30 aa');
      mask!.setShowMaskFormat(false);
      expect(input.value.trimEnd()).toBe('10:30');
      mask!.setShowMaskFormat(true);
      expect(input.value).toBe('10:30 aa');
    });

    it('should keep a typed meridiem when the guide is toggled', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('1030p');
      mask!.setShowMaskFormat(false);
      expect(input.value).toBe('10:30 P');
    });

    it('should not set a meridiem when a display string with guide letters is set', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      mask!.maskedValue = '10:30 aa';
      expect(input.value).toBe('10:30 aa');
      expect(mask!.normalizedValue).toBe('10:30 __');
    });

    it('should fill the value from one multi-char insert', () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      input.setSelectionRange(0, 0);
      insertText(input, '0530pm');
      expect(input.value).toBe('05:30 PM');
    });

    it('should keep the underscore guide when letterGuide is off', async () => {
      const input = setup({ showMaskFormat: true });
      await type('5');
      expect(input.value).toBe('05:__ __');
      expect(mask!.normalizedValue).toBe('05:__ __');
    });
  });

  it('should reset the pad state when all text is selected and a digit is typed', async () => {
    const input = setup({ use24HourTime: true });
    await type('0930');
    input.select();
    await wait(KEY_DELAY);
    await type('7');
    expect(input.value).toBe('07:');
  });

  it('should not run the typing logic on paste', () => {
    const input = setup();
    paste(input, '1111');
    expect(input.value).toBe('11:11');
  });
});
