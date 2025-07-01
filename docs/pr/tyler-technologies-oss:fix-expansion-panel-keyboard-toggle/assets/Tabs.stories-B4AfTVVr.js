import{E as i,x as c}from"./iframe-mS7RoxC1.js";import{g as P,s as l,a as D}from"./utils-BIyK4qxX.js";import{o as E}from"./style-map-2A53FHV0.js";import{I as V,o as j,d as k}from"./icon-BIwO9Z2o.js";import"./feature-detection-uS6p5jc8.js";import"./tab-bar-MWjdAHme.js";const{action:O}=__STORYBOOK_MODULE_ACTIONS__,d="forge-tab-bar",W=O("forge-tab-bar-change"),w=O("forge-tab-select");V.define([j,k]);const F={title:"Components/Tabs",render:e=>{const n={...D(e)};e.vertical?n["max-width"]="200px":e.scrollButtons&&(n["max-width"]="500px");const B=Object.entries(n).length?E(n):i,x=Array.from({length:e.scrollButtons?20:3}).map((M,C)=>c`<forge-tab>
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
    `},component:d,subcomponents:{Tab:"forge-tab"},argTypes:{...P({tagName:d,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},t={},o={...l,args:{vertical:!0}},r={...l,args:{clustered:!0}},a={...l,args:{scrollButtons:!0}},s={...l,args:{startIcon:!0}};var m,u,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var b,f,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var v,y,S;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...(S=(y=r.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var I,$,T;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...(T=($=a.parameters)==null?void 0:$.docs)==null?void 0:T.source}}};var _,h,A;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...(A=(h=s.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};const L=["Demo","Vertical","Clustered","Scrolling","WithIcons"],q=Object.freeze(Object.defineProperty({__proto__:null,Clustered:r,Demo:t,Scrolling:a,Vertical:o,WithIcons:s,__namedExportsOrder:L,default:F},Symbol.toStringTag,{value:"Module"}));export{r as C,t as D,a as S,q as T,o as V,s as W};
