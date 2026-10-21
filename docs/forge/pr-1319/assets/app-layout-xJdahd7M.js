import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{S as n,p as r}from"./iframe-Cygt-aqC.js";import{C as i,S as a,t as o,x as s}from"./dist-CPhmYI86.js";import{a as c,d as l,p as u,r as d}from"./async-directive-Q8FnHJMz.js";import{n as f,t as ee}from"./base-lit-element-DnyK-zrQ.js";import{s as te,x as p}from"./utils-B2Tk8obI.js";import{a as m,i as h,o as g,t as _}from"./icon-D3E8ATav.js";import{O as v,en as y,t as b}from"./tyler-icons-CLXzO0Q_.js";import{p as x}from"./constants-jVWZdget.js";import{t as S}from"./decorate-2OK4V6AF.js";import{a as C,i as w,n as T,o as E,r as D,t as O}from"./menu-button-DPZrds0o.js";import{n as k,t as A}from"./icon-button-CwoiDtUE.js";import{t as j}from"./icon-button-DiFzjO_-.js";import{n as M,r as ne,t as N}from"./toolbar-DeT5YqoD.js";import{n as P,r as F,t as I}from"./dialog-XMEkPvqF.js";import{n as L,r as R,t as z}from"./drawer-1BtL2FrW.js";import{n as B,r as V,t as H}from"./mini-drawer-d6fQ0JP-.js";import{n as U,r as W,t as G}from"./scaffold-NUY7AQ8t.js";import{n as K}from"./when-Daf2bbVy.js";function q(){return(q=e((()=>{x()})))()}var J;function Y(){return(Y=e((()=>{J=`:host{--_drawer-width:var(--forge-app-layout-drawer-width,320px);--_dialog-width:var(--forge-app-layout-dialog-width,320px);--_mini-drawer-z-index:var(--forge-app-layout-mini-drawer-z-index,3);height:100%;display:block}forge-app-bar{--forge-app-bar-logo-font-size:40px;--forge-app-bar-columns:auto 1fr auto}:host(:state(small)) forge-app-bar{--forge-app-bar-row-padding:0}slot[name=app-bar-logo]{--forge-icon-font-size:var(--forge-app-bar-logo-font-size)}.drawer-container.mini-hover{z-index:var(--_mini-drawer-z-index);overflow:visible}forge-drawer{--forge-drawer-width:var(--_drawer-width)}.close-drawer-button{padding-inline-start:var(--forge-spacing-xxsmall,4px)}.left-sheet-dialog{--forge-dialog-width:var(--_dialog-width)}.left-sheet-dialog::part(surface){display:block}`})))()}var X,Z;function Q(){return(Q=e((()=>{r(),d(),o(),b(),f(),te(),w(),O(),I(),z(),H(),j(),_(),G(),N(),q(),E(),D(),F(),R(),V(),k(),m(),W(),ne(),Y(),X=`forge-app-layout`,Z=class extends ee{static{this[i]=X}static{this[a]=[U,C,T,P,L,B,A,h,M]}static{g.define([v,y])}static{this.styles=n(J)}get isLargeScreen(){return this._isLargeScreen}#e;#t;constructor(){super(),this.appTitle=``,this.appTitleHref=``,this.breakpoint=960,this.useMiniDrawer=!1,this.miniHover=!1,this._leftDrawerOpen=!1,this._isLargeScreen=!1,this.#e=null,this.#a=e=>{this._isLargeScreen=e.matches,this.#o(),this.#f(this._isLargeScreen?`large`:`small`)},this.#s=()=>{this._isLargeScreen||(this._leftDrawerOpen=!this._leftDrawerOpen,p(this.#t,`drawer-open`,this._leftDrawerOpen),p(this.#t,`drawer-closed`,!this._leftDrawerOpen),this.#d(),this.#p(this._leftDrawerOpen))},this.#c=()=>{this.#n()},this.#l=e=>{e.target.name===`navigation`&&this.requestUpdate()},this.#u=e=>{e.composedPath().some(e=>e instanceof HTMLElement&&e.hasAttribute(`data-forge-app-layout-close`))&&this.closeDrawer()},this.#t=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.#r()}firstUpdated(e){super.firstUpdated(e),this.#o(),this.#d()}updated(e){super.updated(e),e.has(`breakpoint`)&&(this.#i(),this.#r())}disconnectedCallback(){super.disconnectedCallback(),this.#i()}closeDrawer(){this._isLargeScreen||this.#n()}render(){let e=t`<slot name="navigation" @slotchange=${this.#l}></slot>`;return t`
      <forge-scaffold>
        <forge-app-bar slot="header" .titleText=${this.appTitle} .href=${this.appTitleHref} theme-mode="scoped">
          <slot name="app-bar-logo" slot="logo">
            <forge-icon name="tyler_talking_t_logo"></forge-icon>
          </slot>
          <slot name="app-bar-start" slot="start"></slot>
          ${K(!this._isLargeScreen,()=>t`<forge-app-bar-menu-button slot="start" @click=${this.#s}></forge-app-bar-menu-button>`)}
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
    `}#n(){this._leftDrawerOpen&&(this._leftDrawerOpen=!1,p(this.#t,`drawer-open`,!1),p(this.#t,`drawer-closed`,!0),this.#p(!1))}#r(){this.#e=window.matchMedia(`(min-width: ${this.breakpoint}px)`),this._isLargeScreen=this.#e.matches,this.#o(),this.#e.addEventListener(`change`,this.#a)}#i(){this.#e&&=(this.#e.removeEventListener(`change`,this.#a),null)}#a;#o(){p(this.#t,`small`,!this._isLargeScreen),p(this.#t,`large`,this._isLargeScreen),this._leftDrawerOpen=!!this._isLargeScreen,p(this.#t,`drawer-open`,this._leftDrawerOpen),p(this.#t,`drawer-closed`,!this._leftDrawerOpen),this.hasUpdated&&this.#d()}#s;#c;#l;#u;#d(){let e=this.useMiniDrawer?`forge-mini-drawer`:`forge-drawer`,t=this.shadowRoot?.querySelector(e);t&&t.open!==this._leftDrawerOpen&&(t.open=this._leftDrawerOpen)}#f(e){let t=new CustomEvent(`forge-app-layout-breakpoint-change`,{bubbles:!0,composed:!0,cancelable:!0,detail:{breakpoint:e}});this.dispatchEvent(t)}#p(e){let t=new CustomEvent(`forge-app-layout-drawer-change`,{bubbles:!0,composed:!0,cancelable:!0,detail:{open:e}});this.dispatchEvent(t)}get#m(){return this._navigationNodes.length>0}},S([u({type:String,attribute:`app-title`})],Z.prototype,`appTitle`,void 0),S([u({type:String,attribute:`app-title-href`})],Z.prototype,`appTitleHref`,void 0),S([u({type:Number})],Z.prototype,`breakpoint`,void 0),S([u({type:Boolean,attribute:`use-mini-drawer`})],Z.prototype,`useMiniDrawer`,void 0),S([u({type:Boolean,attribute:`mini-hover`})],Z.prototype,`miniHover`,void 0),S([c({slot:`navigation`,flatten:!0})],Z.prototype,`_navigationNodes`,void 0),S([l()],Z.prototype,`_leftDrawerOpen`,void 0),S([l()],Z.prototype,`_isLargeScreen`,void 0),s(X,Z)})))()}function $(){return($=e((()=>{o(),Q(),q()})))()}export{$ as t};