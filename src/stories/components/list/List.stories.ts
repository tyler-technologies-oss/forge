import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { tylIconCode, tylIconFace, tylIconFavorite, tylIconFolder, tylIconHome, tylIconInbox, tylIconInfo, tylIconSettings, tylIconStar } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { styleMap } from 'lit/directives/style-map.js';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/list';
import '@tylertech/forge/drawer/drawer';
import '@tylertech/forge/icon';
import '@tylertech/forge/avatar';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/radio';
import '@tylertech/forge/switch';
import '@tylertech/forge/expansion-panel';

IconRegistry.define([
  tylIconHome,
  tylIconInbox,
  tylIconStar,
  tylIconSettings,
  tylIconForgeLogo,
  tylIconInfo,
  tylIconFolder,
  tylIconCode,
  tylIconFace,
  tylIconFavorite
]);

const listComponent = 'forge-list';
const listItemComponent = 'forge-list-item';
const wrapText = 'with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.';

const selectAction = action('forge-list-item-select');

const meta = {
  title: 'Components/List',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    const items = [];
    for (let i = 0; i < 4; i++) {
      const label = args.wrap ? `List item ${i + 1} ${wrapText}` : `List item ${i + 1}`;

      const variant = args.variant === 'button' ? 
        html`<button type="button" .disabled=${args.disabled}>${label}</button>` : 
        args.variant === 'anchor' ?
          html`<a href="javascript: void(0);">${label}</a>` :
          html`<span>${label}</span>`;

      items.push(html`
        <forge-list-item
          value="list-item-${i + 1}"
          ?selected=${i === 0 && args.selected}>
          ${args.withAvatar ? html`<forge-avatar slot="start" style="--forge-avatar-background: var(--forge-theme-text-medium);"><forge-icon name="folder"></forge-icon></forge-avatar>` : nothing}
          ${args.withStartIcon ? html`<forge-icon slot="start" name="forge_logo"></forge-icon>` : nothing}
          ${args.withStartCheckbox ? html`<forge-checkbox slot="start" aria-label=${`List Item ${i + 1} Start Checkbox`}></forge-checkbox>` : nothing}
          ${args.withStartRadio ? html`<forge-radio name="radios" slot="start" aria-label=${`List Item ${i + 1} Start Radio`}></forge-radio>` : nothing}
          ${args.withStartSwitch ? html`<forge-switch slot="start" aria-label=${`List Item ${i + 1} Start Switch`}></forge-switch>` : nothing}
          ${variant}
          ${args.twoLine || args.threeLine ? html`<span slot="secondary-text">Secondary text</span>` : nothing}
          ${args.threeLine ? html`<span slot="tertiary-text">Tertiary text</span>` : nothing}
          ${args.withEndIcon ? html`<forge-icon slot="end" name="info"></forge-icon>` : nothing}
          ${args.withEndCheckbox ? html`<forge-checkbox slot="end" aria-label=${`List Item ${i + 1} End Checkbox`}></forge-checkbox>` : nothing}
          ${args.withEndRadio ? html`<forge-radio name="radios" slot="end" aria-label=${`List Item ${i + 1} End Radio`}></forge-radio>` : nothing}
          ${args.withEndSwitch ? html`<forge-switch slot="end" aria-label=${`List Item ${i + 1} End Switch`}></forge-switch>` : nothing}
        </forge-list-item>
      `);
    }

    return html`
      <forge-list
        .dense=${args.dense}
        .indented=${args.indented}
        .selectedValue=${args.selectedValue}
        .twoLine=${args.twoLine}
        .threeLine=${args.threeLine}
        .wrap=${args.wrap}
        style=${style}
        @forge-list-item-select=${selectAction}>
        ${items}
      </forge-list>
    `;
  },
  component: listComponent,
  subcomponents: {
    ['List Item']: listItemComponent
  },
  decorators: [storyStyles(`
    forge-list {
      max-width: 500px;
    }
  `)],
  argTypes: {
    ...generateCustomElementArgTypes({ 
      tagName: listComponent,
      exclude: ['active', 'noninteractive'],
    }),
    variant: { control: { type: 'select' }, options: ['anchor', 'button', 'static'] },
    ...generateCustomElementArgTypes({
      tagName: listItemComponent,
      exclude: ['active', 'value', 'noninteractive'],
    }),
    selectedValue: { control: { type: 'select' }, options: ['list-item-1', 'list-item-2', 'list-item-3', 'list-item-4']},
    disabled: { control: { type: 'boolean' }, if: { arg: 'variant', eq: 'button' }},
  },
  args: {
    // Demo args
    variant: 'static',
    withStartIcon: false,
    withEndIcon: false,
    withAvatar: false,
    withStartCheckbox: false,
    withEndCheckbox: false,
    withStartRadio: false,
    withEndRadio: false,
    withStartSwitch: false,
    withEndSwitch: false,
    disabled: false,

    // List/List Item args
    dense: false,
    indented: false,
    twoLine: false,
    threeLine: false,
    wrap: false,
    selected: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
export const Interactive: Story = {
  args: { variant: 'button' }
};
export const WithAnchor: Story = {
  args: { variant: 'anchor' }
};
export const NavigationMenu: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <forge-drawer>
        <aside>
          <forge-list navlist>
            <forge-list-item>
              <forge-icon slot="start" name="home"></forge-icon>
              <a href="javascript: void(0);">Home</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="inbox"></forge-icon>
              <a href="javascript: void(0);">Inbox</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="star"></forge-icon>
              <a href="javascript: void(0);">Starred</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="settings"></forge-icon>
              <a href="javascript: void(0);">Settings</a>
            </forge-list-item>
          </forge-list>
        </aside>
      </forge-drawer>
    `;
  }
};

export const Expandable: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html `
      <forge-list>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="code"></forge-icon>
            <button type="button">List Item One</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="face"></forge-icon>
            <button type="button">List Item Two</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-list-item>
          <forge-icon slot="start" name="favorite"></forge-icon>
          <button type="button">List Item Three</button>
        </forge-list-item>
      </forge-list>
    `;
  }
};
