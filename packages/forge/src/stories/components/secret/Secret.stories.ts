import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { standaloneStoryParams, customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/secret';

const component = 'forge-secret';

const meta = {
  title: 'Components/Secret',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    if (style) {
      el.setAttribute('style', String(style));
    }
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['name'],
      controls: {
        variant: { control: 'select', options: ['blur', 'dots'] },
        buttonPosition: { control: 'select', options: ['start', 'end'] }
      }
    }),
    text: { control: 'text' }
  },
  args: {
    text: 'Secret content here',
    open: false,
    variant: 'blur',
    mask: '',
    maskCharacter: '●',
    allow: '',
    block: false,
    buttonPosition: 'end',
    showOnHover: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const NamedGroup: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">consectetur adipiscing elit</forge-secret>
    </div>
  `
};

export const Block: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  `
};
