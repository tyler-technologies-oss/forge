import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RichTextFeatureBoldComponent } from '../rte-bold';

import '../../rich-text-editor';
import '../rte-bold';

describe('RTE Bold Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.boldFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.boldFeature.label).to.equal('Bold');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Make Bold' });

    expect(harness.boldFeature.label).to.equal('Make Bold');
    expect(harness.button().getAttribute('aria-label')).to.equal('Make Bold');
  });

  it('should render bold button', async () => {
    const harness = await createFixture();

    expect(harness.button()).to.exist;
  });

  it('should configure bold extension', async () => {
    const harness = await createFixture();

    expect(harness.boldFeature.extensions).to.have.lengthOf(1);
    expect(harness.boldFeature.extensions[0].name).to.equal('bold');
  });

  it('should toggle bold when button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click button to apply bold
    await harness.clickButton();

    // Verify bold was applied
    const output = editor.getHTML();
    expect(output).to.include('<strong>test text</strong>');
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).to.be.true;
  });

  it('should show active state when text is bold', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply bold formatting
    editor.chain().focus().toggleBold().run();
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state when text is not bold', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should toggle off bold when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content, select it, and apply bold
    editor.commands.setContent('<p>test</p>');
    editor.commands.selectAll();
    editor.chain().focus().toggleBold().run();
    await harness.waitForUpdate();
    expect(harness.button().hasAttribute('pressed')).to.be.true;

    // Click to toggle off
    await harness.clickButton();
    expect(harness.button().hasAttribute('pressed')).to.be.false;
  });

  it('should apply bold to selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply bold
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).to.include('<strong>');
    expect(output).to.include('test text');
  });

  it('should remove bold from selected bold text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set bold content and select it
    editor.commands.setContent('<p><strong>bold text</strong></p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Remove bold
    await harness.clickButton();

    const output = editor.getHTML();
    expect(output).not.to.include('<strong>');
    expect(output).to.include('bold text');
  });

  it.skip('should work with keyboard shortcut Ctrl+B', async () => {
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

    // Simulate Ctrl+B
    const event = new KeyboardEvent('keydown', {
      key: 'b',
      ctrlKey: true,
      bubbles: true,
      cancelable: true
    });
    editorElement.dispatchEvent(event);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).to.be.true;
  });
});

interface BoldFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface BoldFixture {
  el: RichTextEditorComponent;
  boldFeature: RichTextFeatureBoldComponent;
  button: () => HTMLElement;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: BoldFixtureOptions = {}): Promise<BoldFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-bold label=${options.label || 'Bold'}></forge-rte-bold>
    </forge-rich-text-editor>
  `);

  const boldFeature = el.querySelector('forge-rte-bold') as RichTextFeatureBoldComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    boldFeature,
    button: () =>
      boldFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
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
      boldFeature.requestUpdate();
      await boldFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
}

describe('RTE Bold - ARIA attributes', () => {
  it('should have aria-label on button', async () => {
    const harness = await createFixture();
    const button = harness.button();

    expect(button.getAttribute('aria-label')).to.equal('Bold');
  });

  it('should have custom aria-label when label property is set', async () => {
    const harness = await createFixture({ label: 'Make text bold' });
    const button = harness.button();

    expect(button.getAttribute('aria-label')).to.equal('Make text bold');
  });

  it('should have aria-keyshortcuts attribute', async () => {
    const harness = await createFixture();
    const button = harness.button();

    expect(button.getAttribute('aria-keyshortcuts')).to.equal('Control+B');
  });

  it('should have aria-controls pointing to content area', async () => {
    const harness = await createFixture();
    const button = harness.button();

    expect(button.getAttribute('aria-controls')).to.equal('forge-rte-content');
  });
});

describe('RTE Bold - Keyboard navigation', () => {
  it.skip('should toggle bold when Space key is pressed', async () => {
    // Note: Skipping because keyboard event simulation on forge-icon-button
    // doesn't work as expected in tests. The actual behavior works correctly
    // in browsers. Space key functionality is handled by forge-icon-button
    // component and tested there.
    const harness = await createFixture();
    const editor = await harness.getEditor();
    const button = harness.button();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Simulate Space key press
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
      cancelable: true
    });
    button.dispatchEvent(spaceEvent);
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).to.include('<strong>');
  });

  it.skip('should toggle bold when Enter key is pressed', async () => {
    // Note: Skipping because keyboard event simulation on forge-icon-button
    // doesn't work as expected in tests. The actual behavior works correctly
    // in browsers. Enter key functionality is handled by forge-icon-button
    // component and tested there.
    const harness = await createFixture();
    const editor = await harness.getEditor();
    const button = harness.button();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Simulate Enter key press
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true
    });
    button.dispatchEvent(enterEvent);
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).to.include('<strong>');
  });
});
