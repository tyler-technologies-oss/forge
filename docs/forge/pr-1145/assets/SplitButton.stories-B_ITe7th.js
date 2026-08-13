import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-Dp2vVtqR.js";import{S as l}from"./split-button-BCT76cdE.js";import"./button-lth0lefQ.js";import"./focus-indicator-D6uj4Uta.js";import"./state-layer-DRsbBcDh.js";import{A as p,b as m}from"./iframe-HMJ7n3dG.js";import{o as d}from"./style-map-D4rxOyo_.js";import{g as c,b as u,G as f}from"./utils-Cu3TicFl.js";import"./menu-ClX53aIN.js";import"./linear-progress-BvuLf7up.js";import"./list-DLgiAqMd.js";import"./popover-Cl_Kh6c4.js";import"./overlay-ZODNJdUy.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BodZg-5h.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:f}}})},args:{variant:"raised",theme:l.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{t as D,M as S};
