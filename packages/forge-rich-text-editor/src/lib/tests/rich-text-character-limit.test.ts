import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextContextComponent } from '../rich-text-context.js';
import { countCharacters } from '../extensions/character-limit.js';
import '../rich-text-editor.js';
import '../features/rte-standard-tools.js';

/**
 * The character limit has to cover document structure, not just text. TipTap's CharacterCount
 * joins blocks with nothing when counting, so a paragraph break costs zero characters and a
 * document sitting exactly at its limit could still grow indefinitely through Enter - the count
 * stayed pinned at the limit while blank paragraphs accumulated.
 */
const createEditor = async (limit: number, content = ''): Promise<RichTextContextComponent> => {
  const el = await renderFixture<RichTextEditorComponent>(
    html`<forge-rich-text-editor .maxLength=${limit} .content=${content}>
      <forge-rte-standard-tools></forge-rte-standard-tools>
    </forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await new Promise(resolve => setTimeout(resolve, 180));
  return el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;
};

/** Keeps the host element too, for the cases that change `maxLength` after creation. */
const createEditorWithHost = async (limit: number): Promise<{ host: RichTextEditorComponent; context: RichTextContextComponent }> => {
  const host = await renderFixture<RichTextEditorComponent>(
    html`<forge-rich-text-editor .maxLength=${limit}>
      <forge-rte-standard-tools></forge-rte-standard-tools>
    </forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await new Promise(resolve => setTimeout(resolve, 180));
  return { host, context: host.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent };
};

describe('RichTextEditor character limit', () => {
  it('should refuse a new block once the limit is reached', async () => {
    const context = await createEditor(20);
    const editor = context.editorContext.editor!;
    editor.commands.setContent('<p>12345678901234567890</p>');
    await new Promise(resolve => setTimeout(resolve, 50));
    const blocksBefore = editor.state.doc.content.childCount;

    editor.commands.splitBlock();
    editor.commands.splitBlock();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(editor.state.doc.content.childCount).toBe(blocksBefore);
  });

  it('should refuse text once the limit is reached', async () => {
    const context = await createEditor(20);
    const editor = context.editorContext.editor!;
    editor.commands.setContent('<p>12345678901234567890</p>');
    await new Promise(resolve => setTimeout(resolve, 50));

    editor.commands.insertContent('overflow');
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(countCharacters(editor.state.doc)).toBe(20);
  });

  it('should include block boundaries in the count it reports', async () => {
    const el = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor .maxLength=${50} show-character-count>
        <forge-rte-standard-tools></forge-rte-standard-tools>
      </forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    await new Promise(resolve => setTimeout(resolve, 180));
    const context = el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;

    context.editorContext.editor!.commands.setContent('<p>abc</p><p>def</p>');
    await new Promise(resolve => setTimeout(resolve, 120));

    // Asserting the rendered count rather than the helper, so this covers the wiring: 'abc' plus
    // one block boundary plus 'def' is seven, where TipTap's own counter reports six.
    expect(context.shadowRoot!.querySelector('.editor-counts')!.textContent).toContain('7 / 50');
  });

  it('should allow a new block while below the limit', async () => {
    const context = await createEditor(50);
    const editor = context.editorContext.editor!;
    editor.commands.setContent('<p>short</p>');
    await new Promise(resolve => setTimeout(resolve, 50));

    editor.commands.splitBlock();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(editor.state.doc.content.childCount).toBe(2);
  });

  it('should load content that exceeds the limit and report it invalid', async () => {
    const context = await createEditor(10, '<p>0123456789ABCDEFGHIJ</p>');

    // Previously CharacterCount trimmed over-limit content on load with only a console warning,
    // which silently discarded a consumer's data. It now loads intact and fails validation.
    expect(countCharacters(context.editorContext.editor!.state.doc)).toBe(20);
    expect(context.shadowRoot!.querySelector('.editor-error')).toBeTruthy();
  });

  it('should enforce a limit set after the editor was created', async () => {
    // Extensions are configured once, when the editor is created, but maxLength is a property that
    // can change at any time afterwards - a storybook control and a reactive binding both do it.
    // Capturing the value left the editor filtering against the limit it started with, so a limit
    // introduced later went unenforced entirely: neither text nor new blocks were refused.
    const { host, context } = await createEditorWithHost(0);
    const editor = context.editorContext.editor!;

    host.maxLength = 20;
    await host.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 120));

    editor.commands.setContent('<p>12345678901234567890</p>');
    await new Promise(resolve => setTimeout(resolve, 60));
    editor.commands.insertContent('overflow');
    editor.commands.splitBlock();
    await new Promise(resolve => setTimeout(resolve, 60));

    expect(countCharacters(editor.state.doc)).toBe(20);
    expect(editor.state.doc.content.childCount).toBe(1);
  });

  it('should stop enforcing once the limit is removed', async () => {
    const { host, context } = await createEditorWithHost(20);
    const editor = context.editorContext.editor!;
    editor.commands.setContent('<p>12345678901234567890</p>');
    await new Promise(resolve => setTimeout(resolve, 60));

    host.maxLength = 0;
    await host.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 120));

    editor.commands.insertContent(' and more');
    await new Promise(resolve => setTimeout(resolve, 60));

    expect(countCharacters(editor.state.doc)).toBeGreaterThan(20);
  });

  it('should allow editing over-limit content back down', async () => {
    const context = await createEditor(10, '<p>0123456789ABCDEFGHIJ</p>');
    const editor = context.editorContext.editor!;

    editor.commands.setContent('<p>ok</p>');
    await new Promise(resolve => setTimeout(resolve, 80));

    expect(countCharacters(editor.state.doc)).toBe(2);
    expect(context.shadowRoot!.querySelector('.editor-error')).toBeNull();
  });
});
