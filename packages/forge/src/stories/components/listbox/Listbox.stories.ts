import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { IconRegistry } from '@tylertech/forge/icon';
import { IListboxDropData, ListboxComponent } from '@tylertech/forge/listbox';
import { tylIconHome, tylIconPerson, tylIconSettings } from '@tylertech/tyler-icons';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/listbox';
import '@tylertech/forge/option';
import '@tylertech/forge/icon';
import '@tylertech/forge/card';

IconRegistry.define([tylIconHome, tylIconSettings, tylIconPerson]);

const component = 'forge-listbox';

const changeAction = action('change');
const dragOutAction = action('forge-listbox-drag-out');
const dropAction = action('forge-listbox-drop');

function handleListboxDrop(event: CustomEvent<IListboxDropData>): void {
  dropAction(event.detail);

  const targetListbox = event.target as ListboxComponent;
  const target = event.detail.group ?? targetListbox;
  const elementAtIndex = target.children[event.detail.index];
  const option = event.detail.option;

  if (elementAtIndex === option) {
    return;
  }

  option.parentElement?.removeChild(option);
  target.insertBefore(option, elementAtIndex);
}

const meta = {
  title: 'Components/Listbox',
  tags: ['new'],
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-listbox
        .multiple=${args.multiple}
        .disabled=${args.disabled}
        .readonly=${args.readonly}
        .dense=${args.dense}
        .allowDeselect=${args.allowDeselect}
        style=${style}
        @change=${changeAction}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
      </forge-listbox>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['value', 'name', 'required', 'dragOut', 'dropFrom', 'dropFromElements', 'reorderable', 'labels', 'form']
    })
  },
  args: {
    multiple: false,
    disabled: false,
    readonly: false,
    dense: false,
    allowDeselect: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Multiple: Story = {
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
};

export const Dense: Story = {
  ...standaloneStoryParams,
  args: {
    dense: true
  }
};

export const WithOptionGroups: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  `
};

export const WithIcons: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  `
};

export const Reorderable: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox reorderable @forge-listbox-drop=${handleListboxDrop}>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2">Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  `
};

export const DragAndDrop: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" @forge-listbox-drag-out=${dragOutAction} @forge-listbox-drop=${handleListboxDrop}>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-1" drag-out drop-from="drag-and-drop-2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      </forge-card>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-2" drag-out drop-from="drag-and-drop-1">
          <forge-option value="a">Option A</forge-option>
          <forge-option value="b">Option B</forge-option>
          <forge-option value="c">Option C</forge-option>
        </forge-listbox>
      </forge-card>
    </div>
  `
};

export const Disabled: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-listbox>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2" disabled>Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  `
};
