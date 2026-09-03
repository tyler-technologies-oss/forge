import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RichTextFeatureStrikeComponent } from '../rte-strike';

import '../../rich-text-editor';
import '../rte-strike';

describe('RTE Strike Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.label).to.equal('Strikethrough');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Strike Through' });

    expect(harness.strikeFeature.label).to.equal('Strike Through');
    expect(harness.button().getAttribute('aria-label')).to.equal('Strike Through');
  });

  it('should render strikethrough button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure strike extension', async () => {
    const harness = await createFixture();

    expect(harness.strikeFeature.extensions).to.have.lengthOf(1);
    expect(harness.strikeFeature.extensions[0].name).to.equal('strike');
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
    expect(output).to.include('<s>test text</s>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
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

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when text does not have strikethrough', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off strikethrough when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply strikethrough
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleStrike().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).to.be.false;
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
    expect(output).to.include('<s>');
    expect(output).to.include('test text');
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
    expect(output).not.to.include('<s>');
    expect(output).to.include('strikethrough text');
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

    expect(editorElement).to.exist;

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

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });
});

interface StrikeFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface StrikeFixture {
  el: RichTextEditorComponent;
  strikeFeature: RichTextFeatureStrikeComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: StrikeFixtureOptions = {}): Promise<StrikeFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-strike label=${options.label || 'Strikethrough'}></forge-rte-strike>
    </forge-rich-text-editor>
  `);

  const strikeFeature = el.querySelector('forge-rte-strike') as RichTextFeatureStrikeComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    strikeFeature,
    button: () =>
      strikeFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
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
      strikeFeature.requestUpdate();
      await strikeFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}
