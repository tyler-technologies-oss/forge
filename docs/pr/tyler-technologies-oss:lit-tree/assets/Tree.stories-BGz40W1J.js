import{r as B,a as M}from"./lit-element-JplMEnZc.js";import{x as I,E as F}from"./lit-html-paDGiEfB.js";import{g as J}from"./utils-DzhRrs8R.js";import"./feature-detection-ONR9WHvu.js";import{n as u,t as N,r as P,a as Y}from"./query-assigned-nodes-DJTk3iGv.js";import{e as q}from"./class-map-D55lQyt8.js";import{s as S,t as O}from"./a11y-utils-BOPvdiVn.js";import{K as Z}from"./index-BgGCUUFB.js";import{K as ee,L as te,U as re}from"./index-CbZAylpk.js";import{o as ie}from"./style-map-C9nPWcxA.js";import{I as ne}from"./icon-Ctzrqx63.js";import"./open-icon-BJwmkNNX.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let V=class extends Event{constructor(e,r,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=r,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let z=class{constructor(e,r,i,n){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(o,s)=>{this.unsubscribe&&(this.unsubscribe!==s&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(o,s)),this.unsubscribe=s},this.host=e,r.context!==void 0){const o=r;this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??!1}else this.context=r,this.callback=i,this.subscribe=n??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new V(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class se{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,r=!1){const i=r||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[r,{disposer:i}]of this.subscriptions)r(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,r,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:r});const{disposer:n}=this.subscriptions.get(e);e(this.value,n)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let oe=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class D extends se{constructor(e,r,i){var n,o;super(r.context!==void 0?r.initialValue:i),this.onContextRequest=s=>{const a=s.composedPath()[0];s.context===this.context&&a!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,a,s.subscribe))},this.onProviderRequest=s=>{const a=s.composedPath()[0];if(s.context!==this.context||a===this.host)return;const w=new Set;for(const[h,{consumerHost:_}]of this.subscriptions)w.has(h)||(w.add(h),_.dispatchEvent(new V(this.context,h,!0)));s.stopPropagation()},this.host=e,r.context!==void 0?this.context=r.context:this.context=r,this.attachListeners(),(o=(n=this.host).addController)==null||o.call(n,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new oe(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ae({context:t}){return(e,r)=>{const i=new WeakMap;if(typeof r=="object")return r.addInitializer(function(){i.set(this,new D(this,{context:t}))}),{get(){return e.get.call(this)},set(n){var o;return(o=i.get(this))==null||o.setValue(n),e.set.call(this,n)},init(n){var o;return(o=i.get(this))==null||o.setValue(n),n}};{e.constructor.addInitializer(s=>{i.set(s,new D(s,{context:t}))});const n=Object.getOwnPropertyDescriptor(e,r);let o;if(n===void 0){const s=new WeakMap;o={get(){return s.get(this)},set(a){i.get(this).setValue(a),s.set(this,a)},configurable:!0,enumerable:!0}}else{const s=n.set;o={...n,set(a){i.get(this).setValue(a),s==null||s.call(this,a)}}}return void Object.defineProperty(e,r,o)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le({context:t,subscribe:e}){return(r,i)=>{typeof i=="object"?i.addInitializer(function(){new z(this,{context:t,callback:n=>{r.set.call(this,n)},subscribe:e})}):r.constructor.addInitializer(n=>{new z(n,{context:t,callback:o=>{n[i]=o},subscribe:e})})}}const b=Symbol("indeterminate");function g(t){return t.tagName.toLowerCase()==="forge-tree-item"}function f(t){return t.target.closest("forge-tree-item")}function ce(t){const e=t.composedPath(),r=e.findIndex(n=>n instanceof HTMLElement&&g(n)),i=e.findIndex(n=>n instanceof HTMLElement&&n.matches(".header"));return r>=0&&i>=0&&i<r}function he(t){const e=t.composedPath(),r=e.findIndex(n=>n instanceof HTMLElement&&g(n)),i=e.findIndex(n=>n instanceof HTMLElement&&n.matches(".expand-icon"));return r>=0&&i>=0&&i<r}function de(t){return t.target.closest("forge-tree-item")}function fe(t){let e=0,r=p(t);for(;r;)e++,r=p(r);return e}function W(t){return t.closest("forge-tree")}function p(t){return t.parentElement&&g(t.parentElement)?t.parentElement:null}function E(t,e=!1){return e?Array.from(t.querySelectorAll("forge-tree-item")):Array.from(t.children).filter(r=>g(r))}function v(t){return Array.from(t.children).find(e=>g(e))??null}function T(t){const e=Array.from(t.children).filter(r=>g(r));return e[e.length-1]??null}function G(t,e=!1){const r=p(t)??W(t);return r?E(r).filter(i=>e||i!==t):[]}function C(t,e=!0){if(e&&t.open&&v(t))return v(t);let r=t.nextElementSibling;for(;r&&!g(r);)r=r.nextElementSibling;if(r)return r;const i=p(t);return i?C(i,!1):null}function L(t){let e=t.previousElementSibling;for(;e&&!g(e);)e=e.previousElementSibling;if(!e)return p(t);if(!e.open||e.leaf)return e;let r=T(e);for(;r&&r.open;)r=T(r);return r}function pe(t,e){const r=h=>{var _;return((_=h.textContent)==null?void 0:_.trim().toLowerCase().startsWith(e))??!1},i=h=>{const _=E(h);for(const c of _){if(r(c))return c;if(c.open&&(o=i(c),o))return o}return null},n=(h,_=!0)=>{const c=G(h,!0),X=c.indexOf(h)+(_?1:0);for(let y=X;y<c.length;y++){if(r(c[y]))return c[y];if(c[y].open&&(o=i(c[y]),o))return o}return null};e=e.toLowerCase();let o=null,s=t,a=!1;for(;!o&&s;)o=n(s,a),o||(a=!0,s=p(s));if(o)return o;const w=W(t);return!w||(s=v(w),!s)?null:n(s,!1)}function A(t){return E(t).some((e,r,i)=>e.indeterminate||e.selected!==i[0].selected)}class me{constructor(e){this.items=[],this._selectListener=console.log,this.host=e,e.addController(this)}hostConnected(){this.host.addEventListener("forge-tree-item-select",this._selectListener)}hostDisconnected(){this.host.removeEventListener("forge-tree-item-select",this._selectListener)}toggle(e,r){let i=[];this._addToSnapshot(e,i);const n=r??!e.selected;e.selected=n;const o=this.items.slice();i=this._updateSelectionsFromItem(e,i),this.host.mode==="multiple"&&(i=this._updateDescendentSelections(e,i),i=this._updateAncestorSelections(e,i));const s=new CustomEvent("forge-tree-item-select",{bubbles:!0,composed:!0,detail:e.value});e.dispatchEvent(s),s.defaultPrevented&&(this._restoreSnapshot(i),this.items=o)}extend(e){if(this.host.mode!=="multiple")return;const r=this.items[this.items.length-1];if(!r)return;const i=e.compareDocumentPosition(r);if(i===0)return;const o=i&Node.DOCUMENT_POSITION_FOLLOWING?C:L;let s=o(e);for(;s&&s!==r;)(s.leaf||!s.open)&&this.toggle(s,!0),s=o(s)}selectAll(){this.items=[];const e=E(this.host,!0);e.forEach(r=>{r.selected=!0,this.items.push(r)}),e.reverse().forEach(r=>{this._updateAncestorSelections(r)})}_handleSelectEvent(e){f(e)}_updateSelectionsFromItem(e,r){const i=r;if(!e.selected){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),i}return this.host.mode!=="multiple"?(this.items.forEach(n=>{n!==e&&(this._addToSnapshot(n,i),n.selected=!1)}),this.items=[e],i):(this.items.push(e),i)}_updateDescendentSelections(e,r=[]){const i=r;if(e.leaf)return i;const n=E(e,!0);return n.forEach(s=>{this._addToSnapshot(s,i),s.selected=e.selected;const a=this.items.indexOf(s);a!==-1&&(e.selected?this.items.push(s):this.items.splice(a,1))}),n.filter(s=>!s.leaf).reverse().forEach(s=>{this._addToSnapshot(s,i,{indeterminate:!0}),s[b]=A(s)}),this._addToSnapshot(e,i,{indeterminate:!0}),e[b]=A(e),i}_updateAncestorSelections(e,r=[]){const i=r;let n=p(e);for(;n;){if(this._addToSnapshot(n,i),n[b]=A(n),!n.indeterminate){const o=v(n);n.selected=(o==null?void 0:o.selected)??!1;const s=this.items.indexOf(n);n.selected&&s===-1?this.items.push(n):!n.selected&&s!==-1&&this.items.splice(s,1)}n=p(n)}return i}_addToSnapshot(e,r,i){const n=r.find(o=>o.el===e);if(n){i=i??{indeterminate:!0,open:!0,selected:!0},n.indeterminate=i.indeterminate?e.indeterminate:n.indeterminate,n.open=i.open?e.open:n.open,n.selected=i.selected?e.selected:n.selected;return}r.push({el:e,indeterminate:e.indeterminate,open:e.open,selected:e.selected})}_restoreSnapshot(e){e.forEach(r=>{r.el[b]=r.indeterminate,r.el.selected=r.selected,r.el.open=r.open})}}const ue=":host{display:block}.forge-tree{--_tree-background: var(--forge-tree-background, var(--forge-theme-primary-container, #d1d5ed));--_tree-color: var(--forge-tree-color, var(--forge-theme-on-primary-container, #222c62));--_tree-transition-duration: var(--forge-tree-transition-duration, var(--forge-animation-duration-short4, .2s));--_tree-transition-timing: var(--forge-tree-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_tree-shape: var(--forge-tree-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-padding: var(--forge-tree-padding, var(--forge-spacing-medium, 16px));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px))}.forge-tree{--_tree-item-check-display: var(--forge-tree-item-check-display, none);--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, none);display:flex;flex-direction:column;gap:var(--_tree-item-gap)}.forge-tree.indent-lines{--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, block)}.forge-tree.multiple{--_tree-item-check-display: var(--forge-tree-item-check-display, block);--forge-tree-item-selected-background: transparent}";var ge=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,x=(t,e,r,i)=>{for(var n=i>1?void 0:i?_e(e,r):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(n=(i?s(e,r,n):s(n))||n);return i&&n&&ge(e,r,n),n};const Q="forge-tree";let m=class extends M{constructor(){super(),this.accordion=!1,this.indentLines=!1,this.mode="single",this.selectionFollowsFocus=!1,this.value=[],this._keyActionController=new Z(this,{actions:[{key:["ArrowUp","ArrowDown"],handler:this._handleArrowUpOrDown.bind(this),allowRepeat:!0},{key:"ArrowLeft",handler:this._handleArrowLeft.bind(this),allowRepeat:!0},{key:"ArrowRight",handler:this._handleArrowRight.bind(this),allowRepeat:!0},{key:"Home",handler:this._handleHome.bind(this)},{key:"End",handler:this._handleEnd.bind(this)},{key:"*",handler:this._handleAsterisk.bind(this)},{key:[{key:"a",modifier:"ctrl"},{key:"a",modifier:"meta"}],handler:this._handleA.bind(this)},{key:"Enter",handler:this._handleEnter.bind(this)}],searchHandler:this._search.bind(this)}),this._selectionController=new me(this),this._internals=this.attachInternals(),this._updateContext()}connectedCallback(){super.connectedCallback(),this.tabIndex=0,S(this,this._internals,{role:"tree"}),this.addEventListener("focusin",this._handleFocusIn.bind(this)),this.addEventListener("focusout",this._handleFocusOut.bind(this))}willUpdate(t){(t.has("indentLines")||t.has("mode"))&&this._updateContext()}render(){return I`
      <div
        part="root"
        class=${q({"forge-tree":!0,"indent-lines":this.indentLines,multiple:this.mode==="multiple"})}
        @click=${this._handleClick}
        @forge-tree-item-open=${this._handleOpen}
        @forge-tree-item-update=${this._handleUpdate}>
        <slot></slot>
        <slot name="expand-icon"></slot>
        <slot name="collapse-icon"></slot>
      </div>
    `}_updateContext(){this._context={indentLines:this.indentLines,mode:this.mode}}_handleClick(t){if(!ce(t))return;const e=de(t);if(e){if(e.leaf){if(this.mode==="off")return;t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e);return}if(this.mode==="leaf"||this.mode==="off"){this._toggleOpen(e);return}if(he(t)){t.altKey&&console.log("close all children"),this._toggleOpen(e);return}t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e)}}_handleArrowUpOrDown(t){const e=f(t);if(!e)return;const r=t.key==="ArrowDown"?C(e):L(e);r&&(t.shiftKey&&this.mode==="multiple"&&this._selectionController.toggle(r,!0),this._focusItem(r))}_handleArrowLeft(t){const e=f(t);if(e){if(!e.open){const r=p(e);r&&this._focusItem(r)}this._toggleOpen(e,!1)}}_handleArrowRight(t){const e=f(t);if(!(!e||e.leaf)){if(e.open){const r=v(e);r&&this._focusItem(r)}this._toggleOpen(e,!0)}}_handleHome(t){const e=f(t);if(!e)return;if(t.shiftKey&&(t.metaKey||t.ctrlKey)&&this.mode==="multiple"){let i=L(e);for(;i;)this._selectionController.toggle(i,!0),i=L(i)}const r=v(this);r&&this._focusItem(r)}_handleEnd(t){const e=f(t);if(!e)return;if(t.shiftKey&&(t.metaKey||t.ctrlKey)&&this.mode==="multiple"){let i=C(e);for(;i;)this._selectionController.toggle(i,!0),i=C(i)}let r=T(this);for(;r&&r.open;)r=T(r);r&&this._focusItem(r)}_handleAsterisk(t){const e=f(t);e&&G(e,!0).forEach(r=>this._toggleOpen(r,!0))}_handleA(){this.mode==="multiple"&&this._selectionController.selectAll()}_handleEnter(t){const e=f(t);if(e){if(e.leaf){if(this.mode==="off")return;t.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e)}this._toggleOpen(e)}}_handleFocusIn(t){if(t.target===this){const r=this._lastFocusedItem??v(this);if(!r)return;this._focusItem(r)}const e=t.target;e&&g(e)&&(this._lastFocusedItem&&(this._lastFocusedItem.tabIndex=-1),e.tabIndex=0,this._lastFocusedItem=e,this.tabIndex=-1)}_handleFocusOut(t){const e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)}_handleOpen(t){console.log(t)}_handleUpdate(t){t.stopPropagation(),console.log(t)}_search(t,e){const r=f(e);if(!r)return;const i=pe(r,t);i&&this._focusItem(i)}_toggleOpen(t,e){const r=t.open;t.open=e??!t.open;const i=new CustomEvent("forge-tree-item-open",{bubbles:!0,composed:!0});t.dispatchEvent(i),i.defaultPrevented&&(t.open=r)}_focusItem(t){t.focus(),this.mode!=="multiple"&&this.selectionFollowsFocus&&this._selectionController.toggle(t,!0)}};m.styles=B(ue);x([u({type:Boolean})],m.prototype,"accordion",2);x([u({type:Boolean,attribute:"indent-lines"})],m.prototype,"indentLines",2);x([u({type:String})],m.prototype,"mode",2);x([u({type:Boolean,attribute:"selection-follows-focus"})],m.prototype,"selectionFollowsFocus",2);x([u({type:Array})],m.prototype,"value",2);x([ae({context:Q})],m.prototype,"_context",2);m=x([N("forge-tree")],m);const be=':host{display:block;outline:none}.forge-tree-item{--_tree-item-selected-background: var(--forge-tree-item-selected-background, var(--forge-theme-primary-container-low, #e8eaf6));--_tree-item-min-block-size: var(--forge-tree-item-min-block-size, var(--forge-spacing-large, 24px));--_tree-item-shape: var(--forge-tree-item-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-item-padding-inline: var(--forge-tree-item-padding-inline, var(--forge-spacing-xxsmall, 4px));--_tree-item-padding-inline-start: var(--forge-tree-item-padding-inline-start, var(--_tree-item-padding-inline));--_tree-item-padding-inline-end: var(--forge-tree-item-padding-inline-end, var(--_tree-item-padding-inline));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px));--_tree-item-header-inline-gap: var(--forge-tree-item-header-inline-gap, var(--forge-spacing-xsmall, 8px));--_tree-item-indent-size: var(--forge-tree-item-indent-size, var(--forge-spacing-xlarge, 32px));--_tree-item-indent-line-style: var(--forge-tree-item-indent-line-style, solid);--_tree-item-indent-line-width: var(--forge-tree-item-indent-line-width, var(--forge-border-thin, 1px));--_tree-item-indent-line-color: var(--forge-tree-item-indent-line-color, var(--forge-theme-outline, #e0e0e0));--_tree-item-indent-line-offset: var(--forge-tree-item-indent-line-offset, 11.5px)}.forge-tree-item{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-text-low))}.forge-tree-item .header{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);display:flex;align-items:center;gap:var(--_tree-item-header-inline-gap);position:relative;border-radius:var(--_tree-item-shape);min-block-size:var(--_tree-item-min-block-size);padding-inline-start:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-padding-inline-start));padding-inline-end:var(--_tree-item-padding-inline-end)}.forge-tree-item .content{overflow:hidden;margin-inline-end:auto;white-space:nowrap;text-overflow:ellipsis}.forge-tree-item .expand-icon{display:flex}.forge-tree-item .checkbox{--forge-icon-color: var(--_tree-item-checkbox-color);display:var(--_tree-item-check-display)}.forge-tree-item .children{display:flex;flex-direction:column;gap:var(--_tree-item-gap);position:relative;margin-block-start:var(--_tree-item-gap)}.forge-tree-item .children:after{display:var(--_tree-item-indent-line-display);position:absolute;left:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-indent-line-offset) + var(--_tree-item-padding-inline-start));block-size:100%;inline-size:var(--_tree-item-indent-line-width);border-inline-start-style:var(--_tree-item-indent-line-style);border-inline-start-width:var(--_tree-item-indent-line-width);border-inline-start-color:var(--_tree-item-indent-line-color);pointer-events:none;content:""}.forge-tree-item.interactive .header{cursor:pointer}.forge-tree-item.indeterminate{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}:host(:is(:state(leaf),:--leaf)) .expand-icon{display:none}:host(:is(:state(leaf),:--leaf)) .children{display:none}:host(:not(:is(:state(open),:--open))) .children{display:none}:host(:is(:state(selected),:--selected)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary));background:var(--_tree-item-selected-background)}:host(:is(:state(selected),:--selected)) forge-state-layer{--forge-state-layer-color: var(--forge-theme-primary)}:host(:is(:state(indeterminate),:--indeterminate)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}forge-focus-indicator{--forge-focus-indicator-shape: var(--_tree-item-shape);z-index:1}';var ve=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,d=(t,e,r,i)=>{for(var n=i>1?void 0:i?xe(e,r):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(n=(i?s(e,r,n):s(n))||n);return i&&n&&ve(e,r,n),n},$,R;let l=class extends(R=M,$=b,R){constructor(){super(),this.selected=!1,this.open=!1,this[$]=!1,this._level=0,this._leaf=!0,this._checkboxIcon="check_box_outline_blank",this._internals=this.attachInternals(),ne.define([ee,te,re])}get level(){return this._level}get leaf(){return!this._children.length}get indeterminate(){return this[b]}connectedCallback(){super.connectedCallback(),S(this,this._internals,{role:"treeitem"}),this.tabIndex=-1,this._level=fe(this),this._placeInParent(),this._setLeaf()}willUpdate(t){t.has("open")&&this._setOpen(),t.has("selected")&&this._setSelected(),t.has(b)&&O(this._internals,"indeterminate",this.indeterminate),(t.has("selected")||t.has(b))&&(this._checkboxIcon=this.indeterminate?"indeterminate_check_box":this.selected?"check_box":"check_box_outline_blank")}render(){return I`
      <div
        part="root"
        class=${q({"forge-tree-item":!0,interactive:!this._leaf||this._context.mode!=="off"})}
        style=${ie({"--_tree-item-level":this.level})}>
        <div part="header" class="header">
          ${this._leaf?F:I`
                <span part="expand-icon" class="expand-icon">
                  <slot name="expand-icon">
                    <forge-open-icon orientation="horizontal" rotation="half" .open="${this.open}"></forge-open-icon>
                  </slot>
                </span>
              `}
          ${this._context.mode==="multiple"?I`<forge-icon id="checkbox" class="checkbox" part="checkbox" .name="${this._checkboxIcon}"></forge-icon>`:F}
          <slot name="start"></slot>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <slot name="end"></slot>
          ${this._context.mode!=="off"||!this._leaf?I`<forge-state-layer></forge-state-layer>`:F}
          <forge-focus-indicator target=":host" focus-mode="focus"></forge-focus-indicator>
        </div>
        <div role="group" class="children" part="children">
          <slot name="children" @slotchange="${this._setLeaf}"></slot>
        </div>
      </div>
    `}_placeInParent(){const t=this.parentElement;(t==null?void 0:t.tagName.toLowerCase())==="forge-tree-item"&&(this.slot="children")}_setLeaf(){this._leaf=this.leaf,this._setOpen(),O(this._internals,"leaf",this._leaf)}_setOpen(){S(this,this._internals,{ariaExpanded:this.leaf?null:this.open?"true":"false"}),O(this._internals,"open",!this.leaf&&this.open)}_setSelected(){S(this,this._internals,{ariaSelected:this.selected?"true":"false"}),O(this._internals,"selected",this.selected)}};l.styles=B(be);d([u({type:Object})],l.prototype,"value",2);d([u({type:Boolean})],l.prototype,"selected",2);d([u({type:Boolean})],l.prototype,"open",2);d([u({attribute:!1})],l.prototype,$,2);d([le({context:Q,subscribe:!0})],l.prototype,"_context",2);d([P()],l.prototype,"_level",2);d([P()],l.prototype,"_leaf",2);d([P()],l.prototype,"_checkboxIcon",2);d([Y({slot:"children",flatten:!0})],l.prototype,"_children",2);l=d([N("forge-tree-item")],l);const K="forge-tree",ye={title:"Components/Tree",render:t=>I`
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
    `,component:K,argTypes:{...J({tagName:K,controls:{accordion:{control:{type:"boolean"}},indentLines:{control:{type:"boolean"}},mode:{control:{type:"select",options:["single","multiple","leaf","off"]}},selectionFollowsFocus:{control:{type:"boolean"}},value:{control:{type:"text"}}}})},args:{accordion:!1,indentLines:!1,mode:"single",selectionFollowsFocus:!1,value:""}},k={};var j,H,U;k.parameters={...k.parameters,docs:{...(j=k.parameters)==null?void 0:j.docs,source:{originalSource:"{}",...(U=(H=k.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};const Ie=["Demo"],Ke=Object.freeze(Object.defineProperty({__proto__:null,Demo:k,__namedExportsOrder:Ie,default:ye},Symbol.toStringTag,{value:"Module"}));export{k as D,Ke as T};
