import"./lit-element-JplMEnZc.js";import{x as r,E as s}from"./lit-html-paDGiEfB.js";import{a as t}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{g}from"./utils-BgrpGqCf.js";import{f as u,g as w,h as b,i as h}from"./index-CbZAylpk.js";import{I as v}from"./icon-Ctzrqx63.js";import{n as y,e as D}from"./ref-DJjbfkOF.js";import"./feature-detection-ONR9WHvu.js";import"./modal-drawer-BBsDbujp.js";import"./backdrop-BIqxiwQa.js";import"./base-drawer-isrrXfMq.js";import"./list-DjbLwyYT.js";import"./toolbar-Lhya2ayG.js";import"./index-BgGCUUFB.js";import"./scaffold-BAruaYLU.js";import"./card-WC0g-TsN.js";import"./app-bar-profile-button-Bso0FNWk.js";import"./state-layer-CxIpCmDW.js";import"./focus-indicator-I_IrwQSK.js";import"./badge-CzgFSHGZ.js";import"./menu-C6Z4JBtb.js";import"./linear-progress-DPUjJFYN.js";import"./popover-C6QnYMTq.js";import"./overlay-D8lPnEIG.js";import"./skeleton-Dfdgg-pt.js";import"./avatar-Du1LPt_G.js";import"./icon-button-D5fTQ0k5.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),x=t("forge-drawer-after-open"),I=t("forge-drawer-after-close");v.define([u,w,b,h]);const j={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:s,p=o.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:s;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${d}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${y(a)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${$}
          @forge-drawer-after-open=${x}
          @forge-drawer-after-close=${I}>
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
        </forge-modal-drawer>

        <main slot="body">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var f,l,m;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const S=["Demo"],oo=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:S,default:j},Symbol.toStringTag,{value:"Module"}));export{e as D,oo as M};
