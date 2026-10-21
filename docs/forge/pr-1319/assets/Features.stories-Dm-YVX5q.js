import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{t as i}from"./esm-zpPxaEW-.js";import{t as a}from"./features-D653Z0r4.js";var o=t({ComposedLayout:()=>l,Links:()=>c,__namedExportsOrder:()=>u,default:()=>s}),s,c,l,u;function d(){return(d=e((()=>{r(),i(),a(),s={title:`Rich Text Editor/Features`},c={render:()=>n`
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
  `,parameters:{docs:{description:{story:`The link feature validates URLs and can add a missing protocol. Protocol blocking is always on - it is not an opt-in setting - and applies to both typed URLs and pasted content.`}}}},l={render:()=>n`
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
  `,parameters:{docs:{description:{story:"For advanced layouts, use `<forge-rich-text-context>` to separate the toolbar from the content area. This allows a fixed toolbar, independent positioning, or custom layouts built from `<forge-rich-text-content>`. Wrap the tools in `<forge-rich-text-toolbar>` to give them the toolbar role, an accessible name and a single tab stop."}}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u=[`Links`,`ComposedLayout`]})))()}export{d as i,o as n,c as r,l as t};