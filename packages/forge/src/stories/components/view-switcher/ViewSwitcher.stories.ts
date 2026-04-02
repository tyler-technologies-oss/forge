import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/view-switcher';
import '@tylertech/forge/view-switcher/view';
import '@tylertech/forge/tabs';
import { IViewSwitcherComponent } from '@tylertech/forge/view-switcher';
import { createRef, ref } from 'lit/directives/ref.js';

import style from './ViewSwitcher.scss?inline';
import { storyStyles } from '../../decorators.js';

const component = 'forge-view-switcher';

const meta = {
  title: 'Components/View Switcher',
  render: args => {
    const popoverRef = createRef<IViewSwitcherComponent>();

    function handleTabChange(event: CustomEvent): void {
      if (popoverRef.value === undefined) {
        return;
      }
      popoverRef.value.index = event.detail.index;
    }

    return html`
      <forge-tab-bar active-tab="0" @forge-tab-bar-change=${handleTabChange}>
        <forge-tab>Tab 1</forge-tab>
        <forge-tab>Tab 2</forge-tab>
        <forge-tab>Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-view-switcher ${ref(popoverRef)} .animationType=${args.animationType} style=${style}>
        <forge-view name="view1" .selected=${true}>View 1</forge-view>
        <forge-view name="view2">View 2</forge-view>
        <forge-view name="view3">View 3</forge-view>
      </forge-view-switcher>
    `;
  },
  component,
  subcomponents: {
    View: 'forge-view'
  },
  parameters: {
    actions: { disable: true }
  },
  decorators: [storyStyles(style)],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['index'],
      controls: {
        animationType: {
          control: 'select',
          options: ['none', 'slide', 'fade']
        }
      }
    })
  },
  args: {
    animationType: 'none'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
