import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-user-message-toolbar-BQPSeWOy.js";var a=t({Demo:()=>u,InMessageContext:()=>f,Streaming:()=>d,__namedExportsOrder:()=>p,default:()=>l}),o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-user-message-toolbar`,c=n`<style>
  .user-toolbar-story-hint {
    margin: 0 0 var(--forge-spacing-medium) 0;
    color: var(--forge-theme-text-primary);
  }
  .user-toolbar-story-context {
    max-inline-size: 600px;
  }
  .user-toolbar-story-message {
    margin-inline-start: auto;
    inline-size: fit-content;
    margin-block-end: var(--forge-spacing-small);
    padding: var(--forge-spacing-small);
    background: var(--forge-theme-surface-container-minimum);
    border-radius: 8px;
    border-start-end-radius: 0;
    color: var(--forge-theme-text-primary);
  }
  .user-toolbar-story-toolbar {
    display: flex;
    justify-content: flex-end;
  }
</style>`,l={title:`AI/Components/Messages/User Message Toolbar`,component:s,argTypes:{timestamp:{control:`number`,description:`Timestamp to display (Unix timestamp in milliseconds)`},streaming:{control:`boolean`,description:`Whether the AI is currently streaming a response (disables resend/edit buttons)`}},args:{timestamp:Date.now(),streaming:!1},render:e=>{let t=o(`forge-ai-user-message-toolbar-copy`),r=o(`forge-ai-user-message-toolbar-resend`),i=o(`forge-ai-user-message-toolbar-edit`);return n`
      ${c}
      <p class="user-toolbar-story-hint">Click any button to see events in the Actions panel below.</p>
      <forge-ai-user-message-toolbar
        .timestamp=${e.timestamp}
        ?streaming=${e.streaming}
        @forge-ai-user-message-toolbar-copy=${t}
        @forge-ai-user-message-toolbar-resend=${r}
        @forge-ai-user-message-toolbar-edit=${i}>
      </forge-ai-user-message-toolbar>
    `}},u={},d={args:{streaming:!0}},f={render:e=>{let t=o(`forge-ai-user-message-toolbar-copy`),r=o(`forge-ai-user-message-toolbar-resend`),i=o(`forge-ai-user-message-toolbar-edit`);return n`
      ${c}
      <div class="user-toolbar-story-context">
        <div class="user-toolbar-story-message">
          This is a sample user message. The toolbar demonstrates how it would appear below a user's message in the chat.
        </div>
        <div class="user-toolbar-story-toolbar">
          <forge-ai-user-message-toolbar
            .timestamp=${Date.now()}
            @forge-ai-user-message-toolbar-copy=${t}
            @forge-ai-user-message-toolbar-resend=${r}
            @forge-ai-user-message-toolbar-edit=${i}>
          </forge-ai-user-message-toolbar>
        </div>
      </div>
    `}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    streaming: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args: any) => {
    const onCopy = action('forge-ai-user-message-toolbar-copy');
    const onResend = action('forge-ai-user-message-toolbar-resend');
    const onEdit = action('forge-ai-user-message-toolbar-edit');
    return html\`
      \${storyStyles}
      <div class="user-toolbar-story-context">
        <div class="user-toolbar-story-message">
          This is a sample user message. The toolbar demonstrates how it would appear below a user's message in the chat.
        </div>
        <div class="user-toolbar-story-toolbar">
          <forge-ai-user-message-toolbar
            .timestamp=\${Date.now()}
            @forge-ai-user-message-toolbar-copy=\${onCopy}
            @forge-ai-user-message-toolbar-resend=\${onResend}
            @forge-ai-user-message-toolbar-edit=\${onEdit}>
          </forge-ai-user-message-toolbar>
        </div>
      </div>
    \`;
  }
}`,...f.parameters?.docs?.source}}},p=[`Demo`,`Streaming`,`InMessageContext`]})))()}export{m as i,u as n,d as r,a as t};