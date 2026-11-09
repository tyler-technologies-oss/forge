import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
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
});
