import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAdjust, tylIconOpenInNew, tylIconPayment, tylIconPayments } from '@tylertech/tyler-icons';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';

import '@tylertech/forge/avatar';
import '@tylertech/forge/chips/chip';
import '@tylertech/forge/chips/chip-set';

IconRegistry.define([tylIconOpenInNew, tylIconPayment, tylIconPayments, tylIconAdjust]);

const component = 'forge-chip-set';
const subcomponent = 'forge-chip';

const selectAction = action('forge-chip-select');
const deleteAction = action('forge-chip-delete');
const navigateAction = action('forge-chip-navigate');

const meta = {
  title: 'Components/Chips',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-chip-set
        .vertical=${args.vertical}
        .type=${args.type}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .invalid=${args.invalid}
        .theme=${args.theme}
        style=${style}
        @forge-chip-select=${selectAction}
        @forge-chip-delete=${deleteAction}>
        <forge-chip value="payments"> Payments ${args.withIcon ? html`<forge-icon name="payment" slot=${args.iconSlot}></forge-icon>` : nothing} </forge-chip>
        <forge-chip value="bills"> Bills ${args.withIcon ? html`<forge-icon name="payments" slot=${args.iconSlot}></forge-icon>` : nothing} </forge-chip>
        <forge-chip value="adjustments">
          Adjustments ${args.withIcon ? html`<forge-icon name="adjust" slot=${args.iconSlot}></forge-icon>` : nothing}
        </forge-chip>
      </forge-chip-set>
    `;
  },
  component,
  subcomponents: {
    Chip: subcomponent
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        theme: { control: 'select', options: GLOBAL_THEME_OPTIONS },
        type: { control: 'select', options: ['choice', 'filter', 'action', 'input', 'field'] }
      }
    }),
    ...generateCustomElementArgTypes({
      tagName: subcomponent,
      include: /^--forge-chip/
    }),
    withIcon: { control: 'boolean' },
    iconSlot: { control: 'select', options: ['start', 'end'], if: { arg: 'icon', eq: true } }
  },
  args: {
    withIcon: false,
    iconSlot: 'end',
    vertical: false,
    type: 'action',
    dense: false,
    disabled: false,
    invalid: false,
    theme: 'primary'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Anchor: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => html`
    <forge-chip-set>
      <forge-chip value="payments" href="javascript: void(0);" @forge-chip-navigate=${navigateAction}>
        Anchor
        <forge-icon name="open_in_new" slot="end"></forge-icon>
      </forge-chip>
    </forge-chip-set>
  `
};

export const Avatar: Story = {
  argTypes: {
    avatarSlot: { control: 'select', options: ['start', 'end'] },
    withIcon: { table: { disable: true } }
  },
  args: {
    avatarSlot: 'start'
  },
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-chip-set
        .vertical=${args.vertical}
        .type=${args.type}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .invalid=${args.invalid}
        .theme=${args.theme}
        style=${style}>
        <forge-chip value="ruby">
          <forge-avatar slot=${args.avatarSlot} size="small" image-url="./ruby-side.jpg"></forge-avatar>
          Ruby
        </forge-chip>
        <forge-chip value="leo">
          <forge-avatar slot=${args.avatarSlot} size="small" image-url="./leo.png"></forge-avatar>
          Leo
        </forge-chip>
        <forge-chip value="harley">
          <forge-avatar slot=${args.avatarSlot} size="small" image-url="./harley.jpg"></forge-avatar>
          Harley
        </forge-chip>
      </forge-chip-set>
    `;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: /^--|dense|disabled|invalid|vertical/ }
  },
  args: {
    disabled: false,
    invalid: false,
    dense: false,
    vertical: false
  },
  render: ({ disabled, invalid, dense, vertical }) => {
    const classes = {
      'forge-chip': true,
      'forge-chip--invalid': invalid,
      'forge-chip--dense': dense
    };
    return html`
      <div
        class=${classMap({
          'forge-chip-set': true,
          'forge-chip-set--vertical': vertical
        })}>
        <button class=${classMap(classes)} .disabled=${disabled}>Small</button>
        <button class=${classMap({ ...classes, 'forge-chip--selected': true })} .disabled=${disabled}>Medium</button>
        <button class=${classMap(classes)} .disabled=${disabled}>Large</button>
      </div>
    `;
  }
};
