import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/inline-message';
import { text } from 'stream/consumers';

const component = 'forge-inline-message';

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

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div style="display: flex; gap: 16px; flex-direction: column">
        <forge-inline-message theme="error">
          <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
        </forge-inline-message>

        <forge-inline-message theme="warning">
          <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
        </forge-inline-message>

        <forge-inline-message theme="success">
          <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
        </forge-inline-message>

        <forge-inline-message theme="info-primary">
          <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
        </forge-inline-message>

        <forge-inline-message theme="info-secondary">
          <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
        </forge-inline-message>
      </div>
    `;
  }
};
