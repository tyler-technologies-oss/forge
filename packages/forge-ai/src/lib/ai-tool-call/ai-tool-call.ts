import { LitElement, html, unsafeCSS, type TemplateResult, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ContextConsumer } from '@lit/context';
import type { IToolRenderer, ToolCall, ToolCanvas, AnyToolDefinition, ToolPresentation } from '../types/index.js';
import {
  createToolCanvas,
  requestCanvasClose,
  requestCanvasOpen,
  resolveToolCanvasActionLabel,
  resolveToolCanvasIcon,
  resolveToolCanvasInline,
  resolveToolCanvasSubtitle,
  resolveToolCanvasTitle,
  toolCanvasHostContext
} from './tool-canvas.js';
import { shouldShowToolRenderer } from './utils.js';

import '../ai-artifact-card/index.js';

import styles from './ai-tool-call.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-tool-call': AiToolCallComponent;
  }
}

export const AiToolCallComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-tool-call';

/**
 * @tag forge-ai-tool-call
 */
@customElement(AiToolCallComponentTagName)
export class AiToolCallComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public toolCall!: ToolCall;

  @property({ attribute: false })
  public toolDefinition?: AnyToolDefinition;

  #customRendererRef = createRef<HTMLDivElement>();
  #renderedElement?: HTMLElement | DocumentFragment;
  #renderedCanvas?: ToolCanvas;

  #canvasHostConsumer = new ContextConsumer(this, {
    context: toolCanvasHostContext,
    subscribe: true,
    callback: () => this.requestUpdate()
  });

  get #shouldRenderCustom(): boolean {
    return shouldShowToolRenderer(this.toolCall, this.toolDefinition);
  }

  /** Tools without a canvas config stay plain `inline` even when the host offers a canvas. */
  get #presentation(): ToolPresentation {
    if (!this.toolDefinition?.canvas) {
      return 'inline';
    }
    return this.#canvasHostConsumer.value?.presentation ?? 'inline';
  }

  get #isOpenInCanvas(): boolean {
    return this.#canvasHostConsumer.value?.openToolCallId === this.toolCall.id;
  }

  #canvasControls?: ToolCanvas;

  // Rebuilt only when `available` or `isOpen` changes so renderers with a reactive `canvas` property re-render.
  get #canvas(): ToolCanvas {
    const available = this.#presentation === 'inline-expandable';
    const isOpen = this.#isOpenInCanvas;
    if (this.#canvasControls?.available !== available || this.#canvasControls.isOpen !== isOpen) {
      this.#canvasControls = createToolCanvas({
        available,
        isOpen: () => this.#isOpenInCanvas,
        open: options =>
          requestCanvasOpen(this, {
            toolCallId: this.toolCall.id,
            toolName: this.toolCall.name,
            title: options?.title
          }),
        close: () => requestCanvasClose(this, { toolCallId: this.toolCall.id })
      });
    }
    return this.#canvasControls;
  }

  get #showsArtifactCard(): boolean {
    if (!this.toolDefinition || this.#presentation !== 'inline-expandable') {
      return false;
    }
    switch (resolveToolCanvasInline(this.toolDefinition)) {
      case 'card':
        return true;
      case 'card-while-open':
        return this.#isOpenInCanvas;
      default:
        return false;
    }
  }

  #artifactCard(toolDefinition: AnyToolDefinition): TemplateResult {
    const active = this.#isOpenInCanvas;
    const icon = resolveToolCanvasIcon(this.toolCall, toolDefinition);
    icon?.setAttribute('slot', 'icon');
    return html`
      <forge-ai-artifact-card
        title-text=${resolveToolCanvasTitle(this.toolCall, toolDefinition)}
        .subtitleText=${resolveToolCanvasSubtitle(this.toolCall, toolDefinition) ?? ''}
        action-label=${resolveToolCanvasActionLabel(this.toolCall, toolDefinition, active)}
        asset-id=${this.toolCall.id}
        ?active=${active}
        @forge-ai-artifact-card-open=${() => this.#canvas.toggle()}>
        ${icon ?? nothing}
      </forge-ai-artifact-card>
    `;
  }

  #dispatchScrollRequest(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-message-thread-scroll-request', {
        bubbles: true,
        composed: true
      })
    );
  }

  get #customRenderer(): TemplateResult | typeof nothing {
    const toolDefinition = this.toolDefinition;
    const renderer = toolDefinition?.renderer;
    if (!toolDefinition || !renderer || !this.#shouldRenderCustom) {
      return nothing;
    }

    if (this.#showsArtifactCard) {
      return this.#artifactCard(toolDefinition);
    }

    if (renderer.elementTag || renderer.render) {
      return html`<div ${ref(this.#customRendererRef)}></div>`;
    }

    return nothing;
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    const container = this.#customRendererRef.value;
    if (!container || !this.#shouldRenderCustom) {
      return;
    }

    const renderer = this.toolDefinition?.renderer;
    const canvas = this.#canvas;
    // The container is recreated whenever the artifact card swaps back to the renderer, so mount
    // state is derived from the DOM rather than from which properties changed.
    const mounted = container.childNodes.length > 0;
    const changed = changedProperties.has('toolCall') || changedProperties.has('toolDefinition');

    if (renderer?.elementTag) {
      // Update the existing element in place rather than tearing it down and recreating it on
      // every args/status change: a live renderer (e.g. one awaiting user confirmation) may treat
      // disconnection as abandonment, so churning it while the tool call is still in flight can
      // reject work the renderer is actively waiting on.
      if (mounted && this.#renderedElement instanceof HTMLElement && this.#renderedElement.tagName.toLowerCase() === renderer.elementTag) {
        const existing = this.#renderedElement as HTMLElement & IToolRenderer;
        existing.toolCall = this.toolCall;
        existing.presentation = this.#presentation;
        existing.canvas = canvas;
        return;
      }

      const element = document.createElement(renderer.elementTag) as HTMLElement & IToolRenderer;
      element.toolCall = this.toolCall;
      element.presentation = this.#presentation;
      element.canvas = canvas;
      this.#replaceRenderedElement(container, element);
    } else if (renderer?.render && (changed || !mounted || canvas !== this.#renderedCanvas)) {
      this.#renderedCanvas = canvas;
      this.#replaceRenderedElement(container, renderer.render(this.toolCall, { presentation: this.#presentation, canvas }));
    }
  }

  #replaceRenderedElement(container: HTMLDivElement, element: HTMLElement | DocumentFragment): void {
    if (this.#renderedElement && container.contains(this.#renderedElement as Node)) {
      container.removeChild(this.#renderedElement as Node);
    }
    this.#renderedElement = element;
    container.appendChild(element);
    this.#dispatchScrollRequest();
  }

  public override render(): TemplateResult | typeof nothing {
    return this.#customRenderer;
  }
}
