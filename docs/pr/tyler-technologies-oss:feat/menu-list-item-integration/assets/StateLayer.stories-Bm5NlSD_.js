import{E as d,x as o}from"./iframe-ud64zO_u.js";import{o as n}from"./style-map-BGGxShtt.js";import{g as m,s as l,a as u}from"./utils-BbCJfv7X.js";import"./service-adapter-CffG5Lhq.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-CQxGFI1Q.js";import"./card-Cwn7CUJI.js";const i="forge-state-layer",p={title:"Components/State Layer",render:a=>{const s=u(a),c=s?n(s):d;return o`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px;">Click me</button>
        <forge-state-layer target="target-btn" .disabled=${a.disabled} style=${c}> </forge-state-layer>
      </div>
    `},component:i,parameters:{actions:{disable:!0}},argTypes:{...m({tagName:i,exclude:["targetElement","target"]})},args:{disabled:!1}},e={},t={...l,render:()=>o`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${n({width:"300px",outline:"none",position:"relative"})}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    `},r={...l,render:()=>o` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> \`;
  }
}`,...r.parameters?.docs?.source}}};const g=["Demo","WithCard","CSSOnly"],v=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:r,Demo:e,WithCard:t,__namedExportsOrder:g,default:p},Symbol.toStringTag,{value:"Module"}));export{r as C,e as D,v as S,t as W};
