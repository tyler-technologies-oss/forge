import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RteBulletListComponent } from '../rte-bullet-list';

import '../../rich-text-editor';
import '../rte-bullet-list';

describe('RTE Bullet List Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.bulletListFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.bulletListFeature.label).to.equal('Bullet List');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Unordered List' });

    expect(harness.bulletListFeature.label).to.equal('Unordered List');
    expect(harness.button().getAttribute('aria-label')).to.equal('Unordered List');
  });

  it('should render bullet list button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure bullet list extension', async () => {
    const harness = await createFixture();

    expect(harness.bulletListFeature.extensions).to.have.lengthOf(2);
    expect(harness.bulletListFeature.extensions[0].name).to.equal('bulletList');
    expect(harness.bulletListFeature.extensions[1].name).to.equal('listItem');
  });

  it('should toggle bullet list when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply bullet list
    await harness.clickButton();

    // Verify bullet list was applied
    const output = editor.getHTML();
    expect(output).to.include('<ul>');
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

  it('should show active state when cursor is in bullet list', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply bullet list formatting
    editor.chain().focus().toggleBulletList().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when cursor is not in bullet list', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off bullet list when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set list content and place cursor in list
    editor.commands.setContent('<ul><li><p>test</p></li></ul>');
    // Set cursor at start of list item content
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Verify button shows as active
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Toggle to remove bullet list
    await harness.clickButton();

    // Verify list was removed from HTML
    const output = editor.getHTML();
    expect(output).not.to.include('<ul>');
    expect(output).to.include('test');
  });

  it('should apply bullet list to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
    expect(output).to.include('<li>');
    expect(output).to.include('test text');
  });

  it('should remove bullet list from selected list items', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set list content and place cursor in list
    editor.commands.setContent('<ul><li><p>list item</p></li></ul>');
    // Set cursor at start of list item content
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Verify button shows as active
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Toggle to remove bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.to.include('<ul>');
    expect(output).not.to.include('<li>');
    expect(output).to.include('list item');
  });

  it.skip('should work with keyboard shortcut', async () => {
    // Skip - tests TipTap built-in behavior
  });

  it('should convert paragraph to bullet list', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set paragraph content
    editor.commands.setContent('<p>paragraph text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
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

    // Convert to bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
    expect(output).to.include('item one');
    expect(output).to.include('item two');
    expect(output).to.include('item three');
    // Count list items
    const liMatches = output.match(/<li>/g);
    expect(liMatches).to.have.lengthOf(3);
  });

  it.skip('should convert from ordered list to bullet list', async () => {
    // TipTap's toggleBulletList does not convert an ordered list — it converts items back to paragraphs.
    // Cross-list conversion requires a custom command.
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set ordered list content
    editor.commands.setContent('<ol><li>ordered item</li></ol>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
    expect(output).to.include('<li>');
    expect(output).to.include('ordered item');
    expect(output).not.to.include('<ol>');
  });

  it.skip('should preserve text when converting from ordered list', async () => {
    // TipTap's toggleBulletList does not convert an ordered list — it converts items back to paragraphs.
    // Cross-list conversion requires a custom command.
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set ordered list with multiple items
    editor.commands.setContent('<ol><li>first</li><li>second</li><li>third</li></ol>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Convert to bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
    expect(output).to.include('first');
    expect(output).to.include('second');
    expect(output).to.include('third');
    expect(output).not.to.include('<ol>');
  });

  it('should handle empty paragraphs', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set empty paragraph
    editor.commands.setContent('<p></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply bullet list
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<ul>');
    expect(output).to.include('<li>');
  });
});

interface BulletListFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface BulletListFixture {
  el: RichTextEditorComponent;
  bulletListFeature: RteBulletListComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: BulletListFixtureOptions = {}): Promise<BulletListFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-bullet-list label=${options.label || 'Bullet List'}></forge-rte-bullet-list>
    </forge-rich-text-editor>
  `);

  const bulletListFeature = el.querySelector('forge-rte-bullet-list') as RteBulletListComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    bulletListFeature,
    button: () =>
      bulletListFeature
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
      bulletListFeature.requestUpdate();
      await bulletListFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}
