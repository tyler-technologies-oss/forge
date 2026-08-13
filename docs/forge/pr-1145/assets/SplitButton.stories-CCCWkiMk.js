import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-BqP_5Usb.js";import{S as l}from"./split-button-Ck3y1w2g.js";import"./button-zNUbTC2q.js";import"./focus-indicator-C0RU8xRV.js";import"./state-layer-Wu0zWm6m.js";import{A as p,b as m}from"./iframe-1a1WEcnC.js";import{o as d}from"./style-map-CddThOmV.js";import{g as c,b as u,G as f}from"./utils-DCILK08P.js";import"./menu-ydD6hjiI.js";import"./linear-progress-CsGp1g6o.js";import"./list-Ba7Y7d-u.js";import"./popover-COnrFhSW.js";import"./overlay-CS0R_zpK.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DWmvzIbz.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
