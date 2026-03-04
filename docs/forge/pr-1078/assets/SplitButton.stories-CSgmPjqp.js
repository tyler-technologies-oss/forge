import"./service-adapter-CoGDs2_3.js";import{z as n,A as a,I as i}from"./tyler-icons-_ZRRE207.js";import{S as l}from"./split-button-DrqBgRXQ.js";import"./button-gG20MWYF.js";import"./focus-indicator-uWMef9QC.js";import"./state-layer-CDycYdPe.js";import{A as p,b as m}from"./iframe-6jvvl83j.js";import{o as d}from"./style-map-OsH3dYIv.js";import{g as c,b as u,G as f}from"./utils-BQsOXphk.js";import"./menu-C6DBPHOx.js";import"./linear-progress-DAF_c_Qg.js";import"./list-n8XxbbWm.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BEzRyBrd.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
