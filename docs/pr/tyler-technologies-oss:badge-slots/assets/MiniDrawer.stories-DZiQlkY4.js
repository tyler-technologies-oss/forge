import"./lit-element-BuSzPo2N.js";import{E as i,x as t}from"./lit-html-Ox1a2bD1.js";import{a as g}from"./index-B-lxVbXh.js";import{g as h}from"./utils-C9ubTmun.js";import{I as v,l as b,m as w,n as y,o as D}from"./icon-Bqgt-0wI.js";import{n as $,e as x}from"./ref-DxjK-Y8K.js";import"./feature-detection-CY6TVbRZ.js";import"./mini-drawer-uH-d4rqn.js";import"./list-DCzhHkfW.js";import"./toolbar-CJj-iw1_.js";import"./index-CiLSBptl.js";import"./scaffold-BjMvQLbF.js";import"./card-Cvm6cje1.js";import"./app-bar-profile-button-DmiB2VeR.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./menu-DoGfQb_z.js";import"./linear-progress-CJb_8skk.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";import"./avatar-J3yRSZ-u.js";import"./icon-button-BkG6pY8m.js";import"./tooltip-BRjtM3KC.js";const n="forge-mini-drawer",I=g("forge-drawer-after-open"),S=g("forge-drawer-after-close");v.define([b,w,y,D]);const _={title:"Components/Drawer/Mini Drawer",render:o=>{const a=x();function u(){const s=a.value;s.open=!s.open}return t`
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
    `},component:n,argTypes:{...h({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},e={},r={args:{hover:!0}};var p,m,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var f,l,d;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const j=["Demo","Hover"],Y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Hover:r,__namedExportsOrder:j,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,r as H,Y as M};
