import"./lit-element-JplMEnZc.js";import{E as i,x as c}from"./lit-html-paDGiEfB.js";import{a as x}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{b as j,g as D,s as l}from"./utils-D5U1kRmx.js";import{o as O}from"./style-map-C9nPWcxA.js";import{j as V}from"./index-ByifSpfC.js";import{t as k}from"./index-fxMNKkgx.js";import{I as E}from"./icon-DB7kP3Ec.js";import"./feature-detection-DRCh51Sa.js";import"./tab-bar-DlnKkKwI.js";const m="forge-tab-bar",W=x("forge-tab-bar-change"),w=x("forge-tab-select");E.define([V,k]);const F={title:"Components/Tabs",render:e=>{const n={...j(e)};e.vertical?n["max-width"]="200px":e.scrollButtons&&(n["max-width"]="500px");const B=Object.entries(n).length?O(n):i,C=Array.from({length:e.scrollButtons?20:3}).map((L,P)=>c`<forge-tab>
          ${e.startIcon?c`<forge-icon slot="start" name="favorite"></forge-icon>`:i} Tab ${P+1}
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
        ${C}
      </forge-tab-bar>
    `},component:m,subcomponents:{Tab:"forge-tab"},argTypes:{...D({tagName:m,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},t={},r={...l,args:{vertical:!0}},o={...l,args:{clustered:!0}},a={...l,args:{scrollButtons:!0}},s={...l,args:{startIcon:!0}};var d,u,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var f,b,g;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...(g=(b=r.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var v,y,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...(S=(y=o.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var $,I,T;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...(T=(I=a.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var h,A,_;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...(_=(A=s.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};const z=["Demo","Vertical","Clustered","Scrolling","WithIcons"],X=Object.freeze(Object.defineProperty({__proto__:null,Clustered:o,Demo:t,Scrolling:a,Vertical:r,WithIcons:s,__namedExportsOrder:z,default:F},Symbol.toStringTag,{value:"Module"}));export{o as C,t as D,a as S,X as T,r as V,s as W};
