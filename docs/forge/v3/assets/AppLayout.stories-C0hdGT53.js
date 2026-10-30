import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-B8S20_VI.js";import{o as i,t as a}from"./icon-BDzt98o-.js";import{Jt as o,Zt as s,ht as c,mt as l,t as u}from"./tyler-icons-CLXzO0Q_.js";import{t as d}from"./list-BhPtz8Gm.js";import{r as f,t as p}from"./if-defined-B1ve8lTA.js";import{t as m}from"./app-layout-Bdz-vRNO.js";var h=t({Demo:()=>v,__namedExportsOrder:()=>y,default:()=>_}),g,_,v,y;function b(){return(b=e((()=>{r(),p(),a(),u(),m(),d(),g=`forge-app-layout`,i.define([l,c,o,s]),_={title:`Components/App Layout`,component:g,argTypes:{appTitle:{control:`text`,description:`The title text to display in the app bar`,table:{category:`Properties`}},appTitleHref:{control:`text`,description:`The URL that the app bar title links to`,table:{category:`Properties`}},breakpoint:{control:`number`,description:`The screen width breakpoint in pixels for responsive behavior`,table:{category:`Properties`}}},args:{appTitle:`App Layout Demo`,appTitleHref:void 0,breakpoint:960}},v={render:e=>n`
    <forge-app-layout app-title=${e.appTitle} app-title-href=${f(e.appTitleHref)} breakpoint=${e.breakpoint}>
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