import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{_ as n,m as r,o as i,s as a}from"./utils-C3ow8Ikc.js";import{t as o}from"./paginator-CZMB2NhC.js";var s=t({Alternative:()=>p,Demo:()=>f,__namedExportsOrder:()=>m,default:()=>d}),c,l,u,d,f,p,m;function h(){return(h=e((()=>{r(),o(),{action:c}=__STORYBOOK_MODULE_ACTIONS__,l=`forge-paginator`,u=c(`forge-paginator-change`),d={title:`Components/Paginator`,render:e=>{let t=i(l,e);return t.addEventListener(`forge-paginator-change`,u),t},component:l,argTypes:{...a({tagName:l,exclude:[`rangeLabelCallback`],controls:{pageSizeOptions:{control:`object`}}})},args:{pageIndex:0,pageSize:25,pageSizeOptions:[5,15,25,50,100],offset:0,total:100,label:`Rows per page:`,firstLast:!1,first:!1,disabled:!1,alternative:!1}},f={},p={...n,args:{pageSize:1,pageSizeOptions:[1],total:10,alternative:!0}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    pageSize: 1,
    pageSizeOptions: [1],
    total: 10,
    alternative: true
  }
}`,...p.parameters?.docs?.source}}},m=[`Demo`,`Alternative`]})))()}export{h as i,f as n,s as r,p as t};