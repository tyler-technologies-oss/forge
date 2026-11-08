import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../thought-base/thought-base';

import styles from './thought-detail.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thought-detail': ThoughtDetailComponent;
  }
}

export const ThoughtDetailComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thought-detail';

/**
 * @tag forge-ai-thought-detail
 */
@customElement(ThoughtDetailComponentTagName)
export class ThoughtDetailComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  public override render(): TemplateResult {
    return html`
      <forge-ai-thought-base>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path d="M12 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4" />
        </svg>
        <slot slot="title" name="title"></slot>
        <slot></slot>
      </forge-ai-thought-base>
    `;
  }
}
