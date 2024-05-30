import{x as m,A as g}from"./lit-html-Bzgct6Ob.js";import{o as u}from"./style-map-CkvVWuL1.js";import{d as f,g as y,s as b}from"./constants-utdBEkH-.js";import"./state-layer-B9gKJ6mp.js";import"./focus-indicator-ClPLtnVB.js";import"./index-Dh0vMUMR.js";import"./card-m55Y7yG9.js";const o="forge-state-layer",h={title:"Components/State Layer",render:r=>{const a=f(r),p=a?u(a):g;return m`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px;">Click me</button>
        <forge-state-layer
          target="target-btn"
          .disabled=${r.disabled}
          style=${p}>
        </forge-state-layer>
      </div>
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:o,exclude:["targetElement","target"]})},args:{disabled:!1}},e={},t={...b,render:()=>m`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${u({width:"300px",outline:"none",position:"relative"})}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    `};var s,i,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var l,d,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const x=["Demo","WithCard"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,WithCard:t,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{e as D,$ as S,t as W};
