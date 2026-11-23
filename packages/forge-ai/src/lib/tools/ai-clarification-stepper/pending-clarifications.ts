import type { AiClarificationAnswer } from '../../ai-clarification-stepper/index.js';

/**
 * What the agent receives. `dismissed` is set when the person did not choose these answers: the question was left
 * behind, so `answers` holds the agent's own recommended options (or nothing, if there was nothing to ask).
 */
export interface ClarificationResult extends Record<string, unknown> {
  answers: AiClarificationAnswer[];
  dismissed?: boolean;
}

interface PendingClarification {
  resolve: (result: ClarificationResult) => void;
  /** What to answer with if the question is abandoned. */
  fallback: AiClarificationAnswer[];
}

/**
 * The tool's handler and its renderer are separate objects that only share a tool call id, so a handler that is
 * waiting for the person parks its `resolve` here, and the renderer settles it when the person answers.
 */
const pending = new Map<string, PendingClarification>();

/** The renderers currently showing each tool call, each represented by a token. */
const watchers = new Map<string, Set<symbol>>();

/**
 * Called by the tool's handler. The returned promise settles when the person answers, or when the question is
 * abandoned, and the chatbot holds the agent's turn until then.
 */
export function waitForClarification(config: { toolCallId: string; fallback: AiClarificationAnswer[] }): Promise<ClarificationResult> {
  const { toolCallId, fallback } = config;
  return new Promise(resolve => {
    pending.set(toolCallId, { resolve, fallback });
  });
}

/** Called by the renderer with the person's answers. Returns whether a handler was waiting for them. */
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
 * A question nobody is showing any more can never be answered, and the chatbot stays busy for as long as its
 * handler is waiting, so it is abandoned. But the host also replaces a renderer with a fresh one for the same
 * call (and the launcher removes the whole conversation while its history view is open), so the check waits until
 * the host has finished moving elements, and abandons only if no renderer picked the call back up.
 */
export function watchClarification(toolCallId: string): () => void {
  const token = Symbol(toolCallId);
  const tokens = watchers.get(toolCallId) ?? new Set<symbol>();
  tokens.add(token);
  watchers.set(toolCallId, tokens);

  // Releasing twice is harmless: the token is already gone, and the abandon check re-reads who is watching.
  return () => {
    tokens.delete(token);
    if (tokens.size > 0) {
      return;
    }

    // A release that arrives after a newer renderer took the call over must leave that renderer registered.
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
