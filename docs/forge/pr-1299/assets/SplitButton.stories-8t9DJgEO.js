import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-BWWEOavI.js";import{S as l}from"./split-button-CFEmczuV.js";import"./button-C0j7tAEZ.js";import{A as n,B as a}from"./tyler-icons-_o7MAz4c.js";import{A as m,b as p}from"./iframe-QHnGQDtP.js";import{o as d}from"./style-map-D69N4WVg.js";import{g as c,b as u,G as f}from"./utils-BRc3IP6u.js";import"./menu-CJCj9x9w.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DJaCZBbg.js";import"./popover-DPWANUhZ.js";import"./overlay-ByTJNYJL.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BdK8ueUU.js";import"./list-item-Ddu71ZoD.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return p`
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
