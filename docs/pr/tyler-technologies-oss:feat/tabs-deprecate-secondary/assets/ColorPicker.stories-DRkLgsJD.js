import"./lit-element-CgJqSpuc.js";import{x as n}from"./lit-html-paDGiEfB.js";import{a as p}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{g as l}from"./utils-CUtp3IhO.js";import"./constants-CFf81ck9.js";import"./color-picker-C3b1-P0w.js";const r="forge-color-picker",i=p("forge-color-picker-change"),s={title:"Components/Color Picker",render:o=>n`
      <forge-color-picker
        .value=${o.value}
        .allowOpacity=${o.allowOpacity}
        .opacity=${o.opacity}
        @forge-color-picker-change=${i}></forge-color-picker>
    `,component:r,argTypes:{...l({tagName:r,exclude:["rgba","hsva"],controls:{opacity:{control:"number",min:0,max:1,step:.01}}})},args:{value:"#000000",opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},e={};var t,a,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(c=(a=e.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const m=["Demo"],b=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:m,default:s},Symbol.toStringTag,{value:"Module"}));export{b as C,e as D};
