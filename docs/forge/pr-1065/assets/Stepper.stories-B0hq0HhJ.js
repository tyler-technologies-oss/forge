import{b as p,A as a}from"./iframe-CskTT7ts.js";import{s as l,g as i,b as c}from"./utils-CbU1ENex.js";import{o as g}from"./style-map-eJzqLCWt.js";import"./service-adapter-CffG5Lhq.js";import"./stepper-XlHrKuYI.js";import"./state-layer-DGD4bZzf.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,s="forge-stepper",d=f("forge-step-select"),m={title:"Components/Stepper",render:e=>{const r=c(e),n=r?g(r):a;return p`
      <forge-stepper
        .alternative=${e.alternative}
        .layoutMode=${e.layoutMode}
        .layoutAlign=${e.layoutAlign}
        .disabled=${e.disabled}
        .vertical=${e.vertical}
        .linear=${e.linear}
        style=${n}
        @forge-step-select=${d}>
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
    `},component:s,subcomponents:{Step:"forge-step"},argTypes:{...i({tagName:s,exclude:["steps","selectedIndex"],controls:{layoutMode:{control:"select",options:["fixed","clustered"]},layoutAlign:{control:"select",options:["left","center","right"]}}})},args:{layoutMode:"fixed"}},t={},o={...l,render:e=>p`
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
  `};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["Demo","Vertical"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Vertical:o,__namedExportsOrder:S,default:m},Symbol.toStringTag,{value:"Module"}));export{t as D,$ as S,o as V};
