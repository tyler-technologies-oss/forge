import{z as n,A as a,I as i}from"./icon-kuXwuZAY.js";import"./service-adapter-CffG5Lhq.js";import{S as l}from"./split-button-Y92dutRu.js";import"./button-BqgGldaS.js";import"./focus-indicator-DdEFia3S.js";import"./state-layer-gAgMwMHF.js";import{E as p,x as m}from"./iframe-CenBdRqR.js";import{o as d}from"./style-map-Cs-m90eM.js";import{g as c,G as u,a as f}from"./utils-bIwC1Fgv.js";import"./menu-CKr23woL.js";import"./linear-progress-r0Hzg69v.js";import"./list-D2P7Fjk1.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./index-5CPwzmQS.js";import"./skeleton-BSiuL_ME.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=f(e);return m`
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
