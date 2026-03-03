import{b as r}from"./iframe-BUvWK7Gm.js";import{s as i}from"./decorators-DQSKjly0.js";import{g as a,c as d}from"./utils-D8X1NLZa.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CR3yzAlp.js";import"./expansion-panel-Fnf-xp2Z.js";import"./open-icon-C85rqQKN.js";import"./divider-C8Z9knLF.js";const t="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",o="forge-accordion",p={title:"Components/Accordion",render:n=>d(o,n),component:o,decorators:[i(t)],parameters:{actions:{disable:!0}},argTypes:{...a({tagName:o,exclude:["panelSelector"]})}},e={render:()=>r`
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
}`,...e.parameters?.docs?.source}}};const s=["Demo"],h=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:s,default:p},Symbol.toStringTag,{value:"Module"}));export{h as A,e as D};
