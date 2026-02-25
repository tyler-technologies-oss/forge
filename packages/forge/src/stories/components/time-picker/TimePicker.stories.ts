import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/text-field';
import '@tylertech/forge/time-picker';

const component = 'forge-time-picker';

const meta = {
  title: 'Components/Time Picker',
  render: args => html`
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
      .disabled=${args.disabled}>
      <forge-text-field>
        <input id="time-picker" type="text" />
        <label for="time-picker">Time</label>
      </forge-text-field>
    </forge-time-picker>
  `,
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: [
        'allowSeconds',
        'masked',
        'showMaskFormat',
        'use24HourTime',
        'allowInvalidTime',
        'step',
        'allowInput',
        'allowDropdown',
        'showNow',
        'showHourOptions',
        'disabled'
      ]
    })
  },
  args: {
    step: 30,
    allowDropdown: true,
    allowSeconds: false,
    masked: true,
    showHourOptions: true,
    allowInput: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
