import { describe, expect, it } from 'vitest';
import { sanitizeJSON } from '../extensions/sanitize-utils.js';

type Attrs = Record<string, unknown>;

const docWith = (attrs: Attrs): unknown => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'x', marks: [{ type: 'link', attrs }] }] }]
});

const attrsOf = (sanitized: unknown): Attrs => (sanitized as { content: { content: { marks: { attrs: Attrs }[] }[] }[] }).content[0].content[0].marks[0].attrs;

/**
 * `sanitizeJSON` is tested directly rather than through the components on purpose. A dangerous
 * `src` routed through an element would be dropped by the ProseMirror schema — no node in the
 * current schema has a `src` attribute — so a component-level test would pass whether or not the
 * sanitizer did anything. Calling the function makes the assertion real.
 */
describe('sanitizeJSON URL attributes', () => {
  it.each(['href', 'src', 'srcset', 'poster'])('should neutralize a javascript: protocol in %s', attribute => {
    const sanitized = sanitizeJSON(docWith({ [attribute]: 'javascript:alert(1)' }));

    expect(attrsOf(sanitized)[attribute]).toBe('#');
  });

  it.each(['href', 'src'])('should neutralize a data: URL in %s', attribute => {
    const sanitized = sanitizeJSON(docWith({ [attribute]: 'data:image/svg+xml,<svg onload=alert(1)>' }));

    expect(attrsOf(sanitized)[attribute]).toBe('#');
  });

  it('should neutralize a URL-encoded dangerous protocol in src', () => {
    const sanitized = sanitizeJSON(docWith({ src: 'java%73cript:alert(1)' }));

    expect(attrsOf(sanitized).src).toBe('#');
  });

  it('should leave a safe URL untouched', () => {
    const sanitized = sanitizeJSON(docWith({ href: 'https://tylertech.com', src: 'https://tylertech.com/a.png' }));

    expect(attrsOf(sanitized).href).toBe('https://tylertech.com');
    expect(attrsOf(sanitized).src).toBe('https://tylertech.com/a.png');
  });

  it('should leave non-URL attributes untouched', () => {
    const sanitized = sanitizeJSON(docWith({ title: 'javascript:not-a-url' }));

    expect(attrsOf(sanitized).title).toBe('javascript:not-a-url');
  });

  it('should not mutate the input', () => {
    const input = docWith({ src: 'javascript:alert(1)' });

    sanitizeJSON(input);

    expect(attrsOf(input).src).toBe('javascript:alert(1)');
  });
});
