import{b as r}from"./iframe-CG34Pyww.js";import{s as i}from"./decorators-gJDr_H8z.js";import{g as a,c as t}from"./utils-CUOVSmqg.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-DXXA9fxd.js";import"./expansion-panel-D3Q0t3k2.js";import"./open-icon-CAk2UJIJ.js";import"./index-DTwfV0k0.js";import"./divider-CKDe_5wd.js";const d="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",o="forge-accordion",p={title:"Components/Accordion",render:n=>t(o,n),component:o,decorators:[i(d)],parameters:{actions:{disable:!0}},argTypes:{...a({tagName:o,exclude:["panelSelector"]})}},e={render:()=>r`
    <forge-accordion>
      <forge-expansion-panel>
        <div slot="header">
          Panel One
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel One Content</div>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <forge-expansion-panel>
        <div slot="header">
          Panel Two
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel Two Content</div>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <forge-expansion-panel>
        <div slot="header">
          Panel Three
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel Three Content</div>
      </forge-expansion-panel>
    </forge-accordion>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-accordion>
      <forge-expansion-panel>
        <div slot="header">
          Panel One
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel One Content</div>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <forge-expansion-panel>
        <div slot="header">
          Panel Two
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel Two Content</div>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <forge-expansion-panel>
        <div slot="header">
          Panel Three
          <forge-open-icon></forge-open-icon>
        </div>
        <div>Panel Three Content</div>
      </forge-expansion-panel>
    </forge-accordion>
  \`
}`,...e.parameters?.docs?.source}}};const s=["Demo"],u=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:s,default:p},Symbol.toStringTag,{value:"Module"}));export{u as A,e as D};
