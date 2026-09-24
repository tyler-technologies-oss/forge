import '@tylertech/forge/dist/forge.css';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ForgeRichTextEditor,
  ForgeRichTextRenderer,
  ForgeRteCode,
  ForgeRteLink,
  ForgeRteStandardTools,
  type ForgeRichTextEditorElement,
  type ForgeRichTextRendererElement
} from '../../dist/index.js';

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
} as unknown as ForgeRichTextRendererElement['content'];

const App = (): React.ReactElement => {
  const editorRef = useRef<ForgeRichTextEditorElement>(null);
  const [lastEvent, setLastEvent] = useState('(none)');
  const [output, setOutput] = useState('');

  const dump = (): void => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }
    setOutput(
      [
        `toJSON():      ${JSON.stringify(editor.toJSON())}`,
        `toHTML():      ${editor.toHTML()}`,
        `toMarkdown():  ${editor.toMarkdown()}`,
        `isInitialized: ${editor.isInitialized}`
      ].join('\n\n')
    );
  };

  return (
    <main>
      <h1>Rich Text Editor — React</h1>

      <section>
        <h2>Standard tools</h2>
        <ForgeRichTextEditor
          ref={editorRef}
          maxLength={500}
          showCharacterCount
          showWordCount
          onChange={event => setLastEvent(`change: ${JSON.stringify(event.detail)}`)}
          onValidation={event => setLastEvent(`validation: ${JSON.stringify(event.detail)}`)}
          onInitialized={() => setLastEvent('initialized')}
          onError={event => setLastEvent(`error: ${JSON.stringify(event.detail)}`)}>
          <ForgeRteStandardTools />
          <ForgeRteCode />
          <ForgeRteLink />
        </ForgeRichTextEditor>
        <output>{lastEvent}</output>
      </section>

      <section>
        <h2>Read only</h2>
        <ForgeRichTextEditor readOnly content={SAMPLE_HTML} />
      </section>

      <section>
        <h2>Disabled</h2>
        <ForgeRichTextEditor disabled content={SAMPLE_HTML} />
      </section>

      <section>
        <h2>Document content</h2>
        {/* A document's marks must exist in the schema, so the features that provide them have to
            be slotted - unlike HTML input, unknown marks discard the whole document. */}
        <ForgeRichTextEditor id="doc-content" content={SAMPLE_DOC}>
          <ForgeRteStandardTools />
          <ForgeRteLink />
        </ForgeRichTextEditor>
      </section>

      <section>
        <h2>Renderer</h2>
        <ForgeRichTextRenderer content={SAMPLE_DOC} />
      </section>

      <section>
        <h2>Output</h2>
        <button type="button" onClick={dump}>
          Log toJSON / toHTML / toMarkdown
        </button>
        <pre>{output}</pre>
      </section>
    </main>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
