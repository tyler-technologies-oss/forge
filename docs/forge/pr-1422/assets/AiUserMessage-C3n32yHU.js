import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{n as u,r as d,t as f}from"./AiUserMessage.stories-D5QLrwZ4.js";function p(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`Wraps the text of a user's message in a chat conversation. Use it for each message the user sends.`}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`toolbar-and-editing`,children:`Toolbar and editing`}),`
`,(0,h.jsxs)(n.p,{children:[`The toolbar is only shown when `,(0,h.jsx)(n.code,{children:`message-id`}),` and `,(0,h.jsx)(n.code,{children:`timestamp`}),` are both set. It offers copy, resend, and edit actions, and shows the time. Edit opens an inline editor; set `,(0,h.jsx)(n.code,{children:`content`}),` to the original text to seed it. While `,(0,h.jsx)(n.code,{children:`streaming`}),` is set, resend and edit are hidden.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`message.addEventListener('forge-ai-user-message-copy', evt => console.log(evt.detail.messageId));
message.addEventListener('forge-ai-user-message-resend', evt => console.log(evt.detail.messageId));
message.addEventListener('forge-ai-user-message-edit', evt => console.log(evt.detail.messageId, evt.detail.content));
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};