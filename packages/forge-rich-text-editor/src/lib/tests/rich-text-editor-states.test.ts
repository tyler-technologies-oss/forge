import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../testing/fixture.js';
import { html } from 'lit';
import type { IIconButtonComponent } from '@tylertech/forge';

import '../rich-text-editor.js';
import '../features/rte-standard-tools.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextContextComponent } from '../rich-text-context.js';

/**
 * Returns all forge-icon-button elements inside forge-rte-standard-tools by traversing
 * the shadow DOM chain: standard-tools → feature shadow → tool-button shadow → icon-button.
 */
function getToolbarIconButtons(el: RichTextEditorComponent): IIconButtonComponent[] {
  const standardTools = el.querySelector('forge-rte-standard-tools');
  if (!standardTools?.shadowRoot) {
    return [];
  }
  // Standard-tools shadow contains feature elements (forge-rte-bold, etc.)
  // Each feature shadow contains a forge-rte-tool-button
  // Each tool-button shadow contains a forge-icon-button
  return Array.from(standardTools.shadowRoot.querySelectorAll('*'))
    .filter(node => node.shadowRoot)
    .flatMap(featureEl => Array.from(featureEl.shadowRoot!.querySelectorAll('forge-rte-tool-button')))
    .map(tb => tb.shadowRoot?.querySelector('forge-icon-button') as IIconButtonComponent)
    .filter(Boolean);
}

/**
 * Helper to wait for editor initialization and return the context component
 */
async function waitForEditor(el: RichTextEditorComponent): Promise<RichTextContextComponent> {
  await el.updateComplete;

  const getContext = (): RichTextContextComponent => el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;

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

describe('Rich Text Editor - State Visual Indicators', () => {
  describe('Disabled state', () => {
    it('should apply disabled styling to editor wrapper', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor disabled>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));
      const root = el.shadowRoot as ShadowRoot;
      const editorWrapper = root.querySelector('.forge-rich-text-editor') as HTMLElement;
      const wrapperStyle = getComputedStyle(editorWrapper);

      expect(el.disabled).toBe(true);
      // Asserting the computed values rather than the attribute: these rules referenced
      // `--forge-theme-disabled-opacity`, which forge does not define, so the declaration was
      // invalid and the editor rendered at full opacity while still reporting itself disabled.
      expect(Number(wrapperStyle.opacity)).toBeLessThan(1);
      expect(wrapperStyle.pointerEvents).toBe('none');
      expect(wrapperStyle.userSelect).toBe('none');
    });

    it('should dim the content area and mirror the state onto it', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor disabled>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await waitForEditor(el);
      const content = el.shadowRoot!.querySelector('forge-rich-text-content')!;
      const wrapper = content.shadowRoot!.querySelector('.editor-content-wrapper') as HTMLElement;

      // The content element takes its state from the editor context, so it has to mirror it onto
      // the host for its own `:host([disabled])` rule to match - without that the rule was dead.
      expect(content.hasAttribute('disabled')).toBe(true);
      expect(Number(getComputedStyle(wrapper).opacity)).toBeLessThan(1);
    });

    it('should disable all toolbar buttons when editor is disabled', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor disabled>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button.hasAttribute('disabled')).toBe(true);
      });
    });

    it('should prevent editing in content area when disabled', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor disabled>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);
      expect(context.editorContext.editor?.isEditable).toBe(false);
    });
  });

  describe('Readonly state', () => {
    it('should apply readonly styling to editor', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor readonly>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));
      const toolbar = el.shadowRoot!.querySelector('.editor-toolbar') as HTMLElement;
      const editorWrapper = el.shadowRoot!.querySelector('.forge-rich-text-editor') as HTMLElement;

      expect(el.readOnly).toBe(true);
      // Readonly dims the toolbar only. The content stays at full opacity and selectable, which is
      // the one behavioural difference from disabled.
      expect(Number(getComputedStyle(toolbar).opacity)).toBeLessThan(1);
      expect(Number(getComputedStyle(editorWrapper).opacity)).toBe(1);
      expect(getComputedStyle(editorWrapper).userSelect).not.toBe('none');
    });

    it('should leave the content selectable and mirror the state onto it', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor readonly>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await waitForEditor(el);
      const content = el.shadowRoot!.querySelector('forge-rich-text-content')!;
      const wrapper = content.shadowRoot!.querySelector('.editor-content-wrapper') as HTMLElement;
      const prosemirror = content.shadowRoot!.querySelector('.tiptap') as HTMLElement;

      expect(content.hasAttribute('readonly')).toBe(true);
      expect(Number(getComputedStyle(wrapper).opacity)).toBe(1);
      expect(getComputedStyle(prosemirror).cursor).toBe('default');
    });

    it('should disable all toolbar buttons when editor is readonly', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor readonly>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button.hasAttribute('disabled')).toBe(true);
      });
    });

    it('should prevent editing in content area when readonly', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor readonly>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);
      expect(context.editorContext.editor?.isEditable).toBe(false);
    });
  });

  describe('Active state indicators', () => {
    it('should show active state on bold button when bold text is selected', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      if (!editor) {
        throw new Error('Editor not initialized');
      }

      // Set content and apply bold
      editor.commands.setContent('<p>Test</p>');
      editor.commands.selectAll();
      editor.commands.toggleBold();
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      const boldButtons = getToolbarIconButtons(el).filter(btn => btn.getAttribute('aria-label')?.includes('Bold'));

      expect(boldButtons.length).toBeGreaterThan(0);
      const boldButton = boldButtons[0] as IIconButtonComponent;
      expect(boldButton.hasAttribute('pressed')).toBe(true);
    });

    it('should show active state on heading button when heading is active', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);
      const editor = context.editorContext.editor;
      if (!editor) {
        throw new Error('Editor not initialized');
      }

      // Set content and apply heading
      editor.commands.setContent('<p>Test</p>');
      editor.commands.selectAll();
      editor.commands.toggleHeading({ level: 1 });
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      const h1Buttons = getToolbarIconButtons(el).filter(
        btn => btn.getAttribute('aria-label')?.includes('H1') || btn.getAttribute('aria-label')?.includes('Heading 1')
      );

      expect(h1Buttons.length).toBeGreaterThan(0);
      const h1Button = h1Buttons[0] as IIconButtonComponent;
      expect(h1Button.hasAttribute('pressed')).toBe(true);
    });
  });

  describe('Focus indicators', () => {
    it('should have focus indicator on content area', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await el.updateComplete;
      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentWrapper = contentComponent?.shadowRoot?.querySelector('.editor-content-wrapper');
      const focusIndicator = contentWrapper?.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeTruthy();
    });

    it('should have accessible focus indicators on toolbar buttons', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).toBeGreaterThan(0);

      // Forge icon buttons have built-in focus indicators
      // Verify buttons are focusable
      buttons.forEach(button => {
        const tabindex = button.getAttribute('tabindex');
        expect(tabindex === null || tabindex === '0').toBe(true);
      });
    });
  });

  describe('State transitions', () => {
    it('should update visual state when toggling disabled', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);

      // Initially enabled
      expect(el.disabled).toBe(false);
      expect(context.editorContext.editor?.isEditable).toBe(true);

      // Disable
      el.disabled = true;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('disabled')).toBe(true);
      expect(context.editorContext.editor?.isEditable).toBe(false);

      // Re-enable
      el.disabled = false;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('disabled')).toBe(false);
      expect(context.editorContext.editor?.isEditable).toBe(true);
    });

    it('should update visual state when toggling readonly', async () => {
      const el = await renderFixture<RichTextEditorComponent>(
        html`
          <forge-rich-text-editor>
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
        'forge-rich-text-editor'
      );

      const context = await waitForEditor(el);

      // Initially not readonly
      expect(el.readOnly).toBe(false);
      expect(context.editorContext.editor?.isEditable).toBe(true);

      // Set readonly
      el.readOnly = true;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('readonly')).toBe(true);
      expect(context.editorContext.editor?.isEditable).toBe(false);

      // Unset readonly
      el.readOnly = false;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('readonly')).toBe(false);
      expect(context.editorContext.editor?.isEditable).toBe(true);
    });
  });
});
