import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/date-time-field';
import '@tylertech/forge/date-time-picker';
import '@tylertech/forge/text-field';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

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
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        .requiredParts=${args.requiredParts}
        ?persistent=${args.persistent}
        .locale=${args.locale}
        .use24HourTime=${args.use24HourTime}
        .allowSeconds=${args.allowSeconds}
        ?show-duration=${args.showDuration}
        .popoverPlacement=${args.popoverPlacement}
        @forge-date-time-field-change=${changeAction}
        @forge-date-time-field-open=${openAction}
        @forge-date-time-field-close=${closeAction}>
        <forge-text-field .labelPosition=${args.labelPosition} .variant=${args.variant} .density=${args.density}>
          <label slot="label">${args.label}</label>
          <input type="text" placeholder=${ifDefined(args.placeholder || undefined)} />
          ${args.timeMode !== 'slots' && (args.dateMode === 'range' || args.timeMode === 'range') ? html`<input type="text" />` : nothing}
          <span slot="support-text">Pick when your appointment should start.</span>
        </forge-text-field>
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
        'disabled',
        'readonly',
        'required',
        'requiredParts',
        'persistent',
        'locale',
        'use24HourTime',
        'allowSeconds',
        'showDuration',
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
    }),
    label: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    labelPosition: { control: 'select', options: ['inline-start', 'inline-end', 'block-start', 'inset', 'none'] },
    variant: { control: 'select', options: ['plain', 'outlined', 'tonal', 'filled', 'raised'] },
    density: { control: 'select', options: ['default', 'extra-small', 'small', 'medium', 'large', 'extra-large'] }
  },
  args: {
    dateMode: 'single',
    timeMode: 'single',
    valueMode: 'temporal',
    disabled: false,
    readonly: false,
    required: false,
    requiredParts: 'both',
    persistent: false,
    locale: 'en-US',
    use24HourTime: false,
    allowSeconds: false,
    showDuration: true,
    popoverPlacement: 'bottom-start',
    label: 'Appointment',
    placeholder: '',
    labelPosition: 'inset',
    variant: 'outlined',
    density: 'default'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const DateAndTimeRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <forge-date-time-field picker="dtf-date-time-range-picker" date-mode="range" time-mode="range" name="conference">
        <forge-text-field>
          <label slot="label">Conference dates</label>
          <input type="text" />
          <input type="text" />
          <span slot="support-text">Choose the start and end date and time.</span>
        </forge-text-field>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-date-time-range-picker" date-mode="range" time-mode="range"></forge-date-time-picker>
  `
};

export const TimeRange: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <forge-date-time-field picker="dtf-time-range-picker" time-mode="range" name="meeting">
        <forge-text-field>
          <label slot="label">Meeting</label>
          <input type="text" />
          <input type="text" />
          <span slot="support-text">Pick a date and a start/end time.</span>
        </forge-text-field>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-time-range-picker" time-mode="range"></forge-date-time-picker>
  `
};

export const DateRangeSharedTime: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <forge-date-time-field picker="dtf-date-range-shared-time-picker" date-mode="range" name="stay">
        <forge-text-field>
          <label slot="label">Date range, shared time</label>
          <input type="text" />
          <input type="text" />
          <span slot="support-text">The end date shares the start time.</span>
        </forge-text-field>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-date-range-shared-time-picker" date-mode="range"></forge-date-time-picker>
  `
};

export const Slots: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 320px; max-width: 100%;">
      <forge-date-time-field picker="dtf-slots-picker" time-mode="slots" name="booking">
        <forge-text-field>
          <label slot="label">Appointment slot</label>
          <input type="text" />
          <span slot="support-text">Pick from the available time slots.</span>
        </forge-text-field>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-slots-picker" time-mode="slots"></forge-date-time-picker>
  `
};

export const Standalone: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 280px; max-width: 100%;">
      <forge-date-time-field name="standalone">
        <forge-text-field>
          <label slot="label">Date and time</label>
          <input type="text" />
          <span slot="support-text">No picker linked — type directly into the masked input.</span>
        </forge-text-field>
      </forge-date-time-field>
    </div>
  `
};

export const ConsumerToggleAndSeparator: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <forge-date-time-field picker="dtf-consumer-toggle-picker" date-mode="range" name="trip">
        <forge-text-field>
          <label slot="label">Trip dates</label>
          <input type="text" />
          <span data-forge-multi-input-separator aria-hidden="true">to</span>
          <input type="text" />
          <span slot="support-text">The toggle icon and separator above are authored by the consumer, not created by the field.</span>
          <forge-icon-button slot="end" aria-label="Toggle date and time picker">
            <forge-icon name="insert_invitation"></forge-icon>
          </forge-icon-button>
        </forge-text-field>
      </forge-date-time-field>
    </div>
    <forge-date-time-picker id="dtf-consumer-toggle-picker" date-mode="range"></forge-date-time-picker>
  `
};
