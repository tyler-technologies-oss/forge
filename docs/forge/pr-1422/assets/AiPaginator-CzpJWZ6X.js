import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiPaginator.stories-i_7_gzrw.js";function m(e){let n={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A compact previous and next paginator with a "page of total" label. Use it to page through results, for example in a table tool result. It is exported from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/tools`}),`.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`The paginator does not change pages itself. Handle `,(0,g.jsx)(n.code,{children:`forge-ai-paginator-page-change`}),` and update `,(0,g.jsx)(n.code,{children:`current-page`}),`; the event detail has `,(0,g.jsx)(n.code,{children:`currentPage`}),` (the new page) and `,(0,g.jsx)(n.code,{children:`previousPage`}),`.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-js`,children:`paginator.addEventListener('forge-ai-paginator-page-change', e => {
  paginator.currentPage = e.detail.currentPage;
});
`})}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-html`,children:`<forge-ai-paginator current-page="1" total-pages="5"></forge-ai-paginator>
`})}),`
`,(0,g.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};