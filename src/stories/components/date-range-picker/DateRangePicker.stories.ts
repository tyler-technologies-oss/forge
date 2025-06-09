import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/date-range-picker';

const component = 'forge-date-range-picker';

const meta = {
  title: 'Components/Date Range Picker',
  render: args => {
    const min = args.min ? new Date(args.min) : undefined;
    const max = args.max ? new Date(args.max) : undefined;

    return html`
      <forge-date-range-picker
        .min=${min}
        .max=${max}
        .disabled=${args.disabled}
        .masked=${args.masked}
        .showMaskFormat=${args.showMaskFormat}
        .allowInvalidDate=${args.allowInvalidDate}
        .showToday=${args.showToday}
        .showClear=${args.showClear}
        .disabledDaysOfWeek=${args.disabledDaysOfWeek}
        .locale=${args.locale}
        style="width: 263px">
        <forge-text-field>
          <label for="input-date-range-picker-01">Date</label>
          <input type="text" id="input-date-range-picker-01" autocomplete="off" placeholder="mm/dd/yyyy" />
          <input type="text" id="input-date-range-picker-02" autocomplete="off" placeholder="mm/dd/yyyy" />
        </forge-text-field>
      </forge-date-range-picker>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: ['min', 'max', 'disabled', 'masked', 'showMaskFormat', 'allowInvalidDate', 'showToday', 'showClear', 'disabledDaysOfWeek'],
      controls: {
        from: {
          control: 'date'
        },
        min: {
          control: 'date'
        },
        max: {
          control: 'date'
        },
        disabledDaysOfWeek: {
          control: {
            type: 'multi-select',
            labels: { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
          },
          options: [0, 1, 2, 3, 4, 5, 6]
        }
      }
    })
  },
  args: {
    maskFormat: '0`0{/}`0`0{/}`0`0`0`0',
    disabled: false,
    showClear: true,
    showToday: true,
    showMaskFormat: true,
    allowInvalidDate: false,
    disabledDaysOfWeek: [0, 6],
    masked: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
