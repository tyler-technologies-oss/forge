import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/time-picker';
import '@tylertech/forge/text-field';

const component = 'forge-time-picker';

const meta = {
  title: 'Components/Time Picker',
  render: args => {
    return html`
      <forge-time-picker 
        .allowSeconds=${args.allowSeconds}
        .masked=${args.masked}
        .showMaskFormat=${args.showMaskFormat}
        .use24HourTime=${args.use24HourTime}
        .allowInvalidTime=${args.allowInvalidTime}
        .step=${args.step}
        .allowInput=${args.allowInput}
        .allowDropdown=${args.allowDropdown}
        .showNow=${args.showNow}
        .showHourOptions=${args.showHourOptions}
        .disabled=${args.disabled}
      >
        <forge-text-field>
          <input id="time-picker" type="text"  />
          <label for="time-picker">Time</label>
        </forge-text-field>
      </forge-time-picker>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: ['allowSeconds', 'masked', 'showMaskFormat', 'use24HourTime', 'allowInvalidTime', 'step', 'allowInput', 'allowDropdown', 'showNow', 'showHourOptions', 'disabled'],
    }),
  },
  args: {
    step: 30,
    allowDropdown: true,
    allowSeconds: false,
    masked: true,
    showHourOptions: true,
    allowInput: true
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
