import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconChevronRight, tylIconFavorite } from '@tylertech/tyler-icons/standard';

import '@tylertech/forge/card';
import '@tylertech/forge/button-area';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/tooltip';

import styles from './ButtonArea.scss?inline';
import { storyStyles } from 'src/stories/decorators';

const component = 'forge-button-area';

IconRegistry.define([
  tylIconFavorite,
  tylIconChevronRight,
]);

const clickAction = action('click');

const meta = {
  title: 'Components/Button Area',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-card>
        <forge-button-area ?disabled=${args.disabled} @click=${clickAction} style=${style}>
          <div class="content">
            <div>
              <div>Heading</div>
              <div>Content</div>
            </div>
            <forge-icon-button>
              <forge-icon role="img" name="favorite" aria-label="A heart graphic"></forge-icon>
              </forge-icon-button>
              <forge-tooltip>Favorite</forge-tooltip>
            <forge-icon name="chevron_right"></forge-icon>
          </div>
        </forge-button-area>
      </forge-card>
    `;
  },
  component,
  decorators: [storyStyles(styles)],
  parameters: {
    actions: { disable: true }
  },
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
