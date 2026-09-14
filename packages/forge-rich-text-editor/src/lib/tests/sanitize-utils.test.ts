import { describe, expect, it } from 'vitest';
import { sanitizeHTML, sanitizeJSON } from '../extensions/sanitize-utils.js';

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

/**
 * `sanitizeHTML` is tested directly for the same reason as `sanitizeJSON`: alignment reaches the
 * schema only through `element.style.textAlign`, so a component-level assertion would depend on
 * which feature components happened to be slotted in and would pass vacuously in a bare editor.
 */
describe('sanitizeHTML style allowlist', () => {
  it.each(['left', 'right', 'center', 'justify'])('should preserve text-align: %s', alignment => {
    const sanitized = sanitizeHTML(`<p style="text-align: ${alignment}">x</p>`);

    expect(sanitized).toBe(`<p style="text-align: ${alignment}">x</p>`);
  });

  it('should preserve alignment on a heading', () => {
    expect(sanitizeHTML('<h2 style="text-align: center">x</h2>')).toBe('<h2 style="text-align: center">x</h2>');
  });

  it('should preserve alignment through an editor output round trip', () => {
    const editorOutput = '<p style="text-align: center"><strong>saved</strong></p>';

    expect(sanitizeHTML(editorOutput)).toBe(editorOutput);
  });

  it.each(['end', 'start', 'inherit', 'center !important'])('should drop an unsupported text-align value: %s', value => {
    expect(sanitizeHTML(`<p style="text-align: ${value}">x</p>`)).toBe('<p>x</p>');
  });

  it.each(['#f00', '#ff0000', 'rgb(255, 0, 0)', 'rgba(255,0,0,0.5)', 'red', 'transparent'])('should preserve color: %s', value => {
    expect(sanitizeHTML(`<p style="color: ${value}">x</p>`)).toBe(`<p style="color: ${value}">x</p>`);
  });

  it('should preserve background-color', () => {
    expect(sanitizeHTML('<p style="background-color: #ff0">x</p>')).toBe('<p style="background-color: #ff0">x</p>');
  });

  it.each(['font-weight: bold', 'font-family: Calibri', 'font-size: 12pt', 'margin-left: 40px', 'position: fixed'])(
    'should drop a non-allow-listed declaration: %s',
    declaration => {
      expect(sanitizeHTML(`<p style="${declaration}">x</p>`)).toBe('<p>x</p>');
    }
  );

  it('should keep only the allow-listed declarations from a mixed style attribute', () => {
    const sanitized = sanitizeHTML('<p style="font-family: Calibri; text-align: right; margin: 0">x</p>');

    expect(sanitized).toBe('<p style="text-align: right">x</p>');
  });

  it.each([
    'color: url(javascript:alert(1))',
    'background-color: url(https://evil.test/x.png)',
    'color: expression(alert(1))',
    'text-align: javascript:alert(1)'
  ])('should drop a dangerous style value: %s', declaration => {
    expect(sanitizeHTML(`<p style="${declaration}">x</p>`)).toBe('<p>x</p>');
  });

  it('should still strip class, id and event handler attributes', () => {
    const sanitized = sanitizeHTML('<p class="MsoNormal" id="a" onclick="alert(1)" style="text-align: center">x</p>');

    expect(sanitized).toBe('<p style="text-align: center">x</p>');
  });

  it('should still strip data attributes', () => {
    expect(sanitizeHTML('<p data-checked="true" style="text-align: center">x</p>')).toBe('<p style="text-align: center">x</p>');
  });

  it('should still remove dangerous elements', () => {
    expect(sanitizeHTML('<p style="text-align: center">x</p><script>alert(1)</script>')).toBe('<p style="text-align: center">x</p>');
  });
});
