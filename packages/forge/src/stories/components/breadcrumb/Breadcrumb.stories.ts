import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { tylIconFolder } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/breadcrumb';
import '@tylertech/forge/icon';

const component = 'forge-breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  tags: ['new'],
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `,
  component,
  subcomponents: {
    ['Breadcrumb Item']: 'forge-breadcrumb-item',
    ['Breadcrumb Overflow Menu']: 'forge-breadcrumb-overflow-menu'
  },
  argTypes: {
    ...generateCustomElementArgTypes({ tagName: 'forge-breadcrumb-overflow-menu' }),
    ...generateCustomElementArgTypes({ tagName: 'forge-breadcrumb-item' }),
    ...generateCustomElementArgTypes({ tagName: component })
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const OverflowMenu: Story = {
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `
};

export const WithIcons: Story = {
  render: () => {
    IconRegistry.define(tylIconFolder);
    return html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Section</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Subsection</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Category</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Parent</forge-breadcrumb-item>
        <forge-breadcrumb-item current><forge-icon slot="start" name="folder"></forge-icon>Current page</forge-breadcrumb-item>
      </forge-breadcrumb>
    `;
  }
};

export const WithoutLinks: Story = {
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item>Section</forge-breadcrumb-item>
        <forge-breadcrumb-item>Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item>Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item>Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `
};

export const ScrollButtons: Story = {
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb" scroll-buttons style="max-width: 400px;">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subcategory</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `
};
