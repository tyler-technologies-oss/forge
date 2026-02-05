import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/file-picker';
import { styleMap } from 'lit/directives/style-map.js';
const component = 'forge-file-picker';

const meta = {
  title: 'Components/File Picker',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-file-picker
        .accept=${args.accept}
        .maxSize=${args.maxSize}
        .multiple=${args.multiple}
        .disabled=${args.disabled}
        .compact=${args.compact}
        .borderless=${args.borderless}
        .capture=${args.capture}
        style=${style}>
        <span slot="primary">Drag files here or</span>
        <span slot="secondary">Secondary text here</span>
        <forge-button variant="outlined">Select files</forge-button>
        <span slot="helper-text">Helper text goes here</span>
      </forge-file-picker>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: { maxSize: { control: { type: 'number' } } }
    })
  },
  args: {
    maxSize: 0,
    multiple: false,
    disabled: false,
    compact: false,
    borderless: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
