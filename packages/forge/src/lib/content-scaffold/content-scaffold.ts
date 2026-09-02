import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, queryAssignedNodes } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { hideWhenEmpty } from '../core/utils/lit-utils.js';

import styles from './content-scaffold.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-content-scaffold': ContentScaffoldComponent;
  }
}

export const CONTENT_SCAFFOLD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-content-scaffold';

/**
 * @tag forge-content-scaffold
 *
 * @summary A layout primitive that organizes content into a header, body, and footer, where the header and footer size to their content and the body expands to fill the remaining space.
 *
 * @meta extended
 *
 * @slot header - Full-width header content. When used, the multi-slot header layout (header-start, header-end, before-header-start) will be hidden.
 * @slot before-header-start - Content displayed before the header start slot. Only shown when the `header` slot is empty.
 * @slot header-start - Content displayed at the start of the header section. Only shown when the `header` slot is empty.
 * @slot header-end - Content displayed at the end of the header section. Only shown when the `header` slot is empty.
 * @slot body - The main body content that expands to fill available space.
 * @slot footer - Full-width footer content. When used, the multi-slot footer layout (footer-start, footer-end) will be hidden.
 * @slot footer-start - Content displayed at the start of the footer section. Only shown when the `footer` slot is empty.
 * @slot footer-end - Content displayed at the end of the footer section. Only shown when the `footer` slot is empty.
 *
 * @cssproperty --forge-content-scaffold-header-height - Controls the height of the header section. Defaults to `auto`.
 * @cssproperty --forge-content-scaffold-header-background - Controls the background color of the header section. Defaults to `transparent`.
 * @cssproperty --forge-content-scaffold-header-min-height - Controls the minimum height of the header section. Defaults to `48px`.
 * @cssproperty --forge-content-scaffold-body-height - Controls the height of the body section. Defaults to `auto`.
 * @cssproperty --forge-content-scaffold-body-padding-inline - Controls the inline-padding applied to the body section. Defaults to Forge's medium spacing token.
 * @cssproperty --forge-content-scaffold-footer-height - Controls the height of the footer section. Defaults to `auto`.
 * @cssproperty --forge-content-scaffold-footer-background - Controls the background color of the footer section. Defaults to `transparent`.
 * @cssproperty --forge-content-scaffold-footer-min-height - Controls the minimum height of the footer section. Defaults to `48px`.
 * @cssproperty --forge-content-scaffold-footer-full-padding - Controls the padding applied to full-width footer content. Defaults to Forge's small spacing token.
 */
@customElement(CONTENT_SCAFFOLD_TAG_NAME)
export class ContentScaffoldComponent extends BaseLitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CONTENT_SCAFFOLD_TAG_NAME;

  public static styles = unsafeCSS(styles);

  @queryAssignedNodes({ slot: 'header', flatten: true })
  private readonly _slottedHeaderNodes!: Node[];

  @queryAssignedNodes({ slot: 'footer', flatten: true })
  private readonly _slottedFooterNodes!: Node[];

  get #headerSlot(): TemplateResult {
    return html`<slot name="header" @slotchange=${this.#handleSlotChange}></slot>`;
  }

  get #footerSlot(): TemplateResult {
    return html`<slot name="footer" @slotchange=${this.#handleSlotChange}></slot>`;
  }

  get #headerContent(): TemplateResult {
    const hasFullWidthHeader = this._slottedHeaderNodes.length > 0;
    return when(
      hasFullWidthHeader,
      () => html`<div class="header-full-content">${this.#headerSlot}</div>`,
      () => html`
        <div class="header" ${hideWhenEmpty()}>
          <div class="header-start-container">
            <div ${hideWhenEmpty()}>
              <slot name="before-header-start"></slot>
            </div>
            <slot name="header-start"></slot>
          </div>
          <div class="header-end" ${hideWhenEmpty()}>
            <slot name="header-end"></slot>
          </div>
        </div>
        ${this.#headerSlot}
      `
    );
  }

  get #footerContent(): TemplateResult {
    const hasFullWidthFooter = this._slottedFooterNodes.length > 0;
    return when(
      hasFullWidthFooter,
      () => html`<div class="footer-full-content">${this.#footerSlot}</div>`,
      () => html`
        <div class="footer" ${hideWhenEmpty()}>
          <div class="footer-start" ${hideWhenEmpty()}>
            <slot name="footer-start"></slot>
          </div>
          <div class="footer-end" ${hideWhenEmpty()}>
            <slot name="footer-end"></slot>
          </div>
        </div>
        ${this.#footerSlot}
      `
    );
  }

  public render(): TemplateResult {
    return html`
      <div class="outer-container" @slotchange=${this.#handleSlotChange}>
        ${this.#headerContent}
        <div class="body" ${hideWhenEmpty()}>
          <div class="body-inner">
            <slot name="body"></slot>
          </div>
        </div>
        ${this.#footerContent}
      </div>
    `;
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (['header', 'footer'].includes(slotName)) {
      this.requestUpdate();
    }
  }
}
