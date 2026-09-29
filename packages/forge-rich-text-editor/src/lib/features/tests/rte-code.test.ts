import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteCodeComponent } from '../rte-code.js';

import '../../rich-text-editor.js';
import '../rte-code.js';

describe('RTE Code Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.codeFeature.shadowRoot).toBeTruthy();
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.codeFeature.label).toBe('code');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Inline Code' });

    expect(harness.codeFeature.label).toBe('Inline Code');
    expect(harness.button().getAttribute('aria-label')).toBe('Inline Code');
  });

  it('should render code button', async () => {
    const harness = await createFixture();

    expect(harness.button()).toBeTruthy();
  });

  it('should configure code extension', async () => {
    const harness = await createFixture();

    expect(harness.codeFeature.extensions).toHaveLength(1);
    expect(harness.codeFeature.extensions[0].name).toBe('code');
  });

  it('should toggle code when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply code
    await harness.clickButton();

    // Verify code was applied
    const output = editor.getHTML();
    expect(output).toContain('<code>test text</code>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should show active state when text has code formatting', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply code formatting
    editor.chain().focus().toggleCode().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).toBe(true);
  });

  it('should not show active state when text does not have code formatting', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should toggle off code when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply code
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleCode().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).toBe(true);

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should apply code to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply code
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).toContain('<code>');
    expect(output).toContain('test text');
  });

  it('should remove code from selected code text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set code content and select it
    editor.commands.setContent('<p><code>code text</code></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Remove code
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.toContain('<code>');
    expect(output).toContain('code text');
  });

  it('should apply code to partial text selection', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select partial text
    editor.commands.setContent('<p>some text here</p>');
    editor.commands.setTextSelection({ from: 6, to: 10 }); // Select "text"
    await harness.waitForUpdate();

    // Apply code
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).toContain('<code>text</code>');
    expect(output).toContain('some');
    expect(output).toContain('here');
  });

  it('should preserve text when toggling code format', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    const testText = 'preserved text';
    editor.commands.setContent(`<p>${testText}</p>`);
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply code
    await harness.clickButton();
    let output = editor.getHTML();
    expect(output).toContain(testText);
    expect(output).toContain('<code>');

    // Remove code
    await harness.clickButton();
    output = editor.getHTML();
    expect(output).toContain(testText);
    expect(output).not.toContain('<code>');
  });
});

interface CodeFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface CodeFixture {
  el: RichTextEditorComponent;
  codeFeature: RteCodeComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: CodeFixtureOptions = {}): Promise<CodeFixture> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
        <forge-rte-code label=${options.label || 'code'}></forge-rte-code>
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );

  const codeFeature = el.querySelector('forge-rte-code') as RteCodeComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const harness: CodeFixture = {
    el,
    codeFeature,
    button: () => codeFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
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
      codeFeature.requestUpdate();
      await codeFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return harness;
}
