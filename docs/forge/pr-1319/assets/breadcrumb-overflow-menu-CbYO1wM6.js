var N=n=>{throw TypeError(n)};var ot=(n,e,t)=>e.has(n)||N("Cannot "+t);var z=(n,e,t)=>e.has(n)?N("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var i=(n,e,t)=>(ot(n,e,"access private method"),t);import{t as S}from"./component-utils-vOrACU0E.js";import{F as D,C as A,a as rt}from"./service-adapter-8tADcN_b.js";import{Q as st,R as it,e as at,ak as nt}from"./tyler-icons-Bg2kTxF-.js";import{h as O,A as u,b as a}from"./iframe-C2tbTTep.js";import{n as $}from"./property-lDL70vqi.js";import{r as d}from"./state-I8fZ3b_X.js";import{e as lt}from"./query-CtiAP21w.js";import{e as T}from"./class-map-BPEoVUcZ.js";import{B as P}from"./base-lit-element-xzxMJccg.js";import{s as _}from"./a11y-utils-DssnAab5.js";import{I as ct}from"./icon-button-D2ZGiyZb.js";import{a as pt,I as B}from"./icon-BUL8G3Nr.js";import{a as ht}from"./tooltip-DJjJ4Er1.js";import{o as v}from"./if-defined-D5hFtQjO.js";import"./button-DHMiuwIf.js";import"./list-item-CwupyuZA.js";import"./popover-DaBw5jPK.js";const gt=':host{display:block}:host([hidden]){display:none}.forge-breadcrumb{--_breadcrumb-separator-content: var(--forge-breadcrumb-separator-content, "/");--_breadcrumb-separator-padding: var(--forge-breadcrumb-separator-padding, var(--forge-spacing-xxsmall, 4px))}.forge-breadcrumb{display:flex;align-items:center;min-inline-size:0}.list{box-sizing:border-box;display:flex;flex:1;flex-wrap:wrap;align-items:center;min-inline-size:0;margin:0;padding:0;list-style:none}.list.scroll{flex-wrap:nowrap;overflow:auto;scroll-behavior:smooth;scrollbar-width:none}.list.scroll::-webkit-scrollbar{display:none}.list.scroll ::slotted(*){flex:none;white-space:nowrap}.scroll-button{flex:none}.scroll-button-previous:not(.disabled){border-inline-end:1px solid var(--forge-theme-outline, #e0e0e0)}.scroll-button-next:not(.disabled){border-inline-start:1px solid var(--forge-theme-outline, #e0e0e0)}.scroll-button.disabled{opacity:.38;pointer-events:none}';var ft=Object.defineProperty,b=(n,e,t,r)=>{for(var s=void 0,c=n.length-1,g;c>=0;c--)(g=n[c])&&(s=g(e,t,s)||s);return s&&ft(e,t,s),s},L,U,W;const j="forge-breadcrumb";var o,K,Y,Q,V,y,k,I,C;const f=class f extends(W=P,U=A,L=rt,W){constructor(){super();z(this,o);this.scrollButtons=!1,this._scrollable=!1,this._scrolledToStart=!0,this._scrolledToEnd=!0,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),_(this,this._internals,{role:"navigation"}),D.observe(this,i(this,o,Y).bind(this))}disconnectedCallback(){super.disconnectedCallback(),D.unobserve(this)}updated(t){t.has("scrollButtons")&&i(this,o,y).call(this)}render(){const t=this.scrollButtons&&this._scrollable;return a`
      <div part="root" class="forge-breadcrumb">
        ${t?i(this,o,C).call(this,"backward"):u}
        <ul part="list" class=${T({list:!0,scroll:this.scrollButtons})} role="list" @scroll=${i(this,o,Q)}>
          <slot @slotchange=${i(this,o,K)}></slot>
        </ul>
        ${t?i(this,o,C).call(this,"forward"):u}
      </div>
    `}};o=new WeakSet,K=async function(){i(this,o,y).call(this),this._scrollable&&(await this.updateComplete,i(this,o,I).call(this))},Y=async function(){const t=this._scrollable;i(this,o,y).call(this),!t&&this._scrollable&&(await this.updateComplete,i(this,o,I).call(this))},Q=function(){i(this,o,k).call(this)},V=function(t){const r=t==="forward"?1:-1;this._list.scrollBy({behavior:"smooth",left:this._list.offsetWidth*r})},y=function(){this._scrollable=this.scrollButtons&&this._list.scrollWidth>this._list.clientWidth,i(this,o,k).call(this)},k=function(){const{scrollLeft:t,scrollWidth:r,clientWidth:s}=this._list;this._scrolledToStart=t===0,this._scrolledToEnd=t+s>=r-1},I=function(){this._list.scrollTo({behavior:"instant",left:this._list.scrollWidth})},C=function(t){const r=t==="backward",s=r?this._scrolledToStart:this._scrolledToEnd;return a`
      <forge-icon-button
        class=${T({"scroll-button":!0,"scroll-button-previous":r,"scroll-button-next":!r,disabled:s})}
        type="button"
        shape="squared"
        aria-disabled=${s?"true":u}
        @click=${()=>i(this,o,V).call(this,t)}>
        <forge-icon .name=${r?"keyboard_arrow_left":"keyboard_arrow_right"}></forge-icon>
      </forge-icon-button>
      <forge-tooltip type="label" placement="bottom">${r?"Previous breadcrumbs":"Next breadcrumbs"}</forge-tooltip>
    `},f.styles=O(gt),f[U]=j,f[L]=[ct,pt,ht],B.define([st,it]);let p=f;b([$({type:Boolean,attribute:"scroll-buttons"})],p.prototype,"scrollButtons");b([d()],p.prototype,"_scrollable");b([d()],p.prototype,"_scrolledToStart");b([d()],p.prototype,"_scrolledToEnd");b([lt(".list",!0)],p.prototype,"_list");S(j,p);class J{constructor(e){this._host=e}renderPopover(e,t){return a`
      <forge-popover
        part="popover"
        class="popover"
        anchor=${e}
        placement="bottom-start"
        preset="list"
        @click=${this.#e}
        @focusout=${this.#o}>
        <div class="list" role="list"><slot name=${v(t)}></slot></div>
      </forge-popover>
    `}get#t(){return this._host.shadowRoot?.querySelector("forge-popover")??null}#e=e=>{this.#t&&e.composedPath().some(t=>t instanceof HTMLAnchorElement)&&(this.#t.open=!1)};#o=e=>{const{relatedTarget:t}=e;this.#t&&!(t instanceof Node&&this._host.contains(t))&&(this.#t.open=!1)}}const dt=':host{display:inline-block}:host([hidden]){display:none}.forge-breadcrumb-item{--_breadcrumb-separator-content: var(--forge-breadcrumb-separator-content, "/");--_breadcrumb-separator-padding: var(--forge-breadcrumb-separator-padding, var(--forge-spacing-xxsmall, 4px))}.forge-breadcrumb-item{box-sizing:border-box;display:flex;align-items:center}.forge-breadcrumb-item:after{content:var(--_breadcrumb-separator-content)/"";color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6));padding-inline:var(--_breadcrumb-separator-padding)}.button{--forge-button-color: var(--forge-theme-primary, #3f51b5);--forge-button-min-width: 0;--forge-button-padding: 0 var(--forge-spacing-xxsmall, 4px);--forge-button-spacing: 0}.button::part(root){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit)}.menu-button{--forge-button-text-padding-inline: var(--forge-spacing-xxsmall, 4px) 0}.icon-button{--forge-icon-size: 18px;color:var(--forge-theme-primary, #3f51b5)}.menu-item:after{display:none}.list-item{inline-size:100%}.list{--_list-spacing: var(--forge-list-spacing, 0);--_list-container-color: var(--forge-list-container-color, transparent);--_list-column-width: var(--forge-list-column-width, 256px);--_list-column-spacing: var(--forge-list-column-spacing, var(--_list-spacing));--_list-navlist-spacing: var(--forge-list-navlist-spacing, var(--forge-spacing-xxsmall, 4px));--_list-navlist-margin: var(--forge-list-navlist-margin, var(--forge-spacing-xxsmall, 4px) var(--forge-spacing-xsmall, 8px));--_list-navlist-height: var(--forge-list-navlist-height, 40px);--_list-navlist-padding: var(--forge-list-navlist-padding, 0 var(--forge-spacing-xsmall, 8px));--_list-navlist-shape: var(--forge-list-navlist-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_list-navlist-font-size: var(--forge-list-navlist-font-size, calc(var(--forge-typography-font-size, 1rem) * .875));--_list-navlist-font-weight: var(--forge-list-navlist-font-weight, 500);outline:none;background-color:var(--_list-container-color);margin:0;border-radius:inherit;min-width:inherit;display:grid;gap:var(--_list-spacing);min-width:0}.start{--forge-icon-color: var(--forge-theme-text-low, rgba(0, 0, 0, .38));--forge-icon-size: 18px;display:contents}.text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);padding-inline:var(--forge-spacing-xxxsmall, 2px)}.text-icon{--forge-icon-color: var(--forge-theme-text-low, rgba(0, 0, 0, .38));--forge-icon-size: 18px}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.current{color:var(--forge-theme-text-high, rgba(0, 0, 0, .87))}.current:after{display:none}';var bt=Object.defineProperty,m=(n,e,t,r)=>{for(var s=void 0,c=n.length-1,g;c>=0;c--)(g=n[c])&&(s=g(e,t,s)||s);return s&&bt(e,t,s),s},q,G;const X="forge-breadcrumb-item";var l,Z,tt,M;const x=class x extends(G=P,q=A,G){constructor(){super();z(this,l);this.current=!1,this.home=!1,this._isMenuItem=!1,this._hasChildItems=!1,this._menu=new J(this),this._childObserver=new MutationObserver(()=>i(this,l,M).call(this)),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),_(this,this._internals,{role:"listitem"}),i(this,l,tt).call(this),i(this,l,M).call(this),this._childObserver.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this._childObserver.disconnect()}willUpdate(t){t.has("current")&&_(this,this._internals,{ariaCurrent:this.current?"page":null})}render(){const t=!this.href||this.current;let r;return this._isMenuItem?r=a`
        <forge-list-item class="list-item" role="presentation">
          <slot name="start" slot="start"></slot>
          ${this.home?a`<forge-icon slot="start" name="home"></forge-icon>`:u}
          ${t?a`<span class="text"><slot></slot></span>`:a`<a href=${v(this.href)}><slot></slot></a>`}
        </forge-list-item>
      `:this._hasChildItems?r=i(this,l,Z).call(this):t?r=a`
        ${this.home?a` <forge-icon class="text-icon" name="home"></forge-icon> `:a`
              <div class="start">
                <slot name="start"></slot>
                <span class="text"><slot></slot></span>
              </div>
            `}
      `:this.home?r=a`
        <forge-icon-button part="button" class="icon-button" id="button" type="button" dense shape="squared">
          <a href=${v(this.href)}>
            <forge-icon name="home"></forge-icon>
          </a>
        </forge-icon-button>
        <forge-tooltip anchor="button" type="label" placement="bottom"><slot>Home</slot></forge-tooltip>
      `:r=a`
        <div class="start">
          <slot name="start"></slot>
        </div>
        <forge-button part="button" class="button" type="button" dense>
          <a href=${v(this.href)}>
            <slot></slot>
          </a>
        </forge-button>
      `,a`<div part="root" class="${T({"forge-breadcrumb-item":!0,current:this.current,"menu-item":this._isMenuItem})}">${r}</div>`}};l=new WeakSet,Z=function(){return a`
      ${this.home?a`
            <forge-icon-button part="button" class="icon-button" id="button" type="button" dense shape="squared" popover-icon>
              <forge-icon name="home"></forge-icon>
            </forge-icon-button>
            <forge-tooltip anchor="button" type="label" placement="bottom"><slot>Home</slot></forge-tooltip>
          `:a`
            <div class="start">
              <slot name="start"></slot>
            </div>
            <forge-button part="button" class="button menu-button" id="button" type="button" dense popover-icon>
              <slot></slot>
            </forge-button>
          `}
      ${this._menu.renderPopover("button","children")}
    `},tt=function(){this._isMenuItem=!!this.parentElement?.closest("forge-breadcrumb-overflow-menu, forge-breadcrumb-item")},M=function(){this._hasChildItems=!!this.querySelector(':scope > [slot="children"]')},x.styles=O(dt),x[q]=X,B.define([at]);let h=x;m([$()],h.prototype,"href");m([$({type:Boolean})],h.prototype,"current");m([$({type:Boolean})],h.prototype,"home");m([d()],h.prototype,"_isMenuItem");m([d()],h.prototype,"_hasChildItems");S(X,h);const mt=':host{display:inline-block}:host([hidden]){display:none}.forge-breadcrumb-overflow-menu{--_breadcrumb-separator-content: var(--forge-breadcrumb-separator-content, "/");--_breadcrumb-separator-padding: var(--forge-breadcrumb-separator-padding, var(--forge-spacing-xxsmall, 4px))}.forge-breadcrumb-overflow-menu{box-sizing:border-box;display:flex;align-items:center}.forge-breadcrumb-overflow-menu:after{content:var(--_breadcrumb-separator-content)/"";color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6));padding-inline:var(--_breadcrumb-separator-padding)}.button{color:var(--forge-theme-primary, #3f51b5)}.list{--_list-spacing: var(--forge-list-spacing, 0);--_list-container-color: var(--forge-list-container-color, transparent);--_list-column-width: var(--forge-list-column-width, 256px);--_list-column-spacing: var(--forge-list-column-spacing, var(--_list-spacing));--_list-navlist-spacing: var(--forge-list-navlist-spacing, var(--forge-spacing-xxsmall, 4px));--_list-navlist-margin: var(--forge-list-navlist-margin, var(--forge-spacing-xxsmall, 4px) var(--forge-spacing-xsmall, 8px));--_list-navlist-height: var(--forge-list-navlist-height, 40px);--_list-navlist-padding: var(--forge-list-navlist-padding, 0 var(--forge-spacing-xsmall, 8px));--_list-navlist-shape: var(--forge-list-navlist-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_list-navlist-font-size: var(--forge-list-navlist-font-size, calc(var(--forge-typography-font-size, 1rem) * .875));--_list-navlist-font-weight: var(--forge-list-navlist-font-weight, 500);outline:none;background-color:var(--_list-container-color);margin:0;border-radius:inherit;min-width:inherit;display:grid;gap:var(--_list-spacing);min-width:0}';var H,F;const et="forge-breadcrumb-overflow-menu",E="trigger",ut="More breadcrumbs",w=class w extends(F=P,H=A,F){constructor(){super(),this._menu=new J(this),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),_(this,this._internals,{role:"listitem"})}render(){return a`
      <div part="root" class="forge-breadcrumb-overflow-menu">
        <forge-icon-button part="button" class="button" id=${E} type="button" dense shape="squared">
          <forge-icon name="more_horiz"></forge-icon>
        </forge-icon-button>
        <forge-tooltip anchor=${E} type="label" placement="bottom"><slot name="tooltip">${ut}</slot></forge-tooltip>
        ${this._menu.renderPopover(E)}
      </div>
    `}};w.styles=O(mt),w[H]=et,B.define([nt]);let R=w;S(et,R);
