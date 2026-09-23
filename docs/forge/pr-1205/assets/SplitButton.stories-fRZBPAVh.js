import"./service-adapter-DlT-lJx7.js";import{A as n,B as a,I as i}from"./tyler-icons-qc11a4hp.js";import{S as l}from"./split-button-eVg0RXPV.js";import"./button-BT0VAunK.js";import{A as p,b as m}from"./iframe-B7LxWkL4.js";import{o as d}from"./style-map-B4WdC4iL.js";import{g as c,b as u,G as f}from"./utils-BgSSl4hg.js";import"./menu-b7W_YMql.js";import"./linear-progress-Du-Ntegu.js";import"./list-G4hiICeQ.js";import"./popover-C6L45Wod.js";import"./overlay--ryFBZAY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BvzgNeZ5.js";import"./list-item-Dp-tcav_.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
