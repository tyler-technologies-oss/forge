import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';
import { tylIconFavorite, tylIconForgeLogo } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon';

import '@tylertech/forge/tabs/tab-bar';

const component = 'forge-tab-bar';

const changeAction = action('forge-tab-bar-change');
const selectAction = action('forge-tab-select');

IconRegistry.define([tylIconFavorite, tylIconForgeLogo]);

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

    const tabs = Array.from({ length: args.scrollButtons ? 20 : 3 }).map(
      (_, i) =>
        html`<forge-tab>
          ${args.startIcon ? html`<forge-icon slot="start" name="favorite"></forge-icon>` : nothing} Tab ${i + 1}
          ${args.endIcon ? html`<forge-icon slot="end" name="forge_logo"></forge-icon>` : nothing}
        </forge-tab>`
    );

    return html`
      <forge-tab-bar
        data-aria-label="Demo tabs"
        .disabled=${args.disabled}
        .activeTab=${args.activeTab}
        .vertical=${args.vertical}
        .clustered=${args.clustered}
        .stacked=${args.stacked}
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
    Tab: 'forge-tab'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        activeTab: { control: { type: 'inline-radio' }, options: [0, 1, 2] }
      }
    }),
    startIcon: { control: { type: 'boolean' } },
    endIcon: { control: { type: 'boolean' } }
  },
  args: {
    startIcon: false,
    endIcon: false,
    disabled: false,
    activeTab: 0,
    vertical: false,
    clustered: false,
    stacked: false,
    inverted: false,
    autoActivate: false,
    scrollButtons: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Vertical: Story = {
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
};

export const Clustered: Story = {
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
};

export const Scrolling: Story = {
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
};

export const WithIcons: Story = {
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
};
