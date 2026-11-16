import { describe, expect, it } from 'vitest';
import type { AnyToolDefinition, ToolCall } from '../types/index.js';
import { isToolCallSettled, shouldShowToolRenderer } from './utils.js';

function createToolCall(status: ToolCall['status']): ToolCall {
  return { id: 'call-1', messageId: 'msg-1', name: 'tool', args: {}, status, type: 'client' };
}

function createDefinition(overrides: Partial<AnyToolDefinition> = {}): AnyToolDefinition {
  return { name: 'tool', renderer: { elementTag: 'div' }, ...overrides };
}

describe('shouldShowToolRenderer', () => {
  it('should be false without a tool definition', () => {
    expect(shouldShowToolRenderer(createToolCall('complete'))).toBe(false);
  });

  it('should be false when the definition has no renderer', () => {
    expect(shouldShowToolRenderer(createToolCall('complete'), createDefinition({ renderer: undefined }))).toBe(false);
  });

  it('should be true once the call is complete', () => {
    expect(shouldShowToolRenderer(createToolCall('complete'), createDefinition())).toBe(true);
  });

  it.each(['pending', 'parsing', 'executing', 'error'] as const)('should be false for status "%s" without renderOnStart', status => {
    expect(shouldShowToolRenderer(createToolCall(status), createDefinition())).toBe(false);
  });

  it.each(['parsing', 'executing'] as const)('should be true for status "%s" with renderOnStart', status => {
    expect(shouldShowToolRenderer(createToolCall(status), createDefinition({ renderOnStart: true }))).toBe(true);
  });

  it.each(['pending', 'error'] as const)('should be false for status "%s" even with renderOnStart', status => {
    expect(shouldShowToolRenderer(createToolCall(status), createDefinition({ renderOnStart: true }))).toBe(false);
  });
});

describe('isToolCallSettled', () => {
  it.each(['complete', 'error'] as const)('should be true for status "%s" without a definition', status => {
    expect(isToolCallSettled(createToolCall(status))).toBe(true);
  });

  it.each(['pending', 'parsing', 'executing'] as const)('should be false for status "%s" without a definition', status => {
    expect(isToolCallSettled(createToolCall(status))).toBe(false);
  });

  it('should be true while running when the tool is already showing its renderer', () => {
    expect(isToolCallSettled(createToolCall('executing'), createDefinition({ renderOnStart: true }))).toBe(true);
  });

  it('should be false while running when the renderer is not shown yet', () => {
    expect(isToolCallSettled(createToolCall('executing'), createDefinition())).toBe(false);
  });
});
