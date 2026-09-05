import { CUSTOM_ELEMENT_NAME_PROPERTY, Platform, titleCase } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';

import styles from './kbd.scss';

export const KBD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-kbd';

// Mappings for non-modifier keys with glyphs that differ from their `KeyboardEvent.key` values.
const KEY_GLYPHS: Record<string, string> = {
  Arrowdown: '↓',
  Arrowleft: '←',
  Arrowright: '→',
  Arrowup: '↑',
  Contextmenu: 'Context Menu',
  Enter: Platform.APPLE_PLATFORM ? 'Return' : 'Enter',
  Escape: 'Esc',
  Pagedown: 'Page Down',
  Pageup: 'Page Up',
  Printscreen: 'Print Screen',
  Scrolllock: 'Scroll Lock'
};

/**
 * @tag forge-kbd
 *
 * @summary Displays a keyboard key combination made up of modifier and alphanumeric keys.
 *
 * @cssproperty --forge-kbd-background - The background color of the keyboard keys.
 * @cssproperty --forge-kbd-color - The text color of the keyboard keys.
 * @cssproperty --forge-kbd-shape - The border radius of the keyboard keys.
 * @cssproperty --forge-kbd-block-size - The block size of the keyboard keys. The inline size is automatically calculated based on the block size.
 * @cssproperty --forge-kbd-padding-inline - The inline padding of the keyboard keys.
 * @cssproperty --forge-kbd-border-width - The border width of the keyboard keys.
 * @cssproperty --forge-kbd-border-style - The border style of the keyboard keys.
 * @cssproperty --forge-kbd-border-color - The border color of the keyboard keys.
 * @cssproperty --forge-kbd-gap - The spacing between rendered keys.
 *
 * @csspart root - The root container element.
 * @csspart key - Each individual rendered `<kbd>` key element.
 *
 * @cssclass forge-kbd - The kbd class.
 */
@customElement(KBD_TAG_NAME)
export class KbdComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = KBD_TAG_NAME;

  /**
   * An array of alphanumeric keys to display.
   * @default []
   * @attribute {string} keys - A space-separated list of alphanumeric keys to display.
   */
  @property({
    converter: {
      fromAttribute: (value: string) => value.split(' '),
      toAttribute: (value: string[]) => value.join(' ')
    }
  })
  public keys: string[] = [];

  /**
   * Whether to display the Alt key (Option/⌥ on Apple keyboards or Alt on Windows keyboards).
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public alt = false;

  /**
   * Whether to display the Control key (Control/⌃ on Apple keyboards or Ctrl on Windows keyboards).
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public ctrl = false;

  /**
   * Whether to display the Meta key (Command/⌘ on Apple keyboards or ⊞ on Windows keyboards).
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public meta = false;

  /**
   * Whether to display the Shift key.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public shift = false;

  /**
   * Whether to display the keys in compact style.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public dense = false;

  /**
   * The theme to apply to the keyboard keys.
   * @default ''
   * @attribute
   */
  @property()
  public theme = '';

  get #modifierKeys(): string[] {
    const modifierKeys = [];
    if (this.ctrl) {
      modifierKeys.push(Platform.APPLE_PLATFORM ? '⌃' : 'Ctrl');
    }
    if (this.shift) {
      modifierKeys.push('⇧');
    }
    if (this.alt) {
      modifierKeys.push(Platform.APPLE_PLATFORM ? '⌥' : 'Alt');
    }
    if (this.meta) {
      modifierKeys.push(Platform.APPLE_PLATFORM ? '⌘' : '⊞');
    }
    return modifierKeys;
  }

  public render(): TemplateResult {
    const keyClasses = classMap({
      key: true,
      dense: this.dense,
      [`theme-${this.theme}`]: !!this.theme
    });
    const allKeys = [...this.#modifierKeys, ...this.keys];
    return html`<kbd class="forge-kbd" part="root">${allKeys.map(key => html`<kbd class="${keyClasses}" part="key">${this.#getKeyGlyph(key)}</kbd>`)}</kbd>`;
  }

  #getKeyGlyph(key: string): string {
    const titleCaseKey = titleCase(key);
    return KEY_GLYPHS[titleCaseKey] ?? titleCaseKey;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-kbd': KbdComponent;
  }
}
