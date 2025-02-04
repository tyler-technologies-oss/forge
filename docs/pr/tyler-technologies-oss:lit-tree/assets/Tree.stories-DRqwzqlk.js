import{r as B,a as N}from"./lit-element-JplMEnZc.js";import{x as v,E as z}from"./lit-html-paDGiEfB.js";import{g as Y}from"./utils-BgrpGqCf.js";import"./feature-detection-ONR9WHvu.js";import{n as g,t as q,r as P,a as Z}from"./query-assigned-nodes-DJTk3iGv.js";import{e as V}from"./class-map-D55lQyt8.js";import{s as S,t as O}from"./a11y-utils-BOPvdiVn.js";import{K as ee}from"./index-BgGCUUFB.js";import{K as te,L as re,U as ie}from"./index-CbZAylpk.js";import{o as ne}from"./style-map-C9nPWcxA.js";import{I as se}from"./icon-Ctzrqx63.js";import"./open-icon-BJwmkNNX.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let W=class extends Event{constructor(e,r,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=r,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let D=class{constructor(e,r,i,n){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(o,s)=>{this.unsubscribe&&(this.unsubscribe!==s&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(o,s)),this.unsubscribe=s},this.host=e,r.context!==void 0){const o=r;this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??!1}else this.context=r,this.callback=i,this.subscribe=n??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new W(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,r=!1){const i=r||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[r,{disposer:i}]of this.subscriptions)r(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,r,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:r});const{disposer:n}=this.subscriptions.get(e);e(this.value,n)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ae=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class K extends oe{constructor(e,r,i){var n,o;super(r.context!==void 0?r.initialValue:i),this.onContextRequest=s=>{const a=s.composedPath()[0];s.context===this.context&&a!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,a,s.subscribe))},this.onProviderRequest=s=>{const a=s.composedPath()[0];if(s.context!==this.context||a===this.host)return;const k=new Set;for(const[h,{consumerHost:_}]of this.subscriptions)k.has(h)||(k.add(h),_.dispatchEvent(new W(this.context,h,!0)));s.stopPropagation()},this.host=e,r.context!==void 0?this.context=r.context:this.context=r,this.attachListeners(),(o=(n=this.host).addController)==null||o.call(n,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new ae(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le({context:t}){return(e,r)=>{const i=new WeakMap;if(typeof r=="object")return r.addInitializer(function(){i.set(this,new K(this,{context:t}))}),{get(){return e.get.call(this)},set(n){var o;return(o=i.get(this))==null||o.setValue(n),e.set.call(this,n)},init(n){var o;return(o=i.get(this))==null||o.setValue(n),n}};{e.constructor.addInitializer(s=>{i.set(s,new K(s,{context:t}))});const n=Object.getOwnPropertyDescriptor(e,r);let o;if(n===void 0){const s=new WeakMap;o={get(){return s.get(this)},set(a){i.get(this).setValue(a),s.set(this,a)},configurable:!0,enumerable:!0}}else{const s=n.set;o={...n,set(a){i.get(this).setValue(a),s==null||s.call(this,a)}}}return void Object.defineProperty(e,r,o)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce({context:t,subscribe:e}){return(r,i)=>{typeof i=="object"?i.addInitializer(function(){new D(this,{context:t,callback:n=>{r.set.call(this,n)},subscribe:e})}):r.constructor.addInitializer(n=>{new D(n,{context:t,callback:o=>{n[i]=o},subscribe:e})})}}const b=Symbol("indeterminate");function f(t){return t.tagName.toLowerCase()==="forge-tree-item"}function d(t){return t.target.closest("forge-tree-item")}function he(t){return t.composedPath().filter(r=>r instanceof HTMLElement&&f(r))}function de(t){const e=t.composedPath(),r=e.findIndex(n=>n instanceof HTMLElement&&f(n)),i=e.findIndex(n=>n instanceof HTMLElement&&n.matches(".header"));return r>=0&&i>=0&&i<r}function fe(t){const e=t.composedPath(),r=e.findIndex(n=>n instanceof HTMLElement&&f(n)),i=e.findIndex(n=>n instanceof HTMLElement&&n.matches(".expand-icon"));return r>=0&&i>=0&&i<r}function pe(t){return t.target.closest("forge-tree-item")}function me(t){let e=0,r=m(t);for(;r;)e++,r=m(r);return e}function G(t){return t.closest("forge-tree")}function m(t){return t.parentElement&&f(t.parentElement)?t.parentElement:null}function w(t,e=!1){return e?Array.from(t.querySelectorAll("forge-tree-item")):Array.from(t.children).filter(r=>f(r))}function x(t){return Array.from(t.children).find(e=>f(e))??null}function T(t){const e=Array.from(t.children).filter(r=>f(r));return e[e.length-1]??null}function Q(t,e=!1){const r=m(t)??G(t);return r?w(r).filter(i=>e||i!==t):[]}function E(t,e=!0){if(e&&t.open&&x(t))return x(t);let r=t.nextElementSibling;for(;r&&!f(r);)r=r.nextElementSibling;if(r)return r;const i=m(t);return i?E(i,!1):null}function L(t){let e=t.previousElementSibling;for(;e&&!f(e);)e=e.previousElementSibling;if(!e)return m(t);if(!e.open||e.leaf)return e;let r=T(e);for(;r&&r.open;)r=T(r);return r}function ue(t,e){const r=h=>{var _;return((_=h.textContent)==null?void 0:_.trim().toLowerCase().startsWith(e))??!1},i=h=>{const _=w(h);for(const c of _){if(r(c))return c;if(c.open&&(o=i(c),o))return o}return null},n=(h,_=!0)=>{const c=Q(h,!0),J=c.indexOf(h)+(_?1:0);for(let I=J;I<c.length;I++){if(r(c[I]))return c[I];if(c[I].open&&(o=i(c[I]),o))return o}return null};e=e.toLowerCase();let o=null,s=t,a=!1;for(;!o&&s;)o=n(s,a),o||(a=!0,s=m(s));if(o)return o;const k=G(t);return!k||(s=x(k),!s)?null:n(s,!1)}function F(t){return w(t).some((e,r,i)=>e.indeterminate||e.selected!==i[0].selected)}function A(t){w(t,!0).forEach(e=>e.open=!1)}class ge{constructor(e){this.items=[],this._selectListener=console.log,this.host=e,e.addController(this)}hostConnected(){this.host.addEventListener("forge-tree-item-select",this._selectListener)}hostDisconnected(){this.host.removeEventListener("forge-tree-item-select",this._selectListener)}toggle(e,r){let i=[];this._addToSnapshot(e,i);const n=r??!e.selected;e.selected=n;const o=this.items.slice();i=this._updateSelectionsFromItem(e,i),this.host.mode==="multiple"&&(i=this._updateDescendentSelections(e,i),i=this._updateAncestorSelections(e,i));const s=new CustomEvent("forge-tree-item-select",{bubbles:!0,composed:!0,detail:e.value});e.dispatchEvent(s),s.defaultPrevented&&(this._restoreSnapshot(i),this.items=o)}extend(e){if(this.host.mode!=="multiple")return;const r=this.items[this.items.length-1];if(!r)return;const i=e.compareDocumentPosition(r);if(i===0)return;const o=i&Node.DOCUMENT_POSITION_FOLLOWING?E:L;let s=o(e);for(;s&&s!==r;)(s.leaf||!s.open)&&this.toggle(s,!0),s=o(s)}selectAll(){this.items=[];const e=w(this.host,!0);e.forEach(r=>{r.selected=!0,this.items.push(r)}),e.reverse().forEach(r=>{this._updateAncestorSelections(r)})}_handleSelectEvent(e){d(e)}_updateSelectionsFromItem(e,r){const i=r;if(!e.selected){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),i}return this.host.mode!=="multiple"?(this.items.forEach(n=>{n!==e&&(this._addToSnapshot(n,i),n.selected=!1)}),this.items=[e],i):(this.items.push(e),i)}_updateDescendentSelections(e,r=[]){const i=r;if(e.leaf)return i;const n=w(e,!0);return n.forEach(s=>{this._addToSnapshot(s,i),s.selected=e.selected;const a=this.items.indexOf(s);a!==-1&&(e.selected?this.items.push(s):this.items.splice(a,1))}),n.filter(s=>!s.leaf).reverse().forEach(s=>{this._addToSnapshot(s,i,{indeterminate:!0}),s[b]=F(s)}),this._addToSnapshot(e,i,{indeterminate:!0}),e[b]=F(e),i}_updateAncestorSelections(e,r=[]){const i=r;let n=m(e);for(;n;){if(this._addToSnapshot(n,i),n[b]=F(n),!n.indeterminate){const o=x(n);n.selected=(o==null?void 0:o.selected)??!1;const s=this.items.indexOf(n);n.selected&&s===-1?this.items.push(n):!n.selected&&s!==-1&&this.items.splice(s,1)}n=m(n)}return i}_addToSnapshot(e,r,i){const n=r.find(o=>o.el===e);if(n){i=i??{indeterminate:!0,open:!0,selected:!0},n.indeterminate=i.indeterminate?e.indeterminate:n.indeterminate,n.open=i.open?e.open:n.open,n.selected=i.selected?e.selected:n.selected;return}r.push({el:e,indeterminate:e.indeterminate,open:e.open,selected:e.selected})}_restoreSnapshot(e){e.forEach(r=>{r.el[b]=r.indeterminate,r.el.selected=r.selected,r.el.open=r.open})}}const _e=":host{display:block}.forge-tree{--_tree-background: var(--forge-tree-background, var(--forge-theme-primary-container, #d1d5ed));--_tree-color: var(--forge-tree-color, var(--forge-theme-on-primary-container, #222c62));--_tree-transition-duration: var(--forge-tree-transition-duration, var(--forge-animation-duration-short4, .2s));--_tree-transition-timing: var(--forge-tree-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_tree-shape: var(--forge-tree-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-padding: var(--forge-tree-padding, var(--forge-spacing-medium, 16px));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px))}.forge-tree{--_tree-item-check-display: var(--forge-tree-item-check-display, none);--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, none);display:flex;flex-direction:column;gap:var(--_tree-item-gap)}.forge-tree.indent-lines{--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, block)}.forge-tree.multiple{--_tree-item-check-display: var(--forge-tree-item-check-display, block);--forge-tree-item-selected-background: transparent}";var be=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,y=(t,e,r,i)=>{for(var n=i>1?void 0:i?ve(e,r):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(n=(i?s(e,r,n):s(n))||n);return i&&n&&be(e,r,n),n};const X="forge-tree";let u=class extends N{constructor(){super(),this.accordion=!1,this.indentLines=!1,this.mode="single",this.selectionFollowsFocus=!1,this.value=[],this._keyActionController=new ee(this,{actions:[{key:["ArrowUp","ArrowDown"],handler:this._handleArrowUpOrDown.bind(this),allowRepeat:!0},{key:"ArrowLeft",handler:this._handleArrowLeft.bind(this),allowRepeat:!0},{key:"ArrowRight",handler:this._handleArrowRight.bind(this),allowRepeat:!0},{key:"Home",handler:this._handleHome.bind(this)},{key:"End",handler:this._handleEnd.bind(this)},{key:"*",handler:this._handleAsterisk.bind(this)},{key:[{key:"a",modifier:"ctrl"},{key:"a",modifier:"meta"}],handler:this._handleA.bind(this)},{key:["Enter"," "],handler:this._handleEnterOrSpace.bind(this)}],searchHandler:this._search.bind(this)}),this._selectionController=new ge(this),this._internals=this.attachInternals(),this._updateContext()}connectedCallback(){super.connectedCallback(),this.tabIndex=0,S(this,this._internals,{role:"tree"}),this.addEventListener("focusin",this._handleFocusIn.bind(this)),this.addEventListener("focusout",this._handleFocusOut.bind(this))}willUpdate(t){t.has("accordion")&&A(this),(t.has("indentLines")||t.has("mode"))&&this._updateContext()}render(){return v`
      <div
        part="root"
        class=${V({"forge-tree":!0,"indent-lines":this.indentLines,multiple:this.mode==="multiple"})}
        @click=${this._handleClick}
        @forge-tree-item-open=${this._handleOpen}
        @forge-tree-item-update=${this._handleUpdate}>
        <slot></slot>
        <slot name="expand-icon"></slot>
        <slot name="collapse-icon"></slot>
      </div>
    `}_updateContext(){this._context={indentLines:this.indentLines,mode:this.mode}}_handleClick(t){if(!de(t))return;const e=pe(t);if(e){if(e.leaf){if(this.mode==="off")return;t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e);return}if(this.mode==="leaf"||this.mode==="off"){this._toggleOpen(e,t.altKey&&e.open);return}if(fe(t)){this._toggleOpen(e,t.altKey&&e.open);return}t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e)}}_handleArrowUpOrDown(t){const e=d(t);if(!e)return;const r=t.key==="ArrowDown"?E(e):L(e);r&&(t.shiftKey&&this.mode==="multiple"&&this._selectionController.toggle(r,!0),this._focusItem(r))}_handleArrowLeft(t){const e=d(t);if(e){if(!e.open){const r=m(e);r&&this._focusItem(r)}this._toggleOpen(e,!1,!1)}}_handleArrowRight(t){const e=d(t);if(!(!e||e.leaf)){if(e.open){const r=x(e);r&&this._focusItem(r)}this._toggleOpen(e,!1,!0)}}_handleHome(t){const e=d(t);if(!e)return;if(t.shiftKey&&(t.metaKey||t.ctrlKey)&&this.mode==="multiple"){let i=L(e);for(;i;)this._selectionController.toggle(i,!0),i=L(i)}const r=x(this);r&&this._focusItem(r)}_handleEnd(t){const e=d(t);if(!e)return;if(t.shiftKey&&(t.metaKey||t.ctrlKey)&&this.mode==="multiple"){let i=E(e);for(;i;)this._selectionController.toggle(i,!0),i=E(i)}let r=T(this);for(;r&&r.open;)r=T(r);r&&this._focusItem(r)}_handleAsterisk(t){const e=d(t);e&&Q(e,!0).forEach(r=>this._toggleOpen(r,!1,!0))}_handleA(){this.mode==="multiple"&&this._selectionController.selectAll()}_handleEnterOrSpace(t){const e=d(t);if(e){if(e.leaf){if(this.mode==="off")return;t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e);return}t.key==="Enter"?this._toggleOpen(e,t.altKey&&e.open):this._selectionController.toggle(e)}}_handleFocusIn(t){if(t.target===this){const r=this._lastFocusedItem??x(this);if(!r)return;this._focusItem(r)}const e=t.target;e&&f(e)&&(this._lastFocusedItem&&(this._lastFocusedItem.tabIndex=-1),e.tabIndex=0,this._lastFocusedItem=e,this.tabIndex=-1)}_handleFocusOut(t){const e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)}_handleOpen(t){if(!this.accordion)return;const e=d(t);if(!e||!e.open)return;const r=he(t);A(this),r.forEach(i=>i.open=!0)}_handleUpdate(t){t.stopPropagation(),console.log(t)}_search(t,e){const r=d(e);if(!r)return;const i=ue(r,t);i&&this._focusItem(i)}_toggleOpen(t,e=!1,r){t.open=r??!t.open,!t.open&&e&&A(t);const i=new CustomEvent("forge-tree-item-open",{bubbles:!0,composed:!0});t.dispatchEvent(i),i.defaultPrevented}_focusItem(t){t.focus(),this.mode!=="multiple"&&this.selectionFollowsFocus&&this._selectionController.toggle(t,!0)}};u.styles=B(_e);y([g({type:Boolean})],u.prototype,"accordion",2);y([g({type:Boolean,attribute:"indent-lines"})],u.prototype,"indentLines",2);y([g({type:String})],u.prototype,"mode",2);y([g({type:Boolean,attribute:"selection-follows-focus"})],u.prototype,"selectionFollowsFocus",2);y([g({type:Array})],u.prototype,"value",2);y([le({context:X})],u.prototype,"_context",2);u=y([q("forge-tree")],u);const xe=':host{display:block;outline:none}.forge-tree-item{--_tree-item-selected-background: var(--forge-tree-item-selected-background, var(--forge-theme-primary-container-low, #e8eaf6));--_tree-item-min-block-size: var(--forge-tree-item-min-block-size, var(--forge-spacing-xlarge, 32px));--_tree-item-shape: var(--forge-tree-item-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-item-padding-inline: var(--forge-tree-item-padding-inline, var(--forge-spacing-xxsmall, 4px));--_tree-item-padding-inline-start: var(--forge-tree-item-padding-inline-start, var(--_tree-item-padding-inline));--_tree-item-padding-inline-end: var(--forge-tree-item-padding-inline-end, var(--_tree-item-padding-inline));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px));--_tree-item-header-inline-gap: var(--forge-tree-item-header-inline-gap, var(--forge-spacing-xsmall, 8px));--_tree-item-indent-size: var(--forge-tree-item-indent-size, var(--forge-spacing-medium, 16px));--_tree-item-leaf-inset: var(--forge-tree-item-leaf-inset, var(--forge-spacing-large, 24px));--_tree-item-indent-line-style: var(--forge-tree-item-indent-line-style, solid);--_tree-item-indent-line-width: var(--forge-tree-item-indent-line-width, var(--forge-border-thin, 1px));--_tree-item-indent-line-color: var(--forge-tree-item-indent-line-color, var(--forge-theme-outline, #e0e0e0));--_tree-item-indent-line-offset: var(--forge-tree-item-indent-line-offset, 11.5px)}.forge-tree-item{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-text-low))}.forge-tree-item .header{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);display:flex;align-items:center;gap:var(--_tree-item-header-inline-gap);position:relative;border-radius:var(--_tree-item-shape);min-block-size:var(--_tree-item-min-block-size);padding-inline-start:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-padding-inline-start));padding-inline-end:var(--_tree-item-padding-inline-end)}.forge-tree-item .leaf-spacer{inline-size:var(--_tree-item-leaf-inset)}.forge-tree-item .content{overflow:hidden;margin-inline-end:auto;white-space:nowrap;text-overflow:ellipsis}.forge-tree-item .expand-icon{display:flex}.forge-tree-item .checkbox{--forge-icon-color: var(--_tree-item-checkbox-color);display:var(--_tree-item-check-display)}.forge-tree-item .children{display:flex;flex-direction:column;gap:var(--_tree-item-gap);position:relative;margin-block-start:var(--_tree-item-gap)}.forge-tree-item .children:after{display:var(--_tree-item-indent-line-display);position:absolute;left:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-indent-line-offset) + var(--_tree-item-padding-inline-start));block-size:100%;inline-size:var(--_tree-item-indent-line-width);border-inline-start-style:var(--_tree-item-indent-line-style);border-inline-start-width:var(--_tree-item-indent-line-width);border-inline-start-color:var(--_tree-item-indent-line-color);pointer-events:none;content:""}.forge-tree-item.interactive .header{cursor:pointer}.forge-tree-item.indeterminate{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}:host(:is(:state(leaf),:--leaf)) .expand-icon{display:none}:host(:is(:state(leaf),:--leaf)) .children{display:none}:host(:not(:is(:state(open),:--open))) .children{display:none}:host(:is(:state(selected),:--selected)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary));background:var(--_tree-item-selected-background)}:host(:is(:state(selected),:--selected)) forge-state-layer{--forge-state-layer-color: var(--forge-theme-primary)}:host(:is(:state(indeterminate),:--indeterminate)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}forge-focus-indicator{--forge-focus-indicator-shape: var(--_tree-item-shape);z-index:1}';var ye=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,p=(t,e,r,i)=>{for(var n=i>1?void 0:i?Ie(e,r):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(n=(i?s(e,r,n):s(n))||n);return i&&n&&ye(e,r,n),n},$,R;let l=class extends(R=N,$=b,R){constructor(){super(),this.selected=!1,this.open=!1,this[$]=!1,this._level=0,this._leaf=!0,this._checkboxIcon="check_box_outline_blank",this._internals=this.attachInternals(),se.define([te,re,ie])}get level(){return this._level}get leaf(){return!this._children.length}get indeterminate(){return this[b]}connectedCallback(){super.connectedCallback(),S(this,this._internals,{role:"treeitem"}),this.tabIndex=-1,this._level=me(this),this._placeInParent(),this._setLeaf()}willUpdate(t){t.has("open")&&this._setOpen(),t.has("selected")&&this._setSelected(),t.has(b)&&O(this._internals,"indeterminate",this.indeterminate),(t.has("selected")||t.has(b))&&(this._checkboxIcon=this.indeterminate?"indeterminate_check_box":this.selected?"check_box":"check_box_outline_blank")}render(){return v`
      <div
        part="root"
        class=${V({"forge-tree-item":!0,interactive:!this._leaf||this._context.mode!=="off"})}
        style=${ne({"--_tree-item-level":this.level})}>
        <div part="header" class="header">
          ${this._leaf?v`<span class="leaf-spacer"></span>`:v`
                <span part="expand-icon" class="expand-icon">
                  <slot name="expand-icon">
                    <forge-open-icon orientation="horizontal" rotation="half" .open="${this.open}"></forge-open-icon>
                  </slot>
                </span>
              `}
          ${this._context.mode==="multiple"?v`<forge-icon id="checkbox" class="checkbox" part="checkbox" .name="${this._checkboxIcon}"></forge-icon>`:z}
          <slot name="start"></slot>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <slot name="end"></slot>
          ${this._context.mode!=="off"||!this._leaf?v`<forge-state-layer></forge-state-layer>`:z}
          <forge-focus-indicator target=":host" focus-mode="focus" inward></forge-focus-indicator>
        </div>
        <div role="group" class="children" part="children">
          <slot name="children" @slotchange="${this._setLeaf}"></slot>
        </div>
      </div>
    `}_placeInParent(){const t=this.parentElement;(t==null?void 0:t.tagName.toLowerCase())==="forge-tree-item"&&(this.slot="children")}_setLeaf(){this._leaf=this.leaf,this._setOpen(),O(this._internals,"leaf",this._leaf)}_setOpen(){S(this,this._internals,{ariaExpanded:this.leaf?null:this.open?"true":"false"}),O(this._internals,"open",!this.leaf&&this.open)}_setSelected(){S(this,this._internals,{ariaSelected:this.selected?"true":"false"}),O(this._internals,"selected",this.selected)}};l.styles=B(xe);p([g({type:Object})],l.prototype,"value",2);p([g({type:Boolean})],l.prototype,"selected",2);p([g({type:Boolean})],l.prototype,"open",2);p([g({attribute:!1})],l.prototype,$,2);p([ce({context:X,subscribe:!0})],l.prototype,"_context",2);p([P()],l.prototype,"_level",2);p([P()],l.prototype,"_leaf",2);p([P()],l.prototype,"_checkboxIcon",2);p([Z({slot:"children",flatten:!0})],l.prototype,"_children",2);l=p([q("forge-tree-item")],l);const j="forge-tree",we={title:"Components/Tree",render:t=>v`
      <forge-tree .accordion=${t.accordion} .indentLines=${t.indentLines} .mode=${t.mode} .selectionFollowsFocus=${t.selectionFollowsFocus}>
        <forge-tree-item>
          <span>Item 1</span>
          <forge-tree-item>
            <span>Item 1.1</span>
            <forge-tree-item>
              <span>Item 1.1.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 1.1.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 1.1.3</span>
            </forge-tree-item>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 1.2</span>
            <forge-tree-item>
              <span>Item 1.2.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 1.2.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 1.2.3</span>
            </forge-tree-item>
          </forge-tree-item>
        </forge-tree-item>
        <forge-tree-item>
          <span>Item 2</span>
          <forge-tree-item>
            <span>Item 2.1</span>
            <forge-tree-item>
              <span>Item 2.1.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 2.1.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 2.1.3</span>
            </forge-tree-item>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 2.2</span>
            <forge-tree-item>
              <span>Item 2.2.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 2.2.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 2.2.3</span>
            </forge-tree-item>
          </forge-tree-item>
        </forge-tree-item>
        <forge-tree-item>
          <span>Item 3</span>
          <forge-tree-item>
            <span>Item 3.1</span>
            <forge-tree-item>
              <span>Item 3.1.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 3.1.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 3.1.3</span>
            </forge-tree-item>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 3.2</span>
            <forge-tree-item>
              <span>Item 3.2.1</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 3.2.2</span>
            </forge-tree-item>
            <forge-tree-item>
              <span>Item 3.2.3</span>
            </forge-tree-item>
          </forge-tree-item>
        </forge-tree-item>
      </forge-tree>
    `,component:j,argTypes:{...Y({tagName:j,controls:{accordion:{control:{type:"boolean"}},indentLines:{control:{type:"boolean"}},mode:{control:{type:"select",options:["single","multiple","leaf","off"]}},selectionFollowsFocus:{control:{type:"boolean"}},value:{control:{type:"text"}}}})},args:{accordion:!1,indentLines:!1,mode:"single",selectionFollowsFocus:!1,value:""}},C={};var H,M,U;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:"{}",...(U=(M=C.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};const ke=["Demo"],He=Object.freeze(Object.defineProperty({__proto__:null,Demo:C,__namedExportsOrder:ke,default:we},Symbol.toStringTag,{value:"Module"}));export{C as D,He as T};
