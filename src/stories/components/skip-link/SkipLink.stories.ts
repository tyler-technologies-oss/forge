import { type Meta, type StoryObj } from '@storybook/web-components';
import { html, nothing, render } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/skip-link';
import styles from './SkipLink.scss?inline';

const component = 'forge-skip-link';

const meta = {
  title: 'Components/Skip Link',
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-skip-link .target=${args.target} .theme=${args.theme} .muted=${args.muted} .persistent=${args.persistent} style=${style}></forge-skip-link>
    `;
  },
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        target: { control: 'text' },
        theme: { control: 'select', options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info'] },
        muted: { control: 'boolean' },
        persistent: { control: 'boolean' }
      }
    })
  },
  args: {
    target: 'main-content',
    theme: 'default',
    muted: false,
    persistent: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
