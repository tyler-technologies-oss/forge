import{x as s}from"./iframe-6cPDpsNm.js";import{g as l}from"./utils-C4vOzYQF.js";import{s as r}from"./decorators-DeF8Srk2.js";import"./service-adapter-CffG5Lhq.js";import"./split-view-ruKW860c.js";const n="forge-split-view{height:300px}forge-split-view forge-split-view-panel div{display:flex;justify-content:center;align-items:center;height:100%}forge-split-view forge-split-view-panel:first-child{background-color:#e6e6fa}forge-split-view forge-split-view-panel:last-child{background-color:#fa8070}",{action:e}=__STORYBOOK_MODULE_ACTIONS__,t="forge-split-view",a=e("forge-split-view-panel-will-resize"),p=e("forge-split-view-panel-resize-start"),c=e("forge-split-view-panel-resize-end"),w=e("forge-split-view-panel-resize"),f=e("forge-split-view-panel-will-open"),d=e("forge-split-view-panel-will-close"),g=e("forge-split-view-panel-did-open"),v=e("forge-split-view-panel-did-close"),m={title:"Components/Split View",render:i=>s`
      <forge-split-view
        .orientation=${i.orientation}
        .disabled=${i.disabled}
        .allowClose=${i.allowClose}
        .autoClose=${i.autoClose}
        .autoCloseThreshold=${i.autoCloseThreshold}
        @forge-split-view-panel-will-resize=${a}
        @forge-split-view-panel-resize-start=${p}
        @forge-split-view-panel-resize-end=${c}
        @forge-split-view-panel-resize=${w}
        @forge-split-view-panel-will-open=${f}
        @forge-split-view-panel-will-close=${d}
        @forge-split-view-panel-did-open=${g}
        @forge-split-view-panel-did-close=${v}>
        <forge-split-view-panel>
          <div>Panel 1</div>
        </forge-split-view-panel>
        <forge-split-view-panel size="200">
          <div>Panel 2</div>
        </forge-split-view-panel>
      </forge-split-view>
    `,component:t,subcomponents:{"Split View Panel":"forge-split-view-panel"},decorators:[r(n)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,category:"Split View",controls:{orientation:{control:"select",options:["horizontal","vertical"]}}}),...l({tagName:"forge-split-view-panel",category:"Split View Panel",exclude:["accessibleLabel"]})},args:{autoCloseThreshold:120,disabled:!1,allowClose:!1,autoClose:!1,orientation:"horizontal",resizable:"off",size:200,min:0,open:!0}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const u=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:u,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,$ as S};
