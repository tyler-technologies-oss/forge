import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/label-value';
import '@tylertech/forge/icon';
import { styleMap } from 'lit/directives/style-map.js';
import { IconRegistry } from '@tylertech/forge';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';

const component = 'forge-label-value';

const meta = {
  title: 'Components/Label Value',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    if (args.ellipsis) {
      style['width'] = '100px';
    }

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
