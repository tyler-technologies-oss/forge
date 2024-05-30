import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as b,g as c,s as u}from"./constants-BUdimubM.js";import"./app-bar-profile-button-DYHWDdla.js";import"./state-layer-C7V9cEd6.js";import"./focus-indicator-Cg33mmfZ.js";import"./index-Dh0vMUMR.js";import"./badge-BYmPL116.js";import"./icon-DXhnJPk9.js";import"./menu-BKwpW-EP.js";import"./linear-progress-DoEeOVMF.js";import"./list-BWKIXsy4.js";import"./popover-DMAs2O2p.js";import"./overlay-2yHd7_XA.js";import"./skeleton-Dgko7kt1.js";import"./profile-card-Cp-AouJd.js";import"./avatar-DPEesIcS.js";import"./icon-button-DCjW2QNR.js";import"./expansion-panel-vO-FWAwZ.js";import"./divider-xN3Df2_K.js";const r="forge-app-bar",f={title:"Components/App Bar",render:i=>b(r,i),component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},t={},e={...u,render:()=>m`
  <forge-app-bar title-text="Tyler Forge">
    <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
    <forge-app-bar-search slot="center">
        <input type="text" placeholder="Search" />
    </forge-app-bar-search>
    <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
    <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
    <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
    <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
  </forge-app-bar>
  `};var o,a,p;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(p=(a=t.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};var n,s,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
  <forge-app-bar title-text="Tyler Forge">
    <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
    <forge-app-bar-search slot="center">
        <input type="text" placeholder="Search" />
    </forge-app-bar-search>
    <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
    <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
    <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
    <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
  </forge-app-bar>
  \`
}`,...(l=(s=e.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const g=["Demo","Full"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Full:e,__namedExportsOrder:g,default:f},Symbol.toStringTag,{value:"Module"}));export{M as A,t as D,e as F};
