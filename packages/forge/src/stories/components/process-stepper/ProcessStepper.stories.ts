import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/process-stepper';
import { html } from 'lit';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

const changeAction = action('forge-process-stepper-change');
const selectAction = action('forge-process-step-select');

const component = 'forge-process-stepper';

const meta = {
  title: 'Components/Process Stepper',
  tags: ['new'],
  render: args => {
    const stepper = document.createElement('forge-process-stepper');
    applyArgs(stepper, args);

    const steps = [
      { label: 'Application received', state: 'completed' },
      { label: 'Fees paid', state: 'completed' },
      { label: 'Internal review', state: 'current' },
      { label: 'Documents approved', state: 'not-started' },
      { label: 'Record issued', state: 'not-started' }
    ];

    steps.forEach(({ label, state }) => {
      const step = document.createElement('forge-process-step');
      step.label = label;
      step.state = state as (typeof step)['state'];
      stepper.appendChild(step);
    });

    return stepper;
  },
  component,
  subcomponents: {
    ['Process Step']: 'forge-process-step'
  },
  argTypes: {
    // steps, compact, and progress are read-only getters, so they get no control.
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['steps', 'compact', 'progress']
    })
  },
  // The API section adds an h4 for every table, which makes the contents list long enough to
  // scroll. Limiting it to h2 and h3 keeps one entry per documentation section and per component.
  parameters: {
    docs: {
      toc: {
        headingSelector: 'h2,h3'
      }
    }
  },
  args: {
    orientation: 'vertical',
    numbered: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Horizontal: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step label="1. Cart" state="completed"></forge-process-step>
      <forge-process-step label="2. Shipping" state="current"></forge-process-step>
      <forge-process-step label="3. Payment"></forge-process-step>
      <forge-process-step label="4. Review"></forge-process-step>
    </forge-process-stepper>
  `
};

export const States: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step label="First step" state="completed" description="Optional"></forge-process-step>
      <forge-process-step label="Second step" state="current"></forge-process-step>
      <forge-process-step label="Third step"></forge-process-step>
      <forge-process-step label="Fourth step" state="error" description="Example invalid step"></forge-process-step>
      <forge-process-step label="Fifth step"></forge-process-step>
    </forge-process-stepper>
  `
};

export const WithTitle: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" numbered>
      <span slot="title">Record progress</span>
      <forge-process-step label="Application received" state="completed">
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step label="Fees paid" state="completed"></forge-process-step>
      <forge-process-step label="Internal review" state="completed"></forge-process-step>
      <forge-process-step label="Documents approved"></forge-process-step>
      <forge-process-step label="Record issued"></forge-process-step>
    </forge-process-stepper>
  `
};

export const WithMeta: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper numbered>
      <forge-process-step label="Application received" state="completed">
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step label="Fees paid" state="completed"></forge-process-step>
      <forge-process-step label="Internal review" state="completed"></forge-process-step>
      <forge-process-step label="Documents approved"></forge-process-step>
      <forge-process-step label="Record issued"></forge-process-step>
    </forge-process-stepper>
  `
};

export const WithStepContent: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <span slot="title">Stage progress</span>
      <forge-process-step label="Verbal warning" state="completed">
        <span slot="meta">Started:</span>
        <span slot="meta">01/15/2026</span>
        <span slot="meta">Completed:</span>
        <span slot="meta">01/15/2026</span>
      </forge-process-step>
      <forge-process-step label="Suspension" state="current">
        <span slot="meta">Started:</span>
        <span slot="meta">02/03/2026</span>
        <forge-checkbox><label>Issue suspension notice</label></forge-checkbox>
        <forge-checkbox><label>Schedule meeting with union rep</label></forge-checkbox>
        <forge-checkbox><label>Document meeting notes</label></forge-checkbox>
        <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
      </forge-process-step>
      <forge-process-step label="Termination review"></forge-process-step>
    </forge-process-stepper>
  `
};

export const WithMessage: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <forge-process-step label="Submit documents" state="completed"></forge-process-step>
      <forge-process-step label="Plan review" state="error">
        <forge-inline-message slot="message" theme="error">Two required documents are missing.</forge-inline-message>
      </forge-process-step>
      <forge-process-step label="Permit issued"></forge-process-step>
    </forge-process-stepper>
  `
};

export const Clickable: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" @forge-process-stepper-change=${changeAction} @forge-process-step-select=${selectAction}>
      <forge-process-step label="Cart" state="completed" clickable></forge-process-step>
      <forge-process-step label="Shipping" state="current" clickable></forge-process-step>
      <forge-process-step label="Payment" clickable></forge-process-step>
      <forge-process-step label="Review" clickable></forge-process-step>
    </forge-process-stepper>
  `
};

export const Numbered: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step label="Application received" state="completed"></forge-process-step>
      <forge-process-step label="Internal review" state="current"></forge-process-step>
      <forge-process-step label="Documents approved"></forge-process-step>
      <forge-process-step label="Record issued"></forge-process-step>
    </forge-process-stepper>
  `
};

export const Compact: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="max-inline-size: 360px">
      <forge-process-stepper orientation="horizontal" numbered>
        <forge-process-step label="Cart" state="completed"></forge-process-step>
        <forge-process-step label="Shipping" state="completed"></forge-process-step>
        <forge-process-step label="Payment" state="current">
          <span slot="meta">Started:</span>
          <span slot="meta">02/03/2026</span>
          <forge-checkbox><label>Save this card</label></forge-checkbox>
          <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
        </forge-process-step>
        <forge-process-step label="Review"></forge-process-step>
      </forge-process-stepper>
    </div>
  `
};
