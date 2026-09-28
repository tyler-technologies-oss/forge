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
      // Any aria-controls here is the empty attribute Chrome reflects for an element reference,
      // never a stale IDREF into another shadow root.
      expect(toolbar?.getAttribute('aria-controls') ?? '').toBe('');
      expect(toolbar?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should point the toolbar at the editor with an element reference rather than aria-controls', async () => {
      const el = await renderFixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`, 'forge-rich-text-editor');
      const toolbar = el.shadowRoot?.querySelector('[role="toolbar"]') as HTMLElement;

      // An IDREF cannot cross a shadow boundary, so the relationship is expressed as an element
      // reference instead. The target is the editor rather than the editable element, because a
      // reference only resolves into the same tree or an ancestor tree.
      if ('ariaControlsElements' in toolbar) {
        expect((toolbar as unknown as { ariaControlsElements: Element[] | null }).ariaControlsElements).toEqual([el]);
        // Reflected as an empty attribute rather than an IDREF, which is what makes it able to
        // cross the boundary at all.
        expect(toolbar.getAttribute('aria-controls')).toBe('');
      }
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
