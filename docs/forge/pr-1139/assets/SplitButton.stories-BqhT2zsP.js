import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-7uX1bPDw.js";import{S as l}from"./split-button-Di2LMism.js";import"./button-veE_5Z_L.js";import"./focus-indicator-DqIVBzGS.js";import"./state-layer-7HWBWBQu.js";import{A as p,b as m}from"./iframe-BYO1bXoJ.js";import{o as d}from"./style-map-qfztkuLE.js";import{g as c,b as u,G as f}from"./utils-CJ7ikJXH.js";import"./menu-SXsmU0nM.js";import"./linear-progress-DEYvX0ZE.js";import"./list-CUmFk2WX.js";import"./popover-CuKDZ7_o.js";import"./overlay-D9banag4.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
