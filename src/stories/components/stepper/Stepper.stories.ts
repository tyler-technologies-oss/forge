import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/stepper';

const component = 'forge-stepper';

const selectAction = action('forge-step-select');

const meta = {
  title: 'Components/Stepper',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-stepper
        .alternative=${args.alternative}
        .layoutMode=${args.layoutMode}
        .layoutAlign=${args.layoutAlign}
        .disabled=${args.disabled}
        .vertical=${args.vertical}
        .linear=${args.linear}
        style=${style}
        @forge-step-select=${selectAction}>
        <forge-step>Step 1</forge-step>
        <forge-step>
          Step 2
          <span slot="optional">Optional</span>
        </forge-step>
        <forge-step>
          <div slot="expansion-content">Expansion Content</div>
          ${args.vertical ? 'Expand me' : 'Step 3'}
        </forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
    `;
  },
  component,
  subcomponents: {
    Step: 'forge-step'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['steps', 'selectedIndex'],
      controls: {
        layoutMode: {
          control: 'select',
          options: ['fixed', 'clustered']
        },
        layoutAlign: {
          control: 'select',
          options: ['left', 'center', 'right']
        }
      }
    })
  },
  args: {
    layoutMode: 'fixed'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Vertical: Story = {
  ...standaloneStoryParams,
  render: args => html`
    <forge-stepper vertical="true">
      <forge-step>Step 1</forge-step>
      <forge-step>
        Step 2
        <span slot="optional">Optional</span>
      </forge-step>
      <forge-step>
        <div slot="expansion-content">Expansion Content</div>
        ${args.vertical ? 'Expand me' : 'Step 3'}
      </forge-step>
      <forge-step>Step 4</forge-step>
    </forge-stepper>
  `
};
