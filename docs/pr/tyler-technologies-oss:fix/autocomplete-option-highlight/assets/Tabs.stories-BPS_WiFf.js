import{E as i,x as c}from"./iframe-D70h1lbg.js";import{g as f,s as l,a as g}from"./utils-bIwC1Fgv.js";import{o as v}from"./style-map-CR3wdKt2.js";import{I as y,p as S,d as I}from"./icon-kuXwuZAY.js";import"./service-adapter-CffG5Lhq.js";import"./tab-bar-DQOOcwl_.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,d="forge-tab-bar",$=m("forge-tab-bar-change"),T=m("forge-tab-select");y.define([S,I]);const _={title:"Components/Tabs",render:e=>{const n={...g(e)};e.vertical?n["max-width"]="200px":e.scrollButtons&&(n["max-width"]="500px");const u=Object.entries(n).length?v(n):i,p=Array.from({length:e.scrollButtons?20:3}).map((A,b)=>c`<forge-tab>
          ${e.startIcon?c`<forge-icon slot="start" name="favorite"></forge-icon>`:i} Tab ${b+1}
          ${e.endIcon?c`<forge-icon slot="end" name="forge_logo"></forge-icon>`:i}
        </forge-tab>`);return c`
      <forge-tab-bar
        data-aria-label="Demo tabs"
        .disabled=${e.disabled}
        .activeTab=${e.activeTab}
        .vertical=${e.vertical}
        .clustered=${e.clustered}
        .stacked=${e.stacked}
        .inverted=${e.inverted}
        .autoActivate=${e.autoActivate}
        .scrollButtons=${e.scrollButtons}
        style=${u}
        @forge-tab-bar-change=${$}
        @forge-tab-select=${T}>
        ${p}
      </forge-tab-bar>
    `},component:d,subcomponents:{Tab:"forge-tab"},argTypes:{...f({tagName:d,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},t={},r={...l,args:{vertical:!0}},a={...l,args:{clustered:!0}},o={...l,args:{scrollButtons:!0}},s={...l,args:{startIcon:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...s.parameters?.docs?.source}}};const h=["Demo","Vertical","Clustered","Scrolling","WithIcons"],E=Object.freeze(Object.defineProperty({__proto__:null,Clustered:a,Demo:t,Scrolling:o,Vertical:r,WithIcons:s,__namedExportsOrder:h,default:_},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,o as S,E as T,r as V,s as W};
