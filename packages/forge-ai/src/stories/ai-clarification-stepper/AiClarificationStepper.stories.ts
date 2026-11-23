import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-clarification-stepper';
import type { AiClarificationAnswer, AiClarificationQuestion } from '@tylertech/forge-ai/ai-clarification-stepper';

const component = 'forge-ai-clarification-stepper';

const storyStyles = html`<style>
  .story-container {
    max-inline-size: 520px;
  }
  .story-container--narrow {
    max-inline-size: 360px;
  }
</style>`;

const meta = {
  title: 'Components/Tools & Reasoning/Clarification Stepper',
  component,
  argTypes: {
    questions: {
      control: 'object',
      description: 'The questions to step through, one per step'
    },
    answers: {
      control: 'object',
      description: 'The submitted answers, shown against their questions once the status is `sent`'
    },
    status: {
      control: 'select',
      options: ['editing', 'sending', 'sent'],
      description: 'Where the stepper is: editable, locked while the answers are delivered, or a read-only record'
    }
  },
  args: { status: 'editing' }
} satisfies Meta;

const questions: AiClarificationQuestion[] = [
  {
    id: 'status-field',
    question: 'Which date should "cleared by arrest" be measured from?',
    options: [
      { label: 'Report date', value: 'report_date' },
      { label: 'Status date', value: 'status_date_time', recommended: true },
      { label: 'Offense date', value: 'offense_date' }
    ]
  },
  {
    id: 'time-window',
    question: 'What should "last quarter" mean?',
    options: [
      { label: 'Previous calendar quarter', value: 'calendar_quarter', recommended: true },
      { label: 'Trailing three months', value: 'trailing_3_months' }
    ],
    allowCustom: false
  },
  {
    id: 'grouping',
    question: 'How should results be grouped?',
    options: [
      { label: 'Beat', value: 'beat', recommended: true },
      { label: 'District', value: 'district' },
      { label: 'Neighborhood', value: 'neighborhood' }
    ]
  }
];

const singleQuestion: AiClarificationQuestion[] = [questions[0]];

const sentAnswers: AiClarificationAnswer[] = [
  { questionId: 'status-field', value: 'status_date_time', label: 'Status date', custom: false },
  { questionId: 'time-window', value: 'trailing_3_months', label: 'Trailing three months', custom: false },
  { questionId: 'grouping', value: 'Precinct', label: 'Precinct', custom: true }
];

export default meta;

type Story = StoryObj;

const onSubmit = action('forge-ai-clarification-stepper-submit');

/**
 * Every question carries a recommended option that is preselected. The "Something else" row is an editable
 * text field, and "Next" stays disabled until a typed answer has text.
 */
export const Demo: Story = {
  render: ({ questions: args, answers, status }) => html`
    ${storyStyles}
    <div class="story-container">
      <forge-ai-clarification-stepper
        .questions=${args ?? questions}
        .answers=${answers ?? []}
        .status=${status}
        @forge-ai-clarification-stepper-submit=${(evt: CustomEvent) => onSubmit(evt.detail)}></forge-ai-clarification-stepper>
    </div>
  `,
  args: { questions }
};

/**
 * Once the answers are submitted the host sets `status` to `sending`. Every control is disabled while they are
 * delivered, and the person's choices stay where they were.
 */
export const Sending: Story = {
  render: () => html`
    ${storyStyles}
    <div class="story-container">
      <forge-ai-clarification-stepper .questions=${questions} status="sending"></forge-ai-clarification-stepper>
    </div>
  `
};

/**
 * Once delivered, the stepper is terminal: a read-only record of the turn, each submitted answer under the question it
 * answers. It is not a form to revisit.
 */
export const Sent: Story = {
  render: () => html`
    ${storyStyles}
    <div class="story-container">
      <forge-ai-clarification-stepper .questions=${questions} .answers=${sentAnswers} status="sent"></forge-ai-clarification-stepper>
    </div>
  `
};

/** A single question is a one-step stepper, so its forward action is "Run" straight away. */
export const SingleQuestion: Story = {
  render: () => html`
    ${storyStyles}
    <div class="story-container">
      <forge-ai-clarification-stepper
        .questions=${singleQuestion}
        @forge-ai-clarification-stepper-submit=${(evt: CustomEvent) => onSubmit(evt.detail)}></forge-ai-clarification-stepper>
    </div>
  `
};

/**
 * A question with `allowCustom: false` is genuinely closed, so it offers only its own options. The
 * second step of this stepper is one.
 */
export const ClosedQuestion: Story = {
  render: () => html`
    ${storyStyles}
    <div class="story-container">
      <forge-ai-clarification-stepper
        .questions=${questions.slice(1)}
        @forge-ai-clarification-stepper-submit=${(evt: CustomEvent) => onSubmit(evt.detail)}></forge-ai-clarification-stepper>
    </div>
  `
};

/** The component fills its container, so it holds up in a narrow chat column. */
export const Narrow: Story = {
  render: () => html`
    ${storyStyles}
    <div class="story-container story-container--narrow">
      <forge-ai-clarification-stepper
        .questions=${questions}
        @forge-ai-clarification-stepper-submit=${(evt: CustomEvent) => onSubmit(evt.detail)}></forge-ai-clarification-stepper>
    </div>
  `
};
