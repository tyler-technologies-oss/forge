import{x as r,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g}from"./utils-Dn927F8p.js";import{b as u,c as b,d as v,e as w}from"./index-Dh2cEqRr.js";import{I as h}from"./icon-V4IE3JYq.js";import{n as y,e as D}from"./ref-BorTy8X1.js";import"./drawer-BAcOpRM_.js";import"./list-CdrMVvEv.js";import"./toolbar-B2mSDDPY.js";import"./index-Dh0vMUMR.js";import"./scaffold-BMfHIFK2.js";import"./card-dhHkoNkd.js";import"./app-bar-profile-button-BjhzoKjm.js";import"./state-layer-7Eqbkxx0.js";import"./focus-indicator-DB3Uau5R.js";import"./badge-COHMqm-e.js";import"./menu-BQm54SgH.js";import"./linear-progress-DMJnsvFA.js";import"./popover-CVjzxp31.js";import"./overlay-MKQB_VEf.js";import"./skeleton-CpWNVcwu.js";import"./profile-card-cbFGqJ9U.js";import"./avatar-BXavy-1u.js";import"./icon-button-CrlUtV4j.js";const s="forge-drawer",$=d("forge-drawer-after-open"),x=d("forge-drawer-after-close");h.define([u,b,v,w]);const I={title:"Components/Drawer",render:o=>{const t=D();function l(){const a=t.value;a.open=!a.open}const c=o.showHeader?r`
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
