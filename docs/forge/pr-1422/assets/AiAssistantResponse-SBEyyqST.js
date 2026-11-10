import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,r as p,t as m}from"./AiAssistantResponse.stories-Dsjrpkk6.js";function h(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:m}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsxs)(n.p,{children:[`Renders one complete assistant turn: its text, any tool calls the assistant made, and a toolbar with copy, resend and optional feedback buttons. Use it when you build your own message list; `,(0,_.jsx)(n.a,{href:`?path=/docs/ai-components-chat-message-thread--docs`,children:(0,_.jsx)(n.code,{children:`forge-ai-message-thread`})}),` uses it for assistant turns.`]}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsxs)(n.p,{children:[`Set `,(0,_.jsx)(n.code,{children:`response`}),` to an `,(0,_.jsx)(n.code,{children:`AssistantResponse`}),`. Its `,(0,_.jsx)(n.code,{children:`children`}),` are text chunks and tool calls, rendered in order, and `,(0,_.jsx)(n.code,{children:`status`}),` is `,(0,_.jsx)(n.code,{children:`streaming`}),`, `,(0,_.jsx)(n.code,{children:`complete`}),` or `,(0,_.jsx)(n.code,{children:`error`}),`. Text is rendered as markdown.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-ts`,children:`element.response = {
  id: 'response-1',
  status: 'complete',
  timestamp: Date.now(),
  children: [{ type: 'text', messageId: 'message-1', status: 'complete', content: 'Hello!' }]
};
`})}),`
`,(0,_.jsxs)(n.p,{children:[`The toolbar appears once the response is `,(0,_.jsx)(n.code,{children:`complete`}),` and contains text. Set `,(0,_.jsx)(n.code,{children:`enable-reactions`}),` to add thumbs up and thumbs down buttons. A response that is not complete and has no content yet renders nothing, unless `,(0,_.jsx)(n.code,{children:`show-thinking`}),` is set.`]}),`
`,(0,_.jsx)(n.h3,{id:`tool-calls`,children:`Tool calls`}),`
`,(0,_.jsxs)(n.p,{children:[`Pass `,(0,_.jsx)(n.code,{children:`tools`}),` as a `,(0,_.jsx)(n.code,{children:`Map`}),` of tool name to tool definition. Consecutive tool calls are summarized in a `,(0,_.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-tool-call-indicator--docs`,children:`tool call indicator`}),`, and a call whose definition has a `,(0,_.jsx)(n.code,{children:`renderer`}),` also renders its result with `,(0,_.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-tool-call--docs`,children:(0,_.jsx)(n.code,{children:`forge-ai-tool-call`})}),`. Calls without a renderer only appear in the indicator.`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h3,{id:`thinking`,children:`Thinking`}),`
`,(0,_.jsxs)(n.p,{children:[`Set `,(0,_.jsx)(n.code,{children:`show-thinking`}),` to show a thinking indicator while the response is in progress, for example before the first text arrives or between steps. Set `,(0,_.jsx)(n.code,{children:`isThinking`}),` on the response to keep the indicator visible between steps while earlier text is still streaming.`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h3,{id:`events`,children:`Events`}),`
`,(0,_.jsxs)(n.p,{children:[`The toolbar events carry the `,(0,_.jsx)(n.code,{children:`responseId`}),`, and the thumbs events also carry the optional `,(0,_.jsx)(n.code,{children:`feedback`}),` text. They do not bubble, so listen on the element itself.`]}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};