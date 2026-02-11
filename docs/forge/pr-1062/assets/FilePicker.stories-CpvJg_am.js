import{A as a,b as l}from"./iframe-t5tnxelm.js";import{g as p,b as c}from"./utils-Jq8-zXrZ.js";import"./service-adapter-CffG5Lhq.js";import"./file-picker-EIpTCeVs.js";import"./index-DTwfV0k0.js";import{o as i}from"./style-map-CUgDiOmq.js";const o="forge-file-picker",m={title:"Components/File Picker",render:e=>{const t=c(e),s=t?i(t):a;return l`
      <forge-file-picker
        .accept=${e.accept}
        .maxSize=${e.maxSize}
        .multiple=${e.multiple}
        .disabled=${e.disabled}
        .compact=${e.compact}
        .borderless=${e.borderless}
        .capture=${e.capture}
        style=${s}>
        <span slot="primary">Drag files here or</span>
        <span slot="secondary">Secondary text here</span>
        <forge-button variant="outlined">Select files</forge-button>
        <span slot="helper-text">Helper text goes here</span>
      </forge-file-picker>
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...p({tagName:o,controls:{maxSize:{control:{type:"number"}}}})},args:{maxSize:0,multiple:!1,disabled:!1,compact:!1,borderless:!1}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const n=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,__namedExportsOrder:n,default:m},Symbol.toStringTag,{value:"Module"}));export{r as D,S as F};
