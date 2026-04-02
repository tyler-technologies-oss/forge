import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/skeleton';

const component = 'forge-skeleton';

const meta = {
  title: 'Components/Skeleton',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Profile = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  `
};

export const List = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  `
};

export const Chips = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  `
};

export const Buttons = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  `
};

export const FormField = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  `
};

export const CSSOnly: Story = {
  argTypes: {
    type: {
      options: ['default', 'avatar', 'list-item', 'text', 'chip', 'button', 'form-field'],
      control: { type: 'select' }
    }
  },
  args: {
    type: 'default'
  },
  render: ({ type, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-skeleton': true,
      'forge-skeleton--avatar': type === 'avatar',
      'forge-skeleton--list-item': type === 'list-tem',
      'forge-skeleton--text': type === 'text',
      'forge-skeleton--chip': type === 'chip',
      'forge-skeleton--button': type === 'button',
      'forge-skeleton--form-field': type === 'form-field'
    };
    return html` <div class=${classMap(classes)} style=${style}></div> `;
  }
};
