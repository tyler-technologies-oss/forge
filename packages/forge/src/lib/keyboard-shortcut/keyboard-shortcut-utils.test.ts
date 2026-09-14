import { describe, it, expect, afterEach } from 'vitest';
import {
  parseKeyCombinations,
  parseKeySequences,
  formatKeyBinding,
  formatAriaKeyShortcuts,
  isTextEntryElement,
  isElementDisabled,
  closestComposedAncestor
} from './keyboard-shortcut-utils.js';

describe('Keyboard Shortcut Utils', () => {
  describe('parseKeyCombinations', () => {
    it('should resolve mod to meta when platform is apple', () => {
      const result = parseKeyCombinations('mod+a', false, 'apple');
      expect(result).toEqual([{ key: 'a', modifier: 'meta' }]);
    });

    it('should resolve mod to control when platform is pc', () => {
      const result = parseKeyCombinations('mod+a', false, 'pc');
      expect(result).toEqual([{ key: 'a', modifier: 'control' }]);
    });

    it('should normalize ctrl, cmd, command, and option aliases', () => {
      expect(parseKeyCombinations('ctrl+a', false, 'pc')).toEqual([{ key: 'a', modifier: 'control' }]);
      expect(parseKeyCombinations('cmd+a', false, 'pc')).toEqual([{ key: 'a', modifier: 'meta' }]);
      expect(parseKeyCombinations('command+a', false, 'pc')).toEqual([{ key: 'a', modifier: 'meta' }]);
      expect(parseKeyCombinations('option+a', false, 'pc')).toEqual([{ key: 'a', modifier: 'alt' }]);
    });

    it('should normalize esc, return, del, and arrow aliases', () => {
      expect(parseKeyCombinations('esc', false, 'pc')).toEqual([{ key: 'escape', modifier: '' }]);
      expect(parseKeyCombinations('return', false, 'pc')).toEqual([{ key: 'enter', modifier: '' }]);
      expect(parseKeyCombinations('del', false, 'pc')).toEqual([{ key: 'delete', modifier: '' }]);
      expect(parseKeyCombinations('up', false, 'pc')).toEqual([{ key: 'arrowup', modifier: '' }]);
      expect(parseKeyCombinations('down', false, 'pc')).toEqual([{ key: 'arrowdown', modifier: '' }]);
      expect(parseKeyCombinations('left', false, 'pc')).toEqual([{ key: 'arrowleft', modifier: '' }]);
      expect(parseKeyCombinations('right', false, 'pc')).toEqual([{ key: 'arrowright', modifier: '' }]);
    });

    it('should sort modifiers alphabetically regardless of authored order', () => {
      const result = parseKeyCombinations('Shift+Control+Alt+a', false, 'pc');
      expect(result).toEqual([{ key: 'a', modifier: 'altcontrolshift' }]);
    });

    it('should keep the code token verbatim when useCode is true', () => {
      const result = parseKeyCombinations('Control+Digit1', true, 'pc');
      expect(result).toEqual([{ key: 'Digit1', modifier: 'control' }]);
    });

    it('should return an empty array when keys is empty or null', () => {
      expect(parseKeyCombinations('', false, 'pc')).toEqual([]);
      expect(parseKeyCombinations(null, false, 'pc')).toEqual([]);
      expect(parseKeyCombinations(undefined, false, 'pc')).toEqual([]);
    });
  });

  describe('parseKeySequences', () => {
    it('should parse a single chord into a one-chord sequence', () => {
      const result = parseKeySequences('Control+a', false, 'pc');
      expect(result).toEqual([{ chords: [{ key: 'a', modifier: 'control' }] }]);
    });

    it('should parse space-separated alternatives as separate sequences', () => {
      const result = parseKeySequences('a b', false, 'pc');
      expect(result).toEqual([{ chords: [{ key: 'a', modifier: '' }] }, { chords: [{ key: 'b', modifier: '' }] }]);
    });

    it('should parse a two-chord sequence with > separator', () => {
      const result = parseKeySequences('Control+k>Control+c', false, 'pc');
      expect(result).toEqual([
        {
          chords: [
            { key: 'k', modifier: 'control' },
            { key: 'c', modifier: 'control' }
          ]
        }
      ]);
    });

    it('should parse mixed alternatives with sequences and single chords', () => {
      const result = parseKeySequences('Control+k>Control+c Control+shift+/', false, 'pc');
      expect(result).toEqual([
        {
          chords: [
            { key: 'k', modifier: 'control' },
            { key: 'c', modifier: 'control' }
          ]
        },
        { chords: [{ key: '/', modifier: 'controlshift' }] }
      ]);
    });

    it('should parse a three-chord sequence', () => {
      const result = parseKeySequences('a>b>c', false, 'pc');
      expect(result).toEqual([
        {
          chords: [
            { key: 'a', modifier: '' },
            { key: 'b', modifier: '' },
            { key: 'c', modifier: '' }
          ]
        }
      ]);
    });

    it('should resolve key aliases in sequence chords', () => {
      const result = parseKeySequences('esc>return', false, 'pc');
      expect(result).toEqual([
        {
          chords: [
            { key: 'escape', modifier: '' },
            { key: 'enter', modifier: '' }
          ]
        }
      ]);
    });

    it('should keep code tokens verbatim when useCode is true', () => {
      const result = parseKeySequences('Control+KeyK>Control+KeyC', true, 'pc');
      expect(result).toEqual([
        {
          chords: [
            { key: 'KeyK', modifier: 'control' },
            { key: 'KeyC', modifier: 'control' }
          ]
        }
      ]);
    });

    it('should return an empty array when keys is empty or null', () => {
      expect(parseKeySequences('', false, 'pc')).toEqual([]);
      expect(parseKeySequences(null, false, 'pc')).toEqual([]);
      expect(parseKeySequences(undefined, false, 'pc')).toEqual([]);
    });
  });

  describe('formatKeyBinding', () => {
    it('should format control combinations as Ctrl on pc', () => {
      expect(formatKeyBinding('Control+a', 'pc')).toBe('Ctrl+A');
    });

    it('should format meta combinations as Cmd on apple', () => {
      expect(formatKeyBinding('Meta+a', 'apple')).toBe('Cmd+A');
    });

    it('should uppercase single-character keys', () => {
      expect(formatKeyBinding('b', 'pc')).toBe('B');
    });

    it('should join alternatives with a comma', () => {
      expect(formatKeyBinding('Control+a Control+b', 'pc')).toBe('Ctrl+A, Ctrl+B');
    });

    it('should join chords within a sequence with space and alternatives with comma', () => {
      expect(formatKeyBinding('Control+k>Control+c Control+shift+/', 'pc')).toBe('Ctrl+K Ctrl+C, Ctrl+Shift+/');
    });

    it('should return an empty string when keys is empty', () => {
      expect(formatKeyBinding('', 'pc')).toBe('');
      expect(formatKeyBinding(null, 'pc')).toBe('');
      expect(formatKeyBinding(undefined, 'pc')).toBe('');
    });
  });

  describe('formatAriaKeyShortcuts', () => {
    it('should order modifiers Alt, Control, Meta, Shift', () => {
      expect(formatAriaKeyShortcuts('Shift+Control+Alt+Meta+a', 'pc')).toBe('Alt+Control+Meta+Shift+A');
    });

    it('should emit Space and Plus for the space and plus keys', () => {
      expect(formatAriaKeyShortcuts('space', 'pc')).toBe('Space');
      expect(formatAriaKeyShortcuts('plus', 'pc')).toBe('Plus');
    });

    it('should emit UI Events casing for named keys', () => {
      expect(formatAriaKeyShortcuts('esc', 'pc')).toBe('Escape');
      expect(formatAriaKeyShortcuts('return', 'pc')).toBe('Enter');
      expect(formatAriaKeyShortcuts('del', 'pc')).toBe('Delete');
      expect(formatAriaKeyShortcuts('up', 'pc')).toBe('ArrowUp');
    });

    it('should separate alternatives with a space', () => {
      expect(formatAriaKeyShortcuts('Control+a Control+b', 'pc')).toBe('Control+A Control+B');
    });

    it('should omit multi-chord sequences', () => {
      expect(formatAriaKeyShortcuts('Control+k>Control+c Control+/', 'pc')).toBe('Control+/');
    });

    it('should return empty string when all alternatives are multi-chord sequences', () => {
      expect(formatAriaKeyShortcuts('Control+k>Control+c a>b', 'pc')).toBe('');
    });
  });

  describe('isTextEntryElement', () => {
    const elements: HTMLElement[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }
      document.body.appendChild(el);
      elements.push(el);
      return el;
    }

    it('should return true for text-like inputs, textarea, select, contenteditable, and textbox roles', () => {
      expect(isTextEntryElement(createElement('input', { type: 'text' }))).toBe(true);
      expect(isTextEntryElement(createElement('input', { type: 'email' }))).toBe(true);
      expect(isTextEntryElement(createElement('input', { type: 'search' }))).toBe(true);
      expect(isTextEntryElement(createElement('textarea'))).toBe(true);
      expect(isTextEntryElement(createElement('select'))).toBe(true);
      expect(isTextEntryElement(createElement('div', { contenteditable: 'true' }))).toBe(true);
      expect(isTextEntryElement(createElement('div', { role: 'textbox' }))).toBe(true);
      expect(isTextEntryElement(createElement('div', { role: 'searchbox' }))).toBe(true);
      expect(isTextEntryElement(createElement('div', { role: 'combobox' }))).toBe(true);
    });

    it('should return false for buttons, checkboxes, and null', () => {
      expect(isTextEntryElement(createElement('button'))).toBe(false);
      expect(isTextEntryElement(createElement('input', { type: 'checkbox' }))).toBe(false);
      expect(isTextEntryElement(null)).toBe(false);
    });
  });

  describe('isElementDisabled', () => {
    const elements: HTMLElement[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    it('should detect a native disabled button', () => {
      const btn = document.createElement('button');
      btn.disabled = true;
      document.body.appendChild(btn);
      elements.push(btn);
      expect(isElementDisabled(btn)).toBe(true);
    });

    it('should detect a custom element with a truthy disabled property', () => {
      const el = document.createElement('div') as HTMLElement & { disabled: boolean };
      (el as any).disabled = true;
      document.body.appendChild(el);
      elements.push(el);
      expect(isElementDisabled(el)).toBe(true);
    });

    it('should detect aria-disabled true', () => {
      const el = document.createElement('div');
      el.setAttribute('aria-disabled', 'true');
      document.body.appendChild(el);
      elements.push(el);
      expect(isElementDisabled(el)).toBe(true);
    });
  });

  describe('closestComposedAncestor', () => {
    const elements: HTMLElement[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    it('should find an ancestor in light DOM', () => {
      const outer = document.createElement('div');
      outer.setAttribute('data-scope', 'test');
      const inner = document.createElement('div');
      const child = document.createElement('span');
      inner.appendChild(child);
      outer.appendChild(inner);
      document.body.appendChild(outer);
      elements.push(outer);

      const result = closestComposedAncestor(child, el => el.hasAttribute('data-scope'));
      expect(result).toBe(outer);
    });

    it('should cross a shadow boundary to reach the host ancestors', () => {
      const outer = document.createElement('div');
      outer.setAttribute('data-scope', 'test');
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });
      const child = document.createElement('span');
      shadow.appendChild(child);
      outer.appendChild(host);
      document.body.appendChild(outer);
      elements.push(outer);

      const result = closestComposedAncestor(child, el => el.hasAttribute('data-scope'));
      expect(result).toBe(outer);
    });

    it('should return null when nothing matches', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      document.body.appendChild(parent);
      elements.push(parent);

      const result = closestComposedAncestor(child, el => el.hasAttribute('data-nonexistent'));
      expect(result).toBeNull();
    });
  });
});
