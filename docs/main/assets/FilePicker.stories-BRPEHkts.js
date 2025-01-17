import"./lit-element-CgJqSpuc.js";import{x as i,E as c}from"./lit-html-paDGiEfB.js";import{b as m,g as n}from"./utils-BY68bB8K.js";import"./constants-CFf81ck9.js";import"./file-picker-lieFXAbt.js";import"./index-BmocOEUj.js";import{o as d}from"./style-map-C9nPWcxA.js";const o="forge-file-picker",f={title:"Components/File Picker",render:e=>{const t=m(e),p=t?d(t):c;return i`
      <forge-file-picker
        .accept=${e.accept}
        .maxSize=${e.maxSize}
        .multiple=${e.multiple}
        .disabled=${e.disabled}
        .compact=${e.compact}
        .borderless=${e.borderless}
        .capture=${e.capture}
        style=${p}>
        <span slot="primary">Drag files here or</span>
        <span slot="secondary">Secondary text here</span>
        <forge-button variant="outlined">Select files</forge-button>
        <span slot="helper-text">Helper text goes here</span>
      </forge-file-picker>
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...n({tagName:o,controls:{maxSize:{control:{type:"number"}}}})},args:{maxSize:0,multiple:!1,disabled:!1,compact:!1,borderless:!1}},r={};var s,a,l;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(l=(a=r.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const u=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,__namedExportsOrder:u,default:f},Symbol.toStringTag,{value:"Module"}));export{r as D,k as F};
