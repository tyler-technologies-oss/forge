import{g,s as m,c as d}from"./utils-UeWn3HvG.js";import"./feature-detection-uS6p5jc8.js";import"./paginator-BJedewko.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,t="forge-paginator",u=S("forge-paginator-change"),f={title:"Components/Paginator",render:l=>{const r=d(t,l);return r.addEventListener("forge-paginator-change",u),r},component:t,argTypes:{...g({tagName:t,exclude:["rangeLabelCallback"],controls:{pageSizeOptions:{control:"object"}}})},args:{pageIndex:0,pageSize:25,pageSizeOptions:[5,15,25,50,100],offset:0,total:100,label:"Rows per page:",firstLast:!1,first:!1,disabled:!1,alternative:!1}},e={},a={...m,args:{pageSize:1,pageSizeOptions:[1],total:10,alternative:!0}};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,c,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    pageSize: 1,
    pageSizeOptions: [1],
    total: 10,
    alternative: true
  }
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const O=["Demo","Alternative"],v=Object.freeze(Object.defineProperty({__proto__:null,Alternative:a,Demo:e,__namedExportsOrder:O,default:f},Symbol.toStringTag,{value:"Module"}));export{a as A,e as D,v as P};
