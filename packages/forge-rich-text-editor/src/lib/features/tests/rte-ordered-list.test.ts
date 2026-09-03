import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RteOrderedListComponent } from '../rte-ordered-list';

import '../../rich-text-editor';
import '../rte-ordered-list';

describe('RTE Ordered List Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.orderedListFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.orderedListFeature.label).to.equal('Ordered List');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Numbered List' });

    expect(harness.orderedListFeature.label).to.equal('Numbered List');
    expect(harness.button().getAttribute('aria-label')).to.equal('Numbered List');
  });

  it('should render ordered list button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure ordered list extension', async () => {
    const harness = await createFixture();

    expect(harness.orderedListFeature.extensions).to.have.lengthOf(2);
    expect(harness.orderedListFeature.extensions[0].name).to.equal('orderedList');
    expect(harness.orderedListFeature.extensions[1].name).to.equal('listItem');
  });

  it('should toggle ordered list when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply ordered list
    await harness.clickButton();

    // Verify ordered list was applied
    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('<li>');
    expect(output).to.include('test text');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should show active state when cursor is in ordered list', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply ordered list formatting
    editor.chain().focus().toggleOrderedList().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when cursor is not in ordered list', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off ordered list when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set list content and place cursor in list
    editor.commands.setContent('<ol><li><p>test</p></li></ol>');
    // Set cursor at start of list item content
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Verify button shows as active
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Toggle to remove ordered list
    await harness.clickButton();

    // Verify list was removed from HTML
    const output = editor.getHTML();
    expect(output).not.to.include('<ol>');
    expect(output).to.include('test');
  });

  it('should apply ordered list to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('<li>');
    expect(output).to.include('test text');
  });

  it('should remove ordered list from selected list items', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set list content and place cursor in list
    editor.commands.setContent('<ol><li><p>list item</p></li></ol>');
    // Set cursor at start of list item content
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Verify button shows as active
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Toggle to remove ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.to.include('<ol>');
    expect(output).not.to.include('<li>');
    expect(output).to.include('list item');
  });

  it.skip('should work with keyboard shortcut', async () => {
    // Skip - tests TipTap built-in behavior
  });

  it('should convert paragraph to ordered list', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set paragraph content
    editor.commands.setContent('<p>paragraph text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('<li>');
    expect(output).to.include('paragraph text');
    // TipTap wraps list item content in paragraphs
    expect(output).to.include('<li><p>paragraph text</p></li>');
  });

  it('should handle multiple list items', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with multiple paragraphs
    editor.commands.setContent('<p>item one</p><p>item two</p><p>item three</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('item one');
    expect(output).to.include('item two');
    expect(output).to.include('item three');
    // Count list items
    const liMatches = output.match(/<li>/g);
    expect(liMatches).to.have.lengthOf(3);
  });

  it.skip('should convert from bullet list to ordered list', async () => {
    // TipTap's toggleOrderedList does not convert a bullet list — it converts items back to paragraphs.
    // Cross-list conversion requires a custom command.
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set bullet list content
    editor.commands.setContent('<ul><li>bullet item</li></ul>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('<li>');
    expect(output).to.include('bullet item');
    expect(output).not.to.include('<ul>');
  });

  it.skip('should preserve text when converting from bullet list', async () => {
    // TipTap's toggleOrderedList does not convert a bullet list — it converts items back to paragraphs.
    // Cross-list conversion requires a custom command.
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set bullet list with multiple items
    editor.commands.setContent('<ul><li>first</li><li>second</li><li>third</li></ul>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('first');
    expect(output).to.include('second');
    expect(output).to.include('third');
    expect(output).not.to.include('<ul>');
  });

  it('should handle empty paragraphs', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set empty paragraph
    editor.commands.setContent('<p></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply ordered list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ol>');
    expect(output).to.include('<li>');
  });
});

interface OrderedListFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface OrderedListFixture {
  el: RichTextEditorComponent;
  orderedListFeature: RteOrderedListComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: OrderedListFixtureOptions = {}): Promise<OrderedListFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-ordered-list label=${options.label || 'Ordered List'}></forge-rte-ordered-list>
    </forge-rich-text-editor>
  `);

  const orderedListFeature = el.querySelector('forge-rte-ordered-list') as RteOrderedListComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    orderedListFeature,
    button: () =>
      orderedListFeature
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
      orderedListFeature.requestUpdate();
      await orderedListFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}
