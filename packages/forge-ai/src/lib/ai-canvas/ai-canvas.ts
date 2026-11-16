import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { HeadingLevel } from '../types/index.js';

import '../core/tooltip/index.js';

import styles from './ai-canvas.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-canvas': AiCanvasComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-canvas-close': CustomEvent<void>;
  }
}

export const AiCanvasComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-canvas';

/**
 * @tag forge-ai-canvas
 *
 * @summary A side panel that presents an artifact next to a conversation.
 *
 * @description
 * Presentational panel with a titled header, an actions area, a close button, and a scrollable body.
 * The host owns the open/close state and layout; this component only renders the panel chrome and
 * reports close requests.
 *
 * @slot title - Replaces the default title heading
 * @slot actions - Action buttons rendered before the close button
 * @slot - Panel body content
 *
 * @property {string} titleText - Title shown in the panel header. Also names the panel region for assistive technology, including when the `title` slot replaces the heading
 * @property {HeadingLevel} headingLevel - Heading level applied to the default title (default: 2)
 * @property {string} closeLabel - Accessible label and tooltip for the close button (default: 'Close canvas')
 *
 * @cssproperty --forge-ai-canvas-body-padding - Padding around the body content
 * @cssproperty --forge-ai-canvas-border-inline-start - Border on the panel's leading edge (default: 1px solid outline)
 *
 * @event {CustomEvent<void>} forge-ai-canvas-close - Fired when the close button is clicked
 */
@customElement(AiCanvasComponentTagName)
export class AiCanvasComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: 'title-text' })
  public titleText = '';

  @property({ type: Number, attribute: 'heading-level' })
  public headingLevel: HeadingLevel = 2;

  @property({ attribute: 'close-label' })
  public closeLabel = 'Close canvas';

  #closeButtonRef = createRef<HTMLButtonElement>();

  public override focus(): void {
    this.#closeButtonRef.value?.focus();
  }

  #handleCloseClick(): void {
    this.dispatchEvent(new CustomEvent('forge-ai-canvas-close', { bubbles: true, composed: true }));
  }

  get #heading(): TemplateResult {
    const tagName = unsafeStatic(`h${this.headingLevel}`);
    return staticHtml`<${tagName} class="title">${this.titleText}</${tagName}>`;
  }

  public override render(): TemplateResult {
    return html`
      <div class="canvas" role="region" aria-label=${ifDefined(this.titleText || undefined)}>
        <div class="header">
          <div class="header-start">
            <slot name="title">${this.#heading}</slot>
          </div>
          <div class="header-end">
            <slot name="actions"></slot>
            <button
              ${ref(this.#closeButtonRef)}
              id="close-button"
              type="button"
              class="forge-icon-button forge-icon-button--medium close-button"
              aria-label=${this.closeLabel}
              @click=${this.#handleCloseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <forge-ai-tooltip for="close-button" placement="bottom">${this.closeLabel}</forge-ai-tooltip>
          </div>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
