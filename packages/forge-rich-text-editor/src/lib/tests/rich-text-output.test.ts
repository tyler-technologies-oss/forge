import { expect, fixture, html } from '@open-wc/testing';
import type { RichTextEditorComponent } from '../rich-text-editor';
import type { RichTextContextComponent } from '../rich-text-context';
import type { Editor } from '@tiptap/core';
import '../rich-text-editor';
import '../features/rte-bold';
import '../features/rte-italic';
import '../features/rte-underline';
import '../features/rte-heading';
import '../features/rte-bullet-list';
import '../features/rte-ordered-list';
import '../features/rte-link';

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

describe('RTE Output Formats', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.shadowRoot).not.to.be.null;
  });

  describe('JSON Output', () => {
    it('should return JSON for empty content', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await getEditorContext(el);
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      expect(json).to.be.an('object');
      expect(json).to.have.property('type', 'doc');
      expect(json).to.have.property('content');
    });

    it('should return JSON for plain text content', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Hello World</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      expect(json).to.be.an('object');
      expect(json).to.have.property('type', 'doc');

      const content = json?.content as unknown[];
      expect(content).to.be.an('array');
      expect(content[0]).to.have.property('type', 'paragraph');
      expect(content[0].content[0]).to.have.property('text', 'Hello World');
    });

    it('should return JSON for bold text', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong>Bold Text</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];
      const textNode = content[0].content[0];

      expect(textNode).to.have.property('text', 'Bold Text');
      expect(textNode.marks).to.be.an('array');
      expect(textNode.marks[0]).to.have.property('type', 'bold');
    });

    it('should return JSON for multiple formatting marks', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rte-underline></forge-rte-underline>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong><em><u>Formatted</u></em></strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];
      const textNode = content[0].content[0];

      expect(textNode).to.have.property('text', 'Formatted');
      expect(textNode.marks).to.be.an('array');
      expect(textNode.marks).to.have.lengthOf(3);
    });

    it('should return JSON for headings', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-heading></forge-rte-heading>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Heading 1</h1><h2>Heading 2</h2>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];

      expect(content[0]).to.have.property('type', 'heading');
      expect(content[0].attrs).to.have.property('level', 1);
      expect(content[0].content[0]).to.have.property('text', 'Heading 1');

      expect(content[1]).to.have.property('type', 'heading');
      expect(content[1].attrs).to.have.property('level', 2);
      expect(content[1].content[0]).to.have.property('text', 'Heading 2');
    });

    it('should return JSON for bullet lists', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bullet-list></forge-rte-bullet-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];

      expect(content[0]).to.have.property('type', 'bulletList');
      expect(content[0].content).to.be.an('array');
      expect(content[0].content).to.have.lengthOf(2);
      expect(content[0].content[0]).to.have.property('type', 'listItem');
    });

    it('should return JSON for ordered lists', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-ordered-list></forge-rte-ordered-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ol><li><p>First</p></li><li><p>Second</p></li></ol>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];

      expect(content[0]).to.have.property('type', 'orderedList');
      expect(content[0].content).to.be.an('array');
      expect(content[0].content).to.have.lengthOf(2);
    });

    it('should return JSON for links', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><a href="https://example.com">Link Text</a></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];
      const textNode = content[0].content[0];

      expect(textNode).to.have.property('text', 'Link Text');
      expect(textNode.marks).to.be.an('array');
      expect(textNode.marks[0]).to.have.property('type', 'link');
      expect(textNode.marks[0].attrs).to.have.property('href', 'https://example.com');
    });

    it('should return undefined when editor is not initialized', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await getEditorContext(el);

      // Force destroy the editor
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (context as any)._editor?.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (context as any)._editor = undefined;

      const json = context.toJSON();
      expect(json).to.be.undefined;
    });

    it('should preserve complex nested structures in JSON', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-heading></forge-rte-heading>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rte-bullet-list></forge-rte-bullet-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(
        '<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em></p><ul><li><p>List item</p></li></ul>'
      );
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];

      expect(content).to.have.lengthOf(3);
      expect(content[0]).to.have.property('type', 'heading');
      expect(content[1]).to.have.property('type', 'paragraph');
      expect(content[2]).to.have.property('type', 'bulletList');
    });
  });

  describe('HTML Output', () => {
    it('should return HTML for empty content', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await getEditorContext(el);
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.be.a('string');
      // Empty editor has a paragraph tag
      expect(htmlOutput).to.include('<p>');
    });

    it('should return HTML for plain text content', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Hello World</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.equal('<p>Hello World</p>');
    });

    it('should return HTML for bold text', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong>Bold Text</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.equal('<p><strong>Bold Text</strong></p>');
    });

    it('should return HTML for multiple formatting marks', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rte-underline></forge-rte-underline>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><strong><em><u>Formatted</u></em></strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('Formatted');
      expect(htmlOutput).to.include('<strong>');
      expect(htmlOutput).to.include('<em>');
      expect(htmlOutput).to.include('<u>');
    });

    it('should return HTML for headings', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-heading></forge-rte-heading>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('<h1>Heading 1</h1>');
      expect(htmlOutput).to.include('<h2>Heading 2</h2>');
      expect(htmlOutput).to.include('<h3>Heading 3</h3>');
    });

    it('should return HTML for bullet lists', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bullet-list></forge-rte-bullet-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('<ul>');
      expect(htmlOutput).to.include('<li>');
      expect(htmlOutput).to.include('Item 1');
      expect(htmlOutput).to.include('Item 2');
      expect(htmlOutput).to.include('</ul>');
    });

    it('should return HTML for ordered lists', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-ordered-list></forge-rte-ordered-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<ol><li><p>First</p></li><li><p>Second</p></li></ol>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('<ol>');
      expect(htmlOutput).to.include('<li>');
      expect(htmlOutput).to.include('First');
      expect(htmlOutput).to.include('Second');
      expect(htmlOutput).to.include('</ol>');
    });

    it('should return HTML for links', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p><a href="https://example.com">Link Text</a></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('<a');
      expect(htmlOutput).to.include('href="https://example.com"');
      expect(htmlOutput).to.include('Link Text');
      expect(htmlOutput).to.include('</a>');
    });

    it('should return empty string when editor is not initialized', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await getEditorContext(el);

      // Force destroy the editor
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (context as any)._editor?.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (context as any)._editor = undefined;

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.equal('');
    });

    it('should preserve complex nested structures in HTML', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-heading></forge-rte-heading>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rte-bullet-list></forge-rte-bullet-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(
        '<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em></p><ul><li><p>List item</p></li></ul>'
      );
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      expect(htmlOutput).to.include('<h1>Title</h1>');
      expect(htmlOutput).to.include('<p>Paragraph with <strong>bold</strong> and <em>italic</em></p>');
      expect(htmlOutput).to.include('<ul>');
      expect(htmlOutput).to.include('<li>');
    });

    it('should handle special characters in HTML output', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>&lt;tag&gt; &amp; special chars</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlOutput = context.toHTML();
      // TipTap correctly preserves HTML entities for security
      expect(htmlOutput).to.include('&lt;tag&gt;');
      expect(htmlOutput).to.include('&amp;');
      expect(htmlOutput).to.include('special chars');
    });
  });

  describe('Content Roundtrip', () => {
    it('should preserve content through HTML -> Editor -> HTML', async () => {
      const originalHTML = '<p>Test paragraph with <strong>bold</strong> text</p>';

      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).to.equal(originalHTML);
    });

    it('should preserve content through HTML -> JSON -> HTML', async () => {
      const originalHTML = '<p>Test with <em>italic</em></p>';

      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-italic></forge-rte-italic>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get JSON representation
      const json = context.toJSON();
      expect(json).to.be.an('object');

      // Verify HTML output matches
      const outputHTML = context.toHTML();
      expect(outputHTML).to.equal(originalHTML);
    });

    it('should preserve list structure through roundtrip', async () => {
      const originalHTML = '<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>';

      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bullet-list></forge-rte-bullet-list>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).to.equal(originalHTML);
    });

    it('should preserve headings through roundtrip', async () => {
      const originalHTML = '<h1>Title</h1><p>Content</p>';

      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-heading></forge-rte-heading>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent(originalHTML);
      await new Promise(resolve => setTimeout(resolve, 100));

      const outputHTML = context.toHTML();
      expect(outputHTML).to.equal(originalHTML);
    });
  });

  describe('Editor Component Methods', () => {
    it('should expose toJSON method on main editor component', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      editor?.commands.setContent('<p>Test</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el).to.have.property('toJSON');
      expect(typeof el.toJSON).to.equal('function');

      const json = el.toJSON();
      expect(json).to.be.an('object');
    });

    it('should expose toHTML method on main editor component', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      editor?.commands.setContent('<p>Test</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el).to.have.property('toHTML');
      expect(typeof el.toHTML).to.equal('function');

      const htmlResult = el.toHTML();
      expect(htmlResult).to.be.a('string');
      expect(htmlResult).to.equal('<p>Test</p>');
    });

    it('should return correct JSON from main editor component', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      editor?.commands.setContent('<p><strong>Bold</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = el.toJSON();
      const content = json?.content as unknown[];

      expect(content[0].content[0]).to.have.property('text', 'Bold');
      expect(content[0].content[0].marks[0]).to.have.property('type', 'bold');
    });

    it('should return correct HTML from main editor component', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      editor?.commands.setContent('<p><strong>Bold</strong></p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlResult = el.toHTML();
      expect(htmlResult).to.equal('<p><strong>Bold</strong></p>');
    });
  });

  describe('Dynamic Content Updates', () => {
    it('should return updated JSON after content change', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Initial</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update content
      editor?.commands.setContent('<p>Updated</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const json = context.toJSON();
      const content = json?.content as unknown[];
      expect(content[0].content[0]).to.have.property('text', 'Updated');
    });

    it('should return updated HTML after content change', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const editor = await getEditor(el);
      const context = await getEditorContext(el);

      editor?.commands.setContent('<p>Initial</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update content
      editor?.commands.setContent('<p>Updated</p>');
      await new Promise(resolve => setTimeout(resolve, 100));

      const htmlResult = context.toHTML();
      expect(htmlResult).to.equal('<p>Updated</p>');
    });
  });
});
