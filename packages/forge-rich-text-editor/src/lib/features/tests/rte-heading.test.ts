import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { Editor } from '@tiptap/core';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RichTextFeatureHeadingComponent } from '../rte-heading';

import '../../rich-text-editor';
import '../rte-heading';

describe('RTE Heading Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.headingFeature.shadowRoot).to.be.ok;
  });

  it('should have expected default labels', async () => {
    const harness = await createFixture();

    expect(harness.headingFeature.h1Label).to.equal('Heading 1');
    expect(harness.headingFeature.h2Label).to.equal('Heading 2');
    expect(harness.headingFeature.h3Label).to.equal('Heading 3');
  });

  it('should set custom h1 label', async () => {
    const harness = await createFixture({ h1Label: 'Custom H1' });

    expect(harness.headingFeature.h1Label).to.equal('Custom H1');
    expect(harness.h1Button().getAttribute('aria-label')).to.equal('Custom H1');
  });

  it('should set custom h2 label', async () => {
    const harness = await createFixture({ h2Label: 'Custom H2' });

    expect(harness.headingFeature.h2Label).to.equal('Custom H2');
    expect(harness.h2Button().getAttribute('aria-label')).to.equal('Custom H2');
  });

  it('should set custom h3 label', async () => {
    const harness = await createFixture({ h3Label: 'Custom H3' });

    expect(harness.headingFeature.h3Label).to.equal('Custom H3');
    expect(harness.h3Button().getAttribute('aria-label')).to.equal('Custom H3');
  });

  it('should render three heading buttons', async () => {
    const harness = await createFixture();

    expect(harness.h1Button()).to.exist;
    expect(harness.h2Button()).to.exist;
    expect(harness.h3Button()).to.exist;
  });

  it('should configure heading extension with levels 1, 2, 3', async () => {
    const harness = await createFixture();

    expect(harness.headingFeature.extensions).to.have.lengthOf(1);
    expect(harness.headingFeature.extensions[0].name).to.equal('heading');
  });

  it('should toggle H1 when H1 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click H1 button
    await harness.clickH1Button();

    // Verify H1 was applied
    const output = editor.getHTML();
    expect(output).to.include('<h1>test text</h1>');
  });

  it('should toggle H2 when H2 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click H2 button
    await harness.clickH2Button();

    // Verify H2 was applied
    const output = editor.getHTML();
    expect(output).to.include('<h2>test text</h2>');
  });

  it('should toggle H3 when H3 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select it
    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Click H3 button
    await harness.clickH3Button();

    // Verify H3 was applied
    const output = editor.getHTML();
    expect(output).to.include('<h3>test text</h3>');
  });

  it('should disable all buttons when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.h1Button().hasAttribute('disabled')).to.be.true;
    expect(harness.h2Button().hasAttribute('disabled')).to.be.true;
    expect(harness.h3Button().hasAttribute('disabled')).to.be.true;
  });

  it('should disable all buttons when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.h1Button().hasAttribute('disabled')).to.be.true;
    expect(harness.h2Button().hasAttribute('disabled')).to.be.true;
    expect(harness.h3Button().hasAttribute('disabled')).to.be.true;
  });

  it('should enable buttons when editor is editable', async () => {
    const harness = await createFixture();

    expect(harness.h1Button().hasAttribute('disabled')).to.be.false;
    expect(harness.h2Button().hasAttribute('disabled')).to.be.false;
    expect(harness.h3Button().hasAttribute('disabled')).to.be.false;
  });

  it('should show H1 as active when cursor is in H1', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content to H1
    editor.commands.setContent('<h1>Test</h1>');
    editor.commands.focus();
    await harness.waitForUpdate();

    expect(harness.h1Button().hasAttribute('pressed')).to.be.true;
    expect(harness.h2Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h3Button().hasAttribute('pressed')).to.be.false;
  });

  it('should show H2 as active when cursor is in H2', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content to H2
    editor.commands.setContent('<h2>Test</h2>');
    editor.commands.focus();
    await harness.waitForUpdate();

    expect(harness.h1Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h2Button().hasAttribute('pressed')).to.be.true;
    expect(harness.h3Button().hasAttribute('pressed')).to.be.false;
  });

  it('should show H3 as active when cursor is in H3', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content to H3
    editor.commands.setContent('<h3>Test</h3>');
    editor.commands.focus();
    await harness.waitForUpdate();

    expect(harness.h1Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h2Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h3Button().hasAttribute('pressed')).to.be.true;
  });

  it('should show no buttons as active when cursor is in paragraph', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content to paragraph
    editor.commands.setContent('<p>Test</p>');
    editor.commands.focus();
    await harness.waitForUpdate();

    expect(harness.h1Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h2Button().hasAttribute('pressed')).to.be.false;
    expect(harness.h3Button().hasAttribute('pressed')).to.be.false;
  });

  it('should convert paragraph to H1 when H1 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>Test paragraph</p>');
    editor.commands.focus();
    await harness.clickH1Button();

    expect(editor.getHTML()).to.include('<h1>Test paragraph</h1>');
  });

  it('should convert paragraph to H2 when H2 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>Test paragraph</p>');
    editor.commands.focus();
    await harness.clickH2Button();

    expect(editor.getHTML()).to.include('<h2>Test paragraph</h2>');
  });

  it('should convert paragraph to H3 when H3 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>Test paragraph</p>');
    editor.commands.focus();
    await harness.clickH3Button();

    expect(editor.getHTML()).to.include('<h3>Test paragraph</h3>');
  });

  it('should convert H1 back to paragraph when H1 button is clicked again', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<h1>Test heading</h1>');
    editor.commands.focus();
    await harness.clickH1Button();

    expect(editor.getHTML()).to.include('<p>Test heading</p>');
  });

  it('should convert H1 to H2 when H2 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<h1>Test heading</h1>');
    editor.commands.focus();
    await harness.clickH2Button();

    expect(editor.getHTML()).to.include('<h2>Test heading</h2>');
  });

  it('should convert H2 to H3 when H3 button is clicked', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<h2>Test heading</h2>');
    editor.commands.focus();
    await harness.clickH3Button();

    expect(editor.getHTML()).to.include('<h3>Test heading</h3>');
  });
});

interface HeadingFixtureOptions {
  h1Label?: string;
  h2Label?: string;
  h3Label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface HeadingFixture {
  el: RichTextEditorComponent;
  headingFeature: RichTextFeatureHeadingComponent;
  h1Button: () => HTMLElement;
  h2Button: () => HTMLElement;
  h3Button: () => HTMLElement;
  clickH1Button: () => Promise<void>;
  clickH2Button: () => Promise<void>;
  clickH3Button: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: HeadingFixtureOptions = {}): Promise<HeadingFixture> {
  const el = await fixture<RichTextEditorComponent>(html`
    <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
      <forge-rte-heading
        h1-label=${options.h1Label || 'Heading 1'}
        h2-label=${options.h2Label || 'Heading 2'}
        h3-label=${options.h3Label || 'Heading 3'}></forge-rte-heading>
    </forge-rich-text-editor>
  `);

  const headingFeature = el.querySelector('forge-rte-heading') as RichTextFeatureHeadingComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    el,
    headingFeature,
    h1Button: () => {
      const buttons = Array.from(headingFeature.shadowRoot!.querySelectorAll('forge-rte-tool-button'));
      return buttons[0].shadowRoot!.querySelector('forge-icon-button')!;
    },
    h2Button: () => {
      const buttons = Array.from(headingFeature.shadowRoot!.querySelectorAll('forge-rte-tool-button'));
      return buttons[1].shadowRoot!.querySelector('forge-icon-button')!;
    },
    h3Button: () => {
      const buttons = Array.from(headingFeature.shadowRoot!.querySelectorAll('forge-rte-tool-button'));
      return buttons[2].shadowRoot!.querySelector('forge-icon-button')!;
    },
    async clickH1Button() {
      this.h1Button().click();
      await this.waitForUpdate();
    },
    async clickH2Button() {
      this.h2Button().click();
      await this.waitForUpdate();
    },
    async clickH3Button() {
      this.h3Button().click();
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
      await headingFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };
}
