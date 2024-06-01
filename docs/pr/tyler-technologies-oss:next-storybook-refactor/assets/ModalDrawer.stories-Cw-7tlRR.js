import{x as l,T as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as c}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{x as v,J as _,C as k,v as x,w as C,g as D}from"./constants-BgIM8F0f.js";import{i as E,j as y,k as O,l as B}from"./index-Dd7dh6lc.js";import{I as S}from"./icon-BeUfDKoD.js";import{n as I,e as A}from"./ref-BorTy8X1.js";import{B as g,a as L}from"./backdrop-97o3CWz1.js";import{b as M,a as N,B as P}from"./base-drawer-BaCA65jc.js";import"./list-CyCfJIwy.js";import"./toolbar-C_Bh1MjW.js";import"./index-Dh0vMUMR.js";import"./scaffold-XfzXJpdg.js";import"./card-BpIftg_B.js";import"./app-bar-profile-button-C7iCDDsR.js";import"./state-layer-CBmzZqaJ.js";import"./focus-indicator-C_lKmSqu.js";import"./badge-Dh2F6wRa.js";import"./menu-CBxA6aQ6.js";import"./linear-progress-C3rEPYpB.js";import"./popover-D2f38-Ts.js";import"./overlay-E2ymM26e.js";import"./skeleton-CKpu8BXV.js";import"./profile-card-BClQoAru.js";import"./avatar-DCtRWeBo.js";import"./icon-button-D9id-_I0.js";class $ extends M{constructor(r){super(r),this._component=r,this._backdropElement=v(this._component,g.elementName)}setBackdropCloseListener(r){this._backdropElement.addEventListener("click",r)}setBackdropVisibility(r,{immediate:e}){return this._backdropElement.toggleAttribute("hidden",!r),!this._backdropElement.fadeIn||!this._backdropElement.fadeOut?(e&&this._backdropElement.toggleAttribute(g.attributes.VISIBLE,r),Promise.resolve()):e?Promise.resolve(r?this._backdropElement.show():this._backdropElement.hide()):r?this._backdropElement.fadeIn():this._backdropElement.fadeOut()}toggleBackdropClass(r,e){_(this._backdropElement,r,e)}}const u=`${k}modal-drawer`,z={DISPLAY_NONE:"display-none",SCRIM_CLOSED:"closed"},j={CLOSE:`${u}-close`},n={elementName:u,classes:z,events:j};class T extends N{constructor(r){super(r),this._adapter=r,this._open=!1,this._backdropClickListener=this._onBackdropClick.bind(this)}connect(){super.connect(),this._adapter.setBackdropCloseListener(this._backdropClickListener),this._setBackdrop(this._open,{immediate:!0})}_triggerDrawerOpen(){super._triggerDrawerOpen(),this._setBackdrop(!0)}_triggerDrawerClose(){super._triggerDrawerClose(),this._setBackdrop(!1)}_onBackdropClick(r){this._adapter.emitHostEvent(n.events.CLOSE,void 0,!0,!0)&&(this.open=!1)}async _setBackdrop(r,{immediate:e=!1}={}){r?(this._adapter.toggleBackdropClass(!1,n.classes.SCRIM_CLOSED),this._adapter.setBackdropVisibility(!0,{immediate:e})):this._adapter.isConnected&&(await this._adapter.setBackdropVisibility(!1,{immediate:e}),this._open||this._adapter.toggleBackdropClass(!0,n.classes.SCRIM_CLOSED))}}const R=`<template>
  <forge-backdrop class="scrim" hidden exportparts="root:backdrop"></forge-backdrop>
  <div class="forge-drawer modal" part="root">
    <slot name="header"></slot>
    <div class="content" part="content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
`,F=':host{--forge-divider-margin: 4px 0}.forge-drawer{--_drawer-background: var(--forge-drawer-background, var(--forge-theme-surface, #ffffff));--_drawer-border-color: var(--forge-drawer-border-color, var(--forge-theme-outline, #e0e0e0));--_drawer-width: var(--forge-drawer-width, 256px);--_drawer-border-width: var(--forge-drawer-border-width, var(--forge-border-thin, 1px));--_drawer-transition-duration: var(--forge-drawer-transition-duration, var(--forge-animation-duration-medium1, .25s));--_drawer-transition-easing: var(--forge-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_drawer-transition-duration-close: var(--forge-drawer-transition-duration-close, var(--forge-animation-duration-short4, .2s))}.forge-drawer{width:var(--_drawer-width);height:100%;box-sizing:border-box;overflow:hidden;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto;background-color:var(--_drawer-background);border-color:var(--_drawer-border-color);transition-property:transform;transition-duration:var(--_drawer-transition-duration);transition-timing-function:var(--_drawer-transition-easing)}.forge-drawer ::slotted([slot=header]){grid-row:1}.forge-drawer ::slotted([slot=footer]){grid-row:3}.forge-drawer .content{overflow-x:auto;-webkit-overflow-scrolling:"touch";display:flex;flex-direction:column;grid-row:2}.forge-drawer .content::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.forge-drawer .content::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, var(--forge-shape-full, 9999px));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.forge-drawer .content::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.forge-drawer.left{border-right-width:var(--_drawer-border-width);border-right-style:solid}.forge-drawer.right{border-left-width:var(--_drawer-border-width);border-left-style:solid}.forge-drawer.right.closing{transform:translate(100%);left:auto;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.right.closed{transform:translate(100%);right:0;left:auto;width:0;border:none}.forge-drawer.closing{transform:translate(-100%);left:0;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.closed{transform:translate(-100%);left:0;width:0;border:none}.forge-drawer.no-transition{transition:none!important}.forge-drawer.modal{position:absolute;top:0;z-index:var(--forge-z-index-dialog, 8);box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;max-width:80%}.forge-drawer.modal.closing,.forge-drawer.modal.closed{box-shadow:none}.forge-drawer.modal.closing.right{transform:translate(100%)}.forge-drawer.right{right:0}.forge-drawer.display-none{display:none!important}.scrim{z-index:var(--forge-z-index-dialog, 8)}.scrim.closed{display:none}';var H=Object.defineProperty,V=Object.getOwnPropertyDescriptor,q=(o,r,e,a)=>{for(var t=a>1?void 0:a?V(r,e):r,i=o.length-1,d;i>=0;i--)(d=o[i])&&(t=(a?d(r,e,t):d(t))||t);return a&&t&&H(r,e,t),t};let p=class extends P{constructor(){super(),C(this,R,F),this._foundation=new T(new $(this))}};p=q([x({name:n.elementName,dependencies:[L]})],p);const m="forge-modal-drawer",J=c("forge-modal-drawer-close"),K=c("forge-drawer-after-open"),W=c("forge-drawer-after-close");S.define([E,y,O,B]);const X={title:"Components/Drawer/Modal Drawer",render:o=>{const r=A();function e(){const i=r.value;i.open=!i.open}const a=o.showHeader?l`
      <forge-toolbar slot="header">
        <div>Header</div>
      </forge-toolbar>
    `:f,t=o.showFooter?l`
      <forge-toolbar inverted slot="footer">
        <div>Footer</div>
      </forge-toolbar>
    `:f;return l`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${e}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${I(r)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${J}
          @forge-drawer-after-open=${K}
          @forge-drawer-after-close=${W}
          >
          ${a}
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
          ${t}
        </forge-modal-drawer>

        <main slot="body">
          <forge-card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:m,argTypes:{...D({tagName:m,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},s={};var h,w,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(b=(w=s.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};const Y=["Demo"],xr=Object.freeze(Object.defineProperty({__proto__:null,Demo:s,__namedExportsOrder:Y,default:X},Symbol.toStringTag,{value:"Module"}));export{s as D,xr as M};
