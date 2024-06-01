import{x as l,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as d}from"./style-map-D0ILlpbs.js";import{a as m}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as p,g as b}from"./constants-OjHl0HLu.js";import"./checkbox-BNcz10nn.js";import"./index-Dh0vMUMR.js";const r="forge-checkbox",f=m("forge-checkbox-change"),u={title:"Components/Checkbox",render:e=>{const t=p(e),c=t?d(t):i;return l`
      <forge-checkbox
      .checked=${e.checked}
      .indeterminate=${e.indeterminate}
      .disabled=${e.disabled}
      .required=${e.required}
      .readonly=${e.readonly}
      .dense=${e.dense}
      .labelPosition=${e.labelPosition}
      @change=${f}
      style=${c}>
        ${e.text}
      </forge-checkbox>
    `},component:r,argTypes:{...b({tagName:r,exclude:["defaultChecked","value"],controls:{labelPosition:{control:"select",options:["start","end"]}}}),text:{control:"text"}},args:{text:"Label",checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:"end"}},o={};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const x=["Demo"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:x,default:u},Symbol.toStringTag,{value:"Module"}));export{P as C,o as D};
