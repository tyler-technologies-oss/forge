import{x as n}from"./iframe-C5EPRJGw.js";import{g as l}from"./utils-C_Nqz1Py.js";import"./feature-detection-uS6p5jc8.js";import"./color-picker-DId1aiuP.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,r="forge-color-picker",s=p("forge-color-picker-change"),i={title:"Components/Color Picker",render:o=>n`
      <forge-color-picker
        .value=${o.value}
        .allowOpacity=${o.allowOpacity}
        .opacity=${o.opacity}
        @forge-color-picker-change=${s}></forge-color-picker>
    `,component:r,argTypes:{...l({tagName:r,exclude:["rgba","hsva"],controls:{opacity:{control:"number",min:0,max:1,step:.01}}})},args:{value:"#000000",opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},e={};var t,c,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(a=(c=e.parameters)==null?void 0:c.docs)==null?void 0:a.source}}};const m=["Demo"],d=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:m,default:i},Symbol.toStringTag,{value:"Module"}));export{d as C,e as D};
