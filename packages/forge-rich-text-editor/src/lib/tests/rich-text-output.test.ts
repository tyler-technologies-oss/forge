import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../testing/fixture.js';
import { html } from 'lit';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextContextComponent } from '../rich-text-context.js';
import type { Editor } from '@tiptap/core';
import '../rich-text-editor.js';
import '../features/rte-bold.js';
import '../features/rte-italic.js';
import '../features/rte-underline.js';
import '../features/rte-heading.js';
import '../features/rte-bullet-list.js';
import '../features/rte-ordered-list.js';
import '../features/rte-link.js';

async function getEditorContext(el: RichTextEditorComponent): Promise<RichTextContextComponent> {
  await el.updateComplete;
  const contextElement = el.shadowRoot?.querySelector('forge-rich-text-context') as RichTextContextComponent;
  await contextElement?.updateComplete;
  return contextElement;
}

async function getEditor(el: RichTextEditorComponent): Promise<Editor | null> {
  const context = await getEditorContext(el);
  await new Promise(resolve => setTimeout(resolve, 100));
  return context.editorContext.editor;
}

/**
 * Narrow view of the ProseMirror JSON the editor emits. `marks` and `content` are declared as
 * required purely for test ergonomics — every assertion below already checks they are present.
 */
interface ProseMirrorNode {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks: { type: string; attrs?: Record<string, unknown> }[];
  content: ProseMirrorNode[];
}

describe('RTE Output Formats', () => {
  it('should contain shadow root', async () => {
    const el = await renderFixture<RichTextEditorComponent>(
      html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `,
      'forge-rich-text-editor'
    );

    expect(el.shadowRoot).not.toBeNull();
  });

  describe('JSON Output', () => {
    it('should return JSON for empty content', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await getEditorContext(el);
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      expect(typeof json).toBe('object');
      expect(json).toHaveProperty('type', 'doc');
      expect(json).toHaveProperty('content');
    });

    it('should return JSON for plain text content', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Hello World</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      expect(typeof json).toBe('object');
      expect(json).toHaveProperty('type', 'doc');

      const content = json?.content ?? [];
      expect(Array.isArray(content)).toBe(true);
      expect(content[0]).toHaveProperty('type', 'paragraph');
      expect(content[0].content[0]).toHaveProperty('text', 'Hello World');
    });

    it('should return JSON for bold text', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong>Bold Text</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];
      const textNode = content[0].content[0];

      expect(textNode).toHaveProperty('text', 'Bold Text');
      expect(Array.isArray(textNode.marks)).toBe(true);
      expect(textNode.marks[0]).toHaveProperty('type', 'bold');
    });

    it('should return JSON for multiple formatting marks', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
            <forge-rte-italic></forge-rte-italic>
            <forge-rte-underline></forge-rte-underline>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong><em><u>Formatted</u></em></strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];
      const textNode = content[0].content[0];

      expect(textNode).toHaveProperty('text', 'Formatted');
      expect(Array.isArray(textNode.marks)).toBe(true);
      expect(textNode.marks).toHaveLength(3);
    });

    it('should return JSON for headings', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-heading></forge-rte-heading>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Heading 1</h1><h2>Heading 2</h2>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];

      expect(content[0]).toHaveProperty('type', 'heading');
      expect(content[0].attrs).toHaveProperty('level', 1);
      expect(content[0].content[0]).toHaveProperty('text', 'Heading 1');

      expect(content[1]).toHaveProperty('type', 'heading');
      expect(content[1].attrs).toHaveProperty('level', 2);
      expect(content[1].content[0]).toHaveProperty('text', 'Heading 2');
    });

    it('should return JSON for bullet lists', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bullet-list></forge-rte-bullet-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];

      expect(content[0]).toHaveProperty('type', 'bulletList');
      expect(Array.isArray(content[0].content)).toBe(true);
      expect(content[0].content).toHaveLength(2);
      expect(content[0].content[0]).toHaveProperty('type', 'listItem');
    });

    it('should return JSON for ordered lists', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-ordered-list></forge-rte-ordered-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ol><li><p>First</p></li><li><p>Second</p></li></ol>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];

      expect(content[0]).toHaveProperty('type', 'orderedList');
      expect(Array.isArray(content[0].content)).toBe(true);
      expect(content[0].content).toHaveLength(2);
    });

    it('should return JSON for links', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><a href="https://example.com">Link Text</a></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];
      const textNode = content[0].content[0];

      expect(textNode).toHaveProperty('text', 'Link Text');
      expect(Array.isArray(textNode.marks)).toBe(true);
      expect(textNode.marks[0]).toHaveProperty('type', 'link');
      expect(textNode.marks[0].attrs).toHaveProperty('href', 'https://example.com');
    });

    it('should return undefined when editor is not initialized', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await getEditorContext(el);

      // Force destroy the editor

      (context as any)._editor?.destroy();

      (context as any)._editor = undefined;

      const json = context.toJSON() as ProseMirrorNode | undefined;
      expect(json).toBeUndefined();
    });

    it('should preserve complex nested structures in JSON', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-heading></forge-rte-heading>
            <forge-rte-bold></forge-rte-bold>
            <forge-rte-italic></forge-rte-italic>
            <forge-rte-bullet-list></forge-rte-bullet-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em></p><ul><li><p>List item</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];

      expect(content).toHaveLength(3);
      expect(content[0]).toHaveProperty('type', 'heading');
      expect(content[1]).toHaveProperty('type', 'paragraph');
      expect(content[2]).toHaveProperty('type', 'bulletList');
    });
  });

  describe('HTML Output', () => {
    it('should return HTML for empty content', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await getEditorContext(el);
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(typeof htmlOutput).toBe('string');
      // Empty editor has a paragraph tag
      expect(htmlOutput).toContain('<p>');
    });

    it('should return HTML for plain text content', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Hello World</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toBe('<p>Hello World</p>');
    });

    it('should return HTML for bold text', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong>Bold Text</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toBe('<p><strong>Bold Text</strong></p>');
    });

    it('should return HTML for multiple formatting marks', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
            <forge-rte-italic></forge-rte-italic>
            <forge-rte-underline></forge-rte-underline>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong><em><u>Formatted</u></em></strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('Formatted');
      expect(htmlOutput).toContain('<strong>');
      expect(htmlOutput).toContain('<em>');
      expect(htmlOutput).toContain('<u>');
    });

    it('should return HTML for headings', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-heading></forge-rte-heading>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('<h1>Heading 1</h1>');
      expect(htmlOutput).toContain('<h2>Heading 2</h2>');
      expect(htmlOutput).toContain('<h3>Heading 3</h3>');
    });

    it('should return HTML for bullet lists', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bullet-list></forge-rte-bullet-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('<ul>');
      expect(htmlOutput).toContain('<li>');
      expect(htmlOutput).toContain('Item 1');
      expect(htmlOutput).toContain('Item 2');
      expect(htmlOutput).toContain('</ul>');
    });

    it('should return HTML for ordered lists', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-ordered-list></forge-rte-ordered-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ol><li><p>First</p></li><li><p>Second</p></li></ol>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('<ol>');
      expect(htmlOutput).toContain('<li>');
      expect(htmlOutput).toContain('First');
      expect(htmlOutput).toContain('Second');
      expect(htmlOutput).toContain('</ol>');
    });

    it('should return HTML for links', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><a href="https://example.com">Link Text</a></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('<a');
      expect(htmlOutput).toContain('href="https://example.com"');
      expect(htmlOutput).toContain('Link Text');
      expect(htmlOutput).toContain('</a>');
    });

    it('should return empty string when editor is not initialized', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await getEditorContext(el);

      // Force destroy the editor

      (context as any)._editor?.destroy();

      (context as any)._editor = undefined;

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toBe('');
    });

    it('should preserve complex nested structures in HTML', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-heading></forge-rte-heading>
            <forge-rte-bold></forge-rte-bold>
            <forge-rte-italic></forge-rte-italic>
            <forge-rte-bullet-list></forge-rte-bullet-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em></p><ul><li><p>List item</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).toContain('<h1>Title</h1>');
      expect(htmlOutput).toContain('<p>Paragraph with <strong>bold</strong> and <em>italic</em></p>');
      expect(htmlOutput).toContain('<ul>');
      expect(htmlOutput).toContain('<li>');
    });

    it('should handle special characters in HTML output', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>&lt;tag&gt; &amp; special chars</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      // TipTap correctly preserves HTML entities for security
      expect(htmlOutput).toContain('&lt;tag&gt;');
      expect(htmlOutput).toContain('&amp;');
      expect(htmlOutput).toContain('special chars');
    });
  });

  describe('Content Roundtrip', () => {
    it('should preserve content through HTML -> Editor -> HTML', async () => {
      const originalHTML = '<p>Test paragraph with <strong>bold</strong> text</p>';

      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).toBe(originalHTML);
    });

    it('should preserve content through HTML -> JSON -> HTML', async () => {
      const originalHTML = '<p>Test with <em>italic</em></p>';

      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-italic></forge-rte-italic>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get JSON representation
      const json = context.toJSON() as ProseMirrorNode | undefined;
      expect(typeof json).toBe('object');

      // Verify HTML output matches
      const outputHTML = context.toHTML();
      expect(outputHTML).toBe(originalHTML);
    });

    it('should preserve list structure through roundtrip', async () => {
      const originalHTML = '<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>';

      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bullet-list></forge-rte-bullet-list>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).toBe(originalHTML);
    });

    it('should preserve headings through roundtrip', async () => {
      const originalHTML = '<h1>Title</h1><p>Content</p>';

      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-heading></forge-rte-heading>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).toBe(originalHTML);
    });
  });

  describe('Editor Component Methods', () => {
    it('should expose toJSON method on main editor component', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      editor?.commands.setContent('<p>Test</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el).toHaveProperty('toJSON');
      expect(typeof el.toJSON).toBe('function');

      const json = el.toJSON() as ProseMirrorNode | undefined;
      expect(typeof json).toBe('object');
    });

    it('should expose toHTML method on main editor component', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      editor?.commands.setContent('<p>Test</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el).toHaveProperty('toHTML');
      expect(typeof el.toHTML).toBe('function');

      const htmlResult = el.toHTML();
      expect(typeof htmlResult).toBe('string');
      expect(htmlResult).toBe('<p>Test</p>');
    });

    it('should return correct JSON from main editor component', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      editor?.commands.setContent('<p><strong>Bold</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = el.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];

      expect(content[0].content[0]).toHaveProperty('text', 'Bold');
      expect(content[0].content[0].marks[0]).toHaveProperty('type', 'bold');
    });

    it('should return correct HTML from main editor component', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      editor?.commands.setContent('<p><strong>Bold</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlResult = el.toHTML();
      expect(htmlResult).toBe('<p><strong>Bold</strong></p>');
    });
  });

  describe('Dynamic Content Updates', () => {
    it('should return updated JSON after content change', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Initial</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update content
      editor?.commands.setContent('<p>Updated</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON() as ProseMirrorNode | undefined;
      const content = json?.content ?? [];
      expect(content[0].content[0]).toHaveProperty('text', 'Updated');
    });

    it('should return updated HTML after content change', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-bold></forge-rte-bold>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Initial</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update content
      editor?.commands.setContent('<p>Updated</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlResult = context.toHTML();
      expect(htmlResult).toBe('<p>Updated</p>');
    });
  });
});
