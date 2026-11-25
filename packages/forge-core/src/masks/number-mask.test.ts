import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { applyNumberMask, NumberMaskOptions, sanitizeNumberMaskValue } from './number-mask.js';

describe('number mask', () => {
  let input: HTMLInputElement;
  let removeMask: () => void;

  const mask = (options?: NumberMaskOptions): void => {
    removeMask?.();
    removeMask = applyNumberMask(input, options);
  };

  const typeText = (data: string, inputType = 'insertText'): boolean => {
    const evt = new InputEvent('beforeinput', { data, inputType, cancelable: true, bubbles: true });
    input.dispatchEvent(evt);
    if (!evt.defaultPrevented) {
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      input.setRangeText(data, start, end, 'end');
      input.dispatchEvent(new InputEvent('input', { data, inputType, bubbles: true }));
    }
    return !evt.defaultPrevented;
  };

  const typeAll = (text: string): void => {
    for (const char of text) {
      typeText(char);
    }
  };

  const pressDelete = (inputType: string): boolean => {
    const evt = new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true });
    input.dispatchEvent(evt);
    return evt.defaultPrevented;
  };

  const commit = (): void => {
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  beforeEach(() => {
    input = document.createElement('input');
    input.type = 'text';
    document.body.append(input);
    mask();
  });

  afterEach(() => {
    removeMask();
    input.remove();
  });

  describe('defaults', () => {
    it('should allow digits when typing', () => {
      typeText('1');
      typeText('2');
      expect(input.value).toBe('12');
    });

    it('should prevent non-numeric characters when typing', () => {
      typeText('1');
      expect(typeText('a')).toBe(false);
      expect(typeText('$')).toBe(false);
      expect(typeText(' ')).toBe(false);
      expect(input.value).toBe('1');
    });

    it('should allow a decimal point after a digit', () => {
      typeText('1');
      expect(typeText('.')).toBe(true);
      typeText('5');
      expect(input.value).toBe('1.5');
    });

    it('should prevent a decimal point when there is no preceding digit', () => {
      expect(typeText('.')).toBe(false);
      expect(input.value).toBe('');
    });

    it('should prevent a second decimal point', () => {
      typeText('1');
      typeText('.');
      expect(typeText('.')).toBe(false);
      typeText('5');
      expect(typeText('.')).toBe(false);
      expect(input.value).toBe('1.5');
    });

    it('should allow pasting a valid number', () => {
      expect(typeText('12.34', 'insertFromPaste')).toBe(true);
      expect(input.value).toBe('12.34');
    });

    it('should prevent pasting an invalid value', () => {
      expect(typeText('$1,234.00', 'insertFromPaste')).toBe(false);
      expect(input.value).toBe('');
    });

    it('should allow replacing a selection with valid input', () => {
      input.value = '1.5';
      input.setSelectionRange(0, 3);
      expect(typeText('7')).toBe(true);
      expect(input.value).toBe('7');
    });

    it('should sanitize the value when it becomes invalid without a cancelable event', () => {
      input.value = 'a1b.2.3';
      input.dispatchEvent(new InputEvent('input', { inputType: 'insertReplacementText', bubbles: true }));
      expect(input.value).toBe('1.23');
    });

    it('should sanitize a leading decimal point left behind by deleting the preceding digit', () => {
      input.value = '.5';
      input.dispatchEvent(new InputEvent('input', { inputType: 'deleteContentBackward', bubbles: true }));
      expect(input.value).toBe('5');
    });

    it('should remove a trailing radix character when committed', () => {
      typeAll('12.');
      commit();
      expect(input.value).toBe('12');
    });

    it('should clear a lone minus character when committed', () => {
      mask({ min: -10 });
      typeText('-');
      commit();
      expect(input.value).toBe('');
    });

    it('should stop masking when removed', () => {
      removeMask();
      expect(typeText('a')).toBe(true);
      expect(input.value).toBe('a');
    });
  });

  describe('min', () => {
    it('should allow a leading minus character when min is not set', () => {
      expect(typeText('-')).toBe(true);
      typeText('5');
      expect(input.value).toBe('-5');
    });

    it('should not limit negative numbers when min is not set', () => {
      typeAll('-999999999');
      expect(input.value).toBe('-999999999');
    });

    it('should not allow a minus character when min is zero or greater', () => {
      mask({ min: 0 });
      expect(typeText('-')).toBe(false);
    });

    it('should allow a leading minus character when min is less than zero', () => {
      mask({ min: -10 });
      expect(typeText('-')).toBe(true);
      typeText('5');
      expect(input.value).toBe('-5');
    });

    it('should prevent a minus character that is not leading', () => {
      mask({ min: -10 });
      typeText('5');
      expect(typeText('-')).toBe(false);
      expect(input.value).toBe('5');
    });

    it('should prevent a second minus character', () => {
      mask({ min: -10 });
      typeText('-');
      expect(typeText('-')).toBe(false);
    });

    it('should prevent a decimal point directly after a minus character', () => {
      mask({ min: -10 });
      typeText('-');
      expect(typeText('.')).toBe(false);
    });

    it('should prevent typing a negative number below min', () => {
      mask({ min: -10 });
      typeAll('-1');
      expect(typeText('1')).toBe(false);
      expect(input.value).toBe('-1');
    });

    it('should allow typing a number below min when it is not negative', () => {
      mask({ min: 10 });
      expect(typeText('5')).toBe(true);
      expect(input.value).toBe('5');
    });

    it('should raise the value to min when committed', () => {
      mask({ min: 10 });
      typeText('5');
      commit();
      expect(input.value).toBe('10');
    });

    it('should raise a negative value to min when committed', () => {
      mask({ min: -2.5 });
      input.value = '-9';
      commit();
      expect(input.value).toBe('-2.5');
    });
  });

  describe('max', () => {
    it('should prevent typing a number above max', () => {
      mask({ max: 100 });
      typeAll('10');
      expect(typeText('1')).toBe(false);
      expect(input.value).toBe('10');
    });

    it('should allow typing a number equal to max', () => {
      mask({ max: 100 });
      typeAll('100');
      expect(input.value).toBe('100');
    });

    it('should prevent pasting a number above max', () => {
      mask({ max: 100 });
      expect(typeText('101', 'insertFromPaste')).toBe(false);
    });

    it('should lower the value to max when committed', () => {
      mask({ max: 100 });
      input.value = '250';
      commit();
      expect(input.value).toBe('100');
    });
  });

  describe('fractionalDigits', () => {
    it('should prevent more fractional digits than allowed', () => {
      mask({ fractionalDigits: 2 });
      typeAll('1.23');
      expect(typeText('4')).toBe(false);
      expect(input.value).toBe('1.23');
    });

    it('should still allow integer digits after the limit is reached', () => {
      mask({ fractionalDigits: 1 });
      typeAll('1.2');
      input.setSelectionRange(0, 0);
      expect(typeText('3')).toBe(true);
      expect(input.value).toBe('31.2');
    });

    it('should not allow the radix character when zero', () => {
      mask({ fractionalDigits: 0 });
      typeText('1');
      expect(typeText('.')).toBe(false);
      expect(input.value).toBe('1');
    });

    it('should truncate at the radix character when sanitizing and zero', () => {
      expect(sanitizeNumberMaskValue('1.5', { fractionalDigits: 0 })).toBe('1');
    });
  });

  describe('padFractionalZeros', () => {
    it('should pad zeros after the radix character when committed', () => {
      mask({ fractionalDigits: 3, padFractionalZeros: true });
      typeAll('5.1');
      expect(input.value).toBe('5.1');
      commit();
      expect(input.value).toBe('5.100');
    });

    it('should add the radix character and zeros when there are no fractional digits', () => {
      mask({ fractionalDigits: 2, padFractionalZeros: true });
      typeText('5');
      commit();
      expect(input.value).toBe('5.00');
    });

    it('should not pad an empty value', () => {
      mask({ fractionalDigits: 2, padFractionalZeros: true });
      commit();
      expect(input.value).toBe('');
    });

    it('should not pad when fractionalDigits is zero or not set', () => {
      mask({ padFractionalZeros: true });
      typeText('5');
      commit();
      expect(input.value).toBe('5');

      mask({ fractionalDigits: 0, padFractionalZeros: true });
      commit();
      expect(input.value).toBe('5');
    });

    it('should pad the initial value when the mask is applied', () => {
      input.value = '7';
      mask({ fractionalDigits: 2, padFractionalZeros: true });
      expect(input.value).toBe('7.00');
    });

    it('should expose the committed value to change listeners added after the mask', () => {
      mask({ fractionalDigits: 2, padFractionalZeros: true });
      let valueSeen = '';
      input.addEventListener('change', () => (valueSeen = input.value));
      typeText('5');
      commit();
      expect(valueSeen).toBe('5.00');
    });
  });

  describe('thousandsSeparator', () => {
    beforeEach(() => mask({ thousandsSeparator: ',' }));

    it('should insert separators as digits are typed', () => {
      typeAll('1234567');
      expect(input.value).toBe('1,234,567');
      expect(input.selectionStart).toBe(input.value.length);
    });

    it('should not group fractional digits', () => {
      typeAll('1234.5678');
      expect(input.value).toBe('1,234.5678');
    });

    it('should group digits after a minus character', () => {
      mask({ min: -1e9, thousandsSeparator: ',' });
      typeAll('-1234');
      expect(input.value).toBe('-1,234');
    });

    it('should keep the caret next to the typed digit when inserting in the middle', () => {
      input.value = '1,234';
      input.setSelectionRange(3, 3);
      typeText('9');
      expect(input.value).toBe('12,934');
      expect(input.selectionStart).toBe(4);
    });

    it('should allow pasting a value that contains separators', () => {
      expect(typeText('1,234.5', 'insertFromPaste')).toBe(true);
      expect(input.value).toBe('1,234.5');
    });

    it('should skip over a separator when deleting backward', () => {
      input.value = '1,234';
      input.setSelectionRange(2, 2);
      expect(pressDelete('deleteContentBackward')).toBe(true);
      expect(input.selectionStart).toBe(1);
      expect(input.value).toBe('1,234');
    });

    it('should skip over a separator when deleting forward', () => {
      input.value = '1,234';
      input.setSelectionRange(1, 1);
      expect(pressDelete('deleteContentForward')).toBe(true);
      expect(input.selectionStart).toBe(2);
    });

    it('should not interfere with deleting a digit', () => {
      input.value = '1,234';
      input.setSelectionRange(3, 3);
      expect(pressDelete('deleteContentBackward')).toBe(false);
    });

    it('should apply max to the value without separators', () => {
      mask({ max: 1000, thousandsSeparator: ',' });
      typeAll('1000');
      expect(typeText('0')).toBe(false);
      expect(input.value).toBe('1,000');
    });

    it('should group the initial value when the mask is applied', () => {
      input.value = '1234567';
      mask({ thousandsSeparator: ',' });
      expect(input.value).toBe('1,234,567');
    });

    it('should remove separators when sanitizing', () => {
      expect(sanitizeNumberMaskValue('1,234.5', { thousandsSeparator: ',' })).toBe('1234.5');
    });
  });

  describe('radix', () => {
    it('should use a custom radix character', () => {
      mask({ radix: ',' });
      typeText('1');
      expect(typeText('.')).toBe(false);
      expect(typeText(',')).toBe(true);
      typeText('5');
      expect(input.value).toBe('1,5');
    });

    it('should work with a thousands separator that is the default radix', () => {
      mask({ radix: ',', thousandsSeparator: '.' });
      typeAll('1234,56');
      expect(input.value).toBe('1.234,56');
    });

    it('should pad zeros using a custom radix character', () => {
      mask({ radix: ',', fractionalDigits: 2, padFractionalZeros: true });
      typeText('5');
      commit();
      expect(input.value).toBe('5,00');
    });

    it('should throw when the thousands separator and radix are the same', () => {
      expect(() => mask({ radix: ',', thousandsSeparator: ',' })).toThrow();
    });
  });

  describe('sanitizeNumberMaskValue', () => {
    it('should return an empty string when there are no digits', () => {
      expect(sanitizeNumberMaskValue('abc.')).toBe('');
    });

    it('should keep only the first decimal point that follows a digit', () => {
      expect(sanitizeNumberMaskValue('..1.2.3')).toBe('1.23');
    });
  });
});
