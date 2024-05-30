import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/list';

const listComponent = 'forge-list';
const listItemComponent = 'forge-list-item';
const wrapText = 'with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.';

const selectAction = action('forge-list-item-select');

const meta = {
  title: 'Components/List',
  render: args => {
    const list = customElementStoryRenderer(listComponent, args);
    for (let i = 0; i < 4; i++) {
      const item = document.createElement(listItemComponent);
      const primaryText = document.createElement('span');
      const primaryTextLabel = `List item ${i + 1} `;
      item.value = primaryTextLabel;
      if (args.wrap) {
        primaryText.innerHTML = `${primaryTextLabel} ${wrapText}`;
        item.wrap = true;
      } else {
        primaryText.innerHTML = primaryTextLabel;
      }
      if (args.variant === 'button') {
        const button = document.createElement('button');
        button.appendChild(primaryText);
        item.addEventListener('forge-list-item-select', selectAction);
        item.appendChild(button);
      } else if (args.variant === 'anchor') {
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.target = '_blank';
        item.appendChild(anchor);
      } else {
        item.appendChild(primaryText);
      }
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
  argTypes: {
    ...generateCustomElementArgTypes({ 
      tagName: listComponent,
      exclude: ['noninteractive'],
      controls: {
        variant: { control: { type: 'select' }, options: ['anchor', 'button', 'static'] },
      }
    }),
    ...generateCustomElementArgTypes({
      tagName: listItemComponent,
      exclude: ['value', 'noninteractive'],
    })
  },
  args: {
    variant: 'static',
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
