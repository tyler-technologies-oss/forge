import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteStrikeComponent } from '../rte-strike.js';

import '../../rich-text-editor.js';
import '../rte-strike.js';

describe('RTE Strike Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.shadowRoot).toBeTruthy();
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.label).toBe('Strikethrough');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Strike Through' });

    expect(harness.strikeFeature.label).toBe('Strike Through');
    expect(harness.button().getAttribute('aria-label')).toBe('Strike Through');
  });

  it('should render strikethrough button', async () => {
    const harness = await createFixture();

    expect(harness.button()).toBeTruthy();
  });

  it('should configure strike extension', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.extensions).toHaveLength(1);
    expect(harness.strikeFeature.extensions[0].name).toBe('strike');
  });

  it('should toggle strike when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply strikethrough
    await harness.clickButton();

    // Verify strikethrough was applied
    const output = editor.getHTML();
    expect(output).toContain('<s>test text</s>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should show active state when text has strikethrough', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply strikethrough formatting
    editor.chain().focus().toggleStrike().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).toBe(true);
  });

  it('should not show active state when text does not have strikethrough', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should toggle off strikethrough when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply strikethrough
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleStrike().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).toBe(true);

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should apply strikethrough to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply strikethrough
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).toContain('<s>');
    expect(output).toContain('test text');
  });

  it('should remove strikethrough from selected strikethrough text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set strikethrough content and select it
    editor.commands.setContent('<p><s>strikethrough text</s></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Remove strikethrough
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.toContain('<s>');
    expect(output).toContain('strikethrough text');
  });

  it.skip('should work with keyboard shortcut Ctrl+Shift+S', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.commands.focus();
    await harness.waitForUpdate();

    // Get editor DOM element from content component
    const contextElement = harness.el.shadowRoot!.querySelector('forge-rich-text-context')!;
    const contentElement = contextElement.shadowRoot!.querySelector('forge-rich-text-content')!;
    const editorElement = contentElement.shadowRoot!.querySelector('.ProseMirror') as HTMLElement;

    expect(editorElement).toBeTruthy();

    // Simulate Ctrl+Shift+S
    const event = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
      cancelable: true
    });
    editorElement.dispatchEvent(event);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).toBe(true);
  });
});

interface StrikeFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface StrikeFixture {
  el: RichTextEditorComponent;
  strikeFeature: RteStrikeComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: StrikeFixtureOptions = {}): Promise<StrikeFixture> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
        <forge-rte-strike label=${options.label || 'Strikethrough'}></forge-rte-strike>
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );

  const strikeFeature = el.querySelector('forge-rte-strike') as RteStrikeComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const harness: StrikeFixture = {
    el,
    strikeFeature,
    button: () => strikeFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
    async clickButton() {
      this.button().click();
      await this.waitForUpdate();
    },
    async getEditor(): Promise<Editor> {
      // Access the editor from the context component

      const context = (contextComponent as any).editorContext;
      return context.editor;
    },
    async waitForUpdate() {
      await el.updateComplete;
      // Manually trigger re-render on feature to update active state
      strikeFeature.requestUpdate();
      await strikeFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return harness;
}
