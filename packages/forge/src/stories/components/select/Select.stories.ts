import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';
import { storyStyles } from '../../decorators.js';

import '@tylertech/forge/select';

import styles from './Select.scss?inline';
import { ISelectComponent } from '@tylertech/forge/select';

const component = 'forge-select';

const changeAction = action('change');
const selectAllAction = action('forge-select-all');

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
        label=${args.label ?? nothing}
        label-position=${args.labelPosition ?? nothing}
        label-alignment=${args.labelAlignment ?? nothing}
        variant=${args.variant ?? nothing}
        theme=${args.theme ?? ''}
        shape=${args.shape ?? nothing}
        density=${args.density ?? nothing}
        placeholder=${args.placeholder ?? nothing}
        ?dense=${args.dense}
        ?support-text-inset=${args.supportTextInset}
        ?float-label=${args.floatLabel}
        ?multiple=${args.multiple}
        ?show-select-all=${args.showSelectAll}
        select-all-label=${args.selectAllLabel ?? nothing}
        ?open=${args.open}
        ?optional=${args.optional}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?invalid=${args.invalid}
        style=${style}
        @change=${changeAction}
        @forge-select-all=${selectAllAction}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${args.supportText.length ? html`<span slot="support-text">${args.supportText}</span>` : nothing}
        ${args.supportTextEnd.length ? html`<span slot="support-text-end">${args.supportTextEnd}</span>` : nothing}
      </forge-select>
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
        'beforeValueChange',
        'showSelectAll'
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
    supportTextEnd: { control: { type: 'text' } },
    showSelectAll: { control: { type: 'boolean' } },
    selectAllLabel: { control: { type: 'text' } }
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
    open: false,
    showSelectAll: false,
    selectAllLabel: 'Select all'
  }
} satisfies Meta<Partial<ISelectComponent> & { supportText: string; supportTextEnd: string; selectAllLabel: string }>;

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

export const SelectAll: Story = {
  parameters: {
    controls: { disable: true }
  },
  args: {
    multiple: true,
    showSelectAll: true
  }
};
