import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { AiClarificationStepperComponent } from '../../ai-clarification-stepper/ai-clarification-stepper.js';
import type { ClarificationStepperToolElement } from './ai-clarification-stepper.js';
import { resolveClarification, waitForClarification, watchClarification } from './pending-clarifications.js';
import type { ClarificationStepperData } from './questions.js';

import './ai-clarification-stepper.js';

type ToolCall = ClarificationStepperToolElement['toolCall'];

const validQuestions = [
  {
    id: 'field',
    question: 'Which date field?',
    options: [
      { label: 'Report date', value: 'report_date' },
      { label: 'Status date', value: 'status_date', recommended: true }
    ]
  },
  {
    id: 'window',
    question: 'What does last quarter mean?',
    options: [
      { label: 'Calendar quarter', value: 'calendar', recommended: true },
      { label: 'Trailing three months', value: 'trailing' }
    ],
    allowCustom: false
  }
];

let nextId = 0;

/** Every call gets its own id, since pending requests live in module state shared by all of these tests. */
function createToolCall(overrides: Partial<ToolCall> = {}): ToolCall {
  return {
    id: `tc-${++nextId}`,
    messageId: 'msg-1',
    name: 'askClarification',
    args: { questions: validQuestions },
    status: 'executing',
    type: 'client',
    ...overrides
  };
}

/** A call whose arguments are not what the schema asks for, as an agent might send. */
function createUntrustedToolCall(questions: unknown): ToolCall {
  return createToolCall({ args: { questions } as ClarificationStepperData });
}

async function renderTool(toolCall: ToolCall): Promise<{ el: ClarificationStepperToolElement; stepper: AiClarificationStepperComponent }> {
  const el = await renderFixture<ClarificationStepperToolElement>(
    html`<forge-ai-tool-clarification-stepper .toolCall=${toolCall}></forge-ai-tool-clarification-stepper>`,
    'forge-ai-tool-clarification-stepper'
  );
  const stepper = el.shadowRoot!.querySelector<AiClarificationStepperComponent>('forge-ai-clarification-stepper')!;
  await stepper.updateComplete;
  return { el, stepper };
}

function stepperOf(el: ClarificationStepperToolElement): AiClarificationStepperComponent | null {
  return el.shadowRoot!.querySelector<AiClarificationStepperComponent>('forge-ai-clarification-stepper');
}

function oneEvent(el: HTMLElement, eventName: string): Promise<CustomEvent<{ answers: unknown[] }>> {
  return new Promise(resolve => el.addEventListener(eventName, evt => resolve(evt as CustomEvent<{ answers: unknown[] }>), { once: true }));
}

/** Resolves to what the promise settled with, or to `'pending'` if it has not settled after a few ticks. */
async function settled<T>(promise: Promise<T>): Promise<T | 'pending'> {
  return Promise.race([promise, new Promise<'pending'>(resolve => setTimeout(() => resolve('pending'), 30))]);
}

describe('pending clarifications', () => {
  const answers = [{ questionId: 'a', value: 'x', label: 'X', custom: false }];
  const fallback = [{ questionId: 'a', value: 'y', label: 'Y', custom: false }];

  it('should resolve a waiting request once, with the answers', async () => {
    const request = waitForClarification({ toolCallId: 'pending-once', fallback });

    expect(resolveClarification({ toolCallId: 'pending-once', answers })).toBe(true);
    expect(await request).toEqual({ answers });
    expect(resolveClarification({ toolCallId: 'pending-once', answers })).toBe(false);
  });

  it('should report that nothing was waiting for an unknown call', () => {
    expect(resolveClarification({ toolCallId: 'pending-unknown', answers })).toBe(false);
  });

  it('should abandon a request, as dismissed, once nothing is showing it', async () => {
    const request = waitForClarification({ toolCallId: 'pending-abandon', fallback });
    const release = watchClarification('pending-abandon');

    expect(await settled(request)).toBe('pending');
    release();

    expect(await request).toEqual({ answers: fallback, dismissed: true });
  });

  it('should not abandon a request while another renderer is still showing it', async () => {
    const request = waitForClarification({ toolCallId: 'pending-shared', fallback });
    const first = watchClarification('pending-shared');
    const second = watchClarification('pending-shared');

    first();
    expect(await settled(request)).toBe('pending');

    second();
    expect(await request).toEqual({ answers: fallback, dismissed: true });
  });

  it('should not abandon a request that a replacement renderer picks up in the same task', async () => {
    const request = waitForClarification({ toolCallId: 'pending-replaced', fallback });
    const original = watchClarification('pending-replaced');

    original();
    const replacement = watchClarification('pending-replaced');

    expect(await settled(request)).toBe('pending');
    replacement();
    expect(await request).toEqual({ answers: fallback, dismissed: true });
  });

  it('should release only once, however many times release is called', async () => {
    const request = waitForClarification({ toolCallId: 'pending-twice', fallback });
    const first = watchClarification('pending-twice');
    watchClarification('pending-twice');

    first();
    first();

    expect(await settled(request)).toBe('pending');
  });

  it('should not let a stale release drop a renderer that has since taken the call over', async () => {
    const request = waitForClarification({ toolCallId: 'pending-stale', fallback });
    const original = watchClarification('pending-stale');

    original();
    const replacement = watchClarification('pending-stale');
    original();

    expect(await settled(request)).toBe('pending');
    replacement();
    expect(await request).toEqual({ answers: fallback, dismissed: true });
  });

  it('should ignore a release for a call that is not waiting', async () => {
    watchClarification('pending-nothing')();
    await settled(Promise.resolve());

    expect(resolveClarification({ toolCallId: 'pending-nothing', answers })).toBe(false);
  });
});

describe('ClarificationStepperToolElement', () => {
  it('should contain shadow root', async () => {
    const { el } = await renderTool(createToolCall());

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should map the tool call arguments onto the stepper primitive', async () => {
    const { stepper } = await renderTool(createToolCall());

    expect(stepper.questions).toEqual([
      {
        id: 'field',
        question: 'Which date field?',
        options: [
          { label: 'Report date', value: 'report_date', recommended: false },
          { label: 'Status date', value: 'status_date', recommended: true }
        ],
        allowCustom: true
      },
      {
        id: 'window',
        question: 'What does last quarter mean?',
        options: [
          { label: 'Calendar quarter', value: 'calendar', recommended: true },
          { label: 'Trailing three months', value: 'trailing', recommended: false }
        ],
        allowCustom: false
      }
    ]);
    expect(stepper.shadowRoot!.querySelector('.question')!.textContent).toBe('Which date field?');
  });

  it('should render no questions when the arguments have none', async () => {
    for (const questions of [undefined, 'nope', []]) {
      const { stepper } = await renderTool(createUntrustedToolCall(questions));

      expect(stepper.questions).toEqual([]);
      expect(stepper.shadowRoot!.querySelector('.stepper')).toBeNull();
    }
  });

  it('should render nothing before the tool call is assigned', async () => {
    const el = await renderFixture<ClarificationStepperToolElement>(
      html`<forge-ai-tool-clarification-stepper></forge-ai-tool-clarification-stepper>`,
      'forge-ai-tool-clarification-stepper'
    );

    expect(stepperOf(el)).toBeNull();
  });

  describe('while the arguments are still arriving', () => {
    for (const status of ['pending', 'parsing'] as const) {
      it(`should draw nothing while the call is ${status}`, async () => {
        const el = await renderFixture<ClarificationStepperToolElement>(
          html`<forge-ai-tool-clarification-stepper .toolCall=${createToolCall({ status })}></forge-ai-tool-clarification-stepper>`,
          'forge-ai-tool-clarification-stepper'
        );

        expect(stepperOf(el)).toBeNull();
      });
    }

    it('should draw the stepper once the call is executing', async () => {
      const el = await renderFixture<ClarificationStepperToolElement>(
        html`<forge-ai-tool-clarification-stepper .toolCall=${createToolCall({ status: 'parsing' })}></forge-ai-tool-clarification-stepper>`,
        'forge-ai-tool-clarification-stepper'
      );

      el.toolCall = createToolCall({ status: 'executing' });
      await el.updateComplete;

      expect(stepperOf(el)!.status).toBe('editing');
    });

    it('should draw nothing for a call that failed', async () => {
      const el = await renderFixture<ClarificationStepperToolElement>(
        html`<forge-ai-tool-clarification-stepper .toolCall=${createToolCall({ status: 'error' })}></forge-ai-tool-clarification-stepper>`,
        'forge-ai-tool-clarification-stepper'
      );

      expect(stepperOf(el)).toBeNull();
    });
  });

  describe('sanitizing', () => {
    async function sanitized(questions: unknown): Promise<AiClarificationStepperComponent['questions']> {
      const { stepper } = await renderTool(createUntrustedToolCall(questions));
      return stepper.questions;
    }

    it('should drop a question with no text or no usable options', async () => {
      const result = await sanitized([
        { id: 'a', question: '', options: [{ label: 'A' }] },
        { id: 'b', question: 'No options', options: [] },
        { id: 'c', question: 'Unlabeled options', options: [{ label: '' }, { value: 'x' }, null] },
        { id: 'd', question: 'Options missing', options: 'nope' },
        null,
        { id: 'e', question: 'Kept', options: [{ label: 'A' }] }
      ]);

      expect(result.map(question => question.id)).toEqual(['e']);
    });

    it('should default an option value to its label', async () => {
      const [question] = await sanitized([{ id: 'a', question: 'Q', options: [{ label: 'Beat' }] }]);

      expect(question.options[0].value).toBe('Beat');
    });

    it('should give a missing id a position-based one and keep ids unique', async () => {
      const result = await sanitized([
        { question: 'First', options: [{ label: 'A' }] },
        { id: 'dup', question: 'Second', options: [{ label: 'A' }] },
        { id: 'dup', question: 'Third', options: [{ label: 'A' }] }
      ]);

      expect(result.map(question => question.id)).toEqual(['question-1', 'dup', 'dup-3']);
    });

    it('should keep only the first recommended option', async () => {
      const [question] = await sanitized([
        {
          id: 'a',
          question: 'Q',
          options: [{ label: 'A' }, { label: 'B', recommended: true }, { label: 'C', recommended: true }]
        }
      ]);

      expect(question.options.map(option => option.recommended)).toEqual([false, true, false]);
    });

    it('should only treat recommended: true as recommended', async () => {
      const [question] = await sanitized([{ id: 'a', question: 'Q', options: [{ label: 'A', recommended: 'yes' }, { label: 'B' }] }]);

      expect(question.options.map(option => option.recommended)).toEqual([false, false]);
    });

    it('should offer "Something else" unless allowCustom is exactly false', async () => {
      const result = await sanitized([
        { id: 'a', question: 'A', options: [{ label: 'X' }] },
        { id: 'b', question: 'B', options: [{ label: 'X' }], allowCustom: false },
        { id: 'c', question: 'C', options: [{ label: 'X' }], allowCustom: 'no' }
      ]);

      expect(result.map(question => question.allowCustom)).toEqual([true, false, true]);
    });

    it('should not limit the number of questions or options', async () => {
      const options = ['A', 'B', 'C', 'D', 'E'].map(label => ({ label }));
      const result = await sanitized(['1', '2', '3', '4'].map(id => ({ id, question: `Question ${id}`, options })));

      expect(result.map(question => question.id)).toEqual(['1', '2', '3', '4']);
      expect(result[0].options.map(option => option.label)).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('should trim question text and labels', async () => {
      const [question] = await sanitized([{ id: ' a ', question: '  Padded?  ', options: [{ label: '  Yes  ' }] }]);

      expect(question.id).toBe('a');
      expect(question.question).toBe('Padded?');
      expect(question.options[0].label).toBe('Yes');
    });
  });

  describe('answering', () => {
    const singleQuestion = [validQuestions[1]];

    function submit(stepper: AiClarificationStepperComponent): void {
      stepper.shadowRoot!.querySelector<HTMLButtonElement>('.next-button')!.click();
    }

    it('should settle the waiting handler with the answers, and show the stepper as sending until the call completes', async () => {
      const toolCall = createToolCall({ args: { questions: singleQuestion } });
      const request = waitForClarification({ toolCallId: toolCall.id, fallback: [] });
      const { el, stepper } = await renderTool(toolCall);

      submit(stepper);
      await el.updateComplete;
      await stepper.updateComplete;

      expect(await request).toEqual({
        answers: [{ questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }]
      });
      expect(stepper.status).toBe('sending');
    });

    it('should let the submit event reach the tool element', async () => {
      const toolCall = createToolCall({ args: { questions: singleQuestion } });
      const { el, stepper } = await renderTool(toolCall);

      const submitted = oneEvent(el, 'forge-ai-clarification-stepper-submit');
      submit(stepper);
      const { detail } = await submitted;

      expect(detail.answers).toEqual([{ questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }]);
    });

    it('should settle the handler only once however often it is submitted', async () => {
      const toolCall = createToolCall({ args: { questions: singleQuestion } });
      const request = waitForClarification({ toolCallId: toolCall.id, fallback: [] });
      const { el, stepper } = await renderTool(toolCall);

      stepper.dispatchEvent(
        new CustomEvent('forge-ai-clarification-stepper-submit', {
          detail: { answers: [] },
          bubbles: true,
          composed: true
        })
      );
      submit(stepper);
      await el.updateComplete;

      expect(await request).toEqual({ answers: [] });
      expect(resolveClarification({ toolCallId: toolCall.id, answers: [] })).toBe(false);
    });

    it('should show the answers that were delivered, as a record, once the call completes', async () => {
      const toolCall = createToolCall({ args: { questions: validQuestions } });
      const { el, stepper } = await renderTool(toolCall);
      const answers = [
        { questionId: 'field', value: 'report_date', label: 'Report date', custom: false },
        { questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }
      ];

      el.toolCall = { ...toolCall, status: 'complete', result: { answers } };
      await el.updateComplete;
      await stepper.updateComplete;

      expect(stepper.status).toBe('sent');
      expect(stepper.answers).toBe(answers);
      expect(Array.from(stepper.shadowRoot!.querySelectorAll('.record-answer')).map(node => node.textContent)).toEqual(['Report date', 'Calendar quarter']);
      expect(stepper.shadowRoot!.querySelectorAll('input, button')).toHaveLength(0);
    });

    it('should show a record from history, where no one in this session submitted', async () => {
      const answers = [{ questionId: 'window', value: 'trailing', label: 'Trailing three months', custom: false }];
      const { stepper } = await renderTool(createToolCall({ args: { questions: singleQuestion }, status: 'complete', result: { answers } }));

      expect(stepper.status).toBe('sent');
      expect(stepper.shadowRoot!.querySelector('.record-answer')!.textContent).toBe('Trailing three months');
    });

    it('should record nothing for a completed call whose result holds no answers', async () => {
      const results = ['Tool askClarification executed successfully', undefined, { answers: 'nope' }];
      for (const result of results) {
        const { stepper } = await renderTool(createToolCall({ status: 'complete', result: result as ToolCall['result'] }));

        expect(stepper.status).toBe('sent');
        expect(stepper.answers).toEqual([]);
        expect(stepper.shadowRoot!.querySelector('.stepper')).toBeNull();
      }
    });

    it('should ignore a submit that arrives after the call has completed', async () => {
      const toolCall = createToolCall({ args: { questions: singleQuestion } });
      const request = waitForClarification({ toolCallId: toolCall.id, fallback: [] });
      const { el, stepper } = await renderTool(toolCall);

      el.toolCall = { ...toolCall, status: 'complete', result: { answers: [] } };
      await el.updateComplete;
      stepper.dispatchEvent(
        new CustomEvent('forge-ai-clarification-stepper-submit', {
          detail: { answers: [] },
          bubbles: true,
          composed: true
        })
      );
      await el.updateComplete;

      expect(await settled(request)).toBe('pending');
      expect(stepper.status).toBe('sent');
    });
  });

  describe('abandoning', () => {
    const fallback = [{ questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }];

    it('should abandon the question when the element leaves the page for good', async () => {
      const toolCall = createToolCall();
      const request = waitForClarification({ toolCallId: toolCall.id, fallback });
      const { el } = await renderTool(toolCall);

      el.remove();

      expect(await request).toEqual({ answers: fallback, dismissed: true });
    });

    it('should keep the question when the element is only moved', async () => {
      const toolCall = createToolCall();
      const request = waitForClarification({ toolCallId: toolCall.id, fallback });
      const { el } = await renderTool(toolCall);
      const parent = el.parentElement!;

      el.remove();
      parent.append(el);

      expect(await settled(request)).toBe('pending');
    });

    it('should keep the question when the host replaces the element with a fresh one for the same call', async () => {
      const toolCall = createToolCall();
      const request = waitForClarification({ toolCallId: toolCall.id, fallback });
      const { el } = await renderTool(toolCall);
      const replacement = document.createElement('forge-ai-tool-clarification-stepper');
      replacement.toolCall = toolCall;

      el.replaceWith(replacement);

      expect(await settled(request)).toBe('pending');
      replacement.remove();
      expect(await request).toEqual({ answers: fallback, dismissed: true });
    });

    it('should watch a call whose id arrives after the element connects', async () => {
      const toolCall = createToolCall();
      const request = waitForClarification({ toolCallId: toolCall.id, fallback });
      const el = await renderFixture<ClarificationStepperToolElement>(
        html`<forge-ai-tool-clarification-stepper></forge-ai-tool-clarification-stepper>`,
        'forge-ai-tool-clarification-stepper'
      );

      el.toolCall = toolCall;
      await el.updateComplete;
      el.remove();

      expect(await request).toEqual({ answers: fallback, dismissed: true });
    });
  });

  describe('updates', () => {
    it("should keep the same questions, and the person's selections, when the tool call updates without new arguments", async () => {
      const toolCall = createToolCall();
      const { el, stepper } = await renderTool(toolCall);
      const questions = stepper.questions;
      const radios = (): HTMLInputElement[] => Array.from(stepper.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="radio"]'));

      radios()[1].click();
      await stepper.updateComplete;
      expect(radios()[1].checked).toBe(true);

      // The host assigns a new tool call object on updates such as the status changing.
      el.toolCall = { ...toolCall, args: { questions: JSON.parse(JSON.stringify(validQuestions)) } };
      await el.updateComplete;
      await stepper.updateComplete;

      expect(stepper.questions).toBe(questions);
      expect(radios()[1].checked).toBe(true);
    });

    it('should show the new questions when the arguments change', async () => {
      const toolCall = createToolCall();
      const { el, stepper } = await renderTool(toolCall);
      const before = stepper.questions;

      el.toolCall = {
        ...toolCall,
        args: {
          questions: [{ id: 'other', question: 'Something new?', options: [{ label: 'Yes', recommended: true }] }]
        }
      };
      await el.updateComplete;
      await stepper.updateComplete;

      expect(stepper.questions).not.toBe(before);
      expect(stepper.questions.map(question => question.id)).toEqual(['other']);
    });

    it('should not rebuild the questions when an unrelated property changes', async () => {
      const { el, stepper } = await renderTool(createToolCall());
      const questions = stepper.questions;

      // The host also assigns `presentation` and `canvas`; any update that leaves `toolCall` alone must be a no-op.
      el.requestUpdate();
      await el.updateComplete;

      expect(stepper.questions).toBe(questions);
    });
  });
});
