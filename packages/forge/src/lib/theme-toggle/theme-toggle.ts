import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconMoonWaningCrescent, tylIconTonality, tylIconWbSunny } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { applyTheme, detectPrefersColorScheme, getStoredTheme } from '../core/utils/theme-utils.js';
import { ButtonToggleComponent } from '../button-toggle/button-toggle/index.js';
import { ButtonToggleGroupComponent } from '../button-toggle/button-toggle-group/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ThemeToggleTheme, ThemeToggleUpdateEventData } from './theme-toggle-constants.js';

import '../button-toggle/button-toggle/button-toggle.js';
import '../button-toggle/button-toggle-group/button-toggle-group.js';
import '../icon/icon.js';

import styles from './theme-toggle.scss';

export interface IThemeToggleComponent extends BaseLitElement {
  groupAriaLabel: string;
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
 * @slot light-label - The text label for the light theme option
 * @slot dark-label - The text label for the dark theme option
 * @slot system-label - The text label for the system theme option
 *
 * @state light - Applied when the effective theme (explicit or system-detected) is light.
 * @state dark - Applied when the effective theme (explicit or system-detected) is dark.
 *
 * @event {CustomEvent<ThemeToggleUpdateEventData>} forge-theme-toggle-update - Fired when the theme changes, either
 * from a user selection or, when `system` is selected, the OS color scheme preference changing. `detail.theme` is
 * the selected mode and is unchanged for OS-driven updates while `system` remains selected; `detail.resolvedTheme`
 * is the actual light/dark theme applied and is always the actionable value.
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

  /** ARIA label for the theme toggle button group. */
  @property({ attribute: 'group-aria-label' })
  public groupAriaLabel = 'Select a theme';

  @state()
  private _theme: ThemeToggleTheme = 'system';

  readonly #internals: ElementInternals;
  readonly #mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this._theme = getStoredTheme();
    applyTheme(this._theme);
    this.#setCssState();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#mediaQuery.addEventListener('change', this.#handleSystemPreferenceChange);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#mediaQuery.removeEventListener('change', this.#handleSystemPreferenceChange);
  }

  readonly #titleSlot = html`<slot name="title" id="theme-toggle-title">Theme</slot>`;
  readonly #lightLabelSlot = html`<slot name="light-label" id="light-label-slot">Light</slot>`;
  readonly #darkLabelSlot = html`<slot name="dark-label" id="dark-label-slot">Dark</slot>`;
  readonly #systemLabelSlot = html`<slot name="system-label" id="system-label-slot">System</slot>`;

  public render(): TemplateResult {
    return html`
      <div class="title">${this.#titleSlot}</div>
      <forge-button-toggle-group aria-label=${this.groupAriaLabel} .value=${this._theme} mandatory @forge-button-toggle-group-change=${this.#handleThemeChange}>
        <forge-button-toggle value="light" id="light-button">
          <forge-icon slot="start" name="wb_sunny"></forge-icon>
          <span>${this.#lightLabelSlot}</span>
        </forge-button-toggle>
        <forge-button-toggle value="dark" id="dark-button">
          <forge-icon slot="start" name="moon_waning_crescent"></forge-icon>
          <span>${this.#darkLabelSlot}</span>
        </forge-button-toggle>
        <forge-button-toggle value="system" id="system-button">
          <forge-icon slot="start" name="tonality"></forge-icon>
          <span>${this.#systemLabelSlot}</span>
        </forge-button-toggle>
      </forge-button-toggle-group>
    `;
  }

  /** Sets the current theme. */
  public setTheme(value: ThemeToggleTheme): void {
    this._theme = value;
    applyTheme(this._theme);
    this.#setCssState();
  }

  #handleThemeChange(evt: CustomEvent<ThemeToggleTheme>): void {
    this._theme = evt.detail;
    this.#setTheme();
  }

  #setTheme(): void {
    applyTheme(this._theme);
    this.#setCssState();
    this.#emitThemeChange(this._theme);
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
        const themeTest = detectPrefersColorScheme();
        toggleState(this.#internals, 'light', themeTest === 'light');
        toggleState(this.#internals, 'dark', themeTest === 'dark');
        break;
      }
    }
  }

  #emitThemeChange(theme: ThemeToggleTheme): void {
    const resolvedTheme = theme === 'system' ? detectPrefersColorScheme() : theme;
    const event = new CustomEvent<ThemeToggleUpdateEventData>('forge-theme-toggle-update', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { theme, resolvedTheme }
    });
    this.dispatchEvent(event);
  }

  #handleSystemPreferenceChange = (): void => {
    if (this._theme === 'system') {
      this.#setTheme();
    }
  };
}
