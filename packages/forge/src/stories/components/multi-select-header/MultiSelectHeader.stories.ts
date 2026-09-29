import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDelete, tylIconDownload, tylIconFileExcel, tylIconFilePdf, tylIconMoreVert } from '@tylertech/tyler-icons';
import type { IMenuOption } from '@tylertech/forge/menu';
import { standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/multi-select-header';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/menu';

IconRegistry.define([tylIconDelete, tylIconDownload, tylIconFileExcel, tylIconFilePdf, tylIconMoreVert]);

const component = 'forge-multi-select-header';

const meta = {
  title: 'Components/Multi Select Header',
  component,
  render: args => {
    const handleSelectAll = action('forge-multi-select-header-select-all');
    const options: IMenuOption[] = [
      { label: 'Export as a PDF', value: 'option-1', icon: 'file_pdf', leadingIconType: 'component' },
      { label: 'Export to Excel', value: 'option-2', icon: 'file_excel', leadingIconType: 'component' }
    ];

    return html`
      <forge-multi-select-header .text=${args.text} .noBorder=${args.noBorder} @forge-multi-select-header-select-all=${handleSelectAll}>
        ${args.selectAllText ? html`<span slot="select-all-button-text">${args.selectAllText}</span>` : ''}
        <forge-icon-button slot="actions" aria-label="Select all items">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="actions" aria-label="Clear selection">
          <forge-icon name="delete"></forge-icon>
        </forge-icon-button>
        <forge-menu slot="actions" .options=${options}>
          <forge-icon-button aria-label="More actions">
            <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </forge-menu>
      </forge-multi-select-header>
    `;
  },
  argTypes: {
    text: { control: 'text' },
    noBorder: { control: 'boolean' },
    selectAllText: { control: 'text' }
  },
  args: {
    text: '3 items selected',
    noBorder: false,
    selectAllText: 'Select All'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const BasicImplementation: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  `
};

export const WithCustomText: Story = {
  ...standaloneStoryParams,
  render: () => html`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>`
};

export const WithSelectAllButton: Story = {
  ...standaloneStoryParams,
  render: () => {
    const handleSelectAll = action('forge-multi-select-header-select-all');

    return html`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=${handleSelectAll}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    `;
  }
};
