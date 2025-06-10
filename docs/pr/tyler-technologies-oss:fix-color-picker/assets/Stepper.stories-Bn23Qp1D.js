import{E as d,x as g}from"./iframe-D16yKRLu.js";import{g as m,s as S,a as u}from"./utils-CwQ2mEzo.js";import{o as v}from"./style-map-CoFm7nfi.js";import"./feature-detection-CY6TVbRZ.js";import"./stepper-DQj0JQd0.js";import"./state-layer-BVsNuAhs.js";const{action:x}=__STORYBOOK_MODULE_ACTIONS__,s="forge-stepper",y=x("forge-step-select"),_={title:"Components/Stepper",render:e=>{const r=u(e),f=r?v(r):d;return g`
      <forge-stepper
        .alternative=${e.alternative}
        .layoutMode=${e.layoutMode}
        .layoutAlign=${e.layoutAlign}
        .disabled=${e.disabled}
        .vertical=${e.vertical}
        .linear=${e.linear}
        style=${f}
        @forge-step-select=${y}>
        <forge-step>Step 1</forge-step>
        <forge-step>
          Step 2
          <span slot="optional">Optional</span>
        </forge-step>
        <forge-step>
          <div slot="expansion-content">Expansion Content</div>
          ${e.vertical?"Expand me":"Step 3"}
        </forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
    `},component:s,subcomponents:{Step:"forge-step"},argTypes:{...m({tagName:s,exclude:["steps","selectedIndex"],controls:{layoutMode:{control:"select",options:["fixed","clustered"]},layoutAlign:{control:"select",options:["left","center","right"]}}})},args:{layoutMode:"fixed"}},t={},o={...S,render:e=>g`
    <forge-stepper vertical="true">
      <forge-step>Step 1</forge-step>
      <forge-step>
        Step 2
        <span slot="optional">Optional</span>
      </forge-step>
      <forge-step>
        <div slot="expansion-content">Expansion Content</div>
        ${e.vertical?"Expand me":"Step 3"}
      </forge-step>
      <forge-step>Step 4</forge-step>
    </forge-stepper>
  `};var p,a,n;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var l,i,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => html\`
    <forge-stepper vertical="true">
      <forge-step>Step 1</forge-step>
      <forge-step>
        Step 2
        <span slot="optional">Optional</span>
      </forge-step>
      <forge-step>
        <div slot="expansion-content">Expansion Content</div>
        \${args.vertical ? 'Expand me' : 'Step 3'}
      </forge-step>
      <forge-step>Step 4</forge-step>
    </forge-stepper>
  \`
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const O=["Demo","Vertical"],T=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Vertical:o,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{t as D,T as S,o as V};
