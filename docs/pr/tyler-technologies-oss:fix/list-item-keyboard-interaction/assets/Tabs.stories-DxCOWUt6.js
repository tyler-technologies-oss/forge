import{E as i,x as c}from"./iframe-BicIBdj6.js";import{g as P,s as l,a as D}from"./utils-fDFCfL8X.js";import{o as E}from"./style-map-yAsk8lYZ.js";import{I as V,p as j,d as k}from"./icon-B8CdcxqJ.js";import"./feature-detection-uS6p5jc8.js";import"./tab-bar-Bhq4Ed9L.js";const{action:O}=__STORYBOOK_MODULE_ACTIONS__,d="forge-tab-bar",W=O("forge-tab-bar-change"),w=O("forge-tab-select");V.define([j,k]);const F={title:"Components/Tabs",render:e=>{const n={...D(e)};e.vertical?n["max-width"]="200px":e.scrollButtons&&(n["max-width"]="500px");const B=Object.entries(n).length?E(n):i,x=Array.from({length:e.scrollButtons?20:3}).map((M,C)=>c`<forge-tab>
          ${e.startIcon?c`<forge-icon slot="start" name="favorite"></forge-icon>`:i} Tab ${C+1}
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
        style=${B}
        @forge-tab-bar-change=${W}
        @forge-tab-select=${w}>
        ${x}
      </forge-tab-bar>
    `},component:d,subcomponents:{Tab:"forge-tab"},argTypes:{...P({tagName:d,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},t={},r={...l,args:{vertical:!0}},a={...l,args:{clustered:!0}},o={...l,args:{scrollButtons:!0}},s={...l,args:{startIcon:!0}};var m,u,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var b,f,g;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var v,y,S;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...(S=(y=a.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var I,$,T;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...(T=($=o.parameters)==null?void 0:$.docs)==null?void 0:T.source}}};var _,h,A;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...(A=(h=s.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};const L=["Demo","Vertical","Clustered","Scrolling","WithIcons"],q=Object.freeze(Object.defineProperty({__proto__:null,Clustered:a,Demo:t,Scrolling:o,Vertical:r,WithIcons:s,__namedExportsOrder:L,default:F},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,o as S,q as T,r as V,s as W};
