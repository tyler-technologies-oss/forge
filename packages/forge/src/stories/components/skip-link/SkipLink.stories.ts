import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';

import '@tylertech/forge/skip-link';

const component = 'forge-skip-link';

const meta = {
  title: 'Components/Skip Link',
  tags: ['new'],
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div>
        <forge-skip-link
          target="main-content"
          .theme=${args.theme}
          .muted=${args.muted}
          .persistent=${args.persistent}
          .inline=${args.inline}
          style=${style}></forge-skip-link>
        <div id="main-content" tabindex="0">Target</div>
      </div>
    `;
  },
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        theme: { control: 'select', options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info'] },
        muted: { control: 'boolean' },
        persistent: { control: 'boolean' },
        inline: { control: 'boolean' }
      }
    })
  },
  args: {
    theme: 'default',
    muted: false,
    persistent: false,
    inline: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
