import{I as p}from"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import{S as d}from"./split-button-D-TDV5SV.js";import"./button-C5f1g9CL.js";import{u as i,v as l}from"./index-ByifSpfC.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";import{k as c,D as u}from"./lit-html-DZH-Jm0H.js";import{s as f}from"./style-map-DxfbqtuX.js";import{b as g,g as b,G as S}from"./utils-Dj42C_k3.js";import"./menu-n2vU0IDR.js";import"./linear-progress-CcMix19v.js";import"./list-ePbvhvCk.js";import"./popover-tgjxHp7t.js";import"./overlay-DWm8nYOy.js";import"./skeleton-Cs99PVGD.js";p.define([i,l]);const r="forge-split-button",T={title:"Components/Split Button",render:e=>{const m=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=g(e);return c`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:S}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,s,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const y=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:y,default:T},Symbol.toStringTag,{value:"Module"}));export{t as D,j as S};
