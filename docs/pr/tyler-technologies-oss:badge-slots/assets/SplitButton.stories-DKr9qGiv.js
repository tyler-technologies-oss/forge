import{z as i,A as l,I as m}from"./icon-Bqgt-0wI.js";import"./feature-detection-CY6TVbRZ.js";import{S as d}from"./split-button-1ZOFPfW2.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import{E as c,x as u}from"./lit-html-Ox1a2bD1.js";import{o as f}from"./style-map-CeIg-cuG.js";import{g,G as b,b as S}from"./utils-C9ubTmun.js";import"./menu-DoGfQb_z.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";m.define([i,l]);const r="forge-split-button",T={title:"Components/Split Button",render:e=>{const p=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=S(e);return u`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:b}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const y=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:y,default:T},Symbol.toStringTag,{value:"Module"}));export{t as D,j as S};
