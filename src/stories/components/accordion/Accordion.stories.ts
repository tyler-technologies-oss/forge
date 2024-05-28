import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/accordion';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/divider';
import '@tylertech/forge/open-icon';

const component = 'forge-accordion';

const meta = {
  title: 'Components/Accordion',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['panelSelector']
    })
  },
  args: {
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    return html`
    <div style="width: 200px">
      <forge-accordion>
        <forge-expansion-panel>
          <div style="display: flex; justify-content: space-between; align-items: center;" slot="header">
            Panel One 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel One Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div style="display: flex; justify-content: space-between; align-items: center;" slot="header">
            Panel Two 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Two Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div style="display: flex; justify-content: space-between; align-items: center;" slot="header">
            Panel Three 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Three Content</div>
        </forge-expansion-panel>
      </forge-accordion>
  </div>
    `;
  }
};


