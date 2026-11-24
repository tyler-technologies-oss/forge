import type { AiClarificationAnswer } from '../../ai-clarification-stepper/index.js';

/**
 * What the agent receives. `dismissed` means the question was abandoned and `answers` holds the recommended options.
 */
export interface ClarificationResult extends Record<string, unknown> {
  answers: AiClarificationAnswer[];
  dismissed?: boolean;
}

interface PendingClarification {
  resolve: (result: ClarificationResult) => void;
  fallback: AiClarificationAnswer[];
}

const pending = new Map<string, PendingClarification>();

const watchers = new Map<string, Set<symbol>>();

/**
 * Called by the tool's handler. Settles when the person answers or the question is abandoned.
 */
export function waitForClarification(config: { toolCallId: string; fallback: AiClarificationAnswer[] }): Promise<ClarificationResult> {
  const { toolCallId, fallback } = config;
  return new Promise(resolve => {
    pending.set(toolCallId, { resolve, fallback });
  });
}

/**
 * Called by the renderer. Returns whether a handler was waiting.
 */
export function resolveClarification(config: { toolCallId: string; answers: AiClarificationAnswer[] }): boolean {
  const { toolCallId, answers } = config;
  const request = pending.get(toolCallId);
  if (!request) {
    return false;
  }

  pending.delete(toolCallId);
  request.resolve({ answers });
  return true;
}

/**
 * Registers a renderer as showing a tool call, and returns the function that releases it.
 *
 * A question nobody is showing is abandoned. The host can swap in a fresh renderer for the same call, so the
 * check is deferred and abandons only if no renderer picked the call back up.
 */
export function watchClarification(toolCallId: string): () => void {
  const token = Symbol(toolCallId);
  const tokens = watchers.get(toolCallId) ?? new Set<symbol>();
  tokens.add(token);
  watchers.set(toolCallId, tokens);

  return () => {
    tokens.delete(token);
    if (tokens.size > 0) {
      return;
    }

    // A late release must not unregister a newer renderer that took the call over.
    if (watchers.get(toolCallId) === tokens) {
      watchers.delete(toolCallId);
    }

    setTimeout(() => {
      if (!watchers.has(toolCallId)) {
        abandonClarification(toolCallId);
      }
    }, 0);
  };
}

function abandonClarification(toolCallId: string): void {
  const request = pending.get(toolCallId);
  if (!request) {
    return;
  }

  pending.delete(toolCallId);
  request.resolve({ answers: request.fallback, dismissed: true });
}
