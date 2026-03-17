import { html, nothing } from 'lit-html';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';

import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/card';

const component = 'forge-focus-indicator';

const meta = {
  title: 'Components/Focus Indicator',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px; outline: none;">Focus me</button>
        <forge-focus-indicator
          target="target-btn"
          .active=${args.active}
          .inward=${args.inward}
          .circular=${args.circular}
          .allowFocus=${args.allowFocus}
          .focusMode=${args.focusMode}
          style=${style}>
        </forge-focus-indicator>
      </div>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['targetElement', 'target'],
      controls: {
        focusMode: { control: { type: 'select' }, options: ['focusin', 'focus'] }
      }
    })
  },
  args: {
    active: false,
    inward: false,
    circular: false,
    allowFocus: false,
    focusMode: 'focusin'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithCard: Story = {
  parameters: {
    controls: { include: /^--|active|inward/ }
  },
  render: args => {
    const style = {
      width: '300px',
      outline: 'none',
      position: 'relative'
    };
    return html`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${styleMap(style)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator
          .active=${args.active}
          .inward=${args.inward}
          .circular=${args.circular}
          .allowFocus=${args.allowFocus}
          .focusMode=${args.focusMode}
          style=${style}>
        </forge-focus-indicator>
      </forge-card>
    `;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: /^--|active|inward/ }
  },
  render: ({ active, inward, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-focus-indicator': true,
      'forge-focus-indicator__target': true,
      'forge-focus-indicator--active': active,
      'forge-focus-indicator--inward': inward
    };
    return html` <button type="button" class=${classMap(classes)} style=${style}>CSS-only Button</button> `;
  }
};

export const CSSOnlyWithSentinel: Story = {
  parameters: {
    controls: { include: /^--|active|inward/ }
  },
  render: ({ active, inward, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-focus-indicator': true,
      'forge-focus-indicator--active': active,
      'forge-focus-indicator--inward': inward
    };
    return html`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=${classMap(classes)} style=${style}></div>
      </button>
    `;
  }
};
