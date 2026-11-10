import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{o as i,t as a}from"./icon-CdA8CuQQ.js";import{bt as o,en as s,in as c,t as l,xt as u}from"./tyler-icons-kuH1S-j5.js";import{r as d,t as f}from"./if-defined-B1ve8lTA.js";import{t as p}from"./list-CnYSPteu.js";import{t as m}from"./app-layout-DySHKWgT.js";var h=t({Demo:()=>v,__namedExportsOrder:()=>y,default:()=>_}),g,_,v,y;function b(){return(b=e((()=>{r(),f(),a(),l(),m(),p(),g=`forge-app-layout`,i.define([o,u,s,c]),_={title:`Components/App Layout`,component:g,argTypes:{appTitle:{control:`text`,description:`The title text to display in the app bar`,table:{category:`Properties`}},appTitleHref:{control:`text`,description:`The URL that the app bar title links to`,table:{category:`Properties`}},breakpoint:{control:`number`,description:`The screen width breakpoint in pixels for responsive behavior`,table:{category:`Properties`}}},args:{appTitle:`App Layout Demo`,appTitleHref:void 0,breakpoint:960}},v={render:e=>n`
    <forge-app-layout app-title=${e.appTitle} app-title-href=${d(e.appTitleHref)} breakpoint=${e.breakpoint}>
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
  `},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Demo`]})))()}export{v as n,b as r,h as t};