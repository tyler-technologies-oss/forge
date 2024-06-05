import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/color-picker';

const component = 'forge-color-picker';

const changeAction = action('forge-color-picker-change');

const meta = {
  title: 'Components/Color Picker',
  render: args => {
    return html`
      <forge-color-picker
        .value=${args.value}
        .allowOpacity=${args.allowOpacity}
        .opacity=${args.opacity}
        @forge-color-picker-change=${changeAction}></forge-color-picker>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['rgba', 'hsva'],
      controls: {
        opacity: { control: 'number', min: 0, max: 1, step: 0.01 }
      }
    }),
  },
  args: {
    value: '#000000',
    opacity: 1,
    allowOpacity: false,
    debounceChangeEvent: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
