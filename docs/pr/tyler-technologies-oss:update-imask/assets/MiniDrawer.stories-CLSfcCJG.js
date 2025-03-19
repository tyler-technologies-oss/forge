import"./lit-element-JplMEnZc.js";import{x as t,E as i}from"./lit-html-paDGiEfB.js";import{a as g}from"./index-Cf3axooF.js";import{g as h}from"./utils-C0KK1NN_.js";import{f as v,g as b,h as w,i as y}from"./index-ByifSpfC.js";import{I as D}from"./icon-CND1_bFA.js";import{n as $,e as x}from"./ref-DJjbfkOF.js";import"./feature-detection-DRCh51Sa.js";import"./mini-drawer-BHs45eU2.js";import"./list-taWGoVxz.js";import"./toolbar-DrgqBcwu.js";import"./index-CiLSBptl.js";import"./scaffold-D66s8WNO.js";import"./card-C10NOeAn.js";import"./app-bar-profile-button-C1Qxnv8b.js";import"./state-layer-DCupnvce.js";import"./focus-indicator-BjVpbo_K.js";import"./badge-Dp1fyGkw.js";import"./menu-D3cpy8Jn.js";import"./linear-progress-CqfIuBkR.js";import"./popover-TwkKUBh9.js";import"./overlay-B9ywocRd.js";import"./skeleton-D2S3-1Sc.js";import"./avatar-D_XGi29H.js";import"./icon-button-DmyR8RGa.js";import"./tooltip-D2_zu5SB.js";const n="forge-mini-drawer",I=g("forge-drawer-after-open"),S=g("forge-drawer-after-close");D.define([v,b,w,y]);const _={title:"Components/Drawer/Mini Drawer",render:o=>{const a=x();function u(){const s=a.value;s.open=!s.open}return t`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${u}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${$(a)}
          slot=${`body-${o.direction}`}
          .open=${o.open}
          .direction=${o.direction}
          ?hover=${o.hover}
          @forge-drawer-after-open=${I}
          @forge-drawer-after-close=${S}>
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
    `},component:n,argTypes:{...h({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};var p,m,f;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(f=(m=e.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const j=["Demo","Hover"],oo=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:j,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,oo as M};
