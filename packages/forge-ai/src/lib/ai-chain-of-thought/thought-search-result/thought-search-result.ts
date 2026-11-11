import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../thought-base/thought-base.js';

import styles from './thought-search-result.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thought-search-result': ThoughtSearchResultComponent;
  }
}

export interface Source {
  title: string;
  href: string;
}

export const ThoughtSearchResultComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thought-search-result';

/**
 * @tag forge-ai-thought-search-result
 */
@customElement(ThoughtSearchResultComponentTagName)
export class ThoughtSearchResultComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** The step number for this thought search result */
  @property({ type: Number })
  public step?: number;

  /** Array of sources for the search result */
  @property({ type: Array })
  public sources: Source[] = [];

  public override render(): TemplateResult {
    return html`
      <forge-ai-thought-base step=${ifDefined(this.step)}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
        </svg>
        <slot slot="title" name="title"></slot>
        <slot></slot>
        <div class="sources-container">
          ${this.sources.map(
            source => html`
              <a href="${source.href}" class="source" target="_blank" rel="noopener noreferrer">
                <span>${source.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                  <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z" />
                </svg>
              </a>
            `
          )}
        </div>
      </forge-ai-thought-base>
    `;
  }
}
