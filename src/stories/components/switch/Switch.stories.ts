import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/switch';

const component = 'forge-switch';

const meta = {
  title: 'Components/Switch',
  render: args => {
    var el = customElementStoryRenderer(component, args);
    el.textContent = 'off/on';
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['icon', 'form', 'labels', 'name'],
      controls: {
        labelPosition: {
          control: 'select',
          options: ['start', 'end']
        }
      }
    })
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
