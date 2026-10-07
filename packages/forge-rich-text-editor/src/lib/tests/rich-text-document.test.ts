import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import { RICH_TEXT_FEATURES, RICH_TEXT_STANDARD_FEATURES, type RichTextFeature, toRichTextDocument } from '../rich-text-document.js';
import '../rich-text-editor.js';
import '../features/rte-standard-tools.js';
import '../features/rte-link.js';
import '../features/rte-code.js';

const MIXED_HTML = `
  <h2 style="text-align: center">Title</h2>
  <p>Some <strong>bold</strong>, <em>italic</em>, <u>underlined</u> and <s>struck</s> text.</p>
  <ul><li><p>One</p></li><li><p>Two</p></li></ul>
  <ol><li><p>First</p></li></ol>
  <p style="text-align: right">A <a href="https://example.com">link</a> and <code>code</code>.</p>
`;

const createEditor = async (content: string, withLinkAndCode = false): Promise<RichTextEditorComponent> => {
  const el = await renderFixture<RichTextEditorComponent>(
    withLinkAndCode
      ? html`<forge-rich-text-editor .content=${content}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-link></forge-rte-link>
          <forge-rte-code></forge-rte-code>
        </forge-rich-text-editor>`
      : html`<forge-rich-text-editor .content=${content}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await vi.waitUntil(() => el.isInitialized);
  return el;
};

const serialize = (value: unknown): string => JSON.stringify(value);

describe('toRichTextDocument', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should match the standard tools editor when given the same HTML', async () => {
    const el = await createEditor(MIXED_HTML);

    expect(toRichTextDocument(MIXED_HTML)).toEqual(el.toJSON());
  });

  it('should match an editor with link and code when given those features', async () => {
    const el = await createEditor(MIXED_HTML, true);

    expect(toRichTextDocument(MIXED_HTML, [...RICH_TEXT_STANDARD_FEATURES, 'link', 'code'])).toEqual(el.toJSON());
  });

  it('should drop link and code marks when using the standard features', () => {
    const json = serialize(toRichTextDocument('<p><a href="https://example.com">link</a> <code>code</code></p>'));

    expect(json).toContain('"text":"link code"');
    expect(json).not.toContain('"type":"link"');
    expect(json).not.toContain('"type":"code"');
  });

  it('should keep link marks when the link feature is included', () => {
    const doc = toRichTextDocument('<p><a href="https://example.com">link</a></p>', ['link']);

    expect(serialize(doc)).toContain('"href":"https://example.com"');
  });

  it('should drop scripts, event handlers, images and SVG', () => {
    const json = serialize(
      toRichTextDocument('<p onclick="alert(1)">safe</p><script>alert(1)</script><img src="x" onerror="alert(1)"><svg><circle r="1"></circle></svg>')
    );

    expect(json).toContain('safe');
    expect(json).not.toContain('alert');
    expect(json).not.toContain('image');
    expect(json).not.toContain('circle');
  });

  it('should drop javascript: links even when the link feature is included', () => {
    const json = serialize(toRichTextDocument('<p><a href="javascript:alert(1)">click</a></p>', ['link']));

    expect(json).toContain('click');
    expect(json).not.toContain('javascript');
  });

  it('should flatten unsupported structures such as tables to text', () => {
    const json = serialize(toRichTextDocument('<table><tr><td>cell</td></tr></table>'));

    expect(json).toContain('cell');
    expect(json).not.toContain('table');
  });

  it('should return an empty paragraph document for empty HTML', () => {
    expect(toRichTextDocument('')).toEqual({ type: 'doc', content: [{ type: 'paragraph', attrs: { textAlign: null } }] });
  });

  it('should warn and skip unknown features while keeping known ones', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const features = ['links', 'bold'] as unknown as RichTextFeature[];

    const json = serialize(toRichTextDocument('<p><strong>bold</strong> <a href="https://example.com">link</a></p>', features));

    expect(warn).toHaveBeenCalledWith('[RTE] Unknown rich text feature "links" ignored');
    expect(json).toContain('"type":"bold"');
    expect(json).not.toContain('"type":"link"');
  });

  it('should treat inherited object keys as unknown features', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const features = ['constructor'] as unknown as RichTextFeature[];

    expect(() => toRichTextDocument('<p>text</p>', features)).not.toThrow();
    expect(warn).toHaveBeenCalledWith('[RTE] Unknown rich text feature "constructor" ignored');
  });

  it('should accept every listed feature without warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    toRichTextDocument('<p>text</p>', RICH_TEXT_FEATURES);

    expect(warn).not.toHaveBeenCalled();
  });

  it('should only list known features as standard features', () => {
    expect(RICH_TEXT_FEATURES).toEqual(expect.arrayContaining([...RICH_TEXT_STANDARD_FEATURES]));
  });
});
