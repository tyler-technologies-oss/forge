import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-response-message-toolbar-CBn7pGuW.js";var a=t({Demo:()=>u,InMessageContext:()=>f,WithReactions:()=>d,__namedExportsOrder:()=>p,default:()=>l}),o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-response-message-toolbar`,c=n`<style>
  .response-toolbar-story-hint {
    margin: 0 0 var(--forge-spacing-medium) 0;
    color: var(--forge-theme-text-primary);
  }
  .response-toolbar-story-context {
    max-inline-size: 600px;
    background: var(--forge-theme-surface);
    border-radius: 8px;
    padding: var(--forge-spacing-medium);
  }
  .response-toolbar-story-message {
    margin-block-end: var(--forge-spacing-small);
    padding: var(--forge-spacing-small);
    background: var(--forge-theme-surface-variant);
    border-radius: 4px;
    color: var(--forge-theme-text-primary);
  }
</style>`,l={title:`AI/Components/Messages/Response Message Toolbar`,component:s,argTypes:{enableReactions:{control:`boolean`,description:`Whether to show thumbs up/down reaction buttons`},feedbackType:{control:`select`,options:[void 0,`positive`,`negative`],description:`The current feedback state`}},args:{enableReactions:!1,feedbackType:void 0},render:e=>{let t=o(`forge-ai-response-message-toolbar-action`),r=o(`forge-ai-response-message-toolbar-feedback`);return n`
      ${c}
      <p class="response-toolbar-story-hint">Click any button to see events in the Actions panel below.</p>
      <forge-ai-response-message-toolbar
        ?enable-reactions=${e.enableReactions}
        feedback-type=${e.feedbackType||``}
        @forge-ai-response-message-toolbar-action=${t}
        @forge-ai-response-message-toolbar-feedback=${r}>
      </forge-ai-response-message-toolbar>
    `}},u={},d={args:{enableReactions:!0}},f={args:{enableReactions:!0},render:e=>{let t=o(`forge-ai-response-message-toolbar-action`),r=o(`forge-ai-response-message-toolbar-feedback`);return n`
      ${c}
      <div class="response-toolbar-story-context">
        <div class="response-toolbar-story-message">
          This is sample AI response content. The toolbar demonstrates how it would appear below an AI response message.
        </div>
        <forge-ai-response-message-toolbar
          ?enable-reactions=${e.enableReactions}
          @forge-ai-response-message-toolbar-action=${t}
          @forge-ai-response-message-toolbar-feedback=${r}>
        </forge-ai-response-message-toolbar>
      </div>
    `}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    enableReactions: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    enableReactions: true
  },
  render: (args: any) => {
    const onAction = action('forge-ai-response-message-toolbar-action');
    const onFeedback = action('forge-ai-response-message-toolbar-feedback');
    return html\`
      \${storyStyles}
      <div class="response-toolbar-story-context">
        <div class="response-toolbar-story-message">
          This is sample AI response content. The toolbar demonstrates how it would appear below an AI response message.
        </div>
        <forge-ai-response-message-toolbar
          ?enable-reactions=\${args.enableReactions}
          @forge-ai-response-message-toolbar-action=\${onAction}
          @forge-ai-response-message-toolbar-feedback=\${onFeedback}>
        </forge-ai-response-message-toolbar>
      </div>
    \`;
  }
}`,...f.parameters?.docs?.source}}},p=[`Demo`,`WithReactions`,`InMessageContext`]})))()}export{m as i,u as n,d as r,a as t};