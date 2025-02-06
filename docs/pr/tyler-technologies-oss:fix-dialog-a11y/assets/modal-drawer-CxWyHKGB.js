import{l as g,C as f,j as p,k as h}from"./constants-BjnHqKgS.js";import{p as w}from"./feature-detection-ONR9WHvu.js";import{B as d,a as b}from"./backdrop-BIqxiwQa.js";import{b as m,a as u,B as v}from"./base-drawer-CKUA1LTU.js";class _ extends m{constructor(r){super(r),this._component=r,this._backdropElement=g(this._component,d.elementName)}setBackdropCloseListener(r){this._backdropElement.addEventListener("click",r)}setBackdropVisibility(r,{immediate:e}){return this._backdropElement.toggleAttribute("hidden",!r),!this._backdropElement.fadeIn||!this._backdropElement.fadeOut?(e&&this._backdropElement.toggleAttribute(d.attributes.VISIBLE,r),Promise.resolve()):e?Promise.resolve(r?this._backdropElement.show():this._backdropElement.hide()):r?this._backdropElement.fadeIn():this._backdropElement.fadeOut()}toggleBackdropClass(r,e){w(this._backdropElement,r,e)}}const c=`${f}modal-drawer`,k={DISPLAY_NONE:"display-none",SCRIM_CLOSED:"closed"},x={CLOSE:`${c}-close`},s={elementName:c,classes:k,events:x};class C extends u{constructor(r){super(r),this._adapter=r,this._open=!1,this._backdropClickListener=this._onBackdropClick.bind(this)}initialize(){super.initialize(),this._adapter.setBackdropCloseListener(this._backdropClickListener),this._setBackdrop(this._open,{immediate:!0})}async _triggerDrawerOpen(){super._triggerDrawerOpen(),this._setBackdrop(!0)}async _triggerDrawerClose(){super._triggerDrawerClose(),this._setBackdrop(!1)}_onBackdropClick(r){this._adapter.emitHostEvent(s.events.CLOSE,void 0,!0,!0)&&(this.open=!1)}async _setBackdrop(r,{immediate:e=!1}={}){r?(this._adapter.toggleBackdropClass(!1,s.classes.SCRIM_CLOSED),this._adapter.setBackdropVisibility(!0,{immediate:e})):this._adapter.isConnected&&(await this._adapter.setBackdropVisibility(!1,{immediate:e}),this._open||this._adapter.toggleBackdropClass(!0,s.classes.SCRIM_CLOSED))}}const E=`<template>
  <forge-backdrop class="scrim" hidden exportparts="root:backdrop"></forge-backdrop>
  <div class="forge-drawer modal" part="root">
    <slot name="header"></slot>
    <div class="content" part="content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
`,B=':host{--forge-divider-margin: 4px 0}.forge-drawer{--_drawer-background: var(--forge-drawer-background, var(--forge-theme-surface, #ffffff));--_drawer-border-color: var(--forge-drawer-border-color, var(--forge-theme-outline, #e0e0e0));--_drawer-width: var(--forge-drawer-width, 256px);--_drawer-border-width: var(--forge-drawer-border-width, var(--forge-border-thin, 1px));--_drawer-transition-duration: var(--forge-drawer-transition-duration, var(--forge-animation-duration-medium1, .25s));--_drawer-transition-easing: var(--forge-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_drawer-transition-duration-close: var(--forge-drawer-transition-duration-close, var(--forge-animation-duration-short4, .2s))}.forge-drawer{width:var(--_drawer-width);height:100%;box-sizing:border-box;overflow:hidden;display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto;background-color:var(--_drawer-background);border-color:var(--_drawer-border-color);transition-property:transform;transition-duration:var(--_drawer-transition-duration);transition-timing-function:var(--_drawer-transition-easing)}.forge-drawer ::slotted([slot=header]){grid-row:1}.forge-drawer ::slotted([slot=footer]){grid-row:3}.forge-drawer .content{overflow-x:auto;-webkit-overflow-scrolling:"touch";display:flex;flex-direction:column;grid-row:2}.forge-drawer .content::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.forge-drawer .content::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-drawer .content::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.forge-drawer .content::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.forge-drawer.left{border-right-width:var(--_drawer-border-width);border-right-style:solid}.forge-drawer.right{border-left-width:var(--_drawer-border-width);border-left-style:solid}.forge-drawer.right.closing{transform:translate(100%);left:auto;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.right.closed{transform:translate(100%);right:0;left:auto;width:0;border:none}.forge-drawer.closing{transform:translate(-100%);left:0;z-index:var(--forge-z-index-surface, 1);position:absolute;top:0;right:0;transition-duration:var(--_drawer-transition-duration-close)}.forge-drawer.closed{transform:translate(-100%);left:0;width:0;border:none}.forge-drawer.no-transition{transition:none!important}.forge-drawer.modal{position:absolute;top:0;z-index:var(--forge-z-index-dialog, 8);box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;max-width:80%}.forge-drawer.modal.closing,.forge-drawer.modal.closed{box-shadow:none}.forge-drawer.modal.closing.right{transform:translate(100%)}.forge-drawer.right{right:0}.forge-drawer.display-none{display:none!important}.scrim{z-index:var(--forge-z-index-dialog, 8)}.scrim.closed{display:none}';var O=Object.defineProperty,D=Object.getOwnPropertyDescriptor,y=(t,r,e,a)=>{for(var o=a>1?void 0:a?D(r,e):r,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(a?n(r,e,o):n(o))||o);return a&&o&&O(r,e,o),o};let l=class extends v{constructor(){super(),h(this,E,B),this._core=new C(new _(this))}};l=y([p({name:s.elementName,dependencies:[b]})],l);
