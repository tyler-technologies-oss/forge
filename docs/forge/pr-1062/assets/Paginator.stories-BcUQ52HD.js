import{s,g as n,c as i}from"./utils-B4-1L4nS.js";import"./service-adapter-CffG5Lhq.js";import"./paginator-BafPScIh.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,t="forge-paginator",p=c("forge-paginator-change"),l={title:"Components/Paginator",render:o=>{const r=i(t,o);return r.addEventListener("forge-paginator-change",p),r},component:t,argTypes:{...n({tagName:t,exclude:["rangeLabelCallback"],controls:{pageSizeOptions:{control:"object"}}})},args:{pageIndex:0,pageSize:25,pageSizeOptions:[5,15,25,50,100],offset:0,total:100,label:"Rows per page:",firstLast:!1,first:!1,disabled:!1,alternative:!1}},e={},a={...s,args:{pageSize:1,pageSizeOptions:[1],total:10,alternative:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    pageSize: 1,
    pageSizeOptions: [1],
    total: 10,
    alternative: true
  }
}`,...a.parameters?.docs?.source}}};const g=["Demo","Alternative"],u=Object.freeze(Object.defineProperty({__proto__:null,Alternative:a,Demo:e,__namedExportsOrder:g,default:l},Symbol.toStringTag,{value:"Module"}));export{a as A,e as D,u as P};
