import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { ToolCall } from '../types/index.js';
import type { AiToolCallIndicatorComponent } from './ai-tool-call-indicator.js';

import './ai-tool-call-indicator.js';

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
});
