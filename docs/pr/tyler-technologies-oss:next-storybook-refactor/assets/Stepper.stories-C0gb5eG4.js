import{x as g,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as m,g as u,s as S}from"./utils-1OsX3DDr.js";import"./step-CqMBt2IE.js";import"./state-layer-DzrxdbUp.js";import"./stepper-By0fDATi.js";import{o as v}from"./style-map-D0ILlpbs.js";const s="forge-stepper",x={title:"Components/Stepper",render:e=>{const r=m(e),d=r?v(r):f;return g`
      <forge-stepper
         .alternative=${e.alternative}
         .layoutMode=${e.layoutMode}
         .layoutAlign=${e.layoutAlign}
         .disabled=${e.disabled}
         .vertical=${e.vertical}
         .linear=${e.linear}
         style=${d}>
        <forge-step>Step 1</forge-step>
        <forge-step>Step 2 <span slot="optional">Optional</span></forge-step>
        <forge-step><div slot="expansion-content">Expansion Content</div>${e.vertical?"Expand me":"Step 3"}</forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:s,exclude:["steps","selectedIndex"],controls:{layoutMode:{control:"select",options:["fixed","clustered"]},layoutAlign:{control:"select",options:["left","center","right"]}}})},args:{layoutMode:"fixed"}},t={},o={...S,render:e=>g`
        <forge-stepper
         vertical="true">
        <forge-step>Step 1</forge-step>
        <forge-step>Step 2 <span slot="optional">Optional</span></forge-step>
        <forge-step><div slot="expansion-content">Expansion Content</div>${e.vertical?"Expand me":"Step 3"}</forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
  `};var p,n,a;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var l,i,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => html\`
        <forge-stepper
         vertical="true">
        <forge-step>Step 1</forge-step>
        <forge-step>Step 2 <span slot="optional">Optional</span></forge-step>
        <forge-step><div slot="expansion-content">Expansion Content</div>\${args.vertical ? 'Expand me' : 'Step 3'}</forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
  \`
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const y=["Demo","Vertical"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Vertical:o,__namedExportsOrder:y,default:x},Symbol.toStringTag,{value:"Module"}));export{t as D,M as S,o as V};
