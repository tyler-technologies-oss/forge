import{L as V}from"./live-announcer-DuLqNKxe.js";import{b as j,i as R,a as B}from"./utils-C1mY2kke.js";import{C as tt,a as et}from"./service-adapter-8tADcN_b.js";import{I as at,N as it,O as ot,P as st,Q as rt}from"./tyler-icons-CoQb4rn7.js";import{r as nt,A as L,b as S}from"./iframe-B3uRBkD3.js";import{n as d,r as lt,B as pt,t as gt}from"./base-lit-element-wRSof10S.js";import{e as x}from"./query-CtiAP21w.js";import{I as ht}from"./icon-button-Cv65tCEo.js";import{S as ft}from"./select-22_XPSIy.js";import"./label-WOSXuSGL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-BuTzYSPq.js";import"./list-ZmONF4RK.js";import"./popover-CoBuGMRm.js";import"./overlay-Y1uV9JXh.js";import"./skeleton-C3Ydk4_S.js";import"./option-Cu0cKHXU.js";import{a as ct}from"./tooltip-CgNnMk9Z.js";import{C as dt}from"./constants-C0GaoY7q.js";const U=`${dt}paginator`,ut={CHANGE:`${U}-change`},yt={DEFAULT_PAGE_INDEX:0,DEFAULT_TOTAL:0,DEFAULT_PAGE_SIZE:25,DEFAULT_PAGE_SIZE_OPTIONS:[5,15,25,50,100]},bt={DEFAULT_LABEL:"Rows per page:",RANGE_SEPARATOR_LABEL:"of"},g={elementName:U,events:ut,numbers:yt,strings:bt},mt=':host{display:block}:host([hidden]){display:none}.forge-paginator{display:flex;gap:var(--forge-spacing-xsmall, 8px)}.container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center}.label,.range-label,.alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}.actions{display:flex;align-items:center}.alternative-range-label{display:none}:host([alternative]) .alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);display:inline-block}:host([alternative]) .container{display:none}:host([alternative]) .actions{width:100%;justify-content:var(--forge-paginator-alternative-alignment, start)}';var vt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,W=t=>{throw TypeError(t)},l=(t,a,s,h)=>{for(var u=h>1?void 0:h?_t(a,s):a,m=t.length-1,A;m>=0;m--)(A=t[m])&&(u=(h?A(a,s,u):A(u))||u);return h&&u&&vt(a,s,u),u},C=(t,a,s)=>a.has(t)||W("Cannot "+s),e=(t,a,s)=>(C(t,a,"read from private field"),s?s.call(t):a.get(t)),f=(t,a,s)=>a.has(t)?W("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,s),b=(t,a,s,h)=>(C(t,a,"write to private field"),a.set(t,s),s),o=(t,a,s)=>(C(t,a,"access private method"),s),Z,X,D,c,p,n,y,_,P,T,i,H,K,Y,F,I,z,$,M,v,k,N,O,G,w,E,Q,q,J;let r=class extends(D=pt,X=tt,Z=et,D){constructor(){super(...arguments),f(this,i),f(this,c,g.numbers.DEFAULT_PAGE_INDEX),f(this,p,g.numbers.DEFAULT_PAGE_SIZE),f(this,n,g.numbers.DEFAULT_TOTAL),f(this,y,0),f(this,_),f(this,P,""),f(this,T,!1),this.pageSizeOptions=g.numbers.DEFAULT_PAGE_SIZE_OPTIONS,this.label=g.strings.DEFAULT_LABEL,this.firstLast=!1,this.first=!1,this.disabled=!1,this.alternative=!1,f(this,F,t=>{t.stopPropagation(),this.goToFirstPage()}),f(this,I,t=>{t.stopPropagation(),this.goToPreviousPage()}),f(this,z,t=>{t.stopPropagation(),this.goToNextPage()}),f(this,$,t=>{t.stopPropagation(),this.goToLastPage()}),f(this,M,t=>{t.stopPropagation();const a=Number(t.detail);o(this,i,v).call(this,"page-size",{pageIndex:0,pageSize:a})?(this.pageIndex=0,this.pageSize=a):t.preventDefault()})}set pageIndex(t){const a=Number.isFinite(t)?t:g.numbers.DEFAULT_PAGE_INDEX;e(this,c)!==a&&(b(this,c,a),o(this,i,G).call(this),o(this,i,E).call(this))}get pageIndex(){return e(this,c)}set pageSize(t){const a=Number.isFinite(t)?t:g.numbers.DEFAULT_PAGE_SIZE;e(this,p)!==a&&(b(this,p,a),o(this,i,G).call(this),o(this,i,E).call(this))}get pageSize(){return e(this,p)}set offset(t){e(this,y)!==t&&(b(this,y,t),o(this,i,w).call(this,t))}get offset(){return e(this,y)}set total(t){const a=Number.isFinite(t)?t:g.numbers.DEFAULT_TOTAL;e(this,n)!==a&&(b(this,n,a),o(this,i,E).call(this),e(this,y)>0&&e(this,n)>0&&o(this,i,w).call(this,e(this,y)))}get total(){return e(this,n)}set rangeLabelCallback(t){b(this,_,t),o(this,i,E).call(this)}get rangeLabelCallback(){return e(this,_)}connectedCallback(){super.connectedCallback(),b(this,T,!0)}updated(t){t.has("pageSizeOptions")&&o(this,i,q).call(this)}focus(t){o(this,i,J).call(this,[this._pageSizeSelect,this._firstPageButton,this._previousPageButton,this._nextPageButton,this._lastPageButton],t)}goToFirstPage(){if(!this.canGoToFirstPage())return;const t=0;o(this,i,v).call(this,"first-page",{pageIndex:t})&&(this.pageIndex=t)}goToPreviousPage(){if(!this.canGoToPreviousPage())return;const t=this.pageIndex-1;o(this,i,v).call(this,"previous-page",{pageIndex:t})&&(this.pageIndex=t)}goToNextPage(){if(!this.canGoToNextPage())return;const t=this.pageIndex+1;o(this,i,v).call(this,"next-page",{pageIndex:t})&&(this.pageIndex=t)}goToLastPage(){if(!this.canGoToLastPage())return;const t=o(this,i,k).call(this);o(this,i,v).call(this,"last-page",{pageIndex:t})&&(this.pageIndex=t)}canGoToFirstPage(){return o(this,i,N).call(this)}canGoToPreviousPage(){return o(this,i,N).call(this)}canGoToNextPage(){return o(this,i,O).call(this)}canGoToLastPage(){return o(this,i,O).call(this)}render(){return S`
      <div class="forge-paginator" part="root" forge-popover-host>
        <div class="container" part="container">
          <div class="label" part="label" id="label">
            <slot name="label">${this.label}</slot>
          </div>
          ${o(this,i,H).call(this)}
          <div class="range-label" part="range-label">
            <slot name="range-label">${e(this,P)}</slot>
          </div>
        </div>

        <div class="actions" part="actions">
          ${this.first||this.firstLast?o(this,i,K).call(this):L}

          <div id="previous-page-container">
            <forge-icon-button
              class="previous-page"
              part="previous-page-button"
              aria-labelledby="previous-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToPreviousPage()}
              @click=${e(this,I)}>
              <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="previous-page-tooltip" id="previous-page-tooltip">Go to the previous page</slot>
            </forge-tooltip>
          </div>

          <div class="alternative-range-label" part="alternative-range-label">
            <slot name="alternative-range-label">${e(this,P)}</slot>
          </div>

          <div id="next-page-container">
            <forge-icon-button
              class="next-page"
              part="next-page-button"
              aria-labelledby="next-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToNextPage()}
              @click=${e(this,z)}>
              <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="next-page-tooltip" id="next-page-tooltip">Go to the next page</slot>
            </forge-tooltip>
          </div>

          ${this.firstLast?o(this,i,Y).call(this):L}
        </div>
      </div>
    `}};c=new WeakMap;p=new WeakMap;n=new WeakMap;y=new WeakMap;_=new WeakMap;P=new WeakMap;T=new WeakMap;i=new WeakSet;H=function(){return!R(this.pageSizeOptions)||!this.pageSizeOptions.length?L:S`
      <forge-select
        class="page-size-options"
        aria-labelledby="label"
        label-position="none"
        density="extra-small"
        part="page-size-options"
        ?disabled=${this.disabled}
        .value=${String(this.pageSize)}
        @change=${e(this,M)}></forge-select>
    `};K=function(){return S`
      <div id="first-page-container">
        <forge-icon-button
          class="first-page"
          part="first-page-button"
          aria-labelledby="first-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToFirstPage()}
          @click=${e(this,F)}>
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="first-page-tooltip" id="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>
    `};Y=function(){return S`
      <div id="last-page-container">
        <forge-icon-button
          class="last-page"
          part="last-page-button"
          aria-labelledby="last-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToLastPage()}
          @click=${e(this,$)}>
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="last-page-tooltip" id="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    `};F=new WeakMap;I=new WeakMap;z=new WeakMap;$=new WeakMap;M=new WeakMap;v=function(t,{pageSize:a=this.pageSize,pageIndex:s=this.pageIndex}={}){const h=s*a,u={type:t,pageSize:a,pageIndex:s,offset:h},m=new CustomEvent(g.events.CHANGE,{detail:u,bubbles:!0,cancelable:!0});return this.dispatchEvent(m),!m.defaultPrevented};k=function(){return Math.ceil(this.total/this.pageSize)-1};N=function(){return this.pageIndex>0&&this.pageSize>0};O=function(){return this.pageIndex<o(this,i,k).call(this)&&this.pageSize>0};G=function(){e(this,n)>0&&b(this,y,e(this,c)*e(this,p))};w=function(t){let a=t;a>=e(this,n)&&(a=e(this,n)>=e(this,p)?e(this,n)-e(this,p):0),a=Math.min(Math.max(a,0),e(this,n)),this.pageIndex=Math.floor(a/e(this,p))};E=function(){b(this,P,o(this,i,Q).call(this)),e(this,T)&&V.instance.announce(e(this,P),"polite")};Q=function(){if(typeof e(this,_)=="function"){const t={pageSize:e(this,p),pageIndex:e(this,c),offset:e(this,y),pageStart:e(this,c)*e(this,p)+1,pageEnd:Math.min((e(this,c)+1)*e(this,p),e(this,n)),total:e(this,n)};return e(this,_).call(null,t)}if(e(this,p)>1){const t=e(this,c)*e(this,p),a=t+1,s=t<e(this,n)?Math.min(t+e(this,p),e(this,n)):t+e(this,p);return`${a}-${s} ${g.strings.RANGE_SEPARATOR_LABEL} ${e(this,n)}`}return`${e(this,c)+1} ${g.strings.RANGE_SEPARATOR_LABEL} ${e(this,n)}`};q=function(){if(!R(this.pageSizeOptions)||!this.pageSizeOptions.length)return;const t=this.pageSizeOptions.map(a=>({label:`${a}`,value:`${a}`})).sort((a,s)=>B(a.value)-B(s.value));this._pageSizeSelect.options=t};J=function(t,a){const s=typeof a?.preventScroll=="boolean"?a.preventScroll:!0;for(const h of t)if(h&&h.isConnected&&!h.disabled&&h.style.display!=="none"){h.focus({...a,preventScroll:s});return}};r.styles=nt(mt);r[X]=g.elementName;r[Z]=[ht,ft,ct];at.define([it,ot,st,rt]);l([d({type:Number,reflect:!0,attribute:"page-index"})],r.prototype,"pageIndex",1);l([d({type:Number,reflect:!0,attribute:"page-size"})],r.prototype,"pageSize",1);l([d({type:Number,reflect:!0})],r.prototype,"offset",1);l([d({type:Number,reflect:!0})],r.prototype,"total",1);l([d({attribute:"page-size-options",converter:{fromAttribute:t=>t?j(t):g.numbers.DEFAULT_PAGE_SIZE_OPTIONS}})],r.prototype,"pageSizeOptions",2);l([d({reflect:!0,converter:{toAttribute:lt}})],r.prototype,"label",2);l([d({type:Boolean,reflect:!0,attribute:"first-last"})],r.prototype,"firstLast",2);l([d({type:Boolean,reflect:!0})],r.prototype,"first",2);l([d({type:Boolean,reflect:!0})],r.prototype,"disabled",2);l([d({type:Boolean,reflect:!0})],r.prototype,"alternative",2);l([d({attribute:!1})],r.prototype,"rangeLabelCallback",1);l([x(".first-page")],r.prototype,"_firstPageButton",2);l([x(".previous-page",!0)],r.prototype,"_previousPageButton",2);l([x(".next-page",!0)],r.prototype,"_nextPageButton",2);l([x(".last-page")],r.prototype,"_lastPageButton",2);l([x(".page-size-options",!0)],r.prototype,"_pageSizeSelect",2);r=l([gt(g.elementName)],r);
