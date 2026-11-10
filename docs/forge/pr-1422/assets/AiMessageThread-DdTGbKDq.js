import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./AiMessageThread.stories-kF76BITD.js";function g(e){let n={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:h}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`A scrolling list of chat messages. It renders user messages, assistant responses (with markdown), tool calls, client-only notices, an empty state, and a thinking indicator.`}),`
`,(0,v.jsx)(a,{of:f}),`
`,(0,v.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,v.jsxs)(n.p,{children:[`Set `,(0,v.jsx)(n.code,{children:`messageItems`}),` to the list to render. Each item is a `,(0,v.jsx)(n.code,{children:`message`}),`, `,(0,v.jsx)(n.code,{children:`assistant`}),` response or `,(0,v.jsx)(n.code,{children:`toolCall`}),`. Pass `,(0,v.jsx)(n.code,{children:`tools`}),` (a map of tool name to definition) to render tool call results with custom renderers.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-js`,children:`thread.messageItems = [
  { type: 'message', data: { id: '1', role: 'user', content: 'Hello', timestamp: Date.now(), status: 'complete' } }
];
`})}),`
`,(0,v.jsxs)(n.p,{children:[`The thread scrolls to the latest content automatically while the user is at the bottom, and shows a scroll-to-bottom button otherwise. Set `,(0,v.jsx)(n.code,{children:`auto-scroll="off"`}),` to disable, or call `,(0,v.jsx)(n.code,{children:`scrollToBottom()`}),`.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Set `,(0,v.jsx)(n.code,{children:`enable-reactions`}),` to show thumbs up and down on assistant responses, and `,(0,v.jsx)(n.code,{children:`show-thinking`}),` to show a thinking indicator while waiting.`]}),`
`,(0,v.jsxs)(n.p,{children:[`The thread emits `,(0,v.jsx)(n.code,{children:`forge-ai-message-thread-copy`}),`, `,(0,v.jsx)(n.code,{children:`-resend`}),`, `,(0,v.jsx)(n.code,{children:`-thumbs-up`}),` and `,(0,v.jsx)(n.code,{children:`-thumbs-down`}),` for assistant responses, and `,(0,v.jsx)(n.code,{children:`-user-copy`}),`, `,(0,v.jsx)(n.code,{children:`-user-resend`}),` and `,(0,v.jsx)(n.code,{children:`-user-edit`}),` for user messages. Each detail includes the `,(0,v.jsx)(n.code,{children:`messageId`}),`.`]}),`
`,(0,v.jsx)(n.h3,{id:`tool-calls`,children:`Tool calls`}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsx)(n.h3,{id:`errored-tool-calls`,children:`Errored tool calls`}),`
`,(0,v.jsx)(a,{of:d}),`
`,(0,v.jsx)(n.h3,{id:`client-messages`,children:`Client messages`}),`
`,(0,v.jsxs)(n.p,{children:[`Messages with `,(0,v.jsx)(n.code,{children:`role: 'system'`}),` are local notices such as session expiry or upload progress. Their `,(0,v.jsx)(n.code,{children:`kind`}),` is `,(0,v.jsx)(n.code,{children:`text`}),`, `,(0,v.jsx)(n.code,{children:`info`}),`, `,(0,v.jsx)(n.code,{children:`warning`}),`, `,(0,v.jsx)(n.code,{children:`error`}),` or `,(0,v.jsx)(n.code,{children:`success`}),`, and they can include a `,(0,v.jsx)(n.code,{children:`header`}),` and `,(0,v.jsx)(n.code,{children:`actions`}),`.`]}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsx)(n.h3,{id:`empty-state`,children:`Empty state`}),`
`,(0,v.jsxs)(n.p,{children:[`When there are no messages, an empty state is shown. Customize it with the `,(0,v.jsx)(n.code,{children:`empty-state-icon`}),`, `,(0,v.jsx)(n.code,{children:`empty-state-heading`}),`, `,(0,v.jsx)(n.code,{children:`empty-state-message`}),` and `,(0,v.jsx)(n.code,{children:`empty-state-actions`}),` slots.`]}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),p()})))()}y();export{_ as default};