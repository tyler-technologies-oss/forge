import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IToolRenderer, ToolCall } from '../../types/index.js';
import type { AiStep } from '../../ai-steps/index.js';

import '../../ai-steps/ai-steps.js';

import styles from './ai-steps.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-tool-steps': StepsToolElement;
  }
}

interface StepsData {
  steps: AiStep[];
}

/**
 * Steps component tool renderer. Maps a `displaySteps` tool call onto the presentational
 * `forge-ai-steps` primitive, so the primitive stays unaware of tool calls.
 *
 * @tag forge-ai-tool-steps
 * @internal
 */
@customElement('forge-ai-tool-steps')
export class StepsToolElement extends LitElement implements IToolRenderer<StepsData> {
  public static styles = unsafeCSS(styles);

  /**
   * Tool call data containing the agent-provided steps.
   */
  @property({ attribute: false })
  public toolCall!: ToolCall<StepsData>;

  /**
   * Steps are read while arguments are still streaming (the tool sets `renderOnStart`), so partially
   * parsed entries without a label are dropped rather than rendered as blank rows.
   */
  get #steps(): AiStep[] {
    const steps = this.toolCall?.args?.steps;
    return Array.isArray(steps) ? steps.filter(step => !!step?.label) : [];
  }

  get #running(): boolean {
    const status = this.toolCall?.status;
    return status !== 'complete' && status !== 'error';
  }

  public override render(): TemplateResult {
    return html`<forge-ai-steps .steps=${this.#steps} ?running=${this.#running}></forge-ai-steps>`;
  }
}
