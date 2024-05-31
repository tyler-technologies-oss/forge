import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from 'src/stories/utils';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/button-toggle';

const groupComponent = 'forge-button-toggle-group';
const itemComponent = 'forge-button-toggle';

const changeAction = action('forge-button-toggle-group-change');
const selectAction = action('forge-button-toggle-select');

const meta = {
  title: 'Components/Button Toggle',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-button-toggle-group 
        .outlined=${args.outlined}
        .multiple=${args.multiple}
        .stretch=${args.stretch}
        .mandatory=${args.mandatory}
        .vertical=${args.vertical}
        .disabled=${args.disabled}
        .dense=${args.dense}
        .theme=${args.theme}
        ?readonly=${args.readonly}
        ?required=${args.required}
        aria-label="Choose communication type"
        @forge-button-toggle-group-change=${changeAction}
      style=${style}>
        <forge-button-toggle
          .required=${args.selected}
          .selected=${args.selected}
          value="email"
          @forge-button-toggle-select=${selectAction}>By email</forge-button-toggle>
        <forge-button-toggle value="mail" @forge-button-toggle-select=${selectAction}>By mail</forge-button-toggle>
        <forge-button-toggle value="phone" @forge-button-toggle-select=${selectAction}>By phone</forge-button-toggle>
      </forge-button-toggle-group>
    `;
  },
  component: groupComponent,
  subcomponents: {
    ['Button Toggle']: itemComponent
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: `${groupComponent}`,
      exclude: ['value', 'required'],
      controls: {
        theme: { control: 'select', options: ['default', ...GLOBAL_THEME_OPTIONS] }
      }
    }),
    ...generateCustomElementArgTypes({ tagName: `${itemComponent}`, exclude: ['value', 'required']}),
  },
  args: {
    outlined: true,
    multiple: false,
    stretch: false,
    mandatory: false,
    vertical: false,
    disabled: false,
    readonly: false,
    dense: false,
    selected: false,
    theme: 'tertiary',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
