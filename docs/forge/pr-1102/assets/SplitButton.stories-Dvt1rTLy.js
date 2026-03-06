import"./service-adapter-CoGDs2_3.js";import{z as n,A as a,I as i}from"./tyler-icons-B1nAV5VC.js";import"./index-DTwfV0k0.js";import{S as l}from"./split-button-O04zwv9R.js";import"./button-C32nRzKT.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import{A as p,b as m}from"./iframe-HlIX8nsI.js";import{o as d}from"./style-map-CJVXeR4e.js";import{g as c,b as u,G as f}from"./utils-DhPatzMP.js";import"./menu-MzeWWlwh.js";import"./linear-progress-Buvtsnzw.js";import"./list-2JCez8nQ.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
