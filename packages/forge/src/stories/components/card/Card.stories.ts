import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import {
  customElementStoryRenderer,
  generateCustomElementArgTypes,
  getCssVariableArgs,
  removeSourceStyleTagParams,
  standaloneStoryParams
} from '../../utils.js';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { storyStyles } from '../../decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/card';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/button';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';

import styles from './Card.scss?inline';

const component = 'forge-card';

const meta = {
  title: 'Components/Card',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    return el;
  },
  component,
  decorators: [storyStyles(styles)],
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {
    raised: false,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Styled: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconMoreVert]);
    return html`
      <div class="demo-card">
        <forge-card>
          <div class="forge-card-header-container">
            <h3 class="forge-typography--heading4">This is the card title</h3>
            <forge-icon-button aria-label="View more actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </div>

          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus
              numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
            </p>
          </div>

          <div class="forge-card-footer">
            <forge-button variant="outlined">Cancel</forge-button>
            <forge-button variant="raised">OK</forge-button>
          </div>
        </forge-card>
      </div>
    `;
  }
};

export const Scaffold: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-card class="scaffold-card">
      <forge-scaffold>
        <forge-toolbar slot="header">
          <h1 slot="start">Lorem ipsum</h1>
        </forge-toolbar>

        <p slot="body" tabindex="0" class="card-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas
          sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <forge-toolbar slot="footer" inverted>
          <forge-button type="outlined" slot="end"> Cancel </forge-button>
          <forge-button type="unelevated" slot="end" style="margin-left: 8px;"> Ok </forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-card>
  `
};

export const CSSOnly: Story = {
  ...removeSourceStyleTagParams,
  render: ({ text, raised, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-card': true,
      'forge-card--raised': raised
    };
    return html` <div class="forge-card" class=${classMap(classes)} style=${style}>${text}</div> `;
  }
};
