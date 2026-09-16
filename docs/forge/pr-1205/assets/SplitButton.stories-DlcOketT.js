import"./service-adapter-8tADcN_b.js";import{z as n,A as a,I as i}from"./tyler-icons-QQy6qJP1.js";import{S as l}from"./split-button-b5_iD7P6.js";import"./button-CRDfQpBx.js";import"./focus-indicator-Bp7--dbz.js";import"./state-layer-B1dog9AJ.js";import{A as p,b as m}from"./iframe-Ce60v_-f.js";import{o as d}from"./style-map-BUz1CkTX.js";import{g as c,b as u,G as f}from"./utils-E9-_u7-I.js";import"./menu-zI_-gNeq.js";import"./linear-progress-BuTzYSPq.js";import"./list-tSsBcS4l.js";import"./popover-bYTsRCvd.js";import"./overlay-BNDDgKF7.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DjMJjvPK.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
