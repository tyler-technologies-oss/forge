import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-Cygt-aqC.js";import{_ as i,m as a,o,s}from"./utils-C3ow8Ikc.js";import{n as c,t as l}from"./decorators-CIf0wI47.js";import{o as u,t as d}from"./icon-D3E8ATav.js";import{Q as f,t as p}from"./tyler-icons-CLXzO0Q_.js";import{t as m}from"./open-icon-BaEBdMKp.js";import{t as h}from"./expansion-panel-Bq7A-1lF.js";import{t as g}from"./divider-CiigCD-R.js";import{t as _}from"./app-bar-OtDH_Y1e.js";import{t as v}from"./button-BP1asP2i.js";var y=t({CSSOnly:()=>E,CustomTheme:()=>T,Demo:()=>S,Full:()=>C,WhiteTheme:()=>w,__namedExportsOrder:()=>D,default:()=>x}),b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{r(),a(),p(),d(),l(),_(),h(),g(),m(),v(),b=`forge-app-bar`,u.define([f]),x={title:`Components/App Bar`,render:e=>{let t=o(b,e);t.setAttribute(`theme-mode`,`scoped`);let n=document.createElement(`forge-icon`);return n.setAttribute(`slot`,`logo`),n.setAttribute(`name`,`forge_logo`),t.appendChild(n),t},component:b,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:b,exclude:[`target`],controls:{elevation:{type:`string`,control:`select`,options:[`none`,`raised`]},theme:{type:`string`,control:`select`,options:[`white`,``]}}})},args:{titleText:`Tyler Forge`,elevation:`raised`,theme:``,href:``}},S={},C={...i,render:()=>n`
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
  `},w={...i,args:{theme:`white`}},T={...i,decorators:[c(`
.custom-app-bar {
  --forge-app-bar-background: salmon;
  --forge-app-bar-foreground: black;
}

.custom-app-bar forge-button {
  margin-inline-end: var(--forge-spacing-xsmall);
}
  `)],render:()=>n`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme-mode="scoped">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end" theme="app-bar">Sign In</forge-button>
    </forge-app-bar>
  `},E={...i,render:()=>n`
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
  `},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    theme: 'white'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`Demo`,`Full`,`WhiteTheme`,`CustomTheme`,`CSSOnly`]})))()}export{C as a,S as i,E as n,w as o,T as r,O as s,y as t};