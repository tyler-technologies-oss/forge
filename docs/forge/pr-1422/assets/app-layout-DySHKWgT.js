import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,g as r}from"./iframe-BbUsXXnT.js";import{d as i,l as a,r as o,t as s}from"./decorators-Ci1onliJ.js";import{n as c}from"./when-Daf2bbVy.js";import{C as l,S as u,t as d,x as f}from"./dist-CPhmYI86.js";import{n as ee,t as te}from"./base-lit-element-DvCODc3f.js";import{p}from"./constants-Bpi-_RbP.js";import{a as m,i as h,o as g,t as _}from"./icon-CdA8CuQQ.js";import{t as v}from"./decorate-DvwEnSYK.js";import{M as y,cn as b,t as x}from"./tyler-icons-kuH1S-j5.js";import{s as S,x as C}from"./utils-B2Tk8obI.js";import{n as w,t as T}from"./icon-button-DL0Bo8LM.js";import{t as E}from"./icon-button-Cw3e2eGB.js";import{n as D,r as O,t as k}from"./scaffold-KCbMx9PQ.js";import{a as A,i as j,n as M,o as ne,r as N,t as P}from"./menu-button-A9mbTgYw.js";import{n as F,r as I,t as L}from"./toolbar-BJddCJGC.js";import{n as R,r as z,t as B}from"./dialog-DukH9C2E.js";import{n as V,r as H,t as U}from"./drawer-C-4TIRFG.js";import{n as W,r as G,t as K}from"./mini-drawer-CpmcPjsM.js";function q(){return(q=e((()=>{p()})))()}var J;function Y(){return(Y=e((()=>{J=`:host{--_drawer-width:var(--forge-app-layout-drawer-width,320px);--_dialog-width:var(--forge-app-layout-dialog-width,320px);--_mini-drawer-z-index:var(--forge-app-layout-mini-drawer-z-index,3);height:100%;display:block}::slotted(:not([slot])){grid-area:body-inner;min-width:0;min-height:0;overflow:auto}forge-app-bar{--forge-app-bar-logo-font-size:40px;--forge-app-bar-columns:auto 1fr auto}:host(:state(small)) forge-app-bar{--forge-app-bar-row-padding:0}slot[name=app-bar-logo]{--forge-icon-font-size:var(--forge-app-bar-logo-font-size)}.drawer-container.mini-hover{z-index:var(--_mini-drawer-z-index);overflow:visible}forge-drawer{--forge-drawer-width:var(--_drawer-width)}.close-drawer-button{padding-inline-start:var(--forge-spacing-xxsmall,4px)}.left-sheet-dialog{--forge-dialog-width:var(--_dialog-width)}.left-sheet-dialog::part(surface){display:block}`})))()}var X,Z;function Q(){return(Q=e((()=>{r(),s(),d(),x(),ee(),S(),j(),P(),B(),U(),K(),E(),_(),k(),L(),q(),ne(),N(),z(),H(),G(),w(),m(),O(),I(),Y(),X=`forge-app-layout`,Z=class extends te{static{this[l]=X}static{this[u]=[D,A,M,R,V,W,T,h,F]}static{g.define([y,b])}static{this.styles=n(J)}get isLargeScreen(){return this._isLargeScreen}#e;#t;constructor(){super(),this.appTitle=``,this.appTitleHref=``,this.breakpoint=960,this.useMiniDrawer=!1,this.miniHover=!1,this._leftDrawerOpen=!1,this._isLargeScreen=!1,this.#e=null,this.#a=e=>{this._isLargeScreen=e.matches,this.#o(),this.#f(this._isLargeScreen?`large`:`small`)},this.#s=()=>{this._isLargeScreen||(this._leftDrawerOpen=!this._leftDrawerOpen,C(this.#t,`drawer-open`,this._leftDrawerOpen),C(this.#t,`drawer-closed`,!this._leftDrawerOpen),this.#d(),this.#p(this._leftDrawerOpen))},this.#c=()=>{this.#n()},this.#l=e=>{e.target.name===`navigation`&&this.requestUpdate()},this.#u=e=>{e.composedPath().some(e=>e instanceof HTMLElement&&e.hasAttribute(`data-forge-app-layout-close`))&&this.closeDrawer()},this.#t=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.#r()}firstUpdated(e){super.firstUpdated(e),this.#o(),this.#d()}updated(e){super.updated(e),e.has(`breakpoint`)&&(this.#i(),this.#r())}disconnectedCallback(){super.disconnectedCallback(),this.#i()}closeDrawer(){this._isLargeScreen||this.#n()}render(){let e=t`<slot name="navigation" @slotchange=${this.#l}></slot>`;return t`
      <forge-scaffold>
        <forge-app-bar slot="header" .titleText=${this.appTitle} .href=${this.appTitleHref} theme-mode="scoped">
          <slot name="app-bar-logo" slot="logo">
            <forge-icon name="tyler_talking_t_logo"></forge-icon>
          </slot>
          <slot name="app-bar-start" slot="start"></slot>
          ${c(!this._isLargeScreen,()=>t`<forge-app-bar-menu-button slot="start" @click=${this.#s}></forge-app-bar-menu-button>`)}
          <slot name="app-bar-center" slot="center"></slot>
          <slot name="app-bar-end" slot="end"></slot>
        </forge-app-bar>

        <!-- Small screens: Navigation in left slot -->
        ${this._isLargeScreen?``:this.#m?t`
                <forge-dialog
                  class="left-sheet-dialog"
                  fullscreen-threshold="0"
                  preset="left-sheet"
                  slot="left"
                  ?open=${this._leftDrawerOpen}
                  @forge-dialog-close=${this.#c}>
                  <div class="drawer-container">
                    <forge-toolbar no-divider>
                      <forge-icon-button
                        autofocus
                        class="close-drawer-button"
                        slot="before-start"
                        aria-label="Close navigation drawer"
                        @click=${this.#s}>
                        <forge-icon name="close"></forge-icon>
                      </forge-icon-button>
                    </forge-toolbar>
                    <aside @click=${this.#u}>${e}</aside>
                  </div>
                </forge-dialog>
              `:e}
        <slot name="body-header" slot="body-header"></slot>

        <!-- Large screens: Navigation in body-left slot -->
        ${this._isLargeScreen?this.#m?t`
                <div class="drawer-container ${this.miniHover?`mini-hover`:``}" slot="body-left">
                  ${this.useMiniDrawer?t`
                        <forge-mini-drawer ?hover=${this.miniHover} ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${this.#c}>
                          ${e}
                        </forge-mini-drawer>
                      `:t`
                        <forge-drawer ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${this.#c}
                          >${e}</forge-drawer
                        >
                      `}
                </div>
              `:e:``}

        <slot name="body" slot="body"></slot>
        <slot slot="body"></slot>
        <slot name="right" slot="right"></slot>
        <slot name="body-right" slot="body-right"></slot>
        <slot name="body-footer" slot="body-footer"></slot>

        <slot name="footer" slot="footer"></slot>
      </forge-scaffold>
    `}#n(){this._leftDrawerOpen&&(this._leftDrawerOpen=!1,C(this.#t,`drawer-open`,!1),C(this.#t,`drawer-closed`,!0),this.#p(!1))}#r(){this.#e=window.matchMedia(`(min-width: ${this.breakpoint}px)`),this._isLargeScreen=this.#e.matches,this.#o(),this.#e.addEventListener(`change`,this.#a)}#i(){this.#e&&=(this.#e.removeEventListener(`change`,this.#a),null)}#a;#o(){C(this.#t,`small`,!this._isLargeScreen),C(this.#t,`large`,this._isLargeScreen),this._leftDrawerOpen=!!this._isLargeScreen,C(this.#t,`drawer-open`,this._leftDrawerOpen),C(this.#t,`drawer-closed`,!this._leftDrawerOpen),this.hasUpdated&&this.#d()}#s;#c;#l;#u;#d(){let e=this.useMiniDrawer?`forge-mini-drawer`:`forge-drawer`,t=this.shadowRoot?.querySelector(e);t&&t.open!==this._leftDrawerOpen&&(t.open=this._leftDrawerOpen)}#f(e){let t=new CustomEvent(`forge-app-layout-breakpoint-change`,{bubbles:!0,composed:!0,cancelable:!0,detail:{breakpoint:e}});this.dispatchEvent(t)}#p(e){let t=new CustomEvent(`forge-app-layout-drawer-change`,{bubbles:!0,composed:!0,cancelable:!0,detail:{open:e}});this.dispatchEvent(t)}get#m(){return this._navigationNodes.length>0}},v([i({type:String,attribute:`app-title`})],Z.prototype,`appTitle`,void 0),v([i({type:String,attribute:`app-title-href`})],Z.prototype,`appTitleHref`,void 0),v([i({type:Number})],Z.prototype,`breakpoint`,void 0),v([i({type:Boolean,attribute:`use-mini-drawer`})],Z.prototype,`useMiniDrawer`,void 0),v([i({type:Boolean,attribute:`mini-hover`})],Z.prototype,`miniHover`,void 0),v([o({slot:`navigation`,flatten:!0})],Z.prototype,`_navigationNodes`,void 0),v([a()],Z.prototype,`_leftDrawerOpen`,void 0),v([a()],Z.prototype,`_isLargeScreen`,void 0),f(X,Z)})))()}function $(){return($=e((()=>{d(),Q(),q()})))()}export{$ as t};