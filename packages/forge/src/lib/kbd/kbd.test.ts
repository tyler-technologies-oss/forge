import { Platform } from '@tylertech/forge-core';
import { html } from 'lit';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import type { KbdComponent } from './kbd.js';

import './kbd.js';

function getKeyElements(el: KbdComponent): HTMLElement[] {
  return Array.from(el.shadowRoot?.querySelectorAll('kbd') ?? []);
}

describe('Kbd', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize', async () => {
    const screen = render(html`<forge-kbd></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-kbd ctrl shift keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await expect(el).toBeAccessible();
  });

  it('should default all properties', async () => {
    const el = document.createElement('forge-kbd') as KbdComponent;

    expect(el.keys).toEqual([]);
    expect(el.alt).toBe(false);
    expect(el.ctrl).toBe(false);
    expect(el.meta).toBe(false);
    expect(el.shift).toBe(false);
    expect(el.dense).toBe(false);
    expect(el.theme).toBe('');
  });

  it('should render a root kbd element with a key element for each modifier and key', async () => {
    vi.spyOn(Platform, 'APPLE_PLATFORM', 'get').mockReturnValue(false);
    const screen = render(html`<forge-kbd ctrl shift keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [root, ...keyElements] = getKeyElements(el);
    expect(root.getAttribute('part')).toBe('root');
    expect(root.className).toBe('forge-kbd');
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['Ctrl', 'Shift', 'K']);
    keyElements.forEach(key => expect(key.getAttribute('part')).toBe('key'));
  });

  it('should render only keys when no modifiers are set', async () => {
    const screen = render(html`<forge-kbd keys="Escape"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['Esc']);
  });

  it('should render only a root kbd element when no modifiers or keys are set', async () => {
    const screen = render(html`<forge-kbd></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    expect(getKeyElements(el).length).toBe(1);
  });

  it('should render multiple keys from a space-separated keys attribute', async () => {
    const screen = render(html`<forge-kbd keys="J K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['J', 'K']);
  });

  it('should render modifiers before keys in ctrl, shift, alt, meta order', async () => {
    vi.spyOn(Platform, 'APPLE_PLATFORM', 'get').mockReturnValue(false);
    const screen = render(html`<forge-kbd ctrl shift alt meta keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['Ctrl', 'Shift', 'Alt', '⊞', 'K']);
  });

  it('should render Windows-style modifier glyphs when not on an Apple platform', async () => {
    vi.spyOn(Platform, 'APPLE_PLATFORM', 'get').mockReturnValue(false);
    const screen = render(html`<forge-kbd ctrl shift alt meta keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['Ctrl', 'Shift', 'Alt', '⊞', 'K']);
  });

  it('should render Apple-style modifier glyphs when on an Apple platform', async () => {
    vi.spyOn(Platform, 'APPLE_PLATFORM', 'get').mockReturnValue(true);
    const screen = render(html`<forge-kbd ctrl shift alt meta keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['⌃', 'Shift', '⌥', '⌘', 'K']);
  });

  it('should render "Enter" using the platform-appropriate glyph', async () => {
    const screen = render(html`<forge-kbd keys="Enter"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual([Platform.APPLE_PLATFORM ? 'Return' : 'Enter']);
  });

  it('should render mapped glyphs for known non-alphanumeric keys', async () => {
    const screen = render(html`<forge-kbd keys="ArrowUp ArrowDown ArrowLeft ArrowRight"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['↑', '↓', '←', '→']);
  });

  it('should render an unmapped key in title case', async () => {
    const screen = render(html`<forge-kbd keys="k"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['K']);
  });

  it('should apply the dense class to each key when dense is set', async () => {
    const screen = render(html`<forge-kbd ctrl keys="K" dense></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    keyElements.forEach(key => expect(key.classList.contains('dense')).toBe(true));
  });

  it('should not apply the dense class when dense is false', async () => {
    const screen = render(html`<forge-kbd keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    keyElements.forEach(key => expect(key.classList.contains('dense')).toBe(false));
  });

  it('should apply a theme class to each key when theme is set', async () => {
    const screen = render(html`<forge-kbd ctrl keys="K" theme="primary"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    keyElements.forEach(key => expect(key.classList.contains('theme-primary')).toBe(true));
  });

  it('should not apply a theme class when theme is not set', async () => {
    const screen = render(html`<forge-kbd keys="K"></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    keyElements.forEach(key => expect(Array.from(key.classList)).toEqual(['key']));
  });

  it('should set properties from boolean attributes', async () => {
    const el = document.createElement('forge-kbd') as KbdComponent;
    el.setAttribute('ctrl', '');
    el.setAttribute('shift', '');
    el.setAttribute('alt', '');
    el.setAttribute('meta', '');
    el.setAttribute('dense', '');
    document.body.append(el);
    await el.updateComplete;

    expect(el.ctrl).toBe(true);
    expect(el.shift).toBe(true);
    expect(el.alt).toBe(true);
    expect(el.meta).toBe(true);
    expect(el.dense).toBe(true);

    el.remove();
  });

  it('should set the keys property from a space-separated keys attribute', async () => {
    const el = document.createElement('forge-kbd') as KbdComponent;
    el.setAttribute('keys', 'a b c');
    document.body.append(el);
    await el.updateComplete;

    expect(el.keys).toEqual(['a', 'b', 'c']);

    el.remove();
  });

  it('should re-render when the keys property is set directly', async () => {
    const screen = render(html`<forge-kbd></forge-kbd>`);
    const el = screen.container.querySelector('forge-kbd')!;
    el.keys = ['x', 'y'];
    await el.updateComplete;

    const [, ...keyElements] = getKeyElements(el);
    expect(keyElements.map(key => key.textContent?.trim())).toEqual(['X', 'Y']);
  });

  it('should set the theme property from a theme attribute', async () => {
    const el = document.createElement('forge-kbd') as KbdComponent;
    el.setAttribute('theme', 'success');
    document.body.append(el);
    await el.updateComplete;

    expect(el.theme).toBe('success');

    el.remove();
  });
});
