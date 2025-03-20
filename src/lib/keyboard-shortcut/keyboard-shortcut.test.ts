import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { IKeyboardShortcutComponent } from './keyboard-shortcut';
import { KEYBOARD_SHORTCUT_CONSTANTS } from './keyboard-shortcut-constants';

import './keyboard-shortcut';

describe('Keyboard Shortcut', () => {
  describe('events', () => {
    it('should emit an event on a matching target keydown event', async () => {
      const harness = await createFixture({ key: 'a' });
      expect(harness.keyboardShortcutEl.key).to.equal('a');

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should invoke the callback function on a matching target keydown event', async () => {
      const activateCallback = sinon.spy();
      const harness = await createFixture({ key: 'a', activateCallback });

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateCallback.calledOnce).to.be.true;
    });
  });

  describe('attributes', () => {
    it('should set key when a key attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('key', 'a');

      expect(harness.keyboardShortcutEl.key).to.equal('a');
    });

    it('should set target when a target attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('target', 'button');

      expect(harness.keyboardShortcutEl.target).to.equal('button');
    });

    it('should set global when a global attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('global', '');

      expect(harness.keyboardShortcutEl.global).to.be.true;
    });

    it('should set allowWhileTyping when an allow-while-typing attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('allow-while-typing', '');

      expect(harness.keyboardShortcutEl.allowWhileTyping).to.be.true;
    });

    it('should set preventDefault when a prevent-default attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('prevent-default', '');

      expect(harness.keyboardShortcutEl.preventDefault).to.be.true;
    });

    it('should set capture when a capture attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('capture', '');

      expect(harness.keyboardShortcutEl.capture).to.be.true;
    });

    it('should set disabled when a disabled attribute is provided', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.setAttribute('disabled', '');

      expect(harness.keyboardShortcutEl.disabled).to.be.true;
    });
  });

  describe('properties', () => {
    it('should not be active when disabled is true', async () => {
      const harness = await createFixture();
      harness.keyboardShortcutEl.key = 'a';
      harness.keyboardShortcutEl.disabled = true;

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.called).to.be.false;
    });

    it('should activate when toggling disabled from false to true', async () => {
      const harness = await createFixture({ key: 'a', disabled: true });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.called).to.be.false;

      harness.keyboardShortcutEl.disabled = false;
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should not invoke the callback when disabled is true', async () => {
      const activateCallback = sinon.spy();
      const harness = await createFixture({ key: 'a', disabled: true, activateCallback });

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateCallback.called).to.be.false;
    });

    it('should connect target element when disabled is false', async () => {
      const harness = await createFixture({ key: 'a', disabled: false });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should prevent default on the keydown event by default', async () => {
      const harness = await createFixture({ key: 'a', allowWhileTyping: true, preventDefault: true });

      const evt = new KeyboardEvent('keydown', { key: 'a' });
      const preventDefaultSpy = sinon.spy(evt, 'preventDefault');
      harness.targetEl?.dispatchEvent(evt);

      expect(preventDefaultSpy.calledOnce).to.be.true;
    });

    it('should allow default on the keydown event when preventDefault is false', async () => {
      const harness = await createFixture({ targetElement: 'input', key: 'a', allowWhileTyping: true, preventDefault: false });

      const evt = new KeyboardEvent('keydown', { key: 'a' });
      const preventDefaultSpy = sinon.spy(evt, 'preventDefault');
      harness.targetEl?.dispatchEvent(evt);

      await elementUpdated(harness.keyboardShortcutEl);

      expect(preventDefaultSpy.called).to.be.false;
    });

    it('should set key property when using keyBinding alias', async () => {
      const harness = await createFixture();

      harness.keyboardShortcutEl.keyBinding = 'a';

      expect(harness.keyboardShortcutEl.key).to.equal('a');
    });

    it('should get key when accessing keyBinding alias', async () => {
      const harness = await createFixture({ key: 'a' });

      expect(harness.keyboardShortcutEl.keyBinding).to.equal('a');
    });
  });

  describe('key binding', () => {
    it('should treat capital and lowercase characters identically', async () => {
      const harness = await createFixture();

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.keyboardShortcutEl.key = 'A';
      harness.dispatchKeyboardEvent({ key: 'a' });

      harness.keyboardShortcutEl.key = 'a';
      harness.dispatchKeyboardEvent({ key: 'A' });

      expect(activateSpy.calledTwice).to.be.true;
    });

    it('should treat capital characters and keys with shift differently', async () => {
      const harness = await createFixture();

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.keyboardShortcutEl.key = 'Shift+a';
      harness.dispatchKeyboardEvent({ key: 'A' });

      harness.keyboardShortcutEl.key = 'A';
      harness.dispatchKeyboardEvent({ key: 'A', shiftKey: true });

      expect(activateSpy.called).to.be.false;
    });

    it('should activate when Alt is pressed', async () => {
      const harness = await createFixture({ key: 'Alt+a' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', altKey: true });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when Control is pressed', async () => {
      const harness = await createFixture({ key: 'Control+a' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', ctrlKey: true });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when Meta is pressed', async () => {
      const harness = await createFixture({ key: 'Meta+a' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', metaKey: true });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when Shift is pressed', async () => {
      const harness = await createFixture({ key: 'Shift+a' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', shiftKey: true });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when multiple modifier keys are pressed', async () => {
      const harness = await createFixture({ key: 'Shift+Alt+a' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a', shiftKey: true, altKey: true });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when + is pressed', async () => {
      const harness = await createFixture({ key: 'plus' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: '+' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when space is pressed', async () => {
      const harness = await createFixture({ key: 'space' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: ' ' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should activate when multiple key bindings are provided', async () => {
      const harness = await createFixture({ key: 'a b' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });
      harness.dispatchKeyboardEvent({ key: 'b' });

      expect(activateSpy.calledTwice).to.be.true;
    });

    it('should not activate when no keys are specified', async () => {
      const harness = await createFixture();

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.called).to.be.false;
    });

    it('should activate when a code is provided and useCode is true', async () => {
      const harness = await createFixture({ key: 'Digit1', useCode: true });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);

      harness.dispatchKeyboardEvent({ code: 'Digit1' });

      expect(activateSpy.calledOnce).to.be.true;
    });
  });

  describe('target element', () => {
    it('should connect to a target element by selector', async () => {
      const harness = await createFixture({ key: 'a', target: '#test-target' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    ['text', 'password', 'search', 'tel', 'url', 'email', 'number', 'date', 'time', 'datetime-local', 'month', 'week'].forEach(type => {
      it(`should not activate when an event is emitted from a ${type} input element by default`, async () => {
        const harness = await createFixture({ key: 'a', targetElement: 'input' });
        harness.targetEl?.setAttribute('type', type);

        const activateSpy = sinon.spy();
        harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
        harness.dispatchKeyboardEvent({ key: 'a' });

        expect(activateSpy.called).to.be.false;
      });
    });

    it('should activate when an event is emitted from an input element allowWhileTyping is set to true', async () => {
      const harness = await createFixture({ key: 'a', targetElement: 'input', allowWhileTyping: true });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should skip tooltip elements when searching for a target', async () => {
      const harness = await createFixture({ key: 'a', appendTooltip: true });

      harness.keyboardShortcutEl.target = '#test-target';

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.dispatchKeyboardEvent({ key: 'a' });

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should connect to the parent element when no previous siblings exist and a selector is not provided', async () => {
      const harness = await createFixture({ key: 'a', targetElement: false });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.containerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should connect to the parent element if it matches the selector', async () => {
      const harness = await createFixture({ key: 'a', target: '#container' });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      harness.containerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy.calledOnce).to.be.true;
    });

    it('should throw when unable to find target element', async () => {
      const el = document.createElement('forge-keyboard-shortcut');

      const action = () => {
        (el as any)['_core']['_initializeTargetElement']();
      };

      expect(action).to.throw();
    });

    it('should activate on events on the document element when global is true', async () => {
      const harness = await createFixture({ key: 'a', global: true });

      const activateSpy = sinon.spy();
      harness.keyboardShortcutEl.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, activateSpy);
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(activateSpy.calledOnce).to.be.true;
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
  // prettier-ignore
  const el = await fixture<HTMLElement>(html`
    <div id="container">
      ${targetElement ? TARGET_ELS[targetElement] : nothing}
      ${appendTooltip ? html`<forge-tooltip></forge-tooltip>` : nothing}
      <forge-keyboard-shortcut
        key=${key ?? nothing}
        target=${target ?? nothing}
        ?global=${global ?? nothing}
        ?allow-while-typing=${allowWhileTyping ?? nothing}
        .preventDefault=${!!preventDefault}
        ?capture=${capture ?? nothing}
        ?use-code=${useCode ?? nothing}
        ?disabled=${disabled ?? nothing}
        .activateCallback=${activateCallback}></forge-keyboard-shortcut
      >'
    </div>
  `);

  const keyboardShortcutEl = el.querySelector('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
  const targetEl = el.querySelector(':is(button,input)') as HTMLInputElement | HTMLButtonElement | null;

  return new KeyboardShortcutHarness(el, keyboardShortcutEl, targetEl);
}
