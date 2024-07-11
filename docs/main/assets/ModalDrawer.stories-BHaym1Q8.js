import{x as r,T as s}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as t}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-BeGdvWla.js";import{f as u,g as w,h as b,i as h}from"./index-CIZ3m0iD.js";import{I as v}from"./icon-DjINFoyU.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./constants-DjE6emXm.js";import"./modal-drawer-BCPGWW-E.js";import"./backdrop-BKmy5m9d.js";import"./base-drawer-DwK-FFWu.js";import"./list-D6JyyFFB.js";import"./toolbar-SJpnF1yY.js";import"./index-Dh0vMUMR.js";import"./scaffold-R2qvsZCm.js";import"./card-AhK8i1VF.js";import"./app-bar-profile-button-GYz8YSGe.js";import"./state-layer-D8bHAvjj.js";import"./focus-indicator-BPFZRBe9.js";import"./badge-TZPsSqfc.js";import"./menu-wrTesoyS.js";import"./linear-progress-CVy9jv9h.js";import"./popover-Cuxqrsc4.js";import"./overlay-CyEwb-fW.js";import"./skeleton-yxWgwnDD.js";import"./avatar-9nkaewEO.js";import"./icon-button-B2LQlK1e.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),x=t("forge-drawer-after-open"),I=t("forge-drawer-after-close");v.define([u,w,b,h]);const j={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
