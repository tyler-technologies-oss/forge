import '@tylertech/forge/dist/forge.css';
import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';
import { RICH_TEXT_FEATURES, RICH_TEXT_STANDARD_FEATURES, toRichTextDocument } from '@tylertech/forge-rich-text-editor';
import type { RichTextEditorComponent, RichTextFeature, RichTextRendererComponent, RichTextRendererContent } from '@tylertech/forge-rich-text-editor';

const editor = document.querySelector<RichTextEditorComponent>('#editor')!;
const readOnly = document.querySelector<RichTextEditorComponent>('#readonly')!;
const renderer = document.querySelector<RichTextRendererComponent>('#renderer')!;
const paddedEditor = document.querySelector<RichTextEditorComponent>('#padded-editor')!;
const paddedRenderer = document.querySelector<RichTextRendererComponent>('#padded-renderer')!;
const padding = document.querySelector<HTMLInputElement>('#padding')!;
const events = document.querySelector<HTMLOutputElement>('#events')!;
const output = document.querySelector<HTMLPreElement>('#output')!;
const convertHtml = document.querySelector<HTMLTextAreaElement>('#convert-html')!;
const convertFeatures = document.querySelector<HTMLFieldSetElement>('#convert-features')!;
const convertRenderer = document.querySelector<RichTextRendererComponent>('#convert-renderer')!;
const convertOutput = document.querySelector<HTMLPreElement>('#convert-output')!;

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
paddedEditor.content = SAMPLE_HTML;
paddedRenderer.content = SAMPLE_DOC;

padding.addEventListener('input', () => {
  paddedEditor.style.setProperty('--forge-rich-text-editor-content-padding', padding.value);
  paddedRenderer.style.setProperty('--forge-rich-text-renderer-padding', padding.value);
});

// Covers every feature plus content the converter should drop: a script, an event handler, an
// image, a javascript: link and a table.
const CONVERT_SAMPLE_HTML = `<h2 style="text-align: center">Quarterly summary</h2>
<p onclick="alert('xss')">Revenue is <strong>up 4%</strong>, <em>costs</em> are <u>flat</u> and <s>losses</s> are gone.</p>
<ul><li><p>Read the <a href="https://tylertech.com">full report</a></p></li><li><p>Run <code>pnpm build</code></p></li></ul>
<ol><li><p>First</p></li><li><p><a href="javascript:alert('xss')">Not a real link</a></p></li></ol>
<script>alert('xss')</script><img src="https://example.com/beacon.png">
<table><tr><td>Table cell</td></tr></table>`;

for (const feature of RICH_TEXT_FEATURES) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = feature;
  checkbox.checked = RICH_TEXT_STANDARD_FEATURES.includes(feature);
  label.append(checkbox, ` ${feature} `);
  convertFeatures.append(label);
}

const convert = (): void => {
  const features = Array.from(convertFeatures.querySelectorAll<HTMLInputElement>('input:checked'), input => input.value as RichTextFeature);
  const doc = toRichTextDocument(convertHtml.value, features);
  convertRenderer.content = doc;
  convertOutput.textContent = JSON.stringify(doc, null, 2);
};

convertHtml.value = CONVERT_SAMPLE_HTML;
convertHtml.addEventListener('input', convert);
convertFeatures.addEventListener('change', convert);
convert();

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
