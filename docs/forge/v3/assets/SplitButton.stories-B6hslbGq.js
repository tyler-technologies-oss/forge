import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-BNaE2C0t.js";import{S as l}from"./split-button-BW5cuK_p.js";import"./button-CSrhRaCz.js";import{A as n,B as a}from"./tyler-icons-_o7MAz4c.js";import{A as m,b as p}from"./iframe-oAO0QRyC.js";import{o as d}from"./style-map-Bp4U-jrn.js";import{g as c,b as u,G as f}from"./utils-BUadP3tW.js";import"./menu-CCR7Fusj.js";import"./linear-progress-BuMeIIdZ.js";import"./list-c_yY3uTR.js";import"./popover-DCnuFbj-.js";import"./overlay-DWOSAut5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-ZraD1p-1.js";import"./list-item-BYmRBlrw.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return p`
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
