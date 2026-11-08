import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../thought-base/thought-base';

import styles from './thought-image.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thought-image': ThoughtImageComponent;
  }
}

export const ThoughtImageComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thought-image';

/**
 * @tag forge-ai-thought-image
 */
@customElement(ThoughtImageComponentTagName)
export class ThoughtImageComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** The step number for this thought image */
  @property({ type: Number })
  public step?: number;

  public override render(): TemplateResult {
    return html`
      <forge-ai-thought-base step=${ifDefined(this.step)}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path d="M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5.04 9.29-2.75 3.54-1.96-2.36L6.5 17h11z" />
        </svg>
        <slot slot="title" name="title"></slot>
        <div class="image-container">
          <slot name="image"></slot>
        </div>
      </forge-ai-thought-base>
    `;
  }
}
