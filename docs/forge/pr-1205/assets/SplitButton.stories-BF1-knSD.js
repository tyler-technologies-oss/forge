import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-CRlGDmUG.js";import{S as l}from"./split-button-pBWjDD2O.js";import"./button-O8hUbfqZ.js";import"./focus-indicator-BUamxVwB.js";import"./state-layer-B1dog9AJ.js";import{A as p,b as m}from"./iframe-C8ybUYbn.js";import{o as d}from"./style-map-B2RanMjD.js";import{g as c,b as u,G as f}from"./utils-E9-_u7-I.js";import"./menu-DShisam-.js";import"./linear-progress-BuTzYSPq.js";import"./list-DG8ewqF7.js";import"./popover-D2oimSag.js";import"./overlay-BLe9QgxT.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DAg_CUT8.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
