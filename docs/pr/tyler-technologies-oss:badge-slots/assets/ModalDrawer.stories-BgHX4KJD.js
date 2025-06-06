import"./lit-element-BuSzPo2N.js";import{x as r,E as s}from"./lit-html-Ox1a2bD1.js";import{a as t}from"./index-B-lxVbXh.js";import{g}from"./utils-C9ubTmun.js";import{I as u,l as w,m as b,n as v,o as h}from"./icon-Bqgt-0wI.js";import{n as y,e as D}from"./ref-DxjK-Y8K.js";import"./feature-detection-CY6TVbRZ.js";import"./modal-drawer-XYvP5Fib.js";import"./backdrop-Bv12Tb1U.js";import"./base-drawer-C68FwRuM.js";import"./list-DCzhHkfW.js";import"./toolbar-CJj-iw1_.js";import"./index-CiLSBptl.js";import"./scaffold-BjMvQLbF.js";import"./card-Cvm6cje1.js";import"./app-bar-profile-button-DmiB2VeR.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./menu-DoGfQb_z.js";import"./linear-progress-CJb_8skk.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";import"./avatar-J3yRSZ-u.js";import"./icon-button-BkG6pY8m.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),x=t("forge-drawer-after-open"),I=t("forge-drawer-after-close");u.define([w,b,v,h]);const j={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var l,f,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const S=["Demo"],Y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:S,default:j},Symbol.toStringTag,{value:"Module"}));export{e as D,Y as M};
