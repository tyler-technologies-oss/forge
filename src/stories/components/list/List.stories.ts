import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/list';
import '@tylertech/forge/focus-indicator';
import { html, nothing } from 'lit';

const listComponent = 'forge-list';
const listItemComponent = 'forge-list-item';
const wrapText = 'with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.';

const selectAction = action('forge-list-item-select');

const meta = {
  title: 'Components/List',
  render: args => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      const label = args.wrap ? `List item ${i + 1} ${wrapText}` : `List item ${i + 1}`;

      const variant = args.variant === 'button' ? 
        html`<button>${label}</button>` : 
        args.variant === 'anchor' ?
          html`<a href="#" target="_blank">${label}</a>` :
          html`<span>${label}</span>`;

      items.push(
        html`
        <forge-list-item
          value="List item ${i + 1}"
          ?selected=${i === 0 && args.selected}
          @forge-list-item-select=${selectAction}>
          ${variant}
          ${args.twoLine || args.threeLine ? html`<span slot="secondary-text">Secondary text</span>` : nothing}
          ${args.threeLine ? html`<span slot="tertiary-text">Tertiary text</span>` : nothing}
        </forge-list-item>`
      );
    }

    return html`
      <forge-list
        .dense=${args.dense}
        .indented=${args.indented}
        .selectedValue=${args.selectedValue}
        .twoLine=${args.twoLine}
        .threeLine=${args.threeLine}
        .wrap=${args.wrap}>
        ${items}
      </forge-list>
    `;
  },
  component: listComponent,
  subcomponents: {
    ['List Item']: listItemComponent
  },
  argTypes: {
    ...generateCustomElementArgTypes({ 
      tagName: listComponent,
      exclude: ['active', 'noninteractive'],
    }),
    variant: { control: { type: 'select' }, options: ['anchor', 'button', 'static'] },
    ...generateCustomElementArgTypes({
      tagName: listItemComponent,
      exclude: ['active', 'value', 'noninteractive'],
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
