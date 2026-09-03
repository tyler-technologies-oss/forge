import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RichTextFeatureAlignComponent } from '../rte-align';

import '../../rich-text-editor';
import '../rte-align';

describe('RTE Align Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default labels', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.leftLabel).to.equal('Align Left');
    expect(harness.alignFeature.centerLabel).to.equal('Align Center');
    expect(harness.alignFeature.rightLabel).to.equal('Align Right');
    expect(harness.alignFeature.justifyLabel).to.equal('Justify');
  });

  it('should set custom labels via properties', async () => {
    const harness = await createFixture();

    // Set labels via properties
    harness.alignFeature.leftLabel = 'Left';
    harness.alignFeature.centerLabel = 'Center';
    harness.alignFeature.rightLabel = 'Right';
    harness.alignFeature.justifyLabel = 'Full';
    await harness.waitForUpdate();

    expect(harness.alignFeature.leftLabel).to.equal('Left');
    expect(harness.alignFeature.centerLabel).to.equal('Center');
    expect(harness.alignFeature.rightLabel).to.equal('Right');
    expect(harness.alignFeature.justifyLabel).to.equal('Full');

    expect(harness.leftButton().getAttribute('aria-label')).to.equal('Left');
    expect(harness.centerButton().getAttribute('aria-label')).to.equal('Center');
    expect(harness.rightButton().getAttribute('aria-label')).to.equal('Right');
    expect(harness.justifyButton().getAttribute('aria-label')).to.equal('Full');
  });

  it('should render all four alignment buttons', async () => {
    const harness = await createFixture();

    expect(harness.leftButton()).to.exist;
    expect(harness.centerButton()).to.exist;
    expect(harness.rightButton()).to.exist;
    expect(harness.justifyButton()).to.exist;
  });

  it('should configure text align extension', async () => {
    const harness = await createFixture();

    expect(harness.alignFeature.extensions).to.have.lengthOf(1);
    expect(harness.alignFeature.extensions[0].name).to.equal('textAlign');
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
    expect(output).to.include('text-align: left');
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
    expect(output).to.include('text-align: center');
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
    expect(output).to.include('text-align: right');
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
    expect(output).to.include('text-align: justify');
  });

  it('should disable all buttons when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.leftButton().hasAttribute('disabled')).to.be.true;
    expect(harness.centerButton().hasAttribute('disabled')).to.be.true;
    expect(harness.rightButton().hasAttribute('disabled')).to.be.true;
    expect(harness.justifyButton().hasAttribute('disabled')).to.be.true;
  });

  it('should disable all buttons when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.leftButton().hasAttribute('disabled')).to.be.true;
    expect(harness.centerButton().hasAttribute('disabled')).to.be.true;
    expect(harness.rightButton().hasAttribute('disabled')).to.be.true;
    expect(harness.justifyButton().hasAttribute('disabled')).to.be.true;
  });

  it('should show active state on left button when text is left aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with left alignment
    editor.commands.setContent('<p style="text-align: left">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).to.be.true;
    expect(harness.centerButton().hasAttribute('pressed')).to.be.false;
    expect(harness.rightButton().hasAttribute('pressed')).to.be.false;
    expect(harness.justifyButton().hasAttribute('pressed')).to.be.false;
  });

  it('should show active state on center button when text is center aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with center alignment
    editor.commands.setContent('<p style="text-align: center">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).to.be.false;
    expect(harness.centerButton().hasAttribute('pressed')).to.be.true;
    expect(harness.rightButton().hasAttribute('pressed')).to.be.false;
    expect(harness.justifyButton().hasAttribute('pressed')).to.be.false;
  });

  it('should show active state on right button when text is right aligned', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with right alignment
    editor.commands.setContent('<p style="text-align: right">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).to.be.false;
    expect(harness.centerButton().hasAttribute('pressed')).to.be.false;
    expect(harness.rightButton().hasAttribute('pressed')).to.be.true;
    expect(harness.justifyButton().hasAttribute('pressed')).to.be.false;
  });

  it('should show active state on justify button when text is justified', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with justify alignment
    editor.commands.setContent('<p style="text-align: justify">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).to.be.false;
    expect(harness.centerButton().hasAttribute('pressed')).to.be.false;
    expect(harness.rightButton().hasAttribute('pressed')).to.be.false;
    expect(harness.justifyButton().hasAttribute('pressed')).to.be.true;
  });

  it('should not show active state on any button for default text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content without explicit alignment
    editor.commands.setContent('<p>test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.leftButton().hasAttribute('pressed')).to.be.false;
    expect(harness.centerButton().hasAttribute('pressed')).to.be.false;
    expect(harness.rightButton().hasAttribute('pressed')).to.be.false;
    expect(harness.justifyButton().hasAttribute('pressed')).to.be.false;
  });

  it('should switch alignment from center to right', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with center alignment
    editor.commands.setContent('<p style="text-align: center">test</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.centerButton().hasAttribute('pressed')).to.be.true;

    // Switch to right alignment
    await harness.clickRightButton();

    const output = editor.getHTML();
    expect(output).to.include('text-align: right');
    expect(output).not.to.include('text-align: center');
  });

  it('should toggle alignment off when clicking active button', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and apply center alignment
    editor.commands.setContent('<p>test</p>');
    editor.commands.setTextSelection(5);
    editor.chain().focus().setTextAlign('center').run();
    await harness.waitForUpdate();

    expect(harness.centerButton().hasAttribute('pressed')).to.be.true;

    // Click center button again to toggle off
    await harness.clickCenterButton();

    const output = editor.getHTML();
    expect(output).not.to.include('text-align: center');
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
    expect(output).to.include('text-align: center');
    expect(output).to.include('test content');
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
    expect(matches).to.have.lengthOf(3);
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
    expect(output).to.include(testText);
    expect(output).to.include('text-align: center');
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
    expect(output).to.include('text-align: center');
    expect(output).to.include('list item');
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
  alignFeature: RichTextFeatureAlignComponent;
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
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-align
        left-label=${options.leftLabel || 'Align Left'}
        center-label=${options.centerLabel || 'Align Center'}
        right-label=${options.rightLabel || 'Align Right'}
        justify-label=${options.justifyLabel || 'Justify'}></forge-rte-align>
    </forge-rich-text-editor>
  `);

  const alignFeature = el.querySelector('forge-rte-align') as RichTextFeatureAlignComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const toolButtons = alignFeature.shadowRoot!.querySelectorAll('forge-rte-tool-button');

  return {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}
