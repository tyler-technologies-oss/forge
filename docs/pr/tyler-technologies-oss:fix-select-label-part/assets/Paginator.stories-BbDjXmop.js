import{a as g}from"./index-B-lxVbXh.js";import{g as m,s as d,c as f}from"./utils-Do5MGSMS.js";import"./feature-detection-C61kIZu7.js";import"./paginator-C8_E8mrh.js";const t="forge-paginator",u=g("forge-paginator-change"),S={title:"Components/Paginator",render:l=>{const r=f(t,l);return r.addEventListener("forge-paginator-change",u),r},component:t,argTypes:{...m({tagName:t,exclude:["rangeLabelCallback"],controls:{pageSizeOptions:{control:"object"}}})},args:{pageIndex:0,pageSize:25,pageSizeOptions:[5,15,25,50,100],offset:0,total:100,label:"Rows per page:",firstLast:!1,first:!1,disabled:!1,alternative:!1}},e={},a={...d,args:{pageSize:1,pageSizeOptions:[1],total:10,alternative:!0}};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,p,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    pageSize: 1,
    pageSizeOptions: [1],
    total: 10,
    alternative: true
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const b=["Demo","Alternative"],P=Object.freeze(Object.defineProperty({__proto__:null,Alternative:a,Demo:e,__namedExportsOrder:b,default:S},Symbol.toStringTag,{value:"Module"}));export{a as A,e as D,P};
