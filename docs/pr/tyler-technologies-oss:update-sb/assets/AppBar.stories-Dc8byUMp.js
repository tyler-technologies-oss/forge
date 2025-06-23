import{x as c}from"./iframe-BYnq_mNZ.js";import{g as M,s as n,c as F}from"./utils-Dc8t8QJe.js";import{I as T,d as B}from"./icon-ANstxuR5.js";import{s as A}from"./decorators-DcOnSkfu.js";import"./feature-detection-CY6TVbRZ.js";import"./app-bar-profile-button-atKd3EV1.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./menu-C8rNUMJM.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./skeleton-DocRecw2.js";import"./avatar-CfUkmrkk.js";import"./icon-button-BWhggrld.js";import"./expansion-panel-D_Sh7JhR.js";import"./divider-DBTw_7sm.js";import"./button-DKtxCkrw.js";const l="forge-app-bar";T.define([B]);const C={title:"Components/App Bar",render:H=>{const s=F(l,H);s.setAttribute("theme-mode","scoped");const p=document.createElement("forge-icon");return p.setAttribute("slot","logo"),p.setAttribute("name","forge_logo"),s.appendChild(p),s},component:l,parameters:{actions:{disable:!0}},argTypes:{...M({tagName:l,exclude:["target"],controls:{elevation:{type:"string",control:"select",options:["none","raised"]},theme:{type:"string",control:"select",options:["white",""]}}})},args:{titleText:"Tyler Forge",elevation:"raised",theme:"",href:""}},e={},o={...n,render:()=>c`
    <forge-app-bar title-text="Tyler Forge™" theme-mode="scoped">
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
  `},r={...n,args:{theme:"white"}},t={...n,decorators:[A(`
.custom-app-bar {
  --forge-app-bar-background: salmon;
  --forge-app-bar-foreground: black;
}

.custom-app-bar forge-button {
  margin-inline-end: var(--forge-spacing-xsmall);
}
  `)],render:()=>c`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme-mode="scoped">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end" theme="app-bar">Sign In</forge-button>
    </forge-app-bar>
  `},a={...n,render:()=>c`
    <header class="forge-app-bar forge-app-bar--raised">
      <div class="forge-app-bar__section-start">
        <button type="button" class="forge-icon-button" aria-label="Toggle menu">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div class="forge-app-bar__logo-title-container">
          <svg class="forge-icon forge-app-bar__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Forge design system logo</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
          </svg>
          <a href="javascript: void(0);" class="forge-app-bar__title">
            <h1>App Bar</h1>
          </a>
        </div>
      </div>

      <div class="forge-app-bar__section-center">
        <!--
        <div class="forge-app-bar-search">
          <input type="text" placeholder="Search" aria-label="Search" id="app-bar-search" style="width: 256px" />
        </div>
        -->
        <div class="forge-field">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
      </div>

      <div class="forge-app-bar__section-end">
        <button type="button" class="forge-icon-button" aria-label="View user profile">
          <div class="forge-avatar">
            <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  `};var i,g,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(m=(g=e.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var d,f,b;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-app-bar title-text="Tyler Forge™" theme-mode="scoped">
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
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,u,v;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    theme: 'white'
  }
}`,...(v=(u=r.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var w,y,x;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
.custom-app-bar {
  --forge-app-bar-background: salmon;
  --forge-app-bar-foreground: black;
}

.custom-app-bar forge-button {
  margin-inline-end: var(--forge-spacing-xsmall);
}
  \`)],
  render: () => html\`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme-mode="scoped">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end" theme="app-bar">Sign In</forge-button>
    </forge-app-bar>
  \`
}`,...(x=(y=t.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var _,S,z;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <header class="forge-app-bar forge-app-bar--raised">
      <div class="forge-app-bar__section-start">
        <button type="button" class="forge-icon-button" aria-label="Toggle menu">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div class="forge-app-bar__logo-title-container">
          <svg class="forge-icon forge-app-bar__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Forge design system logo</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
          </svg>
          <a href="javascript: void(0);" class="forge-app-bar__title">
            <h1>App Bar</h1>
          </a>
        </div>
      </div>

      <div class="forge-app-bar__section-center">
        <!--
        <div class="forge-app-bar-search">
          <input type="text" placeholder="Search" aria-label="Search" id="app-bar-search" style="width: 256px" />
        </div>
        -->
        <div class="forge-field">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
      </div>

      <div class="forge-app-bar__section-end">
        <button type="button" class="forge-icon-button" aria-label="View user profile">
          <div class="forge-avatar">
            <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  \`
}`,...(z=(S=a.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};const L=["Demo","Full","WhiteTheme","CustomTheme","CSSOnly"],$=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,CustomTheme:t,Demo:e,Full:o,WhiteTheme:r,__namedExportsOrder:L,default:C},Symbol.toStringTag,{value:"Module"}));export{$ as A,t as C,e as D,o as F,r as W,a};
