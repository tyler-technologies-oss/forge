import{I as p}from"./icon-DNSPAaK0.js";import"./feature-detection-C61kIZu7.js";import{S as d}from"./split-button-ByXPcr6P.js";import"./button-DOA_SM9C.js";import{x as i,y as l}from"./index-RsKXMDm2.js";import"./focus-indicator-B_9E-jM6.js";import"./index-CiLSBptl.js";import"./state-layer-DA2sYK0k.js";import{E as c,x as u}from"./lit-html-CuBe1DX_.js";import{o as f}from"./style-map-CeP1Mntv.js";import{g,G as b,b as S}from"./utils-BoQ7h7ND.js";import"./menu-C1mUnqqH.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-Dh1-Do6h.js";import"./overlay-B56HkyOr.js";import"./skeleton-Cfb12itF.js";p.define([i,l]);const r="forge-split-button",y={title:"Components/Split Button",render:e=>{const m=[{label:"Schedule send",value:"schedule",leadingIcon:i.name,leadingIconType:"component"},{label:"Save draft",value:"draft",leadingIcon:l.name,leadingIconType:"component"}],o=S(e);return u`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${o?f(o):c}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${m}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised"]},theme:{control:{type:"select"},options:b}}})},args:{variant:"raised",theme:d.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},t={};var n,a,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const T=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:T,default:y},Symbol.toStringTag,{value:"Module"}));export{t as D,k as S};
