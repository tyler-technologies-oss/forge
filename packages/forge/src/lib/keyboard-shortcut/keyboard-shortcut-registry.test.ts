import { describe, it, expect, vi, afterEach } from 'vitest';
import { registerKeyboardShortcut } from './keyboard-shortcut-registry.js';
import type { IKeyboardShortcutRegistration } from './keyboard-shortcut-constants.js';
import { SEQUENCE_TIMEOUT } from './keyboard-shortcut-constants.js';
import { task } from '../core/utils/utils.js';

describe('Keyboard Shortcut Registry', () => {
  const elements: Element[] = [];
  const registrations: IKeyboardShortcutRegistration[] = [];

  afterEach(() => {
    registrations.forEach(r => r.dispose());
    registrations.length = 0;
    elements.forEach(el => el.remove());
    elements.length = 0;
  });

  function addElement<K extends keyof HTMLElementTagNameMap>(tag: K, parent: Element = document.body): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    parent.appendChild(el);
    elements.push(el);
    return el;
  }

  function reg(options: Parameters<typeof registerKeyboardShortcut>[0]): IKeyboardShortcutRegistration {
    const r = registerKeyboardShortcut(options);
    registrations.push(r);
    return r;
  }

  function keydown(target: Element, init: KeyboardEventInit = {}): KeyboardEvent {
    const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
    target.dispatchEvent(evt);
    return evt;
  }

  it('should invoke onActivate when a matching keydown bubbles through the scope element', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spy });

    keydown(child, { key: 'a' });

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should not invoke onActivate when the keydown originates outside the scope element', () => {
    const scope = addElement('div');
    const outside = addElement('button');
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spy });

    keydown(outside, { key: 'a' });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should attach to the document element when global is true', () => {
    const spy = vi.fn();
    reg({ key: 'a', global: true, onActivate: spy });
    const el = addElement('div');

    keydown(el, { key: 'a' });

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should set tabindex to -1 on a non-focusable scope element on first registration', () => {
    const scope = addElement('div');
    reg({ key: 'a', scopeElement: scope, onActivate: vi.fn() });

    expect(scope.getAttribute('tabindex')).toBe('-1');
  });

  it('should not change an existing tabindex attribute on the scope element', () => {
    const scope = addElement('div');
    scope.setAttribute('tabindex', '0');
    reg({ key: 'a', scopeElement: scope, onActivate: vi.fn() });

    expect(scope.getAttribute('tabindex')).toBe('0');
  });

  it('should not set tabindex on the document element', () => {
    const hadTabindex = document.documentElement.hasAttribute('tabindex');
    reg({ key: 'a', global: true, onActivate: vi.fn() });

    if (!hadTabindex) {
      expect(document.documentElement.hasAttribute('tabindex')).toBe(false);
    }
  });

  it('should only activate the inner scope when nested scopes bind the same key', () => {
    const outer = addElement('div');
    const inner = addElement('div', outer);
    const child = addElement('button', inner);
    const outerSpy = vi.fn();
    const innerSpy = vi.fn();

    reg({ key: 'a', scopeElement: outer, onActivate: outerSpy });
    reg({ key: 'a', scopeElement: inner, onActivate: innerSpy });

    keydown(child, { key: 'a' });

    expect(innerSpy).toHaveBeenCalledOnce();
    expect(outerSpy).not.toHaveBeenCalled();
  });

  it('should activate both scopes when the inner registration has fallthrough', () => {
    const outer = addElement('div');
    const inner = addElement('div', outer);
    const child = addElement('button', inner);
    const outerSpy = vi.fn();
    const innerSpy = vi.fn();

    reg({ key: 'a', scopeElement: outer, onActivate: outerSpy });
    reg({ key: 'a', scopeElement: inner, fallthrough: true, onActivate: innerSpy });

    keydown(child, { key: 'a' });

    expect(innerSpy).toHaveBeenCalledOnce();
    expect(outerSpy).toHaveBeenCalledOnce();
  });

  it('should activate a capture registration on the outer scope before the inner bubble registration', () => {
    const outer = addElement('div');
    const inner = addElement('div', outer);
    const child = addElement('button', inner);
    const order: string[] = [];

    reg({ key: 'a', scopeElement: outer, capture: true, onActivate: () => order.push('outer-capture') });
    reg({ key: 'a', scopeElement: inner, onActivate: () => order.push('inner-bubble') });

    keydown(child, { key: 'a' });

    expect(order).toEqual(['outer-capture']);
  });

  it('should activate every matching registration within the same scope', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy1 = vi.fn();
    const spy2 = vi.fn();

    reg({ key: 'a', scopeElement: scope, onActivate: spy1 });
    reg({ key: 'a', scopeElement: scope, onActivate: spy2 });

    keydown(child, { key: 'a' });

    expect(spy1).toHaveBeenCalledOnce();
    expect(spy2).toHaveBeenCalledOnce();
  });

  it('should skip a registration when the event is composing', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spy });

    keydown(child, { key: 'a', isComposing: true });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should skip a registration when the event is already default prevented', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spy });

    const evt = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });
    evt.preventDefault();
    child.dispatchEvent(evt);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should skip repeated keydown events unless allowRepeat is true', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spyNoRepeat = vi.fn();
    const spyRepeat = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spyNoRepeat });
    reg({ key: 'a', scopeElement: scope, allowRepeat: true, onActivate: spyRepeat });

    keydown(child, { key: 'a', repeat: true });

    expect(spyNoRepeat).not.toHaveBeenCalled();
    expect(spyRepeat).toHaveBeenCalledOnce();
  });

  it('should skip when the composed target is a text entry element unless allowWhileTyping is true', () => {
    const scope = addElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    scope.appendChild(input);
    elements.push(input);

    const spyBlocked = vi.fn();
    const spyAllowed = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spyBlocked });
    reg({ key: 'a', scopeElement: scope, allowWhileTyping: true, onActivate: spyAllowed });

    keydown(input, { key: 'a' });

    expect(spyBlocked).not.toHaveBeenCalled();
    expect(spyAllowed).toHaveBeenCalledOnce();
  });

  it('should detect a text entry target inside a shadow root', () => {
    const scope = addElement('div');
    const host = addElement('div', scope);
    const shadow = host.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.type = 'text';
    shadow.appendChild(input);

    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, onActivate: spy });

    const evt = new KeyboardEvent('keydown', { key: 'a', bubbles: true, composed: true, cancelable: true });
    input.dispatchEvent(evt);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should still invoke onActivate when the anchor is disabled', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const anchor = addElement('button', scope);
    anchor.disabled = true;
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, anchorElement: anchor, onActivate: spy });

    keydown(child, { key: 'a' });

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should call preventDefault by default and not when preventDefault is false', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    reg({ key: 'a', scopeElement: scope, onActivate: vi.fn() });

    const evt1 = keydown(child, { key: 'a' });
    expect(evt1.defaultPrevented).toBe(true);

    const scope2 = addElement('div');
    const child2 = addElement('button', scope2);
    reg({ key: 'b', scopeElement: scope2, preventDefault: false, onActivate: vi.fn() });

    const evt2 = keydown(child2, { key: 'b' });
    expect(evt2.defaultPrevented).toBe(false);
  });

  it('should skip registrations whose anchor and scope are outside an open modal dialog', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, anchorElement: child, onActivate: spy });

    const dialog = document.createElement('dialog');
    const dialogBtn = document.createElement('button');
    dialog.appendChild(dialogBtn);
    document.body.appendChild(dialog);
    elements.push(dialog);
    dialog.showModal();

    keydown(dialogBtn, { key: 'a' });

    expect(spy).not.toHaveBeenCalled();
    dialog.close();
  });

  it('should keep working for a registration whose anchor is inside the open modal dialog', () => {
    const dialog = document.createElement('dialog');
    const dialogBtn = document.createElement('button');
    dialog.appendChild(dialogBtn);
    document.body.appendChild(dialog);
    elements.push(dialog);
    dialog.showModal();

    const spy = vi.fn();
    reg({ key: 'a', scopeElement: dialog, anchorElement: dialogBtn, onActivate: spy });

    keydown(dialogBtn, { key: 'a' });

    expect(spy).toHaveBeenCalledOnce();
    dialog.close();
  });

  it('should warn once when a duplicate binding is registered in the same scope', () => {
    const scope = addElement('div');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    reg({ key: 'a', scopeElement: scope, onActivate: vi.fn() });
    reg({ key: 'a', scopeElement: scope, onActivate: vi.fn() });

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Duplicate key binding'), expect.anything());

    warnSpy.mockRestore();
  });

  it('should remove listeners and allow garbage collection of the scope when the last registration is disposed', () => {
    const scope = addElement('div');
    const child = addElement('button', scope);
    const spy = vi.fn();

    const r = registerKeyboardShortcut({ key: 'a', scopeElement: scope, onActivate: spy });
    registrations.push(r);

    keydown(child, { key: 'a' });
    expect(spy).toHaveBeenCalledOnce();

    r.dispose();
    registrations.pop();
    spy.mockReset();

    keydown(child, { key: 'a' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should throw when neither scopeElement nor global is provided', () => {
    expect(() => registerKeyboardShortcut({ key: 'a', onActivate: vi.fn() })).toThrow();
  });

  it('should resolve the scope from the nearest marker above ownerElement when no scopeElement is provided', () => {
    const marker = addElement('div');
    marker.setAttribute('forge-keyboard-shortcut-scope', '');
    const owner = addElement('span', marker);
    const spy = vi.fn();
    reg({ key: 'a', ownerElement: owner, onActivate: spy });

    keydown(owner, { key: 'a' });

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should not activate for keydowns outside the marker resolved from ownerElement', () => {
    const marker = addElement('div');
    marker.setAttribute('forge-keyboard-shortcut-scope', '');
    const owner = addElement('span', marker);
    const outside = addElement('button');
    const spy = vi.fn();
    reg({ key: 'a', ownerElement: owner, onActivate: spy });

    keydown(outside, { key: 'a' });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should prefer an explicit scopeElement over the marker above ownerElement', () => {
    const marker = addElement('div');
    marker.setAttribute('forge-keyboard-shortcut-scope', '');
    const owner = addElement('span', marker);
    const scope = addElement('div');
    const spy = vi.fn();
    reg({ key: 'a', scopeElement: scope, ownerElement: owner, onActivate: spy });

    keydown(owner, { key: 'a' });
    expect(spy).not.toHaveBeenCalled();

    keydown(scope, { key: 'a' });
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should throw when ownerElement has no ancestor scope marker', () => {
    const owner = addElement('span');

    expect(() => registerKeyboardShortcut({ key: 'a', ownerElement: owner, onActivate: vi.fn() })).toThrow();
  });

  describe('key sequences', () => {
    it('should activate a two-chord sequence when pressed in order within timeout', async () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });

      keydown(child, { key: 'k', ctrlKey: true });
      keydown(child, { key: 'c', ctrlKey: true });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should not activate a sequence when chords are pressed in wrong order', () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });

      keydown(child, { key: 'c', ctrlKey: true });
      keydown(child, { key: 'k', ctrlKey: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not activate a sequence when a non-matching key is pressed as the second chord', async () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });

      keydown(child, { key: 'k', ctrlKey: true });
      keydown(child, { key: 'x', ctrlKey: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not activate a sequence when the timeout expires', async () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });

      keydown(child, { key: 'k', ctrlKey: true });
      await task(SEQUENCE_TIMEOUT + 100);
      keydown(child, { key: 'c', ctrlKey: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should cancel a pending sequence when Escape is pressed', () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });

      keydown(child, { key: 'k', ctrlKey: true });
      keydown(child, { key: 'Escape' });
      keydown(child, { key: 'c', ctrlKey: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it('should preventDefault on the first chord of a sequence', () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: vi.fn() });

      const evt = keydown(child, { key: 'k', ctrlKey: true });

      expect(evt.defaultPrevented).toBe(true);
    });

    it('should fire a deferred standalone when the sequence times out', async () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const standaloneSpy = vi.fn();
      const sequenceSpy = vi.fn();
      reg({ key: 'Control+k', scopeElement: scope, onActivate: standaloneSpy });
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: sequenceSpy });

      keydown(child, { key: 'k', ctrlKey: true });
      expect(standaloneSpy).not.toHaveBeenCalled();

      await task(SEQUENCE_TIMEOUT + 100);

      expect(standaloneSpy).toHaveBeenCalledOnce();
      expect(sequenceSpy).not.toHaveBeenCalled();
    });

    it('should fire the sequence and discard the standalone when the sequence completes', () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const standaloneSpy = vi.fn();
      const sequenceSpy = vi.fn();
      reg({ key: 'Control+k', scopeElement: scope, onActivate: standaloneSpy });
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: sequenceSpy });

      keydown(child, { key: 'k', ctrlKey: true });
      keydown(child, { key: 'c', ctrlKey: true });

      expect(sequenceSpy).toHaveBeenCalledOnce();
      expect(standaloneSpy).not.toHaveBeenCalled();
    });

    it('should cancel both standalone and sequence when Escape is pressed during pending', () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const standaloneSpy = vi.fn();
      const sequenceSpy = vi.fn();
      reg({ key: 'Control+k', scopeElement: scope, onActivate: standaloneSpy });
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: sequenceSpy });

      keydown(child, { key: 'k', ctrlKey: true });
      keydown(child, { key: 'Escape' });

      expect(standaloneSpy).not.toHaveBeenCalled();
      expect(sequenceSpy).not.toHaveBeenCalled();
    });

    it('should isolate pending state per scope', () => {
      const scope1 = addElement('div');
      const child1 = addElement('button', scope1);
      const scope2 = addElement('div');
      const child2 = addElement('button', scope2);
      const spy1 = vi.fn();
      const spy2 = vi.fn();
      reg({ key: 'Control+k>Control+c', scopeElement: scope1, onActivate: spy1 });
      reg({ key: 'a', scopeElement: scope2, onActivate: spy2 });

      keydown(child1, { key: 'k', ctrlKey: true });
      keydown(child2, { key: 'a' });

      expect(spy2).toHaveBeenCalledOnce();
      expect(spy1).not.toHaveBeenCalled();

      keydown(child1, { key: 'c', ctrlKey: true });
      expect(spy1).toHaveBeenCalledOnce();
    });

    it('should clear pending state when the entry is disposed during a pending sequence', async () => {
      const scope = addElement('div');
      const child = addElement('button', scope);
      const spy = vi.fn();
      const r = registerKeyboardShortcut({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: spy });
      registrations.push(r);

      keydown(child, { key: 'k', ctrlKey: true });
      r.dispose();
      registrations.pop();

      keydown(child, { key: 'c', ctrlKey: true });
      expect(spy).not.toHaveBeenCalled();
    });

    it('should warn once when a duplicate sequence is registered in the same scope', () => {
      const scope = addElement('div');
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: vi.fn() });
      reg({ key: 'Control+k>Control+c', scopeElement: scope, onActivate: vi.fn() });

      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Duplicate key binding'), expect.anything());

      warnSpy.mockRestore();
    });
  });
});
