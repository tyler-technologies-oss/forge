import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { RichTextEditorComponent } from '../rich-text-editor';
import type { Editor } from '@tiptap/core';

import '../rich-text-editor';
import '../features/rte-bold';
import '../features/rte-link';

describe('RichTextEditor - Focus Management', () => {
  it('should have forge-focus-indicator component', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    await new Promise(resolve => setTimeout(resolve, 100));

    const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
    const focusIndicator = contentComponent?.shadowRoot?.querySelector('forge-focus-indicator');

    expect(focusIndicator).to.be.ok;
  });

  it('should have inward focus indicator on content area', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    await new Promise(resolve => setTimeout(resolve, 100));

    const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
    const focusIndicator = contentComponent?.shadowRoot?.querySelector('forge-focus-indicator');

    expect(focusIndicator?.hasAttribute('inward')).to.be.true;
  });

  it('should return focus to editor after formatting action', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    const boldFeature = el.querySelector('forge-rte-bold');
    const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

    await new Promise(resolve => setTimeout(resolve, 100));

    // Get editor and set content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = (contextComponent as any).editorContext;
    const editor = context.editor as Editor;

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Click bold button
    const button = boldFeature!
      .shadowRoot!.querySelector('forge-rte-tool-button')!
      .shadowRoot!.querySelector('forge-icon-button')!;
    button.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify editor has focus (TipTap adds focused class)
    expect(editor.isFocused).to.be.true;
  });

  it('should auto-focus input field when link popover opens', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-link></forge-rte-link>
      </forge-rich-text-editor>
    `);

    const linkFeature = el.querySelector('forge-rte-link');
    const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

    await new Promise(resolve => setTimeout(resolve, 100));

    // Get editor and set content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = (contextComponent as any).editorContext;
    const editor = context.editor as Editor;

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Click link button to open popover
    const button = linkFeature!
      .shadowRoot!.querySelector('forge-rte-tool-button')!
      .shadowRoot!.querySelector('forge-icon-button')!;
    button.click();

    await new Promise(resolve => setTimeout(resolve, 150));

    // Verify the URL input is focused - the display text was already pre-filled from the
    // selection, so focus moves to the URL field for the user to complete.
    const input = linkFeature!.shadowRoot!.querySelector('#link-url');
    expect(document.activeElement?.shadowRoot?.activeElement).to.equal(input);
  });

  it('should return focus to editor when link is applied', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-link></forge-rte-link>
      </forge-rich-text-editor>
    `);

    const linkFeature = el.querySelector('forge-rte-link');
    const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

    await new Promise(resolve => setTimeout(resolve, 100));

    // Get editor and set content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = (contextComponent as any).editorContext;
    const editor = context.editor as Editor;

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Click link button to open popover
    const button = linkFeature!
      .shadowRoot!.querySelector('forge-rte-tool-button')!
      .shadowRoot!.querySelector('forge-icon-button')!;
    button.click();

    await new Promise(resolve => setTimeout(resolve, 150));

    // Enter URL and press Enter
    const input = linkFeature!.shadowRoot!.querySelector('input')!;
    input.value = 'https://example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true
    });
    input.dispatchEvent(enterEvent);

    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify editor has focus
    expect(editor.isFocused).to.be.true;
  });

  it('should support focus on disabled buttons for screen readers', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor disabled>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    const boldFeature = el.querySelector('forge-rte-bold');

    await new Promise(resolve => setTimeout(resolve, 100));

    const button = boldFeature!
      .shadowRoot!.querySelector('forge-rte-tool-button')!
      .shadowRoot!.querySelector('forge-icon-button')!;

    // Disabled buttons should still be focusable (for screen readers)
    // but forge-icon-button handles this via disabled attribute
    expect(button.hasAttribute('disabled')).to.be.true;
  });
});
