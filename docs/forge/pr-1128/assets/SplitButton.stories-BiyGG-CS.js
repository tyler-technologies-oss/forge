import{z as n,A as a,I as i}from"./tyler-icons-CzoCbVaa.js";import"./service-adapter-CoGDs2_3.js";import{S as l}from"./split-button-D2rq4I5W.js";import"./button-YbSFJWqY.js";import"./focus-indicator-C5TEsO7E.js";import"./state-layer-DFBFTfpT.js";import{A as p,b as m}from"./iframe-1amZ02A4.js";import{o as d}from"./style-map-DhE_eh_-.js";import{g as c,b as u,G as f}from"./utils-s6uih_-r.js";import"./menu-Ba834p8F.js";import"./linear-progress-DSeJSqzy.js";import"./list-7b1y5hwO.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./index-DTwfV0k0.js";import"./skeleton-CfBVzZbg.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
