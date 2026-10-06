import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/breadcrumb';

const component = 'forge-breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  tags: ['new'],
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
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
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
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

export const Small: Story = {
  render: () => html`
    <forge-breadcrumb aria-label="Breadcrumb" density="small">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `
};
