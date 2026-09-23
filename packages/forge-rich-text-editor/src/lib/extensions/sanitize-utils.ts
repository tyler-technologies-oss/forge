/**
 * Shared sanitization utilities for the rich text editor.
 * Single source of truth for protocol blocklists, HTML sanitization, and JSON sanitization.
 */

export const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:', 'blob:'];

/**
 * Sanitizes HTML content by removing dangerous elements and attributes.
 * Uses DOMParser for inert parsing to avoid eager resource fetches (e.g. img src beacons).
 *
 * @param html The HTML string to sanitize
 * @param allowImages Whether to preserve img elements
 * @returns Sanitized HTML string
 */
const MAX_HTML_SIZE = 1_000_000; // 1MB limit

export function sanitizeHTML(html: string, allowImages = false): string {
  if (html.length > MAX_HTML_SIZE) {
    const sizeMB = (html.length / 1024 / 1024).toFixed(2);
    console.warn(`[RTE Security] HTML content too large (${sizeMB}MB), truncating to 1MB`);
    html = html.substring(0, MAX_HTML_SIZE);
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const temp = doc.body;

  const dangerousSelectors = [
    'script',
    'iframe',
    'embed',
    'object',
    'link',
    'style',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'svg',
    'math',
    'audio',
    'video',
    'base'
  ];

  if (!allowImages) {
    dangerousSelectors.push('img');
  }

  dangerousSelectors.forEach(selector => {
    temp.querySelectorAll(selector).forEach(el => el.remove());
  });

  temp.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('on') || attr.name.startsWith('data-')) {
        el.removeAttribute(attr.name);
      }
    });
    el.removeAttribute('style');
    el.removeAttribute('class');
    el.removeAttribute('id');
    el.removeAttribute('contenteditable');
    el.removeAttribute('spellcheck');
    el.removeAttribute('tabindex');
  });

  return temp.innerHTML;
}

/**
 * Sanitizes a ProseMirror JSON object.
 * - Deep-clones before mutating so the caller's object is never corrupted.
 * - Validates structure depth and node count to prevent DoS.
 * - Blocks dangerous protocols in link marks (raw and URL-encoded variants).
 *
 * @param json The ProseMirror JSON content to sanitize
 * @returns The sanitized deep clone, or throws on DoS limit exceeded
 */
export function sanitizeJSON(json: unknown): unknown {
  if (!json || typeof json !== 'object') {
    return json;
  }

  const MAX_DEPTH = 50;
  const MAX_NODES = 5000;
  let nodeCount = 0;

  const sanitize = (node: unknown, depth: number): unknown => {
    if (depth > MAX_DEPTH) {
      throw new Error('Maximum nesting depth exceeded (limit: 50)');
    }

    if (++nodeCount > MAX_NODES) {
      throw new Error('Maximum node count exceeded (limit: 5000)');
    }

    if (!node || typeof node !== 'object') {
      return node;
    }

    const n = node as Record<string, unknown>;

    if (n.type === 'link' || (n.attrs && typeof n.attrs === 'object')) {
      const attrs = n.attrs as Record<string, unknown>;
      if (attrs.href && typeof attrs.href === 'string') {
        const href = attrs.href.toLowerCase().trim();

        for (const protocol of DANGEROUS_PROTOCOLS) {
          if (href.startsWith(protocol)) {
            console.warn('[RTE Security] Blocked dangerous protocol in link:', attrs.href);
            attrs.href = '#';
            break;
          }
        }

        // Check URL-encoded variants (only if href wasn't already replaced)
        if (attrs.href !== '#') {
          try {
            const decoded = decodeURIComponent(href);
            for (const protocol of DANGEROUS_PROTOCOLS) {
              if (decoded.includes(protocol)) {
                console.warn('[RTE Security] Blocked encoded dangerous protocol:', attrs.href);
                attrs.href = '#';
                break;
              }
            }
          } catch {
            attrs.href = '#';
          }
        }
      }
    }

    if (Array.isArray(n.content)) {
      n.content = n.content.map(child => sanitize(child, depth + 1));
    }
    if (Array.isArray(n.marks)) {
      n.marks = n.marks.map(mark => sanitize(mark, depth + 1));
    }

    return n;
  };

  try {
    return sanitize(structuredClone(json), 0);
  } catch (error) {
    console.error('[RTE Security] Content sanitization failed:', error);
    throw error;
  }
}
