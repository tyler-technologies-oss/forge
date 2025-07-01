import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/select';

import styles from './Select.scss?inline';
import { ISelectComponent } from '@tylertech/forge/select';

const component = 'forge-select';

const changeAction = action('change');

const meta = {
  title: 'Components/Select',
  component,
  subcomponents: {
    'Forge Option': 'forge-option',
    'Forge Option Group': 'forge-option-group'
  },
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-select
        .label=${args.label}
        .labelPosition=${args.labelPosition}
        .labelAlignment=${args.labelAlignment}
        .variant=${args.variant}
        .theme=${args.theme}
        .shape=${args.shape}
        .density=${args.density}
        .dense=${args.dense}
        .supportTextInset=${args.supportTextInset}
        .floatLabel=${args.floatLabel}
        .placeholder=${args.placeholder}
        .multiple=${args.multiple}
        .open=${args.open}
        ?optional=${args.optional}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?invalid=${args.invalid}
        style=${style}
        @change=${changeAction}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${args.supportText.length ? html`<span slot="support-text">${args.supportText}</span>` : nothing}
        ${args.supportTextEnd.length ? html`<span slot="support-text-end">${args.supportTextEnd}</span>` : nothing}
      </forge-text-field>
    `;
  },
  decorators: [storyStyles(styles)],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: [
        'popoverTargetElement',
        'popoverIcon',
        'popoverExpanded',
        'value',
        'selectedIndex',
        'options',
        'optionBuilder',
        'selectedTextBuilder',
        'popupElement',
        'beforeValueChange'
      ],
      controls: {
        labelPosition: { control: 'select', options: ['inline-start', 'inline-end', 'block-start', 'inset', 'none'] },
        labelAlignment: { control: 'select', options: ['default', 'center', 'baseline', 'start', 'end'] },
        variant: { control: 'select', options: ['plain', 'outlined', 'tonal', 'filled', 'raised'] },
        theme: { control: 'select', options: [...GLOBAL_THEME_OPTIONS, 'default'] },
        shape: { control: 'select', options: ['default', 'rounded', 'squared'] },
        density: { control: 'select', options: ['default', 'extra-small', 'small', 'medium', 'large', 'extra-large'] },
        supportTextInset: { control: 'select', options: ['start', 'end', 'both', 'none'] }
      }
    }),
    supportText: { control: { type: 'text' } },
    supportTextEnd: { control: { type: 'text' } }
  },
  args: {
    label: 'Label',
    placeholder: '',
    multiple: false,
    labelPosition: 'inset',
    labelAlignment: 'default',
    variant: 'outlined',
    theme: 'default',
    shape: 'default',
    density: 'default',
    dense: false,
    supportText: '',
    supportTextEnd: '',
    invalid: false,
    required: false,
    optional: false,
    disabled: false,
    floatLabel: false,
    supportTextInset: 'none',
    open: false
  }
} satisfies Meta<Partial<ISelectComponent> & { supportText: string; supportTextEnd: string }>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const LabelAbove: Story = {
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
};

export const LabelInline: Story = {
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
};

export const Multiple: Story = {
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
};
