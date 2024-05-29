import { html, render } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/card';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/button';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import './Card.scss';

const component = 'forge-card';

const meta = {
  title: 'Components/Card',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
    }),
  },
  args: {
    raised: false,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?'
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
};

export const Styled: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconMoreVert]);
    return html`
    <div class="demo-card">
      <forge-card>
        <div class="forge-card-header-container">
          <h3 class="forge-typography--headline6">This is the card title</h3>
          <forge-icon-button>
              <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </div>

        <div>
          <p class="forge-typography--body2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
          </p>
        </div>

        <div class="forge-card-footer">
          <div>
            <forge-button>
              Ok
            </forge-button>
            <forge-button>
              Cancel
            </forge-button>
          </div>
        </div>
      </forge-card>
    </div>
  `;
  }
}