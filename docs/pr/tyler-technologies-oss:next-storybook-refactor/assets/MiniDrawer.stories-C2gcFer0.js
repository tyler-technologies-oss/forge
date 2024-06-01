import{x as d,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as b}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{C as _,v as x,w as y,g as k}from"./constants-BgIM8F0f.js";import{i as D,j as z,k as $,l as I}from"./index-Dd7dh6lc.js";import{I as O}from"./icon-BeUfDKoD.js";import{n as S,e as C}from"./ref-BorTy8X1.js";import{B as A,a as E,b as N}from"./base-drawer-BaCA65jc.js";import"./list-CyCfJIwy.js";import"./toolbar-C_Bh1MjW.js";import"./index-Dh0vMUMR.js";import"./scaffold-XfzXJpdg.js";import"./card-BpIftg_B.js";import"./app-bar-profile-button-C7iCDDsR.js";import"./state-layer-CBmzZqaJ.js";import"./focus-indicator-C_lKmSqu.js";import"./badge-Dh2F6wRa.js";import"./menu-CBxA6aQ6.js";import"./linear-progress-C3rEPYpB.js";import"./popover-D2f38-Ts.js";import"./overlay-E2ymM26e.js";import"./skeleton-CKpu8BXV.js";import"./profile-card-BClQoAru.js";import"./avatar-DCtRWeBo.js";import"./icon-button-D9id-_I0.js";import"./tooltip-DiLx0IwJ.js";const j=`${_}mini-drawer`,M={HOVER:"hover"},T={elementName:j,attributes:M},P=`<template>
  <div class="root" part="root">
    <div class="forge-drawer mini">
      <slot name="header"></slot>
      <div class="content" part="content">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
`,R=':host{--_mini-drawer-width: var(--forge-mini-drawer-width, 56px);--_mini-drawer-hover-width: var(--forge-mini-drawer-hover-width, var(--forge-drawer-width, 256px));--_mini-drawer-transition-duration: var(--forge-mini-drawer-transition-duration, var(--forge-animation-duration-short4, .2s));--_mini-drawer-transition-easing: var(--forge-mini-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_mini-drawer-transition-delay: var(--forge-mini-drawer-transition-delay, .3s);--_mini-drawer-hover-transition-duration: var(--forge-mini-drawer-hover-transition-duration, var(--forge-animation-duration-medium2, .3s));--_mini-drawer-hover-transition-easing: var(--forge-mini-drawer-hover-transition-easing, var(--_mini-drawer-transition-easing));--_mini-drawer-hover-transition-delay: var(--forge-mini-drawer-hover-transition-delay, var(--forge-animation-duration-medium2, .3s))}:host{display:flex;flex-direction:column;box-sizing:border-box;height:100%;overflow:hidden!important;width:var(--_mini-drawer-width);overflow:visible!important;--forge-divider-margin: 4px 0}:host([direction=right]){min-width:var(--_mini-drawer-width);width:auto}:host([direction=right]) .root{position:relative}:host(:not([open])){display:none}:host([hover]) .right{position:absolute;right:0}:host([hover]) .forge-drawer:hover{width:var(--_mini-drawer-hover-width)!important;transition:width var(--_mini-drawer-hover-transition-duration) var(--_mini-drawer-hover-transition-easing) var(--_mini-drawer-hover-transition-delay)}:host([hover]) .forge-drawer:hover .content{overflow:auto;overflow:overlay}.forge-drawer{--_drawer-background: var(--forge-drawer-background, var(--forge-theme-surface, #ffffff));--_drawer-border-color: var(--forge-drawer-border-color, var(--forge-theme-outline, #e0e0e0));--_drawer-width: var(--forge-drawer-width, 256px);--_drawer-border-width: var(--forge-drawer-border-width, var(--forge-border-thin, 1px));--_drawer-transition-duration: var(--forge-drawer-transition-duration, var(--forge-animation-duration-medium1, .25s));--_drawer-transition-easing: var(--forge-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_drawer-transition-duration-close: var(--forge-drawer-transition-duration-close, var(--forge-animation-duration-short4, .2s))}.forge-drawer{width:var(--_drawer-width);height:100%;box-sizing:border-box;overflow:hidden;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto;background-color:var(--_drawer-background);border-color:var(--_drawer-border-color);transition-property:transform;transition-duration:var(--_drawer-transition-duration);transition-timing-function:var(--_drawer-transition-easing)}.forge-drawer ::slotted([slot=header]){grid-row:1}.forge-drawer ::slotted([slot=footer]){grid-row:3}.forge-drawer .content{overflow-x:auto;-webkit-overflow-scrolling:"touch";display:flex;flex-direction:column;grid-row:2}.forge-drawer .content::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.forge-drawer .content::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, var(--forge-shape-full, 9999px));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.forge-drawer .content::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.forge-drawer.left{border-right-width:var(--_drawer-border-width);border-right-style:solid}.forge-drawer.right{border-left-width:var(--_drawer-border-width);border-left-style:solid}.forge-drawer.right.closing{transform:translate(100%);left:auto;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.right.closed{transform:translate(100%);right:0;left:auto;width:0;border:none}.forge-drawer.closing{transform:translate(-100%);left:0;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.closed{transform:translate(-100%);left:0;width:0;border:none}.forge-drawer.no-transition{transition:none!important}.root{z-index:var(--forge-z-index-surface, 1);height:100%}.forge-drawer.mini{width:var(--_mini-drawer-width);z-index:var(--forge-z-index-surface, 1);transition:width var(--_mini-drawer-transition-duration) var(--_mini-drawer-transition-easing)}.forge-drawer.mini .content{overflow:hidden}.forge-drawer.closed{width:0}';var B=Object.defineProperty,H=Object.getOwnPropertyDescriptor,F=(r,e,a,o)=>{for(var t=o>1?void 0:o?H(e,a):e,s=r.length-1,l;s>=0;s--)(l=r[s])&&(t=(o?l(e,a,t):l(t))||t);return o&&t&&B(e,a,t),t};let c=class extends A{constructor(){super(),y(this,P,R),this._foundation=new E(new N(this))}get hover(){return this.hasAttribute("hover")}set hover(r){this.toggleAttribute("hover",r)}};c=F([x({name:T.elementName})],c);const g="forge-mini-drawer",q=b("forge-drawer-after-open"),L=b("forge-drawer-after-close");O.define([D,z,$,I]);const V={title:"Components/Drawer/Mini Drawer",render:r=>{const e=C();function a(){const o=e.value;o.open=!o.open}return d`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${a}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${S(e)}
          slot=${`body-${r.direction}`}
          .open=${r.open}
          .direction=${r.direction}
          ?hover=${r.hover}
          @forge-drawer-after-open=${q}
          @forge-drawer-after-close=${L}>
          <aside>
            <forge-list navlist>
              <forge-list-item selected id="tooltip-host-1">
                ${r.hover?f:d`<forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>`}
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-2">
                ${r.hover?f:d`<forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>`}
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-3">
                ${r.hover?f:d`<forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>`}
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
            </forge-list>
          </aside>
        </forge-mini-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:g,argTypes:{...k({tagName:g,controls:{direction:{control:"select",options:["left","right"]}}})},args:{open:!0,hover:!1,direction:"left"}},i={},n={args:{hover:!0}};var m,w,h;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(h=(w=i.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var v,p,u;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const W=["Demo","Hover"],ur=Object.freeze(Object.defineProperty({__proto__:null,Demo:i,Hover:n,__namedExportsOrder:W,default:V},Symbol.toStringTag,{value:"Module"}));export{i as D,n as H,ur as M};
