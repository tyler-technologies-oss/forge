import{b as r,A as s}from"./iframe-HlIX8nsI.js";import{g as m}from"./utils-DhPatzMP.js";import{I as c,l as p,m as g,n as u,o as w}from"./tyler-icons-B1nAV5VC.js";import"./service-adapter-CoGDs2_3.js";import"./index-DTwfV0k0.js";import{n as b,e as v}from"./ref-DHmNwni-.js";import"./modal-drawer-DJtc-YF3.js";import"./backdrop-oZnGSNKb.js";import"./base-drawer-BE-Z-VKe.js";import"./list-2JCez8nQ.js";import"./toolbar-DZNz2UmX.js";import"./scaffold-WBY1Y1UI.js";import"./card-C7PNSpyL.js";import"./app-bar-profile-button-DxXsoE2G.js";import"./menu-MzeWWlwh.js";import"./linear-progress-Buvtsnzw.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";import"./avatar-CrzMonA2.js";import"./icon-button-kXhWo8t5.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",h=t("forge-modal-drawer-close"),y=t("forge-drawer-after-open"),D=t("forge-drawer-after-close");c.define([p,g,u,w]);const _={title:"Components/Drawer/Modal Drawer",render:o=>{const a=v();function l(){const i=a.value;i.open=!i.open}const f=o.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:s,d=o.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:s;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${l}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${b(a)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${h}
          @forge-drawer-after-open=${y}
          @forge-drawer-after-close=${D}>
          ${f}
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
          ${d}
        </forge-modal-drawer>

        <main slot="body">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const O=["Demo"],G=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,G as M};
