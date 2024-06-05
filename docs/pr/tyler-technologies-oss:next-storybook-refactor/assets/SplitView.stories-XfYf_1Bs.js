import{x as a}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as e}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as l}from"./utils-BrN94tQ9.js";import"./split-view-DkhyUxRn.js";import{s as p}from"./decorators-B79PnA5z.js";const c="forge-split-view{height:300px}forge-split-view forge-split-view-panel div{display:flex;justify-content:center;align-items:center;height:100%}forge-split-view forge-split-view-panel:first-child{background-color:#e6e6fa}forge-split-view forge-split-view-panel:last-child{background-color:#fa8070}",t="forge-split-view",f=e("forge-split-view-panel-will-resize"),w=e("forge-split-view-panel-resize-start"),d=e("forge-split-view-panel-resize-end"),g=e("forge-split-view-panel-resize"),v=e("forge-split-view-panel-will-open"),m=e("forge-split-view-panel-will-close"),u=e("forge-split-view-panel-did-open"),z=e("forge-split-view-panel-did-close"),h={title:"Components/Split View",render:i=>a`
    <forge-split-view
      .orientation=${i.orientation}
      .disabled=${i.disabled}
      .allowClose=${i.allowClose}
      .autoClose=${i.autoClose}
      .autoCloseThreshold=${i.autoCloseThreshold}
      @forge-split-view-panel-will-resize=${f}
      @forge-split-view-panel-resize-start=${w}
      @forge-split-view-panel-resize-end=${d}
      @forge-split-view-panel-resize=${g}
      @forge-split-view-panel-will-open=${v}
      @forge-split-view-panel-will-close=${m}
      @forge-split-view-panel-did-open=${u}
      @forge-split-view-panel-did-close=${z}>
      <forge-split-view-panel>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel size="200">
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
    `,component:t,subcomponents:{"Split View Panel":"forge-split-view-panel"},decorators:[p(c)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,category:"Split View",controls:{orientation:{control:"select",options:["horizontal","vertical"]}}}),...l({tagName:"forge-split-view-panel",category:"Split View Panel",exclude:["accessibleLabel"]})},args:{autoCloseThreshold:120,disabled:!1,allowClose:!1,autoClose:!1,orientation:"horizontal",resizable:"off",size:200,min:0,open:!0}},o={};var s,r,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(n=(r=o.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const b=["Demo"],T=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:h},Symbol.toStringTag,{value:"Module"}));export{o as D,T as S};
