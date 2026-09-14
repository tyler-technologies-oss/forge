import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}keyboard-shortcut`;

const observedAttributes = {
  KEY: 'key',
  TARGET: 'target',
  GLOBAL: 'global',
  ALLOW_WHILE_TYPING: 'allow-while-typing',
  USE_CODE: 'use-code',
  PREVENT_DEFAULT: 'prevent-default',
  CAPTURE: 'capture',
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes,
  ANCHOR: 'anchor',
  SCOPE: 'scope',
  ALLOW_REPEAT: 'allow-repeat',
  FALLTHROUGH: 'fallthrough',
  ANCHOR_ACCESSIBILITY: 'anchor-accessibility',
  SCOPE_MARKER: 'forge-keyboard-shortcut-scope'
};

const selectors = {
  TOOLTIP: 'forge-tooltip',
  KEYBOARD_SHORTCUT: 'forge-keyboard-shortcut',
  SCOPE_MARKER: '[forge-keyboard-shortcut-scope]'
};

const events = {
  ACTIVATE: `${elementName}-activate`
};

/** @deprecated These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const KEYBOARD_SHORTCUT_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

export const WARNING_PREFIX = '[forge-keyboard-shortcut]:';

export const textInputTypes = ['date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'];

export type KeyboardShortcutActivateCallback = (event: KeyboardEvent) => void;
export type KeyboardShortcutPlatform = 'apple' | 'pc';
export type KeyboardShortcutAnchorAccessibility = 'auto' | 'none';

export interface IKeyCombination {
  key: string;
  modifier?: string;
}

export interface IKeyboardShortcutSequence {
  readonly chords: IKeyCombination[];
}

export const SEQUENCE_TIMEOUT = 1000;

export interface IKeyboardShortcutOptions {
  key: string;
  scopeElement?: Element;
  global?: boolean;
  anchorElement?: HTMLElement | null;
  useCode?: boolean;
  capture?: boolean;
  preventDefault?: boolean;
  allowWhileTyping?: boolean;
  allowRepeat?: boolean;
  fallthrough?: boolean;
  onActivate?: (event: KeyboardEvent) => void;
  ownerElement?: Element;
}

export interface IKeyboardShortcutRegistration {
  readonly options: Readonly<Required<Pick<IKeyboardShortcutOptions, 'key'>> & IKeyboardShortcutOptions>;
  readonly scopeElement: Element;
  dispose(): void;
}

export interface IKeyboardShortcutEntry {
  readonly options: Readonly<Required<Pick<IKeyboardShortcutOptions, 'key'>> & IKeyboardShortcutOptions>;
  readonly sequences: IKeyboardShortcutSequence[];
  readonly capture: boolean;
  readonly useCode: boolean;
  readonly allowWhileTyping: boolean;
  readonly allowRepeat: boolean;
  readonly fallthrough: boolean;
  readonly preventDefault: boolean;
  readonly anchorElement: HTMLElement | null;
  readonly onActivate: ((event: KeyboardEvent) => void) | undefined;
  readonly ownerElement: Element | undefined;
}

export const MODIFIER_ALIASES: Record<string, string> = {
  ctrl: 'control',
  control: 'control',
  cmd: 'meta',
  command: 'meta',
  meta: 'meta',
  option: 'alt',
  alt: 'alt',
  shift: 'shift'
};

export const KEY_ALIASES: Record<string, string> = {
  esc: 'escape',
  return: 'enter',
  del: 'delete',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright'
};
