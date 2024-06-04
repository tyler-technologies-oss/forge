import{x as n}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as p}from"./utils-BOMFcC0N.js";import"./color-picker-CfL89rmd.js";const r="forge-color-picker",s=l("forge-color-picker-change"),i={title:"Components/Color Picker",render:o=>n`
      <forge-color-picker
        .value=${o.value}
        .allowOpacity=${o.allowOpacity}
        .opacity=${o.opacity}
        @forge-color-picker-change=${s}></forge-color-picker>
    `,component:r,argTypes:{...p({tagName:r,exclude:["rgba","hsva"],controls:{opacity:{control:"number",min:0,max:1,step:.01}}})},args:{value:"#000000",opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},e={};var t,a,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(c=(a=e.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const m=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:m,default:i},Symbol.toStringTag,{value:"Module"}));export{k as C,e as D};
