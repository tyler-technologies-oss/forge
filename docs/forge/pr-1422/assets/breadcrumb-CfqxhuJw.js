import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-CbV23-8Y.js";import{d as a,l as o,o as s,t as c}from"./decorators-DcQFeJ4p.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{C as d,S as ee,o as f,t as p,x as m}from"./dist-CPhmYI86.js";import{n as h,t as g}from"./base-lit-element-BTojiV2b.js";import{a as te,i as ne,o as _,s as v,t as y}from"./icon-DTOjPWy9.js";import{t as b}from"./decorate-DvwEnSYK.js";import{Dt as re,Ot as ie,Rt as ae,bt as oe,t as x}from"./tyler-icons-kuH1S-j5.js";import{r as S,t as C}from"./if-defined-B1ve8lTA.js";import{n as w,t as T}from"./a11y-utils-DEp4pxq1.js";import{n as E,t as se}from"./icon-button-BRvxNmXW.js";import{n as ce}from"./button-D513iKC3.js";import{n as D,t as O}from"./tooltip-C7SiioYz.js";import{n as k}from"./list-item-BmeshPz7.js";import{n as A}from"./popover-zmgHerVR.js";var j;function M(){return(M=e((()=>{j=`:host{display:block}:host([hidden]){display:none}.forge-breadcrumb{--_breadcrumb-separator-content:var(--forge-breadcrumb-separator-content,"/");--_breadcrumb-separator-padding:var(--forge-breadcrumb-separator-padding,var(--forge-spacing-xxsmall,4px));align-items:center;min-inline-size:0;display:flex}.list{box-sizing:border-box;flex-wrap:wrap;flex:1;align-items:center;min-inline-size:0;margin:0;padding:0;list-style:none;display:flex}.list.scroll{scroll-behavior:smooth;scrollbar-width:none;flex-wrap:nowrap;overflow:auto}.list.scroll::-webkit-scrollbar{display:none}.list.scroll ::slotted(*){white-space:nowrap;flex:none}.scroll-button{flex:none}.scroll-button-previous:not(.disabled){border-inline-end:1px solid var(--forge-theme-outline,#e0e0e0)}.scroll-button-next:not(.disabled){border-inline-start:1px solid var(--forge-theme-outline,#e0e0e0)}.scroll-button.disabled{opacity:.38;pointer-events:none}`})))()}var N,P;function F(){return(F=e((()=>{p(),x(),i(),c(),u(),h(),T(),E(),v(),te(),D(),M(),N=`forge-breadcrumb`,P=class extends g{static{this.styles=r(j)}static{this[d]=N}static{this[ee]=[se,ne,O]}static{_.define([re,ie])}constructor(){super(),this.scrollButtons=!1,this._scrollable=!1,this._scrolledToStart=!0,this._scrolledToEnd=!0,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),w(this,this._internals,{role:`navigation`}),f.observe(this,this.#t.bind(this))}disconnectedCallback(){super.disconnectedCallback(),f.unobserve(this)}updated(e){e.has(`scrollButtons`)&&this.#i()}render(){let e=this.scrollButtons&&this._scrollable;return t`
      <div part="root" class="forge-breadcrumb">
        ${e?this.#s(`backward`):n}
        <ul part="list" class=${l({list:!0,scroll:this.scrollButtons})} role="list" @scroll=${this.#n}>
          <slot @slotchange=${this.#e}></slot>
        </ul>
        ${e?this.#s(`forward`):n}
      </div>
    `}async#e(){this.#i(),this._scrollable&&(await this.updateComplete,this.#o())}async#t(){let e=this._scrollable;this.#i(),!e&&this._scrollable&&(await this.updateComplete,this.#o())}#n(){this.#a()}#r(e){let t=e===`forward`?1:-1;this._list.scrollBy({behavior:`smooth`,left:this._list.offsetWidth*t})}#i(){this._scrollable=this.scrollButtons&&this._list.scrollWidth>this._list.clientWidth,this.#a()}#a(){let{scrollLeft:e,scrollWidth:t,clientWidth:n}=this._list;this._scrolledToStart=e===0,this._scrolledToEnd=e+n>=t-1}#o(){this._list.scrollTo({behavior:`instant`,left:this._list.scrollWidth})}#s(e){let r=e===`backward`,i=r?this._scrolledToStart:this._scrolledToEnd;return t`
      <forge-icon-button
        class=${l({"scroll-button":!0,"scroll-button-previous":r,"scroll-button-next":!r,disabled:i})}
        type="button"
        shape="squared"
        aria-disabled=${i?`true`:n}
        @click=${()=>this.#r(e)}>
        <forge-icon .name=${r?`keyboard_arrow_left`:`keyboard_arrow_right`}></forge-icon>
      </forge-icon-button>
      <forge-tooltip type="label" placement="bottom">${r?`Previous breadcrumbs`:`Next breadcrumbs`}</forge-tooltip>
    `}},b([a({type:Boolean,attribute:`scroll-buttons`})],P.prototype,`scrollButtons`,void 0),b([o()],P.prototype,`_scrollable`,void 0),b([o()],P.prototype,`_scrolledToStart`,void 0),b([o()],P.prototype,`_scrolledToEnd`,void 0),b([s(`.list`,!0)],P.prototype,`_list`,void 0),m(N,P)})))()}function I(){return(I=e((()=>{p(),F()})))()}var L;function R(){return(R=e((()=>{i(),C(),A(),L=class{constructor(e){this._host=e}renderPopover(e,n){return t`
      <forge-popover
        part="popover"
        class="popover"
        anchor=${e}
        placement="bottom-start"
        preset="list"
        @click=${this.#t}
        @focusout=${this.#n}>
        <div class="list" role="list"><slot name=${S(n)}></slot></div>
      </forge-popover>
    `}get#e(){return this._host.shadowRoot?.querySelector(`forge-popover`)??null}#t=e=>{this.#e&&e.composedPath().some(e=>e instanceof HTMLAnchorElement)&&(this.#e.open=!1)};#n=e=>{let{relatedTarget:t}=e;this.#e&&!(t instanceof Node&&this._host.contains(t))&&(this.#e.open=!1)}}})))()}var z;function B(){return(B=e((()=>{z=`:host{display:inline-block}:host([hidden]){display:none}.forge-breadcrumb-item{--_breadcrumb-separator-content:var(--forge-breadcrumb-separator-content,"/");--_breadcrumb-separator-padding:var(--forge-breadcrumb-separator-padding,var(--forge-spacing-xxsmall,4px));box-sizing:border-box;align-items:center;display:flex}.forge-breadcrumb-item:after{content:var(--_breadcrumb-separator-content)/"";color:var(--forge-theme-text-medium,#0009);padding-inline:var(--_breadcrumb-separator-padding)}.button{--forge-button-color:var(--forge-theme-primary,#3f51b5);--forge-button-min-width:0;--forge-button-padding:0 var(--forge-spacing-xxsmall,4px);--forge-button-spacing:0}.button::part(root){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit)}.menu-button{--forge-button-text-padding-inline:var(--forge-spacing-xxsmall,4px) 0}.icon-button{--forge-icon-size:18px;color:var(--forge-theme-primary,#3f51b5)}.menu-item:after{display:none}.list-item{inline-size:100%}.list{--_list-spacing:var(--forge-list-spacing,0);--_list-container-color:var(--forge-list-container-color,transparent);--_list-column-width:var(--forge-list-column-width,256px);--_list-column-spacing:var(--forge-list-column-spacing,var(--_list-spacing));--_list-navlist-spacing:var(--forge-list-navlist-spacing,var(--forge-spacing-xxsmall,4px));--_list-navlist-margin:var(--forge-list-navlist-margin,var(--forge-spacing-xxsmall,4px) var(--forge-spacing-xsmall,8px));--_list-navlist-height:var(--forge-list-navlist-height,40px);--_list-navlist-padding:var(--forge-list-navlist-padding,0 var(--forge-spacing-xsmall,8px));--_list-navlist-shape:var(--forge-list-navlist-shape,calc(var(--forge-shape-medium,4px) * var(--forge-shape-factor,1)));--_list-navlist-font-size:var(--forge-list-navlist-font-size,calc(var(--forge-typography-font-size,1rem) * .875));--_list-navlist-font-weight:var(--forge-list-navlist-font-weight,500);background-color:var(--_list-container-color);border-radius:inherit;min-width:inherit;gap:var(--_list-spacing);outline:none;min-width:0;margin:0;display:grid}.start{--forge-icon-color:var(--forge-theme-text-low,#00000061);--forge-icon-size:18px;display:contents}.text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit);padding-inline:var(--forge-spacing-xxxsmall,2px)}.text-icon{--forge-icon-color:var(--forge-theme-text-low,#00000061);--forge-icon-size:18px}.visually-hidden{clip-path:inset(50%);white-space:nowrap;block-size:1px;inline-size:1px;position:absolute;overflow:hidden}.current{color:var(--forge-theme-text-high,#000000de)}.current:after{display:none}`})))()}var V,H;function U(){return(U=e((()=>{p(),x(),i(),c(),u(),C(),h(),T(),y(),R(),ce(),E(),k(),D(),B(),V=`forge-breadcrumb-item`,H=class extends g{static{this.styles=r(z)}static{this[d]=V}static{_.define([oe])}constructor(){super(),this.current=!1,this.home=!1,this._isMenuItem=!1,this._hasChildItems=!1,this._menu=new L(this),this._childObserver=new MutationObserver(()=>this.#n()),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),w(this,this._internals,{role:`listitem`}),this.#t(),this.#n(),this._childObserver.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this._childObserver.disconnect()}willUpdate(e){e.has(`current`)&&w(this,this._internals,{ariaCurrent:this.current?`page`:null})}render(){let e=!this.href||this.current,r;return r=this._isMenuItem?t`
        <forge-list-item class="list-item" role="presentation">
          <slot name="start" slot="start"></slot>
          ${this.home?t`<forge-icon slot="start" name="home"></forge-icon>`:n}
          ${e?t`<span class="text"><slot></slot></span>`:t`<a href=${S(this.href)}><slot></slot></a>`}
        </forge-list-item>
      `:this._hasChildItems?this.#e():e?t`
        ${this.home?t` <forge-icon class="text-icon" name="home"></forge-icon> `:t`
              <div class="start">
                <slot name="start"></slot>
                <span class="text"><slot></slot></span>
              </div>
            `}
      `:this.home?t`
        <forge-icon-button part="button" class="icon-button" id="button" type="button" dense shape="squared">
          <a href=${S(this.href)}>
            <forge-icon name="home"></forge-icon>
          </a>
        </forge-icon-button>
        <forge-tooltip anchor="button" type="label" placement="bottom"><slot>Home</slot></forge-tooltip>
      `:t`
        <div class="start">
          <slot name="start"></slot>
        </div>
        <forge-button part="button" class="button" type="button" dense>
          <a href=${S(this.href)}>
            <slot></slot>
          </a>
        </forge-button>
      `,t`<div part="root" class="${l({"forge-breadcrumb-item":!0,current:this.current,"menu-item":this._isMenuItem})}">${r}</div>`}#e(){return t`
      ${this.home?t`
            <forge-icon-button part="button" class="icon-button" id="button" type="button" dense shape="squared" popover-icon>
              <forge-icon name="home"></forge-icon>
            </forge-icon-button>
            <forge-tooltip anchor="button" type="label" placement="bottom"><slot>Home</slot></forge-tooltip>
          `:t`
            <div class="start">
              <slot name="start"></slot>
            </div>
            <forge-button part="button" class="button menu-button" id="button" type="button" dense popover-icon>
              <slot></slot>
            </forge-button>
          `}
      ${this._menu.renderPopover(`button`,`children`)}
    `}#t(){this._isMenuItem=!!this.parentElement?.closest(`forge-breadcrumb-overflow-menu, forge-breadcrumb-item`)}#n(){this._hasChildItems=!!this.querySelector(`:scope > [slot="children"]`)}},b([a()],H.prototype,`href`,void 0),b([a({type:Boolean})],H.prototype,`current`,void 0),b([a({type:Boolean})],H.prototype,`home`,void 0),b([o()],H.prototype,`_isMenuItem`,void 0),b([o()],H.prototype,`_hasChildItems`,void 0),m(V,H)})))()}function W(){return(W=e((()=>{p(),U()})))()}var G;function K(){return(K=e((()=>{G=`:host{display:inline-block}:host([hidden]){display:none}.forge-breadcrumb-overflow-menu{--_breadcrumb-separator-content:var(--forge-breadcrumb-separator-content,"/");--_breadcrumb-separator-padding:var(--forge-breadcrumb-separator-padding,var(--forge-spacing-xxsmall,4px));box-sizing:border-box;align-items:center;display:flex}.forge-breadcrumb-overflow-menu:after{content:var(--_breadcrumb-separator-content)/"";color:var(--forge-theme-text-medium,#0009);padding-inline:var(--_breadcrumb-separator-padding)}.button{color:var(--forge-theme-primary,#3f51b5)}.list{--_list-spacing:var(--forge-list-spacing,0);--_list-container-color:var(--forge-list-container-color,transparent);--_list-column-width:var(--forge-list-column-width,256px);--_list-column-spacing:var(--forge-list-column-spacing,var(--_list-spacing));--_list-navlist-spacing:var(--forge-list-navlist-spacing,var(--forge-spacing-xxsmall,4px));--_list-navlist-margin:var(--forge-list-navlist-margin,var(--forge-spacing-xxsmall,4px) var(--forge-spacing-xsmall,8px));--_list-navlist-height:var(--forge-list-navlist-height,40px);--_list-navlist-padding:var(--forge-list-navlist-padding,0 var(--forge-spacing-xsmall,8px));--_list-navlist-shape:var(--forge-list-navlist-shape,calc(var(--forge-shape-medium,4px) * var(--forge-shape-factor,1)));--_list-navlist-font-size:var(--forge-list-navlist-font-size,calc(var(--forge-typography-font-size,1rem) * .875));--_list-navlist-font-weight:var(--forge-list-navlist-font-weight,500);background-color:var(--_list-container-color);border-radius:inherit;min-width:inherit;gap:var(--_list-spacing);outline:none;min-width:0;margin:0;display:grid}`})))()}var q,J,Y,X;function Z(){return(Z=e((()=>{p(),x(),i(),h(),T(),y(),R(),E(),D(),K(),q=`forge-breadcrumb-overflow-menu`,J=`trigger`,Y=`More breadcrumbs`,X=class extends g{static{this.styles=r(G)}static{this[d]=q}static{_.define([ae])}constructor(){super(),this._menu=new L(this),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),w(this,this._internals,{role:`listitem`})}render(){return t`
      <div part="root" class="forge-breadcrumb-overflow-menu">
        <forge-icon-button part="button" class="button" id=${J} type="button" dense shape="squared">
          <forge-icon name="more_horiz"></forge-icon>
        </forge-icon-button>
        <forge-tooltip anchor=${J} type="label" placement="bottom"><slot name="tooltip">${Y}</slot></forge-tooltip>
        ${this._menu.renderPopover(J)}
      </div>
    `}},m(q,X)})))()}function Q(){return(Q=e((()=>{p(),Z()})))()}function $(){return($=e((()=>{I(),W(),Q()})))()}export{$ as t};