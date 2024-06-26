import{x as c,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as d}from"./style-map-D0ILlpbs.js";import{a as m}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as b,g as p}from"./utils-Dtr3SQvK.js";import"./constants-ngK8be3i.js";import"./checkbox-BCGc4uqs.js";import"./index-Dh0vMUMR.js";const r="forge-checkbox",f=m("forge-checkbox-change"),u={title:"Components/Checkbox",render:e=>{const t=b(e),l=t?d(t):i;return c`
      <forge-checkbox
        .checked=${e.checked}
        .indeterminate=${e.indeterminate}
        .disabled=${e.disabled}
        .required=${e.required}
        .readonly=${e.readonly}
        .dense=${e.dense}
        .labelPosition=${e.labelPosition}
        @change=${f}
        style=${l}>
        ${e.label}
      </forge-checkbox>
    `},component:r,argTypes:{...p({tagName:r,exclude:["defaultChecked","value","form","labels","name"],controls:{labelPosition:{control:"select",options:["start","end"]}}}),label:{control:"text"}},args:{label:"Label",checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:"end"}},o={};var a,s,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const h=["Demo"],A=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:h,default:u},Symbol.toStringTag,{value:"Module"}));export{A as C,o as D};
