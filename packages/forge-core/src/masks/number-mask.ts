export interface NumberMaskOptions {
  /** The minimum value. When less than zero, a leading minus character is allowed. Defaults to `-Infinity`. */
  min?: number;
  /** The maximum value. Defaults to `Infinity`. */
  max?: number;
  /** The maximum number of digits allowed after the radix character. When `0`, the radix character is not allowed. Defaults to unlimited. */
  fractionalDigits?: number;
  /** Whether to append zeros after the radix character, up to `fractionalDigits`, when the value is committed. */
  padFractionalZeros?: boolean;
  /** A single character used to group the integer digits by thousands. Defaults to no separator. */
  thousandsSeparator?: string;
  /** A single character used as the fractional delimiter. Defaults to `.`. */
  radix?: string;
}

interface ResolvedNumberMaskOptions {
  min: number;
  max: number;
  fractionalDigits?: number;
  padFractionalZeros: boolean;
  thousandsSeparator: string;
  radix: string;
  allowNegative: boolean;
}

const DEFAULT_RADIX = '.';
const MINUS = '-';
const THOUSANDS_GROUP_SIZE = 3;
const INSERT_INPUT_TYPE_PREFIX = 'insert';
const DELETE_INPUT_TYPE_PREFIX = 'delete';
const DELETE_BACKWARD = 'deleteContentBackward';
const DELETE_FORWARD = 'deleteContentForward';

const isDigit = (char: string): boolean => char >= '0' && char <= '9';
const hasDigit = (value: string): boolean => /\d/.test(value);

const resolveOptions = (options: NumberMaskOptions): ResolvedNumberMaskOptions => {
  const { min = -Infinity, max = Infinity, fractionalDigits, padFractionalZeros = false, thousandsSeparator = '', radix = DEFAULT_RADIX } = options;
  if (thousandsSeparator === radix) {
    throw new Error('The thousands separator and radix must be different characters.');
  }
  return { min, max, fractionalDigits, padFractionalZeros, thousandsSeparator, radix, allowNegative: min < 0 };
};

const stripSeparators = (value: string, { thousandsSeparator }: ResolvedNumberMaskOptions): string =>
  thousandsSeparator ? value.split(thousandsSeparator).join('') : value;

const sanitize = (value: string, { allowNegative, fractionalDigits, radix }: ResolvedNumberMaskOptions): string => {
  let result = '';
  let digitSeen = false;
  let radixSeen = false;
  let fractionalCount = 0;

  for (const char of value) {
    if (isDigit(char)) {
      if (radixSeen) {
        if (fractionalDigits !== undefined && fractionalCount >= fractionalDigits) {
          continue;
        }
        fractionalCount++;
      }
      result += char;
      digitSeen = true;
    } else if (char === radix && digitSeen && !radixSeen) {
      if (fractionalDigits === 0) {
        break;
      }
      result += char;
      radixSeen = true;
    } else if (char === MINUS && allowNegative && result === '') {
      result += char;
    }
  }

  return result;
};

const toNumber = (canonical: string, { radix }: ResolvedNumberMaskOptions): number =>
  hasDigit(canonical) ? Number(canonical.replace(radix, DEFAULT_RADIX)) : NaN;

const exceedsRange = (canonical: string, options: ResolvedNumberMaskOptions): boolean => {
  const value = toNumber(canonical, options);
  if (Number.isNaN(value)) {
    return false;
  }
  const { min, max } = options;
  const tooLarge = value >= 0 && value > max;
  const tooSmall = value < 0 && value < min;
  return tooLarge || tooSmall;
};

const groupDigits = (digits: string, separator: string): string => {
  let result = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % THOUSANDS_GROUP_SIZE === 0) {
      result += separator;
    }
    result += digits[i];
  }
  return result;
};

const format = (canonical: string, options: ResolvedNumberMaskOptions): string => {
  const { thousandsSeparator, radix } = options;
  if (!thousandsSeparator) {
    return canonical;
  }
  const sign = canonical.startsWith(MINUS) ? MINUS : '';
  const radixIndex = canonical.indexOf(radix);
  const integer = canonical.slice(sign.length, radixIndex === -1 ? undefined : radixIndex);
  const fraction = radixIndex === -1 ? '' : canonical.slice(radixIndex);
  return `${sign}${groupDigits(integer, thousandsSeparator)}${fraction}`;
};

const clamp = (canonical: string, options: ResolvedNumberMaskOptions): string => {
  const { min, max, radix } = options;
  const value = toNumber(canonical, options);
  const bound = value < min ? min : value > max ? max : undefined;
  return bound === undefined ? canonical : sanitize(String(bound).replace(DEFAULT_RADIX, radix), options);
};

const padFraction = (canonical: string, { padFractionalZeros, fractionalDigits, radix }: ResolvedNumberMaskOptions): string => {
  if (!padFractionalZeros || !fractionalDigits) {
    return canonical;
  }
  const [integer, fraction = ''] = canonical.split(radix);
  return `${integer}${radix}${fraction.padEnd(fractionalDigits, '0')}`;
};

const commit = (value: string, options: ResolvedNumberMaskOptions): string => {
  const canonical = sanitize(stripSeparators(value, options), options);
  if (!hasDigit(canonical)) {
    return '';
  }
  const trimmed = canonical.endsWith(options.radix) ? canonical.slice(0, -1) : canonical;
  return format(padFraction(clamp(trimmed, options), options), options);
};

const caretIndexAfter = (formatted: string, significantCount: number, separator: string): number => {
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (seen === significantCount) {
      return i;
    }
    if (formatted[i] !== separator) {
      seen++;
    }
  }
  return formatted.length;
};

/**
 * Sanitizes a value so that it only contains what the number mask allows. Thousands separators are removed.
 *
 * @param value The value to sanitize.
 * @param options The number mask options.
 */
export const sanitizeNumberMaskValue = (value: string, options: NumberMaskOptions = {}): string => {
  const resolved = resolveOptions(options);
  return sanitize(stripSeparators(value, resolved), resolved);
};

/**
 * Applies a mask to a text input that only allows a number: digits, an optional radix character that
 * must be preceded by at least one digit, and an optional leading minus character.
 *
 * Invalid keystrokes, pastes, and drops are cancelled before they reach the input. Any other change that
 * results in an invalid value (such as autofill, or deleting the digit before the radix character) is sanitized.
 * Thousands separators are inserted as the user types.
 *
 * The value is clamped to `min`/`max` and padded with fractional zeros when it is committed (on `change`).
 * The initial value of the input is committed when the mask is applied.
 *
 * @param input The text input to apply the mask to.
 * @param options The number mask options. These are read once and can't be changed afterwards.
 * @returns A function that removes the mask from the input.
 */
export const applyNumberMask = (input: HTMLInputElement | HTMLTextAreaElement, options: NumberMaskOptions = {}): (() => void) => {
  const resolved = resolveOptions(options);
  const { thousandsSeparator } = resolved;

  const skipSeparator = (evt: Event, inputType: string): void => {
    const { selectionStart, selectionEnd, value } = input;
    if (selectionStart === null || selectionStart !== selectionEnd) {
      return;
    }
    const backward = inputType === DELETE_BACKWARD;
    const forward = inputType === DELETE_FORWARD;
    const adjacent = backward ? value[selectionStart - 1] : forward ? value[selectionStart] : undefined;
    if (adjacent !== thousandsSeparator) {
      return;
    }
    evt.preventDefault();
    const next = selectionStart + (backward ? -1 : 1);
    input.setSelectionRange(next, next);
  };

  const onBeforeInput = (evt: Event): void => {
    const { inputType, data: inputData, dataTransfer } = evt as InputEvent;

    if (inputType.startsWith(DELETE_INPUT_TYPE_PREFIX)) {
      if (thousandsSeparator) {
        skipSeparator(evt, inputType);
      }
      return;
    }

    if (!inputType.startsWith(INSERT_INPUT_TYPE_PREFIX)) {
      return;
    }

    const data = inputData ?? dataTransfer?.getData('text/plain') ?? '';
    if (!data) {
      return;
    }

    const { value } = input;
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const candidate = stripSeparators(`${value.slice(0, start)}${data}${value.slice(end)}`, resolved);

    if (sanitize(candidate, resolved) !== candidate || exceedsRange(candidate, resolved)) {
      evt.preventDefault();
    }
  };

  const onInput = (): void => {
    const { value } = input;
    const formatted = format(sanitize(stripSeparators(value, resolved), resolved), resolved);
    if (formatted === value) {
      return;
    }

    const caret = input.selectionStart ?? value.length;
    const significantCount = sanitize(stripSeparators(value.slice(0, caret), resolved), resolved).length;
    input.value = formatted;
    const nextCaret = caretIndexAfter(formatted, significantCount, thousandsSeparator);
    input.setSelectionRange(nextCaret, nextCaret);
  };

  const onChange = (): void => {
    const committed = commit(input.value, resolved);
    if (committed !== input.value) {
      input.value = committed;
    }
  };

  input.value = commit(input.value, resolved);
  input.addEventListener('beforeinput', onBeforeInput);
  input.addEventListener('input', onInput);
  input.addEventListener('change', onChange, { capture: true });

  return () => {
    input.removeEventListener('beforeinput', onBeforeInput);
    input.removeEventListener('input', onInput);
    input.removeEventListener('change', onChange, { capture: true });
  };
};
