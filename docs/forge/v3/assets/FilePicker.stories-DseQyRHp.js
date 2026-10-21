import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{l as a,m as o,s}from"./utils-C3ow8Ikc.js";import{r as c,t as l}from"./style-map-C_WKUe4Y.js";import{t as u}from"./file-picker-BFfwzs_b.js";var d=t({Demo:()=>m,__namedExportsOrder:()=>h,default:()=>p}),f,p,m,h;function g(){return(g=e((()=>{i(),o(),u(),l(),f=`forge-file-picker`,p={title:`Components/File Picker`,render:e=>{let t=a(e),i=t?c(t):r;return n`
      <forge-file-picker
        .accept=${e.accept}
        .maxSize=${e.maxSize}
        .multiple=${e.multiple}
        .disabled=${e.disabled}
        .compact=${e.compact}
        .borderless=${e.borderless}
        .capture=${e.capture}
        style=${i}>
        <span slot="primary">Drag files here or</span>
        <span slot="secondary">Secondary text here</span>
        <forge-button variant="outlined">Select files</forge-button>
        <span slot="helper-text">Helper text goes here</span>
      </forge-file-picker>
    `},component:f,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:f,controls:{maxSize:{control:{type:`number`}}}})},args:{maxSize:0,multiple:!1,disabled:!1,compact:!1,borderless:!1}},m={},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h=[`Demo`]})))()}export{d as n,g as r,m as t};