import type { AnyToolDefinition, ToolCall } from '../types/index.js';

/**
 * Whether a tool call's renderer should currently be shown: once the call is complete,
 * or immediately (while still parsing/executing) if the tool opted into `renderOnStart`.
 * A `rendererOnly` tool also keeps its renderer shown when the call errors or is cancelled, since nothing else reports either.
 */
export function shouldShowToolRenderer(toolCall: ToolCall, toolDefinition?: AnyToolDefinition): boolean {
  if (!toolDefinition?.renderer) {
    return false;
  }
  if (toolCall.status === 'complete') {
    return true;
  }
  if (toolDefinition.rendererOnly && (toolCall.status === 'error' || toolCall.status === 'cancelled')) {
    return true;
  }
  return !!toolDefinition.renderOnStart && (toolCall.status === 'parsing' || toolCall.status === 'executing' || toolCall.status === 'cancelled');
}

/**
 * Whether a tool call should be treated as settled for activity indicators (thinking
 * indicator, tool-call summary spinner): either genuinely finished, or already showing
 * its own renderer to the user, which makes a redundant "running" spinner misleading.
 */
export function isToolCallSettled(toolCall: ToolCall, toolDefinition?: AnyToolDefinition): boolean {
  return toolCall.status === 'complete' || toolCall.status === 'error' || toolCall.status === 'cancelled' || shouldShowToolRenderer(toolCall, toolDefinition);
}
