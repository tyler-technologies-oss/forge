var x=a=>{throw TypeError(a)};var T=(a,o,e)=>o.has(a)||x("Cannot "+e);var r=(a,o,e)=>(T(a,o,"read from private field"),e?e.call(a):o.get(a)),f=(a,o,e)=>o.has(a)?x("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(a):o.set(a,e),p=(a,o,e,i)=>(T(a,o,"write to private field"),i?i.call(a,e):o.set(a,e),e),s=(a,o,e)=>(T(a,o,"access private method"),e);import{r as z,b as m}from"./iframe-B7LxWkL4.js";import{n as S}from"./property-CcTHpYbU.js";import{r as I}from"./state-BcOT_HUv.js";import{n as R}from"./query-assigned-nodes-D8SsSM9e.js";import{n as Q}from"./when-CI7b_ccM.js";import{t as Y,C as q,a as j}from"./service-adapter-DlT-lJx7.js";import{K as G,I as K,D as V,V as F}from"./tyler-icons-qc11a4hp.js";import{B as J}from"./base-lit-element-DD9dOWH-.js";import{t as d}from"./utils-DU-9AqTO.js";import{A as W,a as X}from"./app-bar-menu-button-CS-fK3VA.js";import{D as Z}from"./dialog-qsRa4tTT.js";import{D as ee}from"./drawer-C4w9_Owc.js";import{M as te}from"./mini-drawer-B5rmf2t_.js";import{I as re}from"./icon-button-BsODWw2P.js";import{S as ae}from"./scaffold-C8LskKFX.js";import{T as oe}from"./toolbar-DUE3t8Rm.js";const se="data-forge-app-layout-close",ie=":host{--_drawer-width: var(--forge-app-layout-drawer-width, 320px);--_dialog-width: var(--forge-app-layout-dialog-width, 320px);--_mini-drawer-z-index: var(--forge-app-layout-mini-drawer-z-index, 3);display:block;height:100%}forge-app-bar{--forge-app-bar-logo-font-size: 40px;--forge-app-bar-columns: auto 1fr auto}:host(:state(small)) forge-app-bar{--forge-app-bar-row-padding: 0}slot[name=app-bar-logo]{--forge-icon-font-size: var(--forge-app-bar-logo-font-size)}.drawer-container.mini-hover{z-index:var(--_mini-drawer-z-index);overflow:visible}forge-drawer{--forge-drawer-width: var(--_drawer-width)}.close-drawer-button{padding-inline-start:var(--forge-spacing-xxsmall, 4px)}.left-sheet-dialog{--forge-dialog-width: var(--_dialog-width)}.left-sheet-dialog::part(surface){display:block}";var ne=Object.defineProperty,c=(a,o,e,i)=>{for(var g=void 0,u=a.length-1,N;u>=0;u--)(N=a[u])&&(g=N(o,e,g)||g);return g&&ne(o,e,g),g},A,P,B;const U="forge-app-layout";var h,n,t,$,E,L,b,C,_,w,y,D,O,H,k,M;const v=class v extends(B=J,P=q,A=j,B){constructor(){super();f(this,t);f(this,h);f(this,n);f(this,b);f(this,_);f(this,w);f(this,y);f(this,D);this.appTitle="",this.appTitleHref="",this.breakpoint=960,this.useMiniDrawer=!1,this.miniHover=!1,this._leftDrawerOpen=!1,this._isLargeScreen=!1,p(this,h,null),p(this,b,e=>{this._isLargeScreen=e.matches,s(this,t,C).call(this),s(this,t,H).call(this,this._isLargeScreen?"large":"small")}),p(this,_,()=>{this._isLargeScreen||(this._leftDrawerOpen=!this._leftDrawerOpen,d(r(this,n),"drawer-open",this._leftDrawerOpen),d(r(this,n),"drawer-closed",!this._leftDrawerOpen),s(this,t,O).call(this),s(this,t,k).call(this,this._leftDrawerOpen))}),p(this,w,()=>{s(this,t,$).call(this)}),p(this,y,e=>{e.target.name==="navigation"&&this.requestUpdate()}),p(this,D,e=>{e.composedPath().some(u=>u instanceof HTMLElement&&u.hasAttribute(se))&&this.closeDrawer()}),p(this,n,this.attachInternals())}get isLargeScreen(){return this._isLargeScreen}connectedCallback(){super.connectedCallback(),s(this,t,E).call(this)}firstUpdated(e){super.firstUpdated(e),s(this,t,C).call(this),s(this,t,O).call(this)}updated(e){super.updated(e),e.has("breakpoint")&&(s(this,t,L).call(this),s(this,t,E).call(this))}disconnectedCallback(){super.disconnectedCallback(),s(this,t,L).call(this)}closeDrawer(){this._isLargeScreen||s(this,t,$).call(this)}render(){const e=m`<slot name="navigation" @slotchange=${r(this,y)}></slot>`;return m`
      <forge-scaffold>
        <forge-app-bar slot="header" .titleText=${this.appTitle} .href=${this.appTitleHref} theme-mode="scoped">
          <slot name="app-bar-logo" slot="logo">
            <forge-icon name="tyler_talking_t_logo"></forge-icon>
          </slot>
          <slot name="app-bar-start" slot="start"></slot>
          ${Q(!this._isLargeScreen,()=>m`<forge-app-bar-menu-button slot="start" @click=${r(this,_)}></forge-app-bar-menu-button>`)}
          <slot name="app-bar-center" slot="center"></slot>
          <slot name="app-bar-end" slot="end"></slot>
        </forge-app-bar>

        <!-- Small screens: Navigation in left slot -->
        ${this._isLargeScreen?"":r(this,t,M)?m`
                <forge-dialog
                  class="left-sheet-dialog"
                  fullscreen-threshold="0"
                  preset="left-sheet"
                  slot="left"
                  ?open=${this._leftDrawerOpen}
                  @forge-dialog-close=${r(this,w)}>
                  <div class="drawer-container">
                    <forge-toolbar no-divider>
                      <forge-icon-button
                        autofocus
                        class="close-drawer-button"
                        slot="before-start"
                        aria-label="Close navigation drawer"
                        @click=${r(this,_)}>
                        <forge-icon name="close"></forge-icon>
                      </forge-icon-button>
                    </forge-toolbar>
                    <aside @click=${r(this,D)}>${e}</aside>
                  </div>
                </forge-dialog>
              `:e}
        <slot name="body-header" slot="body-header"></slot>

        <!-- Large screens: Navigation in body-left slot -->
        ${this._isLargeScreen?r(this,t,M)?m`
                <div class="drawer-container ${this.miniHover?"mini-hover":""}" slot="body-left">
                  ${this.useMiniDrawer?m`
                        <forge-mini-drawer ?hover=${this.miniHover} ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${r(this,w)}>
                          ${e}
                        </forge-mini-drawer>
                      `:m`
                        <forge-drawer ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${r(this,w)}
                          >${e}</forge-drawer
                        >
                      `}
                </div>
              `:e:""}

        <slot name="body" slot="body"></slot>
        <slot slot="body"></slot>
        <slot name="right" slot="right"></slot>
        <slot name="body-right" slot="body-right"></slot>
        <slot name="body-footer" slot="body-footer"></slot>

        <slot name="footer" slot="footer"></slot>
      </forge-scaffold>
    `}};h=new WeakMap,n=new WeakMap,t=new WeakSet,$=function(){this._leftDrawerOpen&&(this._leftDrawerOpen=!1,d(r(this,n),"drawer-open",!1),d(r(this,n),"drawer-closed",!0),s(this,t,k).call(this,!1))},E=function(){p(this,h,window.matchMedia(`(min-width: ${this.breakpoint}px)`)),this._isLargeScreen=r(this,h).matches,s(this,t,C).call(this),r(this,h).addEventListener("change",r(this,b))},L=function(){r(this,h)&&(r(this,h).removeEventListener("change",r(this,b)),p(this,h,null))},b=new WeakMap,C=function(){d(r(this,n),"small",!this._isLargeScreen),d(r(this,n),"large",this._isLargeScreen),this._isLargeScreen?this._leftDrawerOpen=!0:this._leftDrawerOpen=!1,d(r(this,n),"drawer-open",this._leftDrawerOpen),d(r(this,n),"drawer-closed",!this._leftDrawerOpen),this.hasUpdated&&s(this,t,O).call(this)},_=new WeakMap,w=new WeakMap,y=new WeakMap,D=new WeakMap,O=function(){const e=this.useMiniDrawer?"forge-mini-drawer":"forge-drawer",i=this.shadowRoot?.querySelector(e);i&&i.open!==this._leftDrawerOpen&&(i.open=this._leftDrawerOpen)},H=function(e){const i=new CustomEvent("forge-app-layout-breakpoint-change",{bubbles:!0,composed:!0,cancelable:!0,detail:{breakpoint:e}});this.dispatchEvent(i)},k=function(e){const i=new CustomEvent("forge-app-layout-drawer-change",{bubbles:!0,composed:!0,cancelable:!0,detail:{open:e}});this.dispatchEvent(i)},M=function(){return this._navigationNodes.length>0},v[P]=U,v[A]=[ae,W,X,Z,ee,te,re,G,oe],K.define([V,F]),v.styles=z(ie);let l=v;c([S({type:String,attribute:"app-title"})],l.prototype,"appTitle");c([S({type:String,attribute:"app-title-href"})],l.prototype,"appTitleHref");c([S({type:Number})],l.prototype,"breakpoint");c([S({type:Boolean,attribute:"use-mini-drawer"})],l.prototype,"useMiniDrawer");c([S({type:Boolean,attribute:"mini-hover"})],l.prototype,"miniHover");c([R({slot:"navigation",flatten:!0})],l.prototype,"_navigationNodes");c([I()],l.prototype,"_leftDrawerOpen");c([I()],l.prototype,"_isLargeScreen");Y(U,l);
