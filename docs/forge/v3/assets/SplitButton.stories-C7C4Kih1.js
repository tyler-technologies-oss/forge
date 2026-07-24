import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-tLrSflW5.js";import{S as l}from"./split-button-CP7eC3_r.js";import"./button-DjsNiStc.js";import"./focus-indicator-C6a41ErI.js";import"./state-layer-CezKS0dV.js";import{A as p,b as m}from"./iframe-Mn2yrZLF.js";import{o as d}from"./style-map-tgpB3BEr.js";import{g as c,b as u,G as f}from"./utils-to_g9TuQ.js";import"./menu-BZ2svB4a.js";import"./linear-progress-Do3VWKo6.js";import"./list-ub7XwfpU.js";import"./popover-wpSlFi1q.js";import"./overlay-CizHeCMh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BGwEdhX-.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
