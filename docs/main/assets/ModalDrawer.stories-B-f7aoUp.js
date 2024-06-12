import{x as r,T as s}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as t}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-C7XotN6S.js";import{f as u,g as w,h as b,i as h}from"./index-TSSE1zcJ.js";import{I as v}from"./icon-DdNu5rAq.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./constants-CmaEVTEu.js";import"./modal-drawer-DAGRaxcb.js";import"./backdrop-CtoG1b-d.js";import"./base-drawer-DQPqZiUQ.js";import"./list-BN1qzEIh.js";import"./toolbar-Ckx80VFe.js";import"./index-Dh0vMUMR.js";import"./scaffold-D4eQ8OsK.js";import"./card-DN6gyC_G.js";import"./app-bar-profile-button-NisAwVBO.js";import"./state-layer-DjEoH8hN.js";import"./focus-indicator-CexacDHl.js";import"./badge-DUiuLNeW.js";import"./menu-DxWd_cMI.js";import"./linear-progress-DkhIk2Qx.js";import"./popover-D076uhwZ.js";import"./overlay-CmQ6MvbI.js";import"./skeleton-Cpc63rts.js";import"./profile-card-CWkUoN41.js";import"./avatar-By8UD2iO.js";import"./icon-button-Cqg7QjNu.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),x=t("forge-drawer-after-open"),I=t("forge-drawer-after-close");v.define([u,w,b,h]);const j={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var f,l,m;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const S=["Demo"],eo=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:S,default:j},Symbol.toStringTag,{value:"Module"}));export{e as D,eo as M};
