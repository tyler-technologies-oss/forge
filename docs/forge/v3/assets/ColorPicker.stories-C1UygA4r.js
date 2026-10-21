import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{m as i,s as a}from"./utils-C3ow8Ikc.js";import{t as o}from"./color-picker-CkmMcXYc.js";var s=t({Demo:()=>f,__namedExportsOrder:()=>p,default:()=>d}),c,l,u,d,f,p;function m(){return(m=e((()=>{r(),i(),o(),{action:c}=__STORYBOOK_MODULE_ACTIONS__,l=`forge-color-picker`,u=c(`forge-color-picker-change`),d={title:`Components/Color Picker`,render:e=>n`
    <forge-color-picker
      .value=${e.value}
      .allowOpacity=${e.allowOpacity}
      .opacity=${e.opacity}
      @forge-color-picker-change=${u}></forge-color-picker>
  `,component:l,argTypes:{...a({tagName:l,exclude:[`rgba`,`hsva`],controls:{opacity:{control:`number`,min:0,max:1,step:.01}}})},args:{value:`#000000`,opacity:1,allowOpacity:!1,debounceChangeEvent:!1}},f={},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p=[`Demo`]})))()}export{f as n,m as r,s as t};