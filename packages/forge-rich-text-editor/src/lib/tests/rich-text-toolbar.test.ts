import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import { renderFixture } from '../../testing/fixture.js';
import { expectNoA11yViolations } from '../../testing/a11y.js';
import type { RichTextContextComponent } from '../rich-text-context.js';
import type { RichTextToolbarComponent } from '../rich-text-toolbar.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';

import '../rich-text-editor.js';
import '../rich-text-context.js';
import '../rich-text-content.js';
import '../rich-text-toolbar.js';
import '../features/rte-bold.js';
import '../features/rte-italic.js';
import '../features/rte-underline.js';

describe('Rich Text Toolbar', () => {
  it('should make a composed layout toolbar a single tab stop', async () => {
    const { before, editor } = await createComposedFixture();

    before.focus();
    await userEvent.tab();
    expect(focusedLabel()).toBe('Bold');

    await userEvent.tab();
    expect(editor.isFocused).toBe(true);
  });

  it('should move between buttons with the arrow keys in a composed layout', async () => {
    const { before } = await createComposedFixture();

    before.focus();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(focusedLabel()).toBe('Italic');

    await userEvent.keyboard('{End}');
    expect(focusedLabel()).toBe('Underline');
  });

  it('should keep separate toolbars as separate tab stops', async () => {
    const context = await renderFixture<RichTextContextComponent>(
      html`
        <button>before</button>
        <forge-rich-text-context>
          <forge-rich-text-toolbar label="Marks">
            <forge-rte-bold></forge-rte-bold>
            <forge-rte-italic></forge-rte-italic>
          </forge-rich-text-toolbar>
          <forge-rich-text-toolbar label="More">
            <forge-rte-underline></forge-rte-underline>
          </forge-rich-text-toolbar>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `,
      'forge-rich-text-context'
    );
    await vi.waitUntil(() => context.isInitialized);
    await settle();

    (context.previousElementSibling as HTMLElement).focus();
    await userEvent.tab();
    expect(focusedLabel()).toBe('Bold');
    await userEvent.tab();
    expect(focusedLabel()).toBe('Underline');
  });

  it('should expose the toolbar role, accessible name and orientation', async () => {
    const { toolbar } = await createComposedFixture();

    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-label')).toBe('Rich text formatting toolbar');
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should update its accessible name when the label changes', async () => {
    const { toolbar } = await createComposedFixture();

    toolbar.label = 'Formatting';
    await toolbar.updateComplete;

    expect(toolbar.getAttribute('aria-label')).toBe('Formatting');
  });

  it('should point the toolbar at the context in a composed layout', async () => {
    const { context, toolbar } = await createComposedFixture();

    if ('ariaControlsElements' in toolbar) {
      expect((toolbar as unknown as { ariaControlsElements: Element[] | null }).ariaControlsElements).toEqual([context]);
    }
  });

  it('should dim the toolbar in a readonly composed layout', async () => {
    const { context, toolbar } = await createComposedFixture();

    context.readOnly = true;
    await context.updateComplete;
    await toolbar.updateComplete;

    expect(toolbar.hasAttribute('readonly')).toBe(true);
    expect(Number(getComputedStyle(toolbar).opacity)).toBeLessThan(1);
    expect(Number(getComputedStyle(context.querySelector('forge-rich-text-content')!).opacity)).toBe(1);
  });

  it('should use the readonly opacity custom property when set', async () => {
    const { context, toolbar } = await createComposedFixture();

    toolbar.style.setProperty('--forge-rich-text-toolbar-readonly-opacity', '0.5');
    context.readOnly = true;
    await context.updateComplete;
    await toolbar.updateComplete;

    expect(getComputedStyle(toolbar).opacity).toBe('0.5');
  });

  it('should not dim itself in a disabled editor, which already dims its whole frame', async () => {
    const el = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor disabled><forge-rte-bold></forge-rte-bold></forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    await vi.waitUntil(() => el.isInitialized);
    await settle();
    const toolbar = el.shadowRoot!.querySelector('forge-rich-text-toolbar')!;

    expect(toolbar.hasAttribute('disabled')).toBe(true);
    expect(getComputedStyle(toolbar).opacity).toBe('1');
  });

  it('should have no accessibility violations in a composed layout', async () => {
    const { context } = await createComposedFixture();

    await expectNoA11yViolations(context);
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

async function createComposedFixture(): Promise<{
  context: RichTextContextComponent;
  toolbar: RichTextToolbarComponent;
  before: HTMLButtonElement;
  editor: Editor;
}> {
  const context = await renderFixture<RichTextContextComponent>(
    html`
      <button>before</button>
      <forge-rich-text-context>
        <forge-rich-text-toolbar>
          <forge-rte-bold></forge-rte-bold>
          <forge-rte-italic></forge-rte-italic>
          <forge-rte-underline></forge-rte-underline>
        </forge-rich-text-toolbar>
        <forge-rich-text-content></forge-rich-text-content>
      </forge-rich-text-context>
    `,
    'forge-rich-text-context'
  );
  await vi.waitUntil(() => context.isInitialized);
  await settle();

  return {
    context,
    toolbar: context.querySelector('forge-rich-text-toolbar') as RichTextToolbarComponent,
    before: context.previousElementSibling as HTMLButtonElement,
    editor: context.editorContext.editor as Editor
  };
}
