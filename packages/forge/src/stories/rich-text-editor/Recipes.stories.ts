import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';

/** The output surface these recipes rely on, typed locally so the stories need no cross-package types. */
interface EditorOutput extends HTMLElement {
  toHTML(): string;
  toJSON(): unknown;
  toMarkdown(): string;
}

const meta = {
  title: 'Rich Text Editor/Recipes'
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const FormIntegration: Story = {
  render: () => {
    const handleSubmit = (evt: Event): void => {
      evt.preventDefault();
      const form = evt.target as HTMLFormElement;
      const editor = form.querySelector<EditorOutput>('forge-rich-text-editor');
      const title = form.querySelector<HTMLInputElement>('input[name="title"]');
      const output = form.querySelector<HTMLPreElement>('.form-output');
      if (!editor || !title || !output) {
        return;
      }

      output.textContent = [`title:    ${title.value}`, `toHTML(): ${editor.toHTML()}`, `toJSON(): ${JSON.stringify(editor.toJSON())}`].join('\n\n');
    };

    return html`
      <style>
        .form-demo {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-inline-size: 800px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-field label {
          font-weight: 600;
          font-size: 14px;
        }
        .form-field input {
          padding: 8px 12px;
          border: 1px solid var(--forge-theme-outline);
          border-radius: 4px;
          font-size: 14px;
        }
        .form-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .form-output {
          background: var(--forge-theme-surface-container);
          border: 1px solid var(--forge-theme-outline);
          border-radius: 4px;
          padding: 12px;
          font-family: monospace;
          font-size: 12px;
          white-space: pre-wrap;
          margin: 0;
        }
      </style>
      <form class="form-demo" @submit=${handleSubmit}>
        <div class="form-field">
          <label for="doc-title">Document title</label>
          <input type="text" id="doc-title" name="title" required />
        </div>

        <div class="form-field">
          <label for="doc-content">Content</label>
          <forge-rich-text-editor id="doc-content" max-length="1000" show-character-count>
            <forge-rte-standard-tools></forge-rte-standard-tools>
            <forge-rte-divider></forge-rte-divider>
            <forge-rte-code></forge-rte-code>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-editor>
        </div>

        <div class="form-actions">
          <forge-button type="reset" variant="outlined">Reset</forge-button>
          <forge-button type="submit" variant="raised">Submit</forge-button>
        </div>

        <pre class="form-output">Submit to see the extracted values.</pre>
      </form>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'The editor is not a form-associated custom element, so read its value on submit with `toHTML()` or `toJSON()` rather than relying on `FormData`. Character limits and the `validation` event can drive form-level validation.'
      }
    }
  }
};

export const OutputFormats: Story = {
  render: () => {
    const SAMPLE_HTML =
      '<h1>Sample Document</h1><p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>Bullet item one</p></li><li><p>Bullet item two</p></li></ul>';

    /**
     * Resolves the editor from the clicked button by walking up to the shared container, rather
     * than assuming a fixed sibling position - the original version of this story read
     * `previousElementSibling` from the first button, which resolved to nothing and threw.
     */
    const show = (evt: Event, format: 'json' | 'html' | 'markdown'): void => {
      const root = (evt.target as HTMLElement).closest('.output-demo');
      const editor = root?.querySelector<EditorOutput>('forge-rich-text-editor');
      const output = root?.querySelector<HTMLElement>(`#${format}-output`);
      if (!editor || !output) {
        return;
      }

      const value = format === 'json' ? JSON.stringify(editor.toJSON(), null, 2) : format === 'html' ? editor.toHTML() : editor.toMarkdown();
      output.textContent = value;
    };

    return html`
      <style>
        .output-demo {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .output-buttons {
          display: flex;
          gap: 8px;
        }
        .output-display {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .output-section h3 {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 600;
        }
        .output-content {
          background: var(--forge-theme-surface-container);
          border: 1px solid var(--forge-theme-outline);
          border-radius: 4px;
          padding: 12px;
          font-family: monospace;
          font-size: 12px;
          white-space: pre-wrap;
          word-break: break-word;
          max-block-size: 300px;
          overflow: auto;
        }
      </style>
      <div class="output-demo">
        <forge-rich-text-editor .content=${SAMPLE_HTML}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>

        <div class="output-buttons">
          <forge-button variant="outlined" @click=${(e: Event) => show(e, 'json')}>JSON</forge-button>
          <forge-button variant="outlined" @click=${(e: Event) => show(e, 'html')}>HTML</forge-button>
          <forge-button variant="outlined" @click=${(e: Event) => show(e, 'markdown')}>Markdown</forge-button>
        </div>

        <div class="output-display">
          <div class="output-section">
            <h3>toJSON()</h3>
            <div class="output-content" id="json-output">The ProseMirror document.</div>
          </div>
          <div class="output-section">
            <h3>toHTML()</h3>
            <div class="output-content" id="html-output">A sanitized HTML string.</div>
          </div>
          <div class="output-section">
            <h3>toMarkdown()</h3>
            <div class="output-content" id="markdown-output">A Markdown string.</div>
          </div>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'The editor exposes `toJSON()`, `toHTML()` and `toMarkdown()`. Use `toJSON()` for storage and for feeding `<forge-rich-text-renderer>`, `toHTML()` for display, and `toMarkdown()` for text-based workflows.'
      }
    }
  }
};
