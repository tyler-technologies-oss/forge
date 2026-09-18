import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextDocument } from '../editor-context.js';
import '../rich-text-editor.js';
import '../features/rte-bold.js';

const asDocument = (doc: unknown): RichTextDocument => doc as RichTextDocument;

const PARAGRAPH = asDocument({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'json ' },
        { type: 'text', text: 'works', marks: [{ type: 'bold' }] }
      ]
    }
  ]
});

const createEditor = async (): Promise<RichTextEditorComponent> => {
  const el = await renderFixture<RichTextEditorComponent>(
    html`<forge-rich-text-editor><forge-rte-bold></forge-rte-bold></forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await new Promise(resolve => setTimeout(resolve, 100));
  return el;
};

const setContent = async (el: RichTextEditorComponent, content: RichTextEditorComponent['content']): Promise<void> => {
  el.content = content;
  await el.updateComplete;
  await new Promise(resolve => setTimeout(resolve, 100));
};

/**
 * The `content` property accepts an HTML string or a ProseMirror document. The runtime has always
 * supported both - `sanitizeHTML` and `sanitizeJSON` branch on the input type - but the property
 * was declared as `string`, so the document form was unusable without a cast.
 */
describe('RichTextEditor content formats', () => {
  it('should accept an HTML string', async () => {
    const el = await createEditor();

    await setContent(el, '<p>html <strong>works</strong></p>');

    expect(el.toHTML()).toBe('<p>html <strong>works</strong></p>');
  });

  it('should accept a ProseMirror document', async () => {
    const el = await createEditor();

    await setContent(el, PARAGRAPH);

    expect(el.toHTML()).toBe('<p>json <strong>works</strong></p>');
  });

  it('should round-trip a document through toJSON', async () => {
    const el = await createEditor();

    await setContent(el, PARAGRAPH);
    const roundTripped = el.toJSON();

    expect(roundTripped).toBeDefined();
    await setContent(el, asDocument(roundTripped));

    expect(el.toHTML()).toBe('<p>json <strong>works</strong></p>');
  });

  it('should sanitize a dangerous protocol supplied as a document', async () => {
    const el = await createEditor();

    await setContent(
      el,
      asDocument({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'clickme', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] }]
          }
        ]
      })
    );

    expect(el.toHTML()).not.toContain('javascript:');
  });

  it('should accept a document supplied before initialization', async () => {
    // This is the path framework bindings take - Angular assigns the property during its first
    // change detection pass, before the element has initialized TipTap.
    const el = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor .content=${PARAGRAPH}><forge-rte-bold></forge-rte-bold></forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.toHTML()).toBe('<p>json <strong>works</strong></p>');
  });

  it('should switch between the two formats without reinitializing', async () => {
    const el = await createEditor();

    await setContent(el, '<p>first</p>');
    await setContent(el, PARAGRAPH);
    await setContent(el, '<p>third</p>');

    expect(el.toHTML()).toBe('<p>third</p>');
    expect(el.isInitialized).toBe(true);
  });
});
