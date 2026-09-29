import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-BaAa1Ck7.js";import{S as l}from"./split-button-CnjlK5Vs.js";import"./button-DkeZ1DSR.js";import{A as n,B as a}from"./tyler-icons-BSgf1RSL.js";import{A as m,b as p}from"./iframe-CeKgC4Tg.js";import{o as d}from"./style-map-DudCfKEY.js";import{g as c,b as u,G as f}from"./utils-D6ldXT3I.js";import"./menu-nDrc3LKh.js";import"./linear-progress-kQO48laS.js";import"./list-Oak2HfaZ.js";import"./popover-BaM9yRL2.js";import"./overlay-B0nIhxxX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Cp3qj50X.js";import"./list-item-STGQfT7T.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return p`
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
