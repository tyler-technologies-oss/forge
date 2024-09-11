import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/date-picker';

const component = 'forge-date-picker';

const changeAction = action('forge-date-picker-change');
const openAction = action('forge-date-picker-open');
const closeAction = action('forge-date-picker-close');
const inputAction = action('forge-date-picker-input');

const meta = {
  title: 'Components/Date Picker',
  render: args => {
    return html`
      <forge-date-picker
        .allowInvalidDate=${args.allowInvalidDate}
        ?disabled=${args.disabled}
        .disabledDaysOfWeek=${args.disabledDaysOfWeek}
        .locale=${args.locale}
        .masked=${args.masked}
        .maskedFormat=${args.maskedFormat}
        .max=${args.max}
        .min=${args.min}
        .open=${args.open}
        .showClear=${args.showClear}
        .showMaskFormat=${args.showMaskFormat}
        .showToday=${args.showToday}
        .yearRange=${args.yearRange}
        @forge-date-picker-change=${changeAction}
        @forge-date-picker-open=${openAction}
        @forge-date-picker-close=${closeAction}
        @forge-date-picker-input=${inputAction}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="" />
        </forge-text-field>
      </forge-date-picker>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: [
        'disableDayCallback',
        'prepareMaskCallback',
        'formatCallback',
        'parseCallback',
        'popupClasses',
        'disabledDates',
        'value',
        'valueMode',
        'notifyInputValueChanges'
      ],
      controls: {
        disabledDaysOfWeek: {
          control: {
            type: 'multi-select',
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          options: [0, 1, 2, 3, 4, 5, 6]
        }
      }
    })
  },
  args: {
    allowInvalidDate: false,
    disabled: false,
    disabledDaysOfWeek: [],
    locale: 'en-US',
    masked: true,
    maskFormat: 'MM/DD/YYYY',
    max: '',
    min: '',
    open: false,
    showClear: false,
    showMaskFormat: false,
    showToday: false,
    yearRange: '-50:+50'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CustomFormat: Story = {
  ...standaloneStoryParams,
  render: () => {
    function parseCallback(str: string): Date | null {
      if (!str) {
        return null;
      }

      const split = str.split('-');

      if (split.length !== 3) {
        return null;
      }

      const yyyy = +split[0];
      const mm = +split[1];
      const dd = split[2].indexOf('T') ? +split[2].split('T')[0] : +split[2];

      if (!yyyy || isNaN(yyyy) || !mm || isNaN(mm) || !dd || isNaN(dd)) {
        return null;
      }

      return new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    }

    function formatCallback(date: Date): string | null {
      return date ? date.toISOString().split('T')[0] : null;
    }

    return html`
      <forge-date-picker .parseCallback=${parseCallback} .formatCallback=${formatCallback} mask-format="YYYY-MM-DD">
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="YYYY-MM-DD" />
          <span slot="support-text">Enter a date in the format YYYY-MM-DD</span>
        </forge-text-field>
      </forge-date-picker>
    `;
  }
};
