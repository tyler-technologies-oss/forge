import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/list';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/state-layer';

const listComponent = 'forge-list';
const listItemComponent = 'forge-list-item';
const wrapText = 'with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.';

const meta = {
  title: 'Components/List',
  render: args => {
    const list = customElementStoryRenderer(listComponent, args);
    for (let i = 0; i < 4; i++) {
      const item = document.createElement(listItemComponent);
      const primaryText = document.createElement('span');
      const primaryTextLabel = `List item ${i + 1}`;
      if (args.wrap) {
        primaryText.innerHTML = `${primaryTextLabel} ${wrapText}`;
        item.wrap = true;
      } else {
        primaryText.innerHTML = primaryTextLabel;
      }
      item.appendChild(primaryText);
      if (args.twoLine || args.threeLine) {
        const secondaryText = document.createElement('span');
        secondaryText.slot = 'secondary-text';
        secondaryText.innerHTML = 'Secondary text';
        item.appendChild(secondaryText);
      } 
      if (args.threeLine) {
        const tertiaryText = document.createElement('span');
        tertiaryText.slot = 'tertiary-text';
        tertiaryText.innerHTML = 'Tertiary text';
        item.appendChild(tertiaryText);
      }
      list.appendChild(item);
    }
    return list;
  },
  component: listComponent,
  subcomponents: {
    ['List Item']: listItemComponent
  },
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({ 
      tagName: listComponent,
      exclude: ['selectedValue', 'noninteractive']
    }),
    ...generateCustomElementArgTypes({
      tagName: listItemComponent,
      exclude: ['selected', 'active', 'value', 'noninteractive']
    
    })
  },
  args: {
    dense: false,
    indented: false,
    twoLine: false,
    threeLine: false,
    wrap: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
