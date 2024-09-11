import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { OVERLAY_PLACEMENT_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { IMenuOption, IOption } from '@tylertech/forge';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/menu';
import '@tylertech/forge/button';

const component = 'forge-menu';

const meta = {
  title: 'Components/Menu',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    let options = [
      { label: 'Save', value: 'save' },
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' }
    ] as IMenuOption[];

    if (args.mode === 'cascade') {
      options[1] = {
        ...options[1],
        options: [
          { label: 'As New', value: 'asNew' },
          { label: 'Overwrite', value: 'overwrite' },
          {
            label: 'More',
            value: 'more',
            options: [
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' }
            ]
          }
        ] as IOption[]
      };
    }

    return html`
      <forge-menu
        .open=${args.open}
        .placement=${args.placement}
        .persistSelection=${args.persistSelection}
        .mode=${args.mode}
        .options=${options}
        style=${style}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: ['open', 'placement', 'persistSelection', 'mode'],
      controls: {
        placement: {
          control: 'select',
          options: [...OVERLAY_PLACEMENT_OPTIONS]
        },
        persistSelection: { type: 'boolean' },
        mode: {
          control: 'select',
          options: ['click', 'cascade']
        }
      }
    })
  },
  args: {
    open: false,
    placement: 'bottom-start',
    persistSelection: false,
    mode: 'click'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Cascading: Story = {
  args: { mode: 'cascade' }
};
