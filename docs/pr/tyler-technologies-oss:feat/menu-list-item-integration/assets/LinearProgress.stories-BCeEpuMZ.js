import{x as t}from"./iframe-ud64zO_u.js";import{g as i,s as n,c as p}from"./utils-BbCJfv7X.js";import"./service-adapter-CffG5Lhq.js";import"./linear-progress-r0Hzg69v.js";const a="forge-linear-progress",g={title:"Components/Linear Progress",render:m=>{const o=p(a,m);return o.setAttribute("aria-label","Linear progress demo"),o},component:a,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:a})},args:{}},e={},r={...n,render:()=>t` <forge-linear-progress determinate progress="0.5" aria-label="Linear progress demo"></forge-linear-progress> `},s={...n,render:()=>t` <forge-linear-progress determinate progress="0.33" buffer="0.66" aria-label="Linear progress buffer demo"></forge-linear-progress> `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <forge-linear-progress determinate progress="0.5" aria-label="Linear progress demo"></forge-linear-progress> \`;
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <forge-linear-progress determinate progress="0.33" buffer="0.66" aria-label="Linear progress buffer demo"></forge-linear-progress> \`;
  }
}`,...s.parameters?.docs?.source}}};const l=["Demo","Determinate","Buffer"],b=Object.freeze(Object.defineProperty({__proto__:null,Buffer:s,Demo:e,Determinate:r,__namedExportsOrder:l,default:g},Symbol.toStringTag,{value:"Module"}));export{s as B,e as D,b as L,r as a};
