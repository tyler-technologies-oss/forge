import{I as p}from"./icon-CiIDkczu.js";import"./constants-BMnwgo1j.js";import{S as d}from"./split-button-D1oJhtKP.js";import"./button-CvtGTUrx.js";import{q as i,r as l}from"./index-CWt9cj6R.js";import"./focus-indicator-WHVXAnYX.js";import"./index-Dh0vMUMR.js";import"./state-layer-CoXZFfb6.js";import{x as c,A as u}from"./lit-html-Bzgct6Ob.js";import{o as f}from"./style-map-D0ILlpbs.js";import{a as g,g as b,G as S}from"./utils-D8HxbzAZ.js";import"./menu-BGjpcIqp.js";import"./linear-progress-DNEsMXxT.js";import"./list-CoNOG_pF.js";import"./popover-BDS33NIt.js";import"./overlay-BEOKbUF9.js";import"./skeleton-Cd3epQA8.js";p.define([i,l]);const r="forge-split-button",T={title:"Components/Split Button",render:e=>{const m=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=g(e);return c`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?f(o):u}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${m}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:S}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const y=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:y,default:T},Symbol.toStringTag,{value:"Module"}));export{t as D,k as S};
