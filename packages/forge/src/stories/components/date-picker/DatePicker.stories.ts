import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/date-picker';

const component = 'forge-date-picker';

const changeAction = (evt: CustomEvent): void => action('forge-date-picker-change')(evt.detail);
const openAction = (evt: CustomEvent): void => action('forge-date-picker-open')(evt.detail);
const closeAction = (evt: CustomEvent): void => action('forge-date-picker-close')(evt.detail);
const inputAction = (evt: CustomEvent): void => action('forge-date-picker-input')(evt.detail);

const meta = {
  title: 'Components/Date Picker',
  render: args => html`
    <forge-date-picker
      .allowInvalidDate=${args.allowInvalidDate}
      ?disabled=${args.disabled}
      .disabledDaysOfWeek=${args.disabledDaysOfWeek}
      .locale=${args.locale}
      .masked=${args.masked}
      .max=${args.max}
      .min=${args.min}
      .open=${args.open}
      .showClear=${args.showClear}
      .showMaskFormat=${args.showMaskFormat}
      .showToday=${args.showToday}
      .yearRange=${args.yearRange}
      .dateFormat=${args.dateFormat}
      @forge-date-picker-change=${changeAction}
      @forge-date-picker-open=${openAction}
      @forge-date-picker-close=${closeAction}
      @forge-date-picker-input=${inputAction}>
      <forge-text-field>
        <label for="date-picker">Date</label>
        <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="" />
      </forge-text-field>
    </forge-date-picker>
  `,
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: [
        'disableDayCallback',
        'prepareMaskCallback',
        'formatCallback',
        'parseCallback',
        'maskFormat',
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
        },
        dateFormat: {
          control: {
            type: 'select'
          },
          options: ['MM/DD/YYYY', 'MM/DD/YY', 'DD/MMM/YYYY', 'MM-DD-YYYY', 'MM-DD-YY', 'DD-MMM-YYYY', 'YYYY-MM-DD', 'YYYY-MMM-DD', 'DD.MM.YYYY', 'DD.MM.YY']
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
    dateFormat: 'MM/DD/YYYY',
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

export const DateFormats: Story = {
  parameters: {
    controls: {
      include: ['dateFormat']
    }
  },
  render: args => html`
    <forge-date-picker date-format=${args.dateFormat} @forge-date-picker-change=${changeAction}>
      <forge-text-field>
        <label for="date-picker-date-formats">${args.dateFormat}</label>
        <input type="text" id="date-picker-date-formats" autocomplete="off" />
      </forge-text-field>
    </forge-date-picker>
  `
};

export const CustomFormat: Story = {
  ...standaloneStoryParams,
  render: () => {
    function parseCallback(str: string): Date | null {
      if (!str) {
        return null;
      }

      // Regular expression to match "Mmm DD, YYYY" (e.g., "Jul 08, 2025")
      const regex = /(\w{3}) (\d{2}), (\d{4})/;
      const match = str.match(regex);

      if (!match || match.length !== 4) {
        return null;
      }

      const monthStr = match[1];
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      // Map month abbreviations to month numbers (0-indexed)
      const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
      };
      const month = monthMap[monthStr];

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
      }

      const date = new Date(year, month, day);

      // Validate the date to prevent issues with invalid dates (e.g., Feb 30)
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
      }

      return date;
    }

    function formatCallback(date: Date | null): string {
      if (!date) {
        return '';
      }

      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return html`
      <forge-date-picker
        .parseCallback=${parseCallback}
        .formatCallback=${formatCallback}
        mask-format="Mmm DD, YYYY"
        shortcuts="off"
        @forge-date-picker-change=${changeAction}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="Mmm DD, YYYY" />
          <span slot="support-text">Enter a date in the format Mmm DD, YYYY (e.g., Jul 08, 2025)</span>
        </forge-text-field>
      </forge-date-picker>
    `;
  }
};
