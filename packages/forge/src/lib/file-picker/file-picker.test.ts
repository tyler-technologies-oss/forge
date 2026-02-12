import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { IFilePickerComponent } from './file-picker.js';
import './file-picker.js';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants.js';

describe('File Picker', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await expect(el).toBeAccessible();
  });

  it('should contain the file select button', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    expect(input).toBeTruthy();
  });

  it('should initialize with no accept value', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.accept).toBeNull();
  });

  it('should initialize with no capture value', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.capture).toBeNull();
  });

  it('should initialize with multiple set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.multiple).toBe(false);
  });

  it('should initialize with disabled set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.disabled).toBe(false);
  });

  it('should initialize with compact set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    expect(el.compact).toBe(false);
  });

  it('should allow accept to be set to null', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.accept = '.png';
    el.accept = null;
    expect(el.accept).toBeNull();
  });

  it('should allow capture to be set to null', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.capture = 'user';
    el.capture = null;
    expect(el.capture).toBeNull();
  });

  it('should allow multiple to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.multiple = true;
    el.multiple = false;
    expect(el.multiple).toBe(false);
  });

  it('should allow disabled to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.disabled = true;
    el.disabled = false;
    expect(el.disabled).toBe(false);
  });

  it('should allow compact to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.compact = true;
    el.compact = false;
    expect(el.compact).toBe(false);
  });

  it('should update the accept value when the accept attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT, '.png');
    expect(el.accept).toBe('.png');
  });

  it('should update the capture value when the capture attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE, 'user');
    expect(el.capture).toBe('user');
  });

  it('should update the multiple value when the multiple attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE, '');
    expect(el.multiple).toBe(true);
  });

  it('should update the disabled value when the disabled attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED, '');
    expect(el.disabled).toBe(true);
  });

  it('should update the compact value when the compact attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT, '');
    expect(el.compact).toBe(true);
  });

  it('should set the accept attribute on the input when accept is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    el.accept = '.png';
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    expect(input.getAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT)).toBe('.png');
  });

  it('should activate a click on the file input when the select button is clicked', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    const clickSpy = vi.fn();
    input.addEventListener('click', clickSpy);
    input.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should trigger a change event when the file input is triggered', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    const changeSpy = vi.fn();
    el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(changeSpy).toHaveBeenCalledOnce();
  });
});
