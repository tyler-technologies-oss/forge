import{x as n,T as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as c,g as d}from"./utils-BorsylQ1.js";import"./split-view-DP8K9SqL.js";import{s as m}from"./decorators-B79PnA5z.js";import{o as f}from"./style-map-D0ILlpbs.js";const b="forge-split-view{height:300px}forge-split-view forge-split-view-panel div{display:flex;justify-content:center;align-items:center;height:100%}forge-split-view forge-split-view-panel:first-child{background-color:#e6e6fa}forge-split-view forge-split-view-panel:last-child{background-color:#fa8070}",s="forge-split-view-panel",u={title:"Components/Split View/Split View Panel",render:e=>{const l=c(e),t=l?f(l):p;return n`
    <forge-split-view>
      <forge-split-view-panel
        .resizable=${e.resizable}
        .size=${e.size}
        .min=${e.min}
        .max=${e.max}
        .disabled=${e.disabled}
        .allowClose=${e.allowClose}
        .autoClose=${e.autoClose}
        .autoCloseThreshold=${e.autoCloseThreshold}
        .accessibleLabel=${e.accessibleLabel}
        .open=${e.open}
        style=${t}>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel 
        .resizable=${e.resizable}
        .size=${e.size}
        .min=${e.min}
        .max=${e.max}
        .disabled=${e.disabled}
        .allowClose=${e.allowClose}
        .autoClose=${e.autoClose}
        .autoCloseThreshold=${e.autoCloseThreshold}
        .accessibleLabel=${e.accessibleLabel}
        .open=${e.open}
        style=${t}>
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
    `},component:s,decorators:[m(b)],parameters:{actions:{disable:!0}},argTypes:{...d({tagName:s,controls:{resizable:{control:"select",options:["start","end","off"]}}})},args:{autoCloseThreshold:120,size:"200",min:"100",max:"200",open:"true",resizable:"end"}},o={};var i,a,r;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(r=(a=o.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const $=["Demo"],g=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:$,default:u},Symbol.toStringTag,{value:"Module"}));export{o as D,g as S};
