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

/**
 * Converts a string value to title case.
 * Ex. some Test Value => Some test value
 * @param {string} value The string to convert
 */
export function titleCase(value: string): string {
  if (!isDefined(value) || !isString(value)) {
    return value;
  }

  return value.replace(/\w+/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
}
