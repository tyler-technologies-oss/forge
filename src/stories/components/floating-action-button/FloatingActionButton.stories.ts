import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { DENSITY_OPTIONS, GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { tylIconFavorite, tylIconAdd, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/floating-action-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/button';

const component = 'forge-fab';

IconRegistry.define([tylIconFavorite, tylIconAdd, tylIconOpenInNew]);

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
    dense: false
  }
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
  }
};

export const WithAnchor: Story = {
  ...standaloneStoryParams,
  render: args => {
    return html`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    `;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: /^--|density|extended|disabled|elevation/ }
  },
  args: {
    extended: false
  },
  render: ({ extended, density, disabled, elevation, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-fab': true,
      'forge-fab--extended': extended,
      'forge-fab--small': density === 'small',
      'forge-fab--large': density === 'large',
      'forge-fab--flat': elevation === 'lowered'
    };
    return html`<button class=${classMap(classes)} style=${style} aria-label="Floating Action Button Demo" .disabled=${disabled}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      ${extended ? html`<span>Extended</span>` : nothing}
    </button>`;
  }
};
