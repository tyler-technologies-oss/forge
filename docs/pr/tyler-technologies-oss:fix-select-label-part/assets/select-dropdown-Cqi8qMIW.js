import{C as p,j as m,k as T}from"./constants-DHnR0122.js";import{c as _}from"./base-adapter-B_B1W7NX.js";import{n as g,c as E}from"./feature-detection-C61kIZu7.js";import{B as u,a as S,O as C,b,c as f,d as o}from"./select-GgERi9im.js";import{L as A,a as x}from"./list-BEAQdsdb.js";import{C as L}from"./circular-progress-CbpfkaY8.js";import{S as D}from"./scaffold-CWDbFKLY.js";import{T as y}from"./toolbar-CM1YCrRV.js";import{I as v}from"./icon-button-DJSm0po0.js";import"./focus-indicator-DydcbRnf.js";import"./index-CiLSBptl.js";import"./state-layer-Y8UVngaT.js";import"./icon-DNSPAaK0.js";import{P as O}from"./popover-DlgaZ2F2.js";const h=`${p}select-dropdown`,N={TARGET:"target",SELECTED_TEXT_TARGET:"selected-text-target",SYNC_SELECTED_TEXT:"sync-selected-text"},R={...N},P={SCROLLED_BOTTOM:`${h}-scrolled-bottom`},i={elementName:h,attributes:R,events:P};class B extends u{constructor(t){super(t),this._syncSelectedText=!1,this._originalTargetText="",this._targetDisconnectedListener=()=>this._onTargetDisconnected()}initialize(){this._tryAttach(),super.initialize()}destroy(){super.destroy(),this._adapter.isAttached()&&this._detach()}_onDropdownScrollEnd(){this._adapter.emitHostEvent(i.events.SCROLLED_BOTTOM)}_applyValue(t){super._applyValue(t),this._applySelection()}_applySelection(){if(super._applySelection(),this._syncSelectedText||typeof this._selectedTextBuilder=="function"){let t=this._getSelectedText();t||(t=this._originalTargetText),this._adapter.setTargetText(t||"",this._selectedTextTarget)}}_tryAttach(){this._adapter.attach(this._target),this._adapter.isAttached()&&(this._targetDisconnectedDestructor=this._adapter.setTargetDisconnectedListener(this._targetDisconnectedListener),this._originalTargetText=this._adapter.getTargetText(this._selectedTextTarget),this.initializeTarget())}_detach(){this._adapter.detach(),this._targetDisconnectedDestructor&&(this._targetDisconnectedDestructor(),this._targetDisconnectedDestructor=void 0)}_onTargetDisconnected(){this._adapter.detach()}get target(){return this._target}set target(t){this._target!==t&&(this._target=t,this._adapter.isAttached()&&this._detach(),this._tryAttach())}get selectedTextTarget(){return this._selectedTextTarget}set selectedTextTarget(t){this._selectedTextTarget!==t&&(this._selectedTextTarget=t)}get syncSelectedText(){return this._syncSelectedText}set syncSelectedText(t){this._syncSelectedText!==t&&(this._syncSelectedText=t)}}class w extends S{constructor(t){super(t)}initializeAccessibility(){this._targetElement.setAttribute("role","combobox"),this._targetElement.setAttribute("aria-live","polite"),this._targetElement.setAttribute("aria-haspopup","true"),this._targetElement.setAttribute("aria-expanded","false"),this.setAriaControls()}addClickListener(t){this._targetElement.addEventListener("click",t)}removeClickListener(t){this._targetElement&&this._targetElement.removeEventListener("click",t)}addTargetListener(t,e){let s,r;t==="keydown"&&(s=!1,r=!0),this._targetElement.addEventListener(t,e,{passive:s,capture:r})}removeTargetListener(t,e){this._targetElement&&this._targetElement.removeEventListener(t,e)}updateActiveDescendant(t){t?this._targetElement.setAttribute("aria-activedescendant",t):this._targetElement.removeAttribute("aria-activedescendant")}open(t){super.open(t),this._targetElement.setAttribute("aria-controls",`list-dropdown-popup-${t.id}`),this._targetElement.setAttribute("aria-expanded","true")}close(){return this._targetElement.setAttribute("aria-expanded","false"),this._targetElement.removeAttribute("aria-activedescendant"),this.setAriaControls(),super.close()}attach(t){const r=(this._component.getRootNode()||HTMLDocument||this._component.ownerDocument||document).querySelector(t);r&&(this._targetElement=r)}detach(){this._targetElement=void 0}setTargetDisconnectedListener(t){if(!this._targetElement||!this._targetElement.parentElement)return()=>{};const e=new MutationObserver(s=>{s.some(n=>Array.from(n.removedNodes).some(c=>c===this._targetElement))&&(e.disconnect(),t())});return e.observe(this._targetElement.parentElement,{childList:!0}),()=>e.disconnect()}isAttached(){return!!this._targetElement}setTargetText(t,e){let s=this._targetElement;if(e){const r=this._getElementBySelector(e);r&&(s=r)}s&&(s.textContent=t)}getTargetText(t){const e=t?this._getElementBySelector(t):this._targetElement;return e?e.innerText:""}_getElementBySelector(t){return this._targetElement.querySelector(t)||this._getRootNode().querySelector(t)}_getRootNode(){return this._component.getRootNode()??this._component.ownerDocument??document}setAriaControls(){let t=this._component.querySelector("[data-forge-aria-controls-placeholder]");if(t){this._targetElement.setAttribute("aria-controls",t.id);return}t=document.createElement("div"),t.id=`forge-select-dropdown-temp-${g(10)}`,t.setAttribute("data-forge-aria-controls-placeholder",""),this._targetElement.setAttribute("aria-controls",t.id),this._component.appendChild(t)}}const I=`<template></template>
`,M=":host{display:none}";var G=Object.defineProperty,X=Object.getOwnPropertyDescriptor,d=(a,t,e,s)=>{for(var r=s>1?void 0:s?X(t,e):t,n=a.length-1,c;n>=0;n--)(c=a[n])&&(r=(s?c(t,e,r):c(r))||r);return s&&r&&G(t,e,r),r};let l=class extends f{static get observedAttributes(){return[i.attributes.TARGET,i.attributes.SELECTED_TEXT_TARGET,i.attributes.SYNC_SELECTED_TEXT,o.attributes.VALUE,o.attributes.MULTIPLE,o.attributes.OBSERVE_SCROLL,o.attributes.OBSERVE_SCROLL_THRESHOLD,o.attributes.POPUP_CLASSES,o.attributes.OPTION_LIMIT,o.attributes.SYNC_POPUP_WIDTH]}constructor(){super(),T(this,I,M),this._core=new B(new w(this))}attributeChangedCallback(a,t,e){switch(a){case i.attributes.TARGET:this.target=e;return;case i.attributes.SELECTED_TEXT_TARGET:this.selectedTextTarget=e;return;case i.attributes.SYNC_SELECTED_TEXT:this.syncSelectedText=E(e);return}super.attributeChangedCallback(a,t,e)}};d([_()],l.prototype,"target",2);d([_()],l.prototype,"selectedTextTarget",2);d([_()],l.prototype,"syncSelectedText",2);l=d([m({name:i.elementName,dependencies:[C,b,O,A,x,L,D,y,v]})],l);
