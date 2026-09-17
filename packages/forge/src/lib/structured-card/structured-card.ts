import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { hideWhenEmpty } from '../core/utils/lit-utils.js';
import { toggleState, HeadingLevel } from '../core/utils/utils.js';
import { CardComponent } from '../card/index.js';
import { ContentScaffoldComponent } from '../content-scaffold/index.js';

import '../card/card.js';
import '../content-scaffold/content-scaffold.js';

import styles from './structured-card.scss';

export interface IStructuredCardComponent extends BaseLitElement {
  headingLevel: HeadingLevel;
  bodySpacing: 'none' | 'default';
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-structured-card': IStructuredCardComponent;
  }
}

export const STRUCTURED_CARD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-structured-card';

/**
 * @tag forge-structured-card
 *
 * @summary A pre-configured card layout with designated areas for titles, header actions, body content, and footer buttons.
 *
 * @meta extended
 *
 * @dependency forge-card
 * @dependency forge-content-scaffold
 *
 * @slot before-title - Content displayed before the title in the header
 * @slot title - The title content displayed in the header
 * @slot header-actions - Action buttons or controls displayed at the end of the header
 * @slot after-header-actions - Content displayed after the header actions, designed specifically for icon buttons that need to run up against the card edge (ie: menu icon button)
 * @slot body - The main body content of the card
 * @slot footer-start - Content displayed at the start of the footer (e.g., pagination controls)
 * @slot footer-secondary-action - Secondary action button displayed at the end of the footer
 * @slot footer-primary-action - Primary action button displayed at the end of the footer
 *
 * @cssproperty --forge-structured-card-body-height - Controls the height of the body content. Defaults to `auto`.
 *
 * @state body-spacing-none - Applied when the `bodySpacing` property is set to `none`. Used to remove default body padding for full-width content.
 */
@customElement(STRUCTURED_CARD_TAG_NAME)
export class StructuredCardComponent extends BaseLitElement implements IStructuredCardComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = STRUCTURED_CARD_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [CardComponent, ContentScaffoldComponent];

  public static styles = unsafeCSS(styles);

  /**
   * Controls the semantic heading level for the title content. Defaults to `2` (h2).
   * Use this to maintain proper heading hierarchy in your document structure.
   */
  @property({ attribute: 'heading-level', type: Number })
  public headingLevel: HeadingLevel = 2;

  /**
   * Controls the spacing applied to the body section. Defaults to `default`.
   * - `default`: Applies standard padding to the body section.
   * - `none`: Removes padding from the body section for full-width content like tables.
   */
  @property({ attribute: 'body-spacing' })
  public bodySpacing: 'none' | 'default' = 'default';

  @queryAssignedNodes({ slot: 'before-title', flatten: true })
  private readonly _beforeTitleNodes!: Node[];

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('bodySpacing')) {
      toggleState(this.#internals, 'body-spacing-none', this.bodySpacing === 'none');
    }
  }

  public render(): TemplateResult {
    return html`
      <forge-card class="container">
        <forge-content-scaffold>
          <div slot="header" class="header-container" ${hideWhenEmpty()}>
            <div class="title-container">
              <slot name="before-title" @slotchange=${this.#handleSlotChange}></slot>
              <div
                role="heading"
                aria-level=${this.headingLevel}
                id="title"
                class=${classMap({
                  'title-with-margin': this._beforeTitleNodes.length === 0
                })}>
                <slot name="title"></slot>
              </div>
            </div>
            <div class="actions-container" ${hideWhenEmpty()}>
              <slot name="header-actions"></slot>
              <slot name="after-header-actions"></slot>
            </div>
          </div>
          <slot name="body" slot="body"></slot>
          <div class="footer-container" slot="footer" ${hideWhenEmpty()}>
            <div class="footer-start-container">
              <slot name="footer-start"></slot>
            </div>
            <div class="footer-actions" ${hideWhenEmpty()}>
              <slot name="footer-secondary-action"></slot>
              <slot name="footer-primary-action"></slot>
            </div>
          </div>
        </forge-content-scaffold>
      </forge-card>
    `;
  }

  #handleSlotChange(): void {
    this.requestUpdate();
  }
}
