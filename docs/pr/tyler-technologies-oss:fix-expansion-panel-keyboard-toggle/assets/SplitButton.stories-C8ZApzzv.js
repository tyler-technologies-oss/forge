import{y as i,z as l,I as m}from"./icon-BIwO9Z2o.js";import"./feature-detection-uS6p5jc8.js";import{S as d}from"./split-button-hjgmc5TZ.js";import"./button-axir9R8P.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./state-layer-BFwsAUDA.js";import{E as c,x as u}from"./iframe-mS7RoxC1.js";import{o as f}from"./style-map-2A53FHV0.js";import{g,G as b,a as S}from"./utils-BIyK4qxX.js";import"./menu-BmI0NfCV.js";import"./linear-progress-2PahUgVv.js";import"./list-CWXU2VGN.js";import"./popover-CkPGSxIK.js";import"./overlay-rvLcgp1q.js";import"./skeleton-C4EH8VF8.js";m.define([i,l]);const r="forge-split-button",y={title:"Components/Split Button",render:e=>{const p=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=S(e);return u`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:b}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const T=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:T,default:y},Symbol.toStringTag,{value:"Module"}));export{t as D,j as S};
