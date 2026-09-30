import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteUndoRedoComponent } from '../rte-undo-redo.js';

import '../../rich-text-editor.js';
import '../rte-undo-redo.js';

describe('RTE Undo Redo Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.undoRedoFeature.shadowRoot).toBeTruthy();
  });

  it('should have expected default labels', async () => {
    const harness = await createFixture();

    expect(harness.undoRedoFeature.undoLabel).toBe('Undo');
    expect(harness.undoRedoFeature.redoLabel).toBe('Redo');
  });

  it('should set custom labels via properties', async () => {
    const harness = await createFixture();

    // Set labels via properties
    harness.undoRedoFeature.undoLabel = 'Go Back';
    harness.undoRedoFeature.redoLabel = 'Go Forward';
    await harness.waitForUpdate();

    expect(harness.undoRedoFeature.undoLabel).toBe('Go Back');
    expect(harness.undoRedoFeature.redoLabel).toBe('Go Forward');
    expect(harness.undoButton().getAttribute('aria-label')).toBe('Go Back');
    expect(harness.redoButton().getAttribute('aria-label')).toBe('Go Forward');
  });

  it('should render undo and redo buttons', async () => {
    const harness = await createFixture();

    expect(harness.undoButton()).toBeTruthy();
    expect(harness.redoButton()).toBeTruthy();
  });

  it('should configure undo redo extension', async () => {
    const harness = await createFixture();

    expect(harness.undoRedoFeature.extensions).toHaveLength(1);
    expect(harness.undoRedoFeature.extensions[0].name).toBe('undoRedo');
  });

  it('should disable undo button when no history', async () => {
    const harness = await createFixture();

    // Initially, no history to undo
    expect(harness.undoButton().hasAttribute('disabled')).toBe(true);
  });

  it('should disable redo button when no redo history', async () => {
    const harness = await createFixture();

    // Initially, no history to redo
    expect(harness.redoButton().hasAttribute('disabled')).toBe(true);
  });

  it('should enable undo button after making a change', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make a change
    editor.commands.setContent('<p>new content</p>');
    await harness.waitForUpdate();

    expect(harness.undoButton().hasAttribute('disabled')).toBe(false);
  });

  it('should undo content change when undo button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Get initial content
    const initialContent = editor.getHTML();

    // Make a change
    editor.commands.setContent('<p>modified content</p>');
    await harness.waitForUpdate();
    expect(editor.getHTML()).toContain('modified content');

    // Undo the change
    await harness.clickUndoButton();

    const output = editor.getHTML();
    expect(output).toBe(initialContent);
    expect(output).not.toContain('modified content');
  });

  it('should enable redo button after undoing', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make a change
    editor.commands.setContent('<p>new content</p>');
    await harness.waitForUpdate();

    // Undo the change
    await harness.clickUndoButton();

    // Redo button should now be enabled
    expect(harness.redoButton().hasAttribute('disabled')).toBe(false);
  });

  it('should redo content change when redo button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make a change
    editor.commands.setContent('<p>redoable content</p>');
    await harness.waitForUpdate();

    // Undo the change
    await harness.clickUndoButton();
    expect(editor.getHTML()).not.toContain('redoable content');

    // Redo the change
    await harness.clickRedoButton();

    const output = editor.getHTML();
    expect(output).toContain('redoable content');
  });

  it('should handle multiple undo operations', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    const initialContent = editor.getHTML();

    // Make first change
    editor.commands.setContent('<p>change 1</p>');
    await harness.waitForUpdate();

    // Make second change
    editor.commands.insertContent(' and change 2');
    await harness.waitForUpdate();

    // Make third change
    editor.commands.insertContent(' and change 3');
    await harness.waitForUpdate();
    expect(editor.getHTML()).toContain('change 3');

    // Undo once - should undo last insertion
    await harness.clickUndoButton();
    const content1 = editor.getHTML();
    expect(content1).not.toContain('change 3');

    // Undo again
    await harness.clickUndoButton();
    const content2 = editor.getHTML();
    expect(content2).not.toContain('change 2');

    // Undo again - back to initial
    await harness.clickUndoButton();
    expect(editor.getHTML()).toBe(initialContent);
  });

  it('should handle multiple redo operations', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make base content
    editor.commands.setContent('<p>base</p>');
    await harness.waitForUpdate();

    // Make incremental changes
    editor.commands.insertContent(' one');
    await harness.waitForUpdate();
    editor.commands.insertContent(' two');
    await harness.waitForUpdate();
    editor.commands.insertContent(' three');
    await harness.waitForUpdate();

    const finalContent = editor.getHTML();
    expect(finalContent).toContain('base one two three');

    // Undo all incremental changes
    await harness.clickUndoButton();
    await harness.clickUndoButton();
    await harness.clickUndoButton();

    // Redo changes one by one
    await harness.clickRedoButton();
    expect(editor.getHTML()).toContain('one');

    await harness.clickRedoButton();
    expect(editor.getHTML()).toContain('two');

    await harness.clickRedoButton();
    expect(editor.getHTML()).toContain('three');
  });

  it('should clear redo history after new change', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make a change
    editor.commands.setContent('<p>first change</p>');
    await harness.waitForUpdate();

    // Undo it
    await harness.clickUndoButton();

    // Redo should be available
    expect(harness.redoButton().hasAttribute('disabled')).toBe(false);

    // Make a new change
    editor.commands.setContent('<p>new branch</p>');
    await harness.waitForUpdate();

    // Redo should no longer be available
    expect(harness.redoButton().hasAttribute('disabled')).toBe(true);
  });

  it('should handle undo with content changes', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Get the starting content
    const startContent = editor.getHTML();

    // Make a change by inserting content
    editor.commands.insertContent('new content');
    await harness.waitForUpdate();
    expect(editor.getHTML()).toContain('new content');

    // Undo the change
    await harness.clickUndoButton();
    expect(editor.getHTML()).toBe(startContent);
    expect(editor.getHTML()).not.toContain('new content');
  });

  it('should preserve text content during undo/redo', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Make a change
    editor.commands.insertContent('test content');
    await harness.waitForUpdate();
    const withContent = editor.getHTML();
    expect(withContent).toContain('test content');

    // Undo
    await harness.clickUndoButton();
    const afterUndo = editor.getHTML();
    expect(afterUndo).not.toContain('test content');

    // Redo - should restore the content
    await harness.clickRedoButton();
    const afterRedo = editor.getHTML();
    expect(afterRedo).toContain('test content');
    expect(afterRedo).toBe(withContent);
  });

  it('should disable both buttons when the editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.undoButton().hasAttribute('disabled')).toBe(true);
    expect(harness.redoButton().hasAttribute('disabled')).toBe(true);
  });

  it('should disable both buttons when the editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.undoButton().hasAttribute('disabled')).toBe(true);
    expect(harness.redoButton().hasAttribute('disabled')).toBe(true);
  });

  it('should keep both buttons disabled on a disabled editor that has history', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>new content</p>');
    await harness.waitForUpdate();
    expect(harness.undoButton().hasAttribute('disabled')).toBe(false);

    harness.el.disabled = true;
    await harness.waitForUpdate();

    expect(harness.undoButton().hasAttribute('disabled')).toBe(true);
    expect(harness.redoButton().hasAttribute('disabled')).toBe(true);
  });
});

interface UndoRedoFixtureOptions {
  undoLabel?: string;
  redoLabel?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface UndoRedoFixture {
  el: RichTextEditorComponent;
  undoRedoFeature: RteUndoRedoComponent;
  undoButton: () => HTMLElement;
  redoButton: () => HTMLElement;
  clickUndoButton: () => Promise<void>;
  clickRedoButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: UndoRedoFixtureOptions = {}): Promise<UndoRedoFixture> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
        <forge-rte-undo-redo undo-label=${options.undoLabel || 'Undo'} redo-label=${options.redoLabel || 'Redo'}></forge-rte-undo-redo>
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );

  const undoRedoFeature = el.querySelector('forge-rte-undo-redo') as RteUndoRedoComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const buttons = undoRedoFeature.shadowRoot!.querySelectorAll('forge-icon-button');

  const harness: UndoRedoFixture = {
    el,
    undoRedoFeature,
    undoButton: () => buttons[0],
    redoButton: () => buttons[1],
    async clickUndoButton() {
      this.undoButton().click();
      await this.waitForUpdate();
    },
    async clickRedoButton() {
      this.redoButton().click();
      await this.waitForUpdate();
    },
    async getEditor(): Promise<Editor> {
      // Access the editor from the context component

      const context = (contextComponent as any).editorContext;
      return context.editor;
    },
    async waitForUpdate() {
      await el.updateComplete;
      // Manually trigger re-render on feature to update button states
      undoRedoFeature.requestUpdate();
      await undoRedoFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return harness;
}
