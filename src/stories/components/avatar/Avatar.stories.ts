import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { tylIconPerson } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { styleMap } from 'lit/directives/style-map.js';
import { AVATAR_CONSTANTS } from '@tylertech/forge/avatar';

import '@tylertech/forge/avatar';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

const component = 'forge-avatar';

const meta = {
  title: 'Components/Avatar',
  render: ({ text, letterCount, imageUrl, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`<forge-avatar
      style=${style}
      text=${text}
      letter-count=${letterCount !== AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT ? letterCount : nothing}
      image-url=${imageUrl ?? nothing}></forge-avatar>`;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({ tagName: component })
  },
  args: {
    text: 'Tyler Forge',
    letterCount: 2
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithImage: Story = {
  parameters: {
    controls: { include: /^--|imageUrl/ }
  },
  args: {
    imageUrl: './ruby.jpg'
  },
  render: ({ imageUrl }) => {
    return html` <forge-avatar image-url=${imageUrl}></forge-avatar> `;
  }
};

export const WithIcon: Story = {
  parameters: {
    controls: { include: /^--/ }
  },
  render: () => {
    IconRegistry.define(tylIconPerson);
    return html`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `;
  }
};

export const WithIconButton: Story = {
  ...standaloneStoryParams,
  render: ({ text }) => {
    return html`
      <forge-icon-button aria-label="Icon button with avatar">
        <forge-avatar text=${text}></forge-avatar>
      </forge-icon-button>
    `;
  }
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`<div class="forge-avatar">A</div>`;
  }
};
