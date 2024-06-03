import{x as r,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./constants-DsWS7qYA.js";import{b as u,c as b,d as v,e as w}from"./index-DtXrtb0D.js";import{I as h}from"./icon-CeIYyYqo.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./drawer-BGG51lnq.js";import"./list-BV_o04GS.js";import"./toolbar-Ezl4IgP3.js";import"./index-Dh0vMUMR.js";import"./scaffold-CxWoWixi.js";import"./card-CdpCB3L5.js";import"./app-bar-profile-button-nMF-ogas.js";import"./state-layer-5aAa94dU.js";import"./focus-indicator-wpKDCgcD.js";import"./badge-B0vn9zje.js";import"./menu-Cw6D5-OB.js";import"./linear-progress-DKdWLu37.js";import"./popover-C8scOPq7.js";import"./overlay-D8q0xwMn.js";import"./skeleton-BNerg0to.js";import"./profile-card-CVOvmG44.js";import"./avatar-CJgxM7e3.js";import"./icon-button-dWrQYVT_.js";const s="forge-drawer",$=d("forge-drawer-after-open"),x=d("forge-drawer-after-close");h.define([u,b,v,w]);const I={title:"Components/Drawer",render:o=>{const t=D();function l(){const a=t.value;a.open=!a.open}const c=o.showHeader?r`
      <forge-toolbar slot="header">
        <div>Header</div>
      </forge-toolbar>
    `:i,p=o.showFooter?r`
      <forge-toolbar inverted slot="footer">
        <div>Footer</div>
      </forge-toolbar>
    `:i;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${l}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${y(t)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          @forge-drawer-after-open=${$}
          @forge-drawer-after-close=${x}
          >
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
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:s,argTypes:{...g({tagName:s,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var n,f,m;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const j=["Demo"],X=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:j,default:I},Symbol.toStringTag,{value:"Module"}));export{X as D,e as a};
