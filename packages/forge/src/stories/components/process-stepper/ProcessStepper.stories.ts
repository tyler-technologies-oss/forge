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
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed" description="Optional">First step</forge-process-step>
      <forge-process-step state="current">Second step</forge-process-step>
      <forge-process-step>Third step</forge-process-step>
      <forge-process-step state="error" description="Example invalid step">Fourth step</forge-process-step>
      <forge-process-step>Fifth step</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithTitle: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" numbered>
      <span slot="title">Record progress</span>
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithMeta: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper numbered>
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithStepContent: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <span slot="title">Stage progress</span>
      <forge-process-step state="completed">
        Verbal warning
        <span slot="meta">Started:</span>
        <span slot="meta">01/15/2026</span>
        <span slot="meta">Completed:</span>
        <span slot="meta">01/15/2026</span>
      </forge-process-step>
      <forge-process-step state="current">
        Suspension
        <span slot="meta">Started:</span>
        <span slot="meta">02/03/2026</span>
        <forge-checkbox slot="additional-content"><label>Issue suspension notice</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Schedule meeting with union rep</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Document meeting notes</label></forge-checkbox>
        <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
      </forge-process-step>
      <forge-process-step>Termination review</forge-process-step>
    </forge-process-stepper>
  `
};

export const WithMessage: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper>
      <forge-process-step state="completed">Submit documents</forge-process-step>
      <forge-process-step state="error">
        Plan review
        <forge-inline-message slot="message" theme="error">Two required documents are missing.</forge-inline-message>
      </forge-process-step>
      <forge-process-step>Permit issued</forge-process-step>
    </forge-process-stepper>
  `
};

export const Interactive: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-process-stepper orientation="horizontal" @forge-process-stepper-change=${changeAction} @forge-process-step-select=${selectAction}>
      <forge-process-step state="completed"><button>Cart</button></forge-process-step>
      <forge-process-step state="current"><button>Shipping</button></forge-process-step>
      <forge-process-step><button>Payment</button></forge-process-step>
      <forge-process-step><button>Review</button></forge-process-step>
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

export const Compact: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="max-inline-size: 360px">
      <forge-process-stepper orientation="horizontal" numbered>
        <forge-process-step state="completed">Cart</forge-process-step>
        <forge-process-step state="completed">Shipping</forge-process-step>
        <forge-process-step state="current">
          Payment
          <span slot="meta">Started:</span>
          <span slot="meta">02/03/2026</span>
          <forge-checkbox slot="additional-content"><label>Save this card</label></forge-checkbox>
          <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
        </forge-process-step>
        <forge-process-step>Review</forge-process-step>
      </forge-process-stepper>
    </div>
  `
};
