import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiArtifactComponent, AiArtifactComponentTagName } from './ai-artifact.js';

const TAG = 'forge-ai-artifact';

function slotAssigned(el: AiArtifactComponent, name?: string): Element[] {
  const selector = name ? `slot[name="${name}"]` : 'slot:not([name])';
  return el.shadowRoot!.querySelector<HTMLSlotElement>(selector)!.assignedElements();
}

describe('AiArtifactComponent', () => {
  it('should be registered under the forge-ai-artifact tag', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact></forge-ai-artifact>`, TAG);

    expect(AiArtifactComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiArtifactComponent);
    expect(el).toBeInstanceOf(AiArtifactComponent);
  });

  it('should contain shadow root', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact></forge-ai-artifact>`, TAG);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should project content into the start slot', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact><h2 slot="start">Title</h2></forge-ai-artifact>`, TAG);

    const assigned = slotAssigned(el, 'start');

    expect(assigned).toHaveLength(1);
    expect(assigned[0].textContent).toBe('Title');
  });

  it('should project content into the actions slot', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact><button slot="actions">Share</button></forge-ai-artifact>`, TAG);

    const assigned = slotAssigned(el, 'actions');

    expect(assigned).toHaveLength(1);
    expect(assigned[0].textContent).toBe('Share');
  });

  it('should project unnamed content into the default slot', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact><p>Body</p></forge-ai-artifact>`, TAG);

    const assigned = slotAssigned(el);

    expect(assigned).toHaveLength(1);
    expect(assigned[0].textContent).toBe('Body');
  });

  it('should route each child to its own slot', async () => {
    const el = await renderFixture<AiArtifactComponent>(
      html`<forge-ai-artifact><span slot="start">S</span><span slot="actions">A</span><span>B</span></forge-ai-artifact>`,
      TAG
    );

    expect(slotAssigned(el, 'start').map(n => n.textContent)).toEqual(['S']);
    expect(slotAssigned(el, 'actions').map(n => n.textContent)).toEqual(['A']);
    expect(slotAssigned(el).map(n => n.textContent)).toEqual(['B']);
  });

  it('should render with no slotted content', async () => {
    const el = await renderFixture<AiArtifactComponent>(html`<forge-ai-artifact></forge-ai-artifact>`, TAG);

    expect(slotAssigned(el, 'start')).toHaveLength(0);
    expect(slotAssigned(el, 'actions')).toHaveLength(0);
    expect(slotAssigned(el)).toHaveLength(0);
  });
});
