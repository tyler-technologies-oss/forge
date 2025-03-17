import{C as u,l as r,t as c,j as E,B as S,k as A}from"./constants-9n5_0r7k.js";import{B as L,c as l}from"./base-adapter-B6TJxM93.js";import{i as f,g as m,b as h,a as y,c as d,x as v}from"./feature-detection-DRCh51Sa.js";import{E as T,F as I,G as x,H as z}from"./index-ByifSpfC.js";import{I as N}from"./icon-button-BBeQfCZG.js";import{S as B}from"./select-ClxE0LHa.js";import"./label-BZR8wfMZ.js";import"./index-CiLSBptl.js";import"./button-BGYCwjxN.js";import"./focus-indicator-CcRMHyPf.js";import"./state-layer-CeKzZv66.js";import"./button-toggle-group-mB8WGz9d.js";import"./checkbox-C0_Zuap3.js";import{I as O}from"./icon-CND1_bFA.js";import"./switch-C3Bp6VOE.js";import"./linear-progress-CqfIuBkR.js";import"./list-DCk7XhUc.js";import"./popover-DKMemx82.js";import"./overlay-C0hWcV7g.js";import"./skeleton-D2S3-1Sc.js";import{a as F}from"./tooltip-Cps7zk-s.js";const b=`${u}paginator`,P={PAGE_INDEX:"page-index",PAGE_SIZE:"page-size",OFFSET:"offset",TOTAL:"total",PAGE_SIZE_OPTIONS:"page-size-options",LABEL:"label",FIRST_LAST:"first-last",FIRST:"first",DISABLED:"disabled",ALTERNATIVE:"alternative"},R={...P},C={LABEL:".label > slot[name=label]",PAGE_SIZE_SELECT:".page-size-options",RANGE_LABEL:".range-label > slot[name=range-label]",FIRST_PAGE_BUTTON:".first-page",FIRST_PAGE_CONTAINER:"#first-page-container",PREVIOUS_PAGE_BUTTON:".previous-page",PREVIOUS_PAGE_CONTAINER:"#previous-page-container",NEXT_PAGE_BUTTON:".next-page",NEXT_PAGE_CONTAINER:"#next-page-container",LAST_PAGE_BUTTON:".last-page",LAST_PAGE_CONTAINER:"#last-page-container",RANGE_LABEL_ALTERNATIVE:".alternative-range-label > slot[name=alternative-range-label]"},G={CHANGE:`${b}-change`},D={DEFAULT_PAGE_INDEX:0,DEFAULT_TOTAL:0,DEFAULT_PAGE_SIZE:25,DEFAULT_PAGE_SIZE_OPTIONS:[5,15,25,50,100]},U={DEFAULT_LABEL:"Rows per page:",RANGE_SEPARATOR_LABEL:"of"},a={elementName:b,observedAttributes:P,attributes:R,selectors:C,events:G,numbers:D,strings:U};class k{constructor(t){this._adapter=t,this._pageIndex=a.numbers.DEFAULT_PAGE_INDEX,this._pageSize=a.numbers.DEFAULT_PAGE_SIZE,this._offset=0,this._total=a.numbers.DEFAULT_TOTAL,this._pageSizeOptions=a.numbers.DEFAULT_PAGE_SIZE_OPTIONS.map(e=>({label:`${e}`,value:`${e}`})),this._label=a.strings.DEFAULT_LABEL,this._firstLast=!1,this._first=!1,this._disabled=!1,this._alternative=!1,this._firstPageListener=this._onFirstPage.bind(this),this._previousPageListener=this._onPreviousPage.bind(this),this._nextPageListener=this._onNextPage.bind(this),this._lastPageListener=this._onLastPage.bind(this),this._pageSizeListener=this._onPageSizeChanged.bind(this)}initialize(){this._updateRangeLabel(),this._adapter.setLabel(this._label),this._adapter.setPageSizeOptions(this._pageSizeOptions),this._adapter.setPageSize(this._pageSize),this._attachListeners(),this._toggleFirstLastButtons(),this._syncInteractionState()}focus(t){this._adapter.setFocus(t)}_attachListeners(){this._adapter.attachPageSizeChangeListener(this._pageSizeListener),this._adapter.attachFirstPageListener(this._firstPageListener),this._adapter.attachPreviousPageListener(this._previousPageListener),this._adapter.attachNextPageListener(this._nextPageListener),this._adapter.attachLastPageListener(this._lastPageListener)}_onFirstPage(t){if(t.stopPropagation(),!this._hasFirstPage())return;const e=0;this._dispatchChangeEvent("first-page",{pageIndex:e})&&this._applyPageIndex(e)}_onPreviousPage(t){if(t.stopPropagation(),!this._hasPreviousPage())return;const e=this._pageIndex-1;this._dispatchChangeEvent("previous-page",{pageIndex:e})&&this._applyPageIndex(e)}_onNextPage(t){if(t.stopPropagation(),!this._hasNextPage())return;const e=this._pageIndex+1;this._dispatchChangeEvent("next-page",{pageIndex:e})&&this._applyPageIndex(e)}_onLastPage(t){if(t.stopPropagation(),!this._hasLastPage())return;const e=this._getMaxPages();this._dispatchChangeEvent("last-page",{pageIndex:e})&&this._applyPageIndex(e)}_onPageSizeChanged(t){t.stopPropagation();const e=Number(t.detail);this._dispatchChangeEvent("page-size",{pageIndex:0,pageSize:e})?(this._applyPageIndex(0),this._applyPageSize(e)):t.preventDefault()}_dispatchChangeEvent(t,{pageSize:e=this._pageSize,pageIndex:s=this._pageIndex}={}){const i=s*e,p={type:t,pageSize:e,pageIndex:s,offset:i},_=new CustomEvent(a.events.CHANGE,{detail:p,bubbles:!0,cancelable:!0});return this._adapter.dispatchHostEvent(_),!_.defaultPrevented}_getMaxPages(){return Math.ceil(this._total/this._pageSize)-1}_updateRangeLabel(){let t;if(typeof this._rangeLabelCallback=="function"){const e={pageSize:this._pageSize,pageIndex:this._pageIndex,offset:this._offset,pageStart:this._pageIndex*this._pageSize+1,pageEnd:Math.min((this._pageIndex+1)*this._pageSize,this._total),total:this._total};t=this._rangeLabelCallback.call(null,e)}else if(this.pageSize>1){const e=this._pageIndex*this._pageSize,i=(Math.floor(e/this._pageSize)||0)*this._pageSize+1,p=e<this._total?Math.min(e+this._pageSize,this._total):e+this._pageSize;t=`${i}-${p} ${a.strings.RANGE_SEPARATOR_LABEL} ${this._total}`}else t=`${this._pageIndex+1} ${a.strings.RANGE_SEPARATOR_LABEL} ${this._total}`;this._adapter.setRangeLabel(t)}_syncInteractionState(){if(this._disabled)return;this._adapter.setFirstPageButtonEnabled(!0),this._adapter.setPreviousPageButtonEnabled(!0),this._adapter.setNextPageButtonEnabled(!0),this._adapter.setLastPageButtonEnabled(!0);const t=[];this._hasFirstPage()||t.push("first"),this._hasPreviousPage()||t.push("previous"),this._hasNextPage()||t.push("next"),this._hasLastPage()||t.push("last"),this._adapter.tryDisableFields(t)}_toggleFirstLastButtons(){this._toggleFirstButton(),this._firstLast?this._adapter.hasLastPageButton()||this._adapter.showLastPageButton():this._adapter.hasLastPageButton()&&this._adapter.hideLastPageButton()}_toggleFirstButton(){this._first||this._firstLast?this._adapter.hasFirstPageButton()||this._adapter.showFirstPageButton():this._adapter.hasFirstPageButton()&&this._adapter.hideFirstPageButton()}_hasFirstPage(){return this._hasPreviousPage()}_hasPreviousPage(){return this._pageIndex>0&&this._pageSize>0}_hasNextPage(){const t=this._getMaxPages();return this._pageIndex<t&&this._pageSize>0}_hasLastPage(){return this._hasNextPage()}_computePageIndexFromOffset(t){t>=this._total&&(this._total>=this._pageSize?t=this._total-this._pageSize:t=0);const e=Math.min(Math.max(t,0),this._total),s=Math.floor(e/this._pageSize);this._applyPageIndex(s)}_computeOffset(){this._total>0&&(this._offset=this._pageIndex*this._pageSize)}_applyPageIndex(t){this._pageIndex=t,this._computeOffset(),this._updateRangeLabel(),this._syncInteractionState(),this._adapter.toggleHostAttribute(a.attributes.PAGE_INDEX,this._pageIndex!=null,this._pageIndex.toString())}_applyPageSize(t){this._pageSize=t,this._adapter.setPageSize(this._pageSize),this._computeOffset(),this._updateRangeLabel(),this._syncInteractionState()}_applyTotal(t){this._total=t,this._updateRangeLabel(),this._offset>0&&this._total>0&&this._computePageIndexFromOffset(this._offset),this._syncInteractionState()}_applyDisabled(t){this._disabled=t,t?(this._adapter.setPageSizeSelectEnabled(!1),this._adapter.setFirstPageButtonEnabled(!1),this._adapter.setPreviousPageButtonEnabled(!1),this._adapter.setNextPageButtonEnabled(!1),this._adapter.setLastPageButtonEnabled(!1)):(this._adapter.setPageSizeSelectEnabled(!0),this._syncInteractionState())}get pageIndex(){return this._pageIndex}set pageIndex(t){this._pageIndex!==t&&(f(t)?this._applyPageIndex(t):this._adapter.removeHostAttribute(a.attributes.PAGE_INDEX))}get pageSize(){return this._pageSize}set pageSize(t){this._pageSize!==t&&(this._applyPageSize(t),this._adapter.setHostAttribute(a.attributes.PAGE_SIZE,`${this._pageSize}`))}get offset(){return this._offset}set offset(t){this._offset!==t&&(this._offset=t,this._computePageIndexFromOffset(t))}get total(){return this._total}set total(t){this._total!==t&&(this._applyTotal(t),this._adapter.setHostAttribute(a.attributes.TOTAL,`${this._total}`))}get pageSizeOptions(){return this._pageSizeOptions.map(t=>Number(t.value))}set pageSizeOptions(t){if(m(t)&&t.length){if(this._pageSizeOptions=t.map(e=>({label:e.toString(),value:e.toString()})).sort((e,s)=>h(e.value)-h(s.value)),this._adapter.setPageSizeOptions(this._pageSizeOptions),this._adapter.attachPageSizeChangeListener(this._pageSizeListener),this._adapter.setPageSizeVisibility(!0),f(this._pageSize)&&this._pageSizeOptions.length&&!this._pageSizeOptions.find(e=>h(e.value)===this._pageSize)){const e=h(this._pageSizeOptions[0].value);this._applyPageSize(e)}}else t!=null&&t.length||(this._adapter.detachPageSizeChangeListener(this._pageSizeListener),this._adapter.setPageSizeVisibility(!1))}get label(){return this._label}set label(t){this._label!==t&&(this._label=t,this._adapter.setLabel(this._label),f(this._label)&&this._label.length?this._adapter.setHostAttribute(a.attributes.LABEL,String(this._label)):this._adapter.removeHostAttribute(a.attributes.LABEL))}get firstLast(){return this._firstLast}set firstLast(t){t=!!t,this._firstLast!==t&&(this._firstLast=t,this._toggleFirstLastButtons(),this._adapter.toggleHostAttribute(a.attributes.FIRST_LAST,this._firstLast))}get first(){return this._first}set first(t){t=!!t,this._first!==t&&(this._first=t,this._toggleFirstButton(),this._adapter.toggleHostAttribute(a.attributes.FIRST,this._first))}get disabled(){return this._disabled}set disabled(t){t=!!t,this._disabled!==t&&(this._applyDisabled(t),this._adapter.toggleHostAttribute(a.attributes.DISABLED,this._disabled))}get alternative(){return this._alternative}set alternative(t){t=!!t,t!==this._alternative&&(this._alternative=t,this._adapter.toggleHostAttribute(a.attributes.ALTERNATIVE,this._alternative))}get rangeLabelCallback(){return this._rangeLabelCallback}set rangeLabelCallback(t){this._rangeLabelCallback=t,this._updateRangeLabel()}}class w extends L{constructor(t){super(t),this._labelElement=r(t,a.selectors.LABEL),this._pageSizeSelect=r(t,a.selectors.PAGE_SIZE_SELECT),this._rangeLabel=r(t,a.selectors.RANGE_LABEL),this._rangeLabelAlternative=r(t,a.selectors.RANGE_LABEL_ALTERNATIVE),this._firstPageButton=r(t,a.selectors.FIRST_PAGE_BUTTON),this._firstPageContainer=r(t,a.selectors.FIRST_PAGE_CONTAINER),this._previousPageButton=r(t,a.selectors.PREVIOUS_PAGE_BUTTON),this._previousPageContainer=r(t,a.selectors.PREVIOUS_PAGE_CONTAINER),this._nextPageButton=r(t,a.selectors.NEXT_PAGE_BUTTON),this._nextPageContainer=r(t,a.selectors.NEXT_PAGE_CONTAINER),this._lastPageButton=r(t,a.selectors.LAST_PAGE_BUTTON),this._lastPageContainer=r(t,a.selectors.LAST_PAGE_CONTAINER)}setLabel(t){this._labelElement.textContent=t}setPageSizeOptions(t){y(this._pageSizeSelect),this._pageSizeSelect.options=t}setPageSize(t){this._pageSizeSelect.value=t.toString()}setRangeLabel(t){this._rangeLabel.innerText=t,this._rangeLabelAlternative.innerText=t}hasFirstPageButton(){return!!r(this._component,a.selectors.FIRST_PAGE_BUTTON)}showFirstPageButton(){this._firstPagePlaceholder=c(this._component,!0,a.elementName,a.selectors.FIRST_PAGE_CONTAINER,this._firstPageContainer,this._firstPagePlaceholder)}hideFirstPageButton(){this._firstPagePlaceholder=c(this._component,!1,a.elementName,a.selectors.FIRST_PAGE_CONTAINER,this._firstPageContainer,this._firstPagePlaceholder)}hasLastPageButton(){return!!r(this._component,a.selectors.LAST_PAGE_BUTTON)}showLastPageButton(){this._lastPagePlaceholder=c(this._component,!0,a.elementName,a.selectors.LAST_PAGE_CONTAINER,this._lastPageContainer,this._lastPagePlaceholder)}hideLastPageButton(){this._lastPagePlaceholder=c(this._component,!1,a.elementName,a.selectors.LAST_PAGE_CONTAINER,this._lastPageContainer,this._lastPagePlaceholder)}attachPageSizeChangeListener(t){this._pageSizeSelect.addEventListener("change",t)}detachPageSizeChangeListener(t){this._pageSizeSelect.removeEventListener("change",t)}attachFirstPageListener(t){this._firstPageButton.addEventListener("click",t)}attachPreviousPageListener(t){this._previousPageButton.addEventListener("click",t)}attachNextPageListener(t){this._nextPageButton.addEventListener("click",t)}attachLastPageListener(t){this._lastPageButton.addEventListener("click",t)}setFirstPageButtonEnabled(t){this._firstPageButton.disabled=!t}setPreviousPageButtonEnabled(t){this._previousPageButton.disabled=!t}setNextPageButtonEnabled(t){this._nextPageButton.disabled=!t}setLastPageButtonEnabled(t){this._lastPageButton.disabled=!t}setPageSizeSelectEnabled(t){this._pageSizeSelect.disabled=!t}setPageSizeVisibility(t){this._pageSizeSelect.hidden=!t}setFocus(t){this._tryFocus([this._pageSizeSelect,this._firstPageButton,this._previousPageButton,this._nextPageButton,this._lastPageButton],t)}tryDisableFields(t){const e={first:()=>this.setFirstPageButtonEnabled(!1),last:()=>this.setLastPageButtonEnabled(!1),previous:()=>this.setPreviousPageButtonEnabled(!1),next:()=>this.setNextPageButtonEnabled(!1)};t.forEach(s=>{var i;return(i=e[s])==null?void 0:i.call(e)})}_tryFocus(t,e){const s=typeof(e==null?void 0:e.preventScroll)=="boolean"?e.preventScroll:!0;for(const i of t)if(i&&i.isConnected&&!i.disabled&&i.style.display!=="none"){i.focus({...e,preventScroll:s});return}}}const H=`<template>
  <div class="forge-paginator" part="root" forge-popover-host>
    <div class="container" part="container">
      <div class="label" part="label" id="label">
        <slot name="label"></slot>
      </div>

      <forge-select class="page-size-options" aria-labelledby="label" label-position="none" density="extra-small" part="page-size-options"></forge-select>

      <div class="range-label" part="range-label">
        <slot name="range-label"></slot>
      </div>
    </div>

    <div class="actions" part="actions">
      <div id="first-page-container">
        <forge-icon-button class="first-page" part="first-page-button" part="first-page-button-element">
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>

      <div id="previous-page-container">
        <forge-icon-button class="previous-page" part="previous-page-button" part="previous-page-button-element">
          <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="previous-page-tooltip">Go to the previous page</slot>
        </forge-tooltip>
      </div>

      <div class="alternative-range-label" part="alternative-range-label">
        <slot name="alternative-range-label"></slot>
      </div>

      <div id="next-page-container">
        <forge-icon-button class="next-page" part="next-page-button" part="next-page-button-element">
          <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="next-page-tooltip">Go to the next page</slot>
        </forge-tooltip>
      </div>

      <div id="last-page-container">
        <forge-icon-button class="last-page" part="last-page-button" part="last-page-button-element">
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    </div>
  </div>
</template>
`,Z=':host{display:block}:host([hidden]){display:none}.forge-paginator{display:flex;gap:var(--forge-spacing-xsmall, 8px)}.container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center}.label,.range-label,.alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}.actions{display:flex;align-items:center}.alternative-range-label{display:none}:host([alternative]) .alternative-range-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);display:inline-block}:host([alternative]) .container{display:none}:host([alternative]) .actions{width:100%;justify-content:var(--forge-paginator-alternative-alignment, start)}';var $=Object.defineProperty,M=Object.getOwnPropertyDescriptor,o=(g,t,e,s)=>{for(var i=s>1?void 0:s?M(t,e):t,p=g.length-1,_;p>=0;p--)(_=g[p])&&(i=(s?_(t,e,i):_(i))||i);return s&&i&&$(t,e,i),i};let n=class extends S{static get observedAttributes(){return Object.values(a.observedAttributes)}constructor(){super(),O.define([T,I,x,z]),A(this,H,Z),this._core=new k(new w(this))}connectedCallback(){this._core.initialize()}attributeChangedCallback(g,t,e){switch(g){case a.observedAttributes.PAGE_INDEX:this.pageIndex=h(e)??a.numbers.DEFAULT_PAGE_INDEX;break;case a.observedAttributes.PAGE_SIZE:this.pageSize=h(e)??a.numbers.DEFAULT_PAGE_SIZE;break;case a.observedAttributes.OFFSET:this.offset=h(e);break;case a.observedAttributes.TOTAL:this.total=h(e)??a.numbers.DEFAULT_TOTAL;break;case a.observedAttributes.PAGE_SIZE_OPTIONS:this.pageSizeOptions=v(e)??a.numbers.DEFAULT_PAGE_SIZE_OPTIONS;break;case a.observedAttributes.LABEL:this.label=e;break;case a.observedAttributes.FIRST_LAST:this.firstLast=d(e);break;case a.observedAttributes.FIRST:this.first=d(e);break;case a.observedAttributes.DISABLED:this.disabled=d(e);break;case a.observedAttributes.ALTERNATIVE:this.alternative=d(e);break}}focus(g){this._core.focus(g)}};o([l()],n.prototype,"pageIndex",2);o([l()],n.prototype,"pageSize",2);o([l()],n.prototype,"offset",2);o([l()],n.prototype,"total",2);o([l()],n.prototype,"pageSizeOptions",2);o([l()],n.prototype,"label",2);o([l()],n.prototype,"firstLast",2);o([l()],n.prototype,"first",2);o([l()],n.prototype,"disabled",2);o([l()],n.prototype,"alternative",2);o([l()],n.prototype,"rangeLabelCallback",2);n=o([E({name:a.elementName,dependencies:[N,B,F]})],n);
