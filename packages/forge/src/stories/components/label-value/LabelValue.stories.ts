import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { IconRegistry } from '@tylertech/forge';
import { tylIconPerson } from '@tylertech/tyler-icons';

import '@tylertech/forge/label-value';
import '@tylertech/forge/icon';

const component = 'forge-label-value';

const meta = {
  title: 'Components/Label Value',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = styleMap({ ...cssVarArgs, width: args.ellipsis ? '100px' : null });
    return html`
      <forge-label-value .empty=${args.empty} .ellipsis=${args.ellipsis} .inline=${args.inline} style=${style}>
        <label slot="label">Label</label>
        ${args.empty ? html`<span slot="value">n/a</span>` : html`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['dense']
    })
  },
  args: {
    empty: false,
    ellipsis: false,
    inline: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Icon: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `;
  }
};

export const Inline: Story = {
  ...standaloneStoryParams,
  args: {
    inline: true
  }
};

export const CSSOnly: Story = {
  args: {
    withIcon: false
  },
  render: ({ inline, empty, ellipsis, withIcon, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args) ?? {};
    if (ellipsis) {
      cssVarArgs['maxWidth'] = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    console.log(style);
    const classes = {
      'forge-label-value': true,
      'forge-label-value--inline': inline,
      'forge-label-value--empty': empty,
      'forge-label-value--ellipsis': ellipsis
    };

    return html`
      <div class=${classMap(classes)} style=${style}>
        ${withIcon
          ? html`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`
          : nothing}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${empty ? 'n/a' : ellipsis ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' : 'Active'} </span>
      </div>
    `;
  }
};
