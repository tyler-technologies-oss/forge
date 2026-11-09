import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../../testing/fixture.js';
import type { AiPaginator, ForgeAiPaginatorPageChangeEventData } from './ai-paginator.js';

import './ai-paginator.js';

describe('AiPaginator', () => {
  it('should dispatch a namespaced page-change event with the new and previous page', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');
    const listener = vi.fn<(evt: CustomEvent<ForgeAiPaginatorPageChangeEventData>) => void>();
    el.addEventListener('forge-ai-paginator-page-change', listener);

    el.shadowRoot!.querySelector<HTMLButtonElement>('#next-btn')!.click();

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ currentPage: 3, previousPage: 2 });
  });

  it('should not dispatch the legacy un-namespaced page-change event', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');
    const legacyListener = vi.fn();
    el.addEventListener('page-change', legacyListener);

    el.shadowRoot!.querySelector<HTMLButtonElement>('#prev-btn')!.click();

    expect(legacyListener).not.toHaveBeenCalled();
  });

  const prevOf = (el: AiPaginator): HTMLButtonElement => el.shadowRoot!.querySelector<HTMLButtonElement>('#prev-btn')!;
  const nextOf = (el: AiPaginator): HTMLButtonElement => el.shadowRoot!.querySelector<HTMLButtonElement>('#next-btn')!;

  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator></forge-ai-paginator>`, 'forge-ai-paginator');

    expect(customElements.get('forge-ai-paginator')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have the expected property defaults', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator></forge-ai-paginator>`, 'forge-ai-paginator');

    expect(el.currentPage).toBe(1);
    expect(el.totalPages).toBe(1);
    expect(el.disabled).toBe(false);
  });

  it('should read kebab-case attributes into properties', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="3" total-pages="7"></forge-ai-paginator>`, 'forge-ai-paginator');

    expect(el.currentPage).toBe(3);
    expect(el.totalPages).toBe(7);
  });

  it('should render the page label', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');

    expect(el.shadowRoot!.querySelector('.label')!.textContent).toBe('2 of 5');
  });

  it('should update the label when properties change', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="1" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');

    el.currentPage = 4;
    el.totalPages = 9;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.label')!.textContent).toBe('4 of 9');
  });

  it('should label the buttons and provide tooltips', async () => {
    const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator></forge-ai-paginator>`, 'forge-ai-paginator');

    expect(prevOf(el).getAttribute('aria-label')).toBe('View previous page');
    expect(nextOf(el).getAttribute('aria-label')).toBe('View next page');
    expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="prev-btn"]')!.textContent).toBe('Previous');
    expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="next-btn"]')!.textContent).toBe('Next');
  });

  describe('button state', () => {
    it('should disable previous on the first page', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="1" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');

      expect(prevOf(el).disabled).toBe(true);
      expect(nextOf(el).disabled).toBe(false);
    });

    it('should disable next on the last page', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="3" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');

      expect(prevOf(el).disabled).toBe(false);
      expect(nextOf(el).disabled).toBe(true);
    });

    it('should enable both buttons in the middle', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');

      expect(prevOf(el).disabled).toBe(false);
      expect(nextOf(el).disabled).toBe(false);
    });

    it('should disable both buttons when there is a single page', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator></forge-ai-paginator>`, 'forge-ai-paginator');

      expect(prevOf(el).disabled).toBe(true);
      expect(nextOf(el).disabled).toBe(true);
    });

    it('should disable both buttons when disabled, and reflect the attribute', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');

      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).toBe(true);
      expect(prevOf(el).disabled).toBe(true);
      expect(nextOf(el).disabled).toBe(true);
    });

    it('should re-enable the buttons when disabled is cleared', async () => {
      const el = await renderFixture<AiPaginator>(
        html`<forge-ai-paginator current-page="2" total-pages="3" disabled></forge-ai-paginator>`,
        'forge-ai-paginator'
      );

      el.disabled = false;
      await el.updateComplete;

      expect(prevOf(el).disabled).toBe(false);
      expect(nextOf(el).disabled).toBe(false);
    });

    it('should treat a current page beyond total as the end', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="9" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');

      expect(nextOf(el).disabled).toBe(true);
    });
  });

  describe('events', () => {
    it('should dispatch page-change with the previous page when previous is clicked', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="3" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');
      const listener = vi.fn<(evt: CustomEvent<ForgeAiPaginatorPageChangeEventData>) => void>();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      await userEvent.click(prevOf(el));

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ currentPage: 2, previousPage: 3 });
    });

    it('should bubble the event without crossing shadow boundaries', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');
      const listener = vi.fn<(evt: CustomEvent<ForgeAiPaginatorPageChangeEventData>) => void>();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      nextOf(el).click();

      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(false);
    });

    it('should not change currentPage itself', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="2" total-pages="5"></forge-ai-paginator>`, 'forge-ai-paginator');

      nextOf(el).click();
      await el.updateComplete;

      expect(el.currentPage).toBe(2);
    });

    it('should not dispatch when the button is disabled', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="1" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');
      const listener = vi.fn();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      prevOf(el).click();

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not dispatch from a stale click on a button that became disabled', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="3" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');
      const listener = vi.fn();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      nextOf(el).dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not dispatch when the paginator is disabled', async () => {
      const el = await renderFixture<AiPaginator>(
        html`<forge-ai-paginator current-page="2" total-pages="5" disabled></forge-ai-paginator>`,
        'forge-ai-paginator'
      );
      const listener = vi.fn();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      nextOf(el).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      prevOf(el).dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should activate next from the keyboard', async () => {
      const el = await renderFixture<AiPaginator>(html`<forge-ai-paginator current-page="1" total-pages="3"></forge-ai-paginator>`, 'forge-ai-paginator');
      const listener = vi.fn<(evt: CustomEvent<ForgeAiPaginatorPageChangeEventData>) => void>();
      el.addEventListener('forge-ai-paginator-page-change', listener);

      nextOf(el).focus();
      await userEvent.keyboard('{Enter}');

      expect(listener.mock.calls[0][0].detail).toEqual({ currentPage: 2, previousPage: 1 });
    });
  });
});
