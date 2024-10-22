import { html, nothing } from 'lit-html';
import { styleMap } from 'lit/directives/style-map.js';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/state-layer';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/card';

const component = 'forge-state-layer';

const meta = {
  title: 'Components/State Layer',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px;">Click me</button>
        <forge-state-layer target="target-btn" .disabled=${args.disabled} style=${style}> </forge-state-layer>
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
      exclude: ['targetElement', 'target']
    })
  },
  args: {
    disabled: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithCard: Story = {
  ...standaloneStoryParams,
  render: () => {
    const style = {
      width: '300px',
      outline: 'none',
      position: 'relative'
    };
    return html`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${styleMap(style)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    `;
  }
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> `;
  }
};
