import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import '../rich-text-editor.js';
import '../features/rte-align.js';

/**
 * Alignment reaches the schema only through `element.style.textAlign` - `TextAlign` declares no tag
 * selector - so stripping `style` in `sanitizeHTML` discarded it from every HTML source. The loss
 * was not paste-only: feeding the editor's own `toHTML()` output back through `content` dropped the
 * alignment too, so a save/load cycle silently lost it.
 *
 * `forge-rte-align` must be slotted in for these assertions to mean anything. Without it the
 * schema has no `textAlign` attribute at all and every expectation below would fail for an
 * unrelated reason.
 */
const createEditor = async (): Promise<RichTextEditorComponent> => {
  const el = await renderFixture<RichTextEditorComponent>(
    html`<forge-rich-text-editor><forge-rte-align></forge-rte-align></forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await new Promise(resolve => setTimeout(resolve, 100));
  return el;
};

const setContent = async (el: RichTextEditorComponent, content: RichTextEditorComponent['content']): Promise<void> => {
  el.content = content;
  await el.updateComplete;
  await new Promise(resolve => setTimeout(resolve, 100));
};

describe('RichTextEditor alignment round trip', () => {
  it.each(['center', 'right', 'justify'])('should keep text-align: %s from HTML content', async alignment => {
    const el = await createEditor();

    await setContent(el, `<p style="text-align: ${alignment}">aligned</p>`);

    expect(el.toHTML()).toContain(`text-align: ${alignment}`);
  });

  it('should survive a full output-to-content round trip', async () => {
    const el = await createEditor();
    await setContent(el, '<p style="text-align: center">aligned</p>');
    const saved = el.toHTML();

    const reloaded = await createEditor();
    await setContent(reloaded, saved);

    expect(reloaded.toHTML()).toBe(saved);
    expect(reloaded.toHTML()).toContain('text-align: center');
  });

  it('should not invent alignment for unaligned content', async () => {
    const el = await createEditor();

    await setContent(el, '<p>plain</p>');

    expect(el.toHTML()).not.toContain('text-align');
  });
});
