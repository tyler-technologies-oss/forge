import{x as r,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-D8HxbzAZ.js";import{c as u,d as b,e as v,f as w}from"./index-CWt9cj6R.js";import{I as h}from"./icon-CiIDkczu.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./constants-BMnwgo1j.js";import"./drawer-CPahDgEn.js";import"./list-CoNOG_pF.js";import"./toolbar-ByH3IRVo.js";import"./index-Dh0vMUMR.js";import"./scaffold-BBmmvCn_.js";import"./card-Cja0MT5V.js";import"./app-bar-profile-button-Brk_4Sfz.js";import"./state-layer-CoXZFfb6.js";import"./focus-indicator-WHVXAnYX.js";import"./badge-K8SYk47I.js";import"./menu-BGjpcIqp.js";import"./linear-progress-DNEsMXxT.js";import"./popover-BDS33NIt.js";import"./overlay-BEOKbUF9.js";import"./skeleton-Cd3epQA8.js";import"./profile-card-C5jNN8AA.js";import"./avatar-ByFQ3pzx.js";import"./icon-button-HggojrXv.js";const s="forge-drawer",$=d("forge-drawer-after-open"),x=d("forge-drawer-after-close");h.define([u,b,v,w]);const I={title:"Components/Drawer",render:o=>{const t=D();function l(){const a=t.value;a.open=!a.open}const c=o.showHeader?r`
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
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:s,argTypes:{...g({tagName:s,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};var n,f,m;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(m=(f=e.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const j=["Demo"],Y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:j,default:I},Symbol.toStringTag,{value:"Module"}));export{Y as D,e as a};
