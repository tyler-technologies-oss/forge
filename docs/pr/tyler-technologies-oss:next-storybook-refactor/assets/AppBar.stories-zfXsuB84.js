import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c,g,s as f}from"./constants-BNmdJboH.js";import{t as b}from"./index-fxMNKkgx.js";import{I as u}from"./icon-CC1KhrIk.js";import"./app-bar-profile-button-CuUoD3dB.js";import"./state-layer-UPopKgqP.js";import"./focus-indicator-C5tGHeao.js";import"./index-Dh0vMUMR.js";import"./badge-CbhiNhrj.js";import"./menu-C2HUQBAD.js";import"./linear-progress-M5F_EILZ.js";import"./list-BfmDVRcN.js";import"./popover-Cryb0HFa.js";import"./overlay-Dv66gCFy.js";import"./skeleton-Bg1SO82U.js";import"./profile-card-VVHy9bje.js";import"./avatar-BkitEKI3.js";import"./icon-button-D1qECKOm.js";import"./expansion-panel-CR4RlWHa.js";import"./divider-6h4TZky9.js";const r="forge-app-bar";u.define([b]);const d={title:"Components/App Bar",render:i=>c(r,i),component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},e={},t={...f,render:()=>m`
    <forge-app-bar title-text="Tyler Forge™">
      <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-app-bar-search slot="center">
          <input type="text" placeholder="Search" />
      </forge-app-bar-search>
      <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
      <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
      <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
      <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
    </forge-app-bar>
  `};var o,a,p;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(p=(a=e.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};var n,s,l;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-app-bar title-text="Tyler Forge™">
      <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-app-bar-search slot="center">
          <input type="text" placeholder="Search" />
      </forge-app-bar-search>
      <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
      <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
      <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
      <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
    </forge-app-bar>
  \`
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const h=["Demo","Full"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Full:t,__namedExportsOrder:h,default:d},Symbol.toStringTag,{value:"Module"}));export{N as A,e as D,t as F};
