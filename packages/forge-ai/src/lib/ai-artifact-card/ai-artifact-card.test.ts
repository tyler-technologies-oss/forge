import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiArtifactCardGroupComponent } from '../ai-artifact-card-group/ai-artifact-card-group.js';
import type { AiArtifactCardComponent, ForgeAiArtifactCardOpenEventData } from './ai-artifact-card.js';

import './ai-artifact-card.js';
import '../ai-artifact-card-group/index.js';

const TAG = 'forge-ai-artifact-card';

function createCard(template = html`<forge-ai-artifact-card></forge-ai-artifact-card>`): Promise<AiArtifactCardComponent> {
  return renderFixture<AiArtifactCardComponent>(template, TAG);
}

describe('AiArtifactCard', () => {
  it('should contain shadow root', async () => {
    const el = await createCard();

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should render the title and subtitle text', async () => {
    const el = await createCard(html`<forge-ai-artifact-card title-text="Crash totals" subtitle-text="2024 collisions"></forge-ai-artifact-card>`);

    expect(el.shadowRoot?.querySelector('.title')?.textContent).toContain('Crash totals');
    expect(el.shadowRoot?.querySelector('.subtitle')?.textContent).toContain('2024 collisions');
  });

  it('should emit the open event with the asset id when clicked', async () => {
    const el = await createCard(html`<forge-ai-artifact-card asset-id="abcd-1234"></forge-ai-artifact-card>`);
    const details: ForgeAiArtifactCardOpenEventData[] = [];
    el.addEventListener('forge-ai-artifact-card-open', evt => details.push(evt.detail));

    el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(details).toHaveLength(1);
    expect(details[0].assetId).toBe('abcd-1234');
  });

  it('should emit an open event that crosses the shadow boundary and bubbles', async () => {
    const card = await createCard(html`<div><forge-ai-artifact-card asset-id="abcd-1234"></forge-ai-artifact-card></div>`);
    const wrapper = card.parentElement as HTMLElement;
    let received = 0;
    wrapper.addEventListener('forge-ai-artifact-card-open', () => received++);

    card.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(received).toBe(1);
  });

  it('should not emit the open event when disabled', async () => {
    const el = await createCard(html`<forge-ai-artifact-card disabled></forge-ai-artifact-card>`);
    let received = 0;
    el.addEventListener('forge-ai-artifact-card-open', () => received++);

    el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(received).toBe(0);
  });

  it('should disable the internal button when disabled', async () => {
    const el = await createCard(html`<forge-ai-artifact-card disabled></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.disabled).toBe(true);
  });

  it('should reflect the active property to an attribute', async () => {
    const el = await createCard();

    el.active = true;
    await el.updateComplete;

    expect(el.hasAttribute('active')).toBe(true);
  });

  it('should mark the internal button as current when active', async () => {
    const el = await createCard(html`<forge-ai-artifact-card active></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.getAttribute('aria-current')).toBe('true');
  });

  it('should not set aria-current when inactive', async () => {
    const el = await createCard();

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.hasAttribute('aria-current')).toBe(false);
  });

  it('should render slotted icon content', async () => {
    const el = await createCard(
      html`<forge-ai-artifact-card>
        <svg slot="icon"></svg>
      </forge-ai-artifact-card>`
    );

    const iconSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');

    expect(iconSlot?.assignedElements()).toHaveLength(1);
  });

  it('should use a native button so keyboard activation works', async () => {
    const el = await createCard();

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.tagName).toBe('BUTTON');
    expect(button?.type).toBe('button');
  });

  it('should hide the arrow when active', async () => {
    const el = await createCard(html`<forge-ai-artifact-card active></forge-ai-artifact-card>`);

    const arrow = el.shadowRoot?.querySelector('.arrow') as HTMLElement;

    expect(getComputedStyle(arrow).visibility).toBe('hidden');
  });

  it('should show the arrow when inactive', async () => {
    const el = await createCard();

    const arrow = el.shadowRoot?.querySelector('.arrow') as HTMLElement;

    expect(getComputedStyle(arrow).visibility).toBe('visible');
  });

  it('should take up no space when hidden', async () => {
    const el = await createCard(html`<forge-ai-artifact-card hidden></forge-ai-artifact-card>`);

    expect(getComputedStyle(el).display).toBe('none');
  });

  it('should render as a list row when placed in a group', async () => {
    const el = await createCard(html`<forge-ai-artifact-card-group><forge-ai-artifact-card></forge-ai-artifact-card></forge-ai-artifact-card-group>`);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('.artifact-card');

    expect(button?.classList.contains('artifact-card--grouped')).toBe(true);
    expect(el.getAttribute('role')).toBe('listitem');
  });

  it('should not render as a list row outside a group', async () => {
    const el = await createCard();

    const button = el.shadowRoot?.querySelector('.artifact-card');

    expect(button?.classList.contains('artifact-card--grouped')).toBe(false);
    expect(el.hasAttribute('role')).toBe(false);
  });

  it('should render a default icon when none is slotted', async () => {
    const el = await createCard();

    const iconSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');

    expect(iconSlot?.assignedElements()).toHaveLength(0);
    expect(iconSlot?.querySelector('svg')).toBeTruthy();
  });

  it('should replace the default arrow with a slotted action icon', async () => {
    const el = await createCard(
      html`<forge-ai-artifact-card active>
        <svg slot="action-icon"></svg>
      </forge-ai-artifact-card>`
    );

    const actionSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="action-icon"]');
    const slotted = actionSlot?.assignedElements()[0] as SVGElement;

    expect(slotted).toBeTruthy();
    expect(getComputedStyle(slotted).visibility).toBe('visible');
  });

  it('should append the action label to the accessible name only when provided', async () => {
    const el = await createCard(html`<forge-ai-artifact-card title-text="Crash totals"></forge-ai-artifact-card>`);

    expect(el.shadowRoot?.querySelector('.sr-only')).toBeNull();

    el.actionLabel = 'Collapse report';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.sr-only')?.textContent).toBe('Collapse report');
    expect(el.shadowRoot?.querySelector('.artifact-card')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Crash totals Collapse report');
  });

  it('should drop the list row role and collapsed marker when moved out of a group', async () => {
    const group = await renderFixture<AiArtifactCardGroupComponent>(
      html`<div>
        <forge-ai-artifact-card-group visible-count="1">
          <forge-ai-artifact-card></forge-ai-artifact-card>
          <forge-ai-artifact-card></forge-ai-artifact-card>
        </forge-ai-artifact-card-group>
      </div>`,
      'forge-ai-artifact-card-group'
    );
    const wrapper = group.parentElement as HTMLElement;
    const card = wrapper.querySelectorAll<AiArtifactCardComponent>('forge-ai-artifact-card')[1];
    await card.updateComplete;

    expect(card.getAttribute('role')).toBe('listitem');
    expect(card.hasAttribute('data-collapsed')).toBe(true);

    wrapper.append(card);
    await card.updateComplete;

    expect(card.hasAttribute('role')).toBe(false);
    expect(card.hasAttribute('data-collapsed')).toBe(false);
    expect(card.shadowRoot?.querySelector('.artifact-card')?.classList.contains('artifact-card--grouped')).toBe(false);
  });
});
