import"./lit-element-BuSzPo2N.js";import{x as u}from"./lit-html-Ox1a2bD1.js";import{g as S,s as f,c as y}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import"./linear-progress-CJb_8skk.js";const a="forge-linear-progress",L={title:"Components/Linear Progress",render:b=>{const o=y(a,b);return o.setAttribute("aria-label","Linear progress demo"),o},component:a,parameters:{actions:{disable:!0}},argTypes:{...S({tagName:a})},args:{}},r={},e={...f,render:()=>u` <forge-linear-progress determinate progress="0.5" aria-label="Linear progress demo"></forge-linear-progress> `},s={...f,render:()=>u` <forge-linear-progress determinate progress="0.33" buffer="0.66" aria-label="Linear progress buffer demo"></forge-linear-progress> `};var t,n,m;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(m=(n=r.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var i,p,g;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <forge-linear-progress determinate progress="0.5" aria-label="Linear progress demo"></forge-linear-progress> \`;
  }
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var l,d,c;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <forge-linear-progress determinate progress="0.33" buffer="0.66" aria-label="Linear progress buffer demo"></forge-linear-progress> \`;
  }
}`,...(c=(d=s.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const P=["Demo","Determinate","Buffer"],O=Object.freeze(Object.defineProperty({__proto__:null,Buffer:s,Demo:r,Determinate:e,__namedExportsOrder:P,default:L},Symbol.toStringTag,{value:"Module"}));export{s as B,r as D,O as L,e as a};
