import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../../utils';

import '@tylertech/forge/stepper/step';
import { styleMap } from 'lit/directives/style-map.js';

const component = 'forge-step';

const meta = {
  title: 'Components/Stepper/Step',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    
    return html`
    <forge-step
      .index=${args.index}
      .selected=${args.selected}
      .active=${args.active}
      .completed=${args.completed}
      .expanded=${args.expanded}
      .disabled=${args.disabled}
      .error=${args.error}
      .alternative=${args.alternative}
      .vertical=${args.vertical}
      .ignoreUserExpansion=${args.ignoreUserExpansion}
      .editable=${args.editable}
      style=${style}>
      <div slot="expansion-content">Expanded</div>
      ${args.text}
      </forge-step>
    `
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
    text: 'Step 1',
    index: 0
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
