import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/stack';
import '@tylertech/forge/text-field';
import styles from './Stack.scss?inline';

const component = 'forge-stack';

const meta = {
  title: 'Components/Stack',
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div class="stack-container">
        <forge-stack
          .inline=${args.inline}
          .wrap=${args.wrap}
          .stretch=${args.stretch}
          .gap=${args.gap}
          .alignment=${args.alignment}
          .justify=${args.justify}
          style=${style}>
          <div class="box small"></div>
          <div class="box medium"></div>
          <div class="box large"></div>
          <div class="box xlarge"></div>
        </forge-stack>
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
        alignment: { control: 'select', options: ['start', 'center', 'end'] },
        justify: { control: 'select', options: ['start', 'center', 'end'] },
        gap: { control: { type: 'range', min: 0, max: 100, step: 1 } }
      }
    })
  },
  args: {
    inline: false,
    wrap: false,
    stretch: false,
    gap: 16,
    alignment: 'start',
    justify: 'start'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  decorators: [storyStyles(styles)]
};

export const SimpleVerticalForm: Story = {
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <form>
        <forge-stack
          .inline=${args.inline}
          .wrap=${args.wrap}
          .stretch=${args.stretch}
          .gap=${args.gap}
          .alignment=${args.alignment}
          .justify=${args.justify}
          style=${style}>
          <forge-text-field>
            <label for="input-text-1">Text field</label>
            <input type="text" id="input-text-1" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-2">Text field</label>
            <input type="text" id="input-text-2" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-3">Text field</label>
            <input type="text" id="input-text-3" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-4">Text field</label>
            <input type="text" id="input-text-4" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-5">Text field</label>
            <input type="text" id="input-text-5" />
          </forge-text-field>
        </forge-stack>
      </form>
    `;
  }
};

export const ComplexForm: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <form>
      <forge-stack>
        <forge-stack>
          <forge-stack>
            <forge-text-field>
              <label for="input-text-01">Text field</label>
              <input type="text" id="input-text-1" />
            </forge-text-field>
            <forge-stack inline stretch>
              <forge-text-field>
                <label for="input-text-2">Text field</label>
                <input type="text" id="input-text-2" />
              </forge-text-field>
              <forge-text-field>
                <label for="input-text-3">Text field</label>
                <input type="text" id="input-text-3" />
              </forge-text-field>
            </forge-stack>
          </forge-stack>
          <forge-stack inline stretch>
            <forge-stack inline stretch>
              <forge-text-field>
                <input type="text" id="input-text-4" />
                <label for="input-text-4">Text field</label>
              </forge-text-field>
              <forge-text-field>
                <input type="text" id="input-text-5" />
                <label for="input-text-5">Text field</label>
              </forge-text-field>
            </forge-stack>
            <forge-stack inline stretch>
              <forge-text-field>
                <input type="text" id="input-text-6" />
                <label for="input-text-6">Text field</label>
              </forge-text-field>
            </forge-stack>
          </forge-stack>
        </forge-stack>
      </forge-stack>
    </form>
  `
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div class="forge-stack">
      <div class="forge-field">
        <input type="text" placeholder="Text field" />
      </div>
      <div class="forge-stack forge-stack--inline forge-stack--stretch">
        <div class="forge-field">
          <input type="text" placeholder="Text field" />
        </div>
        <div class="forge-field">
          <input type="text" placeholder="Text field" />
        </div>
      </div>
      <div class="forge-stack forge-stack--inline forge-stack--stretch">
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
        </div>
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
        </div>
      </div>
    </div>
  `
};
