import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { applyArgs, generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/key';

const component = 'forge-key';

const items: { label: string; value: string; color: string }[] = [
  { label: 'Black Guillemot', value: '25%', color: 'salmon' },
  { label: 'Great Shearwater', value: '50%', color: 'var(--forge-theme-success)' },
  { label: 'Mealy Redpoll', value: '75%', color: '#abcdef' }
];

const meta = {
  title: 'Components/Key',
  render: args => {
    const key = document.createElement('forge-key');
    applyArgs(key, args);
    items.forEach(item => {
      const el = document.createElement('forge-key-item');
      el.inline = args.inline;
      el.style.setProperty('--forge-key-item-icon-color', item.color);

      const label = document.createElement('span');
      label.textContent = item.label;

      const value = document.createElement('span');
      value.textContent = item.value;
      value.slot = 'value';

      el.appendChild(label);
      el.appendChild(value);
      key.appendChild(el);
    });
    return key;
  },
  component,
  subcomponents: {
    ['Key Item']: 'forge-key-item'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: 'forge-key-item',
      exclude: ['--forge-key-item-icon-color']
    }),
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {
    inline: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
