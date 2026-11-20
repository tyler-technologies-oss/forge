import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Agent } from '../types/index.js';
import type { AiAgentSelectorComponent, ForgeAiAgentSelectorChangeEventData } from './ai-agent-selector.js';

import './index.js';

const TAG = 'forge-ai-agent-selector';

const AGENTS: Agent[] = [
  { id: 'a1', name: 'Alpha', description: 'First agent' },
  { id: 'a2', name: 'Bravo' },
  { id: 'a3', name: 'Charlie' }
];

const MANY_AGENTS: Agent[] = Array.from({ length: 6 }, (_, i) => ({ id: `m${i}`, name: `Agent ${i}` }));

async function createSelector(props: { agents?: Agent[]; selected?: string; titleText?: string; disabled?: boolean } = {}): Promise<AiAgentSelectorComponent> {
  const { agents = AGENTS, selected, titleText, disabled = false } = props;
  const el = await renderFixture<AiAgentSelectorComponent>(
    html`<forge-ai-agent-selector
      .agents=${agents}
      selected-agent-id=${selected as string}
      title-text=${titleText as string}
      ?disabled=${disabled}></forge-ai-agent-selector>`,
    TAG
  );
  if (selected === undefined) {
    el.selectedAgentId = undefined;
  }
  if (titleText === undefined) {
    el.titleText = 'AI Assistant';
  }
  await el.updateComplete;
  return el;
}

const getTrigger = (el: AiAgentSelectorComponent): HTMLButtonElement =>
  el.shadowRoot!.querySelector<HTMLButtonElement>('#agent-selector-trigger') as HTMLButtonElement;
const getOptions = (el: AiAgentSelectorComponent): HTMLElement[] => Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.agent-item'));
const agentOptions = (el: AiAgentSelectorComponent): HTMLElement[] => getOptions(el).filter(o => !o.classList.contains('agent-item--default'));
const getDefaultOption = (el: AiAgentSelectorComponent): HTMLElement => el.shadowRoot!.querySelector<HTMLElement>('.agent-item--default')!;
const getFilter = (el: AiAgentSelectorComponent): HTMLInputElement | null => el.shadowRoot!.querySelector<HTMLInputElement>('.filter-input');
const names = (el: AiAgentSelectorComponent): (string | undefined)[] => agentOptions(el).map(o => o.textContent?.trim());

async function open(el: AiAgentSelectorComponent): Promise<void> {
  await userEvent.click(getTrigger(el));
  await settle(el);
  await settle(el);
}

function collect(el: AiAgentSelectorComponent): CustomEvent<ForgeAiAgentSelectorChangeEventData>[] {
  const events: CustomEvent<ForgeAiAgentSelectorChangeEventData>[] = [];
  el.addEventListener('forge-ai-agent-selector-change', evt => events.push(evt));
  return events;
}

describe('AiAgentSelector', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createSelector();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('defaults and attributes', () => {
    it('should use documented defaults', async () => {
      const el = await renderFixture<AiAgentSelectorComponent>(html`<forge-ai-agent-selector></forge-ai-agent-selector>`, TAG);

      expect(el.agents).toEqual([]);
      expect(el.selectedAgentId).toBeUndefined();
      expect(el.titleText).toBe('AI Assistant');
      expect(el.disabled).toBe(false);
    });

    it('should read kebab-case attributes', async () => {
      const el = await renderFixture<AiAgentSelectorComponent>(
        html`<forge-ai-agent-selector selected-agent-id="a2" title-text="Custom" disabled></forge-ai-agent-selector>`,
        TAG
      );

      expect(el.selectedAgentId).toBe('a2');
      expect(el.titleText).toBe('Custom');
      expect(el.disabled).toBe(true);
    });

    it('should reflect disabled to an attribute', async () => {
      const el = await createSelector();

      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('static title (no agents)', () => {
    it('should render static title text instead of a button', async () => {
      const el = await createSelector({ agents: [], titleText: 'My Assistant' });

      const title = getTrigger(el);
      expect(title.textContent).toBe('My Assistant');
      expect(el.shadowRoot!.querySelector('button')).toBeNull();
      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
    });
  });

  describe('trigger', () => {
    it('should render a listbox-popup trigger button', async () => {
      const el = await createSelector();
      const trigger = getTrigger(el);

      expect(trigger.tagName).toBe('BUTTON');
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should show the title text when no agent is selected', async () => {
      const el = await createSelector({ titleText: 'Assistant' });

      expect(getTrigger(el).textContent?.trim()).toBe('Assistant');
    });

    it('should show the selected agent name', async () => {
      const el = await createSelector({ selected: 'a2' });

      expect(getTrigger(el).textContent?.trim()).toBe('Bravo');
    });

    it('should fall back to the title text when the selected id is unknown', async () => {
      const el = await createSelector({ selected: 'nope' });

      expect(getTrigger(el).textContent?.trim()).toBe('AI Assistant');
    });

    it('should fall back to the default title when titleText is empty', async () => {
      const el = await createSelector();
      el.titleText = '';
      await el.updateComplete;

      expect(getTrigger(el).textContent?.trim()).toBe('AI Assistant');
    });

    it('should project the icon slot', async () => {
      const el = await renderFixture<AiAgentSelectorComponent>(
        html`<forge-ai-agent-selector .agents=${AGENTS}><svg slot="icon"></svg></forge-ai-agent-selector>`,
        TAG
      );

      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!.assignedElements()).toHaveLength(1);
    });

    it('should disable the trigger when disabled', async () => {
      const el = await createSelector({ disabled: true });

      expect(getTrigger(el).disabled).toBe(true);
    });
  });

  describe('dropdown open/close', () => {
    it('should open the popover when the trigger is clicked', async () => {
      const el = await createSelector();

      await open(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(true);
      expect(getTrigger(el).getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle the popover closed on a second trigger click', async () => {
      const el = await createSelector();
      await open(el);

      getTrigger(el).click();
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
      expect(getTrigger(el).getAttribute('aria-expanded')).toBe('false');
    });

    it('should expose the open custom state while open', async () => {
      const el = await createSelector();
      await open(el);

      expect(el.matches(':state(open)')).toBe(true);
      getTrigger(el).click();
      await settle(el);
      expect(el.matches(':state(open)')).toBe(false);
    });

    it('should not open when disabled', async () => {
      const el = await createSelector();
      el.disabled = true;
      await el.updateComplete;

      getTrigger(el).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should render the header text', async () => {
      const el = await createSelector();

      expect(el.shadowRoot!.textContent).toContain('Switch to another agent');
    });

    it('should close and return focus to the trigger when the popover closes itself', async () => {
      const el = await createSelector();
      await open(el);

      el.shadowRoot!.querySelector('forge-ai-popover')!.dispatchEvent(
        new CustomEvent('forge-ai-popover-toggle', { detail: { open: false, newState: 'closed', oldState: 'open' } })
      );
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
      expect(el.shadowRoot!.activeElement).toBe(getTrigger(el));
    });
  });

  describe('options', () => {
    it('should render a labelled listbox with a default option followed by agents', async () => {
      const el = await createSelector();

      const list = el.shadowRoot!.querySelector('[role="listbox"]')!;
      expect(list.getAttribute('aria-label')).toBe('Select an agent');
      expect(getOptions(el).every(o => o.getAttribute('role') === 'option')).toBe(true);
      expect(getDefaultOption(el).textContent).toContain('AI Assistant (default)');
      expect(names(el)).toEqual(['Alpha', 'Bravo', 'Charlie']);
    });

    it('should use the title text in the default option label', async () => {
      const el = await createSelector({ titleText: 'Helper' });

      expect(getDefaultOption(el).textContent).toContain('Helper (default)');
    });

    it('should mark the default option selected when no agent is selected', async () => {
      const el = await createSelector();

      expect(getDefaultOption(el).getAttribute('aria-selected')).toBe('true');
      expect(getDefaultOption(el).querySelector('svg')).not.toBeNull();
      expect(agentOptions(el).every(o => o.getAttribute('aria-selected') === 'false')).toBe(true);
    });

    it('should mark the selected agent option', async () => {
      const el = await createSelector({ selected: 'a2' });

      expect(getDefaultOption(el).getAttribute('aria-selected')).toBe('false');
      expect(getDefaultOption(el).querySelector('svg')).toBeNull();
      expect(agentOptions(el).map(o => o.getAttribute('aria-selected'))).toEqual(['false', 'true', 'false']);
      expect(agentOptions(el)[1].querySelector('svg')).not.toBeNull();
    });

    it('should render only the default option when the agent list becomes empty after having agents', async () => {
      const el = await createSelector();

      el.agents = [];
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
    });
  });

  describe('selection', () => {
    it('should dispatch change with the agent and previous id when an agent is clicked', async () => {
      const el = await createSelector({ selected: 'a1' });
      await open(el);
      const events = collect(el);

      agentOptions(el)[2].click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ agent: AGENTS[2], previousAgentId: 'a1' });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should close after selecting an agent', async () => {
      const el = await createSelector();
      await open(el);

      agentOptions(el)[0].click();
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should not dispatch change when the already selected agent is clicked', async () => {
      const el = await createSelector({ selected: 'a2' });
      await open(el);
      const events = collect(el);

      agentOptions(el)[1].click();
      await settle(el);

      expect(events).toHaveLength(0);
      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should dispatch change with an undefined agent when the default option is chosen', async () => {
      const el = await createSelector({ selected: 'a2' });
      await open(el);
      const events = collect(el);

      getDefaultOption(el).click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ agent: undefined, previousAgentId: 'a2' });
    });

    it('should not dispatch change when the default option is already selected', async () => {
      const el = await createSelector();
      await open(el);
      const events = collect(el);

      getDefaultOption(el).click();
      await settle(el);

      expect(events).toHaveLength(0);
      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should not change selectedAgentId itself', async () => {
      const el = await createSelector({ selected: 'a1' });
      await open(el);

      agentOptions(el)[1].click();

      expect(el.selectedAgentId).toBe('a1');
    });
  });

  describe('filter', () => {
    it('should not show the filter for five or fewer agents', async () => {
      const el = await createSelector({ agents: MANY_AGENTS.slice(0, 5) });

      expect(getFilter(el)).toBeNull();
    });

    it('should show the filter for more than five agents', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });

      expect(getFilter(el)).not.toBeNull();
      expect(getFilter(el)!.placeholder).toBe('Search agents...');
    });

    it('should filter agents by name case-insensitively', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);

      const input = getFilter(el)!;
      input.value = 'AGENT 3';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await settle(el);

      expect(names(el)).toEqual(['Agent 3']);
    });

    it('should show a no-results message when nothing matches', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);

      const input = getFilter(el)!;
      input.value = 'zzz';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await settle(el);

      expect(el.shadowRoot!.textContent).toContain('No agents found');
      expect(agentOptions(el)).toHaveLength(0);
    });

    it('should ignore whitespace-only filters', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);

      const input = getFilter(el)!;
      input.value = '   ';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await settle(el);

      expect(agentOptions(el)).toHaveLength(6);
    });

    it('should focus the filter input when opened', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);

      expect(el.shadowRoot!.activeElement).toBe(getFilter(el));
    });

    it('should clear the filter when the popover closes', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);
      const input = getFilter(el)!;
      input.value = 'Agent 1';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await settle(el);

      getTrigger(el).click();
      await settle(el);

      expect(getFilter(el)!.value).toBe('');
      expect(agentOptions(el)).toHaveLength(6);
    });
  });

  describe('keyboard', () => {
    it('should open on Enter pressed on the trigger', async () => {
      const el = await createSelector();
      getTrigger(el).focus();

      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(true);
    });

    it('should open on Space pressed on the trigger', async () => {
      const el = await createSelector();
      getTrigger(el).focus();

      await userEvent.keyboard(' ');
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(true);
    });

    it('should open on ArrowDown pressed on the trigger', async () => {
      const el = await createSelector();
      getTrigger(el).focus();

      await userEvent.keyboard('{ArrowDown}');
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(true);
    });

    it('should focus the default option after opening a short list', async () => {
      const el = await createSelector();
      await open(el);

      expect(el.shadowRoot!.activeElement).toBe(getDefaultOption(el));
    });

    it('should move focus down through options and wrap back to the default', async () => {
      const el = await createSelector();
      await open(el);

      await userEvent.keyboard('{ArrowDown}');
      expect(el.shadowRoot!.activeElement).toBe(agentOptions(el)[0]);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      expect(el.shadowRoot!.activeElement).toBe(agentOptions(el)[2]);
      await userEvent.keyboard('{ArrowDown}');
      expect(el.shadowRoot!.activeElement).toBe(getDefaultOption(el));
    });

    it('should move focus up and wrap to the last agent', async () => {
      const el = await createSelector();
      await open(el);

      await userEvent.keyboard('{ArrowUp}');

      expect(el.shadowRoot!.activeElement).toBe(agentOptions(el)[2]);
    });

    it('should jump to the last agent on End and the default on Home', async () => {
      const el = await createSelector();
      await open(el);

      await userEvent.keyboard('{End}');
      expect(el.shadowRoot!.activeElement).toBe(agentOptions(el)[2]);
      await userEvent.keyboard('{Home}');
      expect(el.shadowRoot!.activeElement).toBe(getDefaultOption(el));
    });

    it('should select the focused agent on Enter', async () => {
      const el = await createSelector({ selected: 'a1' });
      await open(el);
      const events = collect(el);

      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail.agent).toEqual(AGENTS[1]);
      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should select the default option on Enter when it is focused', async () => {
      const el = await createSelector({ selected: 'a1' });
      await open(el);
      const events = collect(el);

      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ agent: undefined, previousAgentId: 'a1' });
    });

    it('should close on Escape, return focus to the trigger and stop propagation', async () => {
      const el = await createSelector();
      await open(el);
      const outer = vi.fn();
      document.addEventListener('keydown', outer);

      await userEvent.keyboard('{Escape}');
      await settle(el);
      document.removeEventListener('keydown', outer);

      expect(outer).not.toHaveBeenCalled();
      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
      expect(el.shadowRoot!.activeElement).toBe(getTrigger(el));
    });

    it('should navigate the options from the filter input', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);
      expect(el.shadowRoot!.activeElement).toBe(getFilter(el));

      await userEvent.keyboard('{ArrowDown}');

      expect(agentOptions(el)[0].getAttribute('tabindex')).toBe('0');
      expect(getDefaultOption(el).getAttribute('tabindex')).toBe('-1');
      expect(el.shadowRoot!.activeElement).toBe(getFilter(el));
    });

    it('should select a filtered agent with Enter from the filter input', async () => {
      const el = await createSelector({ agents: MANY_AGENTS });
      await open(el);
      const events = collect(el);

      await userEvent.keyboard('Agent 4');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail.agent).toEqual(MANY_AGENTS[4]);
    });

    it('should ignore keys while disabled', async () => {
      const el = await createSelector();
      const trigger = getTrigger(el);
      el.disabled = true;
      await el.updateComplete;

      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });

    it('should not move focus with ArrowUp when closed', async () => {
      const el = await createSelector();
      getTrigger(el).focus();

      await userEvent.keyboard('{ArrowUp}');
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(false);
    });
  });

  describe('overflow tooltip', () => {
    it('should not render a tooltip when the title fits', async () => {
      const el = await createSelector();
      await settle(el);

      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')).toBeNull();
    });

    it('should render a tooltip with name and description when the title overflows', async () => {
      const el = await renderFixture<AiAgentSelectorComponent>(
        html`<div style="width: 40px"><forge-ai-agent-selector .agents=${AGENTS} selected-agent-id="a1"></forge-ai-agent-selector></div>`,
        TAG
      );
      el.selectedAgentId = 'a1';
      el.agents = [{ id: 'a1', name: 'A very long agent name that overflows', description: 'Desc' }];
      await settle(el);

      const trigger = el.shadowRoot!.querySelector<HTMLElement>('.trigger-text')!;
      trigger.style.display = 'block';
      trigger.style.width = '20px';
      trigger.style.overflow = 'hidden';
      trigger.style.whiteSpace = 'nowrap';
      el.agents = [{ id: 'a1', name: 'Another very long agent name that overflows', description: 'Desc' }];
      await settle(el);

      const tooltip = el.shadowRoot!.querySelector('forge-ai-tooltip');
      expect(tooltip).not.toBeNull();
      expect(tooltip!.textContent).toContain('Another very long agent name that overflows');
      expect(tooltip!.textContent).toContain('Desc');
    });
  });
});
