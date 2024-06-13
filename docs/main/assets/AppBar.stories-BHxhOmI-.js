import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c,g,s as f}from"./utils-Cceq4NFH.js";import{t as b}from"./index-fxMNKkgx.js";import{I as u}from"./icon-CRQudG-b.js";import"./constants-D32Jr2uy.js";import"./app-bar-profile-button-B1wScxS0.js";import"./state-layer-BRvIemvG.js";import"./focus-indicator-DCOk5mvy.js";import"./index-Dh0vMUMR.js";import"./badge-D_3MDpIf.js";import"./menu-CZIO_1KM.js";import"./linear-progress-DDuiLuf_.js";import"./list-dUPbNzHI.js";import"./popover-fL2nRo2T.js";import"./overlay-DiKhgH_u.js";import"./skeleton-BaEsbVV3.js";import"./profile-card-iLELcfNr.js";import"./avatar-DwiD4Mn-.js";import"./icon-button-BIREJzI3.js";import"./expansion-panel-D2Iuz2e0.js";import"./divider-Cv-LZSeV.js";const r="forge-app-bar";u.define([b]);const d={title:"Components/App Bar",render:i=>c(r,i),component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},e={},t={...f,render:()=>m`
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
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const h=["Demo","Full"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Full:t,__namedExportsOrder:h,default:d},Symbol.toStringTag,{value:"Module"}));export{k as A,e as D,t as F};
