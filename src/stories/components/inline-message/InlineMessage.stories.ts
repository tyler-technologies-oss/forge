import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconInfo } from '@tylertech/tyler-icons/standard';

import '@tylertech/forge/inline-message';
import '@tylertech/forge/icon';

const component = 'forge-inline-message';

IconRegistry.define(tylIconInfo);

const meta = {
  title: 'Components/Inline Message',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: { theme: { control: { type: 'select' }, options: GLOBAL_THEME_OPTIONS } }
    })
  },
  args: {
    text: 'Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithTitle: Story = {
  ...standaloneStoryParams,
  render: ({ text }) => {
    return html`
      <forge-inline-message>
        <span slot="title">Lorem Ipsum</span>
        <p>${text}</p>
      </forge-inline-message>
    `;
  }
};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div style="display: flex; gap: 16px; flex-direction: column">
        <forge-inline-message theme="error">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="warning">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="success">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info-secondary">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>
      </div>
    `;
  }
};
