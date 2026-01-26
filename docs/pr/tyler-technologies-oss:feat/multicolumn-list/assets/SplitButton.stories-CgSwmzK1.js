import{z as n,A as a,I as i}from"./icon-Uwxy940_.js";import"./service-adapter-CffG5Lhq.js";import{S as l}from"./split-button-CC2YiORl.js";import"./button--VLz5M7S.js";import"./focus-indicator-BLwe5ycG.js";import"./state-layer-BEEsPoZf.js";import{E as p,x as m}from"./iframe-D16noSNJ.js";import{o as d}from"./style-map-C_uT9xPL.js";import{g as c,G as u,a as f}from"./utils-DsSoWqyO.js";import"./menu-BM0-jbBn.js";import"./linear-progress-r0Hzg69v.js";import"./list-BLMT7u2q.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./index-DTwfV0k0.js";import"./skeleton-BSiuL_ME.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=f(e);return m`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:u}}})},args:{variant:"raised",theme:l.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{t as D,L as S};
