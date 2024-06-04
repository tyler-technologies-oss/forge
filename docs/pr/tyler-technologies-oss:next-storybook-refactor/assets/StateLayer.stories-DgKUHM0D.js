import{x as m,A as g}from"./lit-html-Bzgct6Ob.js";import{o as u}from"./style-map-D0ILlpbs.js";import{a as f,g as y,s as b}from"./utils-BOMFcC0N.js";import"./state-layer-b0IlkqgO.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import"./card-dhHkoNkd.js";const o="forge-state-layer",h={title:"Components/State Layer",render:r=>{const a=f(r),p=a?u(a):g;return m`
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
    `};var s,i,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var l,c,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const x=["Demo","WithCard"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,WithCard:t,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{e as D,$ as S,t as W};
