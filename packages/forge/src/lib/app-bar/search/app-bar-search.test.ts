import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import type { IAppBarSearchComponent } from './app-bar-search.js';
import { APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants.js';
import type { IAppBarSearchCore } from './app-bar-search-core.js';

import './app-bar-search.js';

describe('App Bar Search', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible with placeholder', async () => {
    const screen = render(html`<forge-app-bar-search><input type="text" placeholder="Search" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;

    await expect(el).toBeAccessible();
  });

  it('should not initialize until input is available', async () => {
    const screen = render(html`<forge-app-bar-search></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent & { _core: IAppBarSearchCore & { initialize: () => void } };
    const initializeSpy = vi.spyOn(el._core, 'initialize');

    expect(initializeSpy).not.toHaveBeenCalled();

    const inputEl = document.createElement('input');
    el.appendChild(inputEl);
    await frame();

    expect(initializeSpy).toHaveBeenCalledOnce();
  });

  it('should set disabled', async () => {
    const screen = render(html`<forge-app-bar-search disabled><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;
    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(inputEl.disabled).toBe(true);

    el.disabled = false;

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(inputEl.disabled).toBe(false);
  });

  it('should set value', async () => {
    let value = 'test';
    const screen = render(html`<forge-app-bar-search value="${value}"><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;

    await frame();

    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.value).toBe(value);
    expect(inputEl.value).toBe(value);

    value = 'test2';
    el.value = value;

    expect(el.value).toBe(value);
    expect(inputEl.value).toBe(value);
  });

  it('should set placeholder', async () => {
    let placeholder = 'Search';
    const screen = render(html`<forge-app-bar-search placeholder="${placeholder}"><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;

    await frame();

    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.placeholder).toBe(placeholder);
    expect(inputEl.placeholder).toBe(placeholder);

    placeholder = 'Search2';
    el.placeholder = placeholder;

    expect(el.placeholder).toBe(placeholder);
    expect(inputEl.placeholder).toBe(placeholder);
  });

  it('should emit input event on enter keydown', async () => {
    const screen = render(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = vi.fn();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy).toHaveBeenCalledOnce();
    expect(inputSpy.mock.calls[0][0].detail.value).toBe(el.value);
  });

  it('should not emit input event on non-enter keydown', async () => {
    const screen = render(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = vi.fn();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(inputSpy).not.toHaveBeenCalled();
  });

  it('should not emit input event on enter keydown when disabled', async () => {
    const screen = render(html`<forge-app-bar-search disabled><input type="text" /></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = vi.fn();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy).not.toHaveBeenCalled();
  });

  it('should not emit input event on enter keydown when input is not available', async () => {
    const screen = render(html`<forge-app-bar-search></forge-app-bar-search>`);
    const el = screen.container.querySelector('forge-app-bar-search') as IAppBarSearchComponent;
    const inputSpy = vi.fn();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy).not.toHaveBeenCalled();
  });
});
