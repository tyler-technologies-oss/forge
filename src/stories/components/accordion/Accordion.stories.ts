import { type Meta, type StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storyStyles } from '../../decorators';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/accordion';
import '@tylertech/forge/divider';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/open-icon';
import styles from './Accordion.scss?inline';

const component = 'forge-accordion';

const meta = {
  title: 'Components/Accordion',
  render: args => customElementStoryRenderer(component, args),
  component,
  decorators: [storyStyles(styles)],
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
      <forge-accordion>
        <forge-expansion-panel>
          <div  slot="header">
            Panel One 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel One Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Two 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Two Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Three 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Three Content</div>
        </forge-expansion-panel>
      </forge-accordion>
    `;
  }
};


