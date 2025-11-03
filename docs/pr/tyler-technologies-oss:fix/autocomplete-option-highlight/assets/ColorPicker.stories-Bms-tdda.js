import{x as t}from"./iframe-BxnBKGzk.js";import{g as c}from"./utils-bIwC1Fgv.js";import"./service-adapter-CffG5Lhq.js";import"./color-picker-D8JSbBTV.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,r="forge-color-picker",n=a("forge-color-picker-change"),l={title:"Components/Color Picker",render:o=>t`
      <forge-color-picker
        .value=${o.value}
        .allowOpacity=${o.allowOpacity}
        .opacity=${o.opacity}
        @forge-color-picker-change=${n}></forge-color-picker>
    `,component:r,argTypes:{...c({tagName:r,exclude:["rgba","hsva"],controls:{opacity:{control:"number",min:0,max:1,step:.01}}})},args:{value:"#000000",opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],u=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:l},Symbol.toStringTag,{value:"Module"}));export{u as C,e as D};
