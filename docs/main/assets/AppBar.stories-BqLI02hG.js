import{x}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as T,g as _,s as p}from"./utils-CpZ1flO4.js";import{t as w}from"./index-fxMNKkgx.js";import{I as k}from"./icon-DjINFoyU.js";import{s as A}from"./decorators-EVhofM2Q.js";import"./constants-DjE6emXm.js";import"./app-bar-profile-button-GYz8YSGe.js";import"./state-layer-D8bHAvjj.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./badge-TZPsSqfc.js";import"./menu-wrTesoyS.js";import"./linear-progress-CVy9jv9h.js";import"./list-D6JyyFFB.js";import"./popover-Cuxqrsc4.js";import"./overlay-CyEwb-fW.js";import"./skeleton-yxWgwnDD.js";import"./avatar-9nkaewEO.js";import"./icon-button-B2LQlK1e.js";import"./expansion-panel-BAlKgDPC.js";import"./divider-V8nRRqMS.js";import"./button-BZEZMHKM.js";const n="forge-app-bar";k.define([w]);const C={title:"Components/App Bar",render:F=>{const s=T(n,F),a=document.createElement("forge-icon");return a.setAttribute("slot","logo"),a.setAttribute("name","forge_logo"),s.appendChild(a),s},component:n,parameters:{actions:{disable:!0}},argTypes:{..._({tagName:n,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},e={},r={...p,render:()=>x`
    <forge-app-bar title-text="Tyler Forge™" theme="custom">
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
  `},o={...p,args:{theme:"white"}},t={...p,decorators:[A(`
      .custom-app-bar {
        --forge-app-bar-background: whitesmoke;
        --forge-app-bar-foreground: darkblue;
        --forge-theme-primary: orangered;
      }
  `)],render:()=>x`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme="custom">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end">Sign In</forge-button>
    </forge-app-bar>
  `};var l,m,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(i=(m=e.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var g,c,u;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-app-bar title-text="Tyler Forge™" theme="custom">
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
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var f,b,d;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    theme: 'white'
  }
}`,...(d=(b=o.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var h,y,S;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
      .custom-app-bar {
        --forge-app-bar-background: whitesmoke;
        --forge-app-bar-foreground: darkblue;
        --forge-theme-primary: orangered;
      }
  \`)],
  render: () => html\`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme="custom">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end">Sign In</forge-button>
    </forge-app-bar>
  \`
}`,...(S=(y=t.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};const v=["Demo","Full","WhiteTheme","CustomTheme"],Z=Object.freeze(Object.defineProperty({__proto__:null,CustomTheme:t,Demo:e,Full:r,WhiteTheme:o,__namedExportsOrder:v,default:C},Symbol.toStringTag,{value:"Module"}));export{Z as A,t as C,e as D,r as F,o as W};
