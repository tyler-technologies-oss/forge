import{I as p}from"./icon-B5R9pr_c.js";import"./feature-detection-DRCh51Sa.js";import{S as d}from"./split-button-Z_EMJCBn.js";import"./button-C8Y3s8GC.js";import{u as i,v as l}from"./index-CbZAylpk.js";import"./focus-indicator-N8y3p24x.js";import"./index-BgGCUUFB.js";import"./state-layer-BM79vS2j.js";import{x as c,E as u}from"./lit-html-paDGiEfB.js";import{o as f}from"./style-map-C9nPWcxA.js";import{b as g,g as b,G as S}from"./utils-DOJ_BQTN.js";import"./menu-CLrTj8_g.js";import"./linear-progress-CqfIuBkR.js";import"./list-B1GChOkL.js";import"./popover-B7EDw8Rs.js";import"./overlay-D-D6lM0z.js";import"./skeleton-D2S3-1Sc.js";p.define([i,l]);const r="forge-split-button",T={title:"Components/Split Button",render:e=>{const m=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=g(e);return c`
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
