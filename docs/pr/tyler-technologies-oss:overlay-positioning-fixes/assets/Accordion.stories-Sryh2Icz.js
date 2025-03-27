import"./lit-element-B3QVTycr.js";import{x as t}from"./lit-html-CuBe1DX_.js";import{s as d}from"./decorators-CBntP_d2.js";import{g as p,c as s}from"./utils-DAdTVAL1.js";import"./feature-detection-C61kIZu7.js";import"./accordion-D9DRD9gp.js";import"./expansion-panel-tM2gL5Km.js";import"./index-CiLSBptl.js";import"./divider-B48YHESn.js";const c="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",n="forge-accordion",l={title:"Components/Accordion",render:a=>s(n,a),component:n,decorators:[d(c)],parameters:{actions:{disable:!0}},argTypes:{...p({tagName:n,exclude:["panelSelector"]})}},e={render:()=>t`
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
    `};var o,r,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => {
    return html\`
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
    \`;
  }
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const g=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:g,default:l},Symbol.toStringTag,{value:"Module"}));export{C as A,e as D};
