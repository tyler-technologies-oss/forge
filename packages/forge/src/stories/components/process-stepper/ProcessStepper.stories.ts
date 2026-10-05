import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import '@tylertech/forge/avatar';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/process-stepper';
import '@tylertech/forge/label-value';
import { html } from 'lit';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

const changeAction = action('change');
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
      step.textContent = label;
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
    // steps, selectedStep, compact, and progress are read-only getters, so they get no control.
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['steps', 'selectedStep', 'compact', 'progress']
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
    numbered: false,
    readonly: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Horizontal: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  `
};

export const States: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <forge-process-step state="current">Current</forge-process-step>
      <forge-process-step state="completed"> Completed </forge-process-step>
      <forge-process-step state="in-progress">In progress</forge-process-step>
      <forge-process-step state="not-started"
        >Not started
        <span slot="support-text">Optional</span>
      </forge-process-step>
      <forge-process-step state="critical">
        Critical
        <span slot="support-text">Error</span>
      </forge-process-step>
    </forge-process-stepper>
  `
};

export const Disabled: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step disabled>Payment</forge-process-step>
      <forge-process-step disabled>Review</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithTitle: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" aria-labelledby="record-progress-title">
      <forge-process-step state="completed"> Application received </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithDetails: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <forge-process-step state="completed">
        Application received
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received</span>
          <span slot="value">Jul 17, 2026</span>
        </forge-label-value>
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received by</span>
          <span slot="value">J. Rivera</span>
        </forge-label-value>
      </forge-process-step>
      <forge-process-step state="completed">
        Fees paid
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask one</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask two</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask three</forge-checkbox>
      </forge-process-step>
      <forge-process-step state="completed">
        Internal review
        <forge-button slot="detail" variant="outlined">Review</forge-button>
      </forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `
};

export const Readonly: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" readonly>
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step>Payment</forge-process-step>
      <forge-process-step>Review</forge-process-step>
    </forge-process-stepper>
  `
};

export const Numbered: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `
};
