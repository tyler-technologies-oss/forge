import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{t as i}from"./esm-zpPxaEW-.js";import{t as a}from"./features-D653Z0r4.js";var o=t({FormIntegration:()=>c,OutputFormats:()=>l,__namedExportsOrder:()=>u,default:()=>s}),s,c,l,u;function d(){return(d=e((()=>{r(),i(),a(),s={title:`Rich Text Editor/Recipes`},c={render:()=>n`
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
      <form class="form-demo" @submit=${e=>{e.preventDefault();let t=e.target,n=t.querySelector(`forge-rich-text-editor`),r=t.querySelector(`input[name="title"]`),i=t.querySelector(`.form-output`);n&&r&&i&&(i.textContent=[`title:    ${r.value}`,`toHTML(): ${n.toHTML()}`,`toJSON(): ${JSON.stringify(n.toJSON())}`].join(`

`))}}>
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
    `,parameters:{docs:{description:{story:"The editor is not a form-associated custom element, so read its value on submit with `toHTML()` or `toJSON()` rather than relying on `FormData`. Character limits and the `validation` event can drive form-level validation."}}}},l={render:()=>{let e=(e,t)=>{let n=e.target.closest(`.output-demo`),r=n?.querySelector(`forge-rich-text-editor`),i=n?.querySelector(`#${t}-output`);r&&i&&(i.textContent=t===`json`?JSON.stringify(r.toJSON(),null,2):t===`html`?r.toHTML():r.toMarkdown())};return n`
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
        <forge-rich-text-editor .content=${`<h1>Sample Document</h1><p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>Bullet item one</p></li><li><p>Bullet item two</p></li></ul>`}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>

        <div class="output-buttons">
          <forge-button variant="outlined" @click=${t=>e(t,`json`)}>JSON</forge-button>
          <forge-button variant="outlined" @click=${t=>e(t,`html`)}>HTML</forge-button>
          <forge-button variant="outlined" @click=${t=>e(t,`markdown`)}>Markdown</forge-button>
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
    `},parameters:{docs:{description:{story:"The editor exposes `toJSON()`, `toHTML()` and `toMarkdown()`. Use `toJSON()` for storage and for feeding `<forge-rich-text-renderer>`, `toHTML()` for display, and `toMarkdown()` for text-based workflows."}}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
      output.textContent = [\`title:    \${title.value}\`, \`toHTML(): \${editor.toHTML()}\`, \`toJSON(): \${JSON.stringify(editor.toJSON())}\`].join('\\n\\n');
    };
    return html\`
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
      <form class="form-demo" @submit=\${handleSubmit}>
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
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'The editor is not a form-associated custom element, so read its value on submit with \`toHTML()\` or \`toJSON()\` rather than relying on \`FormData\`. Character limits and the \`validation\` event can drive form-level validation.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const SAMPLE_HTML = '<h1>Sample Document</h1><p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>Bullet item one</p></li><li><p>Bullet item two</p></li></ul>';

    /**
     * Resolves the editor from the clicked button by walking up to the shared container, rather
     * than assuming a fixed sibling position - the original version of this story read
     * \`previousElementSibling\` from the first button, which resolved to nothing and threw.
     */
    const show = (evt: Event, format: 'json' | 'html' | 'markdown'): void => {
      const root = (evt.target as HTMLElement).closest('.output-demo');
      const editor = root?.querySelector<EditorOutput>('forge-rich-text-editor');
      const output = root?.querySelector<HTMLElement>(\`#\${format}-output\`);
      if (!editor || !output) {
        return;
      }
      const value = format === 'json' ? JSON.stringify(editor.toJSON(), null, 2) : format === 'html' ? editor.toHTML() : editor.toMarkdown();
      output.textContent = value;
    };
    return html\`
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
        <forge-rich-text-editor .content=\${SAMPLE_HTML}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>

        <div class="output-buttons">
          <forge-button variant="outlined" @click=\${(e: Event) => show(e, 'json')}>JSON</forge-button>
          <forge-button variant="outlined" @click=\${(e: Event) => show(e, 'html')}>HTML</forge-button>
          <forge-button variant="outlined" @click=\${(e: Event) => show(e, 'markdown')}>Markdown</forge-button>
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
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'The editor exposes \`toJSON()\`, \`toHTML()\` and \`toMarkdown()\`. Use \`toJSON()\` for storage and for feeding \`<forge-rich-text-renderer>\`, \`toHTML()\` for display, and \`toMarkdown()\` for text-based workflows.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`FormIntegration`,`OutputFormats`]})))()}export{d as i,l as n,o as r,c as t};