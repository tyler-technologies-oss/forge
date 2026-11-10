import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{i as u,n as d,r as f,t as p}from"./AiUserMessageToolbar.stories-BEHcwObx.js";function m(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A row of icon buttons for acting on a user's message: a timestamp, resend, edit, and copy. The toolbar only emits events; your app performs the action. `,(0,g.jsx)(n.code,{children:`forge-ai-user-message`}),` uses it internally.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`streaming`,children:`Streaming`}),`
`,(0,g.jsxs)(n.p,{children:[`While a response is streaming, set `,(0,g.jsx)(n.code,{children:`streaming`}),` to hide resend and edit so the user can't interrupt it. Copy stays available.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`events`,children:`Events`}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`toolbar.addEventListener('forge-ai-user-message-toolbar-copy', () => {});
toolbar.addEventListener('forge-ai-user-message-toolbar-resend', () => {});
toolbar.addEventListener('forge-ai-user-message-toolbar-edit', () => {});
`})}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};