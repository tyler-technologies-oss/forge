import{x as l,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{d as c,g as n}from"./constants-R2FX_sk2.js";import"./scaffold-DtaWDUie.js";import{o as b}from"./style-map-CkvVWuL1.js";import{s as m}from"./decorators-B79PnA5z.js";const p=".scaffold-example{--forge-scaffold-height: 500px;--forge-scaffold-width: 100%}.scaffold-example div[slot]{border:1px dashed #e0e0e0;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;padding:8px;margin:8px;-webkit-box-sizing:border-box;box-sizing:border-box}",r="forge-scaffold",g={title:"Components/Scaffold",render:o=>{const t=c(o),a=t?b(t):f;return l`
    <forge-scaffold class="scaffold-example" style=${a} .viewport=${o.viewport}>
      <div slot="left">left</div>
      <div slot="header">header</div>
      <div slot="body-header">body-header</div>
      <div slot="body-left">body-left</div>
      <div slot="body">body</div>
      <div slot="body-right">body-right</div>
      <div slot="body-footer">body-footer</div>
      <div slot="footer">footer</div>
      <div slot="right">right</div>
    </forge-scaffold>
    `},component:r,parameters:{actions:{disable:!0}},decorators:[m(p)],argTypes:{...n({tagName:r})},args:{}},e={};var s,d,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(i=(d=e.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const v=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:v,default:g},Symbol.toStringTag,{value:"Module"}));export{e as D,k as S};
