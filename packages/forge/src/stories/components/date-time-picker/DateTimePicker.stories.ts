import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/date-time-picker';
import '@tylertech/forge/button';

const component = 'forge-date-time-picker';

const changeAction = (evt: CustomEvent): void => action('forge-date-time-picker-change')(evt.detail);
const openAction = (evt: CustomEvent): void => action('forge-date-time-picker-open')(evt.detail);
const closeAction = (evt: CustomEvent): void => action('forge-date-time-picker-close')(evt.detail);

const meta = {
  title: 'Components/Date Time Picker',
  render: args => html`
    <forge-date-time-picker
      .timeMode=${args.timeMode}
      .dateMode=${args.dateMode}
      .valueMode=${args.valueMode}
      .orientation=${args.orientation}
      .autoCommit=${args.autoCommit}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      .locale=${args.locale}
      .use24HourTime=${args.use24HourTime}
      .allowSeconds=${args.allowSeconds}
      .minTime=${args.minTime}
      .maxTime=${args.maxTime}
      .step=${args.step}
      .clearButton=${args.clearButton}
      .todayButton=${args.todayButton}
      .showHeader=${args.showHeader}
      .summary=${args.summary}
      .presets=${args.presets}
      @forge-date-time-picker-change=${changeAction}
      @forge-date-time-picker-open=${openAction}
      @forge-date-time-picker-close=${closeAction}>
    </forge-date-time-picker>
  `,
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: [
        'timeMode',
        'dateMode',
        'valueMode',
        'orientation',
        'autoCommit',
        'disabled',
        'readonly',
        'required',
        'locale',
        'use24HourTime',
        'allowSeconds',
        'minTime',
        'maxTime',
        'step',
        'clearButton',
        'todayButton',
        'showHeader',
        'summary',
        'presets'
      ],
      controls: {
        timeMode: {
          control: { type: 'select' },
          options: ['single', 'range', 'slots']
        },
        dateMode: {
          control: { type: 'select' },
          options: ['single', 'range']
        },
        valueMode: {
          control: { type: 'select' },
          options: ['temporal', 'iso', 'date']
        },
        orientation: {
          control: { type: 'select' },
          options: ['auto', 'horizontal', 'vertical']
        }
      }
    })
  },
  args: {
    timeMode: 'single',
    dateMode: 'single',
    valueMode: 'temporal',
    orientation: 'auto',
    autoCommit: false,
    disabled: false,
    readonly: false,
    required: false,
    locale: 'en-US',
    use24HourTime: false,
    allowSeconds: false,
    minTime: '09:00',
    maxTime: '17:00',
    step: 15,
    clearButton: false,
    todayButton: false,
    showHeader: true,
    summary: false,
    presets: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const TimeSlots: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-date-time-picker time-mode="slots" min-time="09:00" max-time="17:00" .step=${30} show-footer @forge-date-time-picker-change=${changeAction}>
      <span slot="time-label">Available times</span>
      <forge-button slot="footer-end" variant="raised">Continue</forge-button>
    </forge-date-time-picker>
  `
};

export const TimeRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-date-time-picker time-mode="range" from-label="Start time" to-label="End time" @forge-date-time-picker-change=${changeAction}>
    </forge-date-time-picker>
  `
};

export const DateRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-date-time-picker date-mode="range" time-mode="range" presets @forge-date-time-picker-change=${changeAction}> </forge-date-time-picker>
  `
};

export const Summary: Story = {
  ...standaloneStoryParams,
  render: () => html` <forge-date-time-picker summary time-mode="single" @forge-date-time-picker-change=${changeAction}> </forge-date-time-picker> `
};

export const Vertical: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-date-time-picker orientation="vertical" time-mode="single" @forge-date-time-picker-change=${changeAction}> </forge-date-time-picker>
  `
};
