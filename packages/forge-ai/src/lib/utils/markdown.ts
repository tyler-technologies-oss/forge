import { marked } from 'marked';
import DOMPurify, { type Config, type UponSanitizeAttributeHookEvent } from 'dompurify';
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

export interface RenderInlineMarkdownOptions {
  /**
   * Whether links render as anchors (the default). Set to `false` when the output is placed inside
   * an interactive element such as a `<button>`, where a nested link would take the click; links
   * then render as their text.
   */
  links?: boolean;
}

/**
 * `remend` config applied to complete (non-streaming) content: disable the
 * link/image completion handlers, keeping escaping repairs intact. A finished
 * message has no tag still arriving, so the trailing-tag repair is disabled too;
 * it would otherwise cut prose such as `Cost<Budget` at the `<`.
 */
const COMPLETE_CONTENT_REMEND_OPTIONS: RemendOptions = { links: false, images: false, htmlTags: false };

const FORBID_TAGS = [
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'form',
  'input',
  'select',
  'textarea',
  'button',
  'picture',
  'source',
  'track',
  'image',
  'feImage',
  'mglyph'
];

/**
 * Rendered content is model output and therefore attacker-influenced. Only images from the trusted
 * origin (see `TRUSTED_ORIGIN`) or `data:image/*` load inline; any other source becomes a link the
 * user must click. Fetching elements and attributes are forbidden; `<img>`, `<video>`, `<audio>`
 * and CSS-parsed attributes are handled by the hooks below.
 */
const DOMPURIFY_CONFIG: Config = {
  FORBID_TAGS,
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style', 'srcset', 'poster', 'background'],
  ADD_ATTR: ['target', 'rel']
};

const INLINE_TEXT_LINKS_CONFIG: Config = { ...DOMPURIFY_CONFIG, FORBID_TAGS: [...FORBID_TAGS, 'a'] };

const DEFAULT_IMAGE_LABEL = 'Image';
const DEFAULT_MEDIA_LABELS: Record<string, string> = { VIDEO: 'Video', AUDIO: 'Audio' };
const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
const OPAQUE_ORIGIN = 'null';

const EXTERNAL_CSS_URL = /url\s*\(\s*(?!['"]?#)/i;
const CSS_ESCAPE_OR_STRING = /[\\'"]/;
const CSS_FUNCTION = /([a-z-]+)(\s*\()?/gi;
const SAFE_CSS_FUNCTIONS = new Set([
  'url',
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'color',
  'matrix',
  'translate',
  'scale',
  'rotate',
  'skewx',
  'skewy',
  'calc',
  'min',
  'max',
  'clamp'
]);
const URL_ATTRS = new Set(['href', 'xlink:href', 'src', 'alt', 'title']);
// Checked on HTML elements too, so the guard holds even if one is later honoured there.
const CSS_PRESENTATION_ATTRS = new Set(['mask', 'fill', 'stroke', 'filter', 'clip-path', 'cursor', 'marker-start', 'marker-mid', 'marker-end']);

function scriptOrigin(): string | undefined {
  try {
    const url = new URL(import.meta.url);
    return /^https?:$/.test(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The origin images may load from inline: the origin that served this module. When forge-ai is
 * bundled into a widget embedded on a third-party page, that is the embedding service rather than
 * the host page, which the service cannot vouch for (an open redirect there would bounce the
 * request elsewhere). Falls back to the page origin when the module URL is not http(s), e.g. after
 * a bundler rewrites it.
 */
const TRUSTED_ORIGIN = scriptOrigin() ?? self.origin;

/**
 * Where relative sources resolve when the trusted origin is not the page's own: a relative path in
 * the output then means the embedding service, so it must not resolve against the host page.
 */
const EMBEDDED_BASE = TRUSTED_ORIGIN === self.origin ? undefined : TRUSTED_ORIGIN;

function resolveUrl(value: string): URL | undefined {
  try {
    return new URL(value, EMBEDDED_BASE ?? document.baseURI);
  } catch {
    return undefined;
  }
}

function isInlineLoadable(url: URL): boolean {
  if (url.protocol === 'data:') {
    return /^data:image\//i.test(url.href);
  }
  return url.origin !== OPAQUE_ORIGIN && url.origin === TRUSTED_ORIGIN;
}

function callsUnsafeCssFunction(value: string): boolean {
  return Array.from(value.matchAll(CSS_FUNCTION)).some(([, name, call]) => call !== undefined && !SAFE_CSS_FUNCTIONS.has(name.toLowerCase()));
}

/**
 * SVG and MathML presentation attributes are parsed as CSS. Escapes, strings and functions such as
 * `attr()` or `image-set()` can all reference another origin, so only plain values and known-safe
 * functions survive there.
 */
function dropFetchingCssAttribute(node: Element, data: UponSanitizeAttributeHookEvent): void {
  if (URL_ATTRS.has(data.attrName)) {
    return;
  }
  const isParsedAsCss = node.namespaceURI !== HTML_NAMESPACE || CSS_PRESENTATION_ATTRS.has(data.attrName);
  const isFetching =
    EXTERNAL_CSS_URL.test(data.attrValue) || (isParsedAsCss && (CSS_ESCAPE_OR_STRING.test(data.attrValue) || callsUnsafeCssFunction(data.attrValue)));
  if (isFetching) {
    data.keepAttr = false;
  }
}

// Force every surviving anchor — including raw `<a>` markup emitted by the agent
// that bypasses the marked link renderer — to open in a new tab with a safe
// `rel`. Unsafe protocols are already stripped by DOMPurify's default policy.
function sanitizeElement(node: Element): void {
  if (node.nodeName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer noopener');
  } else if (node.nodeName === 'IMG') {
    sanitizeImage(node);
  } else if (node.nodeName in DEFAULT_MEDIA_LABELS) {
    replaceMedia(node);
  }
}

/**
 * Keeps an image from the trusted origin and swaps any other for a click-to-open link naming its
 * host, or for text when it cannot be linked. When embedded, a kept source is made absolute so the
 * browser loads it from the embedding service rather than the host page.
 */
function sanitizeImage(img: Element): void {
  const src = img.getAttribute('src')?.trim();
  if (!src) {
    return;
  }
  const url = resolveUrl(src);
  if (url && isInlineLoadable(url)) {
    if (EMBEDDED_BASE && url.protocol !== 'data:') {
      img.setAttribute('src', url.href);
    }
    return;
  }
  img.replaceWith(createFallback({ node: img, url, label: img.getAttribute('alt') || DEFAULT_IMAGE_LABEL }));
}

/**
 * Media never loads inline. It becomes a click-to-open link to its source (its own `src`, or its
 * first `<source>`), replacing any fallback content, or its label when it has no linkable source.
 */
function replaceMedia(media: Element): void {
  const src = (media.getAttribute('src') ?? media.querySelector('source[src]')?.getAttribute('src'))?.trim();
  const url = src ? resolveUrl(src) : undefined;
  const label = media.getAttribute('title') || DEFAULT_MEDIA_LABELS[media.nodeName];
  media.replaceWith(createFallback({ node: media, url, label }));
}

/** A link inside a link would take the click and drop the outer destination, so a nested one becomes text. */
function createFallback({ node, url, label }: { node: Element; url: URL | undefined; label: string }): Node {
  const doc = node.ownerDocument;
  if (!url?.host || !/^https?:$/.test(url.protocol)) {
    return doc.createTextNode(label);
  }
  const text = `${label} (${url.host})`;
  if (node.closest('a')) {
    return doc.createTextNode(text);
  }
  const link = doc.createElement('a');
  link.setAttribute('href', url.href);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noreferrer noopener');
  link.textContent = text;
  return link;
}

/**
 * The DOMPurify singleton is shared with the host app, so these hooks are attached only for the
 * duration of forge-ai's own (synchronous) sanitize calls and never reach the host's.
 */
function sanitize(rawHtml: string, config: Config): string {
  DOMPurify.addHook('uponSanitizeAttribute', dropFetchingCssAttribute);
  DOMPurify.addHook('afterSanitizeAttributes', sanitizeElement);
  try {
    return DOMPurify.sanitize(rawHtml, config);
  } finally {
    DOMPurify.removeHook('uponSanitizeAttribute', dropFetchingCssAttribute);
    DOMPurify.removeHook('afterSanitizeAttributes', sanitizeElement);
  }
}

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
  return sanitize(rawHtml, DOMPURIFY_CONFIG);
}

/**
 * Renders a single line of markdown to sanitized inline HTML (no block-level
 * wrapping such as `<p>`). Used where the agent may emit bare URLs/emails or
 * raw `<a>` anchors that should render as clickable links, while leaving
 * plain values (IDs, codes, formulas) untouched. Sanitization strips unsafe
 * protocols (e.g. `javascript:`) and disallowed tags/attributes.
 * @param content The markdown content to render.
 * @param options Options for rendering, including whether links render as anchors.
 * @returns The sanitized inline HTML string.
 */
export function renderInlineMarkdown(content: string, { links = true }: RenderInlineMarkdownOptions = {}): string {
  const rawHtml = marked.parseInline(content, {
    async: false,
    gfm: true,
    breaks: true
  }) as string;
  return sanitize(rawHtml, links ? DOMPURIFY_CONFIG : INLINE_TEXT_LINKS_CONFIG);
}
