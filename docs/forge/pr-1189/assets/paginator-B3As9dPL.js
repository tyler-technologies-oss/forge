var M=s=>{throw TypeError(s)};var F=(s,r,t)=>r.has(s)||M("Cannot "+t);var e=(s,r,t)=>(F(s,r,"read from private field"),t?t.call(s):r.get(s)),c=(s,r,t)=>r.has(s)?M("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(s):r.set(s,t),n=(s,r,t,i)=>(F(s,r,"write to private field"),i?i.call(s,t):r.set(s,t),t),o=(s,r,t)=>(F(s,r,"access private method"),t);import{L as tt}from"./live-announcer-DuLqNKxe.js";import{i as k,b as Z,f as et,t as at,C as it,a as ot}from"./service-adapter-DlT-lJx7.js";import{I as st,Q as rt,R as nt,S as pt,T as lt}from"./tyler-icons-DhRbvloE.js";import{r as gt,A as $,b as G}from"./iframe-BTsZxqzu.js";import{n as m}from"./property-DkOodoSL.js";import{e as O}from"./base-button-DyFlNd1j.js";import{r as ht,B as ft}from"./base-lit-element-fjOVRZ-k.js";import{I as ct}from"./icon-button-CSxHjIC-.js";import{S as dt}from"./select-Bwz3DagM.js";import"./label-OjWKjQls.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./popover-CdNzs7fC.js";import"./overlay-knVFCZgv.js";import"./skeleton-DBZT6LKu.js";import"./list-item-BTfzPPjj.js";import{a as ut}from"./tooltip-DAcILSGy.js";import{C as bt}from"./constants-DVKvft47.js";const K=`${bt}paginator`,yt={CHANGE:`${K}-change`},mt={DEFAULT_PAGE_INDEX:0,DEFAULT_TOTAL:0,DEFAULT_PAGE_SIZE:25,DEFAULT_PAGE_SIZE_OPTIONS:[5,15,25,50,100]},vt={DEFAULT_LABEL:"Rows per page:",RANGE_SEPARATOR_LABEL:"of"},d={elementName:K,events:yt,numbers:mt,strings:vt},Pt=':host{display:block}:host([hidden]){display:none}.forge-paginator{display:flex;gap:var(--forge-spacing-xsmall, 8px)}.container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center}.label,.range-label,.alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}.actions{display:flex;align-items:center}.alternative-range-label{display:none}:host([alternative]) .alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);display:inline-block}:host([alternative]) .container{display:none}:host([alternative]) .actions{width:100%;justify-content:var(--forge-paginator-alternative-alignment, start)}';var Et=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,f=(s,r,t,i)=>{for(var h=i>1?void 0:i?_t(r,t):r,b=s.length-1,x;b>=0;b--)(x=s[b])&&(h=(i?x(r,t,h):x(h))||h);return i&&h&&Et(r,t,h),h},X,j,H,u,g,p,y,P,v,_,a,Y,Q,q,S,L,I,z,N,E,D,R,B,C,U,T,J,V,W;const A=class A extends(H=ft,j=it,X=ot,H){constructor(){super(...arguments);c(this,a);c(this,u);c(this,g);c(this,p);c(this,y);c(this,P);c(this,v);c(this,_);c(this,S);c(this,L);c(this,I);c(this,z);c(this,N);n(this,u,d.numbers.DEFAULT_PAGE_INDEX),n(this,g,d.numbers.DEFAULT_PAGE_SIZE),n(this,p,d.numbers.DEFAULT_TOTAL),n(this,y,0),n(this,v,""),n(this,_,!1),this.pageSizeOptions=d.numbers.DEFAULT_PAGE_SIZE_OPTIONS,this.label=d.strings.DEFAULT_LABEL,this.firstLast=!1,this.first=!1,this.disabled=!1,this.alternative=!1,n(this,S,t=>{t.stopPropagation(),this.goToFirstPage()}),n(this,L,t=>{t.stopPropagation(),this.goToPreviousPage()}),n(this,I,t=>{t.stopPropagation(),this.goToNextPage()}),n(this,z,t=>{t.stopPropagation(),this.goToLastPage()}),n(this,N,t=>{t.stopPropagation();const i=Number(t.detail);o(this,a,E).call(this,"page-size",{pageIndex:0,pageSize:i})?(this.pageIndex=0,this.pageSize=i):t.preventDefault()})}set pageIndex(t){const i=Number.isFinite(t)?t:d.numbers.DEFAULT_PAGE_INDEX;e(this,u)!==i&&(n(this,u,i),o(this,a,C).call(this),o(this,a,T).call(this))}get pageIndex(){return e(this,u)}set pageSize(t){const i=Number.isFinite(t)?t:d.numbers.DEFAULT_PAGE_SIZE;e(this,g)!==i&&(n(this,g,i),o(this,a,C).call(this),o(this,a,T).call(this))}get pageSize(){return e(this,g)}set offset(t){e(this,y)!==t&&(n(this,y,t),o(this,a,U).call(this,t))}get offset(){return e(this,y)}set total(t){const i=Number.isFinite(t)?t:d.numbers.DEFAULT_TOTAL;e(this,p)!==i&&(n(this,p,i),o(this,a,T).call(this),e(this,y)>0&&e(this,p)>0&&o(this,a,U).call(this,e(this,y)))}get total(){return e(this,p)}set rangeLabelCallback(t){n(this,P,t),o(this,a,T).call(this)}get rangeLabelCallback(){return e(this,P)}connectedCallback(){super.connectedCallback(),n(this,_,!0)}updated(t){t.has("pageSizeOptions")&&o(this,a,V).call(this)}focus(t){o(this,a,W).call(this,[this._pageSizeSelect,this._firstPageButton,this._previousPageButton,this._nextPageButton,this._lastPageButton],t)}goToFirstPage(){if(!this.canGoToFirstPage())return;const t=0;o(this,a,E).call(this,"first-page",{pageIndex:t})&&(this.pageIndex=t)}goToPreviousPage(){if(!this.canGoToPreviousPage())return;const t=this.pageIndex-1;o(this,a,E).call(this,"previous-page",{pageIndex:t})&&(this.pageIndex=t)}goToNextPage(){if(!this.canGoToNextPage())return;const t=this.pageIndex+1;o(this,a,E).call(this,"next-page",{pageIndex:t})&&(this.pageIndex=t)}goToLastPage(){if(!this.canGoToLastPage())return;const t=o(this,a,D).call(this);o(this,a,E).call(this,"last-page",{pageIndex:t})&&(this.pageIndex=t)}canGoToFirstPage(){return o(this,a,R).call(this)}canGoToPreviousPage(){return o(this,a,R).call(this)}canGoToNextPage(){return o(this,a,B).call(this)}canGoToLastPage(){return o(this,a,B).call(this)}render(){return G`
      <div class="forge-paginator" part="root" forge-popover-host>
        <div class="container" part="container">
          <div class="label" part="label" id="label">
            <slot name="label">${this.label}</slot>
          </div>
          ${o(this,a,Y).call(this)}
          <div class="range-label" part="range-label">
            <slot name="range-label">${e(this,v)}</slot>
          </div>
        </div>

        <div class="actions" part="actions">
          ${this.first||this.firstLast?o(this,a,Q).call(this):$}

          <div id="previous-page-container">
            <forge-icon-button
              class="previous-page"
              part="previous-page-button"
              aria-labelledby="previous-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToPreviousPage()}
              @click=${e(this,L)}>
              <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="previous-page-tooltip" id="previous-page-tooltip">Go to the previous page</slot>
            </forge-tooltip>
          </div>

          <div class="alternative-range-label" part="alternative-range-label">
            <slot name="alternative-range-label">${e(this,v)}</slot>
          </div>

          <div id="next-page-container">
            <forge-icon-button
              class="next-page"
              part="next-page-button"
              aria-labelledby="next-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToNextPage()}
              @click=${e(this,I)}>
              <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="next-page-tooltip" id="next-page-tooltip">Go to the next page</slot>
            </forge-tooltip>
          </div>

          ${this.firstLast?o(this,a,q).call(this):$}
        </div>
      </div>
    `}};u=new WeakMap,g=new WeakMap,p=new WeakMap,y=new WeakMap,P=new WeakMap,v=new WeakMap,_=new WeakMap,a=new WeakSet,Y=function(){return!k(this.pageSizeOptions)||!this.pageSizeOptions.length?$:G`
      <forge-select
        class="page-size-options"
        aria-labelledby="label"
        label-position="none"
        density="extra-small"
        part="page-size-options"
        ?disabled=${this.disabled}
        .value=${String(this.pageSize)}
        @change=${e(this,N)}></forge-select>
    `},Q=function(){return G`
      <div id="first-page-container">
        <forge-icon-button
          class="first-page"
          part="first-page-button"
          aria-labelledby="first-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToFirstPage()}
          @click=${e(this,S)}>
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="first-page-tooltip" id="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>
    `},q=function(){return G`
      <div id="last-page-container">
        <forge-icon-button
          class="last-page"
          part="last-page-button"
          aria-labelledby="last-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToLastPage()}
          @click=${e(this,z)}>
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="last-page-tooltip" id="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    `},S=new WeakMap,L=new WeakMap,I=new WeakMap,z=new WeakMap,N=new WeakMap,E=function(t,{pageSize:i=this.pageSize,pageIndex:h=this.pageIndex}={}){const b=h*i,x={type:t,pageSize:i,pageIndex:h,offset:b},w=new CustomEvent(d.events.CHANGE,{detail:x,bubbles:!0,cancelable:!0});return this.dispatchEvent(w),!w.defaultPrevented},D=function(){return Math.ceil(this.total/this.pageSize)-1},R=function(){return this.pageIndex>0&&this.pageSize>0},B=function(){return this.pageIndex<o(this,a,D).call(this)&&this.pageSize>0},C=function(){e(this,p)>0&&n(this,y,e(this,u)*e(this,g))},U=function(t){let i=t;i>=e(this,p)&&(i=e(this,p)>=e(this,g)?e(this,p)-e(this,g):0),i=Math.min(Math.max(i,0),e(this,p)),this.pageIndex=Math.floor(i/e(this,g))},T=function(){n(this,v,o(this,a,J).call(this)),e(this,_)&&tt.instance.announce(e(this,v),"polite")},J=function(){if(typeof e(this,P)=="function"){const t={pageSize:e(this,g),pageIndex:e(this,u),offset:e(this,y),pageStart:e(this,u)*e(this,g)+1,pageEnd:Math.min((e(this,u)+1)*e(this,g),e(this,p)),total:e(this,p)};return e(this,P).call(null,t)}if(e(this,g)>1){const t=e(this,u)*e(this,g),i=t+1,h=t<e(this,p)?Math.min(t+e(this,g),e(this,p)):t+e(this,g);return`${i}-${h} ${d.strings.RANGE_SEPARATOR_LABEL} ${e(this,p)}`}return`${e(this,u)+1} ${d.strings.RANGE_SEPARATOR_LABEL} ${e(this,p)}`},V=function(){if(!k(this.pageSizeOptions)||!this.pageSizeOptions.length)return;const t=this.pageSizeOptions.map(i=>({label:`${i}`,value:`${i}`})).sort((i,h)=>Z(i.value)-Z(h.value));this._pageSizeSelect.options=t},W=function(t,i){const h=typeof i?.preventScroll=="boolean"?i.preventScroll:!0;for(const b of t)if(b&&b.isConnected&&!b.disabled&&b.style.display!=="none"){b.focus({...i,preventScroll:h});return}},A.styles=gt(Pt),A[j]=d.elementName,A[X]=[ct,dt,ut],st.define([rt,nt,pt,lt]);let l=A;f([m({type:Number,reflect:!0,attribute:"page-index"})],l.prototype,"pageIndex",1);f([m({type:Number,reflect:!0,attribute:"page-size"})],l.prototype,"pageSize",1);f([m({type:Number,reflect:!0})],l.prototype,"offset",1);f([m({type:Number,reflect:!0})],l.prototype,"total",1);f([m({attribute:"page-size-options",converter:{fromAttribute:s=>s?et(s):d.numbers.DEFAULT_PAGE_SIZE_OPTIONS}})],l.prototype,"pageSizeOptions",2);f([m({reflect:!0,converter:{toAttribute:ht}})],l.prototype,"label",2);f([m({type:Boolean,reflect:!0,attribute:"first-last"})],l.prototype,"firstLast",2);f([m({type:Boolean,reflect:!0})],l.prototype,"first",2);f([m({type:Boolean,reflect:!0})],l.prototype,"disabled",2);f([m({type:Boolean,reflect:!0})],l.prototype,"alternative",2);f([m({attribute:!1})],l.prototype,"rangeLabelCallback",1);f([O(".first-page")],l.prototype,"_firstPageButton",2);f([O(".previous-page",!0)],l.prototype,"_previousPageButton",2);f([O(".next-page",!0)],l.prototype,"_nextPageButton",2);f([O(".last-page")],l.prototype,"_lastPageButton",2);f([O(".page-size-options",!0)],l.prototype,"_pageSizeSelect",2);at(d.elementName,l);
