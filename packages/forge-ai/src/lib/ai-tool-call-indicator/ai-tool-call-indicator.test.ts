import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AnyToolDefinition, ToolCall } from '../types/index.js';
import { AiToolCallIndicatorComponent, AiToolCallIndicatorComponentTagName } from './ai-tool-call-indicator.js';

const TAG = 'forge-ai-tool-call-indicator';

function makeCall(overrides: Partial<ToolCall> = {}): ToolCall {
  return { id: 'tc-1', messageId: 'msg-1', name: 'search', args: {}, status: 'complete', type: 'client', ...overrides };
}

function createElement(
  toolCalls: ToolCall[] = [],
  extra: { tools?: Map<string, AnyToolDefinition>; debug?: boolean } = {}
): Promise<AiToolCallIndicatorComponent> {
  const el = html`<forge-ai-tool-call-indicator ?debug-mode=${!!extra.debug} .toolCalls=${toolCalls} .tools=${extra.tools}></forge-ai-tool-call-indicator>`;
  return renderFixture<AiToolCallIndicatorComponent>(el, TAG);
}

function summary(el: AiToolCallIndicatorComponent): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('.summary');
}

function summaryText(el: AiToolCallIndicatorComponent): string {
  return el.shadowRoot!.querySelector('.status-text')!.textContent!.trim();
}

function rowNames(el: AiToolCallIndicatorComponent): string[] {
  return Array.from(el.shadowRoot!.querySelectorAll('.row-name, .code-card__name')).map(n =>
    Array.from(n.childNodes)
      .filter(c => c.nodeType === Node.TEXT_NODE)
      .map(c => c.textContent)
      .join('')
      .trim()
  );
}

describe('AiToolCallIndicatorComponent', () => {
  it('should wrap long unbroken strings in the debug detail instead of overflowing', async () => {
    const toolCall: ToolCall = {
      id: 'tc-1',
      messageId: 'msg-1',
      name: 'search',
      args: { query: 'x'.repeat(1500) },
      status: 'complete',
      type: 'client',
      startTimestamp: 1000,
      endTimestamp: 2000
    };
    const el = await renderFixture<AiToolCallIndicatorComponent>(
      html`<div style="width: 300px"><forge-ai-tool-call-indicator debug-mode .toolCalls=${[toolCall]}></forge-ai-tool-call-indicator></div>`,
      'forge-ai-tool-call-indicator'
    );

    el.shadowRoot!.querySelector<HTMLButtonElement>('.summary')!.click();
    await el.updateComplete;
    el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
    await el.updateComplete;

    const code = el.shadowRoot!.querySelector<HTMLElement>('.code-card__code')!;
    expect(getComputedStyle(code).overflowWrap).toBe('anywhere');
    expect(code.scrollWidth).toBeLessThanOrEqual(code.clientWidth);
  });

  it('should be registered under the forge-ai-tool-call-indicator tag', async () => {
    const el = await createElement();

    expect(AiToolCallIndicatorComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiToolCallIndicatorComponent);
    expect(el).toBeInstanceOf(AiToolCallIndicatorComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement();

      expect(el.toolCalls).toEqual([]);
      expect(el.tools).toBeUndefined();
      expect(el.debugMode).toBe(false);
    });

    it('should reflect debugMode to the attribute and read it back', async () => {
      const el = await createElement();

      el.debugMode = true;
      await el.updateComplete;
      expect(el.hasAttribute('debug-mode')).toBe(true);

      const fromAttr = await createElement([], { debug: true });
      expect(fromAttr.debugMode).toBe(true);
    });

    it('should toggle the debug-mode custom state', async () => {
      const el = await createElement();
      expect(el.matches(':state(debug-mode)')).toBe(false);

      el.debugMode = true;
      await el.updateComplete;
      expect(el.matches(':state(debug-mode)')).toBe(true);

      el.debugMode = false;
      await el.updateComplete;
      expect(el.matches(':state(debug-mode)')).toBe(false);
    });
  });

  describe('empty state', () => {
    it('should render nothing when there are no tool calls', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.childElementCount).toBe(0);
    });
  });

  describe('summary label', () => {
    it('should show a running label with a spinner while a call is unsettled', async () => {
      const el = await createElement([makeCall({ status: 'executing' })]);

      expect(summaryText(el)).toBe('Running tools...');
      expect(summary(el)!.querySelector('forge-ai-spinner')).toBeTruthy();
    });

    it.each(['pending', 'parsing', 'executing'] as const)('should treat %s as running', async status => {
      const el = await createElement([makeCall({ status })]);

      expect(summaryText(el)).toBe('Running tools...');
    });

    it('should show a singular label for one completed call', async () => {
      const el = await createElement([makeCall()]);

      expect(summaryText(el)).toBe('Used 1 tool');
      expect(summary(el)!.querySelector('forge-ai-spinner')).toBeNull();
    });

    it('should show a plural label for several completed calls', async () => {
      const el = await createElement([makeCall({ id: 'a' }), makeCall({ id: 'b' })]);

      expect(summaryText(el)).toBe('Used 2 tools');
    });

    it('should append elapsed milliseconds when under a second', async () => {
      const el = await createElement([makeCall({ startTimestamp: 1000, endTimestamp: 1500 })]);

      expect(summaryText(el)).toBe('Used 1 tool · 500ms');
    });

    it('should append elapsed seconds using earliest start and latest end', async () => {
      const el = await createElement([
        makeCall({ id: 'a', startTimestamp: 1000, endTimestamp: 2000 }),
        makeCall({ id: 'b', startTimestamp: 1500, endTimestamp: 4000 })
      ]);

      expect(summaryText(el)).toBe('Used 2 tools · 3s');
    });

    it('should round elapsed seconds to the nearest second', async () => {
      const el = await createElement([makeCall({ startTimestamp: 1000, endTimestamp: 3500 })]);

      expect(summaryText(el)).toBe('Used 1 tool · 3s');
    });

    it('should show exactly one second as 1s', async () => {
      const el = await createElement([makeCall({ startTimestamp: 1000, endTimestamp: 2000 })]);

      expect(summaryText(el)).toBe('Used 1 tool · 1s');
    });

    it('should span from the earliest start to the latest end across calls', async () => {
      const el = await createElement([
        makeCall({ id: 'a', startTimestamp: 1000, endTimestamp: 2000 }),
        makeCall({ id: 'b', startTimestamp: 3000, endTimestamp: 6000 })
      ]);

      expect(summaryText(el)).toBe('Used 2 tools · 5s');
    });

    it('should omit elapsed time when timestamps are missing', async () => {
      const el = await createElement([makeCall({ startTimestamp: 1000 })]);

      expect(summaryText(el)).toBe('Used 1 tool');
    });

    it('should treat errored calls as settled', async () => {
      const el = await createElement([makeCall({ status: 'error' })]);

      expect(summaryText(el)).toBe('Used 1 tool');
    });

    it('should treat a call with a visible renderer as settled', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search', renderOnStart: true, renderer: { elementTag: 'x-y' } }]]);
      const el = await createElement([makeCall({ status: 'executing' })], { tools });

      expect(summaryText(el)).toBe('Used 1 tool');
    });

    it('should update the label when the calls settle', async () => {
      const el = await createElement([makeCall({ status: 'executing' })]);

      el.toolCalls = [makeCall({ status: 'complete' })];
      await el.updateComplete;

      expect(summaryText(el)).toBe('Used 1 tool');
    });
  });

  describe('expansion', () => {
    it('should start collapsed with aria-expanded false', async () => {
      const el = await createElement([makeCall()]);

      expect(summary(el)!.getAttribute('aria-expanded')).toBe('false');
      expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded')).toBe(false);
    });

    it('should expand and collapse the timeline when the summary is clicked', async () => {
      const el = await createElement([makeCall()]);

      summary(el)!.click();
      await el.updateComplete;
      expect(summary(el)!.getAttribute('aria-expanded')).toBe('true');
      expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded')).toBe(true);

      summary(el)!.click();
      await el.updateComplete;
      expect(summary(el)!.getAttribute('aria-expanded')).toBe('false');
    });

    it('should toggle with the Enter key', async () => {
      const el = await createElement([makeCall()]);
      summary(el)!.focus();

      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(summary(el)!.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle with the Space key', async () => {
      const el = await createElement([makeCall()]);
      summary(el)!.focus();

      await userEvent.keyboard(' ');
      await el.updateComplete;

      expect(summary(el)!.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('rows (non-debug)', () => {
    it('should render a row per tool call with its name and status', async () => {
      const el = await createElement([makeCall({ id: 'a', name: 'alpha' }), makeCall({ id: 'b', name: 'beta', status: 'error' })]);

      const rows = Array.from(el.shadowRoot!.querySelectorAll('.timeline-row'));

      expect(rowNames(el)).toEqual(['alpha', 'beta']);
      expect(rows.map(r => r.getAttribute('data-status'))).toEqual(['complete', 'error']);
    });

    it('should prefer the tool display name', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search', displayName: 'Search the web' }]]);
      const el = await createElement([makeCall()], { tools });

      expect(rowNames(el)).toEqual(['Search the web']);
    });

    it('should render a spinner marker for running rows, and complete and error markers otherwise', async () => {
      const el = await createElement([
        makeCall({ id: 'a', status: 'executing' }),
        makeCall({ id: 'b', status: 'complete' }),
        makeCall({ id: 'c', status: 'error' })
      ]);

      const markers = Array.from(el.shadowRoot!.querySelectorAll('.row-marker'));

      expect(markers[0].querySelector('forge-ai-spinner')).toBeTruthy();
      expect(markers[1].classList.contains('row-marker--complete')).toBe(true);
      expect(markers[2].classList.contains('row-marker--error')).toBe(true);
    });

    it('should show a duration badge in milliseconds or seconds', async () => {
      const el = await createElement([
        makeCall({ id: 'a', startTimestamp: 100, endTimestamp: 350 }),
        makeCall({ id: 'b', startTimestamp: 1000, endTimestamp: 3500 })
      ]);

      const badges = Array.from(el.shadowRoot!.querySelectorAll('.code-card__status')).map(b => b.textContent);

      expect(badges).toEqual(['250ms', '2.5s']);
    });

    it('should show a 0ms badge when start and end are equal', async () => {
      const el = await createElement([makeCall({ startTimestamp: 1000, endTimestamp: 1000 })]);

      expect(el.shadowRoot!.querySelector('.code-card__status')!.textContent).toBe('0ms');
    });

    it('should omit the duration badge when timestamps are missing or inverted', async () => {
      const el = await createElement([makeCall({ id: 'a' }), makeCall({ id: 'b', startTimestamp: 2000, endTimestamp: 1000 })]);

      expect(el.shadowRoot!.querySelectorAll('.code-card__status')).toHaveLength(0);
    });

    it('should not render expandable detail rows without debug mode', async () => {
      const el = await createElement([makeCall({ args: { q: 'x' }, result: 'ok' })]);

      expect(el.shadowRoot!.querySelectorAll('.row-button')).toHaveLength(0);
    });
  });

  describe('debug mode details', () => {
    it('should render an expandable header per call that has args', async () => {
      const el = await createElement([makeCall({ args: { q: 'x' } })], { debug: true });

      const header = el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!;

      expect(header.getAttribute('aria-expanded')).toBe('false');
      expect(el.shadowRoot!.querySelector('.code-card__body')).toBeNull();
    });

    it('should render a plain row in debug mode when the call has no args, result, or error', async () => {
      const el = await createElement([makeCall({ status: 'executing' })], { debug: true });

      expect(el.shadowRoot!.querySelector('.row-button')).toBeNull();
    });

    it('should render an expandable row for a completed call with only a result', async () => {
      const el = await createElement([makeCall({ result: { ok: true } })], { debug: true });

      expect(el.shadowRoot!.querySelector('.row-button')).toBeTruthy();
    });

    it('should render a plain row when a call that is not complete has a result', async () => {
      const el = await createElement([makeCall({ status: 'executing', result: { partial: true } })], { debug: true });

      expect(el.shadowRoot!.querySelector('.row-button')).toBeNull();
      expect(el.shadowRoot!.querySelectorAll('.timeline-row')).toHaveLength(1);
    });

    it('should render an expandable row for an errored call', async () => {
      const el = await createElement([makeCall({ status: 'error' })], { debug: true });

      expect(el.shadowRoot!.querySelector('.row-button')).toBeTruthy();
    });

    it('should expand a row to show a region with the JSON payload', async () => {
      const el = await createElement([makeCall({ args: { q: 'weather' }, result: { temp: 72 }, startTimestamp: 1000, endTimestamp: 1250 })], {
        debug: true
      });

      el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
      await el.updateComplete;

      const header = el.shadowRoot!.querySelector('.row-button')!;
      const region = el.shadowRoot!.querySelector('[role="region"]')!;
      const payload = JSON.parse(region.querySelector('.code-card__code')!.textContent!);

      expect(header.getAttribute('aria-expanded')).toBe('true');
      expect(header.getAttribute('aria-controls')).toBe(region.id);
      expect(payload['tool_name']).toBe('search');
      expect(payload['tool_call_id']).toBe('tc-1');
      expect(payload['status']).toBe('complete');
      expect(payload['duration']).toBe('250ms');
      expect(payload['input']).toEqual({ q: 'weather' });
      expect(payload['output']).toEqual({ temp: 72 });
    });

    it('should collapse an expanded row when clicked again', async () => {
      const el = await createElement([makeCall({ args: { q: 'x' } })], { debug: true });
      const header = el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!;

      header.click();
      await el.updateComplete;
      header.click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.code-card__body')).toBeNull();
    });

    it('should expand rows independently', async () => {
      const el = await createElement([makeCall({ id: 'a', args: { q: 1 } }), makeCall({ id: 'b', args: { q: 2 } })], { debug: true });

      el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.row-button')[0].click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelectorAll('.code-card__body')).toHaveLength(1);
    });

    it('should syntax highlight JSON tokens', async () => {
      const el = await createElement([makeCall({ args: { text: 'hi', n: 3, flag: true, none: null } })], { debug: true });

      el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
      await el.updateComplete;

      const code = el.shadowRoot!.querySelector('.code-card__code')!;
      expect(code.querySelector('.token-key')).toBeTruthy();
      expect(code.querySelector('.token-string')).toBeTruthy();
      expect(code.querySelector('.token-number')).toBeTruthy();
      expect(code.querySelector('.token-boolean')).toBeTruthy();
      expect(code.querySelector('.token-null')).toBeTruthy();
    });

    it('should escape HTML in payload values', async () => {
      const el = await createElement([makeCall({ args: { html: '<img src=x onerror=alert(1)>' } })], { debug: true });

      el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.code-card__code img')).toBeNull();
      expect(el.shadowRoot!.querySelector('.code-card__code')!.textContent).toContain('<img src=x');
    });

    it('should truncate very long payloads', async () => {
      const el = await createElement([makeCall({ args: { big: 'y'.repeat(5000) } })], { debug: true });

      el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.code-card__code')!.textContent).toContain('… (truncated)');
    });

    it('should fall back to String() for payloads that cannot be serialized', async () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;
      const el = await createElement([makeCall({ args: { q: 1 }, result: circular })], { debug: true });

      el.shadowRoot!.querySelector<HTMLButtonElement>('.row-button')!.click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.code-card__code')!.textContent).toContain('[object Object]');
    });

    it('should use the display name in the expandable header', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search', displayName: 'Web search' }]]);
      const el = await createElement([makeCall({ args: { q: 1 } })], { debug: true, tools });

      expect(el.shadowRoot!.querySelector('.code-card__name')!.textContent).toBe('Web search');
    });
  });
});
