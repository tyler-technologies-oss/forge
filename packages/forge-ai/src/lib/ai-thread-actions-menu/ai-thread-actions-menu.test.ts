import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Thread } from '../types/index.js';
import type { ForgeAiDropdownMenuComponent } from '../ai-dropdown-menu/ai-dropdown-menu.js';
import type { AiThreadActionsMenuComponent } from './ai-thread-actions-menu.js';

import './index.js';

const TAG = 'forge-ai-thread-actions-menu';
const THREAD: Thread = { id: 'thread-1', title: 'My thread', createdAt: '2024-01-01T00:00:00Z' };

function createMenu(template?: ReturnType<typeof html>): Promise<AiThreadActionsMenuComponent> {
  return renderFixture<AiThreadActionsMenuComponent>(
    template ?? html`<forge-ai-thread-actions-menu .thread=${THREAD} show-rename show-delete></forge-ai-thread-actions-menu>`,
    TAG
  );
}

const getDropdown = (el: AiThreadActionsMenuComponent): ForgeAiDropdownMenuComponent => el.shadowRoot!.querySelector('forge-ai-dropdown-menu')!;
const getItem = (el: AiThreadActionsMenuComponent, value: string): HTMLElement | null =>
  el.shadowRoot!.querySelector(`forge-ai-dropdown-menu-item[value="${value}"]`);

describe('AiThreadActionsMenu', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createMenu();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should use documented defaults', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD}></forge-ai-thread-actions-menu>`);

      expect(el.showRename).toBe(false);
      expect(el.showDelete).toBe(false);
      expect(el.density).toBe('small');
    });

    it('should read show-rename, show-delete attributes', async () => {
      const el = await createMenu();

      expect(el.showRename).toBe(true);
      expect(el.showDelete).toBe(true);
    });

    it('should pass density to the dropdown trigger', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD} density="large"></forge-ai-thread-actions-menu>`);

      expect(el.density).toBe('large');
      expect(getDropdown(el).density).toBe('large');
    });

    it('should default the dropdown to the small density', async () => {
      const el = await createMenu();

      expect(getDropdown(el).density).toBe('small');
    });
  });

  describe('dropdown configuration', () => {
    it('should render an action-mode icon-button dropdown', async () => {
      const el = await createMenu();
      const dropdown = getDropdown(el);

      expect(dropdown.variant).toBe('icon-button-squared');
      expect(dropdown.selectionMode).toBe('none');
      expect(dropdown.popoverPlacement).toBe('bottom-start');
    });

    it('should label the trigger with the thread title', async () => {
      const el = await createMenu();

      expect(getDropdown(el).triggerLabel).toBe('More actions for My thread');
    });

    it('should update the trigger label when the thread changes', async () => {
      const el = await createMenu();

      el.thread = { ...THREAD, title: 'Renamed' };
      await el.updateComplete;

      expect(getDropdown(el).triggerLabel).toBe('More actions for Renamed');
    });
  });

  describe('slots', () => {
    it('should render a default three-dot icon in the trigger-icon slot', async () => {
      const el = await createMenu();
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="trigger-icon"]')!;

      expect(slot).not.toBeNull();
      expect(slot.getAttribute('slot')).toBe('trigger-content');
      expect(slot.querySelector('svg')).not.toBeNull();
    });

    it('should project custom trigger-icon content', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD}><span slot="trigger-icon">X</span></forge-ai-thread-actions-menu>`);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="trigger-icon"]')!;

      expect(slot.assignedElements()).toHaveLength(1);
    });
  });

  describe('menu items', () => {
    it('should render rename and delete items when enabled', async () => {
      const el = await createMenu();

      expect(getItem(el, 'rename')).not.toBeNull();
      expect(getItem(el, 'delete')).not.toBeNull();
      expect(getItem(el, 'rename')!.textContent).toContain('Rename');
      expect(getItem(el, 'delete')!.textContent).toContain('Delete');
    });

    it('should hide rename when showRename is false', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD} show-delete></forge-ai-thread-actions-menu>`);

      expect(getItem(el, 'rename')).toBeNull();
      expect(getItem(el, 'delete')).not.toBeNull();
    });

    it('should hide delete when showDelete is false', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD} show-rename></forge-ai-thread-actions-menu>`);

      expect(getItem(el, 'delete')).toBeNull();
      expect(getItem(el, 'rename')).not.toBeNull();
    });

    it('should render no items when both are disabled', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD}></forge-ai-thread-actions-menu>`);

      expect(el.shadowRoot!.querySelectorAll('forge-ai-dropdown-menu-item')).toHaveLength(0);
    });

    it('should show items reactively when props change', async () => {
      const el = await createMenu(html`<forge-ai-thread-actions-menu .thread=${THREAD}></forge-ai-thread-actions-menu>`);

      el.showRename = true;
      await el.updateComplete;

      expect(getItem(el, 'rename')).not.toBeNull();
    });
  });

  describe('events', () => {
    it('should dispatch rename with the thread id when rename is clicked', async () => {
      const el = await createMenu();
      await settle(el);
      const events: CustomEvent<{ id: string }>[] = [];
      el.addEventListener('forge-ai-thread-actions-menu-rename', evt => events.push(evt));

      getItem(el, 'rename')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ id: 'thread-1' });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch delete-click with the thread id when delete is clicked', async () => {
      const el = await createMenu();
      await settle(el);
      const events: CustomEvent<{ id: string }>[] = [];
      el.addEventListener('forge-ai-thread-actions-menu-delete-click', evt => events.push(evt));

      getItem(el, 'delete')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ id: 'thread-1' });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch open with the thread id when the dropdown opens', async () => {
      const el = await createMenu();
      const events: CustomEvent<{ id: string }>[] = [];
      el.addEventListener('forge-ai-thread-actions-menu-open', evt => events.push(evt));

      getDropdown(el).open = true;
      await settle(getDropdown(el));

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ id: 'thread-1' });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch close when the dropdown closes', async () => {
      const el = await createMenu();
      getDropdown(el).open = true;
      await settle(getDropdown(el));
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-thread-actions-menu-close', evt => events.push(evt));

      getDropdown(el).open = false;
      await settle(getDropdown(el));

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should stop dropdown click events from escaping the menu', async () => {
      const el = await createMenu();
      const outerClick = vi.fn();
      el.addEventListener('click', outerClick);

      getDropdown(el).click();

      expect(outerClick).not.toHaveBeenCalled();
    });

    it('should stop Escape key events from propagating to parents', async () => {
      const el = await createMenu();
      const outerKeydown = vi.fn();
      el.addEventListener('keydown', outerKeydown);

      getDropdown(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));

      expect(outerKeydown).not.toHaveBeenCalled();
    });

    it('should let other keys propagate to parents', async () => {
      const el = await createMenu();
      const outerKeydown = vi.fn();
      el.addEventListener('keydown', outerKeydown);

      getDropdown(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, composed: true }));

      expect(outerKeydown).toHaveBeenCalledTimes(1);
    });
  });
});
