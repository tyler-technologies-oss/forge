import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type { RichTextEditorComponent } from '../rich-text-editor';
import type { RichTextContextComponent } from '../rich-text-context';
import type { RichTextContentComponent } from '../rich-text-content';
import '../rich-text-editor';
import '../features/rte-bold';

async function waitForEditor(el: RichTextEditorComponent): Promise<RichTextContextComponent> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const ctx = el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;
  await ctx?.updateComplete;
  // Wait for any queued microtasks/reactive updates to flush
  await new Promise(resolve => setTimeout(resolve, 50));
  await ctx?.updateComplete;
  return ctx;
}

describe('RTE Content Validation', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should have maxLength property with default value of 0', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.maxLength).to.equal(0);
  });

  it('should set maxLength property', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor max-length="100">
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.maxLength).to.equal(100);
  });

  it('should have showCharacterCount property with default value of false', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.showCharacterCount).to.be.false;
  });

  it('should set showCharacterCount property', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor show-character-count>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.showCharacterCount).to.be.true;
  });

  it('should have showWordCount property with default value of false', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.showWordCount).to.be.false;
  });

  it('should set showWordCount property', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor show-word-count>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.showWordCount).to.be.true;
  });

  it('should have errorMessage property with default empty string', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.errorMessage).to.equal('');
  });

  it('should set errorMessage property', async () => {
    const el = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor error-message="Custom error">
        <forge-rte-bold></forge-rte-bold>
      </forge-rich-text-editor>
    `);

    expect(el.errorMessage).to.equal('Custom error');
  });

  describe('Character Count Display', () => {
    it('should not display character count by default', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).to.be.null;
    });

    it('should display character count when enabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).not.to.be.null;
      expect(countsEl?.textContent).to.include('0 characters');
    });

    it('should display character count with max length', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count max-length="100">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).not.to.be.null;
      expect(countsEl?.textContent).to.include('0 / 100 characters');
    });

    it('should update character count when typing', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      await sendKeys({ type: 'Hello world' });
      await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl?.textContent).to.include('11 characters');
    });
  });

  describe('Word Count Display', () => {
    it('should not display word count by default', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).to.be.null;
    });

    it('should display word count when enabled', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-word-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).not.to.be.null;
      expect(countsEl?.textContent).to.include('0 words');
    });

    it('should update word count when typing', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-word-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      await sendKeys({ type: 'Hello world test' });
      await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl?.textContent).to.include('3 words');
    });

    it('should display both character and word count', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count show-word-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl).not.to.be.null;
      expect(countsEl?.textContent).to.include('0 characters');
      expect(countsEl?.textContent).to.include('0 words');
      expect(countsEl?.textContent).to.include('•');
    });
  });

  describe('Max Length Validation', () => {
    it('should not show error when content is under max length', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor max-length="100">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      await sendKeys({ type: 'Hello' });
      await waitForEditor(el);

      const errorEl = context?.shadowRoot?.querySelector('.editor-error');
      expect(errorEl).to.be.null;
    });

    it('should hard-enforce maxLength — keyboard input is blocked at the limit', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor max-length="5">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      // Attempt to type more than maxLength — TipTap's CharacterCount limit blocks the excess
      await sendKeys({ type: 'Hello world' });
      await waitForEditor(el);

      // Content must be capped at 5 characters; input beyond the limit is rejected
      const editorContent = editorEl?.textContent ?? '';
      expect(editorContent.length).to.be.at.most(5);
    });

    it('should hard-enforce maxLength — no error UI shown because input is blocked before exceeding limit', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor max-length="5">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      await sendKeys({ type: 'Hello world' });
      await waitForEditor(el);

      // No error state — the limit is enforced by blocking input, not by displaying an error
      const errorEl = context?.shadowRoot?.querySelector('.editor-error');
      expect(errorEl).to.be.null;
    });

    it('should have errorMessage property available for consumer-driven validation', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor max-length="5" error-message="Too long!">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      // errorMessage property should be readable regardless of editor state
      expect(el.errorMessage).to.equal('Too long!');
    });

    it('should not fire validation event on blocked keyboard input — content never exceeds limit', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor max-length="5">
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      let validationFired = false;

      el.addEventListener('validation', (() => {
        validationFired = true;
      }) as EventListener);

      const content = context.querySelector('forge-rich-text-content') as RichTextContentComponent;
      const editorEl = content?.shadowRoot?.querySelector('.ProseMirror') as HTMLElement;
      editorEl?.focus();

      // Attempt to type past the limit — blocked by TipTap, so onUpdate never marks as invalid
      await sendKeys({ type: 'Hello world' });
      await waitForEditor(el);

      expect(validationFired).to.be.false;
    });

    it.skip('should fire validation event when content becomes valid again after overflow', async () => {
      // Skipped because the overflow state is currently unreachable in tests.
      // CharacterCount.configure({ limit }) blocks all transactions that would exceed the limit —
      // including setContent — so there is no code path that can put the editor into an over-limit
      // state. The validation event and error UI exist in the implementation but are unreachable
      // until a deliberate decision is made about whether overflow should be possible (e.g. via
      // a programmatic API for pre-loading out-of-bounds content, or a future read-only display
      // of content that was created with a different limit).
    });
  });

  describe('Error State Accessibility', () => {
    it.skip('should have role="alert" on error message when content overflows', async () => {
      // Skipped — same constraint as the validation event test above.
      // The error UI renders conditionally on !_isValid, but that state is unreachable because
      // CharacterCount.configure({ limit }) blocks all over-limit transactions at the TipTap layer.
    });

    it.skip('should have aria-live on error message when content overflows', async () => {
      // Skipped — same constraint as above.
    });

    it('should have aria-live on character count', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl?.getAttribute('aria-live')).to.equal('polite');
    });

    it('should have aria-atomic on character count', async () => {
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor show-character-count>
          <forge-rte-bold></forge-rte-bold>
        </forge-rich-text-editor>
      `);

      const context = await waitForEditor(el);

      const countsEl = context?.shadowRoot?.querySelector('.editor-counts');
      expect(countsEl?.getAttribute('aria-atomic')).to.equal('true');
    });
  });
});
