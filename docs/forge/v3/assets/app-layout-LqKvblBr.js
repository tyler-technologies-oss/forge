import{r as W,b as g}from"./iframe-Y92HmdHZ.js";import{B as H,t as z}from"./base-lit-element-DXQv51bq.js";import{n as _}from"./property-4XXebId8.js";import{r as N}from"./state-DNIjxkMA.js";import{n as R}from"./query-assigned-nodes-D8SsSM9e.js";import{n as Q}from"./when-CI7b_ccM.js";import{C as Y,a as q}from"./service-adapter-8tADcN_b.js";import{M as G,I as F,D as J,U as K}from"./tyler-icons-SWWw4qdQ.js";import{t as f}from"./utils-DU-9AqTO.js";import{A as V,a as X}from"./app-bar-menu-button-3fshlFiS.js";import{D as Z}from"./dialog-C-zyrl9l.js";import{D as j}from"./drawer-DDIZKTPG.js";import{M as ee}from"./mini-drawer-4my3NLc4.js";import{I as te}from"./icon-button-BG-KzVAg.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import{S as re}from"./scaffold-zUZ5R4dI.js";import{T as ae}from"./toolbar-xc73DdA4.js";const oe="data-forge-app-layout-close",ie=":host{--_drawer-width: var(--forge-app-layout-drawer-width, 320px);--_dialog-width: var(--forge-app-layout-dialog-width, 320px);--_mini-drawer-z-index: var(--forge-app-layout-mini-drawer-z-index, 3);display:block;height:100%}forge-app-bar{--forge-app-bar-logo-font-size: 40px;--forge-app-bar-columns: auto 1fr auto}:host(:state(small)) forge-app-bar{--forge-app-bar-row-padding: 0}slot[name=app-bar-logo]{--forge-icon-font-size: var(--forge-app-bar-logo-font-size)}.drawer-container.mini-hover{z-index:var(--_mini-drawer-z-index);overflow:visible}forge-drawer{--forge-drawer-width: var(--_drawer-width)}.close-drawer-button{padding-inline-start:var(--forge-spacing-xxsmall, 4px)}.left-sheet-dialog{--forge-dialog-width: var(--_dialog-width)}.left-sheet-dialog::part(surface){display:block}";var se=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,x=e=>{throw TypeError(e)},l=(e,t,o,p)=>{for(var d=p>1?void 0:p?ne(t,o):t,y=e.length-1,D;y>=0;y--)(D=e[y])&&(d=(p?D(t,o,d):D(d))||d);return p&&d&&se(t,o,d),d},T=(e,t,o)=>t.has(e)||x("Cannot "+o),r=(e,t,o)=>(T(e,t,"read from private field"),o?o.call(e):t.get(e)),h=(e,t,o)=>t.has(e)?x("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),$=(e,t,o,p)=>(T(e,t,"write to private field"),t.set(e,o),o),i=(e,t,o)=>(T(e,t,"access private method"),o),P,B,A,c,n,a,C,S,L,b,u,w,m,O,M,v,I,k,E;const U="forge-app-layout";let s=class extends(A=H,B=Y,P=q,A){constructor(){super(),h(this,a),this.appTitle="",this.appTitleHref="",this.breakpoint=960,this.useMiniDrawer=!1,this.miniHover=!1,this._leftDrawerOpen=!1,this._isLargeScreen=!1,h(this,c,null),h(this,n),h(this,b,e=>{this._isLargeScreen=e.matches,i(this,a,u).call(this),i(this,a,I).call(this,this._isLargeScreen?"large":"small")}),h(this,w,()=>{this._isLargeScreen||(this._leftDrawerOpen=!this._leftDrawerOpen,f(r(this,n),"drawer-open",this._leftDrawerOpen),f(r(this,n),"drawer-closed",!this._leftDrawerOpen),i(this,a,v).call(this),i(this,a,k).call(this,this._leftDrawerOpen))}),h(this,m,()=>{i(this,a,C).call(this)}),h(this,O,e=>{e.target.name==="navigation"&&this.requestUpdate()}),h(this,M,e=>{e.composedPath().some(p=>p instanceof HTMLElement&&p.hasAttribute(oe))&&this.closeDrawer()}),$(this,n,this.attachInternals())}get isLargeScreen(){return this._isLargeScreen}connectedCallback(){super.connectedCallback(),i(this,a,S).call(this)}firstUpdated(e){super.firstUpdated(e),i(this,a,u).call(this),i(this,a,v).call(this)}updated(e){super.updated(e),e.has("breakpoint")&&(i(this,a,L).call(this),i(this,a,S).call(this))}disconnectedCallback(){super.disconnectedCallback(),i(this,a,L).call(this)}closeDrawer(){this._isLargeScreen||i(this,a,C).call(this)}render(){const e=g`<slot name="navigation" @slotchange=${r(this,O)}></slot>`;return g`
      <forge-scaffold>
        <forge-app-bar slot="header" .titleText=${this.appTitle} .href=${this.appTitleHref} theme-mode="scoped">
          <slot name="app-bar-logo" slot="logo">
            <forge-icon name="tyler_talking_t_logo"></forge-icon>
          </slot>
          <slot name="app-bar-start" slot="start"></slot>
          ${Q(!this._isLargeScreen,()=>g`<forge-app-bar-menu-button slot="start" @click=${r(this,w)}></forge-app-bar-menu-button>`)}
          <slot name="app-bar-center" slot="center"></slot>
          <slot name="app-bar-end" slot="end"></slot>
        </forge-app-bar>

        <!-- Small screens: Navigation in left slot -->
        ${this._isLargeScreen?"":r(this,a,E)?g`
                <forge-dialog
                  class="left-sheet-dialog"
                  fullscreen-threshold="0"
                  preset="left-sheet"
                  slot="left"
                  ?open=${this._leftDrawerOpen}
                  @forge-dialog-close=${r(this,m)}>
                  <div class="drawer-container">
                    <forge-toolbar no-divider>
                      <forge-icon-button
                        autofocus
                        class="close-drawer-button"
                        slot="before-start"
                        aria-label="Close navigation drawer"
                        @click=${r(this,w)}>
                        <forge-icon name="close"></forge-icon>
                      </forge-icon-button>
                    </forge-toolbar>
                    <aside @click=${r(this,M)}>${e}</aside>
                  </div>
                </forge-dialog>
              `:e}
        <slot name="body-header" slot="body-header"></slot>

        <!-- Large screens: Navigation in body-left slot -->
        ${this._isLargeScreen?r(this,a,E)?g`
                <div class="drawer-container ${this.miniHover?"mini-hover":""}" slot="body-left">
                  ${this.useMiniDrawer?g`
                        <forge-mini-drawer ?hover=${this.miniHover} ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${r(this,m)}>
                          ${e}
                        </forge-mini-drawer>
                      `:g`
                        <forge-drawer ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${r(this,m)}
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
    `}};c=new WeakMap;n=new WeakMap;a=new WeakSet;C=function(){this._leftDrawerOpen&&(this._leftDrawerOpen=!1,f(r(this,n),"drawer-open",!1),f(r(this,n),"drawer-closed",!0),i(this,a,k).call(this,!1))};S=function(){$(this,c,window.matchMedia(`(min-width: ${this.breakpoint}px)`)),this._isLargeScreen=r(this,c).matches,i(this,a,u).call(this),r(this,c).addEventListener("change",r(this,b))};L=function(){r(this,c)&&(r(this,c).removeEventListener("change",r(this,b)),$(this,c,null))};b=new WeakMap;u=function(){f(r(this,n),"small",!this._isLargeScreen),f(r(this,n),"large",this._isLargeScreen),this._isLargeScreen?this._leftDrawerOpen=!0:this._leftDrawerOpen=!1,f(r(this,n),"drawer-open",this._leftDrawerOpen),f(r(this,n),"drawer-closed",!this._leftDrawerOpen),this.hasUpdated&&i(this,a,v).call(this)};w=new WeakMap;m=new WeakMap;O=new WeakMap;M=new WeakMap;v=function(){const e=this.useMiniDrawer?"forge-mini-drawer":"forge-drawer",t=this.shadowRoot?.querySelector(e);t&&t.open!==this._leftDrawerOpen&&(t.open=this._leftDrawerOpen)};I=function(e){const t=new CustomEvent("forge-app-layout-breakpoint-change",{bubbles:!0,composed:!0,cancelable:!0,detail:{breakpoint:e}});this.dispatchEvent(t)};k=function(e){const t=new CustomEvent("forge-app-layout-drawer-change",{bubbles:!0,composed:!0,cancelable:!0,detail:{open:e}});this.dispatchEvent(t)};E=function(){return this._navigationNodes.length>0};s[B]=U;s[P]=[re,V,X,Z,j,ee,te,G,ae];F.define([J,K]);s.styles=W(ie);l([_({type:String,attribute:"app-title"})],s.prototype,"appTitle",2);l([_({type:String,attribute:"app-title-href"})],s.prototype,"appTitleHref",2);l([_({type:Number})],s.prototype,"breakpoint",2);l([_({type:Boolean,attribute:"use-mini-drawer"})],s.prototype,"useMiniDrawer",2);l([_({type:Boolean,attribute:"mini-hover"})],s.prototype,"miniHover",2);l([R({slot:"navigation",flatten:!0})],s.prototype,"_navigationNodes",2);l([N()],s.prototype,"_leftDrawerOpen",2);l([N()],s.prototype,"_isLargeScreen",2);s=l([z(U)],s);
