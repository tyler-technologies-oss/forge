import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{n as u,r as d,t as f}from"./AiSidebar.stories-CfS2Zcsr.js";function p(e){let n={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`A resizable panel that docks to the right edge of your layout and holds chat content, typically a `,(0,h.jsx)(n.code,{children:`forge-ai-chat-interface`}),`. It is a layout shell only: it provides open/close, sizing, and width memory, and you supply the content.`]}),`
`,(0,h.jsxs)(n.p,{children:[`Use it with a layout that has a right-hand region, such as the `,(0,h.jsx)(n.code,{children:`body-right`}),` slot of `,(0,h.jsx)(n.code,{children:`forge-scaffold`}),`.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`opening-and-closing`,children:`Opening and closing`}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`open`}),`, or call `,(0,h.jsx)(n.code,{children:`show()`}),`, `,(0,h.jsx)(n.code,{children:`close()`}),`, or `,(0,h.jsx)(n.code,{children:`toggle()`}),`. The sidebar fires `,(0,h.jsx)(n.code,{children:`forge-ai-sidebar-open`}),` and `,(0,h.jsx)(n.code,{children:`forge-ai-sidebar-close`}),` when the state changes.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`button.addEventListener('click', () => sidebar.toggle());
`})}),`
`,(0,h.jsx)(n.h2,{id:`resizing`,children:`Resizing`}),`
`,(0,h.jsxs)(n.p,{children:[`By default the user can drag the handle on the sidebar's edge, or focus it and use the left/right arrow keys. The width stays between 360px and 800px and never exceeds the viewport. `,(0,h.jsx)(n.code,{children:`forge-ai-sidebar-resize`}),` fires when a resize is committed, with the new width in pixels in `,(0,h.jsx)(n.code,{children:`event.detail.width`}),`.`]}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`width`}),` to control the width from code, or `,(0,h.jsx)(n.code,{children:`resizable="off"`}),` to disable resizing and return to the default width.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-ai-sidebar width="520"></forge-ai-sidebar>
`})}),`
`,(0,h.jsx)(n.h3,{id:`width-persistence`,children:`Width persistence`}),`
`,(0,h.jsxs)(n.p,{children:[`The sidebar remembers the width the user chose in `,(0,h.jsx)(n.code,{children:`sessionStorage`}),` and `,(0,h.jsx)(n.code,{children:`localStorage`}),` under the key `,(0,h.jsx)(n.code,{children:`forge-ai-sidebar-width`}),`. A new load uses the tab's stored width first, then the most recent width from any tab, then the default. Setting `,(0,h.jsx)(n.code,{children:`width`}),` explicitly overrides the stored value, and `,(0,h.jsx)(n.code,{children:`resizable="off"`}),` clears it.`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};