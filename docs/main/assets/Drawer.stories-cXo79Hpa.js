import{x as r,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-Dtr3SQvK.js";import{f as u,g as b,h,i as v}from"./index-CIZ3m0iD.js";import{I as w}from"./icon-DHVNhAh1.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./constants-ngK8be3i.js";import"./drawer-Bpov1tN_.js";import"./list-w9uxrOZD.js";import"./toolbar-tzLxhWM8.js";import"./index-Dh0vMUMR.js";import"./scaffold-Ce6_N1O1.js";import"./card-BC8Ik9n4.js";import"./app-bar-profile-button-DfQ-kIqS.js";import"./state-layer-BisR_hRI.js";import"./focus-indicator-C4Z5XP1c.js";import"./badge-BZranFcT.js";import"./menu-B33KPFUT.js";import"./linear-progress-5Vpr-9_G.js";import"./popover-CnzyzWS6.js";import"./overlay-D7ruZE35.js";import"./skeleton-Cvltx7WE.js";import"./avatar-CwCdFbd4.js";import"./icon-button-DNIpFQC2.js";const s="forge-drawer",$=l("forge-drawer-after-open"),x=l("forge-drawer-after-close");w.define([u,b,h,v]);const I={title:"Components/Drawer",render:o=>{const t=D();function d(){const a=t.value;a.open=!a.open}const c=o.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:i,p=o.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:i;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${d}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${y(t)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          @forge-drawer-after-open=${$}
          @forge-drawer-after-close=${x}>
          ${c}
          <aside>
            <forge-list navlist>
              <forge-list-item selected>
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Outgoing</a>
              </forge-list-item>
              <forge-list-item indented>
                <a href="javascript: void(0)">Pending</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
            </forge-list>
          </aside>
          ${p}
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:s,argTypes:{...g({tagName:s,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var n,f,m;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const j=["Demo"],X=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:j,default:I},Symbol.toStringTag,{value:"Module"}));export{X as D,e as a};
