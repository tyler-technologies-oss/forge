import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiArtifactCardGroupComponent, ForgeAiArtifactCardGroupToggleEventData } from './ai-artifact-card-group.js';
import type { AiArtifactCardComponent } from '../ai-artifact-card/index.js';

import '../ai-artifact-card/index.js';
import './ai-artifact-card-group.js';

const TAG = 'forge-ai-artifact-card-group';

function createGroup(template: TemplateResult): Promise<AiArtifactCardGroupComponent> {
  return renderFixture<AiArtifactCardGroupComponent>(template, TAG);
}

function cardsTemplate(count: number): TemplateResult[] {
  return Array.from({ length: count }, (_, index) => html`<forge-ai-artifact-card title-text="Card ${index + 1}"></forge-ai-artifact-card>`);
}

function getCards(el: AiArtifactCardGroupComponent): AiArtifactCardComponent[] {
  return Array.from(el.querySelectorAll('forge-ai-artifact-card'));
}

function getToggle(el: AiArtifactCardGroupComponent): HTMLButtonElement | null | undefined {
  return el.shadowRoot?.querySelector<HTMLButtonElement>('.toggle');
}

function getCollapsed(el: AiArtifactCardGroupComponent): boolean[] {
  return getCards(el).map(card => card.hasAttribute('data-collapsed'));
}

describe('AiArtifactCardGroup', () => {
  it('should contain shadow root', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group></forge-ai-artifact-card-group>`);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should not render the toggle when every card fits', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(3)}</forge-ai-artifact-card-group>`);

    expect(getToggle(el)).toBeNull();
    expect(getCollapsed(el)).toEqual([false, false, false]);
  });

  it('should collapse cards past the visible count', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    expect(getCollapsed(el)).toEqual([false, false, false, true, true]);
  });

  it('should take collapsed cards out of layout', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    expect(getComputedStyle(getCards(el)[4]).display).toBe('none');
  });

  it('should show every card when expanded from the start', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group expanded>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    expect(getCollapsed(el)).toEqual([false, false, false, false, false]);
    expect(getToggle(el)?.textContent?.trim()).toBe('Show less');
  });

  it('should leave consumer-hidden cards hidden and not count them', async () => {
    const el = await createGroup(
      html`<forge-ai-artifact-card-group>
        <forge-ai-artifact-card hidden></forge-ai-artifact-card>
        ${cardsTemplate(4)}
      </forge-ai-artifact-card-group>`
    );

    const cards = getCards(el);

    expect(cards[0].hidden).toBe(true);
    expect(cards[0].hasAttribute('data-collapsed')).toBe(false);
    expect(getCollapsed(el)).toEqual([false, false, false, false, true]);
    expect(getToggle(el)?.textContent?.trim()).toBe('1 more');
  });

  it('should treat a visible count below one as one', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group visible-count="0">${cardsTemplate(3)}</forge-ai-artifact-card-group>`);

    expect(getCollapsed(el)).toEqual([false, true, true]);
    expect(getToggle(el)?.textContent?.trim()).toBe('2 more');
  });

  it('should fall back to the default visible count when the value is not a number', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group visible-count="three">${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    expect(getCollapsed(el)).toEqual([false, false, false, true, true]);
    expect(getToggle(el)?.textContent?.trim()).toBe('2 more');
  });

  it('should label the toggle with the number of hidden cards', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    expect(getToggle(el)?.textContent?.trim()).toBe('2 more');
    expect(getToggle(el)?.getAttribute('aria-expanded')).toBe('false');
  });

  it('should show every card and the show less label when the toggle is clicked', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);

    getToggle(el)?.click();
    await el.updateComplete;

    expect(el.expanded).toBe(true);
    expect(getCollapsed(el)).toEqual([false, false, false, false, false]);
    expect(getToggle(el)?.textContent?.trim()).toBe('Show less');
    expect(getToggle(el)?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should emit the toggle event with the new expanded state', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(5)}</forge-ai-artifact-card-group>`);
    const details: ForgeAiArtifactCardGroupToggleEventData[] = [];
    el.addEventListener('forge-ai-artifact-card-group-toggle', evt => details.push(evt.detail));

    getToggle(el)?.click();
    await el.updateComplete;
    getToggle(el)?.click();
    await el.updateComplete;

    expect(details).toEqual([{ expanded: true }, { expanded: false }]);
  });

  it('should respect a custom visible count', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group visible-count="1">${cardsTemplate(3)}</forge-ai-artifact-card-group>`);

    expect(getCollapsed(el)).toEqual([false, true, true]);
    expect(getToggle(el)?.textContent?.trim()).toBe('2 more');
  });

  it('should use custom toggle labels', async () => {
    const el = await createGroup(
      html`<forge-ai-artifact-card-group show-more-text="Voir {count} de plus" show-less-text="Voir moins"> ${cardsTemplate(4)} </forge-ai-artifact-card-group>`
    );

    const collapsedLabel = getToggle(el)?.textContent?.trim();
    getToggle(el)?.click();
    await el.updateComplete;

    expect(collapsedLabel).toBe('Voir 1 de plus');
    expect(getToggle(el)?.textContent?.trim()).toBe('Voir moins');
  });

  it('should add the toggle when cards are appended past the visible count', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(3)}</forge-ai-artifact-card-group>`);

    el.append(document.createElement('forge-ai-artifact-card'));
    await new Promise(resolve => setTimeout(resolve));
    await el.updateComplete;

    expect(getToggle(el)?.textContent?.trim()).toBe('1 more');
    expect(getCards(el)[3].hasAttribute('data-collapsed')).toBe(true);
  });

  it('should expose the cards as a list', async () => {
    const el = await createGroup(html`<forge-ai-artifact-card-group>${cardsTemplate(2)}</forge-ai-artifact-card-group>`);

    expect(el.shadowRoot?.querySelector('.list')?.getAttribute('role')).toBe('list');
    expect(getCards(el).every(card => card.getAttribute('role') === 'listitem')).toBe(true);
  });
});
