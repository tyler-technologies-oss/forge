import { marked } from 'marked';
import DOMPurify, { type Config, type UponSanitizeAttributeHookEvent, type UponSanitizeElementHookEvent } from 'dompurify';
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
 * origin (see `setTrustedImageOrigin`) or `data:image/*` load inline; any other source becomes a link the
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

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const ACCESSIBILITY_ATTR = /^(aria-.+|role)$/;

function httpOrigin(value: string): string | undefined {
  try {
    const url = new URL(value);
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
export function resolveTrustedOrigin({ moduleUrl, pageOrigin }: { moduleUrl: string; pageOrigin: string }): string {
  return httpOrigin(moduleUrl) ?? pageOrigin;
}

let trustedOrigin = resolveTrustedOrigin({ moduleUrl: import.meta.url, pageOrigin: self.origin });

/**
 * Sets the origin images may load from inline, overriding the one forge-ai was served from. Needed
 * when forge-ai is bundled into the host page's own JavaScript, where the module URL is the host
 * page rather than the service that owns the content. Call it before rendering; accepts a URL
 * and uses its origin. A non-http(s) URL trusts no origin.
 */
export function setTrustedImageOrigin(url: string): void {
  trustedOrigin = httpOrigin(url) ?? OPAQUE_ORIGIN;
}

/**
 * Where relative sources and links resolve when the trusted origin is not the page's own: a
 * relative path in the output then means the embedding service, so it must not resolve against
 * the host page.
 */
function embeddedBase(): string | undefined {
  return trustedOrigin === self.origin || trustedOrigin === OPAQUE_ORIGIN ? undefined : trustedOrigin;
}

function resolveUrl(value: string): URL | undefined {
  try {
    return new URL(value, embeddedBase() ?? document.baseURI);
  } catch {
    return undefined;
  }
}

function isInlineLoadable(url: URL): boolean {
  if (url.protocol === 'data:') {
    return /^data:image\//i.test(url.href);
  }
  return url.origin !== OPAQUE_ORIGIN && url.origin === trustedOrigin;
}

function callsUnsafeCssFunction(value: string): boolean {
  return Array.from(value.matchAll(CSS_FUNCTION)).some(([, name, call]) => call !== undefined && !SAFE_CSS_FUNCTIONS.has(name.toLowerCase()));
}

/**
 * SVG and MathML presentation attributes are parsed as CSS. Escapes, strings and functions such as
 * `attr()` or `image-set()` can all reference another origin, so only plain values and known-safe
 * functions survive there. Accessibility attributes are never parsed as CSS.
 */
function isFetchingCssAttribute({ node, attrName, attrValue }: { node: Element } & Pick<UponSanitizeAttributeHookEvent, 'attrName' | 'attrValue'>): boolean {
  if (URL_ATTRS.has(attrName) || ACCESSIBILITY_ATTR.test(attrName)) {
    return false;
  }
  const isParsedAsCss = node.namespaceURI !== HTML_NAMESPACE || CSS_PRESENTATION_ATTRS.has(attrName);
  return EXTERNAL_CSS_URL.test(attrValue) || (isParsedAsCss && (CSS_ESCAPE_OR_STRING.test(attrValue) || callsUnsafeCssFunction(attrValue)));
}

function sanitizeElement(node: Element): void {
  if (node.nodeName === 'A') {
    sanitizeAnchor(node);
  } else if (node.nodeName === 'IMG') {
    sanitizeImage(node);
  } else if (node.nodeName in DEFAULT_MEDIA_LABELS) {
    replaceMedia(node);
  }
}

/**
 * Makes every surviving anchor that still has a destination, including raw `<a>` markup that
 * bypasses the marked link renderer, open in a new tab with a safe `rel`. Anchors without an
 * `href` (e.g. stripped by a host hook) are left inert. When embedded, a relative destination is
 * made absolute so it opens on the embedding service rather than the host page. Unsafe protocols
 * are already stripped by DOMPurify's default policy.
 */
function sanitizeAnchor(anchor: Element): void {
  const href = anchor.getAttribute('href')?.trim();
  if (href === undefined) {
    return;
  }
  anchor.setAttribute('target', '_blank');
  anchor.setAttribute('rel', 'noreferrer noopener');
  if (embeddedBase() && href && !href.startsWith('#') && !SCHEME.test(href)) {
    const url = resolveUrl(href);
    if (url) {
      anchor.setAttribute('href', url.href);
    }
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
    if (embeddedBase() && url.protocol !== 'data:') {
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
 * duration of forge-ai's own (synchronous) sanitize calls and never reach the host's. They also
 * enforce the forbid lists themselves, since a host `DOMPurify.setConfig()` makes DOMPurify ignore
 * the config passed here, and they run after any host hook so a host `forceKeepAttr` can't undo them.
 */
function sanitize(rawHtml: string, config: Config): string {
  const forbiddenTags = new Set((config.FORBID_TAGS ?? []).map(tag => tag.toLowerCase()));
  const forbiddenAttrs = new Set((config.FORBID_ATTR ?? []).map(attr => attr.toLowerCase()));
  const enforceForbiddenTag = (_node: Node, { tagName, allowedTags }: UponSanitizeElementHookEvent): void => {
    if (forbiddenTags.has(tagName)) {
      allowedTags[tagName] = false;
    }
  };
  const enforceForbiddenAttribute = (node: Element, data: UponSanitizeAttributeHookEvent): void => {
    if (forbiddenAttrs.has(data.attrName) || isFetchingCssAttribute({ node, ...data })) {
      data.keepAttr = false;
      data.forceKeepAttr = false;
    }
  };

  DOMPurify.addHook('uponSanitizeElement', enforceForbiddenTag);
  DOMPurify.addHook('uponSanitizeAttribute', enforceForbiddenAttribute);
  DOMPurify.addHook('afterSanitizeAttributes', sanitizeElement);
  try {
    return DOMPurify.sanitize(rawHtml, config);
  } finally {
    DOMPurify.removeHook('uponSanitizeElement', enforceForbiddenTag);
    DOMPurify.removeHook('uponSanitizeAttribute', enforceForbiddenAttribute);
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
