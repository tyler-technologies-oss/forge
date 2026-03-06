import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-D4_mmXXb.js";import"./index-DTwfV0k0.js";import{S as l}from"./split-button-JNQbakmu.js";import"./button-DCmcEZ2V.js";import"./focus-indicator-B9pIc8ye.js";import"./state-layer-D2ldILW1.js";import{A as p,b as m}from"./iframe-Nz47_fHD.js";import{o as d}from"./style-map-YtahPS12.js";import{g as c,b as u,G as f}from"./utils-Ba9gsS7G.js";import"./menu-Cg3oAYpS.js";import"./linear-progress-BUFrhekn.js";import"./list-Cu8bwlYk.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./skeleton-D7ds2eUz.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
