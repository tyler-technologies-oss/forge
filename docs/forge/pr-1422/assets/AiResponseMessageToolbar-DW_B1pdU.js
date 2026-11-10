import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiResponseMessageToolbar.stories--k3uWz0l.js";function m(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`A row of icon buttons for acting on an assistant response: resend, copy, and optional thumbs up/down feedback. The toolbar only emits events; your app performs the action.`}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`reactions`,children:`Reactions`}),`
`,(0,g.jsxs)(n.p,{children:[`Set `,(0,g.jsx)(n.code,{children:`enable-reactions`}),` to show thumbs up/down buttons. Thumbs down opens a popover for optional written feedback. Use `,(0,g.jsx)(n.code,{children:`feedback-type`}),` and `,(0,g.jsx)(n.code,{children:`feedback-reason`}),` to restore a previously saved reaction.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`events`,children:`Events`}),`
`,(0,g.jsxs)(n.p,{children:[(0,g.jsx)(n.code,{children:`forge-ai-response-message-toolbar-action`}),` fires when resend or copy is pressed. `,(0,g.jsx)(n.code,{children:`forge-ai-response-message-toolbar-feedback`}),` fires for a thumbs up, or for a thumbs down once its feedback is submitted.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`toolbar.addEventListener('forge-ai-response-message-toolbar-action', evt => {
  const { action } = evt.detail; // 'resend' | 'copy'
});

toolbar.addEventListener('forge-ai-response-message-toolbar-feedback', evt => {
  const { action, feedback } = evt.detail; // action: 'positive' | 'negative'
});
`})}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};