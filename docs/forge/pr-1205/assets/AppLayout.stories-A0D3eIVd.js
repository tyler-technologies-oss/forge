import{b as o}from"./iframe-CCQPwMqK.js";import{o as r}from"./if-defined-C6PdQzU_.js";import"./service-adapter-DlT-lJx7.js";import{I as i,e as a,f as s,d as n,g as p}from"./tyler-icons-D_P4inVM.js";import"./app-layout-cTBEQ0YD.js";import"./list-DoWEQWCg.js";import"./list-item-BE2FE9nz.js";const l="forge-app-layout";i.define([a,s,n,p]);const f={title:"Components/App Layout",component:l,argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},appTitleHref:{control:"text",description:"The URL that the app bar title links to",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}}},args:{appTitle:"App Layout Demo",appTitleHref:void 0,breakpoint:960}},e={render:t=>o`
    <forge-app-layout app-title=${t.appTitle} app-title-href=${r(t.appTitleHref)} breakpoint=${t.breakpoint}>
      <forge-list navlist slot="navigation" data-forge-app-layout-close>
        <forge-list-item>
          <forge-icon slot="start" name="home"></forge-icon>
          <a href="javascript: void(0);">Home</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="inbox"></forge-icon>
          <a href="javascript: void(0);">Inbox</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="star"></forge-icon>
          <a href="javascript: void(0);">Starred</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="settings"></forge-icon>
          <a href="javascript: void(0);">Settings</a>
        </forge-list-item>
      </forge-list>

      <div style="padding: var(--forge-spacing-medium);" slot="body">
        <p class="forge-typography--body1">Resize the frame to see the responsive behavior</p>
      </div>
    </forge-app-layout>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <forge-app-layout app-title=\${args.appTitle} app-title-href=\${ifDefined(args.appTitleHref)} breakpoint=\${args.breakpoint}>
      <forge-list navlist slot="navigation" data-forge-app-layout-close>
        <forge-list-item>
          <forge-icon slot="start" name="home"></forge-icon>
          <a href="javascript: void(0);">Home</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="inbox"></forge-icon>
          <a href="javascript: void(0);">Inbox</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="star"></forge-icon>
          <a href="javascript: void(0);">Starred</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="settings"></forge-icon>
          <a href="javascript: void(0);">Settings</a>
        </forge-list-item>
      </forge-list>

      <div style="padding: var(--forge-spacing-medium);" slot="body">
        <p class="forge-typography--body1">Resize the frame to see the responsive behavior</p>
      </div>
    </forge-app-layout>
  \`
}`,...e.parameters?.docs?.source}}};const g=["Demo"],u=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:g,default:f},Symbol.toStringTag,{value:"Module"}));export{u as A,e as D};
