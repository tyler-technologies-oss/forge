import{y as i,z as l,I as m}from"./icon-ANstxuR5.js";import"./feature-detection-CY6TVbRZ.js";import{S as d}from"./split-button-BDosrlIe.js";import"./button-DKtxCkrw.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import{E as c,x as u}from"./iframe-Blk_5JUM.js";import{o as f}from"./style-map-D5xWe_mC.js";import{g,G as b,a as S}from"./utils-gw6R9s7u.js";import"./menu-C8rNUMJM.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./skeleton-DocRecw2.js";m.define([i,l]);const r="forge-split-button",y={title:"Components/Split Button",render:e=>{const p=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=S(e);return u`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?f(o):c}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${p}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:b}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const T=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:T,default:y},Symbol.toStringTag,{value:"Module"}));export{t as D,j as S};
