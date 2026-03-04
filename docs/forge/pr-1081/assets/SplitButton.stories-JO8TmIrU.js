import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-BS8_pNWa.js";import"./index-DTwfV0k0.js";import{S as l}from"./split-button-BDryKzT1.js";import"./button-7INxEilv.js";import"./focus-indicator-BY1zFJV4.js";import"./state-layer-Dr4I3-ea.js";import{A as p,b as m}from"./iframe-D6-BN427.js";import{o as d}from"./style-map-Cjel_uWl.js";import{g as c,b as u,G as f}from"./utils-3yMKERXj.js";import"./menu-5G2t1qgD.js";import"./linear-progress-Cnx_HyUf.js";import"./list-DdrH15DZ.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
