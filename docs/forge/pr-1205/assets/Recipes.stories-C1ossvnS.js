import{b as l}from"./iframe-BJxToyET.js";import"./service-adapter-8tADcN_b.js";import"./rich-text-renderer-CSQzh3VB.js";import"./rte-standard-tools-h-T9-ycE.js";import"./preload-helper-PPVm8Dsz.js";import"./custom-element-C-crYl4r.js";import"./property-DFrfpKpf.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./ref-Cg1geG2F.js";import"./async-directive-jA1Mz7ci.js";import"./directive-CwRn8Fwj.js";import"./provide-CZDhzwTe.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./state-Chsbeeao.js";import"./when-CI7b_ccM.js";import"./create-context-BxR5I8pu.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./tyler-icons-BAsQ94Lf.js";import"./index-5CPwzmQS.js";import"./component-utils-DXwuBG7n.js";import"./if-defined-D8EOTeZZ.js";import"./dom-utils-BrrHV3zE.js";import"./class-map-BnEDXcyy.js";import"./query-assigned-elements-43hYArgI.js";import"./platform-EVTRdOou.js";import"./custom-element-DBARb8MV.js";import"./core-property-Co8uF8PW.js";import"./floating-ui.dom-DaMtbvS2.js";import"./event-utils-C1SDeUaq.js";import"./scroll-axis-observer-D2bLFLX3.js";import"./style-map-DdyOA5fx.js";import"./object-utils-CUPteeNI.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./item-manager-C8nNcpm6.js";import"./live-CVV5vSjC.js";import"./date-utils--tGD4Vvu.js";const W={title:"Rich Text Editor/Recipes"},i={render:()=>l`
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
      <form class="form-demo" @submit=${r=>{r.preventDefault();const t=r.target,o=t.querySelector("forge-rich-text-editor"),n=t.querySelector('input[name="title"]'),e=t.querySelector(".form-output");!o||!n||!e||(e.textContent=[`title:    ${n.value}`,`toHTML(): ${o.toHTML()}`,`toJSON(): ${JSON.stringify(o.toJSON())}`].join(`

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
    `,parameters:{docs:{description:{story:"The editor is not a form-associated custom element, so read its value on submit with `toHTML()` or `toJSON()` rather than relying on `FormData`. Character limits and the `validation` event can drive form-level validation."}}}},a={render:()=>{const d="<h1>Sample Document</h1><p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>Bullet item one</p></li><li><p>Bullet item two</p></li></ul>",r=(t,o)=>{const n=t.target.closest(".output-demo"),e=n?.querySelector("forge-rich-text-editor"),s=n?.querySelector(`#${o}-output`);if(!e||!s)return;const p=o==="json"?JSON.stringify(e.toJSON(),null,2):o==="html"?e.toHTML():e.toMarkdown();s.textContent=p};return l`
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
        <forge-rich-text-editor .content=${d}>
          <forge-rte-standard-tools></forge-rte-standard-tools>
        </forge-rich-text-editor>

        <div class="output-buttons">
          <forge-button variant="outlined" @click=${t=>r(t,"json")}>JSON</forge-button>
          <forge-button variant="outlined" @click=${t=>r(t,"html")}>HTML</forge-button>
          <forge-button variant="outlined" @click=${t=>r(t,"markdown")}>Markdown</forge-button>
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
    `},parameters:{docs:{description:{story:"The editor exposes `toJSON()`, `toHTML()` and `toMarkdown()`. Use `toJSON()` for storage and for feeding `<forge-rich-text-renderer>`, `toHTML()` for display, and `toMarkdown()` for text-based workflows."}}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const X=["FormIntegration","OutputFormats"];export{i as FormIntegration,a as OutputFormats,X as __namedExportsOrder,W as default};
