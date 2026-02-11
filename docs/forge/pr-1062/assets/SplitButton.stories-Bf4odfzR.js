import{z as n,A as a,I as i}from"./tyler-icons-B0WPf66k.js";import"./service-adapter-CffG5Lhq.js";import{S as l}from"./split-button-ewvIgHdC.js";import"./button-tk2k35KC.js";import"./focus-indicator-C7XSB6Sy.js";import"./state-layer-u9rLNX9t.js";import{A as p,b as m}from"./iframe-D_XTYtAY.js";import{o as d}from"./style-map-Ddjwr7NY.js";import{g as c,b as u,G as f}from"./utils-B4-1L4nS.js";import"./menu-BFfsHK3A.js";import"./linear-progress-CsYLd0m5.js";import"./list-BE5yoamR.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./index-DTwfV0k0.js";import"./skeleton-DllEP8un.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
