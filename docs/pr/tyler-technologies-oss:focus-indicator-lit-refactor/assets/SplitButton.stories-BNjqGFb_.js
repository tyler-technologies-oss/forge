import{z as i,A as l,I as m}from"./icon-eJOvSyyv.js";import"./service-adapter-BykFeYYZ.js";import{S as d}from"./split-button-DqElAJxf.js";import"./button-B31EV2cV.js";import"./focus-indicator-DFzG-d7S.js";import"./state-layer-BRTtEqto.js";import{E as c,x as u}from"./iframe-BL13dRo5.js";import{o as f}from"./style-map-Cybu7GmS.js";import{g,G as b,a as S}from"./utils-D0zOu5id.js";import"./menu-Qg1eW1VP.js";import"./linear-progress-BTaob5x2.js";import"./list-CDPcagJC.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./index-CiLSBptl.js";import"./skeleton-fsmWNbya.js";m.define([i,l]);const r="forge-split-button",T={title:"Components/Split Button",render:e=>{const p=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=S(e);return u`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?f(o):c}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${p}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:b}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const y=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:y,default:T},Symbol.toStringTag,{value:"Module"}));export{t as D,j as S};
