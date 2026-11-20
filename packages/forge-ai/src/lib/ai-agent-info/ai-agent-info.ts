import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '../ai-copy-button/ai-copy-button.js';
import styles from './ai-agent-info.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-agent-info': AiAgentInfoComponent;
  }
}

export const AiAgentInfoComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-agent-info';

export interface AgentInfo {
  name?: string;
  description?: string;
  identifier?: string;
  version?: string;
  model?: string;
  lastUpdated?: string;
  threadId?: string;
}

/**
 * @tag forge-ai-agent-info
 *
 * @summary Displays agent information in a grid layout
 */
@customElement(AiAgentInfoComponentTagName)
export class AiAgentInfoComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * Agent information to display
   */
  @property({ type: Object, attribute: false })
  public agentInfo?: AgentInfo;

  public override render(): TemplateResult {
    if (!this.agentInfo) {
      return html`${nothing}`;
    }

    return html`
      <div class="agent-info-container">
        <div class="agent-info-row">
          ${when(
            this.agentInfo.name,
            () => html`
              <div class="forge-label-value">
                <div class="forge-label-value__label">Agent name</div>
                <div class="forge-label-value__value">${this.agentInfo?.name}</div>
              </div>
            `
          )}
          ${when(
            this.agentInfo.version,
            () => html`
              <div class="forge-label-value">
                <div class="forge-label-value__label">Version</div>
                <div class="forge-label-value__value">${this.agentInfo?.version}</div>
              </div>
            `
          )}
        </div>
        ${when(
          this.agentInfo.identifier,
          () =>
            html`<div class="forge-label-value with-copy-button">
              <div class="forge-label-value__label">Agent ID</div>
              <div class="forge-label-value__value">
                <span class="value-text">${this.agentInfo?.identifier}</span>
                <forge-ai-copy-button .value=${this.agentInfo?.identifier as string}></forge-ai-copy-button>
              </div>
            </div>`
        )}
        ${when(
          this.agentInfo.threadId,
          () =>
            html`<div class="forge-label-value with-copy-button">
              <div class="forge-label-value__label">Session ID</div>
              <div class="forge-label-value__value">
                <span class="value-text">${this.agentInfo?.threadId}</span>
                <forge-ai-copy-button .value=${this.agentInfo?.threadId as string}></forge-ai-copy-button>
              </div>
            </div>`
        )}
      </div>
    `;
  }
}
