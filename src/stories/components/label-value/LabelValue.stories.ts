import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';

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

    return html`
      <div style="width: 100px">
        <forge-label-value
        .empty=${args.empty}
        .ellipsis=${args.ellipsis}
        .inline=${args.inline}
        .dense=${args.dense}
        style=${style}>
          <label slot="label">Label</label>
          <span slot="value">A simple value</span>
        </forge-label-value>
    </div>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,

    }),
  },
  args: {

  },
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
          <label slot="label">Label</label>
          <span slot="value">A simple value</span>
        </forge-label-value>
  `;
  }
}