import { expect, fixture, html } from '@open-wc/testing';
import type { IForgeIconButtonComponent } from '@tylertech/forge';

import '../rich-text-editor';
import '../features/rte-standard-tools';
import type { RichTextEditorComponent } from '../rich-text-editor';
import type { RichTextContextComponent } from '../rich-text-context';

/**
 * Returns all forge-icon-button elements inside forge-rte-standard-tools by traversing
 * the shadow DOM chain: standard-tools → feature shadow → tool-button shadow → icon-button.
 */
function getToolbarIconButtons(el: RichTextEditorComponent): IForgeIconButtonComponent[] {
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
    .map(tb => tb.shadowRoot?.querySelector('forge-icon-button') as IForgeIconButtonComponent)
    .filter(Boolean);
}

/**
 * Helper to wait for editor initialization and return the context component
 */
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

describe('Rich Text Editor - State Visual Indicators', () => {
  describe('Disabled state', () => {
    it('should apply disabled styling to editor wrapper', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor disabled>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await el.updateComplete;
      const root = el.shadowRoot as ShadowRoot;
      const editorWrapper = root.querySelector('.forge-rich-text-editor') as HTMLElement;

      expect(el.hasAttribute('disabled')).to.be.true;
      expect(editorWrapper).to.exist;

      // Verify the component has disabled attribute which triggers :host([disabled]) styles
      expect(el.disabled).to.be.true;
    });

    it('should disable all toolbar buttons when editor is disabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor disabled>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).to.be.greaterThan(0);
      buttons.forEach(button => {
        expect(button.hasAttribute('disabled')).to.be.true;
      });
    });

    it('should prevent editing in content area when disabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor disabled>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      expect(context.editorContext.editor?.isEditable).to.be.false;
    });
  });

  describe('Readonly state', () => {
    it('should apply readonly styling to editor', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor readonly>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('readonly')).to.be.true;
      expect(el.readOnly).to.be.true;
    });

    it('should disable all toolbar buttons when editor is readonly', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor readonly>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).to.be.greaterThan(0);
      buttons.forEach(button => {
        expect(button.hasAttribute('disabled')).to.be.true;
      });
    });

    it('should prevent editing in content area when readonly', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor readonly>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);
      expect(context.editorContext.editor?.isEditable).to.be.false;
    });
  });

  describe('Active state indicators', () => {
    it('should show active state on bold button when bold text is selected', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

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

      expect(boldButtons.length).to.be.greaterThan(0);
      const boldButton = boldButtons[0] as IForgeIconButtonComponent;
      expect(boldButton.hasAttribute('pressed')).to.be.true;
    });

    it('should show active state on heading button when heading is active', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

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

      expect(h1Buttons.length).to.be.greaterThan(0);
      const h1Button = h1Buttons[0] as IForgeIconButtonComponent;
      expect(h1Button.hasAttribute('pressed')).to.be.true;
    });
  });

  describe('Focus indicators', () => {
    it('should have focus indicator on content area', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await el.updateComplete;
      const contentComponent = el.shadowRoot?.querySelector('forge-rich-text-content');
      const contentWrapper = contentComponent?.shadowRoot?.querySelector('.editor-content-wrapper');
      const focusIndicator = contentWrapper?.querySelector('forge-focus-indicator');

      expect(focusIndicator).to.exist;
    });

    it('should have accessible focus indicators on toolbar buttons', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await waitForEditor(el);

      const buttons = getToolbarIconButtons(el);

      expect(buttons.length).to.be.greaterThan(0);

      // Forge icon buttons have built-in focus indicators
      // Verify buttons are focusable
      buttons.forEach(button => {
        const tabindex = button.getAttribute('tabindex');
        expect(tabindex === null || tabindex === '0').to.be.true;
      });
    });
  });

  describe('State transitions', () => {
    it('should update visual state when toggling disabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      // Initially enabled
      expect(el.disabled).to.be.false;
      expect(context.editorContext.editor?.isEditable).to.be.true;

      // Disable
      el.disabled = true;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('disabled')).to.be.true;
      expect(context.editorContext.editor?.isEditable).to.be.false;

      // Re-enable
      el.disabled = false;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('disabled')).to.be.false;
      expect(context.editorContext.editor?.isEditable).to.be.true;
    });

    it('should update visual state when toggling readonly', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      // Initially not readonly
      expect(el.readOnly).to.be.false;
      expect(context.editorContext.editor?.isEditable).to.be.true;

      // Set readonly
      el.readOnly = true;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('readonly')).to.be.true;
      expect(context.editorContext.editor?.isEditable).to.be.false;

      // Unset readonly
      el.readOnly = false;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.hasAttribute('readonly')).to.be.false;
      expect(context.editorContext.editor?.isEditable).to.be.true;
    });
  });
});
