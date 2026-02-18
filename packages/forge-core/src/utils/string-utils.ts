import { isDefined, isString } from './utils.js';

/**
 * Converts a string value to dash-case.
 * Ex. someTestValue => some-test-value
 * @param {string} value The string to convert
 */
export function dashify(value: string): string {
  if (!isDefined(value) || !isString(value)) {
    return value;
  }

  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
