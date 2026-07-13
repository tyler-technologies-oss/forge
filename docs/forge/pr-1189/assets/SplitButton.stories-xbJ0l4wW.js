import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-DujtuLyJ.js";import{S as l}from"./split-button-BBVeEG5f.js";import"./button-D3Be4wOV.js";import"./focus-indicator-CI-XZz-0.js";import"./state-layer-RJ83GVyt.js";import{A as p,b as m}from"./iframe-C0tv50se.js";import{o as d}from"./style-map-Cm5o70SV.js";import{g as c,b as u,G as f}from"./utils-QdjzOY7l.js";import"./menu-D-LhENYy.js";import"./linear-progress-DLb8lZjg.js";import"./list-CAae_Zqa.js";import"./popover-Cbq2Ub2i.js";import"./overlay-Bo-MsksO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BNhyCQ6_.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
