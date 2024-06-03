import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { DENSITY_OPTIONS, GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { tylIconFavorite, tylIconAdd } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/floating-action-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/button';

const component = 'forge-fab';

IconRegistry.define([tylIconFavorite, tylIconAdd]);

const meta = {
  title: 'Components/Floating Action Button',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-fab
        .theme=${args.theme}
        .density=${args.density}
        .elevation=${args.elevation}
        .popoverIcon=${args.popoverIcon}
        .disabled=${args.disabled}
        .dense=${args.dense}
        style=${style}
        aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['type', 'name', 'value', 'form'],
      controls: {
        theme: { control: 'select', options: GLOBAL_THEME_OPTIONS },
        density: { control: 'select', options: DENSITY_OPTIONS },
        elevation: { control: 'select', options: ['raised', 'lowered'] }
      }
    })
  },
  args: {
    theme: 'secondary',
    density: 'medium',
    elevation: 'raised',
    disabled: false,
    popoverIcon: false,
    dense: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Extended: Story = {
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-fab
        .theme=${args.theme}
        .density=${args.density}
        .elevation=${args.elevation}
        .popoverIcon=${args.popoverIcon}
        .disabled=${args.disabled}
        .dense=${args.dense}
        style=${style}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    `;
  },
};
