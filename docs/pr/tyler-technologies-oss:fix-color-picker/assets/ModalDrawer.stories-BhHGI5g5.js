import{x as r,E as s}from"./iframe-DR_NrJWq.js";import{g}from"./utils-CwQ2mEzo.js";import{I as u,k as w,l as b,m as v,n as h}from"./icon-ANstxuR5.js";import{n as y,e as D}from"./ref-BYG0RNTX.js";import"./feature-detection-CY6TVbRZ.js";import"./modal-drawer-XYvP5Fib.js";import"./backdrop-Bv12Tb1U.js";import"./base-drawer-C68FwRuM.js";import"./list-DCzhHkfW.js";import"./toolbar-CJj-iw1_.js";import"./index-CiLSBptl.js";import"./scaffold-BjMvQLbF.js";import"./card-F9a7MO8H.js";import"./app-bar-profile-button-8TwQ2njj.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./menu-BO16VTvD.js";import"./linear-progress-CJb_8skk.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./skeleton-DocRecw2.js";import"./avatar-CqFXrQd5.js";import"./icon-button-BWhggrld.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",_=t("forge-modal-drawer-close"),O=t("forge-drawer-after-open"),$=t("forge-drawer-after-close");u.define([w,b,v,h]);const I={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function m(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
          <forge-app-bar-menu-button slot="start" @click=${m}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${y(a)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${_}
          @forge-drawer-after-open=${O}
          @forge-drawer-after-close=${$}>
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
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var l,f,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(d=(f=e.parameters)==null?void 0:f.docs)==null?void 0:d.source}}};const x=["Demo"],V=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:x,default:I},Symbol.toStringTag,{value:"Module"}));export{e as D,V as M};
