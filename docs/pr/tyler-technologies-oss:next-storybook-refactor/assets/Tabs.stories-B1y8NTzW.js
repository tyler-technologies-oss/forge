import{T as s,x as r}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as b}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as y,g as v}from"./utils-d6LfNt4R.js";import{o as $}from"./style-map-D0ILlpbs.js";import{f as T}from"./index-Dh2cEqRr.js";import{t as I}from"./index-fxMNKkgx.js";import{I as A}from"./icon-V4IE3JYq.js";import"./tab-bar-DSCeDNPp.js";const n="forge-tab-bar",S=b("forge-tab-bar-change"),_=b("forge-tab-select");A.define([T,I]);const h={title:"Components/Tabs",render:e=>{const a={...y(e)};e.vertical?a["max-width"]="200px":e.scrollButtons&&(a["max-width"]="500px");const p=Object.entries(a).length?$(a):s,u=Array.from({length:e.scrollButtons?20:3}).map((B,g)=>r`<forge-tab>
        ${e.startIcon?r`<forge-icon slot="start" name="favorite"></forge-icon>`:s}
        Tab ${g+1}
        ${e.endIcon?r`<forge-icon slot="end" name="forge_logo"></forge-icon>`:s}
      </forge-tab>`);return r`
      <forge-tab-bar
        .disabled=${e.disabled}
        .activeTab=${e.activeTab}
        .vertical=${e.vertical}
        .clustered=${e.clustered}
        .stacked=${e.stacked}
        .secondary=${e.secondary}
        .inverted=${e.inverted}
        .autoActivate=${e.autoActivate}
        .scrollButtons=${e.scrollButtons}
        style=${p}
        @forge-tab-bar-change=${S}
        @forge-tab-select=${_}>
        ${u}
      </forge-tab-bar>
    `},component:n,subcomponents:{Tab:"forge-tab"},argTypes:{...v({tagName:n,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,vertical:!1,clustered:!1,stacked:!1,secondary:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},t={},o={args:{secondary:!0}};var c,l,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(i=(l=t.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,f,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    secondary: true
  }
}`,...(m=(f=o.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const x=["Demo","Secondary"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Secondary:o,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{t as D,o as S,L as T};
