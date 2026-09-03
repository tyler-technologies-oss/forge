import{L as q}from"./live-announcer-DuLqNKxe.js";import{e as J,i as V,a as T}from"./utils-BBsKBbSu.js";import{C as j,a as tt}from"./service-adapter-8tADcN_b.js";import{I as et,N as at,O as it,P as ot,Q as st}from"./tyler-icons-CvAFZSnF.js";import{r as rt,A as B,b as C}from"./iframe-ZebJRd2k.js";import{n as d,r as nt,B as lt,t as pt}from"./base-lit-element-H2XiDNvj.js";import{e as x}from"./query-CtiAP21w.js";import{I as gt}from"./icon-button-DCXr5XdP.js";import{S as ht}from"./select-CTNbtzak.js";import"./label-f55TS_D7.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-Dh__ll_M.js";import"./list-N8ASX7X4.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./skeleton-q0AxETeF.js";import{a as ft}from"./tooltip-v0Hw78HT.js";import{C as ct}from"./constants-C8FIXqZ0.js";const R=`${ct}paginator`,dt={CHANGE:`${R}-change`},ut={DEFAULT_PAGE_INDEX:0,DEFAULT_TOTAL:0,DEFAULT_PAGE_SIZE:25,DEFAULT_PAGE_SIZE_OPTIONS:[5,15,25,50,100]},yt={DEFAULT_LABEL:"Rows per page:",RANGE_SEPARATOR_LABEL:"of"},g={elementName:R,events:dt,numbers:ut,strings:yt},bt=':host{display:block}:host([hidden]){display:none}.forge-paginator{display:flex;gap:var(--forge-spacing-xsmall, 8px)}.container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center}.label,.range-label,.alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}.actions{display:flex;align-items:center}.alternative-range-label{display:none}:host([alternative]) .alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);display:inline-block}:host([alternative]) .container{display:none}:host([alternative]) .actions{width:100%;justify-content:var(--forge-paginator-alternative-alignment, start)}';var mt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,U=t=>{throw TypeError(t)},l=(t,e,o,h)=>{for(var u=h>1?void 0:h?vt(e,o):e,m=t.length-1,S;m>=0;m--)(S=t[m])&&(u=(h?S(e,o,u):S(u))||u);return h&&u&&mt(e,o,u),u},F=(t,e,o)=>e.has(t)||U("Cannot "+o),a=(t,e,o)=>(F(t,e,"read from private field"),o?o.call(t):e.get(t)),f=(t,e,o)=>e.has(t)?U("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),b=(t,e,o,h)=>(F(t,e,"write to private field"),e.set(t,o),o),s=(t,e,o)=>(F(t,e,"access private method"),o),W,Z,D,c,p,n,y,_,P,A,i,X,H,$,L,I,M,z,v,k,N,O,G,w,E,K,Y,Q;let r=class extends(D=lt,Z=j,W=tt,D){constructor(){super(...arguments),f(this,i),f(this,c,g.numbers.DEFAULT_PAGE_INDEX),f(this,p,g.numbers.DEFAULT_PAGE_SIZE),f(this,n,g.numbers.DEFAULT_TOTAL),f(this,y,0),f(this,_),f(this,P,""),f(this,A,!1),this.pageSizeOptions=g.numbers.DEFAULT_PAGE_SIZE_OPTIONS,this.label=g.strings.DEFAULT_LABEL,this.firstLast=!1,this.first=!1,this.disabled=!1,this.alternative=!1,f(this,$,t=>{t.stopPropagation(),this.goToFirstPage()}),f(this,L,t=>{t.stopPropagation(),this.goToPreviousPage()}),f(this,I,t=>{t.stopPropagation(),this.goToNextPage()}),f(this,M,t=>{t.stopPropagation(),this.goToLastPage()}),f(this,z,t=>{t.stopPropagation();const e=Number(t.detail);s(this,i,v).call(this,"page-size",{pageIndex:0,pageSize:e})?(this.pageIndex=0,this.pageSize=e):t.preventDefault()})}set pageIndex(t){const e=Number.isFinite(t)?t:g.numbers.DEFAULT_PAGE_INDEX;a(this,c)!==e&&(b(this,c,e),s(this,i,G).call(this),s(this,i,E).call(this))}get pageIndex(){return a(this,c)}set pageSize(t){const e=Number.isFinite(t)?t:g.numbers.DEFAULT_PAGE_SIZE;a(this,p)!==e&&(b(this,p,e),s(this,i,G).call(this),s(this,i,E).call(this))}get pageSize(){return a(this,p)}set offset(t){a(this,y)!==t&&(b(this,y,t),s(this,i,w).call(this,t))}get offset(){return a(this,y)}set total(t){const e=Number.isFinite(t)?t:g.numbers.DEFAULT_TOTAL;a(this,n)!==e&&(b(this,n,e),s(this,i,E).call(this),a(this,y)>0&&a(this,n)>0&&s(this,i,w).call(this,a(this,y)))}get total(){return a(this,n)}set rangeLabelCallback(t){b(this,_,t),s(this,i,E).call(this)}get rangeLabelCallback(){return a(this,_)}connectedCallback(){super.connectedCallback(),b(this,A,!0)}updated(t){t.has("pageSizeOptions")&&s(this,i,Y).call(this)}focus(t){s(this,i,Q).call(this,[this._pageSizeSelect,this._firstPageButton,this._previousPageButton,this._nextPageButton,this._lastPageButton],t)}goToFirstPage(){if(!this.canGoToFirstPage())return;const t=0;s(this,i,v).call(this,"first-page",{pageIndex:t})&&(this.pageIndex=t)}goToPreviousPage(){if(!this.canGoToPreviousPage())return;const t=this.pageIndex-1;s(this,i,v).call(this,"previous-page",{pageIndex:t})&&(this.pageIndex=t)}goToNextPage(){if(!this.canGoToNextPage())return;const t=this.pageIndex+1;s(this,i,v).call(this,"next-page",{pageIndex:t})&&(this.pageIndex=t)}goToLastPage(){if(!this.canGoToLastPage())return;const t=s(this,i,k).call(this);s(this,i,v).call(this,"last-page",{pageIndex:t})&&(this.pageIndex=t)}canGoToFirstPage(){return s(this,i,N).call(this)}canGoToPreviousPage(){return s(this,i,N).call(this)}canGoToNextPage(){return s(this,i,O).call(this)}canGoToLastPage(){return s(this,i,O).call(this)}render(){return C`
      <div class="forge-paginator" part="root" forge-popover-host>
        <div class="container" part="container">
          <div class="label" part="label" id="label">
            <slot name="label">${this.label}</slot>
          </div>

          <forge-select
            class="page-size-options"
            aria-labelledby="label"
            label-position="none"
            density="extra-small"
            part="page-size-options"
            ?hidden=${!this.pageSizeOptions.length}
            ?disabled=${this.disabled}
            .value=${String(this.pageSize)}
            @change=${a(this,z)}></forge-select>

          <div class="range-label" part="range-label">
            <slot name="range-label">${a(this,P)}</slot>
          </div>
        </div>

        <div class="actions" part="actions">
          ${this.first||this.firstLast?s(this,i,X).call(this):B}

          <div id="previous-page-container">
            <forge-icon-button
              class="previous-page"
              part="previous-page-button"
              aria-labelledby="previous-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToPreviousPage()}
              @click=${a(this,L)}>
              <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="previous-page-tooltip" id="previous-page-tooltip">Go to the previous page</slot>
            </forge-tooltip>
          </div>

          <div class="alternative-range-label" part="alternative-range-label">
            <slot name="alternative-range-label">${a(this,P)}</slot>
          </div>

          <div id="next-page-container">
            <forge-icon-button
              class="next-page"
              part="next-page-button"
              aria-labelledby="next-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToNextPage()}
              @click=${a(this,I)}>
              <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="next-page-tooltip" id="next-page-tooltip">Go to the next page</slot>
            </forge-tooltip>
          </div>

          ${this.firstLast?s(this,i,H).call(this):B}
        </div>
      </div>
    `}};c=new WeakMap;p=new WeakMap;n=new WeakMap;y=new WeakMap;_=new WeakMap;P=new WeakMap;A=new WeakMap;i=new WeakSet;X=function(){return C`
      <div id="first-page-container">
        <forge-icon-button
          class="first-page"
          part="first-page-button"
          aria-labelledby="first-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToFirstPage()}
          @click=${a(this,$)}>
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="first-page-tooltip" id="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>
    `};H=function(){return C`
      <div id="last-page-container">
        <forge-icon-button
          class="last-page"
          part="last-page-button"
          aria-labelledby="last-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToLastPage()}
          @click=${a(this,M)}>
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="last-page-tooltip" id="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    `};$=new WeakMap;L=new WeakMap;I=new WeakMap;M=new WeakMap;z=new WeakMap;v=function(t,{pageSize:e=this.pageSize,pageIndex:o=this.pageIndex}={}){const h=o*e,u={type:t,pageSize:e,pageIndex:o,offset:h},m=new CustomEvent(g.events.CHANGE,{detail:u,bubbles:!0,cancelable:!0});return this.dispatchEvent(m),!m.defaultPrevented};k=function(){return Math.ceil(this.total/this.pageSize)-1};N=function(){return this.pageIndex>0&&this.pageSize>0};O=function(){return this.pageIndex<s(this,i,k).call(this)&&this.pageSize>0};G=function(){a(this,n)>0&&b(this,y,a(this,c)*a(this,p))};w=function(t){let e=t;e>=a(this,n)&&(e=a(this,n)>=a(this,p)?a(this,n)-a(this,p):0),e=Math.min(Math.max(e,0),a(this,n)),this.pageIndex=Math.floor(e/a(this,p))};E=function(){b(this,P,s(this,i,K).call(this)),a(this,A)&&q.instance.announce(a(this,P),"polite")};K=function(){if(typeof a(this,_)=="function"){const t={pageSize:a(this,p),pageIndex:a(this,c),offset:a(this,y),pageStart:a(this,c)*a(this,p)+1,pageEnd:Math.min((a(this,c)+1)*a(this,p),a(this,n)),total:a(this,n)};return a(this,_).call(null,t)}if(a(this,p)>1){const t=a(this,c)*a(this,p),e=t+1,o=t<a(this,n)?Math.min(t+a(this,p),a(this,n)):t+a(this,p);return`${e}-${o} ${g.strings.RANGE_SEPARATOR_LABEL} ${a(this,n)}`}return`${a(this,c)+1} ${g.strings.RANGE_SEPARATOR_LABEL} ${a(this,n)}`};Y=function(){if(!V(this.pageSizeOptions)||!this.pageSizeOptions.length)return;const t=this.pageSizeOptions.map(e=>({label:`${e}`,value:`${e}`})).sort((e,o)=>T(e.value)-T(o.value));this._pageSizeSelect.options=t,t.find(e=>T(e.value)===this.pageSize)||(this.pageSize=T(t[0].value))};Q=function(t,e){const o=typeof e?.preventScroll=="boolean"?e.preventScroll:!0;for(const h of t)if(h&&h.isConnected&&!h.disabled&&h.style.display!=="none"){h.focus({...e,preventScroll:o});return}};r.styles=rt(bt);r[Z]=g.elementName;r[W]=[gt,ht,ft];et.define([at,it,ot,st]);l([d({type:Number,reflect:!0,attribute:"page-index"})],r.prototype,"pageIndex",1);l([d({type:Number,reflect:!0,attribute:"page-size"})],r.prototype,"pageSize",1);l([d({type:Number,reflect:!0})],r.prototype,"offset",1);l([d({type:Number,reflect:!0})],r.prototype,"total",1);l([d({attribute:"page-size-options",converter:{fromAttribute:t=>t?J(t):g.numbers.DEFAULT_PAGE_SIZE_OPTIONS}})],r.prototype,"pageSizeOptions",2);l([d({reflect:!0,converter:{toAttribute:nt}})],r.prototype,"label",2);l([d({type:Boolean,reflect:!0,attribute:"first-last"})],r.prototype,"firstLast",2);l([d({type:Boolean,reflect:!0})],r.prototype,"first",2);l([d({type:Boolean,reflect:!0})],r.prototype,"disabled",2);l([d({type:Boolean,reflect:!0})],r.prototype,"alternative",2);l([d({attribute:!1})],r.prototype,"rangeLabelCallback",1);l([x(".first-page")],r.prototype,"_firstPageButton",2);l([x(".previous-page",!0)],r.prototype,"_previousPageButton",2);l([x(".next-page",!0)],r.prototype,"_nextPageButton",2);l([x(".last-page")],r.prototype,"_lastPageButton",2);l([x(".page-size-options",!0)],r.prototype,"_pageSizeSelect",2);r=l([pt(g.elementName)],r);
