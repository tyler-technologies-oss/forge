import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { RichTextEditorComponent } from '../rich-text-editor';

import '../rich-text-editor';

describe('RichTextEditor', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

    expect(el.shadowRoot).to.be.ok;
  });

  describe('ARIA attributes', () => {
    it('should have toolbar with proper ARIA attributes', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);
      const toolbar = el.shadowRoot?.querySelector('[role="toolbar"]');

      expect(toolbar).to.be.ok;
      expect(toolbar?.getAttribute('role')).to.equal('toolbar');
      expect(toolbar?.getAttribute('aria-label')).to.equal('Rich text formatting toolbar');
      expect(toolbar?.getAttribute('aria-controls')).to.equal('forge-rte-content');
      expect(toolbar?.getAttribute('aria-orientation')).to.equal('horizontal');
    });

    it('should have content area with proper ARIA attributes', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      expect(contentComponent).to.be.ok;

      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');
      expect(contentArea).to.be.ok;
      expect(contentArea?.getAttribute('id')).to.equal('forge-rte-content');
      expect(contentArea?.getAttribute('role')).to.equal('textbox');
      expect(contentArea?.getAttribute('aria-label')).to.equal('Rich text editor content');
      expect(contentArea?.getAttribute('aria-multiline')).to.equal('true');
    });

    it('should set aria-readonly when readonly is true', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor readonly></forge-rich-text-editor>`
      );

      // Wait for content component to render and update
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-readonly')).to.equal('true');
    });

    it('should set aria-readonly to false when readonly is false', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-readonly')).to.equal('false');
    });

    it('should set aria-disabled when disabled is true', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor disabled></forge-rich-text-editor>`
      );

      // Wait for content component to render and update
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should set aria-disabled to false when disabled is false', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-disabled')).to.equal('false');
    });
  });
});
