import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconMoonWaningCrescent, tylIconTonality, tylIconWbSunny } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { ButtonToggleComponent } from '../button-toggle/button-toggle/index.js';
import { ButtonToggleGroupComponent } from '../button-toggle/button-toggle-group/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ThemeToggleTheme, ThemeToggleUpdateEventData } from './theme-toggle-constants.js';

import '../button-toggle/button-toggle/button-toggle.js';
import '../button-toggle/button-toggle-group/button-toggle-group.js';
import '../icon/icon.js';

import styles from './theme-toggle.scss';

const LOCAL_STORAGE_KEY = '.forge-theme';
const THEME_ATTRIBUTE = 'data-forge-theme';

export interface IThemeToggleComponent extends BaseLitElement {
  setTheme(value: ThemeToggleTheme): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-theme-toggle': IThemeToggleComponent;
  }

  interface HTMLElementEventMap {
    'forge-theme-toggle-update': CustomEvent<ThemeToggleUpdateEventData>;
  }
}

export const THEME_TOGGLE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-theme-toggle';

/**
 * @tag forge-theme-toggle
 *
 * @summary A light/dark/system theme toggle that persists the user's choice to local storage and reflects it via the `data-forge-theme` attribute on the document element.
 *
 * @meta extended
 *
 * @dependency forge-button-toggle-group
 * @dependency forge-button-toggle
 * @dependency forge-icon
 *
 * @slot title - The title shown above the toggle buttons
 *
 * @state light - Applied when the effective theme (explicit or system-detected) is light.
 * @state dark - Applied when the effective theme (explicit or system-detected) is dark.
 *
 * @event {CustomEvent<ThemeToggleUpdateEventData>} forge-theme-toggle-update - Fired when the theme is changed.
 */
@customElement(THEME_TOGGLE_TAG_NAME)
export class ThemeToggleComponent extends BaseLitElement implements IThemeToggleComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = THEME_TOGGLE_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonToggleGroupComponent, ButtonToggleComponent, IconComponent];

  static {
    IconRegistry.define([tylIconWbSunny, tylIconMoonWaningCrescent, tylIconTonality]);
  }

  public static styles = unsafeCSS(styles);

  @state()
  private _theme: ThemeToggleTheme = 'system';

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this._theme = (window.localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeToggleTheme) ?? 'system';
    if (this._theme === 'system') {
      this.#setThemeLocalStorage(this._theme);
    }
    this.#setAttributeOnHtmlEl();
    this.#setCssState();
  }

  readonly #titleSlot = html`<slot name="title" id="theme-toggle-title">Theme</slot>`;

  public render(): TemplateResult {
    return html`
      <div class="title">${this.#titleSlot}</div>
      <forge-button-toggle-group aria-label="Select a theme" .value=${this._theme} mandatory @forge-button-toggle-group-change=${this.#handleThemeChange}>
        <forge-button-toggle value="light" id="light-button">
          <forge-icon slot="start" name="wb_sunny"></forge-icon>
          <span>Light</span>
        </forge-button-toggle>
        <forge-button-toggle value="dark" id="dark-button">
          <forge-icon slot="start" name="moon_waning_crescent"></forge-icon>
          <span>Dark</span>
        </forge-button-toggle>
        <forge-button-toggle value="system" id="system-button">
          <forge-icon slot="start" name="tonality"></forge-icon>
          <span>System</span>
        </forge-button-toggle>
      </forge-button-toggle-group>
    `;
  }

  /** Sets the current theme. */
  public setTheme(value: ThemeToggleTheme): void {
    this._theme = value;
    this.#setAttributeOnHtmlEl();
    this.#setCssState();
    this.#setThemeLocalStorage(this._theme);
  }

  #handleThemeChange(evt: CustomEvent<ThemeToggleTheme>): void {
    this._theme = evt.detail;
    this.#setTheme();
  }

  #setTheme(): void {
    this.#setAttributeOnHtmlEl();
    this.#setCssState();
    this.#setThemeLocalStorage(this._theme);
    this.#emitThemeChange(this._theme);
  }

  #setAttributeOnHtmlEl(): void {
    const htmlEl = document.documentElement;
    if (this._theme === 'system') {
      htmlEl.setAttribute(THEME_ATTRIBUTE, this.#detectPrefersColorScheme());
      return;
    }
    htmlEl.setAttribute(THEME_ATTRIBUTE, this._theme);
  }

  #setCssState(): void {
    switch (this._theme) {
      case 'light':
        toggleState(this.#internals, 'light', true);
        toggleState(this.#internals, 'dark', false);
        break;
      case 'dark':
        toggleState(this.#internals, 'dark', true);
        toggleState(this.#internals, 'light', false);
        break;
      case 'system': {
        const themeTest = this.#detectPrefersColorScheme();
        toggleState(this.#internals, 'light', themeTest === 'light');
        toggleState(this.#internals, 'dark', themeTest === 'dark');
        break;
      }
    }
  }

  #setThemeLocalStorage(theme: string): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }

  #emitThemeChange(theme: ThemeToggleTheme): void {
    const event = new CustomEvent<ThemeToggleUpdateEventData>('forge-theme-toggle-update', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { theme }
    });
    this.dispatchEvent(event);
  }

  #detectPrefersColorScheme(): ThemeToggleTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
