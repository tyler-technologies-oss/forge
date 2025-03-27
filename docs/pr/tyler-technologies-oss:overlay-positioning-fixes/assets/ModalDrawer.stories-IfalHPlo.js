import"./lit-element-B3QVTycr.js";import{x as r,E as s}from"./lit-html-CuBe1DX_.js";import{a as t}from"./index-B-lxVbXh.js";import{g}from"./utils-BoQ7h7ND.js";import{j as u,k as w,l as b,m as v}from"./index-RsKXMDm2.js";import{I as h}from"./icon-DNSPAaK0.js";import{n as y,e as D}from"./ref-BHdy32Cl.js";import"./feature-detection-C61kIZu7.js";import"./modal-drawer-DMNToFix.js";import"./backdrop-UaagznG1.js";import"./base-drawer-UQyrssvq.js";import"./list-Bo9PHw-V.js";import"./toolbar-CM1YCrRV.js";import"./index-CiLSBptl.js";import"./scaffold-CWDbFKLY.js";import"./card-CmSOzucO.js";import"./app-bar-profile-button-Bo28iW7z.js";import"./state-layer-DA2sYK0k.js";import"./focus-indicator-B_9E-jM6.js";import"./badge-DmYwJsoi.js";import"./menu-C1mUnqqH.js";import"./linear-progress-Brg7kVg_.js";import"./popover-Dh1-Do6h.js";import"./overlay-B56HkyOr.js";import"./skeleton-Cfb12itF.js";import"./avatar-CawfXDqL.js";import"./icon-button-BgvK8Gih.js";const n="forge-modal-drawer",$=t("forge-modal-drawer-close"),j=t("forge-drawer-after-open"),x=t("forge-drawer-after-close");h.define([u,w,b,v]);const I={title:"Components/Drawer/Modal Drawer",render:o=>{const a=D();function d(){const i=a.value;i.open=!i.open}const c=o.showHeader?r`
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
          @forge-drawer-after-open=${j}
          @forge-drawer-after-close=${x}>
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
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var l,f,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const S=["Demo"],oo=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:S,default:I},Symbol.toStringTag,{value:"Module"}));export{e as D,oo as M};
