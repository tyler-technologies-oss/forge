import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './thought-base.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thought-base': ThoughtBaseComponent;
  }
}

export const ThoughtBaseComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thought-base';

/**
 * @tag forge-ai-thought-base
 *
 * @slot icon - Icon to display in the header
 * @slot title - Title content for the header
 * @slot - Main content area
 */
@customElement(ThoughtBaseComponentTagName)
export class ThoughtBaseComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** The step number for this thought */
  @property({ type: Number })
  public step?: number;

  public override render(): TemplateResult {
    return html`
      <div class="thought-base-container">
        <div class="title-container">
          <slot name="icon"></slot>
          <span class="title"><slot name="title"></slot></span>
        </div>
        <div class="content-container">
          <div class="vertical-line"></div>
          <div class="main-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
