import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../testing/fixture.js';
import { html } from 'lit';
import { RichTextEditorComponent } from '../rich-text-editor.js';

import '../rich-text-editor.js';

describe('RichTextEditor', () => {
  it('should contain shadow root', async () => {
    const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('ARIA attributes', () => {
    it('should have toolbar with proper ARIA attributes', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');
      const toolbar = el.shadowRoot?.querySelector('[role="toolbar"]');

      expect(toolbar).toBeTruthy();
      expect(toolbar?.getAttribute('role')).toBe('toolbar');
      expect(toolbar?.getAttribute('aria-label')).toBe('Rich text formatting toolbar');
      expect(toolbar?.getAttribute('aria-controls')).toBe('forge-rte-content');
      expect(toolbar?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should have content area with proper ARIA attributes', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      expect(contentComponent).toBeTruthy();

      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');
      expect(contentArea).toBeTruthy();
      expect(contentArea?.getAttribute('id')).toBe('forge-rte-content');
      expect(contentArea?.getAttribute('role')).toBe('textbox');
      expect(contentArea?.getAttribute('aria-label')).toBe('Rich text editor content');
      expect(contentArea?.getAttribute('aria-multiline')).toBe('true');
    });

    it('should set aria-readonly when readonly is true', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor readonly></forge-rich-text-editor>`, 'forge-rich-text-editor');

      // Wait for content component to render and update
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-readonly')).toBe('true');
    });

    it('should set aria-readonly to false when readonly is false', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-readonly')).toBe('false');
    });

    it('should set aria-disabled when disabled is true', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor disabled></forge-rich-text-editor>`, 'forge-rich-text-editor');

      // Wait for content component to render and update
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-disabled to false when disabled is false', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');

      // Wait for content component to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentArea = contentComponent?.shadowRoot?.querySelector('[role="textbox"]');

      expect(contentArea?.getAttribute('aria-disabled')).toBe('false');
    });
  });
});
