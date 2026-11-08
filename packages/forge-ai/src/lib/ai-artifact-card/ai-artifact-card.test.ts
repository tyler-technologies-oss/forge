import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { AiArtifactCardComponent, ForgeAiArtifactCardOpenEventData } from './ai-artifact-card';

import './ai-artifact-card';
import '../ai-artifact-card-group';

describe('AiArtifactCard', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    expect(el.shadowRoot).to.be.ok;
  });

  it('should render the title and subtitle text', async () => {
    const el = await fixture<AiArtifactCardComponent>(
      html`<forge-ai-artifact-card title-text="Crash totals" subtitle-text="2024 collisions"></forge-ai-artifact-card>`
    );

    expect(el.shadowRoot?.querySelector('.title')?.textContent).to.contain('Crash totals');
    expect(el.shadowRoot?.querySelector('.subtitle')?.textContent).to.contain('2024 collisions');
  });

  it('should emit the open event with the asset id when clicked', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card asset-id="abcd-1234"></forge-ai-artifact-card>`);
    const details: ForgeAiArtifactCardOpenEventData[] = [];
    el.addEventListener('forge-ai-artifact-card-open', evt => details.push(evt.detail));

    el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(details).to.have.lengthOf(1);
    expect(details[0].assetId).to.equal('abcd-1234');
  });

  it('should emit an open event that crosses the shadow boundary and bubbles', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<div><forge-ai-artifact-card asset-id="abcd-1234"></forge-ai-artifact-card></div>`);
    const card = el.querySelector<AiArtifactCardComponent>('forge-ai-artifact-card');
    let received = 0;
    el.addEventListener('forge-ai-artifact-card-open', () => received++);

    card?.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(received).to.equal(1);
  });

  it('should not emit the open event when disabled', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card disabled></forge-ai-artifact-card>`);
    let received = 0;
    el.addEventListener('forge-ai-artifact-card-open', () => received++);

    el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card')?.click();

    expect(received).to.equal(0);
  });

  it('should disable the internal button when disabled', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card disabled></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.disabled).to.be.true;
  });

  it('should reflect the active property to an attribute', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    el.active = true;
    await el.updateComplete;

    expect(el.hasAttribute('active')).to.be.true;
  });

  it('should mark the internal button as current when active', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card active></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.getAttribute('aria-current')).to.equal('true');
  });

  it('should not set aria-current when inactive', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.hasAttribute('aria-current')).to.be.false;
  });

  it('should render slotted icon content', async () => {
    const el = await fixture<AiArtifactCardComponent>(
      html`<forge-ai-artifact-card>
        <svg slot="icon"></svg>
      </forge-ai-artifact-card>`
    );

    const iconSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');

    expect(iconSlot?.assignedElements()).to.have.lengthOf(1);
  });

  it('should use a native button so keyboard activation works', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector<HTMLButtonElement>('.artifact-card');

    expect(button?.tagName).to.equal('BUTTON');
    expect(button?.type).to.equal('button');
  });

  it('should hide the arrow when active', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card active></forge-ai-artifact-card>`);

    const arrow = el.shadowRoot?.querySelector('.arrow') as HTMLElement;

    expect(getComputedStyle(arrow).visibility).to.equal('hidden');
  });

  it('should show the arrow when inactive', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    const arrow = el.shadowRoot?.querySelector('.arrow') as HTMLElement;

    expect(getComputedStyle(arrow).visibility).to.equal('visible');
  });

  it('should take up no space when hidden', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card hidden></forge-ai-artifact-card>`);

    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('should render as a list row when placed in a group', async () => {
    const group = await fixture(html`<forge-ai-artifact-card-group><forge-ai-artifact-card></forge-ai-artifact-card></forge-ai-artifact-card-group>`);
    const el = group.querySelector<AiArtifactCardComponent>('forge-ai-artifact-card');
    await el?.updateComplete;

    const button = el?.shadowRoot?.querySelector('.artifact-card');

    expect(button?.classList.contains('artifact-card--grouped')).to.be.true;
    expect(el?.getAttribute('role')).to.equal('listitem');
  });

  it('should not render as a list row outside a group', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    const button = el.shadowRoot?.querySelector('.artifact-card');

    expect(button?.classList.contains('artifact-card--grouped')).to.be.false;
    expect(el.hasAttribute('role')).to.be.false;
  });

  it('should render a default icon when none is slotted', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card></forge-ai-artifact-card>`);

    const iconSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');

    expect(iconSlot?.assignedElements()).to.have.lengthOf(0);
    expect(iconSlot?.querySelector('svg')).to.exist;
  });

  it('should replace the default arrow with a slotted action icon', async () => {
    const el = await fixture<AiArtifactCardComponent>(
      html`<forge-ai-artifact-card active>
        <svg slot="action-icon"></svg>
      </forge-ai-artifact-card>`
    );

    const actionSlot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="action-icon"]');
    const slotted = actionSlot?.assignedElements()[0] as SVGElement;

    expect(slotted).to.exist;
    expect(getComputedStyle(slotted).visibility).to.equal('visible');
  });

  it('should append the action label to the accessible name only when provided', async () => {
    const el = await fixture<AiArtifactCardComponent>(html`<forge-ai-artifact-card title-text="Crash totals"></forge-ai-artifact-card>`);

    expect(el.shadowRoot?.querySelector('.sr-only')).to.not.exist;

    el.actionLabel = 'Collapse report';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.sr-only')?.textContent).to.equal('Collapse report');
    expect(el.shadowRoot?.querySelector('.artifact-card')?.textContent?.replace(/\s+/g, ' ').trim()).to.equal('Crash totals Collapse report');
  });

  it('should drop the list row role and collapsed marker when moved out of a group', async () => {
    const container = await fixture<HTMLDivElement>(
      html`<div>
        <forge-ai-artifact-card-group visible-count="1">
          <forge-ai-artifact-card></forge-ai-artifact-card>
          <forge-ai-artifact-card></forge-ai-artifact-card>
        </forge-ai-artifact-card-group>
      </div>`
    );
    const card = container.querySelectorAll<AiArtifactCardComponent>('forge-ai-artifact-card')[1];
    await card.updateComplete;

    expect(card.getAttribute('role')).to.equal('listitem');
    expect(card.hasAttribute('data-collapsed')).to.be.true;

    container.append(card);
    await card.updateComplete;

    expect(card.hasAttribute('role')).to.be.false;
    expect(card.hasAttribute('data-collapsed')).to.be.false;
    expect(card.shadowRoot?.querySelector('.artifact-card')?.classList.contains('artifact-card--grouped')).to.be.false;
  });
});
