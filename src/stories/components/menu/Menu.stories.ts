import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { OVERLAY_PLACEMENT_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/menu';
import '@tylertech/forge/button';
import { IMenuComponent, IMenuOption, IOption } from '@tylertech/forge';
import { styleMap } from 'lit/directives/style-map.js';

const component = 'forge-menu';

const meta = {
  title: 'Components/Menu',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    let options = [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' }
    ] as IMenuOption[];

    if (args.mode === 'cascade') {
      options[0] = {
        ...options[0],
        options: [
          { label: 'As New', value: 'asNew' },
          { label: 'Overwrite', value: 'overwrite' }
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
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
