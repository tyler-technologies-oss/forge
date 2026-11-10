import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiThreadActionsMenu.stories-CM2pCnBf.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A three-dot button that opens a menu of actions for one conversation, with optional Rename and Delete items. `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-conversations-conversations-panel--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-conversations-panel`})}),` and `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-conversations-threads-search--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-threads-search`})}),` use it on each row. Use it directly only when building your own conversation list.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`Set `,(0,g.jsx)(n.code,{children:`thread`}),`, then turn on the items you support with `,(0,g.jsx)(n.code,{children:`show-rename`}),` and `,(0,g.jsx)(n.code,{children:`show-delete`}),`. Both are off by default, so with neither the menu has no items.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-html`,children:`<forge-ai-thread-actions-menu show-rename show-delete></forge-ai-thread-actions-menu>
`})}),`
`,(0,g.jsx)(n.p,{children:`The menu only reports what the user chose. It does not rename or delete anything, so handle the events in your app.`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-thread-actions-menu-rename`}),` fires with the thread `,(0,g.jsx)(n.code,{children:`id`}),`. Typically you respond by showing `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-conversations-edit-thread--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-edit-thread`})}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-thread-actions-menu-delete-click`}),` fires with the thread `,(0,g.jsx)(n.code,{children:`id`}),`. Typically you respond by asking the user to confirm the delete.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-thread-actions-menu-open`}),` fires with the thread `,(0,g.jsx)(n.code,{children:`id`}),`, and `,(0,g.jsx)(n.code,{children:`forge-ai-thread-actions-menu-close`}),` fires with no detail.`]}),`
`]}),`
`,(0,g.jsxs)(n.p,{children:[`To replace the three-dot icon, put your own icon in the `,(0,g.jsx)(n.code,{children:`trigger-icon`}),` slot.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};