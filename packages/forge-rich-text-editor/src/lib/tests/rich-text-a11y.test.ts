import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { expectNoA11yViolations, runAxe } from '../../testing/a11y.js';
import type { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextRendererContent } from '../editor-context.js';
import '../rich-text-editor.js';
import '../rich-text-renderer.js';
import '../features/rte-standard-tools.js';
import '../features/rte-code.js';
import '../features/rte-link.js';

/**
 * axe runs against the host element and traverses the shadow roots beneath it.
 *
 * This suite exists because two violations survived every other form of testing here. TipTap builds
 * its own contenteditable element inside the one it is given, and that inner element - the real,
 * focusable textbox - had no accessible name, while the container that did have one is not what
 * assistive technology lands on. Separately, the toolbar and all thirteen tool buttons carried
 * `aria-controls="forge-rte-content"`, an id that lives in a different shadow root; IDREF attributes
 * cannot cross a shadow boundary, so all fourteen references were invalid.
 */
const SAMPLE_DOCUMENT = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Heading' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'Rendered content.' }] }
  ]
} as unknown as RichTextRendererContent;

const settle = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 250));

const fullEditor = async (attrs = ''): Promise<RichTextEditorComponent> => {
  const el = await renderFixture<RichTextEditorComponent>(
    html`<forge-rich-text-editor .content=${'<p>content</p>'} ?disabled=${attrs === 'disabled'} ?readonly=${attrs === 'readonly'}>
      <forge-rte-standard-tools></forge-rte-standard-tools>
      <forge-rte-code></forge-rte-code>
      <forge-rte-link></forge-rte-link>
    </forge-rich-text-editor>`,
    'forge-rich-text-editor'
  );
  await settle();
  return el;
};

describe('RichTextEditor accessibility', () => {
  it('should have no violations in the default editable state', async () => {
    await expectNoA11yViolations(await fullEditor());
  });

  it('should have no violations when readonly', async () => {
    await expectNoA11yViolations(await fullEditor('readonly'));
  });

  it('should have no violations when disabled', async () => {
    await expectNoA11yViolations(await fullEditor('disabled'));
  });

  it('should have no violations with the counts and a limit shown', async () => {
    const el = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor .maxLength=${50} .showCharacterCount=${true} .showWordCount=${true}>
        <forge-rte-standard-tools></forge-rte-standard-tools>
      </forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    await settle();

    await expectNoA11yViolations(el);
  });

  it('should have no violations while showing a validation error', async () => {
    const el = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor .maxLength=${10} .content=${'<p>0123456789ABCDEFGHIJ</p>'} .errorMessage=${'Too long'}>
        <forge-rte-standard-tools></forge-rte-standard-tools>
      </forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    await settle();

    await expectNoA11yViolations(el);
  });

  it('should have no violations with the link popover open', async () => {
    const el = await fullEditor();
    const link = el.querySelector('forge-rte-link')!;
    const button = link.shadowRoot!.querySelector('forge-rte-tool-button')!;
    (button.shadowRoot!.querySelector('forge-icon-button') as HTMLElement).click();
    await settle();

    // Guard against the assertion passing because the popover never opened.
    expect(link.shadowRoot!.querySelector('forge-popover')).toBeTruthy();
    await expectNoA11yViolations(el);
  });

  it('should have no violations in a composed layout', async () => {
    const el = await renderFixture(
      html`<forge-rich-text-context>
        <div><forge-rte-standard-tools></forge-rte-standard-tools></div>
        <div><forge-rich-text-content></forge-rich-text-content></div>
      </forge-rich-text-context>`,
      'forge-rich-text-context'
    );
    await settle();

    await expectNoA11yViolations(el);
  });

  it('should have no violations in the renderer', async () => {
    const el = await renderFixture(html`<forge-rich-text-renderer .content=${SAMPLE_DOCUMENT}></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
    await settle();

    await expectNoA11yViolations(el);
  });

  it('should name the element TipTap makes editable, not only its container', async () => {
    const el = await fullEditor();
    const content = el.shadowRoot!.querySelector('forge-rich-text-content')!;
    const editable = content.shadowRoot!.querySelector('.tiptap') as HTMLElement;

    expect(editable.getAttribute('contenteditable')).toBe('true');
    expect(editable.getAttribute('aria-label')).toBe('Rich text editor content');
  });

  it('should not reference an id across a shadow boundary', async () => {
    const el = await fullEditor();
    const { violations } = await runAxe(el);

    // aria-controls pointed at an id inside another shadow root, which is never resolvable.
    expect(violations.find(v => v.id === 'aria-valid-attr-value')).toBeUndefined();
    expect(el.shadowRoot!.querySelector('[aria-controls]')).toBeNull();
  });
});
