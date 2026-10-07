import type { FactoryArg } from 'imask';

export const UNDERSCORE_GUIDE_CHAR = '_';
export const MERIDIEM_GUIDE_CHAR = 'a';

const DIGIT_SLOT = '0';
const PATTERN_CONTROL_CHARS = '`{}';
const GUIDE_LETTER = /^[a-z]$/i;
// Single-char definition keys that can't collide with block names such as the meridiem `A`/`M`.
const DEFINITION_KEYS = '123456789';

export interface ILetterGuideMask {
  mask: string;
  definitions: Record<string, FactoryArg>;
}

/** Maps each `0` slot of `pattern` to a digit definition whose placeholder is its `format` letter. */
export function createLetterGuideMask(pattern: string, format: string): ILetterGuideMask {
  const keys = new Map<string, string>();
  const definitions: Record<string, FactoryArg> = {};
  let position = 0;
  let mask = '';
  for (const char of pattern) {
    if (PATTERN_CONTROL_CHARS.includes(char)) {
      mask += char;
      continue;
    }
    if (char === DIGIT_SLOT) {
      const letter = format[position];
      let key = keys.get(letter);
      if (!key) {
        key = DEFINITION_KEYS[keys.size];
        if (!key) {
          throw new Error(`A letter guide supports at most ${DEFINITION_KEYS.length} distinct letters.`);
        }
        keys.set(letter, key);
        definitions[key] = { mask: /\d/, placeholderChar: letter };
      }
      mask += key;
    } else {
      mask += char;
    }
    position++;
  }
  return { mask, definitions };
}

/** Reads the unfilled letter-guide slots of `value` (starting at `format` position `offset`) back as `_`. */
export function toUnderscoreGuide(value: string, format: string, offset = 0): string {
  return [...value].map((char, index) => (isGuideChar(value, format, index, offset) ? UNDERSCORE_GUIDE_CHAR : char)).join('');
}

function isGuideChar(value: string, format: string, index: number, offset: number): boolean {
  const char = value[index];
  const position = index + offset;
  if (char !== format[position] || !GUIDE_LETTER.test(char)) {
    return false;
  }
  // A lowercase `a` is also a real meridiem, so only an untouched `aa` pair is the guide.
  if (char === MERIDIEM_GUIDE_CHAR && format[position + 1] === MERIDIEM_GUIDE_CHAR) {
    return value[index + 1] === MERIDIEM_GUIDE_CHAR;
  }
  return true;
}
