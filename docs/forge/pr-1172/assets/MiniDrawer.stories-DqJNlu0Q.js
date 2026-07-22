import{A as i,b as t}from"./iframe-ZvzVysMB.js";import{g as f}from"./utils-D5x2rMta.js";import{I as m,l,m as d,n as g,o as u}from"./tyler-icons-H8C0T-24.js";import"./service-adapter-8tADcN_b.js";import{n as h,e as v}from"./ref-9F0ZFO8q.js";import"./mini-drawer-CgzMGYo3.js";import"./list-BXM5oFgP.js";import"./toolbar-CgcJD7J8.js";import"./scaffold-BxvL1G0m.js";import"./card-B0LsWTph.js";import"./app-bar-profile-button-CUxb0Xdj.js";import"./menu-iIi5F8Tp.js";import"./linear-progress-Bb0VsHdX.js";import"./popover-qCA9PGyj.js";import"./overlay-DZcAclZS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-QEOzuRnR.js";import"./avatar-CogGad_2.js";import"./icon-button-wfw28VlB.js";import"./tooltip-D6dXzQ5h.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,n="forge-mini-drawer",b=p("forge-drawer-after-open"),w=p("forge-drawer-after-close");m.define([l,d,g,u]);const y={title:"Components/Drawer/Mini Drawer",render:o=>{const a=v();function c(){const s=a.value;s.open=!s.open}return t`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${c}></forge-app-bar-menu-button>
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
    `},component:n,argTypes:{...f({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...r.parameters?.docs?.source}}};const D=["Demo","Hover"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:D,default:y},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,P as M};
