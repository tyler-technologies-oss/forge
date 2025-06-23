import{x as t}from"./iframe-rNJ7j0IZ.js";import{s as d}from"./decorators-C2FOGiBs.js";import{g as p,c as s}from"./utils-gw6R9s7u.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-DZsMF2tj.js";import"./expansion-panel-D_Sh7JhR.js";import"./index-CiLSBptl.js";import"./divider-DBTw_7sm.js";const c="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",n="forge-accordion",l={title:"Components/Accordion",render:a=>s(n,a),component:n,decorators:[d(c)],parameters:{actions:{disable:!0}},argTypes:{...p({tagName:n,exclude:["panelSelector"]})}},e={render:()=>t`
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
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const g=["Demo"],T=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:g,default:l},Symbol.toStringTag,{value:"Module"}));export{T as A,e as D};
