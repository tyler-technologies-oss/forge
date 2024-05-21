import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { standaloneStoryParams, transformCssPropsToControls, customElementStoryRenderer } from '../utils';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/button';
import '@tylertech/forge/icon';

const component = 'forge-button';

const meta = {
  title: 'Components/Button',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.innerHTML = args.text;
    return el;
  },
  component,
  parameters: {
    controls: {
      exclude: /^(start|end|click|root|focus-indicator|state-layer)$/i
    },
  },
  argTypes: {
    ...transformCssPropsToControls(component),
    text: { control: 'text' },
  },
  args: {
    text: 'Button'
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Variants: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `;
  }
};

export const Themed: Story = {
  parameters: {
    controls: { include: ['variant'] },
  },
  argTypes: {
    variant: {
      options: ['text', 'outlined', 'filled', 'raised', 'link'],
      control: { type: 'select' }
    },
  },
  args: {
    variant: 'raised'
  },
  render: ({ variant }) => {
    return html`
      <forge-button variant=${variant}>Primary</forge-button>
      <forge-button variant=${variant} theme="secondary">Secondary</forge-button>
      <forge-button variant=${variant} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${variant} theme="success">Success</forge-button>
      <forge-button variant=${variant} theme="warning">Warning</forge-button>
      <forge-button variant=${variant} theme="error">Error</forge-button>
      <forge-button variant=${variant} theme="info">Info</forge-button>
    `;
  }
};

export const WithIcon: Story = {
  parameters: {
    controls: { include: ['variant', 'iconSlot'] },
  },
  argTypes: {
    variant: {
      options: ['text', 'outlined', 'filled', 'raised', 'link'],
      control: { type: 'select' }
    },
    iconSlot: {
      options: ['start', 'end'],
      control: { type: 'select' }
    }
  },
  args: {
    variant: 'raised',
    iconSlot: 'start'
  },
  render: ({ variant, iconSlot }) => {
    IconRegistry.define(tylIconPerson);
    return html`
      <forge-button variant=${variant}>
        <forge-icon slot=${iconSlot} name="person"></forge-icon>
        My Account
      </forge-button>
    `;
  }
};
