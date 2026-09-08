import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { toggleState } from '../core/utils/utils.js';
import { FooterItemComponent } from './footer-item/index.js';
import { FooterLayout } from './footer-constants.js';

import './footer-item/footer-item.js';

import styles from './footer.scss';

export interface IFooterComponent extends BaseLitElement {
  layout: FooterLayout;
  layoutBreakpoint: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-footer': IFooterComponent;
  }
}

export const FOOTER_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-footer';

/**
 * @tag forge-footer
 *
 * @summary A footer component for displaying navigation, copyright, and branding information at the bottom of a page.
 *
 * @meta extended
 *
 * @slot - Slot for footer items or custom content.
 * @slot graphic - Slot for footer graphic, such as a logo.
 *
 * @cssproperty --forge-footer-background - Controls the background color of the footer.
 * @cssproperty --forge-footer-on-background - Controls the text color of footer content.
 * @cssproperty --forge-footer-padding - Controls the padding of the footer.
 * @cssproperty --forge-footer-padding-left - Controls the left padding of the footer.
 * @cssproperty --forge-footer-padding-right - Controls the right padding of the footer.
 * @cssproperty --forge-footer-gap - Controls the gap between footer content and graphic in standard layout.
 * @cssproperty --forge-footer-alternative-gap - Controls the gap between stacked elements in alternative layout.
 * @cssproperty --forge-footer-divider-margin - Controls the margin around dividers between footer items.
 *
 * @csspart root - The root container element.
 * @csspart content - The list container for footer items.
 *
 * @state standard - Applied when the layout is set to `standard` or when in `auto` mode above the breakpoint.
 * @state alternative - Applied when the layout is set to `alternative` or when in `auto` mode below the breakpoint.
 * @state auto - Applied when the layout is set to `auto`.
 *
 * @dependency forge-footer-item
 */
@customElement(FOOTER_TAG_NAME)
export class FooterComponent extends BaseLitElement implements IFooterComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = FOOTER_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FooterItemComponent];

  public static styles = unsafeCSS(styles);

  /** Defines the footer layout mode. */
  @property({ type: String })
  public layout: FooterLayout = 'auto';

  /** Width breakpoint in pixels used when layout is set to `auto`. */
  @property({ type: Number, attribute: 'layout-breakpoint' })
  public layoutBreakpoint = 900;

  #internals: ElementInternals;
  #mediaQuery?: MediaQueryList;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'contentinfo' });
    this.#applyLayout();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeMediaQuery();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('layout')) {
      this.#applyLayout();
    }
    if (changedProperties.has('layoutBreakpoint')) {
      this.#applyLayoutBreakpoint();
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="container" part="root">
        <div role="list" class="list" part="content">
          <slot></slot>
        </div>
        <slot name="graphic"></slot>
      </div>
    `;
  }

  #applyLayout(): void {
    if (this.layout === 'auto') {
      this.#setMediaQuery();
      toggleState(this.#internals, 'auto', true);
      return;
    }
    this.#removeMediaQuery();
    toggleState(this.#internals, 'auto', false);
    toggleState(this.#internals, 'standard', this.layout === 'standard');
    toggleState(this.#internals, 'alternative', this.layout === 'alternative');
  }

  #applyLayoutBreakpoint(): void {
    if (this.layout === 'auto') {
      this.#removeMediaQuery();
      this.#setMediaQuery();
    }
  }

  #setMediaQuery(): void {
    this.#mediaQuery = window.matchMedia(`(max-width: ${this.layoutBreakpoint}px)`);
    this.#mediaQuery.addEventListener('change', this.#onMediaChange);
    this.#onMediaChange(this.#mediaQuery);
  }

  #removeMediaQuery(): void {
    this.#mediaQuery?.removeEventListener('change', this.#onMediaChange);
  }

  #onMediaChange = (evt: MediaQueryList | MediaQueryListEvent): void => {
    toggleState(this.#internals, 'alternative', evt.matches);
    toggleState(this.#internals, 'standard', !evt.matches);
  };
}
