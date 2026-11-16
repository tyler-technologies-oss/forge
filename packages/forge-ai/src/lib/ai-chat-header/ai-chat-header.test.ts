import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Agent } from '../types/index.js';
import type { AiModalComponent } from '../ai-modal/ai-modal.js';
import type { AiAgentSelectorComponent } from '../ai-agent-selector/ai-agent-selector.js';
import type { ForgeAiDropdownMenuComponent } from '../ai-dropdown-menu/ai-dropdown-menu.js';
import type { AiChatHeaderComponent, ForgeAiChatHeaderAgentChangeEventData } from './ai-chat-header.js';

import './index.js';

const TAG = 'forge-ai-chat-header';

const AGENTS: Agent[] = [
  { id: 'a1', name: 'Alpha' },
  { id: 'a2', name: 'Bravo' }
];

function createHeader(template = html`<forge-ai-chat-header></forge-ai-chat-header>`): Promise<AiChatHeaderComponent> {
  return renderFixture<AiChatHeaderComponent>(template, TAG);
}

const q = <T extends Element = HTMLElement>(el: AiChatHeaderComponent, selector: string): T | null => el.shadowRoot!.querySelector<T>(selector);
const getMenu = (el: AiChatHeaderComponent): ForgeAiDropdownMenuComponent | null => q<ForgeAiDropdownMenuComponent>(el, 'forge-ai-dropdown-menu');
const menuValues = (el: AiChatHeaderComponent): (string | null)[] =>
  Array.from(el.shadowRoot!.querySelectorAll('forge-ai-dropdown-menu-item')).map(i => i.getAttribute('value'));

describe('AiChatHeader', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createHeader();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should use documented default property values', async () => {
      const el = await createHeader();

      expect(el.showExpandButton).toBe(false);
      expect(el.showMinimizeButton).toBe(false);
      expect(el.expanded).toBe(false);
      expect(el.minimizeIcon).toBe('default');
      expect(el.agentInfo).toBeUndefined();
      expect(el.options).toBe('enabled');
      expect(el.exportOption).toBe('enabled');
      expect(el.clearOption).toBe('enabled');
      expect(el.headingLevel).toBe(2);
      expect(el.titleText).toBe('AI Assistant');
      expect(el.agents).toEqual([]);
      expect(el.selectedAgentId).toBeUndefined();
      expect(el.disableAgentSelector).toBe(false);
      expect(el.showConversationsButton).toBe(false);
      expect(el.hasConversationsError).toBe(false);
    });

    it('should read kebab-case attributes into properties', async () => {
      const el = await createHeader(html`
        <forge-ai-chat-header
          show-expand-button
          show-minimize-button
          minimize-icon="panel"
          export-option="off"
          clear-option="off"
          heading-level="3"
          title-text="Custom"
          selected-agent-id="a2"
          disable-agent-selector
          show-conversations-button
          has-conversations-error></forge-ai-chat-header>
      `);

      expect(el.showExpandButton).toBe(true);
      expect(el.showMinimizeButton).toBe(true);
      expect(el.minimizeIcon).toBe('panel');
      expect(el.exportOption).toBe('off');
      expect(el.clearOption).toBe('off');
      expect(el.headingLevel).toBe(3);
      expect(el.titleText).toBe('Custom');
      expect(el.selectedAgentId).toBe('a2');
      expect(el.disableAgentSelector).toBe(true);
      expect(el.showConversationsButton).toBe(true);
      expect(el.hasConversationsError).toBe(true);
    });
  });

  describe('title', () => {
    it('should render the title text in an h2 by default', async () => {
      const el = await createHeader();

      const heading = q(el, 'h2.title')!;
      expect(heading.textContent).toBe('AI Assistant');
    });

    it('should render the configured title text', async () => {
      const el = await createHeader(html`<forge-ai-chat-header title-text="Support Bot"></forge-ai-chat-header>`);

      expect(q(el, '.title')!.textContent).toBe('Support Bot');
    });

    it.each([1, 3, 4, 5, 6])('should render the title as an h%i heading when headingLevel is %i', async level => {
      const el = await createHeader(html`<forge-ai-chat-header heading-level=${level}></forge-ai-chat-header>`);

      expect(q(el, `h${level}.title`)).not.toBeNull();
    });

    it('should switch heading element when headingLevel changes', async () => {
      const el = await createHeader();

      el.headingLevel = 4;
      await el.updateComplete;

      expect(q(el, 'h4.title')).not.toBeNull();
      expect(q(el, 'h2.title')).toBeNull();
    });

    it('should render the default forge-ai-icon in the icon slot', async () => {
      const el = await createHeader();

      const slot = q<HTMLSlotElement>(el, 'slot[name="icon"]')!;
      expect(slot.querySelector('forge-ai-icon')).not.toBeNull();
    });

    it('should project custom icon content', async () => {
      const el = await createHeader(html`<forge-ai-chat-header><svg slot="icon"></svg></forge-ai-chat-header>`);

      expect(q<HTMLSlotElement>(el, 'slot[name="icon"]')!.assignedElements()).toHaveLength(1);
    });

    it('should project thread-name and header-actions slot content', async () => {
      const el = await createHeader(html`
        <forge-ai-chat-header>
          <span slot="thread-name">Thread</span>
          <button slot="header-actions">Act</button>
        </forge-ai-chat-header>
      `);

      expect(q<HTMLSlotElement>(el, 'slot[name="thread-name"]')!.assignedElements()).toHaveLength(1);
      expect(q<HTMLSlotElement>(el, 'slot[name="header-actions"]')!.assignedElements()).toHaveLength(1);
    });

    it('should not render a title tooltip when the title fits', async () => {
      const el = await createHeader();

      expect(q(el, 'forge-ai-tooltip[for="title-container"]')).toBeNull();
    });

    it('should render a title tooltip when the title overflows', async () => {
      const el = await createHeader(html`<div style="width: 60px"><forge-ai-chat-header></forge-ai-chat-header></div>`);
      el.titleText = 'A very long title text that cannot possibly fit in the available width';
      await settle(el);
      const title = q(el, '.title')!;
      title.style.display = 'block';
      title.style.width = '30px';
      title.style.overflow = 'hidden';
      title.style.whiteSpace = 'nowrap';

      el.headingLevel = 3;
      await settle(el);

      expect(q(el, 'forge-ai-tooltip[for="title-container"]')).not.toBeNull();
    });
  });

  describe('agent selector', () => {
    it('should replace the heading with an agent selector when agents are provided', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agents=${AGENTS} title-text="Helper"></forge-ai-chat-header>`);

      expect(q(el, '.title')).toBeNull();
      const selector = q<AiAgentSelectorComponent>(el, 'forge-ai-agent-selector')!;
      expect(selector).not.toBeNull();
      expect(selector.agents).toEqual(AGENTS);
      expect(selector.titleText).toBe('Helper');
    });

    it('should not render an agent selector without agents', async () => {
      const el = await createHeader();

      expect(q(el, 'forge-ai-agent-selector')).toBeNull();
    });

    it('should pass the selected agent id to the selector', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agents=${AGENTS} selected-agent-id="a2"></forge-ai-chat-header>`);

      expect(q<AiAgentSelectorComponent>(el, 'forge-ai-agent-selector')!.selectedAgentId).toBe('a2');
    });

    it('should disable the selector when disableAgentSelector is set', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agents=${AGENTS} disable-agent-selector></forge-ai-chat-header>`);

      expect(q<AiAgentSelectorComponent>(el, 'forge-ai-agent-selector')!.disabled).toBe(true);
    });

    it('should re-emit selector changes as agent-change events', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agents=${AGENTS} selected-agent-id="a1"></forge-ai-chat-header>`);
      await settle(el);
      const events: CustomEvent<ForgeAiChatHeaderAgentChangeEventData>[] = [];
      el.addEventListener('forge-ai-chat-header-agent-change', evt => events.push(evt));
      const selector = q<AiAgentSelectorComponent>(el, 'forge-ai-agent-selector')!;
      await settle(selector);

      selector.shadowRoot!.querySelector<HTMLButtonElement>('#agent-selector-trigger')!.click();
      await settle(selector);
      selector.shadowRoot!.querySelectorAll<HTMLElement>('.agent-item:not(.agent-item--default)')[1].click();

      expect(events).toHaveLength(1);
      expect(events[0].detail).toEqual({ agent: AGENTS[1], previousAgentId: 'a1' });
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should not expose the selector-change event itself beyond the header event shape', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agents=${AGENTS}></forge-ai-chat-header>`);
      await settle(el);
      const selector = q<AiAgentSelectorComponent>(el, 'forge-ai-agent-selector')!;
      await settle(selector);
      const spy = vi.fn();
      el.addEventListener('forge-ai-chat-header-agent-change', spy);

      selector.shadowRoot!.querySelector<HTMLButtonElement>('#agent-selector-trigger')!.click();
      await settle(selector);
      selector.shadowRoot!.querySelector<HTMLElement>('.agent-item--default')!.click();
      await settle(selector);
      selector.shadowRoot!.querySelector<HTMLButtonElement>('#agent-selector-trigger')!.click();
      await settle(selector);
      selector.shadowRoot!.querySelectorAll<HTMLElement>('.agent-item:not(.agent-item--default)')[0].click();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('conversations button', () => {
    it('should not render by default', async () => {
      const el = await createHeader();

      expect(q(el, '#conversations-button')).toBeNull();
    });

    it('should render with an accessible label when enabled', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-conversations-button></forge-ai-chat-header>`);

      expect(q(el, '#conversations-button')!.getAttribute('aria-label')).toBe('Toggle conversations panel');
      expect(q(el, '.conversations-button__error-badge')).toBeNull();
    });

    it('should show an error badge and update its label when hasConversationsError is set', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-conversations-button has-conversations-error></forge-ai-chat-header>`);

      expect(q(el, '#conversations-button')!.getAttribute('aria-label')).toBe('Toggle conversations panel - Failed to load');
      expect(q(el, '.conversations-button__error-badge')).not.toBeNull();
    });

    it('should dispatch conversations-toggle when clicked', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-conversations-button></forge-ai-chat-header>`);
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-chat-header-conversations-toggle', evt => events.push(evt));

      q(el, '#conversations-button')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });
  });

  describe('minimize button', () => {
    it('should not render by default', async () => {
      const el = await createHeader();

      expect(q(el, '#minimize-button')).toBeNull();
      expect(q(el, '#minimize-tooltip')).toBeNull();
    });

    it('should render with a label and tooltip when enabled', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-minimize-button></forge-ai-chat-header>`);

      expect(q(el, '#minimize-button')!.getAttribute('aria-label')).toBe('Minimize chat window');
      expect(q(el, '#minimize-tooltip')!.textContent).toContain('Minimize chat to taskbar');
    });

    it('should render different icons for default and panel minimize icons', async () => {
      const def = await createHeader(html`<forge-ai-chat-header show-minimize-button></forge-ai-chat-header>`);
      const panel = await createHeader(html`<forge-ai-chat-header show-minimize-button minimize-icon="panel"></forge-ai-chat-header>`);

      const defPaths = q(def, '#minimize-button')!.querySelectorAll('path').length;
      const panelPaths = q(panel, '#minimize-button')!.querySelectorAll('path').length;
      expect(defPaths).not.toBe(panelPaths);
    });

    it('should dispatch minimize when clicked', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-minimize-button></forge-ai-chat-header>`);
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-chat-header-minimize', evt => events.push(evt));

      q(el, '#minimize-button')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });
  });

  describe('expand button', () => {
    it('should not render by default', async () => {
      const el = await createHeader();

      expect(q(el, '#expand-button')).toBeNull();
      expect(q(el, '#expand-tooltip')).toBeNull();
    });

    it('should describe the expand action when collapsed', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-expand-button></forge-ai-chat-header>`);

      expect(q(el, '#expand-button')!.getAttribute('aria-label')).toBe('Expand chat window');
      expect(q(el, '#expand-tooltip')!.textContent).toContain('Expand to full window');
    });

    it('should describe the collapse action when expanded', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-expand-button expanded></forge-ai-chat-header>`);

      expect(q(el, '#expand-button')!.getAttribute('aria-label')).toBe('Collapse chat window');
      expect(q(el, '#expand-tooltip')!.textContent).toContain('Collapse to smaller window');
    });

    it('should update the label and icon when expanded changes', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-expand-button></forge-ai-chat-header>`);
      const before = q(el, '#expand-button path')!.getAttribute('d');

      el.expanded = true;
      await el.updateComplete;

      expect(q(el, '#expand-button')!.getAttribute('aria-label')).toBe('Collapse chat window');
      expect(q(el, '#expand-button path')!.getAttribute('d')).not.toBe(before);
    });

    it('should dispatch expand when clicked', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-expand-button></forge-ai-chat-header>`);
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-chat-header-expand', evt => events.push(evt));

      q(el, '#expand-button')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should not toggle expanded itself', async () => {
      const el = await createHeader(html`<forge-ai-chat-header show-expand-button></forge-ai-chat-header>`);

      q(el, '#expand-button')!.click();
      await el.updateComplete;

      expect(el.expanded).toBe(false);
    });
  });

  describe('options menu', () => {
    it('should render an icon-button dropdown with a label when options are enabled', async () => {
      const el = await createHeader();
      const menu = getMenu(el)!;

      expect(menu).not.toBeNull();
      expect(menu.variant).toBe('icon-button');
      expect(menu.selectionMode).toBe('none');
      expect(menu.triggerLabel).toBe('More options');
      expect(menu.popoverPlacement).toBe('bottom-end');
    });

    it('should render export and clear items by default', async () => {
      const el = await createHeader();

      expect(menuValues(el)).toEqual(['export', 'clear-chat']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).not.toBeNull();
    });

    it('should hide the menu when options is off', async () => {
      const el = await createHeader(html`<forge-ai-chat-header options="off"></forge-ai-chat-header>`);

      expect(getMenu(el)).toBeNull();
    });

    it('should hide the export item when exportOption is off', async () => {
      const el = await createHeader(html`<forge-ai-chat-header export-option="off"></forge-ai-chat-header>`);

      expect(menuValues(el)).toEqual(['clear-chat']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).toBeNull();
    });

    it('should hide the clear item when clearOption is off', async () => {
      const el = await createHeader(html`<forge-ai-chat-header clear-option="off"></forge-ai-chat-header>`);

      expect(menuValues(el)).toEqual(['export']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).toBeNull();
    });

    it('should hide the menu when no option is available', async () => {
      const el = await createHeader(html`<forge-ai-chat-header export-option="off" clear-option="off"></forge-ai-chat-header>`);

      expect(getMenu(el)).toBeNull();
    });

    it('should show the info item and a separator when agentInfo is provided', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${{ name: 'Bot' }}></forge-ai-chat-header>`);

      expect(menuValues(el)).toEqual(['export', 'info', 'clear-chat']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).not.toBeNull();
    });

    it('should keep the menu for agentInfo even when export and clear are off', async () => {
      const el = await createHeader(html`<forge-ai-chat-header export-option="off" clear-option="off" .agentInfo=${{ name: 'Bot' }}></forge-ai-chat-header>`);

      expect(menuValues(el)).toEqual(['info']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).toBeNull();
    });

    it('should separate clear from info when export is off', async () => {
      const el = await createHeader(html`<forge-ai-chat-header export-option="off" .agentInfo=${{ name: 'Bot' }}></forge-ai-chat-header>`);

      expect(menuValues(el)).toEqual(['info', 'clear-chat']);
      expect(q(el, 'forge-ai-dropdown-menu-separator')).not.toBeNull();
    });

    it('should dispatch export when the export item is selected', async () => {
      const el = await createHeader();
      await settle(el);
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-chat-header-export', evt => events.push(evt));
      const menu = getMenu(el)!;
      menu.open = true;
      await settle(menu);

      el.shadowRoot!.querySelector<HTMLElement>('forge-ai-dropdown-menu-item[value="export"]')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch clear when the clear item is selected', async () => {
      const el = await createHeader();
      await settle(el);
      const events: CustomEvent<void>[] = [];
      el.addEventListener('forge-ai-chat-header-clear', evt => events.push(evt));
      const menu = getMenu(el)!;
      menu.open = true;
      await settle(menu);

      el.shadowRoot!.querySelector<HTMLElement>('forge-ai-dropdown-menu-item[value="clear-chat"]')!.click();

      expect(events).toHaveLength(1);
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should not dispatch export or clear when the info item is selected', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${{ name: 'Bot' }}></forge-ai-chat-header>`);
      await settle(el);
      const spy = vi.fn();
      el.addEventListener('forge-ai-chat-header-export', spy);
      el.addEventListener('forge-ai-chat-header-clear', spy);
      const menu = getMenu(el)!;
      menu.open = true;
      await settle(menu);

      el.shadowRoot!.querySelector<HTMLElement>('forge-ai-dropdown-menu-item[value="info"]')!.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should open the agent info modal when the info item is selected', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${{ name: 'Bot' }}></forge-ai-chat-header>`);
      await settle(el);
      const menu = getMenu(el)!;
      menu.open = true;
      await settle(menu);

      el.shadowRoot!.querySelector<HTMLElement>('forge-ai-dropdown-menu-item[value="info"]')!.click();
      await settle(el);

      expect(q<AiModalComponent>(el, 'forge-ai-modal')!.open).toBe(true);
    });
  });

  describe('agent info modal', () => {
    const info = { name: 'Bot', version: '1.0', identifier: 'id-1', threadId: 'th-1' };

    it('should not render a modal without agentInfo', async () => {
      const el = await createHeader();

      expect(q(el, 'forge-ai-modal')).toBeNull();
    });

    it('should render a closed, labelled modal when agentInfo is provided', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);

      const modal = q<AiModalComponent>(el, 'forge-ai-modal')!;
      expect(modal.open).toBe(false);
      expect(modal.label).toBe('Agent Information');
    });

    it('should pass agentInfo to the agent info component', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);

      expect(q<HTMLElement & { agentInfo: unknown }>(el, 'forge-ai-agent-info')!.agentInfo).toEqual(info);
    });

    it('should open the modal via showAgentInfo()', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);

      el.showAgentInfo();
      await settle(el);

      expect(q<AiModalComponent>(el, 'forge-ai-modal')!.open).toBe(true);
    });

    it('should do nothing from showAgentInfo() without agentInfo', async () => {
      const el = await createHeader();

      expect(() => el.showAgentInfo()).not.toThrow();
    });

    it('should close the modal from the header close button', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);
      el.showAgentInfo();
      await settle(el);

      q(el, '.close-button')!.click();
      await settle(el);

      expect(q<AiModalComponent>(el, 'forge-ai-modal')!.open).toBe(false);
    });

    it('should close the modal from the footer close button', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);
      el.showAgentInfo();
      await settle(el);

      q(el, '.forge-scaffold__footer button')!.click();
      await settle(el);

      expect(q<AiModalComponent>(el, 'forge-ai-modal')!.open).toBe(false);
    });

    it('should label the modal close button for assistive tech', async () => {
      const el = await createHeader(html`<forge-ai-chat-header .agentInfo=${info}></forge-ai-chat-header>`);

      expect(q(el, '.close-button')!.getAttribute('aria-label')).toBe('Close agent information dialog');
    });
  });
});
