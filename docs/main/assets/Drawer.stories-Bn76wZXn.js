import{x as r,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-SjbeXOvg.js";import{f as u,g as b,h,i as v}from"./index-TSSE1zcJ.js";import{I as w}from"./icon-DdNu5rAq.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./constants-CmaEVTEu.js";import"./drawer-Buamlc4X.js";import"./list-BN1qzEIh.js";import"./toolbar-Ckx80VFe.js";import"./index-Dh0vMUMR.js";import"./scaffold-D4eQ8OsK.js";import"./card-DN6gyC_G.js";import"./app-bar-profile-button-NisAwVBO.js";import"./state-layer-DjEoH8hN.js";import"./focus-indicator-CexacDHl.js";import"./badge-DUiuLNeW.js";import"./menu-DxWd_cMI.js";import"./linear-progress-DkhIk2Qx.js";import"./popover-D076uhwZ.js";import"./overlay-CmQ6MvbI.js";import"./skeleton-Cpc63rts.js";import"./profile-card-CWkUoN41.js";import"./avatar-By8UD2iO.js";import"./icon-button-Cqg7QjNu.js";const s="forge-drawer",$=l("forge-drawer-after-open"),x=l("forge-drawer-after-close");w.define([u,b,h,v]);const I={title:"Components/Drawer",render:o=>{const t=D();function d(){const a=t.value;a.open=!a.open}const p=o.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:i,c=o.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:i;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${d}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${y(t)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          @forge-drawer-after-open=${$}
          @forge-drawer-after-close=${x}>
          ${p}
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
          ${c}
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:s,argTypes:{...g({tagName:s,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var n,f,m;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const j=["Demo"],Y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:j,default:I},Symbol.toStringTag,{value:"Module"}));export{Y as D,e as a};
