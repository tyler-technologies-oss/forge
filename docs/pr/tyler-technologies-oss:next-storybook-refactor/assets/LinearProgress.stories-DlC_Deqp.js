import{x as l}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as S,g as y,s as u}from"./constants-CYeMfgsl.js";import"./linear-progress-Cj7EgNE2.js";const o="forge-linear-progress",b={title:"Components/Linear Progress",render:f=>S(o,f),component:o,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:o})},args:{}},r={},e={...u,render:()=>l`
    <forge-linear-progress determinate progress="0.5"></forge-linear-progress>
    `},s={...u,render:()=>l`
    <forge-linear-progress determinate progress="0.33" buffer="0.66"></forge-linear-progress>
    `};var a,t,n;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(t=r.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var m,p,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <forge-linear-progress determinate progress="0.5"></forge-linear-progress>
    \`;
  }
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <forge-linear-progress determinate progress="0.33" buffer="0.66"></forge-linear-progress>
    \`;
  }
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const P=["Demo","Determinate","Buffer"],E=Object.freeze(Object.defineProperty({__proto__:null,Buffer:s,Demo:r,Determinate:e,__namedExportsOrder:P,default:b},Symbol.toStringTag,{value:"Module"}));export{s as B,r as D,E as L,e as a};
