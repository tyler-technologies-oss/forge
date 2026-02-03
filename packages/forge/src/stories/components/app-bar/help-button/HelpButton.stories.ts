import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../../utils';

import '@tylertech/forge/app-bar';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/divider';
import '@tylertech/forge/open-icon';
import { IMenuOption } from '@tylertech/forge';

const component = 'forge-app-bar-help-button';
const options: IMenuOption[] = [{ label: 'Help', value: 'help' }];

const meta = {
  title: 'Components/App Bar/Help Button',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['options', 'icon']
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    return html`
      <forge-app-bar title-text="Help Icon">
        <forge-app-bar-help-button slot="end" .options=${options}> </forge-app-bar-help-button>
      </forge-app-bar>
    `;
  }
};
