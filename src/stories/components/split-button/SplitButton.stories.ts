import { type Meta, type StoryObj } from '@storybook/web-components';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { type IMenuOption } from '@tylertech/forge/menu/menu-constants';
import { SPLIT_BUTTON_CONSTANTS } from '@tylertech/forge/split-button';
import { tylIconBookmarkBorder, tylIconScheduleSend } from '@tylertech/tyler-icons/standard';
import { html, nothing } from 'lit-html';
import { styleMap } from 'lit/directives/style-map.js';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/menu';
import '@tylertech/forge/split-button';

IconRegistry.define([tylIconScheduleSend, tylIconBookmarkBorder]);

const component = 'forge-split-button';

const meta = {
  title: 'Components/Split Button',
  render: args => {
    const options: IMenuOption[] = [
      {
        label: 'Schedule send',
        value: 'schedule',
        leadingIcon: tylIconScheduleSend.name,
        leadingIconType: 'component'
      },
      { label: 'Save draft', value: 'draft', leadingIcon: tylIconBookmarkBorder.name, leadingIconType: 'component' }
    ];

    const cssVarArgs = getCssVariableArgs(args);

    return html`
      <forge-split-button
        variant=${args.variant}
        theme=${args.theme}
        ?disabled=${args.disabled}
        ?dense=${args.dense}
        ?pill=${args.pill}
        style=${cssVarArgs ? styleMap(cssVarArgs) : nothing}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${options}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        variant: { control: { type: 'select' }, options: ['text', 'outlined', 'filled', 'raised'] },
        theme: { control: { type: 'select' }, options: GLOBAL_THEME_OPTIONS }
      }
    })
  },
  args: {
    variant: 'raised',
    theme: SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME,
    disabled: false,
    dense: false,
    pill: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
