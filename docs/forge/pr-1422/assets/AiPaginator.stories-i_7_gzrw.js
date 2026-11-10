import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./tools-Dq-kbb3K.js";var a=t({Demo:()=>s,Disabled:()=>c,__namedExportsOrder:()=>l,default:()=>o}),o,s,c,l;function u(){return(u=e((()=>{r(),i(),o={title:`AI/Components/Primitives/Paginator`,component:`forge-ai-paginator`,argTypes:{currentPage:{control:{type:`number`,min:1},description:`The current page (1-based)`},totalPages:{control:{type:`number`,min:1},description:`The total number of pages`},disabled:{control:`boolean`,description:`Disables both navigation buttons`}},args:{currentPage:1,totalPages:5,disabled:!1},render:e=>n`
      <forge-ai-paginator
        .currentPage=${e.currentPage}
        .totalPages=${e.totalPages}
        ?disabled=${e.disabled}
        @forge-ai-paginator-page-change=${e=>{e.target.currentPage=e.detail.currentPage}}></forge-ai-paginator>
    `},s={},c={args:{disabled:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...c.parameters?.docs?.source}}},l=[`Demo`,`Disabled`]})))()}export{u as i,s as n,c as r,a as t};