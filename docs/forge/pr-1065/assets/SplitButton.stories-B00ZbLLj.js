import{z as n,A as a,I as i}from"./tyler-icons-CBdZU-Tr.js";import"./service-adapter-CffG5Lhq.js";import{S as l}from"./split-button-dwL5X76s.js";import"./button-DETyVr69.js";import"./focus-indicator-DA-M5OAc.js";import"./state-layer-DGD4bZzf.js";import{A as p,b as m}from"./iframe-BZH4nlqj.js";import{o as d}from"./style-map-CtAn6EL2.js";import{g as c,b as u,G as f}from"./utils-Cntew3lg.js";import"./menu-CnlQLM2P.js";import"./linear-progress-CpNoMDP5.js";import"./list-Dr2jKmMX.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./index-DTwfV0k0.js";import"./skeleton-C3LWj3F7.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?d(o):p}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${s}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:f}}})},args:{variant:"raised",theme:l.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{t as D,L as S};
