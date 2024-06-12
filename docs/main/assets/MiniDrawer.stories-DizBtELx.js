import{x as t,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as h}from"./utils-C7XotN6S.js";import{f as v,g as b,h as w,i as y}from"./index-TSSE1zcJ.js";import{I as D}from"./icon-DdNu5rAq.js";import{n as $,e as x}from"./ref-BorTy8X1.js";import"./constants-CmaEVTEu.js";import"./mini-drawer-Cyq-aAAs.js";import"./list-BN1qzEIh.js";import"./toolbar-Ckx80VFe.js";import"./index-Dh0vMUMR.js";import"./scaffold-D4eQ8OsK.js";import"./card-DN6gyC_G.js";import"./app-bar-profile-button-NisAwVBO.js";import"./state-layer-DjEoH8hN.js";import"./focus-indicator-CexacDHl.js";import"./badge-DUiuLNeW.js";import"./menu-DxWd_cMI.js";import"./linear-progress-DkhIk2Qx.js";import"./popover-D076uhwZ.js";import"./overlay-CmQ6MvbI.js";import"./skeleton-Cpc63rts.js";import"./profile-card-CWkUoN41.js";import"./avatar-By8UD2iO.js";import"./icon-button-Cqg7QjNu.js";import"./tooltip-CLVVSytH.js";const n="forge-mini-drawer",I=g("forge-drawer-after-open"),S=g("forge-drawer-after-close");D.define([v,b,w,y]);const _={title:"Components/Drawer/Mini Drawer",render:o=>{const a=x();function u(){const s=a.value;s.open=!s.open}return t`
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
    `},component:n,argTypes:{...h({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},r={},e={args:{hover:!0}};var p,m,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(f=(m=r.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var c,l,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(d=(l=e.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const j=["Demo","Hover"],ro=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,Hover:e,__namedExportsOrder:j,default:_},Symbol.toStringTag,{value:"Module"}));export{r as D,e as H,ro as M};
