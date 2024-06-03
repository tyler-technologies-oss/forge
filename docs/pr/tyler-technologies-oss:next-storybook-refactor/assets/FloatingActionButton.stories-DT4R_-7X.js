import{x as p,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as g,g as b,G as $,D as u}from"./utils-1OsX3DDr.js";import{o as y}from"./style-map-D0ILlpbs.js";import{f as v,g as I}from"./index-W-tNKQGp.js";import{I as A}from"./icon-Cn5siE75.js";import"./floating-action-button-DaCs-QBi.js";import"./focus-indicator-jd-AY9Jk.js";import"./index-Dh0vMUMR.js";import"./state-layer-DzrxdbUp.js";import"./button-DIahYMuH.js";const r="forge-fab";A.define([v,I]);const h={title:"Components/Floating Action Button",render:e=>{const o=g(e),n=o?y(o):f;return p`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${n}
        aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:r,exclude:["type","name","value","form"],controls:{theme:{control:"select",options:$},density:{control:"select",options:u},elevation:{control:"select",options:["raised","lowered"]}}})},args:{theme:"secondary",density:"medium",elevation:"raised",disabled:!1,popoverIcon:!1,dense:!1}},t={},s={render:e=>{const o=g(e),n=o?y(o):f;return p`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${n}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    `}};var a,i,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,c,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const _=["Demo","Extended"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Extended:s,__namedExportsOrder:_,default:h},Symbol.toStringTag,{value:"Module"}));export{t as D,s as E,M as F};
