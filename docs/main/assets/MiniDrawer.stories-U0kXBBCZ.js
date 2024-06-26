import{x as t,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as h}from"./utils-Dtr3SQvK.js";import{f as v,g as b,h as w,i as y}from"./index-CIZ3m0iD.js";import{I as D}from"./icon-DHVNhAh1.js";import{n as $,e as x}from"./ref-BorTy8X1.js";import"./constants-ngK8be3i.js";import"./mini-drawer-Dib3KHf0.js";import"./list-w9uxrOZD.js";import"./toolbar-tzLxhWM8.js";import"./index-Dh0vMUMR.js";import"./scaffold-Ce6_N1O1.js";import"./card-BC8Ik9n4.js";import"./app-bar-profile-button-DfQ-kIqS.js";import"./state-layer-BisR_hRI.js";import"./focus-indicator-C4Z5XP1c.js";import"./badge-BZranFcT.js";import"./menu-B33KPFUT.js";import"./linear-progress-5Vpr-9_G.js";import"./popover-CnzyzWS6.js";import"./overlay-D7ruZE35.js";import"./skeleton-Cvltx7WE.js";import"./avatar-CwCdFbd4.js";import"./icon-button-DNIpFQC2.js";import"./tooltip-FbyHcKsY.js";const n="forge-mini-drawer",I=g("forge-drawer-after-open"),S=g("forge-drawer-after-close");D.define([v,b,w,y]);const _={title:"Components/Drawer/Mini Drawer",render:o=>{const a=x();function u(){const s=a.value;s.open=!s.open}return t`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${u}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${$(a)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          ?hover=${o.hover}
          @forge-drawer-after-open=${I}
          @forge-drawer-after-close=${S}>
          <aside>
            <forge-list navlist>
              <forge-list-item selected id="tooltip-host-1">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>`}
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-2">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>`}
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-3">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>`}
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
            </forge-list>
          </aside>
        </forge-mini-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...h({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};var p,m,f;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(f=(m=e.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const j=["Demo","Hover"],oo=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:j,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,oo as M};
