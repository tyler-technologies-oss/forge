import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../../utils';

import '@tylertech/forge/app-bar';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/divider';
import '@tylertech/forge/open-icon';
import { IMenuOption } from '@tylertech/forge';

const component = 'forge-app-bar-menu-button';
const options: IMenuOption[] = [{ label: 'Menu', value: 'help' }];

const meta = {
  title: 'Components/App Bar/Menu Button',
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
  args: {
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <forge-app-bar title-text="Menu Button">
      <forge-app-bar-menu-button slot="start" .options=${options}>
      </forge-app-bar-menu-button>
    </forge-app-bar>
    `;
  },
};
