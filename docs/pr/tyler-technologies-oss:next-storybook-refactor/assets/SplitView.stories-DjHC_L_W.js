import{x as s}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as a}from"./utils-bUMJf83p.js";import"./split-view-Na3xNpVM.js";import{s as n}from"./decorators-B79PnA5z.js";const p="forge-split-view{height:300px}forge-split-view forge-split-view-panel div{display:flex;justify-content:center;align-items:center;height:100%}forge-split-view forge-split-view-panel:first-child{background-color:#e6e6fa}forge-split-view forge-split-view-panel:last-child{background-color:#fa8070}",t="forge-split-view",c={title:"Components/Split View",render:e=>s`
    <forge-split-view
      .orientation=${e.orientation}
      .disabled=${e.disabled}
      .allowClose=${e.allowClose}
      .autoClose=${e.autoClose}
      .autoCloseThreshold=${e.autoCloseThreshold}
      >
      <forge-split-view-panel>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel size="200">
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
    `,component:t,decorators:[n(p)],parameters:{actions:{disable:!0}},argTypes:{...a({tagName:t,controls:{orientation:{control:"select",options:["horizontal","vertical"]}}})},args:{autoCloseThreshold:120,orientation:"horizontal"}},o={};var i,r,l;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(l=(r=o.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const d=["Demo"],w=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:d,default:c},Symbol.toStringTag,{value:"Module"}));export{o as D,w as S};
