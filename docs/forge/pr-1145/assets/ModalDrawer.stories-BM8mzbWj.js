import{b as r,A as s}from"./iframe-Debf3RpE.js";import{g as m}from"./utils-Cu3TicFl.js";import{I as c,l as p,m as g,n as u,o as w}from"./tyler-icons-smjcwUxp.js";import"./service-adapter-8tADcN_b.js";import{n as b,e as v}from"./ref-B_rSER_s.js";import"./modal-drawer-DDnthQ-H.js";import"./backdrop-SMwLBDG5.js";import"./base-drawer-BC4bCWjj.js";import"./list-BAXeXT-v.js";import"./toolbar-CpPg4Ncu.js";import"./scaffold-l7cEUk27.js";import"./card-B_cPufRR.js";import"./app-bar-profile-button-DFNHAfUI.js";import"./menu-CMGME8AS.js";import"./linear-progress-BvuLf7up.js";import"./popover-BF-Kcufs.js";import"./overlay-89T5TdFh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CKi6B6Gm.js";import"./avatar-B91fIaYU.js";import"./icon-button-4wqwmjQ1.js";import"./focus-indicator-B4L8Ogqc.js";import"./state-layer-DRsbBcDh.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",h=t("forge-modal-drawer-close"),y=t("forge-drawer-after-open"),D=t("forge-drawer-after-close");c.define([p,g,u,w]);const _={title:"Components/Drawer/Modal Drawer",render:o=>{const a=v();function l(){const i=a.value;i.open=!i.open}const f=o.showHeader?r`
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
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const O=["Demo"],J=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,J as M};
