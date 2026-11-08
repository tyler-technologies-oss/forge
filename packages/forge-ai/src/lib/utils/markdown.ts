import { marked } from 'marked';
import DOMPurify, { type Config } from 'dompurify';
import remend, { type RemendOptions } from 'remend';

export interface RenderMarkdownOptions {
  /**
   * Whether the content is still being streamed. Streaming content (the
   * default) is run through markdown-completion repairs that finish partial
   * syntax as tokens arrive. Complete content (e.g. finalized user messages)
   * should set this to `false` so those repairs don't mangle intentional text
   * such as `[text](` into incomplete-link placeholders.
   */
  streaming?: boolean;
}

/**
 * `remend` config applied to complete (non-streaming) content: disable the
 * link/image completion handlers, keeping escaping repairs intact.
 */
const COMPLETE_CONTENT_REMEND_OPTIONS: RemendOptions = { links: false, images: false };

const DOMPURIFY_CONFIG: Config = {
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'select', 'textarea', 'button'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  ADD_ATTR: ['target', 'rel']
};

// Force every surviving anchor — including raw `<a>` markup emitted by the agent
// that bypasses the marked link renderer — to open in a new tab with a safe
// `rel`. Unsafe protocols are already stripped by DOMPurify's default policy.
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.nodeName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer noopener');
  }
});

/**
 * Renders markdown content to sanitized HTML.
 * Handles incomplete syntax in streaming content, and sanitizes the output to remove unsafe tags and attributes.
 *
 * Block-level tables and code blocks are wrapped as keyboard-focusable, labeled
 * horizontal scroll containers (`role="group"` + `tabindex="0"` + `aria-label`)
 * so keyboard and screen-reader users can reach and scroll overflowing content.
 * The `role="group"` ensures the `aria-label` is reliably announced. The focus
 * ring and scrollbar only appear when the content actually overflows (handled in CSS).
 * @param content The markdown content to render.
 * @param options Options for rendering, including whether the content is streaming.
 * @returns The sanitized HTML string.
 */
export function renderMarkdown(content: string, { streaming = true }: RenderMarkdownOptions = {}): string {
  const completedMarkdown = remend(content, streaming ? undefined : COMPLETE_CONTENT_REMEND_OPTIONS);
  const renderer = new marked.Renderer();
  const renderTable = renderer.table.bind(renderer);
  renderer.table = token => `<div data-scroll-region="table" role="group" tabindex="0" aria-label="Tabular data">${renderTable(token)}</div>`;
  const renderCode = renderer.code.bind(renderer);
  renderer.code = token => renderCode(token).replace(/^<pre/, '<pre data-scroll-region="code" role="group" tabindex="0" aria-label="Code block"');
  const rawHtml = marked.parse(completedMarkdown, {
    async: false,
    gfm: true,
    breaks: true,
    renderer
  }) as string;
  return DOMPurify.sanitize(rawHtml, DOMPURIFY_CONFIG);
}

/**
 * Renders a single line of markdown to sanitized inline HTML (no block-level
 * wrapping such as `<p>`). Used where the agent may emit bare URLs/emails or
 * raw `<a>` anchors that should render as clickable links, while leaving
 * plain values (IDs, codes, formulas) untouched. Sanitization strips unsafe
 * protocols (e.g. `javascript:`) and disallowed tags/attributes.
 * @param content The markdown content to render.
 * @returns The sanitized inline HTML string.
 */
export function renderInlineMarkdown(content: string): string {
  const rawHtml = marked.parseInline(content, {
    async: false,
    gfm: true,
    breaks: true
  }) as string;
  return DOMPurify.sanitize(rawHtml, DOMPURIFY_CONFIG);
}
