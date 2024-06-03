import{x as d,T as l}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as w}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{C as b,z as h,A as u,g as v}from"./constants-ygAdINjo.js";import{i as x,j as _,k as y,l as k}from"./index-Dd7dh6lc.js";import{I as D}from"./icon-C_fBaRFB.js";import{n as O,e as $}from"./ref-BorTy8X1.js";import{B as j,a as C,b as z}from"./base-drawer-HaVsRNA-.js";import"./list-Bm3FJABk.js";import"./toolbar-CEbqw2SO.js";import"./index-Dh0vMUMR.js";import"./scaffold-7F4d4bcF.js";import"./card-A3SGmT2O.js";import"./app-bar-profile-button-CE99FOV0.js";import"./state-layer-CsmUKFp0.js";import"./focus-indicator-CkhNke9z.js";import"./badge-ChETsMLA.js";import"./menu-Czk819US.js";import"./linear-progress-Ben_h4PH.js";import"./popover-fcSm5SAw.js";import"./overlay-BJf_Vl0w.js";import"./skeleton-DVSymALm.js";import"./profile-card-BFbT_VCY.js";import"./avatar-eKhoZxTJ.js";import"./icon-button-D-WCJJ3W.js";const I=`${b}drawer`,S={elementName:I},A=`<template>
  <div class="forge-drawer" part="root">
    <slot name="header"></slot>
    <div class="content" part="content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
`,E=':host{display:flex;flex-direction:column;box-sizing:border-box;height:100%;overflow:hidden!important;--forge-divider-margin: 4px 0}.forge-drawer{--_drawer-background: var(--forge-drawer-background, var(--forge-theme-surface, #ffffff));--_drawer-border-color: var(--forge-drawer-border-color, var(--forge-theme-outline, #e0e0e0));--_drawer-width: var(--forge-drawer-width, 256px);--_drawer-border-width: var(--forge-drawer-border-width, var(--forge-border-thin, 1px));--_drawer-transition-duration: var(--forge-drawer-transition-duration, var(--forge-animation-duration-medium1, .25s));--_drawer-transition-easing: var(--forge-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_drawer-transition-duration-close: var(--forge-drawer-transition-duration-close, var(--forge-animation-duration-short4, .2s))}.forge-drawer{width:var(--_drawer-width);height:100%;box-sizing:border-box;overflow:hidden;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto;background-color:var(--_drawer-background);border-color:var(--_drawer-border-color);transition-property:transform;transition-duration:var(--_drawer-transition-duration);transition-timing-function:var(--_drawer-transition-easing)}.forge-drawer ::slotted([slot=header]){grid-row:1}.forge-drawer ::slotted([slot=footer]){grid-row:3}.forge-drawer .content{overflow-x:auto;-webkit-overflow-scrolling:"touch";display:flex;flex-direction:column;grid-row:2}.forge-drawer .content::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.forge-drawer .content::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, var(--forge-shape-full, 9999px));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.forge-drawer .content::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.forge-drawer.left{border-right-width:var(--_drawer-border-width);border-right-style:solid}.forge-drawer.right{border-left-width:var(--_drawer-border-width);border-left-style:solid}.forge-drawer.right.closing{transform:translate(100%);left:auto;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.right.closed{transform:translate(100%);right:0;left:auto;width:0;border:none}.forge-drawer.closing{transform:translate(-100%);left:0;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.closed{transform:translate(-100%);left:0;width:0;border:none}.forge-drawer.no-transition{transition:none!important}@media not all and (min-resolution: .001dpcm){@supports (-webkit-appearance: none) and (stroke-color: transparent){:host([open]){transform:translateZ(0)}}}';var N=Object.defineProperty,P=Object.getOwnPropertyDescriptor,T=(e,o,n,t)=>{for(var r=t>1?void 0:t?P(o,n):o,a=e.length-1,s;a>=0;a--)(s=e[a])&&(r=(t?s(o,n,r):s(r))||r);return t&&r&&N(o,n,r),r};let f=class extends j{constructor(){super(),u(this,A,E),this._foundation=new C(new z(this))}};f=T([h({name:S.elementName})],f);const c="forge-drawer",F=w("forge-drawer-after-open"),R=w("forge-drawer-after-close");D.define([x,_,y,k]);const B={title:"Components/Drawer",render:e=>{const o=$();function n(){const a=o.value;a.open=!a.open}const t=e.showHeader?d`
      <forge-toolbar slot="header">
        <div>Header</div>
      </forge-toolbar>
    `:l,r=e.showFooter?d`
      <forge-toolbar inverted slot="footer">
        <div>Footer</div>
      </forge-toolbar>
    `:l;return d`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${n}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${O(o)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
          @forge-drawer-after-open=${F}
          @forge-drawer-after-close=${R}
          >
          ${t}
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
          ${r}
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:c,argTypes:{...v({tagName:c,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},i={};var g,m,p;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const H=["Demo"],gr=Object.freeze(Object.defineProperty({__proto__:null,Demo:i,__namedExportsOrder:H,default:B},Symbol.toStringTag,{value:"Module"}));export{gr as D,i as a};
