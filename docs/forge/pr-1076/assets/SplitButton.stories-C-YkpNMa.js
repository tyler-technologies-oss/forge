import"./service-adapter-CoGDs2_3.js";import{z as n,A as a,I as i}from"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import{S as l}from"./split-button-BcVWqDtf.js";import"./button-Dgz3L8XP.js";import"./focus-indicator-D1CeImek.js";import"./state-layer-CwwoRddA.js";import{A as p,b as m}from"./iframe-BJoIjGP7.js";import{o as d}from"./style-map-Bdj4ijuo.js";import{g as c,b as u,G as f}from"./utils-DlRR_6up.js";import"./menu-BmbMI8hP.js";import"./linear-progress-BPDXw63a.js";import"./list-BmIuUSdG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
