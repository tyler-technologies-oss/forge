import{b as r,A as s}from"./iframe-B0EMVDc7.js";import{g as m}from"./utils-Dx9-RsVp.js";import{f as c,p,q as g,r as u}from"./tyler-icons-BSgf1RSL.js";import"./service-adapter-8tADcN_b.js";import{I as w}from"./icon-C1AADWlB.js";import{n as b,e as v}from"./ref-D9oVd9KH.js";import"./modal-drawer-B7CU3QM4.js";import"./backdrop-C9lBlb_d.js";import"./base-drawer-L9q0-_V8.js";import"./list-B3Ua5Jq9.js";import"./list-item-CqtgjLMz.js";import"./toolbar-D8HmtTbd.js";import"./scaffold-ua4VSBPI.js";import"./card-B9NJkrSg.js";import"./app-bar-menu-button-Bz0TYTpE.js";import"./app-bar-profile-button-DqfWQLzf.js";import"./menu-DW_0Y_u0.js";import"./linear-progress-kQO48laS.js";import"./popover-Dj3mHcTQ.js";import"./overlay-BiMQPje5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-O3NFwJYz.js";import"./avatar-AChA-iGf.js";import"./icon-button-Cfus7nrp.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",h=t("forge-modal-drawer-close"),y=t("forge-drawer-after-open"),D=t("forge-drawer-after-close");w.define([c,p,g,u]);const _={title:"Components/Drawer/Modal Drawer",render:o=>{const a=v();function f(){const i=a.value;i.open=!i.open}const l=o.showHeader?r`
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
          <forge-app-bar-menu-button slot="start" @click=${f}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${b(a)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${h}
          @forge-drawer-after-open=${y}
          @forge-drawer-after-close=${D}>
          ${l}
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
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const O=["Demo"],Q=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,Q as M};
