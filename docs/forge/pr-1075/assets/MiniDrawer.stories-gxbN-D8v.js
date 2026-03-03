import{A as i,b as t}from"./iframe-Cyv46XVN.js";import{g as m}from"./utils-DJF5Ajxq.js";import{I as f,l,m as d,n as g,o as u}from"./tyler-icons-DG1d6qey.js";import"./service-adapter-8tADcN_b.js";import"./index-DTwfV0k0.js";import{n as h,e as v}from"./ref-CHN4o2DD.js";import"./mini-drawer-CjKFhsAv.js";import"./list-D1-mbE3Z.js";import"./toolbar-DJfFE6T6.js";import"./scaffold-BiMWLKK6.js";import"./card-C0O6oq61.js";import"./app-bar-profile-button-BcsoOtOP.js";import"./state-layer-D_bEeiyc.js";import"./focus-indicator-C-z2W46n.js";import"./menu-BaqIo4hA.js";import"./linear-progress-CYTe6uKP.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";import"./avatar-DB5sNku1.js";import"./icon-button-DK-pXUTf.js";import"./tooltip-BQwGelzj.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,n="forge-mini-drawer",b=p("forge-drawer-after-open"),w=p("forge-drawer-after-close");f.define([l,d,g,u]);const y={title:"Components/Drawer/Mini Drawer",render:o=>{const a=v();function c(){const s=a.value;s.open=!s.open}return t`
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
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...r.parameters?.docs?.source}}};const D=["Demo","Hover"],U=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:D,default:y},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,U as M};
