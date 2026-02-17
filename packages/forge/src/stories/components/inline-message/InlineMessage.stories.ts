import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconInfo } from '@tylertech/tyler-icons';
import { styleMap } from 'lit/directives/style-map.js';

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
  render: ({ text }) => html`
    <forge-inline-message>
      <span slot="title">Lorem Ipsum</span>
      <p>${text}</p>
    </forge-inline-message>
  `
};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => html`
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
  `
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: /^--|text|withIcon/ }
  },
  args: {
    withIcon: false
  },
  render: ({ text, withIcon, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div class="forge-inline-message" style=${style}>
        ${withIcon
          ? html`<svg class="forge-icon forge-inline-message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>`
          : nothing}
        <div class="forge-inline-message__title">Title</div>
        <div>${text}</div>
      </div>
    `;
  }
};
