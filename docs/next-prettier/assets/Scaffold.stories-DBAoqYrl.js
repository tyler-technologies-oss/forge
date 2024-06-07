import{x as l,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as c,g as m}from"./utils-B8pUMLAO.js";import"./constants-BMnwgo1j.js";import"./scaffold-BBmmvCn_.js";import{o as n}from"./style-map-D0ILlpbs.js";import{s as p}from"./decorators-CJfHUot4.js";const g=".scaffold-example{--forge-scaffold-height: 500px;--forge-scaffold-width: 100%}.scaffold-example div[slot]{border:2px dashed var(--forge-theme-outline-low);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:var(--forge-spacing-xsmall);margin:var(--forge-spacing-xsmall);box-sizing:border-box}",r="forge-scaffold",v={title:"Components/Scaffold",render:e=>{const t=c(e),i=t?n(t):f;return l`
      <forge-scaffold class="scaffold-example" style=${i} .viewport=${e.viewport}>
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
    `},component:r,parameters:{actions:{disable:!0}},decorators:[p(g)],argTypes:{...m({tagName:r})},args:{viewport:!1}},o={};var s,a,d;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(d=(a=o.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const y=["Demo"],T=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{o as D,T as S};
