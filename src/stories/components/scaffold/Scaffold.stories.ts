import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/scaffold';
import { styleMap } from 'lit/directives/style-map.js';
import { storyStyles } from 'src/stories/decorators';

import styles from './Scaffold.scss?inline';

const component = 'forge-scaffold';

const meta = {
  title: 'Components/Scaffold',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
    <forge-scaffold class="scaffold-example" style=${style} .viewport=${args.viewport}>
      <div slot="left">left</div>
      <div slot="header">header</div>
      <div slot="body-header">body-header</div>
      <div slot="body-left">body-left</div>
      <div slot="body">body</div>
      <div slot="body-right">body-right</div>
      <div slot="body-footer">body-footer</div>
      <div slot="footer">footer</div>
      <div slot="right">right</div>
    </forge-scaffold>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  decorators: [storyStyles(styles)],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
    }),
  },
  args: {
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
