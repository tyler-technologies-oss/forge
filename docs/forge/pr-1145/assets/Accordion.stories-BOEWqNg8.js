import{b as r}from"./iframe-BoJb98tf.js";import{s as i}from"./decorators-D-aROzwY.js";import{g as a,c as d}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-COxvc6OK.js";import"./divider-BfXu-8SN.js";import"./expansion-panel-C_n8azec.js";import"./open-icon-JgSiXo1g.js";const t="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",o="forge-accordion",p={title:"Components/Accordion",render:n=>d(o,n),component:o,decorators:[i(t)],parameters:{actions:{disable:!0}},argTypes:{...a({tagName:o,exclude:["panelSelector"]})}},e={render:()=>r`
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
