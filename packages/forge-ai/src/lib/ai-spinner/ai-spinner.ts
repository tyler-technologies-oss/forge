import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './ai-spinner.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-spinner': AiSpinnerComponent;
  }
}

export const AiSpinnerComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-spinner';

export type SpinnerSize = 'extra-small' | 'small' | 'medium' | 'large';

/**
 * @tag forge-ai-spinner
 *
 * @summary Indeterminate circular progress indicator.
 *
 * @description
 * A spinner component that displays an animated circular progress indicator. Used to indicate loading states.
 *
 * @cssproperty --forge-ai-spinner-color - Color of the spinner indicator
 * @cssproperty --forge-ai-spinner-track-color - Color of the spinner track
 */
@customElement(AiSpinnerComponentTagName)
export class AiSpinnerComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: String })
  public size: SpinnerSize = 'medium';

  public override render(): TemplateResult {
    return html`
      <div class="spinner spinner--${this.size}">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle class="track" cx="24" cy="24" r="20" fill="none" stroke-width="4"></circle>
          <circle class="indicator" cx="24" cy="24" r="20" fill="none" stroke-width="4"></circle>
        </svg>
      </div>
    `;
  }
}
