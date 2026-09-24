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
 * Node attributes that carry a URL and so need protocol checking.
 *
 * `src` is checked even though no node in the editor's current schema uses it: the schema depends
 * on which feature components a consumer slots in, so a sanitizer that only covered the attributes
 * reachable today would quietly stop being correct the moment an image or media feature is added.
 */
const URL_ATTRIBUTES = ['href', 'src', 'srcset', 'poster'];

/**
 * Replaces a dangerous URL in `attrs[name]` with `#`, checking both the raw value and its
 * URL-decoded form. A value that cannot be decoded is treated as dangerous.
 */
function neutralizeDangerousUrl(attrs: Record<string, unknown>, name: string): void {
  const value = attrs[name];
  if (!value || typeof value !== 'string') {
    return;
  }

  const url = value.toLowerCase().trim();

  for (const protocol of DANGEROUS_PROTOCOLS) {
    if (url.startsWith(protocol)) {
      console.warn(`[RTE Security] Blocked dangerous protocol in ${name}:`, value);
      attrs[name] = '#';
      return;
    }
  }

  try {
    const decoded = decodeURIComponent(url);
    for (const protocol of DANGEROUS_PROTOCOLS) {
      if (decoded.includes(protocol)) {
        console.warn(`[RTE Security] Blocked encoded dangerous protocol in ${name}:`, value);
        attrs[name] = '#';
        return;
      }
    }
  } catch {
    attrs[name] = '#';
  }
}

/**
 * Sanitizes a ProseMirror JSON object.
 * - Deep-clones before mutating so the caller's object is never corrupted.
 * - Validates structure depth and node count to prevent DoS.
 * - Blocks dangerous protocols in URL-bearing attributes (raw and URL-encoded variants).
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

    if (n.attrs && typeof n.attrs === 'object') {
      for (const attribute of URL_ATTRIBUTES) {
        neutralizeDangerousUrl(n.attrs as Record<string, unknown>, attribute);
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
