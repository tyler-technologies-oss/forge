import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AgentInfo, AiAgentInfoComponent } from './ai-agent-info.js';

import './index.js';

const TAG = 'forge-ai-agent-info';

function createInfo(agentInfo?: AgentInfo): Promise<AiAgentInfoComponent> {
  return renderFixture<AiAgentInfoComponent>(html`<forge-ai-agent-info .agentInfo=${agentInfo}></forge-ai-agent-info>`, TAG);
}

const labels = (el: AiAgentInfoComponent): (string | undefined)[] =>
  Array.from(el.shadowRoot!.querySelectorAll('.forge-label-value__label')).map(l => l.textContent?.trim());
const valueFor = (el: AiAgentInfoComponent, label: string): Element | undefined => {
  const row = Array.from(el.shadowRoot!.querySelectorAll('.forge-label-value')).find(
    r => r.querySelector('.forge-label-value__label')?.textContent?.trim() === label
  );
  return row?.querySelector('.forge-label-value__value') ?? undefined;
};

describe('AiAgentInfo', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createInfo();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  it('should default agentInfo to undefined', async () => {
    const el = await createInfo();

    expect(el.agentInfo).toBeUndefined();
  });

  it('should render nothing when agentInfo is not set', async () => {
    const el = await createInfo();

    expect(el.shadowRoot!.textContent?.trim()).toBe('');
  });

  it('should render an empty container when agentInfo has no known fields', async () => {
    const el = await createInfo({});

    expect(labels(el)).toEqual([]);
  });

  it('should render the agent name', async () => {
    const el = await createInfo({ name: 'Helper' });

    expect(labels(el)).toEqual(['Agent name']);
    expect(valueFor(el, 'Agent name')!.textContent).toContain('Helper');
  });

  it('should render the version', async () => {
    const el = await createInfo({ version: '1.2.3' });

    expect(labels(el)).toEqual(['Version']);
    expect(valueFor(el, 'Version')!.textContent).toContain('1.2.3');
  });

  it('should render the agent ID with a copy button bound to the identifier', async () => {
    const el = await createInfo({ identifier: 'agent-42' });

    const value = valueFor(el, 'Agent ID')!;
    expect(value.textContent).toContain('agent-42');
    expect(value.querySelector('forge-ai-copy-button')!.value).toBe('agent-42');
  });

  it('should render the session ID with a copy button bound to the thread id', async () => {
    const el = await createInfo({ threadId: 'thread-9' });

    const value = valueFor(el, 'Session ID')!;
    expect(value.textContent).toContain('thread-9');
    expect(value.querySelector('forge-ai-copy-button')!.value).toBe('thread-9');
  });

  it('should render all fields in order', async () => {
    const el = await createInfo({ name: 'N', version: 'V', identifier: 'I', threadId: 'T' });

    expect(labels(el)).toEqual(['Agent name', 'Version', 'Agent ID', 'Session ID']);
  });

  it('should skip fields that are empty strings', async () => {
    const el = await createInfo({ name: '', version: '', identifier: '', threadId: '' });

    expect(labels(el)).toEqual([]);
  });

  it('should not render description, model or lastUpdated', async () => {
    const el = await createInfo({ description: 'desc', model: 'gpt', lastUpdated: 'today' });

    expect(labels(el)).toEqual([]);
    expect(el.shadowRoot!.textContent).not.toContain('gpt');
  });

  it('should update when agentInfo changes', async () => {
    const el = await createInfo({ name: 'Old' });

    el.agentInfo = { name: 'New' };
    await el.updateComplete;
    expect(valueFor(el, 'Agent name')!.textContent).toContain('New');

    el.agentInfo = undefined;
    await el.updateComplete;
    expect(el.shadowRoot!.textContent?.trim()).toBe('');
  });
});
