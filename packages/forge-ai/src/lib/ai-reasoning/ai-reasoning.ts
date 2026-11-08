import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './ai-reasoning.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-reasoning': AiReasoningComponent;
  }
}

export const AiReasoningComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-reasoning';

/**
 * @tag forge-ai-reasoning
 */
@customElement(AiReasoningComponentTagName)
export class AiReasoningComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether the reasoning is expanded */
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  public override render(): TemplateResult {
    return html`
      <slot name="header" @toggle=${this._handleHeaderToggle}></slot>
      <div class="reasoning ${this.expanded ? 'expanded' : ''}">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _handleHeaderToggle(event: CustomEvent): void {
    this.expanded = event.detail.expanded;
  }
}
