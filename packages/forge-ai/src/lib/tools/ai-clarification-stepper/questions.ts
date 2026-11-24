import type { AiClarificationOption, AiClarificationQuestion } from '../../ai-clarification-stepper/index.js';

/**
 * What the agent sends. Every field is optional because the arguments are untrusted.
 */
export interface ClarificationStepperData {
  questions?: (Partial<Omit<AiClarificationQuestion, 'options'>> & {
    options?: Partial<AiClarificationOption>[];
  })[];
}

/**
 * Keeps only what the stepper can show: questions with text and a labeled option, unique ids, and one recommended
 * option per question.
 */
export function sanitizeQuestions(raw: unknown): AiClarificationQuestion[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const usedIds = new Set<string>();
  const questions: AiClarificationQuestion[] = [];

  for (const [index, entry] of raw.entries()) {
    const text = typeof entry?.question === 'string' ? entry.question.trim() : '';
    const options = sanitizeOptions(entry?.options);
    if (!text || options.length === 0) {
      continue;
    }

    let id = typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : `question-${index + 1}`;
    if (usedIds.has(id)) {
      id = `${id}-${index + 1}`;
    }
    usedIds.add(id);

    questions.push({ id, question: text, options, allowCustom: entry.allowCustom !== false });
  }

  return questions;
}

function sanitizeOptions(raw: unknown): AiClarificationOption[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  let hasRecommended = false;
  const options: AiClarificationOption[] = [];

  for (const entry of raw) {
    const label = typeof entry?.label === 'string' ? entry.label.trim() : '';
    if (!label) {
      continue;
    }

    const recommended: boolean = entry.recommended === true && !hasRecommended;
    hasRecommended ||= recommended;
    options.push({
      label,
      value: typeof entry.value === 'string' && entry.value ? entry.value : label,
      recommended
    });
  }

  return options;
}
