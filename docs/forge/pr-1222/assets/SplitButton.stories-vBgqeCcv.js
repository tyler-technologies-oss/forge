import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-CvAFZSnF.js";import{S as l}from"./split-button-C14Sz91i.js";import"./button-BpytEDv8.js";import"./focus-indicator-vAXHGgAC.js";import"./state-layer-mJUCxnSJ.js";import{A as p,b as m}from"./iframe-ZebJRd2k.js";import{o as d}from"./style-map-CHYpaRMA.js";import{g as c,b as u,G as f}from"./utils-DYC_LATD.js";import"./menu-Dh27MJLl.js";import"./linear-progress-Dh__ll_M.js";import"./list-N8ASX7X4.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-q0AxETeF.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
