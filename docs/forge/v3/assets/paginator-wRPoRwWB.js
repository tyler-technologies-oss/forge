import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-B8S20_VI.js";import{C as a,S as o,ft as s,gt as c,kt as l,pt as u,t as d,x as f}from"./dist-CPhmYI86.js";import{c as p,p as m,r as h}from"./async-directive-DxgxD_o3.js";import{l as g,n as _,s as v,t as y}from"./base-lit-element-DD8AYzU0.js";import{o as b,s as x}from"./icon-BDzt98o-.js";import{St as S,X as C,t as w,wt as T,xt as E}from"./tyler-icons-CLXzO0Q_.js";import{n as D,p as O}from"./constants-jVWZdget.js";import{t as k}from"./decorate-2OK4V6AF.js";import{n as A,t as j}from"./icon-button-DeioeJbw.js";import{n as M,t as N}from"./tooltip-CQT6OkVK.js";import{n as P,t as F}from"./select-BAYGT-eW.js";var I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{O(),I=`${D}paginator`,L={PAGE_INDEX:`page-index`,PAGE_SIZE:`page-size`,OFFSET:`offset`,TOTAL:`total`,PAGE_SIZE_OPTIONS:`page-size-options`,LABEL:`label`,FIRST_LAST:`first-last`,FIRST:`first`,DISABLED:`disabled`,ALTERNATIVE:`alternative`},R={...L},z={LABEL:`.label > slot[name=label]`,PAGE_SIZE_SELECT:`.page-size-options`,RANGE_LABEL:`.range-label > slot[name=range-label]`,FIRST_PAGE_BUTTON:`.first-page`,FIRST_PAGE_CONTAINER:`#first-page-container`,PREVIOUS_PAGE_BUTTON:`.previous-page`,PREVIOUS_PAGE_CONTAINER:`#previous-page-container`,NEXT_PAGE_BUTTON:`.next-page`,NEXT_PAGE_CONTAINER:`#next-page-container`,LAST_PAGE_BUTTON:`.last-page`,LAST_PAGE_CONTAINER:`#last-page-container`,RANGE_LABEL_ALTERNATIVE:`.alternative-range-label > slot[name=alternative-range-label]`},B={CHANGE:`${I}-change`},V={DEFAULT_PAGE_INDEX:0,DEFAULT_TOTAL:0,DEFAULT_PAGE_SIZE:25,DEFAULT_PAGE_SIZE_OPTIONS:[5,15,25,50,100]},H={DEFAULT_LABEL:`Rows per page:`,RANGE_SEPARATOR_LABEL:`of`},U={elementName:I,observedAttributes:L,attributes:R,selectors:z,events:B,numbers:V,strings:H}})))()}var G;function K(){return(K=e((()=>{G=`:host{display:block}:host([hidden]){display:none}.forge-paginator{gap:var(--forge-spacing-xsmall,8px);display:flex}.container{gap:var(--forge-spacing-medium,16px);align-items:center;display:flex}.label,.range-label,.alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-font-size-scale,.75)));font-weight:var(--forge-typography-label1-font-weight,400);line-height:var(--forge-typography-label1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-line-height-scale,1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing,.0357143em);text-transform:var(--forge-typography-label1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-label1-text-decoration,inherit);text-decoration:var(--forge-typography-label1-text-decoration,inherit)}.actions{align-items:center;display:flex}.alternative-range-label{display:none}:host([alternative]) .alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit);display:inline-block}:host([alternative]) .container{display:none}:host([alternative]) .actions{justify-content:var(--forge-paginator-alternative-alignment,start);width:100%}`})))()}var q;function J(){return(J=e((()=>{d(),w(),i(),h(),_(),v(),A(),x(),F(),M(),W(),K(),q=class extends y{constructor(...e){super(...e),this.#e=U.numbers.DEFAULT_PAGE_INDEX,this.#t=U.numbers.DEFAULT_PAGE_SIZE,this.#n=U.numbers.DEFAULT_TOTAL,this.#r=0,this.#a=``,this.#o=!1,this.pageSizeOptions=U.numbers.DEFAULT_PAGE_SIZE_OPTIONS,this.label=U.strings.DEFAULT_LABEL,this.firstLast=!1,this.first=!1,this.disabled=!1,this.alternative=!1,this.#u=e=>{e.stopPropagation(),this.goToFirstPage()},this.#d=e=>{e.stopPropagation(),this.goToPreviousPage()},this.#f=e=>{e.stopPropagation(),this.goToNextPage()},this.#p=e=>{e.stopPropagation(),this.goToLastPage()},this.#m=e=>{e.stopPropagation();let t=Number(e.detail);this.#h(`page-size`,{pageIndex:0,pageSize:t})?(this.pageIndex=0,this.pageSize=t):e.preventDefault()}}static{this.styles=r(G)}static{this[a]=U.elementName}static{this[o]=[j,P,N]}static{b.define([C,E,S,T])}#e;#t;#n;#r;#i;#a;#o;set pageIndex(e){let t=Number.isFinite(e)?e:U.numbers.DEFAULT_PAGE_INDEX;this.#e!==t&&(this.#e=t,this.#y(),this.#x())}get pageIndex(){return this.#e}set pageSize(e){let t=Number.isFinite(e)?e:U.numbers.DEFAULT_PAGE_SIZE;this.#t!==t&&(this.#t=t,this.#y(),this.#x())}get pageSize(){return this.#t}set offset(e){this.#r!==e&&(this.#r=e,this.#b(e))}get offset(){return this.#r}set total(e){let t=Number.isFinite(e)?e:U.numbers.DEFAULT_TOTAL;this.#n!==t&&(this.#n=t,this.#x(),this.#r>0&&this.#n>0&&this.#b(this.#r))}get total(){return this.#n}set rangeLabelCallback(e){this.#i=e,this.#x()}get rangeLabelCallback(){return this.#i}connectedCallback(){super.connectedCallback(),this.#o=!0}updated(e){e.has(`pageSizeOptions`)&&this.#C()}focus(e){this.#w([this._pageSizeSelect,this._firstPageButton,this._previousPageButton,this._nextPageButton,this._lastPageButton],e)}goToFirstPage(){this.canGoToFirstPage()&&this.#h(`first-page`,{pageIndex:0})&&(this.pageIndex=0)}goToPreviousPage(){if(!this.canGoToPreviousPage())return;let e=this.pageIndex-1;this.#h(`previous-page`,{pageIndex:e})&&(this.pageIndex=e)}goToNextPage(){if(!this.canGoToNextPage())return;let e=this.pageIndex+1;this.#h(`next-page`,{pageIndex:e})&&(this.pageIndex=e)}goToLastPage(){if(!this.canGoToLastPage())return;let e=this.#g();this.#h(`last-page`,{pageIndex:e})&&(this.pageIndex=e)}canGoToFirstPage(){return this.#_()}canGoToPreviousPage(){return this.#_()}canGoToNextPage(){return this.#v()}canGoToLastPage(){return this.#v()}render(){return t`
      <div class="forge-paginator" part="root" forge-popover-host>
        <div class="container" part="container">
          <div class="label" part="label" id="label">
            <slot name="label">${this.label}</slot>
          </div>
          ${this.#s()}
          <div class="range-label" part="range-label">
            <slot name="range-label">${this.#a}</slot>
          </div>
        </div>

        <div class="actions" part="actions">
          ${this.first||this.firstLast?this.#c():n}

          <div id="previous-page-container">
            <forge-icon-button
              class="previous-page"
              part="previous-page-button"
              aria-labelledby="previous-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToPreviousPage()}
              @click=${this.#d}>
              <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="previous-page-tooltip" id="previous-page-tooltip">Go to the previous page</slot>
            </forge-tooltip>
          </div>

          <div class="alternative-range-label" part="alternative-range-label">
            <slot name="alternative-range-label">${this.#a}</slot>
          </div>

          <div id="next-page-container">
            <forge-icon-button
              class="next-page"
              part="next-page-button"
              aria-labelledby="next-page-tooltip"
              ?disabled=${this.disabled||!this.canGoToNextPage()}
              @click=${this.#f}>
              <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip placement="top">
              <slot name="next-page-tooltip" id="next-page-tooltip">Go to the next page</slot>
            </forge-tooltip>
          </div>

          ${this.firstLast?this.#l():n}
        </div>
      </div>
    `}#s(){return!c(this.pageSizeOptions)||!this.pageSizeOptions.length?n:t`
      <forge-select
        class="page-size-options"
        aria-labelledby="label"
        label-position="none"
        density="extra-small"
        part="page-size-options"
        ?disabled=${this.disabled}
        .value=${String(this.pageSize)}
        @change=${this.#m}></forge-select>
    `}#c(){return t`
      <div id="first-page-container">
        <forge-icon-button
          class="first-page"
          part="first-page-button"
          aria-labelledby="first-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToFirstPage()}
          @click=${this.#u}>
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="first-page-tooltip" id="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>
    `}#l(){return t`
      <div id="last-page-container">
        <forge-icon-button
          class="last-page"
          part="last-page-button"
          aria-labelledby="last-page-tooltip"
          ?disabled=${this.disabled||!this.canGoToLastPage()}
          @click=${this.#p}>
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip placement="top">
          <slot name="last-page-tooltip" id="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    `}#u;#d;#f;#p;#m;#h(e,{pageSize:t=this.pageSize,pageIndex:n=this.pageIndex}={}){let r={type:e,pageSize:t,pageIndex:n,offset:n*t},i=new CustomEvent(U.events.CHANGE,{detail:r,bubbles:!0,cancelable:!0});return this.dispatchEvent(i),!i.defaultPrevented}#g(){return Math.ceil(this.total/this.pageSize)-1}#_(){return this.pageIndex>0&&this.pageSize>0}#v(){return this.pageIndex<this.#g()&&this.pageSize>0}#y(){this.#n>0&&(this.#r=this.#e*this.#t)}#b(e){let t=e;t>=this.#n&&(t=this.#n>=this.#t?this.#n-this.#t:0),t=Math.min(Math.max(t,0),this.#n),this.pageIndex=Math.floor(t/this.#t)}#x(){this.#a=this.#S(),this.#o&&l.instance.announce(this.#a,`polite`)}#S(){if(typeof this.#i==`function`){let e={pageSize:this.#t,pageIndex:this.#e,offset:this.#r,pageStart:this.#e*this.#t+1,pageEnd:Math.min((this.#e+1)*this.#t,this.#n),total:this.#n};return this.#i.call(null,e)}if(this.#t>1){let e=this.#e*this.#t;return`${e+1}-${e<this.#n?Math.min(e+this.#t,this.#n):e+this.#t} ${U.strings.RANGE_SEPARATOR_LABEL} ${this.#n}`}return`${this.#e+1} ${U.strings.RANGE_SEPARATOR_LABEL} ${this.#n}`}#C(){if(!c(this.pageSizeOptions)||!this.pageSizeOptions.length)return;let e=this.pageSizeOptions.map(e=>({label:`${e}`,value:`${e}`})).sort((e,t)=>s(e.value)-s(t.value));this._pageSizeSelect.options=e}#w(e,t){let n=typeof t?.preventScroll!=`boolean`||t.preventScroll;for(let r of e)if(r&&r.isConnected&&!r.disabled&&r.style.display!==`none`){r.focus({...t,preventScroll:n});return}}},k([m({type:Number,reflect:!0,attribute:`page-index`})],q.prototype,`pageIndex`,null),k([m({type:Number,reflect:!0,attribute:`page-size`})],q.prototype,`pageSize`,null),k([m({type:Number,reflect:!0})],q.prototype,`offset`,null),k([m({type:Number,reflect:!0})],q.prototype,`total`,null),k([m({attribute:`page-size-options`,converter:{fromAttribute:e=>e?u(e):U.numbers.DEFAULT_PAGE_SIZE_OPTIONS}})],q.prototype,`pageSizeOptions`,void 0),k([m({reflect:!0,converter:{toAttribute:g}})],q.prototype,`label`,void 0),k([m({type:Boolean,reflect:!0,attribute:`first-last`})],q.prototype,`firstLast`,void 0),k([m({type:Boolean,reflect:!0})],q.prototype,`first`,void 0),k([m({type:Boolean,reflect:!0})],q.prototype,`disabled`,void 0),k([m({type:Boolean,reflect:!0})],q.prototype,`alternative`,void 0),k([m({attribute:!1})],q.prototype,`rangeLabelCallback`,null),k([p(`.first-page`)],q.prototype,`_firstPageButton`,void 0),k([p(`.previous-page`,!0)],q.prototype,`_previousPageButton`,void 0),k([p(`.next-page`,!0)],q.prototype,`_nextPageButton`,void 0),k([p(`.last-page`)],q.prototype,`_lastPageButton`,void 0),k([p(`.page-size-options`,!0)],q.prototype,`_pageSizeSelect`,void 0),f(U.elementName,q)})))()}function Y(){return(Y=e((()=>{d(),J(),W()})))()}export{Y as t};