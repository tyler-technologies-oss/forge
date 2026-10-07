import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { DateInputMask, DEFAULT_DATE_MASK, type IDateInputMaskOptions } from './date-input-mask.js';

// imask applies cursor changes on a 10ms timer, so keys are typed slower than that like a real user
const KEY_DELAY = 25;

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

let mask: DateInputMask | undefined;

function setup(options: IDateInputMaskOptions = {}): HTMLInputElement {
  const input = document.createElement('input');
  document.body.appendChild(input);
  mask = new DateInputMask(input, { pattern: DEFAULT_DATE_MASK, ...options });
  input.focus();
  return input;
}

async function type(keys: string): Promise<void> {
  for (const key of keys) {
    await userEvent.keyboard(key);
    await wait(KEY_DELAY);
  }
}

describe('DateInputMask', () => {
  afterEach(() => {
    mask?.destroy();
    mask = undefined;
    document.body.querySelectorAll('input').forEach(input => input.remove());
  });

  describe('when the format is hidden', () => {
    it.each([
      ['3', '03/', 3],
      ['1/', '01/', 3],
      ['12', '12/', 3],
      ['125', '12/05/', 6],
      ['1/5', '01/05/', 6],
      ['34', '03/04/', 6],
      ['1/12/', '01/12/', 6],
      ['01022025', '01/02/2025', 10],
      ['1/4/2025', '01/04/2025', 10]
    ])('should produce the expected value when typing %s', async (keys, expected, caret) => {
      const input = setup({ showMaskFormat: false });
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });
  });

  describe('when the format is shown', () => {
    it.each([
      ['3', '03/__/____', 3],
      ['1/', '01/__/____', 3],
      ['12', '12/__/____', 3],
      ['125', '12/05/____', 6],
      ['34', '03/04/____', 6],
      ['01022025', '01/02/2025', 10]
    ])('should produce the expected value when typing %s', async (keys, expected, caret) => {
      const input = setup({ showMaskFormat: true });
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });
  });

  describe('letter guide', () => {
    it.each([
      ['3', '03/DD/YYYY', 3],
      ['12', '12/DD/YYYY', 3],
      ['125', '12/05/YYYY', 6],
      ['01022025', '01/02/2025', 10]
    ])('should show the remaining format letters after typing %s', async (keys, expected, caret) => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type(keys);
      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(caret);
    });

    it('should show the format letters without the default prepare logic', async () => {
      const input = setup({ pattern: undefined, showMaskFormat: true, letterGuide: true });
      await type('122');
      expect(input.value).toBe('12/2D/YYYY');
    });

    it('should restore the letter when a digit is deleted with Backspace', async () => {
      const input = setup({ showMaskFormat: true, letterGuide: true });
      await type('122');
      await userEvent.keyboard('{Backspace}');
      await wait(KEY_DELAY);
      expect(input.value).toBe('12/DD/YYYY');
    });

    it('should read unfilled slots as underscores', async () => {
      setup({ showMaskFormat: true, letterGuide: true });
      await type('125');
      expect(mask!.normalizedValue).toBe('12/05/____');
    });

    it('should keep the underscore guide when letterGuide is off', async () => {
      const input = setup({ showMaskFormat: true });
      await type('125');
      expect(input.value).toBe('12/05/____');
      expect(mask!.normalizedValue).toBe('12/05/____');
    });
  });

  it('should start over when all text is selected and a digit is typed', async () => {
    const input = setup({ showMaskFormat: false });
    await type('01022025');
    input.select();
    await wait(KEY_DELAY);
    await type('5');
    expect(input.value).toBe('05/');
  });
});
