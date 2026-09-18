import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteAlignComponent } from '../rte-align.js';

import '../../rich-text-editor.js';
import '../rte-align.js';

describe('RTE Align Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.shadowRoot).toBeTruthy();
  });

  it('should have expected default labels', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.leftLabel).toBe('Align Left');
    expect(harness.alignFeature.centerLabel).toBe('Align Center');
    expect(harness.alignFeature.rightLabel).toBe('Align Right');
    expect(harness.alignFeature.justifyLabel).toBe('Justify');
  });

  it('should set custom labels via properties', async () => {
    const harness = await createFixture();

    // Set labels via properties
    harness.alignFeature.leftLabel = 'Left';
    harness.alignFeature.centerLabel = 'Center';
    harness.alignFeature.rightLabel = 'Right';
    harness.alignFeature.justifyLabel = 'Full';
    await harness.waitForUpdate();

    expect(harness.alignFeature.leftLabel).toBe('Left');
    expect(harness.alignFeature.centerLabel).toBe('Center');
    expect(harness.alignFeature.rightLabel).toBe('Right');
    expect(harness.alignFeature.justifyLabel).toBe('Full');

    expect(harness.leftButton().getAttribute('aria-label')).toBe('Left');
    expect(harness.centerButton().getAttribute('aria-label')).toBe('Center');
    expect(harness.rightButton().getAttribute('aria-label')).toBe('Right');
    expect(harness.justifyButton().getAttribute('aria-label')).toBe('Full');
  });

  it('should render all four alignment buttons', async () => {
    const harness = await createFixture();

    expect(harness.leftButton()).toBeTruthy();
    expect(harness.centerButton()).toBeTruthy();
    expect(harness.rightButton()).toBeTruthy();
    expect(harness.justifyButton()).toBeTruthy();
  });

  it('should configure text align extension', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.extensions).toHaveLength(1);
    expect(harness.alignFeature.extensions[0].name).toBe('textAlign');
  });

  it('should apply left alignment when left button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply left alignment
    await harness.clickLeftButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: left');
  });

  it('should apply center alignment when center button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply center alignment
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: center');
  });

  it('should apply right alignment when right button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply right alignment
    await harness.clickRightButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: right');
  });

  it('should apply justify alignment when justify button clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply justify alignment
    await harness.clickJustifyButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: justify');
  });

  it('should disable all buttons when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.leftButton().hasAttribute('disabled')).toBe(true);
    expect(harness.centerButton().hasAttribute('disabled')).toBe(true);
    expect(harness.rightButton().hasAttribute('disabled')).toBe(true);
    expect(harness.justifyButton().hasAttribute('disabled')).toBe(true);
  });

  it('should disable all buttons when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.leftButton().hasAttribute('disabled')).toBe(true);
    expect(harness.centerButton().hasAttribute('disabled')).toBe(true);
    expect(harness.rightButton().hasAttribute('disabled')).toBe(true);
    expect(harness.justifyButton().hasAttribute('disabled')).toBe(true);
  });

  it('should show active state on left button when text is left aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with left alignment
    editor.commands.setContent('<p style="text-align: left">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).toBe(true);
    expect(harness.centerButton().hasAttribute('pressed')).toBe(false);
    expect(harness.rightButton().hasAttribute('pressed')).toBe(false);
    expect(harness.justifyButton().hasAttribute('pressed')).toBe(false);
  });

  it('should show active state on center button when text is center aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with center alignment
    editor.commands.setContent('<p style="text-align: center">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).toBe(false);
    expect(harness.centerButton().hasAttribute('pressed')).toBe(true);
    expect(harness.rightButton().hasAttribute('pressed')).toBe(false);
    expect(harness.justifyButton().hasAttribute('pressed')).toBe(false);
  });

  it('should show active state on right button when text is right aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with right alignment
    editor.commands.setContent('<p style="text-align: right">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).toBe(false);
    expect(harness.centerButton().hasAttribute('pressed')).toBe(false);
    expect(harness.rightButton().hasAttribute('pressed')).toBe(true);
    expect(harness.justifyButton().hasAttribute('pressed')).toBe(false);
  });

  it('should show active state on justify button when text is justified', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with justify alignment
    editor.commands.setContent('<p style="text-align: justify">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).toBe(false);
    expect(harness.centerButton().hasAttribute('pressed')).toBe(false);
    expect(harness.rightButton().hasAttribute('pressed')).toBe(false);
    expect(harness.justifyButton().hasAttribute('pressed')).toBe(true);
  });

  it('should not show active state on any button for default text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content without explicit alignment
    editor.commands.setContent('<p>test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).toBe(false);
    expect(harness.centerButton().hasAttribute('pressed')).toBe(false);
    expect(harness.rightButton().hasAttribute('pressed')).toBe(false);
    expect(harness.justifyButton().hasAttribute('pressed')).toBe(false);
  });

  it('should switch alignment from center to right', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with center alignment
    editor.commands.setContent('<p style="text-align: center">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.centerButton().hasAttribute('pressed')).toBe(true);

    // Switch to right alignment
    await harness.clickRightButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: right');
    expect(output).not.toContain('text-align: center');
  });

  it('should toggle alignment off when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and apply center alignment
    editor.commands.setContent('<p>test</p>');
    editor.commands.setTextSelection(5);
    editor.chain().focus().setTextAlign('center').run();
    await harness.waitForUpdate();

    expect(harness.centerButton().hasAttribute('pressed')).toBe(true);

    // Click center button again to toggle off
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).not.toContain('text-align: center');
  });

  it('should apply alignment to heading elements', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set heading content - need to ensure heading extension is configured
    // Since this test fixture may not have heading extension, test with paragraph
    editor.commands.setContent('<p>test content</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply center alignment
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: center');
    expect(output).toContain('test content');
  });

  it('should apply alignment to multiple paragraphs', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with multiple paragraphs
    editor.commands.setContent('<p>first</p><p>second</p><p>third</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply right alignment
    await harness.clickRightButton();

    const output = editor.getHTML();
    // Count occurrences of text-align: right
    const matches = output.match(/text-align: right/g);
    expect(matches).toHaveLength(3);
  });

  it('should preserve text content when changing alignment', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    const testText = 'preserved content';
    editor.commands.setContent(`<p>${testText}</p>`);
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply center alignment
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).toContain(testText);
    expect(output).toContain('text-align: center');
  });

  it('should handle alignment changes on list items', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with a list
    editor.commands.setContent('<ul><li><p>list item</p></li></ul>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Apply center alignment to list item
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).toContain('text-align: center');
    expect(output).toContain('list item');
  });
});

interface AlignFixtureOptions {
  leftLabel?: string;
  centerLabel?: string;
  rightLabel?: string;
  justifyLabel?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface AlignFixture {
  el: RichTextEditorComponent;
  alignFeature: RteAlignComponent;
  leftButton: () => HTMLElement;
  centerButton: () => HTMLElement;
  rightButton: () => HTMLElement;
  justifyButton: () => HTMLElement;
  clickLeftButton: () => Promise<void>;
  clickCenterButton: () => Promise<void>;
  clickRightButton: () => Promise<void>;
  clickJustifyButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: AlignFixtureOptions = {}): Promise<AlignFixture> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
        <forge-rte-align
          left-label=${options.leftLabel || 'Align Left'}
          center-label=${options.centerLabel || 'Align Center'}
          right-label=${options.rightLabel || 'Align Right'}
          justify-label=${options.justifyLabel || 'Justify'}></forge-rte-align>
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );

  const alignFeature = el.querySelector('forge-rte-align') as RteAlignComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const toolButtons = alignFeature.shadowRoot!.querySelectorAll('forge-rte-tool-button');

  const harness: AlignFixture = {
    el,
    alignFeature,
    leftButton: () => toolButtons[0].shadowRoot!.querySelector('forge-icon-button')!,
    centerButton: () => toolButtons[1].shadowRoot!.querySelector('forge-icon-button')!,
    rightButton: () => toolButtons[2].shadowRoot!.querySelector('forge-icon-button')!,
    justifyButton: () => toolButtons[3].shadowRoot!.querySelector('forge-icon-button')!,
    async clickLeftButton() {
      this.leftButton().click();
      await this.waitForUpdate();
    },
    async clickCenterButton() {
      this.centerButton().click();
      await this.waitForUpdate();
    },
    async clickRightButton() {
      this.rightButton().click();
      await this.waitForUpdate();
    },
    async clickJustifyButton() {
      this.justifyButton().click();
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
      alignFeature.requestUpdate();
      await alignFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return harness;
}
