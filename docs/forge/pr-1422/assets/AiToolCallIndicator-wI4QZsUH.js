import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./AiToolCallIndicator.stories-hJ7jzqBv.js";function g(e){let n={code:`code`,h2:`h2`,p:`p`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:h}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`A compact summary of the tool calls an assistant made while answering. Collapsed, it reads "Running tools..." or "Used N tools · Xs". Expanded, it lists each call with a status marker. Use it to show tool activity without cluttering the conversation.`}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsxs)(n.p,{children:[`Pass `,(0,v.jsx)(n.code,{children:`toolCalls`}),`, plus an optional `,(0,v.jsx)(n.code,{children:`tools`}),` map keyed by tool name so each row shows the tool's `,(0,v.jsx)(n.code,{children:`displayName`}),` instead of its raw name.`]}),`
`,(0,v.jsx)(n.h2,{id:`status`,children:`Status`}),`
`,(0,v.jsxs)(n.p,{children:[`The indicator renders whatever `,(0,v.jsx)(n.code,{children:`status`}),` each tool call has. It shows the running summary while any call is not `,(0,v.jsx)(n.code,{children:`complete`}),` or `,(0,v.jsx)(n.code,{children:`error`}),`. A call whose tool renders its own UI early (`,(0,v.jsx)(n.code,{children:`renderOnStart`}),`) counts as settled.`]}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsxs)(n.p,{children:[`A failed call is a `,(0,v.jsx)(n.code,{children:`status: 'error'`}),` entry.`]}),`
`,(0,v.jsx)(a,{of:d}),`
`,(0,v.jsx)(n.h2,{id:`debug-mode`,children:`Debug mode`}),`
`,(0,v.jsxs)(n.p,{children:[`Set `,(0,v.jsx)(n.code,{children:`debug-mode`}),` to let users expand each call and see its input, output, or error.`]}),`
`,(0,v.jsx)(a,{of:f}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),p()})))()}y();export{_ as default};