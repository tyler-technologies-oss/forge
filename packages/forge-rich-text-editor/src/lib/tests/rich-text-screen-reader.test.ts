import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { RichTextEditorComponent } from '../rich-text-editor';
import type { RichTextContextComponent } from '../rich-text-context';
import type { RichTextContentComponent } from '../rich-text-content';
import '../rich-text-editor';
import '../features/rte-standard-tools';
import '../features/rte-code';

/**
 * Find a feature element — first inside forge-rte-standard-tools shadow DOM,
 * then in the editor's own light DOM (for standalone features added directly).
 */
function getFeature(el: RichTextEditorComponent, tagName: string): Element | null | undefined {
  return el.querySelector('forge-rte-standard-tools')?.shadowRoot?.querySelector(tagName) ?? el.querySelector(tagName);
}

/**
 * Trigger a tool button by dispatching forge-rte-tool-toggle on the forge-rte-tool-button element.
 * This bypasses the 3-level shadow DOM chain (forge-rte-tool-button → forge-icon-button → button)
 * and fires the event that feature components actually listen for.
 */
function triggerToolButton(feature: Element | null | undefined): void {
  const toolButton = feature?.shadowRoot?.querySelector('forge-rte-tool-button');
  toolButton?.dispatchEvent(new CustomEvent('forge-rte-tool-toggle', { detail: false, bubbles: true, composed: true }));
}

/**
 * Trigger a forge-icon-button by dispatching click on the host element.
 * Used for undo/redo which use forge-icon-button directly with @click.
 */
function triggerIconButton(iconButton: Element | null | undefined): void {
  iconButton?.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
}

async function waitForEditor(el: RichTextEditorComponent): Promise<RichTextContextComponent> {
  await el.updateComplete;

  const getContext = (): RichTextContextComponent =>
    el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;

  if (!getContext()?.isInitialized) {
    await new Promise<void>(resolve => {
      let resolved = false;
      const done = (): void => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      el.addEventListener('initialized', done, { once: true });

      const interval = setInterval(() => {
        if (getContext()?.isInitialized) {
          clearInterval(interval);
          el.removeEventListener('initialized', done);
          done();
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        el.removeEventListener('initialized', done);
        done();
      }, 5000);
    });
  }

  await getContext()?.updateComplete;
  return getContext();
}

function getLiveRegion(el: RichTextEditorComponent): HTMLElement | null {
  const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
  return contentComponent?.shadowRoot?.querySelector('[role="status"]') as HTMLElement | null;
}

async function waitForAnnouncement(el: RichTextEditorComponent, expectedText?: string): Promise<void> {
  // Simple wait approach - announcements should happen quickly
  await new Promise(resolve => setTimeout(resolve, 200));
  const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content') as RichTextContentComponent;
  if (contentComponent) {
    await contentComponent.updateComplete;
  }
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe('RTE Screen Reader Support', () => {
  describe('Live Region', () => {
    it('should contain ARIA live region with proper attributes', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      expect(contentComponent).to.exist;

      const liveRegion = getLiveRegion(el);
      expect(liveRegion).to.exist;
      expect(liveRegion?.getAttribute('aria-live')).to.equal('polite');
      expect(liveRegion?.getAttribute('aria-atomic')).to.equal('true');
    });

    it('should have screen reader only class', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.classList.contains('sr-only')).to.be.true;
    });

    it('should be initially empty', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent?.trim()).to.equal('');
    });
  });

  describe('Text Formatting Announcements', () => {
    it('should announce when bold is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const boldFeature = getFeature(el, 'forge-rte-bold');
      triggerToolButton(boldFeature);

      await waitForAnnouncement(el, 'Bold applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Bold applied');
    });

    it('should announce when bold is removed', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p><strong>Test</strong></p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const boldFeature = getFeature(el, 'forge-rte-bold');
      triggerToolButton(boldFeature);

      await waitForAnnouncement(el, 'Bold removed');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Bold removed');
    });

    it('should announce when italic is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const italicFeature = getFeature(el, 'forge-rte-italic');
      triggerToolButton(italicFeature);

      await waitForAnnouncement(el, 'Italic applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Italic applied');
    });

    it('should announce when underline is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const underlineFeature = getFeature(el, 'forge-rte-underline');
      triggerToolButton(underlineFeature);

      await waitForAnnouncement(el, 'Underline applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Underline applied');
    });

    it('should announce when strikethrough is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const strikeFeature = getFeature(el, 'forge-rte-strike');
      triggerToolButton(strikeFeature);

      await waitForAnnouncement(el, 'Strikethrough applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Strikethrough applied');
    });

    it('should announce when code is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-code></forge-rte-code>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const codeFeature = getFeature(el, 'forge-rte-code');
      triggerToolButton(codeFeature);

      await waitForAnnouncement(el, 'Code applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Code applied');
    });
  });

  describe('Heading Announcements', () => {
    it('should announce when heading 1 is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const headingFeature = getFeature(el, 'forge-rte-heading');
      const headingToolButton = headingFeature?.shadowRoot?.querySelectorAll('forge-rte-tool-button')?.[0];
      headingToolButton?.dispatchEvent(
        new CustomEvent('forge-rte-tool-toggle', { detail: false, bubbles: true, composed: true })
      );

      await waitForAnnouncement(el, 'Heading 1');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Heading 1');
    });

    it('should announce when heading is removed', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<h1>Test heading</h1>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const headingFeature = getFeature(el, 'forge-rte-heading');
      const headingToolButton = headingFeature?.shadowRoot?.querySelectorAll('forge-rte-tool-button')?.[0];
      headingToolButton?.dispatchEvent(
        new CustomEvent('forge-rte-tool-toggle', { detail: false, bubbles: true, composed: true })
      );

      await waitForAnnouncement(el, 'Paragraph style');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Paragraph style');
    });
  });

  describe('List Announcements', () => {
    it('should announce when bullet list is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const bulletListFeature = getFeature(el, 'forge-rte-bullet-list');
      triggerToolButton(bulletListFeature);

      await waitForAnnouncement(el, 'Bullet list');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Bullet list');
    });

    it('should announce when numbered list is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const orderedListFeature = getFeature(el, 'forge-rte-ordered-list');
      triggerToolButton(orderedListFeature);

      await waitForAnnouncement(el, 'Numbered list');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Numbered list');
    });

    it('should announce when list is removed', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<ul><li>Test item</li></ul>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const bulletListFeature = getFeature(el, 'forge-rte-bullet-list');
      triggerToolButton(bulletListFeature);

      await waitForAnnouncement(el, 'List removed');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('List removed');
    });
  });

  describe('Alignment Announcements', () => {
    it('should announce when center alignment is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const alignFeature = getFeature(el, 'forge-rte-align');
      const centerToolButton = alignFeature?.shadowRoot?.querySelectorAll('forge-rte-tool-button')?.[1];
      centerToolButton?.dispatchEvent(
        new CustomEvent('forge-rte-tool-toggle', { detail: false, bubbles: true, composed: true })
      );

      await waitForAnnouncement(el, 'Center aligned');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Center aligned');
    });

    it('should announce when right alignment is applied', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const alignFeature = getFeature(el, 'forge-rte-align');
      const rightToolButton = alignFeature?.shadowRoot?.querySelectorAll('forge-rte-tool-button')?.[2];
      rightToolButton?.dispatchEvent(
        new CustomEvent('forge-rte-tool-toggle', { detail: false, bubbles: true, composed: true })
      );

      await waitForAnnouncement(el, 'Right aligned');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Right aligned');
    });
  });

  describe('Undo/Redo Announcements', () => {
    it('should announce when undo is performed', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();
      editor?.chain().focus().toggleBold().run();

      await new Promise(resolve => setTimeout(resolve, 100));

      const undoRedoFeature = getFeature(el, 'forge-rte-undo-redo');
      const undoIconButton = undoRedoFeature?.shadowRoot?.querySelectorAll('forge-icon-button')?.[0];
      triggerIconButton(undoIconButton);

      await waitForAnnouncement(el, 'Undo');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Undo');
    });

    it('should announce when redo is performed', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();
      editor?.chain().focus().toggleBold().run();
      await new Promise(resolve => setTimeout(resolve, 100));
      editor?.chain().undo().run();
      await new Promise(resolve => setTimeout(resolve, 100));

      const undoRedoFeature = getFeature(el, 'forge-rte-undo-redo');
      const redoIconButton = undoRedoFeature?.shadowRoot?.querySelectorAll('forge-icon-button')?.[1];
      triggerIconButton(redoIconButton);

      await waitForAnnouncement(el, 'Redo');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Redo');
    });
  });

  describe('Editor State Announcements', () => {
    it('should announce when editor becomes disabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      el.disabled = true;
      await waitForAnnouncement(el, 'Editor disabled');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Editor disabled');
    });

    it('should announce when editor becomes enabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor disabled>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      el.disabled = false;
      await waitForAnnouncement(el, 'Editor enabled');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Editor enabled');
    });

    it('should announce when editor becomes read-only', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      el.readOnly = true;
      await waitForAnnouncement(el, 'Editor read-only');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Editor read-only');
    });

    it('should announce when editor becomes editable from read-only', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor readonly>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      el.readOnly = false;
      await waitForAnnouncement(el, 'Editor editable');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Editor editable');
    });
  });

  describe('Announcement Cleanup', () => {
    it('should clear announcement after timeout', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      editor?.commands.setContent('<p>Test content</p>');
      editor?.chain().focus().setTextSelection({ from: 1, to: 5 }).run();

      const boldFeature = getFeature(el, 'forge-rte-bold');
      triggerToolButton(boldFeature);

      await waitForAnnouncement(el, 'Bold applied');

      const liveRegion = getLiveRegion(el);
      expect(liveRegion?.textContent).to.equal('Bold applied');

      // Wait for cleanup timeout (1000ms)
      await new Promise(resolve => setTimeout(resolve, 1100));
      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content') as RichTextContentComponent;
      await contentComponent?.updateComplete;

      expect(liveRegion?.textContent?.trim()).to.equal('');
    });
  });
});
