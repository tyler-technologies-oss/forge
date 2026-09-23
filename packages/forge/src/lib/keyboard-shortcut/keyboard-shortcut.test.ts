import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import type { IKeyboardShortcutComponent } from './keyboard-shortcut.js';
import { KEYBOARD_SHORTCUT_CONSTANTS } from './keyboard-shortcut-constants.js';

import './keyboard-shortcut.js';

describe('Keyboard Shortcut', () => {
  describe('events', () => {
    it('should emit an event on a matching target keydown event', async () => {
      const harness = await createFixture({ key: 'a' });
      expect(harness.keyboardShortcutEl.key).toBe('a');

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should invoke the callback function on a matching target keydown event', async () => {
      const activateCallback = vi.fn();
      const harness = await createFixture({ key: 'a', activateCallback });

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateCallback).toHaveBeenCalledOnce();
    });
  });

  describe('attributes', () => {
    it('should set key when a key attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('key', 'a');

      expect(harness.keyboardShortcutEl.key).toBe('a');
    });

    it('should set target when a target attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('target', 'button');

      expect(harness.keyboardShortcutEl.target).toBe('button');
    });

    it('should set global when a global attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('global', '');

      expect(harness.keyboardShortcutEl.global).toBe(true);
    });

    it('should set allowWhileTyping when an allow-while-typing attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('allow-while-typing', '');

      expect(harness.keyboardShortcutEl.allowWhileTyping).toBe(true);
    });

    it('should set preventDefault when a prevent-default attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('prevent-default', '');

      expect(harness.keyboardShortcutEl.preventDefault).toBe(true);
    });

    it('should set capture when a capture attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('capture', '');

      expect(harness.keyboardShortcutEl.capture).toBe(true);
    });

    it('should set disabled when a disabled attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('disabled', '');

      expect(harness.keyboardShortcutEl.disabled).toBe(true);
    });
  });

  describe('properties', () => {
    it('should not be active when disabled is true', async () => {
      const harness = await createFixture();
      harness.keyboardShortcutEl.key = 'a';
      harness.keyboardShortcutEl.disabled = true;

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).not.toHaveBeenCalled();
    });

    it('should activate when toggling disabled from false to true', async () => {
      const harness = await createFixture({ key: 'a', disabled: true });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).not.toHaveBeenCalled();

      harness.keyboardShortcutEl.disabled = false;
      await harness.keyboardShortcutEl.updateComplete;
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should not invoke the callback when disabled is true', async () => {
      const activateCallback = vi.fn();
      const harness = await createFixture({ key: 'a', disabled: true, activateCallback });

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateCallback).not.toHaveBeenCalled();
    });

    it('should connect target element when disabled is false', async () => {
      const harness = await createFixture({ key: 'a', disabled: false });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should prevent default on the keydown event by default', async () => {
      const harness = await createFixture({ key: 'a', allowWhileTyping: true, preventDefault: true });

      const evt = new KeyboardEvent('keydown', { key: 'a' });
      const preventDefaultSpy = vi.spyOn(evt, 'preventDefault');
      harness.targetEl?.dispatchEvent(evt);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it('should allow default on the keydown event when preventDefault is false', async () => {
      const harness = await createFixture({ targetElement: 'input', key: 'a', allowWhileTyping: true, preventDefault: false });

      const evt = new KeyboardEvent('keydown', { key: 'a' });
      const preventDefaultSpy = vi.spyOn(evt, 'preventDefault');
      harness.targetEl?.dispatchEvent(evt);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should set key property when using keyBinding alias', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.keyBinding = 'a';

      expect(harness.keyboardShortcutEl.key).toBe('a');
    });

    it('should get key when accessing keyBinding alias', async () => {
      const harness = await createFixture({ key: 'a' });

      expect(harness.keyboardShortcutEl.keyBinding).toBe('a');
    });
  });

  describe('key binding', () => {
    it('should treat capital and lowercase characters identically', async () => {
      const harness = await createFixture();

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.keyboardShortcutEl.key = 'A';
      await harness.keyboardShortcutEl.updateComplete;
      harness.dispatchKeyboardEvent({ key: 'a' });

      harness.keyboardShortcutEl.key = 'a';
      await harness.keyboardShortcutEl.updateComplete;
      harness.dispatchKeyboardEvent({ key: 'A' });

      expect(activateSpy).toHaveBeenCalledTimes(2);
    });

    it('should treat capital characters and keys with shift differently', async () => {
      const harness = await createFixture();

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.keyboardShortcutEl.key = 'Shift+a';
      await harness.keyboardShortcutEl.updateComplete;
      harness.dispatchKeyboardEvent({ key: 'A' });

      harness.keyboardShortcutEl.key = 'A';
      await harness.keyboardShortcutEl.updateComplete;
      harness.dispatchKeyboardEvent({ key: 'A', shiftKey: true });

      expect(activateSpy).not.toHaveBeenCalled();
    });

    it('should activate when Alt is pressed', async () => {
      const harness = await createFixture({ key: 'Alt+a' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', altKey: true });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when Control is pressed', async () => {
      const harness = await createFixture({ key: 'Control+a' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', ctrlKey: true });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when Meta is pressed', async () => {
      const harness = await createFixture({ key: 'Meta+a' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', metaKey: true });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when Shift is pressed', async () => {
      const harness = await createFixture({ key: 'Shift+a' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', shiftKey: true });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when multiple modifier keys are pressed', async () => {
      const harness = await createFixture({ key: 'Shift+Alt+a' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', shiftKey: true, altKey: true });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when + is pressed', async () => {
      const harness = await createFixture({ key: 'plus' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: '+' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when space is pressed', async () => {
      const harness = await createFixture({ key: 'space' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: ' ' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should activate when multiple key bindings are provided', async () => {
      const harness = await createFixture({ key: 'a b' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });
      harness.dispatchKeyboardEvent({ key: 'b' });

      expect(activateSpy).toHaveBeenCalledTimes(2);
    });

    it('should not activate when no keys are specified', async () => {
      const harness = await createFixture();

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).not.toHaveBeenCalled();
    });

    it('should activate when a code is provided and useCode is true', async () => {
      const harness = await createFixture({ key: 'Digit1', useCode: true });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ code: 'Digit1' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });
  });

  describe('target element', () => {
    it('should connect to a target element by selector', async () => {
      const harness = await createFixture({ key: 'a', target: '#test-target' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    ['text', 'password', 'search', 'tel', 'url', 'email', 'number', 'date', 'time', 'datetime-local', 'month', 'week'].forEach(type => {
      it(`should not activate when an event is emitted from a ${type} input element by default`, async () => {
        const harness = await createFixture({ key: 'a', targetElement: 'input' });
        harness.targetEl?.setAttribute('type', type);

        const activateSpy = vi.fn();
        harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
        harness.dispatchKeyboardEvent({ key: 'a' });

        expect(activateSpy).not.toHaveBeenCalled();
      });
    });

    it('should activate when an event is emitted from an input element allowWhileTyping is set to true', async () => {
      const harness = await createFixture({ key: 'a', targetElement: 'input', allowWhileTyping: true });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should skip tooltip elements when searching for a target', async () => {
      const harness = await createFixture({ key: 'a', appendTooltip: true });

      harness.keyboardShortcutEl.target = '#test-target';

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should connect to the parent element when no previous siblings exist and a selector is not provided', async () => {
      const harness = await createFixture({ key: 'a', targetElement: false });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.containerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should connect to the parent element if it matches the selector', async () => {
      const harness = await createFixture({ key: 'a', target: '#container' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.containerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should fall back to the parent element when the target selector does not match', () => {
      const container = document.createElement('div');
      const el = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      el.setAttribute('key', 'a');
      el.setAttribute('target', '#does-not-exist');
      container.appendChild(el);
      document.body.appendChild(container);

      const activateSpy = vi.fn();
      el.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy).toHaveBeenCalledOnce();
      document.body.removeChild(container);
    });

    it('should warn once at first activation when the target selector does not match', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const container = document.createElement('div');
      const el = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      el.setAttribute('key', 'a');
      el.setAttribute('target', '#does-not-exist');
      container.appendChild(el);
      document.body.appendChild(container);

      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to locate the anchor element'), expect.anything());

      consoleSpy.mockReset();
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
      document.body.removeChild(container);
    });

    it('should activate on events on the document element when global is true', async () => {
      const harness = await createFixture({ key: 'a', global: true });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy).toHaveBeenCalledOnce();
    });
  });

  describe('anchor resolution', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    function keydown(target: Element, init: KeyboardEventInit = {}): KeyboardEvent {
      const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
      target.dispatchEvent(evt);
      return evt;
    }

    it('should resolve the anchor from the anchor id', async () => {
      const container = addEl('div');
      const btn = document.createElement('button');
      btn.id = 'my-anchor';
      container.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'my-anchor');
      container.appendChild(shortcut);

      expect(shortcut.anchorElement).toBe(btn);
    });

    it('should prefer anchorElement over the anchor id', async () => {
      const container = addEl('div');
      const btn = document.createElement('button');
      btn.id = 'my-anchor';
      container.appendChild(btn);
      const otherBtn = document.createElement('button');
      container.appendChild(otherBtn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'my-anchor');
      shortcut.anchorElement = otherBtn;
      container.appendChild(shortcut);

      expect(shortcut.anchorElement).toBe(otherBtn);
    });

    it('should resolve the anchor from the previous element sibling when no anchor is provided', async () => {
      const harness = await createFixture({ key: 'a' });
      expect(harness.keyboardShortcutEl.anchorElement).toBe(harness.targetEl);
    });

    it('should skip forge-tooltip and forge-keyboard-shortcut siblings when resolving the anchor', async () => {
      const harness = await createFixture({ key: 'a', appendTooltip: true });
      expect(harness.keyboardShortcutEl.anchorElement).toBe(harness.targetEl);
    });

    it('should resolve the anchor from the parent element when no previous sibling exists', async () => {
      const harness = await createFixture({ key: 'a', targetElement: false });
      expect(harness.keyboardShortcutEl.anchorElement).toBe(harness.containerEl);
    });

    it('should return the resolved anchor from the anchorElement getter when none was set explicitly', async () => {
      const harness = await createFixture({ key: 'a' });
      expect(harness.keyboardShortcutEl.anchorElement).toBe(harness.targetEl);
    });

    it('should re-resolve the anchor when the anchor id changes', async () => {
      const container = addEl('div');
      const btn1 = document.createElement('button');
      btn1.id = 'btn-1';
      container.appendChild(btn1);
      const btn2 = document.createElement('button');
      btn2.id = 'btn-2';
      container.appendChild(btn2);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'btn-1');
      container.appendChild(shortcut);

      expect(shortcut.anchorElement).toBe(btn1);

      shortcut.anchor = 'btn-2';
      await shortcut.updateComplete;
      expect(shortcut.anchorElement).toBe(btn2);
    });

    it('should resolve a late-rendered anchor at first activation', () => {
      const container = addEl('div');
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'late-btn');
      container.appendChild(shortcut);

      const btn = document.createElement('button');
      btn.id = 'late-btn';
      container.appendChild(btn);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(container, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
      expect(shortcut.anchorElement).toBe(btn);
    });

    it('should warn once when the anchor id does not resolve at activation', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const container = addEl('div');
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'nonexistent');
      container.appendChild(shortcut);

      keydown(container, { key: 'a' });
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to locate the anchor element'), expect.anything());

      consoleSpy.mockReset();
      keydown(container, { key: 'a' });
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('scope resolution', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    function keydown(target: Element, init: KeyboardEventInit = {}): KeyboardEvent {
      const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
      target.dispatchEvent(evt);
      return evt;
    }

    it('should listen on the nearest ancestor scope marker', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(btn, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should listen on the element matching the scope id', () => {
      const outer = addEl('div');
      outer.id = 'outer-scope';
      const inner = document.createElement('div');
      inner.setAttribute('forge-keyboard-shortcut-scope', '');
      outer.appendChild(inner);
      const btn = document.createElement('button');
      inner.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.scope = 'outer-scope';
      inner.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);

      keydown(btn, { key: 'a' });
      expect(spy).toHaveBeenCalledOnce();
    });

    it('should warn and fall back to the nearest marker when the scope id does not exist', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.scope = 'nonexistent';
      scope.appendChild(shortcut);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to locate a scope element with id'), expect.anything());

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(btn, { key: 'a' });
      expect(spy).toHaveBeenCalledOnce();

      consoleSpy.mockRestore();
    });

    it('should prefer scopeElement over ancestor markers', () => {
      const marker = addEl('div');
      marker.setAttribute('forge-keyboard-shortcut-scope', '');
      const customScope = addEl('div');
      const btn = document.createElement('button');
      customScope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.scopeElement = customScope;
      marker.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(btn, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should listen on the document element when global is true even inside a scope marker', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.global = true;
      scope.appendChild(shortcut);

      const outsideEl = addEl('div');
      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(outsideEl, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should listen on the anchor when no scope marker exists', async () => {
      const harness = await createFixture({ key: 'a' });

      const spy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should return the resolved scope from the scopeElement getter', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      expect(shortcut.scopeElement).toBe(scope);
    });

    it('should stop listening when disconnected and resume when reconnected', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);

      keydown(btn, { key: 'a' });
      expect(spy).toHaveBeenCalledOnce();

      shortcut.remove();
      spy.mockReset();
      keydown(btn, { key: 'a' });
      expect(spy).not.toHaveBeenCalled();

      scope.appendChild(shortcut);
      keydown(btn, { key: 'a' });
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('arbitration', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    function keydown(target: Element, init: KeyboardEventInit = {}): KeyboardEvent {
      const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
      target.dispatchEvent(evt);
      return evt;
    }

    it('should only activate the shortcut in the inner scope when two editors bind the same key', () => {
      const outer = addEl('div');
      outer.setAttribute('forge-keyboard-shortcut-scope', '');
      const inner = document.createElement('div');
      inner.setAttribute('forge-keyboard-shortcut-scope', '');
      outer.appendChild(inner);

      const outerBtn = document.createElement('button');
      outer.appendChild(outerBtn);
      const innerBtn = document.createElement('button');
      inner.appendChild(innerBtn);

      const outerShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      outerShortcut.setAttribute('key', 'a');
      outer.appendChild(outerShortcut);

      const innerShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      innerShortcut.setAttribute('key', 'a');
      inner.appendChild(innerShortcut);

      const outerSpy = vi.fn();
      const innerSpy = vi.fn();
      outerShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, outerSpy);
      innerShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, innerSpy);

      keydown(innerBtn, { key: 'a' });

      expect(innerSpy).toHaveBeenCalledOnce();
      expect(outerSpy).not.toHaveBeenCalled();
    });

    it('should activate a global shortcut when focus is outside every scope', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const outsideBtn = addEl('button');

      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.global = true;
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(outsideBtn, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should not activate a global shortcut when a scoped shortcut handled the key', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);

      const scopedShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      scopedShortcut.setAttribute('key', 'a');
      scope.appendChild(scopedShortcut);

      const globalShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      globalShortcut.setAttribute('key', 'a');
      globalShortcut.global = true;
      scope.appendChild(globalShortcut);

      const scopedSpy = vi.fn();
      const globalSpy = vi.fn();
      scopedShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, scopedSpy);
      globalShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, globalSpy);

      keydown(btn, { key: 'a' });

      expect(scopedSpy).toHaveBeenCalledOnce();
      expect(globalSpy).not.toHaveBeenCalled();
    });

    it('should activate the global shortcut too when the scoped shortcut has fallthrough', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);

      const scopedShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      scopedShortcut.setAttribute('key', 'a');
      scopedShortcut.fallthrough = true;
      scope.appendChild(scopedShortcut);

      const globalShortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      globalShortcut.setAttribute('key', 'a');
      globalShortcut.global = true;
      scope.appendChild(globalShortcut);

      const scopedSpy = vi.fn();
      const globalSpy = vi.fn();
      scopedShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, scopedSpy);
      globalShortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, globalSpy);

      keydown(btn, { key: 'a' });

      expect(scopedSpy).toHaveBeenCalledOnce();
      expect(globalSpy).toHaveBeenCalledOnce();
    });
  });

  describe('disabled anchor', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    function keydown(target: Element, init: KeyboardEventInit = {}): KeyboardEvent {
      const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
      target.dispatchEvent(evt);
      return evt;
    }

    it('should still emit when the anchor button is disabled', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      btn.id = 'anchor-btn';
      btn.disabled = true;
      scope.appendChild(btn);

      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.setAttribute('anchor', 'anchor-btn');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);

      const child = document.createElement('span');
      scope.appendChild(child);
      keydown(child, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('typing and repeat', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    function keydown(target: Element, init: KeyboardEventInit = {}): void {
      target.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }));
    }

    it('should not activate from a textarea by default', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const textarea = document.createElement('textarea');
      scope.appendChild(textarea);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(textarea, { key: 'a' });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not activate from a contenteditable element by default', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const editable = document.createElement('div');
      editable.contentEditable = 'true';
      scope.appendChild(editable);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(editable, { key: 'a' });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should activate from a contenteditable element when allowWhileTyping is true', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const editable = document.createElement('div');
      editable.contentEditable = 'true';
      scope.appendChild(editable);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.allowWhileTyping = true;
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(editable, { key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should ignore repeated keydown events by default', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(btn, { key: 'a', repeat: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should activate on repeated keydown events when allowRepeat is true', () => {
      const scope = addEl('div');
      scope.setAttribute('forge-keyboard-shortcut-scope', '');
      const btn = document.createElement('button');
      scope.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.allowRepeat = true;
      scope.appendChild(shortcut);

      const spy = vi.fn();
      shortcut.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      keydown(btn, { key: 'a', repeat: true });

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('aria-keyshortcuts', () => {
    const elements: Element[] = [];

    afterEach(() => {
      elements.forEach(el => el.remove());
      elements.length = 0;
    });

    function addEl<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      parent.appendChild(el);
      elements.push(el);
      return el;
    }

    it('should set aria-keyshortcuts on the anchor', async () => {
      const harness = await createFixture({ key: 'Control+a' });
      expect(harness.targetEl?.getAttribute('aria-keyshortcuts')).toBeTruthy();
    });

    it('should format mod as Control on pc and Meta on apple', async () => {
      const { formatAriaKeyShortcuts: format } = await import('./keyboard-shortcut-utils.js');
      const pc = format('mod+a', 'pc');
      const apple = format('mod+a', 'apple');
      expect(pc).toBe('Control+A');
      expect(apple).toBe('Meta+A');
    });

    it('should not overwrite an author-provided aria-keyshortcuts', () => {
      const container = addEl('div');
      const btn = document.createElement('button');
      btn.id = 'my-btn';
      btn.setAttribute('aria-keyshortcuts', 'Control+S');
      container.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'Control+a');
      shortcut.setAttribute('anchor', 'my-btn');
      container.appendChild(shortcut);

      expect(btn.getAttribute('aria-keyshortcuts')).toBe('Control+S');
    });

    it('should remove aria-keyshortcuts when disconnected', async () => {
      const harness = await createFixture({ key: 'Control+a' });
      expect(harness.targetEl?.hasAttribute('aria-keyshortcuts')).toBe(true);

      harness.keyboardShortcutEl.remove();
      expect(harness.targetEl?.hasAttribute('aria-keyshortcuts')).toBe(false);
    });

    it('should update aria-keyshortcuts when key changes', async () => {
      const harness = await createFixture({ key: 'Control+a' });
      const initial = harness.targetEl?.getAttribute('aria-keyshortcuts');

      harness.keyboardShortcutEl.key = 'Control+b';
      await harness.keyboardShortcutEl.updateComplete;

      const updated = harness.targetEl?.getAttribute('aria-keyshortcuts');
      expect(updated).not.toBe(initial);
      expect(updated).toContain('B');
    });

    it('should not set aria-keyshortcuts when anchorAccessibility is none', () => {
      const container = addEl('div');
      const btn = document.createElement('button');
      container.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'a');
      shortcut.anchorAccessibility = 'none';
      container.appendChild(shortcut);

      expect(btn.hasAttribute('aria-keyshortcuts')).toBe(false);
    });

    it('should not set aria-keyshortcuts when useCode is true', () => {
      const container = addEl('div');
      const btn = document.createElement('button');
      container.appendChild(btn);
      const shortcut = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
      shortcut.setAttribute('key', 'KeyA');
      shortcut.useCode = true;
      container.appendChild(shortcut);

      expect(btn.hasAttribute('aria-keyshortcuts')).toBe(false);
    });
  });

  describe('key sequences', () => {
    it('should emit an activate event when a two-chord sequence is completed', async () => {
      const harness = await createFixture({ key: 'Control+k>Control+c' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', ctrlKey: true, bubbles: true, cancelable: true }));

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should pass the final chord event as the activate event detail', async () => {
      const harness = await createFixture({ key: 'Control+k>Control+c' });

      let detail: KeyboardEvent | undefined;
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, ((evt: CustomEvent<KeyboardEvent>) => {
        detail = evt.detail;
      }) as EventListener);

      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', ctrlKey: true, bubbles: true, cancelable: true }));

      expect(detail).toBeDefined();
      expect(detail!.key).toBe('c');
    });

    it('should not set aria-keyshortcuts for sequence keys', async () => {
      const harness = await createFixture({ key: 'Control+k>Control+c' });
      expect(harness.targetEl?.hasAttribute('aria-keyshortcuts')).toBe(false);
    });

    it('should complete a sequence when the modifier is released and pressed again between chords', async () => {
      const harness = await createFixture({ key: 'Control+k>Control+c' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Control', bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', ctrlKey: true, bubbles: true, cancelable: true }));

      expect(activateSpy).toHaveBeenCalledOnce();
    });

    it('should cancel a pending sequence when a non-modifier key does not match the next chord', async () => {
      const harness = await createFixture({ key: 'Control+k>Control+c' });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', ctrlKey: true, bubbles: true, cancelable: true }));
      harness.targetEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', ctrlKey: true, bubbles: true, cancelable: true }));

      expect(activateSpy).not.toHaveBeenCalled();
    });
  });

  describe('deprecated target', () => {
    it('should still attach to the element matched by the target selector', async () => {
      const harness = await createFixture({ key: 'a', target: '#test-target' });

      const spy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, spy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});

class KeyboardShortcutHarness {
  constructor(
    public readonly containerEl: HTMLElement,
    public readonly keyboardShortcutEl: IKeyboardShortcutComponent,
    public readonly targetEl: HTMLInputElement | HTMLButtonElement | null
  ) {}

  public dispatchKeyboardEvent(evt: KeyboardEventInit, global?: boolean): void {
    if (global) {
      document.dispatchEvent(new KeyboardEvent('keydown', evt));
    }
    this.targetEl?.dispatchEvent(new KeyboardEvent('keydown', evt));
  }
}

interface KeyboardShortcutFixtureConfig extends Partial<IKeyboardShortcutComponent> {
  targetElement?: 'button' | 'input' | false;
  appendTooltip?: boolean;
}

async function createFixture({
  key,
  target,
  global,
  allowWhileTyping,
  preventDefault,
  capture,
  useCode,
  disabled,
  activateCallback,
  targetElement = 'button',
  appendTooltip
}: KeyboardShortcutFixtureConfig = {}): Promise<KeyboardShortcutHarness> {
  const TARGET_ELS = {
    button: html`<button id="test-target"></button>`,
    input: html`<input id="test-target" />`
  };
  const screen = render(html`
    <div id="container">
      ${targetElement ? TARGET_ELS[targetElement] : nothing} ${appendTooltip ? html`<forge-tooltip></forge-tooltip>` : nothing}
      <forge-keyboard-shortcut
        key=${key ?? nothing}
        target=${target ?? nothing}
        ?global=${global ?? nothing}
        ?allow-while-typing=${allowWhileTyping ?? nothing}
        .preventDefault=${!!preventDefault}
        ?capture=${capture ?? nothing}
        ?use-code=${useCode ?? nothing}
        ?disabled=${disabled ?? nothing}
        .activateCallback=${activateCallback}></forge-keyboard-shortcut>
    </div>
  `);

  const el = screen.container.querySelector('#container') as HTMLElement;
  const keyboardShortcutEl = el.querySelector('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
  const targetEl = el.querySelector(':is(button,input)') as HTMLInputElement | HTMLButtonElement | null;

  return new KeyboardShortcutHarness(el, keyboardShortcutEl, targetEl);
}
