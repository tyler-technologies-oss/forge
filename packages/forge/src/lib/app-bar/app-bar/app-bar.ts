import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, nothing, TemplateResult, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { IBaseComponent } from '../../core/base/base-component.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { createHideRef, hideWhenEmpty, removeDefaultAttribute, removeEmptyAttribute } from '../../core/utils/lit-utils.js';
import { APP_BAR_CONSTANTS, AppBarElevation, AppBarTheme, AppBarThemeMode } from './app-bar-constants.js';

import styles from './app-bar.scss';

/** @deprecated - This will be removed in the future. Please switch to using AppBarComponent. */
export interface IAppBarComponent extends IBaseComponent {
  titleText: string;
  elevation: AppBarElevation;
  theme: AppBarTheme;
  themeMode: AppBarThemeMode;
  href: string;
  target: string;
}

/**
 * @tag forge-app-bar
 *
 * @summary App bars are headers used to display branding, navigation, and actions at the top of an application. They typically contain a logo, title, and various action items.
 *
 * @cssproperty --forge-app-bar-background - The background color of the app bar.
 * @cssproperty --forge-app-bar-foreground - The text color of the app bar.
 * @cssproperty --forge-app-bar-theme-foreground - The text color of the app bar when using the **scoped theme mode**.
 * @cssproperty --forge-app-bar-theme-foreground-muted - The muted text color of the app bar when using the **scoped theme mode**.
 * @cssproperty --forge-app-bar-z-index - The `z-index` of the app bar.
 * @cssproperty --forge-app-bar-elevation - The elevation of the app bar.
 * @cssproperty --forge-app-bar-height - The height of the app bar.
 * @cssproperty --forge-app-bar-row-padding - The inline padding of the app bar.
 * @cssproperty --forge-app-bar-logo-gap - The space between the logo and title.
 * @cssproperty --forge-app-bar-title-padding - The padding around the title element.
 * @cssproperty --forge-app-bar-columns - The grid column track sizes.
 * @cssproperty --forge-app-bar-transition-duration - The transition duration for animations.
 * @cssproperty --forge-app-bar-transition-timing - The transition timing function for animations.
 *
 * @event {CustomEvent<void>} forge-app-bar-navigate - Fires when the app bar is clicked.
 *
 * @csspart root - The root container element.
 * @csspart title - The title element.
 *
 * @slot logo - Reserved for the brand logo.
 * @slot title - Reserved for the application title. This will overwrite the `titleText` property/attribute.
 * @slot start - Places content at the beginning of the app bar.
 * @slot center - Places content in the center of the app bar.
 * @slot end - Places content at the end of the app bar.
 *
 * @cssclass forge-app-bar - The app bar container element _(required)_.
 * @cssclass forge-app-bar--scoped - Sets the theme mode to scoped.
 * @cssclass forge-app-bar-theme - Applies the scoped theme from the app bar to the element.
 * @cssclass forge-app-bar--raised - The app bar container element when raised.
 * @cssclass forge-app-bar__logo - The logo container element.
 * @cssclass forge-app-bar__title - The title container element.
 * @cssclass forge-app-bar__logo-title-container - The container for the logo and title.
 * @cssclass forge-app-bar__section - A section of the app bar.
 * @cssclass forge-app-bar__section-start - The start section of the app bar.
 * @cssclass forge-app-bar__section-center - The center section of the app bar.
 * @cssclass forge-app-bar__section-end - The end section of the app bar.
 */
@customElement(APP_BAR_CONSTANTS.elementName)
export class AppBarComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = APP_BAR_CONSTANTS.elementName;

  #internals: ElementInternals;

  /**
   * The text to display in the title.
   * @default ''
   * @attribute title-text
   */
  @property({ attribute: 'title-text', reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public titleText = '';

  /**
   * The elevation of the app bar.
   * @default 'raised'
   * @attribute elevation
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public elevation: AppBarElevation = 'raised';

  /**
   * The theme of the app bar.
   * @default ''
   * @attribute theme
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public theme: AppBarTheme = '';

  /**
   * The href that will be used to make the logo and title area a clickable link.
   * @default ''
   * @attribute href
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public href = '';

  /**
   * The `<a>` target of the logo + title area link when `href` is set.
   * @default ''
   * @attribute target
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public target = '';

  /**
   * Controls how the theme is applied. `inherit` will apply the global theme to the app bar and all child components. `scoped` will only apply the theme to the app bar and not set any global tokens.
   * @default 'inherit'
   * @attribute theme-mode
   */
  @property({ attribute: 'theme-mode', reflect: true, converter: { toAttribute: (value: AppBarThemeMode) => removeDefaultAttribute(value, 'inherit') } })
  public themeMode: AppBarThemeMode = 'inherit';

  #centerSlotHideRef = createHideRef();

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'banner' });
  }

  public render(): TemplateResult {
    const rootClasses = {
      'forge-app-bar': true,
      'no-center': this.#centerSlotHideRef.hidden,
      white: this.theme === 'white',
      scoped: this.themeMode === 'scoped',
      raised: this.elevation === 'raised'
    };
    return html`
      <div class=${classMap(rootClasses)} part="root">
        <div class="row">
          <div class="section">
            <slot name="start"></slot>
            ${this.href ? this.#renderAnchorTitleConatiner() : this.#renderDivTitleContainer()}
          </div>
          <div id="center-section" class="section" ${hideWhenEmpty(this.#centerSlotHideRef)}>
            <slot name="center"></slot>
          </div>
          <div class="section">
            <slot name="end"></slot>
          </div>
        </div>
        <div>
          <slot name="bottom"></slot>
        </div>
      </div>
    `;
  }

  #renderDivTitleContainer(): TemplateResult {
    return html`
      <div class="logo-title-container">
        <slot name="logo"></slot>
        <slot name="title">${this.titleText ? this.#renderTitle() : nothing}</slot>
      </div>
    `;
  }

  #renderAnchorTitleConatiner(): TemplateResult {
    return html`
      <a class="logo-title-container" href="${this.href}" target="${this.target}" @click="${{ handleEvent: this.#handleHrefClick.bind(this), capture: true }}">
        <slot name="logo"></slot>
        <slot name="title">${this.titleText ? this.#renderTitle() : nothing}</slot>
        <forge-state-layer></forge-state-layer>
        <forge-focus-indicator .inward=${true}></forge-focus-indicator>
      </a>
    `;
  }

  #renderTitle(): TemplateResult {
    return html`<h1 class="title" part="title">${this.titleText}</h1>`;
  }

  #handleHrefClick(evt: Event): void {
    const event = new CustomEvent(APP_BAR_CONSTANTS.events.NAVIGATE, {
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      evt.preventDefault();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar': IAppBarComponent;
  }

  interface HTMLElementEventMap {
    'forge-app-bar-navigate': CustomEvent<void>;
  }
}
