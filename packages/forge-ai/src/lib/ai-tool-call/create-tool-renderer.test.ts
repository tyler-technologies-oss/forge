import { describe, expect, it } from 'vitest';
import { createToolRenderer } from './create-tool-renderer.js';
import type { ToolCall } from '../types/index.js';

const toolCall: ToolCall = { id: 'call-1', messageId: 'msg-1', name: 'tool', args: {}, status: 'complete', type: 'client' };

describe('createToolRenderer', () => {
  it('should return an element renderer for an element tag config', () => {
    const renderer = createToolRenderer({ elementTag: 'forge-ai-steps' });

    expect(renderer).toEqual({ elementTag: 'forge-ai-steps' });
    expect(renderer.render).toBeUndefined();
  });

  it('should return a render-function renderer for a render config', () => {
    const element = document.createElement('div');
    const render = (): HTMLElement => element;
    const renderer = createToolRenderer({ render });

    expect(renderer.render).toBe(render);
    expect(renderer.render?.(toolCall)).toBe(element);
    expect(renderer.elementTag).toBeUndefined();
  });
});
