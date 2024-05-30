import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, removeInlineStyleTag, standaloneStoryParams } from '../../utils';

import { storyStyles } from '../../decorators';

import '@tylertech/forge/text-field';

import styles from './TextField.scss?inline';

const component = 'forge-text-field';

const meta = {
  title: 'Components/Text Field',
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-text-field
        .labelPosition=${args.labelPosition}
        .labelAlignment=${args.labelAlignment}
        .variant=${args.variant}
        .theme=${args.theme}
        .shape=${args.shape}
        .density=${args.density}
        .dense=${args.dense}
        .popoverIcon=${args.popoverIcon}
        .popoverExpanded=${args.popoverExpanded}
        .supportTextInset=${args.supportTextInset}
        .showClear=${args.showClear}
        .floatLabel=${args.floatLabel}
        ?optional=${args.optional}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?invalid=${args.invalid}
        style=${style}>
        ${args.label.length ? html`<label slot="label">${args.label}</label>` : nothing}
        ${args.textarea ? 
          html`<textarea placeholder=${args.placeholder ?? nothing} .value=${args.value}></textarea>` :
          html`<input .type=${args.type || 'text'} placeholder=${args.placeholder ?? nothing} .value=${args.value}>`}
        ${args.supportText.length ? html`<span slot="support-text-start">${args.supportText}</span>` : nothing}
        ${args.supportTextEnd.length ? html`<span slot="support-text-end">${args.supportTextEnd}</span>` : nothing}
      </forge-text-field>
    `;
  },
  decorators: [storyStyles(styles)],
  parameters: {
    actions: { disable: true },
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['popoverTargetElement'],
      controls: {
        labelPosition: { control: 'select', options: ['inline-start', 'inline-end', 'block-start', 'inset', 'none'] },
        labelAlignment: { control: 'select', options: ['default', 'center', 'baseline', 'start', 'end'] },
        variant: { control: 'select', options: ['plain', 'outlined', 'tonal', 'filled', 'raised'] },
        theme: { control: 'select', options: [...GLOBAL_THEME_OPTIONS, 'default'] },
        shape: { control: 'select', options: ['default', 'rounded', 'squared'] },
        density: { control: 'select', options: ['extra-small', 'small', 'medium', 'large', 'extra-large'] },
        supportTextInset: { control: 'select', options: ['start', 'end', 'both', 'none'] },
      },
    }),
    label: { control: { type: 'text' }},
    value: { control: { type: 'text' }},
    placeholder: { control: { type: 'text' }},
    type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
    supportText: { control: { type: 'text' }},
    supportTextEnd: { control: { type: 'text' }},
    textarea: { control: { type: 'boolean' }},
  },
  args: {
    label: 'Label',
    value: '',
    type: 'text',
    supportText: '',
    supportTextEnd: '',
    textarea: false,
    showClear: false,
    labelPosition: 'inset',
    labelAlignment: 'default',
    invalid: false,
    required: false,
    optional: false,
    disabled: false,
    floatLabel: false,
    variant: 'outlined',
    theme: 'default',
    shape: 'default',
    density: 'medium',
    dense: false,
    popoverIcon: false,
    popoverExpanded: false,
    supportTextInset: 'none',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Textarea: Story = {
  ...standaloneStoryParams,
  args: {
    textarea: true,
  },
};

export const LabelAbove: Story = {
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start',
  },
};

export const LabelInline: Story = {
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start',
  },
};
