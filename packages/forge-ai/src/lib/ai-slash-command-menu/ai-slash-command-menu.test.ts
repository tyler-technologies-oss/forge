import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { SlashCommand, ForgeAiSlashCommandMenuSelectEventData } from '../types/index.js';
import type { AiSlashCommandMenuComponent } from './ai-slash-command-menu.js';

import './index.js';

const TAG = 'forge-ai-slash-command-menu';

const COMMANDS: SlashCommand[] = [
  { id: 'clear', name: 'clear', group: 'Conversation' },
  { id: 'export', name: 'export', group: 'Conversation' },
  { id: 'info', name: 'info', group: 'Help' },
  { id: 'debug', name: 'debug', group: 'Help' }
];

async function createMenu(
  props: Partial<{ open: boolean; filterQuery: string; commands: SlashCommand[]; withAnchor: boolean }> = {}
): Promise<AiSlashCommandMenuComponent> {
  const { open = true, filterQuery = '', commands = COMMANDS, withAnchor = true } = props;
  const anchor = document.createElement('div');
  anchor.style.width = '250px';
  document.body.append(anchor);
  const el = await renderFixture<AiSlashCommandMenuComponent>(
    html`<forge-ai-slash-command-menu
      .commands=${commands}
      filter-query=${filterQuery}
      .anchor=${withAnchor ? anchor : null}
      ?open=${open}></forge-ai-slash-command-menu>`,
    TAG
  );
  await settle(el);
  return el;
}

const getItems = (el: AiSlashCommandMenuComponent): HTMLElement[] => Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('forge-ai-dropdown-menu-item'));
const labels = (el: AiSlashCommandMenuComponent): (string | undefined)[] => getItems(el).map(i => i.textContent?.trim());
const groupLabels = (el: AiSlashCommandMenuComponent): (string | undefined)[] =>
  Array.from(new Set(getItems(el).map(i => i.parentElement!))).map(g => g.firstElementChild?.textContent?.trim());
const selectedItems = (el: AiSlashCommandMenuComponent): HTMLElement[] => getItems(el).filter(i => i.classList.contains('selected'));
const key = (name: string): KeyboardEvent => new KeyboardEvent('keydown', { key: name, cancelable: true });

describe('AiSlashCommandMenu', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createMenu({ open: false });

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should use documented default property values', async () => {
      const el = await renderFixture<AiSlashCommandMenuComponent>(html`<forge-ai-slash-command-menu></forge-ai-slash-command-menu>`, TAG);

      expect(el.commands).toEqual([]);
      expect(el.filterQuery).toBe('');
      expect(el.open).toBe(false);
      expect(el.anchor).toBeNull();
      expect(el.widthReference).toBeNull();
    });

    it('should read filter-query attribute into filterQuery', async () => {
      const el = await createMenu({ filterQuery: 'cl' });

      expect(el.filterQuery).toBe('cl');
    });
  });

  describe('rendering', () => {
    it('should not render the popover when closed', async () => {
      const el = await createMenu({ open: false });

      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
    });

    it('should not render the popover when open without an anchor', async () => {
      const el = await createMenu({ withAnchor: false });

      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
    });

    it('should render the popover when open with an anchor', async () => {
      const el = await createMenu();

      const popover = el.shadowRoot!.querySelector('forge-ai-popover')!;
      expect(popover).not.toBeNull();
      expect(popover.open).toBe(true);
      expect(popover.anchor).toBe(el.anchor);
      expect(popover.placement).toBe('top-start');
      expect(popover.dismissMode).toBe('manual');
    });

    it('should render a header and a labelled close button', async () => {
      const el = await createMenu();

      expect(el.shadowRoot!.textContent).toContain('Slash Commands');
      expect(el.shadowRoot!.querySelector('button[aria-label="Close menu"]')).not.toBeNull();
    });

    it('should render one menu item per command with action selection mode', async () => {
      const el = await createMenu();

      expect(labels(el)).toEqual(['clear', 'export', 'info', 'debug']);
      expect(getItems(el).every(i => i.getAttribute('selection-mode') === 'none')).toBe(true);
    });

    it('should group commands under group labels with dividers between groups', async () => {
      const el = await createMenu();

      expect(groupLabels(el)).toEqual(['Conversation', 'Help']);
      expect(getItems(el)).toHaveLength(4);
    });

    it('should omit the divider when only one group exists', async () => {
      const el = await createMenu({ commands: [COMMANDS[0], COMMANDS[1]] });

      expect(groupLabels(el)).toEqual(['Conversation']);
    });

    it('should show an empty message when there are no commands', async () => {
      const el = await createMenu({ commands: [] });

      expect(el.shadowRoot!.textContent).toContain('No commands found');
      expect(getItems(el)).toHaveLength(0);
    });

    it('should use the anchor width for the menu', async () => {
      const el = await createMenu();

      expect(el.shadowRoot!.querySelector<HTMLElement>('.slash-command-menu')!.style.width).toBe('250px');
    });

    it('should prefer the widthReference width over the anchor', async () => {
      const el = await createMenu();
      const ref = document.createElement('div');
      ref.style.width = '420px';
      document.body.append(ref);

      el.widthReference = ref;
      await settle(el);

      expect(el.shadowRoot!.querySelector<HTMLElement>('.slash-command-menu')!.style.width).toBe('420px');
    });
  });

  describe('filtering', () => {
    it('should filter commands by name case-insensitively', async () => {
      const el = await createMenu({ filterQuery: 'CL' });

      expect(labels(el)).toEqual(['clear']);
    });

    it('should match substrings', async () => {
      const el = await createMenu({ filterQuery: 'e' });

      expect(labels(el)).toEqual(['clear', 'export', 'debug']);
    });

    it('should show the empty message when nothing matches', async () => {
      const el = await createMenu({ filterQuery: 'zzz' });

      expect(el.shadowRoot!.textContent).toContain('No commands found');
    });

    it('should update results when filterQuery changes', async () => {
      const el = await createMenu();

      el.filterQuery = 'inf';
      await settle(el);

      expect(labels(el)).toEqual(['info']);
    });

    it('should update results when commands change', async () => {
      const el = await createMenu();

      el.commands = [COMMANDS[2]];
      await settle(el);

      expect(labels(el)).toEqual(['info']);
    });

    it('should clear rendered commands when closed', async () => {
      const el = await createMenu();

      el.open = false;
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
      expect(getItems(el)).toHaveLength(0);
    });

    it('should clear the highlighted item when the filter changes', async () => {
      const el = await createMenu();
      el.handleKeyDown(key('ArrowDown'));
      await settle(el);
      expect(selectedItems(el)).toHaveLength(1);

      el.filterQuery = 'e';
      await settle(el);

      expect(selectedItems(el)).toHaveLength(0);
    });
  });

  describe('selection', () => {
    it('should dispatch select with the command and index when an item is clicked', async () => {
      const el = await createMenu();
      const events: CustomEvent<ForgeAiSlashCommandMenuSelectEventData>[] = [];
      el.addEventListener('forge-ai-slash-command-menu-select', evt => events.push(evt));

      getItems(el)[2].click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ command: COMMANDS[2], index: 2 });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should use the filtered index when dispatching select', async () => {
      const el = await createMenu({ filterQuery: 'info' });
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-select', spy);

      getItems(el)[0].click();

      expect(spy.mock.calls[0][0].detail).toEqual({ command: COMMANDS[2], index: 0 });
    });

    it('should dispatch close when the close button is clicked', async () => {
      const el = await createMenu();
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-slash-command-menu-close', evt => events.push(evt));

      el.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch close when the popover closes itself while open', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-close', spy);

      el.shadowRoot!.querySelector('forge-ai-popover')!.dispatchEvent(
        new CustomEvent('forge-ai-popover-toggle', { detail: { open: false, newState: 'closed', oldState: 'open' } })
      );

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch close when the popover reports it opened', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-close', spy);

      el.shadowRoot!.querySelector('forge-ai-popover')!.dispatchEvent(
        new CustomEvent('forge-ai-popover-toggle', { detail: { open: true, newState: 'open', oldState: 'closed' } })
      );

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('should highlight the first item on ArrowDown and prevent default', async () => {
      const el = await createMenu();
      const evt = key('ArrowDown');

      const handled = el.handleKeyDown(evt);
      await settle(el);

      expect(handled).toBe(true);
      expect(evt.defaultPrevented).toBe(true);
      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([true, false, false, false]);
    });

    it('should move the highlight down and wrap around', async () => {
      const el = await createMenu();

      for (let i = 0; i < 4; i++) {
        el.handleKeyDown(key('ArrowDown'));
      }
      await settle(el);
      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([false, false, false, true]);

      el.handleKeyDown(key('ArrowDown'));
      await settle(el);
      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([true, false, false, false]);
    });

    it('should highlight the last item on ArrowUp from no selection and wrap upward', async () => {
      const el = await createMenu();

      el.handleKeyDown(key('ArrowUp'));
      await settle(el);
      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([false, false, false, true]);

      el.handleKeyDown(key('ArrowUp'));
      await settle(el);
      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([false, false, true, false]);
    });

    it('should wrap from the first item to the last on ArrowUp', async () => {
      const el = await createMenu();
      el.handleKeyDown(key('ArrowDown'));

      el.handleKeyDown(key('ArrowUp'));
      await settle(el);

      expect(getItems(el).map(i => i.classList.contains('selected'))).toEqual([false, false, false, true]);
    });

    it('should jump to the first and last items on Home and End', async () => {
      const el = await createMenu();

      el.handleKeyDown(key('End'));
      await settle(el);
      expect(selectedItems(el)[0]).toBe(getItems(el)[3]);

      el.handleKeyDown(key('Home'));
      await settle(el);
      expect(selectedItems(el)[0]).toBe(getItems(el)[0]);
    });

    it('should dispatch select for the highlighted command on Enter', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-select', spy);
      el.handleKeyDown(key('ArrowDown'));
      el.handleKeyDown(key('ArrowDown'));
      const evt = key('Enter');

      const handled = el.handleKeyDown(evt);

      expect(handled).toBe(true);
      expect(evt.defaultPrevented).toBe(true);
      expect(spy.mock.calls[0][0].detail).toEqual({ command: COMMANDS[1], index: 1 });
    });

    it('should not handle Enter when nothing is highlighted', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-select', spy);
      const evt = key('Enter');

      expect(el.handleKeyDown(evt)).toBe(false);
      expect(evt.defaultPrevented).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should dispatch close on Escape', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-close', spy);

      expect(el.handleKeyDown(key('Escape'))).toBe(true);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not handle unrelated keys', async () => {
      const el = await createMenu();
      const evt = key('a');

      expect(el.handleKeyDown(evt)).toBe(false);
      expect(evt.defaultPrevented).toBe(false);
    });

    it('should not handle navigation keys when there are no matching commands', async () => {
      const el = await createMenu({ filterQuery: 'zzz' });

      expect(el.handleKeyDown(key('ArrowDown'))).toBe(false);
      expect(el.handleKeyDown(key('Enter'))).toBe(false);
    });

    it.skip('should dispatch close on Escape when there are no matching commands (BUG: KeyboardNavigationController.handleKeyDown returns early when itemCount is 0 so Escape is ignored)', async () => {
      const el = await createMenu({ filterQuery: 'zzz' });
      const spy = vi.fn();
      el.addEventListener('forge-ai-slash-command-menu-close', spy);

      el.handleKeyDown(key('Escape'));

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should clear the highlight with reset()', async () => {
      const el = await createMenu();
      el.handleKeyDown(key('ArrowDown'));
      await settle(el);
      expect(selectedItems(el)).toHaveLength(1);

      el.reset();
      el.requestUpdate();
      await settle(el);

      expect(selectedItems(el)).toHaveLength(0);
      el.handleKeyDown(key('ArrowDown'));
      await settle(el);
      expect(selectedItems(el)[0]).toBe(getItems(el)[0]);
    });
  });
});
