import{b as t}from"./iframe-Q5Y6f9_2.js";import"./service-adapter-8tADcN_b.js";import"./rich-text-renderer-m-80U04h.js";import"./rte-standard-tools-BMcoP7Z8.js";import"./preload-helper-PPVm8Dsz.js";import"./custom-element-C-crYl4r.js";import"./property-CHuf62lW.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./provide-CZDhzwTe.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./state-bdshDuzQ.js";import"./when-CI7b_ccM.js";import"./create-context-BxR5I8pu.js";import"./ref-BYaDcPNt.js";import"./async-directive-CN_AuLrw.js";import"./directive-CwRn8Fwj.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./tyler-icons-_o7MAz4c.js";import"./index-BHXiN6PC.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./if-defined-DgOvKJg6.js";import"./dom-utils-BDbRr6KM.js";import"./class-map-DfIRgzLU.js";import"./query-assigned-elements-43hYArgI.js";import"./platform-C5RrLkNt.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./floating-ui.dom-DaMtbvS2.js";import"./event-utils-C1SDeUaq.js";import"./scroll-axis-observer-DmuibK9q.js";import"./style-map-BzWo1Eiz.js";import"./object-utils-CUPteeNI.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./string-utils-Csf55pEv.js";import"./item-manager-C8nNcpm6.js";import"./live-B6TyvohV.js";import"./date-utils-DSnx7xZn.js";const J={title:"Rich Text Editor/Features"},o={render:()=>t`
    <forge-rich-text-editor>
      <forge-rte-standard-tools></forge-rte-standard-tools>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-link auto-protocol></forge-rte-link>
    </forge-rich-text-editor>
    <div style="margin-block-start: 16px; padding: 12px; background: var(--forge-theme-surface-container); border-radius: 4px;">
      <h3 style="margin-block-start: 0;">Link behavior</h3>
      <ul style="margin-block-end: 0;">
        <li><strong>URL validation:</strong> dangerous protocols are always blocked and invalid URLs show a message</li>
        <li><strong>Auto protocol:</strong> with <code>auto-protocol</code>, a URL with no scheme gets https://</li>
        <li><strong>Security:</strong> links are created with <code>target="_blank"</code> and <code>rel="noopener noreferrer nofollow"</code></li>
      </ul>
      <p style="margin-block-end: 0;">
        <em>Try it:</em> select text, click the link button, and enter <code>example.com</code> to see auto-protocol. Entering a <code>javascript:</code> URL is
        rejected.
      </p>
    </div>
  `,parameters:{docs:{description:{story:"The link feature validates URLs and can add a missing protocol. Protocol blocking is always on - it is not an opt-in setting - and applies to both typed URLs and pasted content."}}}},e={render:()=>t`
    <style>
      .composed-demo {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .toolbar-card {
        padding: 12px;
        background: var(--forge-theme-surface-container-lowest);
        border: 1px solid var(--forge-theme-outline);
        border-radius: 8px;
      }
      .content-card {
        padding: 12px;
        background: var(--forge-theme-surface);
        border: 1px solid var(--forge-theme-outline);
        border-radius: 8px;
        min-block-size: 200px;
      }
    </style>
    <div class="composed-demo">
      <forge-rich-text-context>
        <forge-rich-text-toolbar class="toolbar-card">
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-divider></forge-rte-divider>
          <forge-rte-code></forge-rte-code>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-toolbar>
        <div class="content-card">
          <forge-rich-text-content></forge-rich-text-content>
        </div>
      </forge-rich-text-context>
    </div>
  `,parameters:{docs:{description:{story:"For advanced layouts, use `<forge-rich-text-context>` to separate the toolbar from the content area. This allows a fixed toolbar, independent positioning, or custom layouts built from `<forge-rich-text-content>`. Wrap the tools in `<forge-rich-text-toolbar>` to give them the toolbar role, an accessible name and a single tab stop."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-rich-text-editor>
      <forge-rte-standard-tools></forge-rte-standard-tools>
      <forge-rte-divider></forge-rte-divider>
      <forge-rte-link auto-protocol></forge-rte-link>
    </forge-rich-text-editor>
    <div style="margin-block-start: 16px; padding: 12px; background: var(--forge-theme-surface-container); border-radius: 4px;">
      <h3 style="margin-block-start: 0;">Link behavior</h3>
      <ul style="margin-block-end: 0;">
        <li><strong>URL validation:</strong> dangerous protocols are always blocked and invalid URLs show a message</li>
        <li><strong>Auto protocol:</strong> with <code>auto-protocol</code>, a URL with no scheme gets https://</li>
        <li><strong>Security:</strong> links are created with <code>target="_blank"</code> and <code>rel="noopener noreferrer nofollow"</code></li>
      </ul>
      <p style="margin-block-end: 0;">
        <em>Try it:</em> select text, click the link button, and enter <code>example.com</code> to see auto-protocol. Entering a <code>javascript:</code> URL is
        rejected.
      </p>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'The link feature validates URLs and can add a missing protocol. Protocol blocking is always on - it is not an opt-in setting - and applies to both typed URLs and pasted content.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <style>
      .composed-demo {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .toolbar-card {
        padding: 12px;
        background: var(--forge-theme-surface-container-lowest);
        border: 1px solid var(--forge-theme-outline);
        border-radius: 8px;
      }
      .content-card {
        padding: 12px;
        background: var(--forge-theme-surface);
        border: 1px solid var(--forge-theme-outline);
        border-radius: 8px;
        min-block-size: 200px;
      }
    </style>
    <div class="composed-demo">
      <forge-rich-text-context>
        <forge-rich-text-toolbar class="toolbar-card">
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-divider></forge-rte-divider>
          <forge-rte-code></forge-rte-code>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-toolbar>
        <div class="content-card">
          <forge-rich-text-content></forge-rich-text-content>
        </div>
      </forge-rich-text-context>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'For advanced layouts, use \`<forge-rich-text-context>\` to separate the toolbar from the content area. This allows a fixed toolbar, independent positioning, or custom layouts built from \`<forge-rich-text-content>\`. Wrap the tools in \`<forge-rich-text-toolbar>\` to give them the toolbar role, an accessible name and a single tab stop.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};const K=["Links","ComposedLayout"];export{e as ComposedLayout,o as Links,K as __namedExportsOrder,J as default};
