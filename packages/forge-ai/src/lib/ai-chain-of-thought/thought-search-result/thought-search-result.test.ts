import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ThoughtBaseComponent } from '../thought-base/thought-base.js';
import { ThoughtSearchResultComponent, ThoughtSearchResultComponentTagName, type Source } from './thought-search-result.js';

const TAG = 'forge-ai-thought-search-result';

const SOURCES: Source[] = [
  { title: 'Forge', href: 'https://example.com/forge' },
  { title: 'Docs', href: 'https://example.com/docs' }
];

function createElement(template = html`<forge-ai-thought-search-result></forge-ai-thought-search-result>`): Promise<ThoughtSearchResultComponent> {
  return renderFixture<ThoughtSearchResultComponent>(template, TAG);
}

function links(el: ThoughtSearchResultComponent): HTMLAnchorElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('a'));
}

describe('ThoughtSearchResultComponent', () => {
  it('should be registered under the forge-ai-thought-search-result tag', async () => {
    const el = await createElement();

    expect(ThoughtSearchResultComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(ThoughtSearchResultComponent);
    expect(el).toBeInstanceOf(ThoughtSearchResultComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have default property values', async () => {
    const el = await createElement();

    expect(el.step).toBeUndefined();
    expect(el.sources).toEqual([]);
  });

  it('should render no source links when sources is empty', async () => {
    const el = await createElement();

    expect(links(el)).toHaveLength(0);
  });

  it('should render a link per source with title and href', async () => {
    const el = await createElement(html`<forge-ai-thought-search-result .sources=${SOURCES}></forge-ai-thought-search-result>`);

    const anchors = links(el);

    expect(anchors).toHaveLength(2);
    expect(anchors.map(a => a.textContent!.trim())).toEqual(['Forge', 'Docs']);
    expect(anchors.map(a => a.getAttribute('href'))).toEqual(['https://example.com/forge', 'https://example.com/docs']);
  });

  it('should open source links in a new tab with a safe rel', async () => {
    const el = await createElement(html`<forge-ai-thought-search-result .sources=${SOURCES}></forge-ai-thought-search-result>`);

    for (const anchor of links(el)) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener noreferrer');
    }
  });

  it('should update the rendered links when sources change', async () => {
    const el = await createElement(html`<forge-ai-thought-search-result .sources=${SOURCES}></forge-ai-thought-search-result>`);

    el.sources = [SOURCES[0]];
    await el.updateComplete;

    expect(links(el)).toHaveLength(1);
  });

  it('should read step from the attribute and forward it to the base', async () => {
    const el = await createElement(html`<forge-ai-thought-search-result step="4"></forge-ai-thought-search-result>`);
    const base = el.shadowRoot!.querySelector<ThoughtBaseComponent>('forge-ai-thought-base')!;
    await base.updateComplete;

    expect(el.step).toBe(4);
    expect(base.step).toBe(4);
  });

  it('should hide the decorative icons from assistive technology', async () => {
    const el = await createElement(html`<forge-ai-thought-search-result .sources=${SOURCES}></forge-ai-thought-search-result>`);

    for (const svg of Array.from(el.shadowRoot!.querySelectorAll('svg'))) {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('should forward title and default slot content', async () => {
    const el = await createElement(
      html`<forge-ai-thought-search-result
        ><span slot="title">Search</span>
        <p>Found</p></forge-ai-thought-search-result
      >`
    );

    const title = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!;
    const body = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;

    expect(title.assignedElements().map(n => n.textContent)).toEqual(['Search']);
    expect(body.assignedElements().map(n => n.textContent)).toEqual(['Found']);
  });
});
