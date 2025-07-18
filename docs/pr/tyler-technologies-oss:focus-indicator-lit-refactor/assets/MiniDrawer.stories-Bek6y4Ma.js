import{E as i,x as t}from"./iframe-B36M3axR.js";import{g as h}from"./utils-JcRLWv5w.js";import{I as v,l as b,m as w,n as y,o as D}from"./icon-eJOvSyyv.js";import{n as _,e as $}from"./ref-DJEQr53X.js";import"./service-adapter-BykFeYYZ.js";import"./mini-drawer-DlIAARO3.js";import"./list-CIEcjlwx.js";import"./toolbar-Bv8KpWT6.js";import"./index-CiLSBptl.js";import"./scaffold-DGBqen_X.js";import"./card-qr7KxZ6b.js";import"./app-bar-profile-button-BJT2lB8O.js";import"./state-layer-BRTtEqto.js";import"./focus-indicator-u5r21UtO.js";import"./menu-U763C4m3.js";import"./linear-progress-BTaob5x2.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./avatar-BFafonG5.js";import"./icon-button-CofNeE0G.js";import"./tooltip-CRaofu57.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,n="forge-mini-drawer",x=g("forge-drawer-after-open"),I=g("forge-drawer-after-close");v.define([b,w,y,D]);const S={title:"Components/Drawer/Mini Drawer",render:o=>{const a=$();function u(){const s=a.value;s.open=!s.open}return t`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${u}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${_(a)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          ?hover=${o.hover}
          @forge-drawer-after-open=${x}
          @forge-drawer-after-close=${I}>
          <aside>
            <forge-list navlist>
              <forge-list-item selected id="tooltip-host-1">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>`}
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-2">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>`}
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-3">
                ${o.hover?i:t`<forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>`}
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
            </forge-list>
          </aside>
        </forge-mini-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...h({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};var p,c,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var f,l,d;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const O=["Demo","Hover"],V=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:O,default:S},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,V as M};
