import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../../utils';

import '@tylertech/forge/split-view/split-view';
import style from './SplitViewPanel.scss';
import { storyStyles } from 'src/stories/decorators';
import { size } from '@floating-ui/dom';
import { styleMap } from 'lit/directives/style-map.js';

const component = 'forge-split-view-panel';

const meta = {
  title: 'Components/Split View/Split View Panel',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
    <forge-split-view>
      <forge-split-view-panel
        .resizable=${args.resizable}
        .size=${args.size}
        .min=${args.min}
        .max=${args.max}
        .disabled=${args.disabled}
        .allowClose=${args.allowClose}
        .autoClose=${args.autoClose}
        .autoCloseThreshold=${args.autoCloseThreshold}
        .accessibleLabel=${args.accessibleLabel}
        .open=${args.open}
        style=${style}>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel 
        .resizable=${args.resizable}
        .size=${args.size}
        .min=${args.min}
        .max=${args.max}
        .disabled=${args.disabled}
        .allowClose=${args.allowClose}
        .autoClose=${args.autoClose}
        .autoCloseThreshold=${args.autoCloseThreshold}
        .accessibleLabel=${args.accessibleLabel}
        .open=${args.open}
        style=${style}>
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
    `;
  },
  component,
  decorators: [storyStyles(style)],
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        resizable: {
          control: 'select',
          options: ['start', 'end', 'off']
        },
      }
    }),
  },
  args: {
    autoCloseThreshold: 120,
    size: '200',
    min: '100',
    max: '200',
    open: 'true',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
