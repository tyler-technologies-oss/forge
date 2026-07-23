import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/date-time-field';
import '@tylertech/forge/date-time-picker';

const component = 'forge-date-time-field';

const changeAction = (evt: CustomEvent): void => action('forge-date-time-field-change')(evt.detail);
const openAction = (evt: CustomEvent): void => action('forge-date-time-field-open')(evt.detail);
const closeAction = (evt: CustomEvent): void => action('forge-date-time-field-close')(evt.detail);

const meta = {
  title: 'Components/Date Time Field',
  render: args => html`
    <div style="width: 480px; max-width: 100%;">
      <forge-date-time-field
        picker="dtf-demo-picker"
        .dateMode=${args.dateMode}
        .timeMode=${args.timeMode}
        .valueMode=${args.valueMode}
        .label=${args.label}
        .placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        .requiredParts=${args.requiredParts}
        ?persistent=${args.persistent}
        .locale=${args.locale}
        .use24HourTime=${args.use24HourTime}
        .allowSeconds=${args.allowSeconds}
        .popoverPlacement=${args.popoverPlacement}
        @forge-date-time-field-change=${changeAction}
        @forge-date-time-field-open=${openAction}
        @forge-date-time-field-close=${closeAction}>
        <span slot="support-text">Pick when your appointment should start.</span>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker
      id="dtf-demo-picker"
      .dateMode=${args.dateMode}
      .timeMode=${args.timeMode}
      .valueMode=${args.valueMode}
      .locale=${args.locale}
      .use24HourTime=${args.use24HourTime}
      .allowSeconds=${args.allowSeconds}>
    </forge-date-time-picker>
  `,
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: [
        'dateMode',
        'timeMode',
        'valueMode',
        'label',
        'placeholder',
        'disabled',
        'readonly',
        'required',
        'requiredParts',
        'persistent',
        'locale',
        'use24HourTime',
        'allowSeconds',
        'popoverPlacement'
      ],
      controls: {
        dateMode: {
          control: { type: 'select' },
          options: ['single', 'range']
        },
        timeMode: {
          control: { type: 'select' },
          options: ['single', 'range', 'slots']
        },
        valueMode: {
          control: { type: 'select' },
          options: ['temporal', 'iso', 'date']
        },
        requiredParts: {
          control: { type: 'select' },
          options: ['both', 'date', 'time']
        }
      }
    })
  },
  args: {
    dateMode: 'single',
    timeMode: 'single',
    valueMode: 'temporal',
    label: 'Appointment',
    placeholder: 'Select date and time',
    disabled: false,
    readonly: false,
    required: false,
    requiredParts: 'both',
    persistent: false,
    locale: 'en-US',
    use24HourTime: false,
    allowSeconds: false,
    popoverPlacement: 'bottom-start'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const DateRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 360px; max-width: 100%;">
      <forge-date-time-field picker="dtf-date-range-picker" date-mode="range" time-mode="range" label="Conference dates" placeholder="mm/dd/yyyy">
        <span slot="support-text">Choose the start and end date and time.</span>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-date-range-picker" date-mode="range" time-mode="range"></forge-date-time-picker>
  `
};

export const TimeRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <forge-date-time-field picker="dtf-time-range-picker" time-mode="range" label="Meeting" placeholder="Select date and time range">
        <span slot="support-text">Pick a date and a start/end time.</span>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-time-range-picker" time-mode="range"></forge-date-time-picker>
  `
};

export const Standalone: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 280px; max-width: 100%;">
      <forge-date-time-field label="Date and time" placeholder="Type a date and time">
        <span slot="support-text">No picker linked — type directly into the masked inputs.</span>
      </forge-date-time-field>
    </div>
  `
};
