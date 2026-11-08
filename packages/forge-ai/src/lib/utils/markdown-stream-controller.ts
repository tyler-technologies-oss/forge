import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { renderMarkdown, type RenderMarkdownOptions } from '../utils/markdown.js';

/**
 * Reactive controller for caching parsed markdown and throttling renders.
 * Provides HTML caching per message and RAF throttling during streaming.
 */
export class MarkdownStreamController implements ReactiveController {
  #host: ReactiveControllerHost;
  #rafId?: number;
  #markdownCache = new Map<string, string>();

  constructor(host: ReactiveControllerHost) {
    this.#host = host;
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    if (this.#rafId) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = undefined;
    }
    this.#markdownCache.clear();
  }

  #getCacheKey(messageId: string, content: string, { streaming = true }: RenderMarkdownOptions): string {
    const hash = content.length + ':' + content.slice(0, 50);
    return `${messageId}:${hash}:${streaming}`;
  }

  public getCachedHtml(messageId: string, content: string, options: RenderMarkdownOptions = {}): string {
    const str = String(content ?? '');
    const key = this.#getCacheKey(messageId, str, options);
    let html = this.#markdownCache.get(key);

    if (!html) {
      html = renderMarkdown(str, options);
      this.#markdownCache.set(key, html);

      if (this.#markdownCache.size > 100) {
        const firstKey = this.#markdownCache.keys().next().value;
        if (firstKey) {
          this.#markdownCache.delete(firstKey);
        }
      }
    }

    return html;
  }

  public scheduleUpdate(): void {
    if (!this.#rafId) {
      this.#rafId = requestAnimationFrame(() => {
        this.#rafId = undefined;
        this.#host.requestUpdate();
      });
    }
  }
}
