import"./service-adapter-DlT-lJx7.js";import{A as n,B as a,I as i}from"./tyler-icons--haAADqW.js";import{S as l}from"./split-button-DcSGNSsY.js";import"./button-0aFc-rvC.js";import{A as p,b as m}from"./iframe-BQuUdi9A.js";import{o as d}from"./style-map-DZMzP31B.js";import{g as c,b as u,G as f}from"./utils-CElmhe9Y.js";import"./menu-D-lcVz-r.js";import"./linear-progress-VpC6qUWa.js";import"./list-DJY0Qsvo.js";import"./popover-C49q6_k0.js";import"./overlay-DlXgJPae.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnhVRD4Y.js";import"./list-item-ByLOjRzX.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
