import{b as r,A as s}from"./iframe-BBqNUtqv.js";import{g as m}from"./utils-BiqwBWR2.js";import{I as c,l as p,m as g,n as u,o as w}from"./tyler-icons-fQPhzpbf.js";import"./service-adapter-8tADcN_b.js";import"./icon-BeLCtqW2.js";import{n as b,e as v}from"./ref-BmdVJOHD.js";import"./modal-drawer-CAkQ99Lk.js";import"./backdrop-GUiAqIjQ.js";import"./base-drawer-CUYrr1Bq.js";import"./list-mhgDPYym.js";import"./toolbar-BXFK3ZY8.js";import"./scaffold-D43obOQJ.js";import"./card-DuBAKo1q.js";import"./app-bar-profile-button-DO8LPKFt.js";import"./menu-C2B6p4S0.js";import"./linear-progress-BFUUfMoR.js";import"./popover-By2PcE5Z.js";import"./overlay-CRZNSrJB.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-PgUpsvgP.js";import"./avatar-Moz453hk.js";import"./icon-button-ChuE_xy5.js";import"./focus-indicator-CE-2THdp.js";import"./state-layer-Cd1l0S13.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",h=t("forge-modal-drawer-close"),y=t("forge-drawer-after-open"),D=t("forge-drawer-after-close");c.define([p,g,u,w]);const _={title:"Components/Drawer/Modal Drawer",render:o=>{const a=v();function l(){const i=a.value;i.open=!i.open}const f=o.showHeader?r`
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
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const O=["Demo"],Q=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,Q as M};
