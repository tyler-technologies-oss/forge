import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { IFieldComponent } from '@tylertech/forge/field';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/field';

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

export const CSSOnly: Story = {
  parameters: {
    controls: {
      include: [
        'label',
        'value',
        'supportText',
        'showStartIcon',
        'inset',
        'invalid',
        'disabled',
        'variant',
        'shape',
        'density',
        'multiline',
        'showStartIcon',
        'select'
      ]
    }
  },
  args: {
    showStartIcon: false,
    inset: false,
    select: false
  },
  decorators: [
    storyStyles(`
      .forge-field {
        max-width: 320px;
      }
    `)
  ],
  render: ({ label, value, supportText, showStartIcon, multiline, inset, invalid, disabled, variant, shape, density, select, ...args }) => {
    const fieldRef = createRef();
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-field': true,
      'forge-field--invalid': invalid,
      'forge-field--rounded': shape === 'rounded',
      'forge-field--plain': variant === 'plain',
      'forge-field--tonal': variant === 'tonal',
      'forge-field--filled': variant === 'filled',
      'forge-field--raised': variant === 'raised',
      'forge-field--extra-small': density === 'extra-small',
      'forge-field--small': density === 'small',
      'forge-field--large': density === 'large',
      'forge-field--extra-large': density === 'extra-large'
    };
    const labelEl = html`<label for="my-css-only-input" class=${classMap({ 'forge-typography--label2': !inset })}>${label}</label>`;

    function handleInput({ target }: InputEvent & { target: HTMLInputElement }): void {
      toggleFloatingLabel(target, { animate: true });
    }

    function toggleFloatingLabel(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, { animate = false }): void {
      const hasValue = !!input.value;
      fieldRef.value?.classList.toggle('forge-field--float-label', hasValue);
      if (animate) {
        fieldRef.value?.classList.toggle('forge-field--float-label-in', hasValue);
        fieldRef.value?.classList.toggle('forge-field--float-label-out', !hasValue);
      }
    }

    if (value) {
      requestAnimationFrame(() => {
        const input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = fieldRef.value?.querySelector('input,select,textarea')!;
        toggleFloatingLabel(input, { animate: false });
      });
    }

    const textareaEl = html`<textarea @input=${inset ? handleInput : nothing} id="my-css-only-input" .disabled=${disabled} .value=${value}></textarea>`;
    const inputEl = html`<input @input=${inset ? handleInput : nothing} type="text" id="my-css-only-input" .disabled=${disabled} value=${value} />`;

    const selectEl = html`
      <select @change=${inset ? handleInput : nothing} id="my-css-only-input" .disabled=${disabled} .value=${value}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;

    return html`
      ${!inset ? labelEl : nothing}
      <div ${ref(fieldRef)} class=${classMap(classes)} style=${style}>
        ${inset ? labelEl : nothing}
        ${showStartIcon
          ? html`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>`
          : nothing}
        ${multiline ? textareaEl : select ? selectEl : inputEl}
      </div>
      ${supportText ? html`<span class="forge-typography--label1">${supportText}</span>` : nothing}
    `;
  }
};
