import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{i as u,n as d,r as f,t as p}from"./AiConversationsPanel.stories--mEqflBX.js";function m(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`A panel listing previous conversations, with a new chat action, search, selection, rename and delete. Use it for conversation history next to a chat.`}),`
`,(0,g.jsxs)(n.p,{children:[`The panel renders the `,(0,g.jsx)(n.code,{children:`threads`}),` it is given and reports user intent through events, so your app owns loading and persistence.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[`Select a thread with `,(0,g.jsx)(n.code,{children:`selected-thread-id`}),`. Enable the per-thread menu actions with `,(0,g.jsx)(n.code,{children:`show-thread-rename`}),` and `,(0,g.jsx)(n.code,{children:`show-thread-delete`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-conversations-panel-select`}),`, `,(0,g.jsx)(n.code,{children:`-new-chat`}),` and `,(0,g.jsx)(n.code,{children:`-close`}),` report navigation.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Search runs locally by default. Cancel `,(0,g.jsx)(n.code,{children:`forge-ai-conversations-panel-search`}),` and call `,(0,g.jsx)(n.code,{children:`setResults()`}),` to search on your server.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Set `,(0,g.jsx)(n.code,{children:`total-chats`}),` to the full count to enable infinite scroll, and handle `,(0,g.jsx)(n.code,{children:`forge-ai-conversations-panel-load-more`}),` by calling `,(0,g.jsx)(n.code,{children:`appendResults()`}),`. Pass an empty array to signal the end.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Rename and delete update the list optimistically. Cancel `,(0,g.jsx)(n.code,{children:`-rename`}),` or `,(0,g.jsx)(n.code,{children:`-delete`}),` to confirm with your backend, then call `,(0,g.jsx)(n.code,{children:`onSuccess()`}),` or `,(0,g.jsx)(n.code,{children:`onError()`}),`.`]}),`
`]}),`
`,(0,g.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,g.jsxs)(n.p,{children:[`Set `,(0,g.jsx)(n.code,{children:`loading`}),` while threads load. Set `,(0,g.jsx)(n.code,{children:`error-message`}),` when a load fails, and clear it once a retry succeeds. The panel emits `,(0,g.jsx)(n.code,{children:`forge-ai-conversations-panel-retry`}),` when the user clicks retry.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};