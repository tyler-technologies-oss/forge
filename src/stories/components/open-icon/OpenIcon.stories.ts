import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/open-icon';
import '@tylertech/forge/expansion-panel';

const component = 'forge-open-icon';

const meta = {
  title: 'Components/Open Icon',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        orientation: {
          type: 'string', control: 'select',
          options: ['vertical', 'horizontal', 'vertical-half', 'horizontal-half'],
        },
        rotation: {
          type: 'string', control: 'select',
          options: ['full', 'half'],
        }
      }
    }),
  },
  args: {
    orientation: 'vertical',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Horizontal: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <forge-open-icon orientation="horizontal"></forge-open-icon>
    `;
  },
};

export const ExpansionPanel: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <forge-expansion-panel>
      <div role="button" tabindex="0" slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>Expansion panel</div>
        <forge-open-icon></forge-open-icon>
      </div>
      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo exercitationem minus pariatur debitis nihil at labore!</div>
    </forge-expansion-panel>
    `;
  },
};
