import{C as p,z as m,n as T,o as g,b as E}from"./constants-BMnwgo1j.js";import{c as _}from"./base-adapter-CfNZnrSk.js";import{B as u,a as S,b as C,c as n,O as b,d as f}from"./select-DyTmoDGp.js";import{L as A,a as x}from"./list-CoNOG_pF.js";import{C as L}from"./circular-progress-NKHwVEeW.js";import{S as D}from"./scaffold-BBmmvCn_.js";import{T as v}from"./toolbar-ByH3IRVo.js";import{I as y}from"./icon-button-Dqh4j6OB.js";import"./focus-indicator-WHVXAnYX.js";import"./index-Dh0vMUMR.js";import"./state-layer-CoXZFfb6.js";import"./icon-CiIDkczu.js";import{P as O}from"./popover-BDS33NIt.js";const h=`${p}select-dropdown`,N={TARGET:"target",SELECTED_TEXT_TARGET:"selected-text-target",SYNC_SELECTED_TEXT:"sync-selected-text"},R={...N},P={SCROLLED_BOTTOM:`${h}-scrolled-bottom`},i={elementName:h,attributes:R,events:P};class B extends u{constructor(t){super(t),this._syncSelectedText=!1,this._originalTargetText="",this._targetDisconnectedListener=()=>this._onTargetDisconnected()}initialize(){this._tryAttach(),super.initialize()}disconnect(){super.disconnect(),this._adapter.isAttached()&&this._detach()}_onDropdownScrollEnd(){this._adapter.emitHostEvent(i.events.SCROLLED_BOTTOM)}_applyValue(t){super._applyValue(t),this._applySelection()}_applySelection(){if(super._applySelection(),this._syncSelectedText||typeof this._selectedTextBuilder=="function"){let t=this._getSelectedText();t||(t=this._originalTargetText),this._adapter.setTargetText(t||"",this._selectedTextTarget)}}_tryAttach(){this._adapter.attach(this._target),this._adapter.isAttached()&&(this._targetDisconnectedDestructor=this._adapter.setTargetDisconnectedListener(this._targetDisconnectedListener),this._originalTargetText=this._adapter.getTargetText(this._selectedTextTarget),this.initializeTarget())}_detach(){this._adapter.detach(),this._targetDisconnectedDestructor&&(this._targetDisconnectedDestructor(),this._targetDisconnectedDestructor=void 0)}_onTargetDisconnected(){this._adapter.detach()}get target(){return this._target}set target(t){this._target!==t&&(this._target=t,this._adapter.isAttached()&&this._detach(),this._tryAttach())}get selectedTextTarget(){return this._selectedTextTarget}set selectedTextTarget(t){this._selectedTextTarget!==t&&(this._selectedTextTarget=t)}get syncSelectedText(){return this._syncSelectedText}set syncSelectedText(t){this._syncSelectedText!==t&&(this._syncSelectedText=t)}}class w extends S{constructor(t){super(t)}initializeAccessibility(){this._targetElement.setAttribute("role","combobox"),this._targetElement.setAttribute("aria-live","polite"),this._targetElement.setAttribute("aria-haspopup","true"),this._targetElement.setAttribute("aria-expanded","false"),this.setAriaControls()}addClickListener(t){this._targetElement.addEventListener("click",t)}removeClickListener(t){this._targetElement&&this._targetElement.removeEventListener("click",t)}addTargetListener(t,e){let s,r;t==="keydown"&&(s=!1,r=!0),this._targetElement.addEventListener(t,e,{passive:s,capture:r})}removeTargetListener(t,e){this._targetElement&&this._targetElement.removeEventListener(t,e)}updateActiveDescendant(t){t?this._targetElement.setAttribute("aria-activedescendant",t):this._targetElement.removeAttribute("aria-activedescendant")}open(t){super.open(t),this._targetElement.setAttribute("aria-controls",`list-dropdown-popup-${t.id}`),this._targetElement.setAttribute("aria-expanded","true")}close(){return this._targetElement.setAttribute("aria-expanded","false"),this._targetElement.removeAttribute("aria-activedescendant"),this.setAriaControls(),super.close()}attach(t){const r=(this._component.getRootNode()||HTMLDocument||this._component.ownerDocument||document).querySelector(t);r&&(this._targetElement=r)}detach(){this._targetElement=void 0}setTargetDisconnectedListener(t){if(!this._targetElement||!this._targetElement.parentElement)return()=>{};const e=new MutationObserver(s=>{s.some(o=>Array.from(o.removedNodes).some(c=>c===this._targetElement))&&(e.disconnect(),t())});return e.observe(this._targetElement.parentElement,{childList:!0}),()=>e.disconnect()}isAttached(){return!!this._targetElement}setTargetText(t,e){let s=this._targetElement;if(e){const r=this._getElementBySelector(e);r&&(s=r)}s&&(s.textContent=t)}getTargetText(t){const e=t?this._getElementBySelector(t):this._targetElement;return e?e.innerText:""}_getElementBySelector(t){return this._targetElement.querySelector(t)||this._getRootNode().querySelector(t)}_getRootNode(){return this._component.getRootNode()??this._component.ownerDocument??document}setAriaControls(){let t=this._component.querySelector("[data-forge-aria-controls-placeholder]");if(t){this._targetElement.setAttribute("aria-controls",t.id);return}t=document.createElement("div"),t.id=`forge-select-dropdown-temp-${m(10)}`,t.setAttribute("data-forge-aria-controls-placeholder",""),this._targetElement.setAttribute("aria-controls",t.id),this._component.appendChild(t)}}const I=`<template></template>
`,M=":host{display:none}";var G=Object.defineProperty,X=Object.getOwnPropertyDescriptor,d=(a,t,e,s)=>{for(var r=s>1?void 0:s?X(t,e):t,o=a.length-1,c;o>=0;o--)(c=a[o])&&(r=(s?c(t,e,r):c(r))||r);return s&&r&&G(t,e,r),r};let l=class extends C{static get observedAttributes(){return[i.attributes.TARGET,i.attributes.SELECTED_TEXT_TARGET,i.attributes.SYNC_SELECTED_TEXT,n.attributes.VALUE,n.attributes.MULTIPLE,n.attributes.OBSERVE_SCROLL,n.attributes.OBSERVE_SCROLL_THRESHOLD,n.attributes.POPUP_CLASSES,n.attributes.OPTION_LIMIT,n.attributes.SYNC_POPUP_WIDTH]}constructor(){super(),g(this,I,M),this._core=new B(new w(this))}attributeChangedCallback(a,t,e){switch(a){case i.attributes.TARGET:this.target=e;return;case i.attributes.SELECTED_TEXT_TARGET:this.selectedTextTarget=e;return;case i.attributes.SYNC_SELECTED_TEXT:this.syncSelectedText=E(e);return}super.attributeChangedCallback(a,t,e)}};d([_()],l.prototype,"target",2);d([_()],l.prototype,"selectedTextTarget",2);d([_()],l.prototype,"syncSelectedText",2);l=d([T({name:i.elementName,dependencies:[b,f,O,A,x,L,D,v,y]})],l);
