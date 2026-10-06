import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-kMesbXGR.js";import{S as l}from"./split-button-B9U9XQqs.js";import"./button-JBPpIXzS.js";import{A as n,B as a}from"./tyler-icons-_o7MAz4c.js";import{A as m,b as p}from"./iframe-OKJOnn65.js";import{o as d}from"./style-map-SzPyW2OI.js";import{g as c,b as u,G as f}from"./utils-DqCQojVn.js";import"./menu-S-LzcTKH.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DniZS3dz.js";import"./popover-BMhk1re9.js";import"./overlay-9hcj7XWo.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BCR8jCNf.js";import"./list-item-NCG5mfvg.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return p`
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
