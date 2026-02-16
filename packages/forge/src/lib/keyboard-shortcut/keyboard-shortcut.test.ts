import { describe, it, expect, vi } from 'vitest';
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
      harness.dispatchKeyboardEvent({ key: 'a' });

      harness.keyboardShortcutEl.key = 'a';
      harness.dispatchKeyboardEvent({ key: 'A' });

      expect(activateSpy).toHaveBeenCalledTimes(2);
    });

    it('should treat capital characters and keys with shift differently', async () => {
      const harness = await createFixture();

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.keyboardShortcutEl.key = 'Shift+a';
      harness.dispatchKeyboardEvent({ key: 'A' });

      harness.keyboardShortcutEl.key = 'A';
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

    it('should throw when unable to find target element', async () => {
      const el = document.createElement('forge-keyboard-shortcut');

      const action = (): void => {
        (el as any)['_core']['_initializeTargetElement']();
      };

      expect(action).toThrow();
    });

    it('should activate on events on the document element when global is true', async () => {
      const harness = await createFixture({ key: 'a', global: true });

      const activateSpy = vi.fn();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy).toHaveBeenCalledOnce();
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
