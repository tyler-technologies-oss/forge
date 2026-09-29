import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-D0ZxlEvQ.js";import{S as l}from"./split-button-C_MwjRCH.js";import"./button-DCvaMBF6.js";import{A as n,B as a}from"./tyler-icons-BSgf1RSL.js";import{A as m,b as p}from"./iframe-CSIdYrZJ.js";import{o as d}from"./style-map-BfSygJjt.js";import{g as c,b as u,G as f}from"./utils-CL5ue9IV.js";import"./menu-BYkMwpRl.js";import"./linear-progress-kQO48laS.js";import"./list-DlI3fnDe.js";import"./popover-o0o6y1Gd.js";import"./overlay-C1ZJYdef.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-EUyK87zq.js";import"./list-item-Dby-tdmr.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return p`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?d(o):m}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${s}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:f}}})},args:{variant:"raised",theme:l.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{t as D,M as S};
