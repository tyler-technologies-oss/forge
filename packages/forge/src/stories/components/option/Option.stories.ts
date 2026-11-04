import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconHome, tylIconPerson, tylIconSettings } from '@tylertech/tyler-icons';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/listbox';
import '@tylertech/forge/option';
import '@tylertech/forge/icon';

IconRegistry.define([tylIconHome, tylIconSettings, tylIconPerson]);

const component = 'forge-option';
const groupComponent = 'forge-option-group';

const meta = {
  title: 'Components/Option',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-listbox style=${style}>
        <forge-option value="1" ?disabled=${args.disabled} ?two-line=${args.twoLine} ?three-line=${args.threeLine}>
          Option 1 ${args.twoLine || args.threeLine ? html`<span slot="secondary">Secondary text</span>` : nothing}
          ${args.threeLine ? html`<span slot="tertiary">Tertiary text</span>` : nothing}
        </forge-option>
        <forge-option value="2" ?disabled=${args.disabled} ?two-line=${args.twoLine} ?three-line=${args.threeLine}>
          Option 2 ${args.twoLine || args.threeLine ? html`<span slot="secondary">Secondary text</span>` : nothing}
          ${args.threeLine ? html`<span slot="tertiary">Tertiary text</span>` : nothing}
        </forge-option>
        <forge-option value="3" ?disabled=${args.disabled} ?two-line=${args.twoLine} ?three-line=${args.threeLine}>
          Option 3 ${args.twoLine || args.threeLine ? html`<span slot="secondary">Secondary text</span>` : nothing}
          ${args.threeLine ? html`<span slot="tertiary">Tertiary text</span>` : nothing}
        </forge-option>
      </forge-listbox>
    `;
  },
  component,
  subcomponents: {
    'Forge Option Group': groupComponent
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['value', 'label', 'secondaryLabel', 'optionClass']
    })
  },
  args: {
    disabled: false,
    twoLine: false,
    threeLine: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithIcons: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  `
};

export const TwoLine: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option value="1" two-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
      </forge-option>
      <forge-option value="2" two-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
      </forge-option>
      <forge-option value="3" two-line>
        <span>Option 3</span>
        <span slot="secondary">Secondary text for option 3</span>
      </forge-option>
    </forge-listbox>
  `
};

export const ThreeLine: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option value="1" three-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
        <span slot="tertiary">Tertiary text for option 1</span>
      </forge-option>
      <forge-option value="2" three-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
        <span slot="tertiary">Tertiary text for option 2</span>
      </forge-option>
    </forge-listbox>
  `
};

export const Groups: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  `
};
