import"./service-adapter-8tADcN_b.js";import"./icon-CXw8uXM_.js";import{z as n,A as a,I as i}from"./tyler-icons-uU9Yd7lf.js";import{S as l}from"./split-button-DAdsS1aE.js";import"./button-558tNDpa.js";import"./focus-indicator-BBtCjyD8.js";import"./state-layer-Kw6pmYRH.js";import{A as p,b as m}from"./iframe-BK3r3gy1.js";import{o as d}from"./style-map-B-zzhRls.js";import{g as c,b as u,G as f}from"./utils-ZPyYhNMY.js";import"./menu-oM4UPGdx.js";import"./linear-progress-D8EbdkBB.js";import"./list-CRxpAe8T.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-CAo0Ux7j.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:f}}})},args:{variant:"raised",theme:l.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{t as D,P as S};
