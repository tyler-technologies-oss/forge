import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RteUnderlineComponent } from '../rte-underline';

import '../../rich-text-editor';
import '../rte-underline';

describe('RTE Underline Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.underlineFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.underlineFeature.label).to.equal('Underline');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Add Underline' });

    expect(harness.underlineFeature.label).to.equal('Add Underline');
    expect(harness.button().getAttribute('aria-label')).to.equal('Add Underline');
  });

  it('should render underline button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure underline extension', async () => {
    const harness = await createFixture();

    expect(harness.underlineFeature.extensions).to.have.lengthOf(1);
    expect(harness.underlineFeature.extensions[0].name).to.equal('underline');
  });

  it('should toggle underline when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply underline
    await harness.clickButton();

    // Verify underline was applied
    const output = editor.getHTML();
    expect(output).to.include('<u>test text</u>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should show active state when text is underlined', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply underline formatting
    editor.chain().focus().toggleUnderline().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when text is not underlined', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off underline when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply underline
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleUnderline().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should apply underline to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply underline
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<u>');
    expect(output).to.include('test text');
  });

  it('should remove underline from selected underlined text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set underlined content and select it
    editor.commands.setContent('<p><u>underlined text</u></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Remove underline
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.to.include('<u>');
    expect(output).to.include('underlined text');
  });

  it.skip('should work with keyboard shortcut Ctrl+U', async () => {
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

    // Simulate Ctrl+U
    const event = new KeyboardEvent('keydown', {
      key: 'u',
      ctrlKey: true,
      bubbles: true,
      cancelable: true
    });
    editorElement.dispatchEvent(event);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });
});

interface UnderlineFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface UnderlineFixture {
  el: RichTextEditorComponent;
  underlineFeature: RteUnderlineComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: UnderlineFixtureOptions = {}): Promise<UnderlineFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-underline label=${options.label || 'Underline'}></forge-rte-underline>
    </forge-rich-text-editor>
  `);

  const underlineFeature = el.querySelector('forge-rte-underline') as RteUnderlineComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    underlineFeature,
    button: () =>
      underlineFeature
        .shadowRoot!.querySelector('forge-rte-tool-button')!
        .shadowRoot!.querySelector('forge-icon-button')!,
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
      underlineFeature.requestUpdate();
      await underlineFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}
