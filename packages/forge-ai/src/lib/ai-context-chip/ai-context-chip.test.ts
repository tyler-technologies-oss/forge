import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import { AiContextChipComponent, AiContextChipComponentTagName, type ForgeAiContextChipRemoveEventData } from './index.js';

const TAG = 'forge-ai-context-chip';

function getRemoveButton(el: AiContextChipComponent): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('button');
}

describe('AiContextChipComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-context-chip tag', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip></forge-ai-context-chip>`, TAG);

      expect(AiContextChipComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiContextChipComponent);
      expect(el).toBeInstanceOf(AiContextChipComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip></forge-ai-context-chip>`, TAG);

      expect(el.id).toBe('');
      expect(el.label).toBe('');
      expect(el.removable).toBe(true);
      expect(el.sublabel).toBeUndefined();
      expect(el.loading).toBe(false);
      expect(el.type).toBeUndefined();
    });

    it('should read attributes into properties', async () => {
      const el = await renderFixture<AiContextChipComponent>(
        html`<forge-ai-context-chip id="c1" label="Doc" sublabel="PDF" type="file" loading></forge-ai-context-chip>`,
        TAG
      );

      expect(el.id).toBe('c1');
      expect(el.label).toBe('Doc');
      expect(el.sublabel).toBe('PDF');
      expect(el.type).toBe('file');
      expect(el.loading).toBe(true);
    });

    it('should render the label', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="My label"></forge-ai-context-chip>`, TAG);

      expect(el.shadowRoot!.querySelector('.context-content')!.textContent!.trim()).toBe('My label');
    });

    it('should expose a group role labelled with the label', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip id="c1" label="My label"></forge-ai-context-chip>`, TAG);
      const group = el.shadowRoot!.querySelector('[role="group"]')!;

      expect(group.getAttribute('aria-label')).toBe('Context: My label');
      expect(group.id).toBe('context-chip-c1');
    });

    it('should render the sublabel when not loading', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc" sublabel="12 KB"></forge-ai-context-chip>`, TAG);

      expect(el.shadowRoot!.querySelector('.context-sublabel')!.textContent).toBe('12 KB');
    });

    it('should not render a sublabel when none is provided', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc"></forge-ai-context-chip>`, TAG);

      expect(el.shadowRoot!.querySelector('.context-sublabel')).toBeNull();
    });

    it('should show a loading indicator instead of the sublabel when loading', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc" sublabel="12 KB" loading></forge-ai-context-chip>`, TAG);

      expect(el.shadowRoot!.querySelector('.context-sublabel')).toBeNull();
      const status = el.shadowRoot!.querySelector('[role="status"]')!;
      expect(status.getAttribute('aria-label')).toBe('Loading');
      expect(status.querySelector('forge-ai-spinner')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('[role="group"]')!.getAttribute('aria-busy')).toBe('true');
    });

    it('should not be busy when not loading', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc"></forge-ai-context-chip>`, TAG);

      expect(el.shadowRoot!.querySelector('[role="group"]')!.getAttribute('aria-busy')).toBe('false');
      expect(el.shadowRoot!.querySelector('[role="status"]')).toBeNull();
    });

    it('should update when loading changes', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc" sublabel="12 KB"></forge-ai-context-chip>`, TAG);

      el.loading = true;
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('[role="status"]')).toBeTruthy();

      el.loading = false;
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('[role="status"]')).toBeNull();
      expect(el.shadowRoot!.querySelector('.context-sublabel')).toBeTruthy();
    });

    it('should render a different icon for file type than for context type', async () => {
      const context = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="A"></forge-ai-context-chip>`, TAG);
      const file = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="A" type="file"></forge-ai-context-chip>`, TAG);

      const contextPath = context.shadowRoot!.querySelector('.context-icon path')!.getAttribute('d');
      const filePath = file.shadowRoot!.querySelector('.context-icon path')!.getAttribute('d');
      expect(contextPath).not.toBe(filePath);
    });
  });

  describe('removable', () => {
    it('should render a remove button labelled with the label by default', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc"></forge-ai-context-chip>`, TAG);

      expect(getRemoveButton(el)!.getAttribute('aria-label')).toBe('Remove Doc');
    });

    it('should not render a remove button when removable is false', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip label="Doc" .removable=${false}></forge-ai-context-chip>`, TAG);

      expect(getRemoveButton(el)).toBeNull();
    });

    it('should dispatch a remove event with the item detail when the remove button is clicked', async () => {
      const el = await renderFixture<AiContextChipComponent>(
        html`<forge-ai-context-chip id="c1" label="Doc" sublabel="PDF" type="file"></forge-ai-context-chip>`,
        TAG
      );
      const listener = vi.fn<(event: CustomEvent<ForgeAiContextChipRemoveEventData>) => void>();
      el.addEventListener('forge-ai-context-chip-remove', listener);

      await userEvent.click(getRemoveButton(el)!);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail).toEqual({
        id: 'c1',
        item: { id: 'c1', label: 'Doc', removable: true, sublabel: 'PDF', loading: false, type: 'file' }
      });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  describe('overflow tooltip', () => {
    it('should not render a tooltip when the label fits', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip id="c1" label="Short"></forge-ai-context-chip>`, TAG);
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')).toBeNull();
    });

    it('should render a tooltip with the full label when the label overflows', async () => {
      const label = 'A very long label that will definitely overflow the maximum chip width of the component';
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip id="c1" .label=${label}></forge-ai-context-chip>`, TAG);

      await vi.waitFor(() => {
        const tooltip = el.shadowRoot!.querySelector('forge-ai-tooltip');
        expect(tooltip).toBeTruthy();
        expect(tooltip!.textContent!.trim()).toBe(label);
        expect(tooltip!.getAttribute('for')).toBe('context-chip-c1');
      });
    });

    it('should re-check overflow when the label changes', async () => {
      const el = await renderFixture<AiContextChipComponent>(html`<forge-ai-context-chip id="c1" label="Short"></forge-ai-context-chip>`, TAG);
      await settle(el);

      el.label = 'A very long label that will definitely overflow the maximum chip width of the component';

      await vi.waitFor(() => expect(el.shadowRoot!.querySelector('forge-ai-tooltip')).toBeTruthy());

      el.label = 'Short';

      await vi.waitFor(() => expect(el.shadowRoot!.querySelector('forge-ai-tooltip')).toBeNull());
    });
  });
});
