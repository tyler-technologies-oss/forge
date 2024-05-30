import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as b,g as c,s as u}from"./constants-D0Eltsy8.js";import"./app-bar-profile-button-aUjPhQEZ.js";import"./state-layer-B1BJyO_z.js";import"./focus-indicator-D_TCP8aG.js";import"./index-Dh0vMUMR.js";import"./badge-udvwCbMS.js";import"./icon-C1xqk65D.js";import"./menu-CnOLap_o.js";import"./linear-progress-ePNFw6tT.js";import"./list-CqyEZ-EU.js";import"./popover-D-4moE3V.js";import"./overlay-ax6hnCXS.js";import"./skeleton-CqMXvMAT.js";import"./profile-card-CgtgNL_j.js";import"./avatar-CVnPlMlp.js";import"./icon-button-CMwP1Xva.js";import"./expansion-panel-SfT5fTXD.js";import"./divider-pndLrL9C.js";const r="forge-app-bar",f={title:"Components/App Bar",render:i=>b(r,i),component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},t={},e={...u,render:()=>m`
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
