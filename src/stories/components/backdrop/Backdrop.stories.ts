import { type Meta, type StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { styleMap } from 'lit/directives/style-map.js';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/backdrop';

const component = 'forge-backdrop';

const meta = {
  title: 'Components/Backdrop',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div style="height: 256px; width: 320px; position: relative;">
        <forge-backdrop .visible=${args.visible} .fixed=${args.fixed} style=${style}> </forge-backdrop>
      </div>
    `;
  },
  component,
  parameters: {
    layout: 'centered',
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {
    visible: true,
    fixed: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
