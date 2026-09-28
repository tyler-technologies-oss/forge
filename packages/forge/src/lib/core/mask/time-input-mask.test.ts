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
