import{x as s,T as u}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as v,g as $,s as A,G as I,D as _}from"./utils-BrN94tQ9.js";import{o as h}from"./style-map-D0ILlpbs.js";import{f as S,g as O,h as E}from"./index-CDQrnaq1.js";import{I as T}from"./icon-V4IE3JYq.js";import"./floating-action-button-CKbgx8sF.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import"./state-layer-b0IlkqgO.js";import"./button-D5XxdyZ6.js";const i="forge-fab";T.define([S,O,E]);const F={title:"Components/Floating Action Button",render:e=>{const o=v(e),t=o?h(o):u;return s`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${t}
        aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `},component:i,parameters:{actions:{disable:!0}},argTypes:{...$({tagName:i,exclude:["type","name","value","form"],controls:{theme:{control:"select",options:I},density:{control:"select",options:_},elevation:{control:"select",options:["raised","lowered"]}}})},args:{theme:"secondary",density:"medium",elevation:"raised",disabled:!1,popoverIcon:!1,dense:!1}},r={},n={render:e=>{const o=v(e),t=o?h(o):u;return s`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${t}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    `}},a={...A,render:e=>s`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    `};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,p,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <forge-fab
        .theme=\${args.theme}
        .density=\${args.density}
        .elevation=\${args.elevation}
        .popoverIcon=\${args.popoverIcon}
        .disabled=\${args.disabled}
        .dense=\${args.dense}
        style=\${style}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    \`;
  }
}`,...(f=(p=n.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var g,b,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    \`;
  }
}`,...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};const V=["Demo","Extended","WithAnchor"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,Extended:n,WithAnchor:a,__namedExportsOrder:V,default:F},Symbol.toStringTag,{value:"Module"}));export{r as D,n as E,L as F,a as W};
