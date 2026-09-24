import '@tylertech/forge/dist/forge.css';
import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';
import type { RichTextEditorComponent, RichTextRendererComponent, RichTextRendererContent } from '@tylertech/forge-rich-text-editor';

const editor = document.querySelector<RichTextEditorComponent>('#editor')!;
const readOnly = document.querySelector<RichTextEditorComponent>('#readonly')!;
const renderer = document.querySelector<RichTextRendererComponent>('#renderer')!;
const events = document.querySelector<HTMLOutputElement>('#events')!;
const output = document.querySelector<HTMLPreElement>('#output')!;

// The editor takes HTML, but the renderer takes ProseMirror JSON - the shape the editor's
// `change` event emits. They are deliberately different formats.
const SAMPLE_HTML = '<p>Some <strong>bold</strong>, <em>italic</em> and <a href="https://tylertech.com">linked</a> text.</p>';

const SAMPLE_DOC = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Some ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'linked', marks: [{ type: 'link', attrs: { href: 'https://tylertech.com' } }] },
        { type: 'text', text: ' text.' }
      ]
    }
  ]
} as unknown as RichTextRendererContent;

readOnly.content = SAMPLE_HTML;
renderer.content = SAMPLE_DOC;

for (const type of ['change', 'validation', 'initialized', 'initialization-error', 'error']) {
  editor.addEventListener(type, event => {
    events.textContent = `${type}: ${JSON.stringify((event as CustomEvent).detail)}`;
    console.log(type, (event as CustomEvent).detail);
  });
}

document.querySelector('#dump')!.addEventListener('click', () => {
  output.textContent = [
    `toJSON():     ${JSON.stringify(editor.toJSON())}`,
    `toHTML():     ${editor.toHTML()}`,
    `toMarkdown(): ${editor.toMarkdown()}`,
    `isInitialized: ${editor.isInitialized}`
  ].join('\n\n');
});
