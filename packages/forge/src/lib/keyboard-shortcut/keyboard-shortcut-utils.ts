import { textInputTypes, IKeyCombination } from './keyboard-shortcut-constants.js';

/** Checks if an HTML element allows text input */
export function elementAcceptsTextInput(el: any): boolean {
  if (el instanceof HTMLInputElement) {
    return textInputTypes.includes(el.type);
  }
  return false;
}

/** Parses a string of key combinations into an array of keys and modifiers */
export function parseKeyCombinations(keys: string | null | undefined, useCode = false): IKeyCombination[] {
  if (!keys || !keys.length) {
    return [];
  }

  const separatedKeys = keys.split(' ').map(key => key.trim());
  return separatedKeys.map(key => {
    const keyParts = key.split('+');
    const fixedKey = useCode ? keyParts.pop() || '' : fixKey((keyParts.pop() || '').toLowerCase());
    const modifiers = keyParts.sort().join('').toLowerCase();
    return { key: fixedKey, modifier: modifiers };
  });
}

/** Checks a keyboard event for a matching key combination */
export function matchKeyCombination(evt: KeyboardEvent, keyCombinations: IKeyCombination[], useCode = false): boolean {
  const eventKey = useCode ? evt.code : evt.key.toLowerCase();
  const modifierKeys = getModiferKeysString(evt);
  return keyCombinations.some(combination => eventKey === combination.key && modifierKeys === combination.modifier);
}

/** Returns an array of active modifier keys from a keyboard event */
export function getModiferKeysString(evt: KeyboardEvent): string {
  // Ensure the modifier keys are appended in alphabetical order
  let modifierString = '';
  if (evt.altKey) {
    modifierString += 'alt';
  }
  if (evt.ctrlKey) {
    modifierString += 'control';
  }
  if (evt.metaKey) {
    modifierString += 'meta';
  }
  if (evt.shiftKey) {
    modifierString += 'shift';
  }
  return modifierString;
}

/** Returns a reserved key character from its alias */
export function fixKey(key: string): string {
  switch (key) {
    case 'plus':
      return '+';
    case 'space':
      return ' ';
    default:
      return key;
  }
}
