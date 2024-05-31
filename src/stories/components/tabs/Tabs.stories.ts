import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/tabs/tab-bar';

const component = 'forge-tab-bar';

const changeAction = action('forge-tab-bar-change');
const selectAction = action('forge-tab-select');

IconRegistry.define([
  tylIconFavorite,
  tylIconForgeLogo
]);

const meta = {
  title: 'Components/Tabs',
  render: args => {
    const styles = { ...getCssVariableArgs(args) };

    if (args.vertical) {
      styles['max-width'] = '200px';
    } else if (args.scrollButtons) {
      styles['max-width'] = '500px';
    }

    const style = Object.entries(styles).length ? styleMap(styles) : nothing;

    const tabs = Array.from({ length: args.scrollButtons ? 20 : 3 }).map((_, i) =>
      html`<forge-tab>
        ${args.startIcon ? html`<forge-icon slot="start" name="favorite"></forge-icon>` : nothing}
        Tab ${i + 1}
        ${args.endIcon ? html`<forge-icon slot="end" name="forge_logo"></forge-icon>` : nothing}
      </forge-tab>`);

    return html`
      <forge-tab-bar
        .disabled=${args.disabled}
        .activeTab=${args.activeTab}
        .vertical=${args.vertical}
        .clustered=${args.clustered}
        .stacked=${args.stacked}
        .secondary=${args.secondary}
        .inverted=${args.inverted}
        .autoActivate=${args.autoActivate}
        .scrollButtons=${args.scrollButtons}
        style=${style}
        @forge-tab-bar-change=${changeAction}
        @forge-tab-select=${selectAction}>
        ${tabs}
      </forge-tab-bar>
    `;
  },
  component,
  subcomponents: {
    'Tab': 'forge-tab',
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        activeTab: { control: { type: 'inline-radio' }, options: [0, 1, 2] }
      }
    }),
    startIcon: { control: { type: 'boolean' } },
    endIcon: { control: { type: 'boolean' } },
  },
  args: {
    startIcon: false,
    endIcon: false,
    disabled: false,
    activeTab: 0,
    vertical: false,
    clustered: false,
    stacked: false,
    secondary: false,
    inverted: false,
    autoActivate: false,
    scrollButtons: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Secondary: Story = {
  args: { 
    secondary: true
  }
};
