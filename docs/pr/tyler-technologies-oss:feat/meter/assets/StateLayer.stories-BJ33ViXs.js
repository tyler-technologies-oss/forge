import{x as o,E as h}from"./lit-html-paDGiEfB.js";import{o as f}from"./style-map-C9nPWcxA.js";import{b as x,g as C,s as b}from"./utils-CfUP_kYQ.js";import"./feature-detection-ONR9WHvu.js";import"./state-layer-B7GOb8iB.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import"./card-WC0g-TsN.js";const i="forge-state-layer",v={title:"Components/State Layer",render:a=>{const s=x(a),S=s?f(s):h;return o`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px;">Click me</button>
        <forge-state-layer target="target-btn" .disabled=${a.disabled} style=${S}> </forge-state-layer>
      </div>
    `},component:i,parameters:{actions:{disable:!0}},argTypes:{...C({tagName:i,exclude:["targetElement","target"]})},args:{disabled:!1}},e={},t={...b,render:()=>o`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${f({width:"300px",outline:"none",position:"relative"})}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    `},r={...b,render:()=>o` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> `};var n,l,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,m,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const style = {
      width: '300px',
      outline: 'none',
      position: 'relative'
    };
    return html\`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=\${styleMap(style)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    \`;
  }
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,y;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> \`;
  }
}`,...(y=(g=r.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const _=["Demo","WithCard","CSSOnly"],A=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:r,Demo:e,WithCard:t,__namedExportsOrder:_,default:v},Symbol.toStringTag,{value:"Module"}));export{r as C,e as D,A as S,t as W};
