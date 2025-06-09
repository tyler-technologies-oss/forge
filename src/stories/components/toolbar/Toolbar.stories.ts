import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/toolbar';

const component = 'forge-toolbar';

const meta = {
  title: 'Components/Toolbar',
  render: args => html`
    <forge-toolbar .inverted=${args.inverted}>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `,
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {
    inverted: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Inverted: Story = {
  render: () => html`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `
};

export const CSSOnly: Story = {
  decorators: [
    storyStyles(`
.placeholder-container {
    border: 2px dashed var(--forge-theme-outline);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-block: 8px;
    margin-block: 4px;
}
  `)
  ],
  render: ({ inverted, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-toolbar': true,
      'forge-toolbar--inverted': inverted
    };
    return html`<div class=${classMap(classes)} style=${style}>
      <div class="forge-toolbar__start placeholder-container">Start</div>
      <div class="forge-toolbar__center placeholder-container">Center</div>
      <div class="forge-toolbar__end placeholder-container">End</div>
    </div>`;
  }
};
