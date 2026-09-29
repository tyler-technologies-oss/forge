import{A as i,b as t}from"./iframe-B0EMVDc7.js";import{g as c}from"./utils-Dx9-RsVp.js";import{f,p as l,q as d,r as g}from"./tyler-icons-BSgf1RSL.js";import"./service-adapter-8tADcN_b.js";import{I as u}from"./icon-C1AADWlB.js";import{n as h,e as v}from"./ref-D9oVd9KH.js";import"./mini-drawer-Dj8wQkgb.js";import"./list-B3Ua5Jq9.js";import"./list-item-CqtgjLMz.js";import"./toolbar-D8HmtTbd.js";import"./scaffold-ua4VSBPI.js";import"./card-B9NJkrSg.js";import"./app-bar-menu-button-Bz0TYTpE.js";import"./app-bar-profile-button-DqfWQLzf.js";import"./menu-DW_0Y_u0.js";import"./linear-progress-kQO48laS.js";import"./popover-Dj3mHcTQ.js";import"./overlay-BiMQPje5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-O3NFwJYz.js";import"./avatar-AChA-iGf.js";import"./icon-button-Cfus7nrp.js";import"./tooltip-DvlG9nEu.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,n="forge-mini-drawer",b=p("forge-drawer-after-open"),w=p("forge-drawer-after-close");u.define([f,l,d,g]);const y={title:"Components/Drawer/Mini Drawer",render:o=>{const a=v();function m(){const s=a.value;s.open=!s.open}return t`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${m}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${h(a)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          ?hover=${o.hover}
          @forge-drawer-after-open=${b}
          @forge-drawer-after-close=${w}>
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
    `},component:n,argTypes:{...c({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...r.parameters?.docs?.source}}};const D=["Demo","Hover"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:D,default:y},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,F as M};
