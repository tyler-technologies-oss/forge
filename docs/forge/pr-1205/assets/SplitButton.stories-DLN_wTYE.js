import"./service-adapter-DlT-lJx7.js";import{A as n,B as a,I as i}from"./tyler-icons-D_P4inVM.js";import{S as l}from"./split-button-C27YHtIS.js";import"./button-CArgg2AW.js";import{A as p,b as m}from"./iframe-CCQPwMqK.js";import{o as d}from"./style-map-DcvoGNcx.js";import{g as c,b as u,G as f}from"./utils-71auwco3.js";import"./menu-sl54LpTS.js";import"./linear-progress-Du-Ntegu.js";import"./list-DoWEQWCg.js";import"./popover-avDoFPUj.js";import"./overlay-ejBQU7cY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BMUbeM10.js";import"./list-item-BE2FE9nz.js";i.define([n,a]);const r="forge-split-button",g={title:"Components/Split Button",render:e=>{const s=[{label:"Schedule send",value:"schedule",leadingIcon:n.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:a.name,leadingIconType:"component"}],o=u(e);return m`
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
