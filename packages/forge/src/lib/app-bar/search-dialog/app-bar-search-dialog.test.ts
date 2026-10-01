import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import type { IDialogComponent } from '../../dialog/index.js';
import type { IAppBarSearchDialogComponent } from './app-bar-search-dialog.js';

import './app-bar-search-dialog.js';

describe('App Bar Search Dialog', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should have expected defaults', async () => {
    const harness = await createFixture();

    expect(harness.element.open).toBe(false);
    expect(harness.element.value).toBe('');
    expect(harness.element.label).toBe('Search');
    expect(harness.element.closeLabel).toBe('Close search');
    expect(harness.element.heading).toBe('App search');
    expect(harness.element.buttonText).toBe('Search');
  });

  it('should be accessible', async () => {
    const harness = await createFixture();

    await expect(harness.element).toBeAccessible();
  });

  it('should open the dialog when the button is clicked', async () => {
    const harness = await createFixture();

    harness.triggerButton.click();
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(true);
    expect(harness.dialog.open).toBe(true);
  });

  it('should never render the dialog fullscreen', async () => {
    const harness = await createFixture();

    harness.triggerButton.click();
    await harness.element.updateComplete;

    expect(harness.dialog.fullscreen).toBe(false);
    expect(harness.dialog.fullscreenThreshold).toBe(0);
  });

  it('should use the label for the button and search field', async () => {
    const harness = await createFixture({ label: 'Find records' });

    expect(harness.triggerButton.getAttribute('aria-label')).toBe('Find records');
    expect(harness.input.getAttribute('aria-label')).toBe('Find records');
  });

  it('should update value when typing', async () => {
    const harness = await createFixture();

    harness.triggerButton.click();
    await harness.element.updateComplete;
    await userEvent.fill(harness.input, 'hello');

    expect(harness.element.value).toBe('hello');
  });

  it('should dispatch submit event with value and close when Enter is pressed', async () => {
    const harness = await createFixture({ value: 'query' });
    const spy = vi.fn();
    harness.element.addEventListener('forge-app-bar-search-dialog-submit', spy);

    harness.triggerButton.click();
    await harness.element.updateComplete;
    harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await harness.element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'query' });
    expect(harness.element.open).toBe(false);
  });

  it('should stay open when the submit event is canceled', async () => {
    const harness = await createFixture();
    harness.element.addEventListener('forge-app-bar-search-dialog-submit', evt => evt.preventDefault());

    harness.triggerButton.click();
    await harness.element.updateComplete;
    harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(true);
  });

  it('should render the heading as the toolbar title', async () => {
    const harness = await createFixture();

    expect(harness.title.textContent?.trim()).toBe('App search');
  });

  it('should dispatch submit event and close when the search button is clicked', async () => {
    const harness = await createFixture({ value: 'query' });
    const spy = vi.fn();
    harness.element.addEventListener('forge-app-bar-search-dialog-submit', spy);

    harness.triggerButton.click();
    await harness.element.updateComplete;
    harness.searchButton.click();
    await harness.element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'query' });
    expect(harness.element.open).toBe(false);
  });

  it('should not dispatch submit event for other keys', async () => {
    const harness = await createFixture();
    const spy = vi.fn();
    harness.element.addEventListener('forge-app-bar-search-dialog-submit', spy);

    harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should close when the close button is clicked', async () => {
    const harness = await createFixture();

    harness.triggerButton.click();
    await harness.element.updateComplete;
    harness.closeButton.click();
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(false);
  });

  it('should close when the dialog is closed', async () => {
    const harness = await createFixture();

    harness.triggerButton.click();
    await harness.element.updateComplete;
    harness.dialog.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true }));
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(false);
  });
});

interface Harness {
  element: IAppBarSearchDialogComponent;
  triggerButton: HTMLElement;
  dialog: IDialogComponent;
  input: HTMLInputElement;
  closeButton: HTMLElement;
  searchButton: HTMLElement;
  title: HTMLElement;
}

async function createFixture({ label, value }: { label?: string; value?: string } = {}): Promise<Harness> {
  const screen = render(html`<forge-app-bar-search-dialog label=${label ?? 'Search'} value=${value ?? ''}></forge-app-bar-search-dialog>`);
  const element = screen.container.querySelector('forge-app-bar-search-dialog') as IAppBarSearchDialogComponent;
  await element.updateComplete;
  const root = element.shadowRoot as ShadowRoot;

  return {
    element,
    get triggerButton() {
      return root.querySelector('forge-icon-button') as HTMLElement;
    },
    get dialog() {
      return root.querySelector('forge-dialog') as IDialogComponent;
    },
    get closeButton() {
      return root.querySelector('forge-toolbar forge-icon-button') as HTMLElement;
    },
    get searchButton() {
      return root.querySelector('forge-toolbar[inverted] forge-button') as HTMLElement;
    },
    get title() {
      return root.querySelector('forge-toolbar h1') as HTMLElement;
    },
    get input() {
      return root.querySelector('input') as HTMLInputElement;
    }
  };
}
