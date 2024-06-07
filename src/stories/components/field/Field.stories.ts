import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { IFieldComponent } from '@tylertech/forge/field';

import '@tylertech/forge/field';
import { storyStyles } from '../../decorators';

const component = 'forge-field';

const meta = {
  title: 'Components/Field',
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const fieldRef = createRef<IFieldComponent>();

    function handleInput({ target }: KeyboardEvent): void {
      fieldRef.value!.floatLabel = !!(target as HTMLInputElement).value;
    }

    return html`
      <forge-field
        ${ref(fieldRef)}
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
        .floatLabel=${args.floatLabel || !!args.value}
        .multiline=${args.multiline}
        ?optional=${args.optional}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?invalid=${args.invalid}
        style=${style}>
        ${args.label.length ? html`<label for="my-input">${args.label}</label>` : nothing}
        ${args.multiline
          ? html`<textarea .value=${args.value} @input=${handleInput}></textarea>`
          : html`<input id="my-input" type="text" .value=${args.value} @input=${handleInput} />`}
        ${args.supportText.length ? html`<span slot="support-text">${args.supportText}</span>` : nothing}
        ${args.supportTextEnd.length ? html`<span slot="support-text-end">${args.supportTextEnd}</span>` : nothing}
      </forge-field>
    `;
  },
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['popoverTargetElement', 'focusIndicatorTargetElement', 'forgeIndicatorFocusMode', 'focusIndicatorAllowFocus'],
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
    label: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    supportText: { control: { type: 'text' } },
    supportTextEnd: { control: { type: 'text' } },
    multiline: { control: { type: 'boolean' } }
  },
  args: {
    label: 'Label',
    value: '',
    supportText: '',
    supportTextEnd: '',
    multiline: false,
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
    density: 'default',
    dense: false,
    popoverIcon: false,
    popoverExpanded: false,
    supportTextInset: 'none'
  }
} satisfies Meta<
  Partial<IFieldComponent> & {
    label: string;
    value: string;
    supportText: string;
    supportTextEnd: string;
  }
>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  decorators: [
    storyStyles(`
    forge-field {
      max-width: 320px;
    }
  `)
  ]
};

export const StaticField: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
    forge-field {
      max-width: 320px;

      [data-forge-field-input] {
        display: flex;
        align-items: center;
      }
    }
  `)
  ],
  render: () => html`
    <forge-field label-position="block-start">
      <span slot="label">Static label</span>
      <span data-forge-field-input>Static value text</span>
    </forge-field>
  `
};
