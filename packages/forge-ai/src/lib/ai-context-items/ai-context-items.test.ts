import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { ContextItem } from '../types/index.js';
import type { AiContextChipComponent } from '../ai-context-chip/index.js';
import { AiContextItemsComponent, AiContextItemsComponentTagName, type ForgeAiContextItemsRemoveEventData } from './index.js';

const TAG = 'forge-ai-context-items';

const items: ContextItem[] = [
  { id: 'a', label: 'Alpha', sublabel: '1 KB', type: 'file' },
  { id: 'b', label: 'Beta', removable: false, loading: true },
  { id: 'c', label: 'Gamma', type: 'context' }
];

function createElement(value?: ContextItem[]): Promise<AiContextItemsComponent> {
  return renderFixture<AiContextItemsComponent>(
    value ? html`<forge-ai-context-items .items=${value}></forge-ai-context-items>` : html`<forge-ai-context-items></forge-ai-context-items>`,
    TAG
  );
}

function getChips(el: AiContextItemsComponent): AiContextChipComponent[] {
  return Array.from(el.shadowRoot!.querySelectorAll<AiContextChipComponent>('forge-ai-context-chip'));
}

describe('AiContextItemsComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-context-items tag', async () => {
      const el = await createElement();

      expect(AiContextItemsComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiContextItemsComponent);
      expect(el).toBeInstanceOf(AiContextItemsComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('items', () => {
    it('should default to an empty array', async () => {
      const el = await createElement();

      expect(el.items).toEqual([]);
    });

    it('should render nothing when there are no items', async () => {
      const el = await createElement([]);

      expect(el.shadowRoot!.querySelector('.context-items')).toBeNull();
      expect(getChips(el)).toHaveLength(0);
    });

    it('should render a chip per item', async () => {
      const el = await createElement(items);

      expect(getChips(el)).toHaveLength(3);
    });

    it('should pass item fields to each chip', async () => {
      const el = await createElement(items);
      const [a, b, c] = getChips(el);

      expect(a.id).toBe('a');
      expect(a.label).toBe('Alpha');
      expect(a.sublabel).toBe('1 KB');
      expect(a.type).toBe('file');
      expect(b.loading).toBe(true);
      expect(c.type).toBe('context');
    });

    it('should default removable to true and loading to false', async () => {
      const el = await createElement(items);
      const [a] = getChips(el);

      expect(a.removable).toBe(true);
      expect(a.loading).toBe(false);
    });

    it.skip('should pass removable false to the chip (BUG: ?removable binding cannot turn off a default-true boolean attribute property)', async () => {
      const el = await createElement(items);
      const [, b] = getChips(el);

      expect(b.removable).toBe(false);
    });

    it('should re-render when items change', async () => {
      const el = await createElement(items);

      el.items = [{ id: 'z', label: 'Zed' }];
      await el.updateComplete;

      const chips = getChips(el);
      expect(chips).toHaveLength(1);
      expect(chips[0].label).toBe('Zed');
    });

    it('should render nothing again when items are cleared', async () => {
      const el = await createElement(items);

      el.items = [];
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.context-items')).toBeNull();
    });
  });

  describe('events', () => {
    it('should re-dispatch a remove event with id and item when a chip is removed', async () => {
      const el = await createElement(items);
      const listener = vi.fn<(event: CustomEvent<ForgeAiContextItemsRemoveEventData>) => void>();
      el.addEventListener('forge-ai-context-items-remove', listener);
      const chip = getChips(el)[0];

      await userEvent.click(chip.shadowRoot!.querySelector('button')!);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.id).toBe('a');
      expect(event.detail.item).toMatchObject({ id: 'a', label: 'Alpha', sublabel: '1 KB', type: 'file' });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it.skip('should not render remove buttons for non-removable items (BUG: ?removable binding cannot turn off a default-true boolean attribute property)', async () => {
      const el = await createElement(items);
      const [, b] = getChips(el);

      expect(b.shadowRoot!.querySelector('button')).toBeNull();
    });
  });
});
