import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { renderFixture } from '../../testing/fixture.js';
import { MarkdownStreamController } from './markdown-stream-controller.js';
import { renderMarkdown } from './markdown.js';

vi.mock('./markdown.js', { spy: true });

@customElement('forge-ai-test-markdown-host')
class MarkdownHostElement extends LitElement {
  public controller = new MarkdownStreamController(this);

  public override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-test-markdown-host': MarkdownHostElement;
  }
}

function createHost(): Promise<MarkdownHostElement> {
  return renderFixture<MarkdownHostElement>(html`<forge-ai-test-markdown-host></forge-ai-test-markdown-host>`, 'forge-ai-test-markdown-host');
}

describe('MarkdownStreamController', () => {
  beforeEach(() => {
    vi.mocked(renderMarkdown).mockClear();
  });

  describe('getCachedHtml', () => {
    it('should render markdown to sanitized HTML', async () => {
      const host = await createHost();

      expect(host.controller.getCachedHtml('m1', '**bold**')).toContain('<strong>bold</strong>');
    });

    it('should strip unsafe markup', async () => {
      const host = await createHost();

      expect(host.controller.getCachedHtml('m1', '<script>alert(1)</script>ok')).not.toContain('<script');
    });

    it('should render once and serve the cache for identical message and content', async () => {
      const host = await createHost();

      const first = host.controller.getCachedHtml('m1', 'hello');
      const second = host.controller.getCachedHtml('m1', 'hello');

      expect(second).toBe(first);
      expect(renderMarkdown).toHaveBeenCalledOnce();
    });

    it('should render again when the content changes', async () => {
      const host = await createHost();

      host.controller.getCachedHtml('m1', 'hello');
      const second = host.controller.getCachedHtml('m1', 'hello world');

      expect(second).toContain('hello world');
      expect(renderMarkdown).toHaveBeenCalledTimes(2);
    });

    it('should return distinct HTML for same-length content that differs early', async () => {
      const host = await createHost();

      const first = host.controller.getCachedHtml('m1', 'aaaa');
      const second = host.controller.getCachedHtml('m1', 'bbbb');

      expect(first).toContain('aaaa');
      expect(second).toContain('bbbb');
    });

    it('should keep separate entries per message id', async () => {
      const host = await createHost();

      host.controller.getCachedHtml('a', 'same');
      host.controller.getCachedHtml('b', 'same');

      expect(renderMarkdown).toHaveBeenCalledTimes(2);
    });

    it('should cache streaming and complete renders separately', async () => {
      const host = await createHost();
      const content = 'link [text](';

      const streaming = host.controller.getCachedHtml('m1', content, { streaming: true });
      const complete = host.controller.getCachedHtml('m1', content, { streaming: false });

      expect(complete).not.toBe(streaming);
      expect(complete).toContain('[text](');
      expect(renderMarkdown).toHaveBeenCalledTimes(2);
    });

    it('should coerce nullish content to an empty string', async () => {
      const host = await createHost();

      expect(host.controller.getCachedHtml('m1', undefined as unknown as string)).toBe('');
      expect(host.controller.getCachedHtml('m1', null as unknown as string)).toBe('');
    });

    it('should evict the oldest entry once more than 100 are cached', async () => {
      const host = await createHost();
      for (let i = 0; i <= 100; i++) {
        host.controller.getCachedHtml(`m${i}`, `content ${i}`);
      }
      vi.mocked(renderMarkdown).mockClear();

      host.controller.getCachedHtml('m100', 'content 100');
      expect(renderMarkdown).not.toHaveBeenCalled();

      host.controller.getCachedHtml('m0', 'content 0');
      expect(renderMarkdown).toHaveBeenCalledOnce();
    });

    it('should re-render after the host disconnects and its cache is cleared', async () => {
      const host = await createHost();
      host.controller.getCachedHtml('m1', 'hello');

      host.remove();
      vi.mocked(renderMarkdown).mockClear();
      host.controller.getCachedHtml('m1', 'hello');

      expect(renderMarkdown).toHaveBeenCalledOnce();
    });

    it('should not serve stale HTML for same-length content that differs after the first 50 characters', async () => {
      const host = await createHost();
      const prefix = 'x'.repeat(60);

      host.controller.getCachedHtml('m1', `${prefix}A`);
      const second = host.controller.getCachedHtml('m1', `${prefix}B`);

      expect(second).toContain(`${prefix}B`);
    });
  });

  describe('scheduleUpdate', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should request a host update on the next animation frame', async () => {
      const host = await createHost();
      const requestUpdate = vi.spyOn(host, 'requestUpdate');

      host.controller.scheduleUpdate();
      expect(requestUpdate).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(20);

      expect(requestUpdate).toHaveBeenCalledOnce();
    });

    it('should coalesce multiple schedules in one frame into a single update', async () => {
      const host = await createHost();
      const requestUpdate = vi.spyOn(host, 'requestUpdate');

      host.controller.scheduleUpdate();
      host.controller.scheduleUpdate();
      host.controller.scheduleUpdate();
      await vi.advanceTimersByTimeAsync(20);

      expect(requestUpdate).toHaveBeenCalledOnce();
    });

    it('should allow scheduling again after a frame has run', async () => {
      const host = await createHost();
      const requestUpdate = vi.spyOn(host, 'requestUpdate');

      host.controller.scheduleUpdate();
      await vi.advanceTimersByTimeAsync(20);
      host.controller.scheduleUpdate();
      await vi.advanceTimersByTimeAsync(20);

      expect(requestUpdate).toHaveBeenCalledTimes(2);
    });

    it('should cancel a pending update when the host disconnects', async () => {
      const host = await createHost();
      const requestUpdate = vi.spyOn(host, 'requestUpdate');

      host.controller.scheduleUpdate();
      host.remove();
      await vi.advanceTimersByTimeAsync(20);

      expect(requestUpdate).not.toHaveBeenCalled();
    });

    it('should allow scheduling again after disconnect cancelled a pending update', async () => {
      const host = await createHost();
      const requestUpdate = vi.spyOn(host, 'requestUpdate');
      host.controller.scheduleUpdate();
      host.remove();

      host.controller.scheduleUpdate();
      await vi.advanceTimersByTimeAsync(20);

      expect(requestUpdate).toHaveBeenCalledOnce();
    });
  });
});
