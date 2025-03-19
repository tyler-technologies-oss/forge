import"./lit-element-JplMEnZc.js";import{x as r,E as s}from"./lit-html-paDGiEfB.js";import{a as t}from"./index-Cf3axooF.js";import{g}from"./utils-C0KK1NN_.js";import{f as u,g as w,h as b,i as h}from"./index-ByifSpfC.js";import{I as v}from"./icon-CND1_bFA.js";import{n as y,e as D}from"./ref-DJjbfkOF.js";import"./feature-detection-DRCh51Sa.js";import"./modal-drawer-CQEWYUKw.js";import"./backdrop-CpAR1sZH.js";import"./base-drawer-D_rU1eC7.js";import"./list-taWGoVxz.js";import"./toolbar-DrgqBcwu.js";import"./index-CiLSBptl.js";import"./scaffold-D66s8WNO.js";import"./card-C10NOeAn.js";import"./app-bar-profile-button-C1Qxnv8b.js";import"./state-layer-DCupnvce.js";import"./focus-indicator-BjVpbo_K.js";import"./badge-Dp1fyGkw.js";import"./menu-D3cpy8Jn.js";import"./linear-progress-CqfIuBkR.js";import"./popover-TwkKUBh9.js";import"./overlay-B9ywocRd.js";import"./skeleton-D2S3-1Sc.js";import"./avatar-D_XGi29H.js";import"./icon-button-DmyR8RGa.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),x=t("forge-drawer-after-open"),I=t("forge-drawer-after-close");v.define([u,w,b,h]);const j={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
