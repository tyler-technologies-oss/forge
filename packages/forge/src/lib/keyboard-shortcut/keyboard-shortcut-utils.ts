import {
  IKeyCombination,
  KEY_ALIASES,
  KEYBOARD_SHORTCUT_CONSTANTS,
  MODIFIER_ALIASES,
  textInputTypes,
  type IKeyboardShortcutSequence,
  type KeyboardShortcutPlatform
} from './keyboard-shortcut-constants.js';

export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform ?? '';
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export function detectPlatform(): KeyboardShortcutPlatform {
  return isApplePlatform() ? 'apple' : 'pc';
}

export function isTextEntryElement(el: EventTarget | null): boolean {
  if (!el || !(el instanceof Element)) {
    return false;
  }
  if (el instanceof HTMLInputElement) {
    return textInputTypes.includes(el.type);
  }
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return true;
  }
  if (el instanceof HTMLElement && el.isContentEditable) {
    return true;
  }
  const role = el.getAttribute('role');
  return role === 'textbox' || role === 'searchbox' || role === 'combobox';
}

const MODIFIER_KEY_NAMES = ['Alt', 'AltGraph', 'CapsLock', 'Control', 'Meta', 'NumLock', 'ScrollLock', 'Shift'];

/** Checks if a keyboard event was produced by a modifier key being pressed on its own */
export function isModifierKeyEvent(evt: KeyboardEvent): boolean {
  return MODIFIER_KEY_NAMES.includes(evt.key);
}

export function closestComposedAncestor(el: Element, predicate: (candidate: Element) => boolean): Element | null {
  let current: Node | null = el.parentNode;
  while (current) {
    if (current instanceof ShadowRoot) {
      current = current.host;
    }
    if (current instanceof Element) {
      if (predicate(current)) {
        return current;
      }
    } else if (current instanceof Document) {
      return null;
    }
    current = current.parentNode;
  }
  return null;
}

/** Finds the nearest ancestor scope marker, crossing shadow boundaries */
export function findScopeMarker(el: Element): Element | null {
  return closestComposedAncestor(el, candidate => candidate.hasAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.SCOPE_MARKER));
}

export function getComposedEventTarget(evt: Event): Element | null {
  const path = evt.composedPath();
  if (path.length > 0 && path[0] instanceof Element) {
    return path[0];
  }
  if (evt.target instanceof Element) {
    return evt.target;
  }
  return null;
}

/**
 * Checks if an HTML element allows text input
 * @deprecated
 */
export function elementAcceptsTextInput(el: any): boolean {
  if (el instanceof HTMLInputElement) {
    return textInputTypes.includes(el.type);
  }
  return false;
}

function resolveModifierAlias(token: string, platform: KeyboardShortcutPlatform): string {
  if (token === 'mod') {
    return platform === 'apple' ? 'meta' : 'control';
  }
  return MODIFIER_ALIASES[token] ?? token;
}

function resolveKeyAlias(token: string): string {
  return KEY_ALIASES[token] ?? token;
}

function parseChord(combo: string, useCode: boolean, platform: KeyboardShortcutPlatform): IKeyCombination {
  const parts = combo.split('+');
  const rawKey = parts.pop() || '';
  const key = useCode ? rawKey : fixKey(resolveKeyAlias(rawKey.toLowerCase()));
  const modifier = [...new Set(parts.map(m => resolveModifierAlias(m.toLowerCase(), platform)))].sort().join('');
  return { key, modifier };
}

/**
 * Parses a string of key combinations into an array of keys and modifiers
 * @deprecated
 */
export function parseKeyCombinations(
  keys: string | null | undefined,
  useCode = false,
  platform: KeyboardShortcutPlatform = detectPlatform()
): IKeyCombination[] {
  if (!keys?.length) {
    return [];
  }

  return keys
    .split(' ')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .map(combo => parseChord(combo, useCode, platform));
}

/** Parses a key string into sequences (space = alternatives, > = sequence steps, + = modifiers) */
export function parseKeySequences(
  keys: string | null | undefined,
  useCode = false,
  platform: KeyboardShortcutPlatform = detectPlatform()
): IKeyboardShortcutSequence[] {
  if (!keys?.length) {
    return [];
  }

  return keys
    .split(' ')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .map(alternative => {
      const chords = alternative
        .split('>')
        .map(c => c.trim())
        .filter(c => c.length > 0)
        .map(chord => parseChord(chord, useCode, platform));
      return { chords };
    });
}

/** Checks a keyboard event against a single chord */
export function matchChord(evt: KeyboardEvent, chord: IKeyCombination, useCode = false): boolean {
  const eventKey = useCode ? evt.code : evt.key.toLowerCase();
  const modifierKeys = getModiferKeysString(evt);
  return eventKey === chord.key && modifierKeys === (chord.modifier ?? '');
}

/**
 * Checks a keyboard event for a matching key combination
 * @deprecated
 */
export function matchKeyCombination(evt: KeyboardEvent, keyCombinations: IKeyCombination[], useCode = false): boolean {
  return keyCombinations.some(combination => matchChord(evt, combination, useCode));
}

/**
 * Returns an array of active modifier keys from a keyboard event
 * @deprecated
 */
export function getModiferKeysString(evt: KeyboardEvent): string {
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

/**
 * Returns a reserved key character from its alias
 * @deprecated
 */
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

interface ParsedBinding {
  modifiers: string[];
  key: string;
}

interface ParsedSequenceBinding {
  chords: ParsedBinding[];
}

function parseChordBinding(combo: string, platform: KeyboardShortcutPlatform): ParsedBinding {
  const parts = combo.split('+');
  const rawKey = parts.pop() || '';
  const key = fixKey(resolveKeyAlias(rawKey.toLowerCase()));
  const modifiers = [...new Set(parts.map(m => resolveModifierAlias(m.toLowerCase(), platform)))].sort();
  return { modifiers, key };
}

function parseSequenceBindings(keys: string | null | undefined, platform: KeyboardShortcutPlatform): ParsedSequenceBinding[] {
  if (!keys?.length) {
    return [];
  }
  return keys
    .split(' ')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .map(alternative => {
      const chords = alternative
        .split('>')
        .map(c => c.trim())
        .filter(c => c.length > 0)
        .map(chord => parseChordBinding(chord, platform));
      return { chords };
    });
}

const MODIFIER_DISPLAY_ORDER = ['control', 'alt', 'shift', 'meta'] as const;

const PC_MODIFIER_LABELS: Record<string, string> = {
  control: 'Ctrl',
  alt: 'Alt',
  shift: 'Shift',
  meta: 'Meta'
};

const APPLE_MODIFIER_LABELS: Record<string, string> = {
  control: 'Ctrl',
  alt: 'Option',
  shift: 'Shift',
  meta: 'Cmd'
};

function formatKeyForLabel(key: string): string {
  if (key === ' ') {
    return 'Space';
  }
  if (key === 'escape') {
    return 'Esc';
  }
  if (key === 'arrowup') {
    return 'Up';
  }
  if (key === 'arrowdown') {
    return 'Down';
  }
  if (key === 'arrowleft') {
    return 'Left';
  }
  if (key === 'arrowright') {
    return 'Right';
  }
  if (key.length === 1) {
    return key.toUpperCase();
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function formatKeyboardShortcutBinding(keys: string | null | undefined, platform: KeyboardShortcutPlatform = detectPlatform()): string {
  const sequences = parseSequenceBindings(keys, platform);
  if (!sequences.length) {
    return '';
  }

  const labels = platform === 'apple' ? APPLE_MODIFIER_LABELS : PC_MODIFIER_LABELS;

  function formatChord({ modifiers, key }: ParsedBinding): string {
    const parts: string[] = [];
    for (const mod of MODIFIER_DISPLAY_ORDER) {
      if (modifiers.includes(mod)) {
        parts.push(labels[mod]);
      }
    }
    parts.push(formatKeyForLabel(key));
    return parts.join('+');
  }

  return sequences.map(seq => seq.chords.map(formatChord).join(' ')).join(', ');
}

const ARIA_MODIFIER_ORDER = ['alt', 'control', 'meta', 'shift'] as const;

const ARIA_MODIFIER_LABELS: Record<string, string> = {
  alt: 'Alt',
  control: 'Control',
  meta: 'Meta',
  shift: 'Shift'
};

const UI_EVENTS_KEY_MAP: Record<string, string> = {
  escape: 'Escape',
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  backspace: 'Backspace',
  arrowup: 'ArrowUp',
  arrowdown: 'ArrowDown',
  arrowleft: 'ArrowLeft',
  arrowright: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  insert: 'Insert',
  f1: 'F1',
  f2: 'F2',
  f3: 'F3',
  f4: 'F4',
  f5: 'F5',
  f6: 'F6',
  f7: 'F7',
  f8: 'F8',
  f9: 'F9',
  f10: 'F10',
  f11: 'F11',
  f12: 'F12'
};

function formatKeyForAria(key: string): string {
  if (key === ' ') {
    return 'Space';
  }
  if (key === '+') {
    return 'Plus';
  }
  const mapped = UI_EVENTS_KEY_MAP[key];
  if (mapped) {
    return mapped;
  }
  if (key.length === 1) {
    return key.toUpperCase();
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function formatAriaKeyShortcuts(keys: string | null | undefined, platform: KeyboardShortcutPlatform = detectPlatform()): string {
  const sequences = parseSequenceBindings(keys, platform);
  if (!sequences.length) {
    return '';
  }

  const singleChordSequences = sequences.filter(seq => seq.chords.length === 1);
  if (!singleChordSequences.length) {
    return '';
  }

  return singleChordSequences
    .map(seq => {
      const { modifiers, key } = seq.chords[0];
      const parts: string[] = [];
      for (const mod of ARIA_MODIFIER_ORDER) {
        if (modifiers.includes(mod)) {
          parts.push(ARIA_MODIFIER_LABELS[mod]);
        }
      }
      parts.push(formatKeyForAria(key));
      return parts.join('+');
    })
    .join(' ');
}
