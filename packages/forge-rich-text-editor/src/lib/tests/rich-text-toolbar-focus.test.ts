import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { renderFixture } from '../../testing/fixture.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextContextComponent } from '../rich-text-context.js';

import '../rich-text-editor.js';
import '../rich-text-context.js';
import '../rich-text-content.js';
import '../features/rte-standard-tools.js';
import '../features/rte-bold.js';
import '../features/rte-italic.js';
import '../features/rte-link.js';

describe('Rich Text Editor toolbar focus', () => {
  it('should make the toolbar a single tab stop', async () => {
    const { before, editor } = await createEditorFixture();

    before.focus();
    await userEvent.tab();
    expect(focusedLabel()).toBe('Heading 1');

    await userEvent.tab();
    expect(editor.isFocused).toBe(true);
  });

  it('should move between buttons with ArrowRight and ArrowLeft', async () => {
    const { before } = await createEditorFixture();

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(focusedLabel()).toBe('Heading 2');

    await userEvent.keyboard('{ArrowLeft}');
    expect(focusedLabel()).toBe('Heading 1');
  });

  it('should reverse ArrowLeft and ArrowRight in a right-to-left layout', async () => {
    const { el, before } = await createEditorFixture();
    el.setAttribute('dir', 'rtl');

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft}');
    expect(focusedLabel()).toBe('Heading 2');

    await userEvent.keyboard('{ArrowRight}');
    expect(focusedLabel()).toBe('Heading 1');
  });

  it('should stop at the ends rather than wrap', async () => {
    const { before } = await createEditorFixture();

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{End}{ArrowRight}');
    expect(focusedLabel()).toBe('Justify');

    await userEvent.keyboard('{Home}{ArrowLeft}');
    expect(focusedLabel()).toBe('Heading 1');
  });

  it('should skip disabled buttons when moving to the last button with End', async () => {
    const { before } = await createEditorFixture();

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{End}');

    // Undo and redo follow Justify but are disabled with no history.
    expect(focusedLabel()).toBe('Justify');

    await userEvent.keyboard('{Home}');
    expect(focusedLabel()).toBe('Heading 1');
  });

  it('should return to the last focused button when tabbing back into the toolbar', async () => {
    const { before } = await createEditorFixture();

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await userEvent.tab();
    await userEvent.tab({ shift: true });

    expect(focusedLabel()).toBe('Heading 3');
  });

  it('should keep a single tab stop after a button is disabled and re-enabled', async () => {
    const { before, editor } = await createEditorFixture();

    editor.commands.setContent('<p>history</p>');
    await settle();
    editor.commands.undo();
    await settle();
    editor.commands.redo();
    await settle();

    before.focus();
    await userEvent.tab();
    expect(focusedLabel()).toBe('Heading 1');
    await userEvent.tab();
    expect(editor.isFocused).toBe(true);

    // Undo is enabled again and has rejoined the arrow sequence; redo has no history left.
    await userEvent.tab({ shift: true });
    await userEvent.keyboard('{End}');
    expect(focusedLabel()).toBe('Undo');
  });

  it('should not move focus when arrow keys are pressed in a feature popover', async () => {
    const { el, editor } = await createEditorFixture(html`<forge-rte-link></forge-rte-link>`);

    editor.commands.setContent('<p>link text</p>');
    editor.commands.setTextSelection({ from: 1, to: 5 });
    await settle();

    const link = el.querySelector('forge-rte-link')!;
    link.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector<HTMLElement>('forge-icon-button')!.click();
    await settle();

    const urlInput = link.shadowRoot!.querySelector<HTMLInputElement>('#link-url')!;
    urlInput.focus();
    await userEvent.keyboard('abc{ArrowLeft}{Home}');

    expect(link.shadowRoot!.activeElement).toBe(urlInput);
    expect(urlInput.selectionStart).toBe(0);
  });

  it('should leave tool buttons outside an editor toolbar individually tabbable', async () => {
    const context = await renderFixture<RichTextContextComponent>(
      html`
        <button id="before">before</button>
        <forge-rich-text-context>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `,
      'forge-rich-text-context'
    );
    await waitUntil(() => context.isInitialized);
    await settle();

    (context.previousElementSibling as HTMLElement).focus();
    await userEvent.tab();
    expect(focusedLabel()).toBe('Bold');
    await userEvent.tab();
    expect(focusedLabel()).toBe('Italic');
  });
});

/** The accessible name of the focused element, following focus through shadow roots. */
function focusedLabel(): string | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) {
    el = el.shadowRoot.activeElement;
  }
  return el?.getAttribute('aria-label') ?? null;
}

const settle = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 100));

async function waitUntil(condition: () => boolean, timeout = 5000): Promise<void> {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > timeout) {
      throw new Error('waitUntil: condition not met');
    }
    await new Promise(resolve => setTimeout(resolve, 20));
  }
}

async function createEditorFixture(extraFeatures: unknown = null): Promise<{ el: RichTextEditorComponent; before: HTMLButtonElement; editor: Editor }> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <button id="before">before</button>
      <forge-rich-text-editor>
        <forge-rte-standard-tools></forge-rte-standard-tools>
        ${extraFeatures}
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );
  await waitUntil(() => el.isInitialized);
  await settle();

  const context = el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;
  return { el, before: el.previousElementSibling as HTMLButtonElement, editor: context.editorContext.editor as Editor };
}
