import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RteItalicComponent } from '../rte-italic';

import '../../rich-text-editor';
import '../rte-italic';

describe('RTE Italic Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.italicFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.italicFeature.label).to.equal('Italic');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Make Italic' });

    expect(harness.italicFeature.label).to.equal('Make Italic');
    expect(harness.button().getAttribute('aria-label')).to.equal('Make Italic');
  });

  it('should render italic button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure italic extension', async () => {
    const harness = await createFixture();

    expect(harness.italicFeature.extensions).to.have.lengthOf(1);
    expect(harness.italicFeature.extensions[0].name).to.equal('italic');
  });

  it('should toggle italic when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply italic
    await harness.clickButton();

    // Verify italic was applied
    const output = editor.getHTML();
    expect(output).to.include('<em>test text</em>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should show active state when text is italic', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply italic formatting
    editor.chain().focus().toggleItalic().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when text is not italic', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off italic when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply italic
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleItalic().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should apply italic to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply italic
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<em>');
    expect(output).to.include('test text');
  });

  it('should remove italic from selected italic text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set italic content and select it
    editor.commands.setContent('<p><em>italic text</em></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Remove italic
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.to.include('<em>');
    expect(output).to.include('italic text');
  });

  it.skip('should work with keyboard shortcut Ctrl+I', async () => {
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

    expect(editorElement).to.exist;

    // Simulate Ctrl+I
    const event = new KeyboardEvent('keydown', {
      key: 'i',
      ctrlKey: true,
      bubbles: true,
      cancelable: true
    });
    editorElement.dispatchEvent(event);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });
});

interface ItalicFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface ItalicFixture {
  el: RichTextEditorComponent;
  italicFeature: RteItalicComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: ItalicFixtureOptions = {}): Promise<ItalicFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-italic label=${options.label || 'Italic'}></forge-rte-italic>
    </forge-rich-text-editor>
  `);

  const italicFeature = el.querySelector('forge-rte-italic') as RteItalicComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    italicFeature,
    button: () =>
      italicFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
    async clickButton() {
      this.button().click();
      await this.waitForUpdate();
    },
    async getEditor(): Promise<Editor> {
      // Access the editor from the context component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = (contextComponent as any).editorContext;
      return context.editor;
    },
    async waitForUpdate() {
      await el.updateComplete;
      // Manually trigger re-render on feature to update active state
      italicFeature.requestUpdate();
      await italicFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}
