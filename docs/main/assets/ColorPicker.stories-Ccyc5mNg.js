import"./lit-element-Dk2-kgKT.js";import{k as n}from"./lit-html-DZH-Jm0H.js";import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import{g as l}from"./utils-CkdzhxtS.js";import"./constants-DjE6emXm.js";import"./color-picker-CQ_47TC-.js";const r="forge-color-picker",s=p("forge-color-picker-change"),i={title:"Components/Color Picker",render:o=>n`
      <forge-color-picker
        .value=${o.value}
        .allowOpacity=${o.allowOpacity}
        .opacity=${o.opacity}
        @forge-color-picker-change=${s}></forge-color-picker>
    `,component:r,argTypes:{...l({tagName:r,exclude:["rgba","hsva"],controls:{opacity:{control:"number",min:0,max:1,step:.01}}})},args:{value:"#000000",opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},e={};var t,a,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(c=(a=e.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const m=["Demo"],b=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:m,default:i},Symbol.toStringTag,{value:"Module"}));export{b as C,e as D};
