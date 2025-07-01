import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import {
  tylIconCode,
  tylIconFace,
  tylIconFavorite,
  tylIconFolder,
  tylIconHome,
  tylIconInbox,
  tylIconInfo,
  tylIconSettings,
  tylIconStar,
  tylIconForgeLogo
} from '@tylertech/tyler-icons';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
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
const wrapText =
  'with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.';

const selectAction = action('forge-list-item-select');

const meta = {
  title: 'Components/List',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    const items = [];
    for (let i = 0; i < 4; i++) {
      const label = args.wrap ? `List item ${i + 1} ${wrapText}` : `List item ${i + 1}`;

      const variant =
        args.variant === 'button'
          ? html`<button type="button" .disabled=${args.disabled}>${label}</button>`
          : args.variant === 'anchor'
            ? html`<a href="javascript: void(0);">${label}</a>`
            : html`<span>${label}</span>`;

      items.push(html`
        <forge-list-item value="list-item-${i + 1}" ?selected=${i === 0 && args.selected}>
          ${args.withAvatar
            ? html`<forge-avatar slot="start" style="--forge-avatar-background: var(--forge-theme-text-medium);"
                ><forge-icon name="folder"></forge-icon
              ></forge-avatar>`
            : nothing}
          ${args.withStartIcon ? html`<forge-icon slot="start" name="forge_logo"></forge-icon>` : nothing}
          ${args.withStartCheckbox ? html`<forge-checkbox slot="start" aria-label=${`List Item ${i + 1} Start Checkbox`}></forge-checkbox>` : nothing}
          ${args.withStartRadio ? html`<forge-radio name="radios" slot="start" aria-label=${`List Item ${i + 1} Start Radio`}></forge-radio>` : nothing}
          ${args.withStartSwitch ? html`<forge-switch slot="start" aria-label=${`List Item ${i + 1} Start Switch`}></forge-switch>` : nothing} ${variant}
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
  decorators: [
    storyStyles(`
    forge-list {
      max-width: 500px;
    }
  `)
  ],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: listComponent,
      exclude: ['active', 'noninteractive']
    }),
    variant: { control: { type: 'select' }, options: ['anchor', 'button', 'static'] },
    ...generateCustomElementArgTypes({
      tagName: listItemComponent,
      exclude: ['active', 'value', 'noninteractive']
    }),
    selectedValue: {
      control: { type: 'select' },
      options: ['list-item-1', 'list-item-2', 'list-item-3', 'list-item-4']
    },
    disabled: { control: { type: 'boolean' }, if: { arg: 'variant', eq: 'button' } }
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
    selected: false
  }
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
    return html`
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

export const CSSOnly: Story = {
  render: ({
    variant,
    indented,
    wrap,
    dense,
    disabled,
    twoLine,
    threeLine,
    withStartIcon,
    withEndIcon,
    withAvatar,
    withStartCheckbox,
    withEndCheckbox,
    withStartRadio,
    withEndRadio,
    withStartSwitch,
    withEndSwitch,
    selectedValue,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const listClasses = {
      'forge-list': true,
      'forge-list--indented': indented,
      'forge-list--wrap': wrap,
      'forge-list--dense': dense,
      'forge-list--two-line': twoLine,
      'forge-list--three-line': threeLine
    };

    // prettier-ignore
    const forgeIcon = ({ area }: { area: 'start' | 'end' }) => html`<svg class=${classMap({ 'forge-icon': true, 'forge-list-item__start': area === 'start', 'forge-list-item__end': area === 'end' })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Forge design system logo</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>`;
    const checkbox = ({ area, id }: { area: 'start' | 'end'; id: string }) =>
      html`<div class=${classMap({ 'forge-checkbox': true, 'forge-list-item__start': area === 'start', 'forge-list-item__end': area === 'end' })}>
        <input type="checkbox" id=${id} />
        <div class="forge-checkbox__icon"></div>
      </div>`;
    const radio = ({ area, id }: { area: 'start' | 'end'; id: string }) =>
      html`<div class=${classMap({ 'forge-radio': true, 'forge-list-item__start': area === 'start', 'forge-list-item__end': area === 'end' })}>
        <input type="radio" id=${id} name="radios" />
      </div>`;
    const switchEl = ({ area, id }: { area: 'start' | 'end'; id: string }) =>
      html`<div class=${classMap({ 'forge-switch': true, 'forge-list-item__start': area === 'start', 'forge-list-item__end': area === 'end' })}>
        <input type="checkbox" switch id=${id} />
        <div class="forge-switch__thumb">
          <svg class="forge-icon forge-switch__icon forge-switch__icon--off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
          <svg class="forge-icon forge-switch__icon forge-switch__icon--on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>`;

    // prettier-ignore
    return html`
      <div class="list-demo" style=${style}>
        <ul class=${classMap(listClasses)}>
          <li class=${classMap({ 'forge-list-item': true, 'forge-list-item--selected': selectedValue === 'list-item-1' })}>
            ${withStartIcon ? forgeIcon({ area: 'start' }) : nothing}
            ${withStartCheckbox ? checkbox({ area: 'start', id: 'li-cb-1' }) : nothing}
            ${withStartRadio ? radio({ area: 'start', id: 'li-rb-1' }) : nothing}
            ${withStartSwitch ? switchEl({ area: 'start', id: 'li-sw-1' }) : nothing}
            ${variant === 'static' ? html`<span>List Item One</span>` : nothing}
            ${variant === 'button' ? html`<button type="button" .disabled=${disabled}>List Item One</button>` : nothing}
            ${variant === 'anchor' ? html`<a href="javascript: void(0);">List Item One</a>` : nothing}
            ${twoLine || threeLine ? html`<span class="forge-list-item__text">Secondary text</span>` : nothing}
            ${threeLine ? html`<span class="forge-list-item__text">Tertiary text</span>` : nothing}
            ${withEndIcon ? forgeIcon({ area: 'end' }) : nothing}
            ${withEndCheckbox ? checkbox({ area: 'end', id: 'li-cb-1' }) : nothing}
            ${withEndRadio ? radio({ area: 'end', id: 'li-rb-1' }) : nothing}
            ${withEndSwitch ? switchEl({ area: 'end', id: 'li-sw-1' }) : nothing}
          </li>
          <li class=${classMap({ 'forge-list-item': true, 'forge-list-item--selected': selectedValue === 'list-item-2' })}>
            ${withStartIcon ? forgeIcon({ area: 'start' }) : nothing}
            ${withStartCheckbox ? checkbox({ area: 'start', id: 'li-cb-2' }) : nothing}
            ${withStartRadio ? radio({ area: 'start', id: 'li-rb-2' }) : nothing}
            ${withStartSwitch ? switchEl({ area: 'start', id: 'li-sw-2' }) : nothing}
            ${variant === 'static' ? html`<span>List Item Two</span>` : nothing}
            ${variant === 'button' ? html`<button type="button" .disabled=${disabled}>List Item Two</button>` : nothing}
            ${variant === 'anchor' ? html`<a href="javascript: void(0);">List Item Two</a>` : nothing}
            ${twoLine || threeLine ? html`<span class="forge-list-item__text">Secondary text</span>` : nothing}
            ${threeLine ? html`<span class="forge-list-item__text">Tertiary text</span>` : nothing}
            ${withEndIcon ? forgeIcon({ area: 'end' }) : nothing}
            ${withEndCheckbox ? checkbox({ area: 'end', id: 'li-cb-2' }) : nothing}
            ${withEndRadio ? radio({ area: 'end', id: 'li-rb-2' }) : nothing}
            ${withEndSwitch ? switchEl({ area: 'end', id: 'li-sw-2' }) : nothing}
          </li>
          <li class=${classMap({ 'forge-list-item': true, 'forge-list-item--selected': selectedValue === 'list-item-3' })}>
            ${withStartIcon ? forgeIcon({ area: 'start' }) : nothing}
            ${withStartCheckbox ? checkbox({ area: 'start', id: 'li-cb-3' }) : nothing}
            ${withStartRadio ? radio({ area: 'start', id: 'li-rb-3' }) : nothing}
            ${withStartSwitch ? switchEl({ area: 'start', id: 'li-sw-3' }) : nothing}
            ${variant === 'static' ? html`<span>List Item Three</span>` : nothing}
            ${variant === 'button' ? html`<button type="button" .disabled=${disabled}>List Item Three</button>` : nothing}
            ${variant === 'anchor' ? html`<a href="javascript: void(0);">List Item Three</a>` : nothing}
            ${twoLine || threeLine ? html`<span class="forge-list-item__text">Secondary text</span>` : nothing}
            ${threeLine ? html`<span class="forge-list-item__text">Tertiary text</span>` : nothing}
            ${withEndIcon ? forgeIcon({ area: 'end' }) : nothing}
            ${withEndCheckbox ? checkbox({ area: 'end', id: 'li-cb-3' }) : nothing}
            ${withEndRadio ? radio({ area: 'end', id: 'li-rb-3' }) : nothing}
            ${withEndSwitch ? switchEl({ area: 'end', id: 'li-sw-3' }) : nothing}
          </li>
          <li class=${classMap({ 'forge-list-item': true, 'forge-list-item--selected': selectedValue === 'list-item-4' })}>
            ${withStartIcon ? forgeIcon({ area: 'start' }) : nothing}
            ${withStartCheckbox ? checkbox({ area: 'start', id: 'li-cb-4' }) : nothing}
            ${withStartRadio ? radio({ area: 'start', id: 'li-rb-4' }) : nothing}
            ${withStartSwitch ? switchEl({ area: 'start', id: 'li-sw-4' }) : nothing}
            ${variant === 'static' ? html`<span>List Item Four</span>` : nothing}
            ${variant === 'button' ? html`<button type="button" .disabled=${disabled}>List Item Four</button>` : nothing}
            ${variant === 'anchor' ? html`<a href="javascript: void(0);">List Item Four</a>` : nothing}
            ${twoLine || threeLine ? html`<span class="forge-list-item__text">Secondary text</span>` : nothing}
            ${threeLine ? html`<span class="forge-list-item__text">Tertiary text</span>` : nothing}
            ${withEndIcon ? forgeIcon({ area: 'end' }) : nothing}
            ${withEndCheckbox ? checkbox({ area: 'end', id: 'li-cb-4' }) : nothing}
            ${withEndRadio ? radio({ area: 'end', id: 'li-rb-4' }) : nothing}
            ${withEndSwitch ? switchEl({ area: 'end', id: 'li-sw-4' }) : nothing}
          </li>
        </ul>
      </div>
    `;
  }
};
