import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/circular-progress';

const component = 'forge-circular-progress';

const meta = {
  title: 'Components/Circular Progress',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.setAttribute('aria-label', 'Circular Progress');
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        theme: { control: 'select', options: GLOBAL_THEME_OPTIONS },
        track: { if: { arg: 'determinate', eq: false } }
      }
    })
  },
  args: {
    determinate: false,
    progress: 0,
    theme: 'primary',
    track: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
