import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { standaloneStoryParams, customElementStoryRenderer, generateCustomElementArgTypes, GLOBAL_THEME_OPTIONS } from '../../utils';
import { tylIconForgeLogo, tylIconOpenInNew } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/button';
import '@tylertech/forge/icon';
import '@tylertech/forge/circular-progress';

const component = 'forge-button';

const meta = {
  title: 'Components/Button',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['form', 'name', 'value'],
      controls: {
        variant: { control: { type: 'select' }, options: ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'] },
        theme: { control: { type: 'select' }, options: GLOBAL_THEME_OPTIONS }
      }
    }),
    text: { control: 'text' }
  },
  args: {
    text: 'Button',
    variant: 'text',
    pill: false,
    theme: 'primary',
    type: 'button',
    disabled: false,
    popoverIcon: false,
    dense: false,
    fullWidth: false
  }
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
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `;
  }
};

export const Anchor: Story = {
  parameters: {
    controls: { include: ['variant'] }
  },
  args: {
    variant: 'raised'
  },
  render: ({ variant }) => {
    IconRegistry.define(tylIconOpenInNew);
    return html`
      <forge-button .variant=${variant}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `;
  }
};

export const Themed: Story = {
  parameters: {
    controls: { include: ['variant'] }
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
    controls: { include: ['variant', 'iconSlot'] }
  },
  argTypes: {
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
    IconRegistry.define(tylIconForgeLogo);
    return html`
      <forge-button .variant=${variant}>
        <forge-icon slot=${iconSlot} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `;
  }
};

export const WithCircularProgress: Story = {
  parameters: {
    controls: { include: ['variant', 'theme', 'disabled'] }
  },
  args: {
    variant: 'raised'
  },
  render: ({ variant, theme, disabled }) => {
    return html`
      <forge-button .variant=${variant} .theme=${theme} ?disabled=${disabled}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: ['variant', 'dense', 'disabled', 'pill'] }
  },
  args: {
    variant: 'text',
    pill: false,
    dense: false,
    disabled: false
  },
  render: ({ variant, dense, pill, disabled }) => {
    const classes = classMap({
      'forge-button': true,
      'forge-button--outlined': variant === 'outlined',
      'forge-button--tonal': variant === 'tonal',
      'forge-button--filled': variant === 'filled',
      'forge-button--raised': variant === 'raised',
      'forge-button--link': variant === 'link',
      'forge-button--dense': dense,
      'forge-button--pill': pill
    });
    return html`<button class=${classes} ?disabled=${disabled}>Click me</button>`;
  }
};
