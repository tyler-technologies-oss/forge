import{x as p,T as d}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as c,g as l}from"./utils-DYBSxO3_.js";import"./step-BJ1dWOMa.js";import"./state-layer-DzrxdbUp.js";import{o as m}from"./style-map-D0ILlpbs.js";const r="forge-step",x={title:"Components/Stepper/Step",render:e=>{const o=c(e),i=o?m(o):d;return p`
    <forge-step
      .index=${e.index}
      .selected=${e.selected}
      .active=${e.active}
      .completed=${e.completed}
      .expanded=${e.expanded}
      .disabled=${e.disabled}
      .error=${e.error}
      .alternative=${e.alternative}
      .vertical=${e.vertical}
      .ignoreUserExpansion=${e.ignoreUserExpansion}
      .editable=${e.editable}
      style=${i}>
      <div slot="expansion-content">Expanded</div>
      ${e.text}
      </forge-step>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:r})},args:{text:"Step 1",index:0}},t={};var n,s,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const $=["Demo"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:$,default:x},Symbol.toStringTag,{value:"Module"}));export{t as D,_ as S};
