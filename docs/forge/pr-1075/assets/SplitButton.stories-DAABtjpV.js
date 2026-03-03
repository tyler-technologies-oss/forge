import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import{S as l}from"./split-button-Cu1RAOqE.js";import"./button-C96CRxyU.js";import"./focus-indicator-C-z2W46n.js";import"./state-layer-D_bEeiyc.js";import{A as p,b as m}from"./iframe-Cyv46XVN.js";import{o as d}from"./style-map-BchsrVH4.js";import{g as c,b as u,G as f}from"./utils-DJF5Ajxq.js";import"./menu-BaqIo4hA.js";import"./linear-progress-CYTe6uKP.js";import"./list-D1-mbE3Z.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
