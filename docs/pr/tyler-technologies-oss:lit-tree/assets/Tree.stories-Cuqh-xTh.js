import{r as B,a as N}from"./lit-element-JplMEnZc.js";import{x,E as z}from"./lit-html-paDGiEfB.js";import{g as Y}from"./utils-DOJ_BQTN.js";import"./feature-detection-DRCh51Sa.js";import{n as _,t as q,r as P}from"./state-_w7_zNwI.js";import{e as V}from"./class-map-D55lQyt8.js";import{s as O,t as S}from"./a11y-utils-DJ_tX8xT.js";import{K as Z}from"./index-BgGCUUFB.js";import{K as ee,L as te,U as re}from"./index-CbZAylpk.js";import{n as ie}from"./query-assigned-nodes-B0aJM3Ou.js";import{o as se}from"./style-map-C9nPWcxA.js";import{I as ne}from"./icon-B5R9pr_c.js";import"./open-icon-jld-uG32.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let W=class extends Event{constructor(e,t,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let D=class{constructor(e,t,i,s){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(n,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=n,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(n,o)),this.unsubscribe=o},this.host=e,t.context!==void 0){const n=t;this.context=n.context,this.callback=n.callback,this.subscribe=n.subscribe??!1}else this.context=t,this.callback=i,this.subscribe=s??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new W(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:i}]of this.subscriptions)t(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:s}=this.subscriptions.get(e);e(this.value,s)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ae=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class K extends oe{constructor(e,t,i){var s,n;super(t.context!==void 0?t.initialValue:i),this.onContextRequest=o=>{const a=o.composedPath()[0];o.context===this.context&&a!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,a,o.subscribe))},this.onProviderRequest=o=>{const a=o.composedPath()[0];if(o.context!==this.context||a===this.host)return;const k=new Set;for(const[h,{consumerHost:b}]of this.subscriptions)k.has(h)||(k.add(h),b.dispatchEvent(new W(this.context,h,!0)));o.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(n=(s=this.host).addController)==null||n.call(s,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new ae(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le({context:r}){return(e,t)=>{const i=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){i.set(this,new K(this,{context:r}))}),{get(){return e.get.call(this)},set(s){var n;return(n=i.get(this))==null||n.setValue(s),e.set.call(this,s)},init(s){var n;return(n=i.get(this))==null||n.setValue(s),s}};{e.constructor.addInitializer(o=>{i.set(o,new K(o,{context:r}))});const s=Object.getOwnPropertyDescriptor(e,t);let n;if(s===void 0){const o=new WeakMap;n={get(){return o.get(this)},set(a){i.get(this).setValue(a),o.set(this,a)},configurable:!0,enumerable:!0}}else{const o=s.set;n={...s,set(a){i.get(this).setValue(a),o==null||o.call(this,a)}}}return void Object.defineProperty(e,t,n)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce({context:r,subscribe:e}){return(t,i)=>{typeof i=="object"?i.addInitializer(function(){new D(this,{context:r,callback:s=>{t.set.call(this,s)},subscribe:e})}):t.constructor.addInitializer(s=>{new D(s,{context:r,callback:n=>{s[i]=n},subscribe:e})})}}const m=Symbol("indeterminate");function f(r){return r.tagName.toLowerCase()==="forge-tree-item"}function d(r){return r.target.closest("forge-tree-item")}function he(r){return r.composedPath().filter(t=>t instanceof HTMLElement&&f(t))}function de(r){const e=r.composedPath(),t=e.findIndex(s=>s instanceof HTMLElement&&f(s)),i=e.findIndex(s=>s instanceof HTMLElement&&s.matches(".header"));return t>=0&&i>=0&&i<t}function fe(r){const e=r.composedPath(),t=e.findIndex(s=>s instanceof HTMLElement&&f(s)),i=e.findIndex(s=>s instanceof HTMLElement&&s.matches(".expand-icon"));return t>=0&&i>=0&&i<t}function pe(r){return r.target.closest("forge-tree-item")}function me(r){let e=0,t=u(r);for(;t;)e++,t=u(t);return e}function G(r){return r.closest("forge-tree")}function u(r){return r.parentElement&&f(r.parentElement)?r.parentElement:null}function v(r,e=!1){return e?Array.from(r.querySelectorAll("forge-tree-item")):Array.from(r.children).filter(t=>f(t))}function y(r){return Array.from(r.children).find(e=>f(e))??null}function T(r){const e=Array.from(r.children).filter(t=>f(t));return e[e.length-1]??null}function Q(r,e=!1){const t=u(r)??G(r);return t?v(t).filter(i=>e||i!==r):[]}function C(r,e=!0){if(e&&r.open&&y(r))return y(r);let t=r.nextElementSibling;for(;t&&!f(t);)t=t.nextElementSibling;if(t)return t;const i=u(r);return i?C(i,!1):null}function L(r){let e=r.previousElementSibling;for(;e&&!f(e);)e=e.previousElementSibling;if(!e)return u(r);if(!e.open||e.leaf)return e;let t=T(e);for(;t&&t.open;)t=T(t);return t}function ue(r,e){const t=h=>{var b;return((b=h.textContent)==null?void 0:b.trim().toLowerCase().startsWith(e))??!1},i=h=>{const b=v(h);for(const c of b){if(t(c))return c;if(c.open&&(n=i(c),n))return n}return null},s=(h,b=!0)=>{const c=Q(h,!0),J=c.indexOf(h)+(b?1:0);for(let w=J;w<c.length;w++){if(t(c[w]))return c[w];if(c[w].open&&(n=i(c[w]),n))return n}return null};e=e.toLowerCase();let n=null,o=r,a=!1;for(;!n&&o;)n=s(o,a),n||(a=!0,o=u(o));if(n)return n;const k=G(r);return!k||(o=y(k),!o)?null:s(o,!1)}function A(r){return v(r).some((e,t,i)=>e.indeterminate||e.selected!==i[0].selected)}function F(r){v(r,!0).forEach(e=>e.open=!1)}class ge{constructor(e){this.items=[],this._selectListener=()=>{},this.host=e,e.addController(this)}get value(){return this.items.filter(e=>!e.indeterminate).map(e=>e.value)}set value(e){this.items=[];const t=v(this.host,!0);if(this.host.mode!=="multiple"){const s=t.find(n=>n.value===e[0]);s&&(s.selected=!0,this.items.push(s)),this._clearIndeterminate(t);return}const i=[];t.forEach(s=>{e.includes(s.value)!==s.selected&&(s.selected=e.includes(s.value),s.selected&&this.items.push(s),i.push(s))}),this.items.forEach(s=>this._updateDescendentSelections(s)),i.forEach(s=>this._updateAncestorSelections(s))}hostConnected(){this.host.addEventListener("forge-tree-item-select",this._selectListener)}hostDisconnected(){this.host.removeEventListener("forge-tree-item-select",this._selectListener)}cleanup(){if(!this.items.length)return;let e=[];switch(this.host.mode){case"single":if(this.items.length===1)return;const t=this.items.splice(-1,0);e=[...this.items],this.items.forEach(n=>n.selected=!1),this.items=t;break;case"leaf":const i=this.items.reverse().findIndex(n=>n.leaf),s=i>-1?this.items.splice(i,1):null;e=[...this.items],this.items.forEach(n=>n.selected=!1),s&&(this.items=s);break;case"multiple":e=this.items,e.forEach(n=>this._updateDescendentSelections(n));break;case"list":e=[...this.items],this.items.forEach(n=>n.selected=!1);break}e.forEach(t=>this._updateAncestorSelections(t))}toggle(e,t){let i=[];this._addToSnapshot(e,i);const s=t??!e.selected;e.selected=s;const n=this.items.slice();i=this._updateSelectionsFromItem(e,i),this.host.mode==="multiple"&&(i=this._updateDescendentSelections(e,i),i=this._updateAncestorSelections(e,i));const o=new CustomEvent("forge-tree-item-select",{bubbles:!0,composed:!0,detail:e.value});e.dispatchEvent(o),o.defaultPrevented&&(this._restoreSnapshot(i),this.items=n)}extend(e){if(this.host.mode!=="multiple")return;const t=this.items[this.items.length-1];if(!t)return;const i=e.compareDocumentPosition(t);if(i===0)return;const n=i&Node.DOCUMENT_POSITION_FOLLOWING?C:L;let o=n(e);for(;o&&o!==t;)(o.leaf||!o.open)&&this.toggle(o,!0),o=n(o)}selectAll(){this.items=[];const e=v(this.host,!0);e.forEach(t=>{t.selected=!0,this.items.push(t)}),e.reverse().forEach(t=>{this._updateAncestorSelections(t)}),this.host.dispatchEvent(new CustomEvent("forge-tree-select-all",{bubbles:!0,composed:!0}))}_handleSelectEvent(e){d(e)}_updateSelectionsFromItem(e,t){if(!e.selected){const i=this.items.indexOf(e);return i!==-1&&this.items.splice(i,1),t}return this.host.mode!=="multiple"?(this.items.forEach(i=>{i!==e&&(this._addToSnapshot(i,t),i.selected=!1)}),this.items=[e],t):(this.items.push(e),t)}_updateDescendentSelections(e,t=[]){if(e.leaf)return t;const i=v(e,!0);return i.forEach(n=>{this._addToSnapshot(n,t),n.selected=e.selected;const o=this.items.indexOf(n);e.selected&&o===-1?this.items.push(n):!e.selected&&o!==-1&&this.items.splice(o,1)}),i.filter(n=>!n.leaf).reverse().forEach(n=>{this._addToSnapshot(n,t,{indeterminate:!0}),n[m]=A(n)}),this._addToSnapshot(e,t,{indeterminate:!0}),e[m]=A(e),t}_updateAncestorSelections(e,t=[]){let i=u(e);for(;i;){if(this._addToSnapshot(i,t),i[m]=A(i),!i.indeterminate){const s=y(i);i.selected=(s==null?void 0:s.selected)??!1;const n=this.items.indexOf(i);i.selected&&n===-1?this.items.push(i):!i.selected&&n!==-1&&this.items.splice(n,1)}i=u(i)}return t}_addToSnapshot(e,t,i){const s=t.find(n=>n.el===e);if(s){i=i??{indeterminate:!0,open:!0,selected:!0},s.indeterminate=i.indeterminate?e.indeterminate:s.indeterminate,s.open=i.open?e.open:s.open,s.selected=i.selected?e.selected:s.selected;return}t.push({el:e,indeterminate:e.indeterminate,open:e.open,selected:e.selected})}_restoreSnapshot(e){e.forEach(t=>{t.el[m]=t.indeterminate,t.el.selected=t.selected,t.el.open=t.open})}_clearIndeterminate(e){(e??v(this.host)).forEach(t=>{t[m]=!1})}}const _e=":host{display:block}.forge-tree{--_tree-background: var(--forge-tree-background, var(--forge-theme-primary-container, #d1d5ed));--_tree-color: var(--forge-tree-color, var(--forge-theme-on-primary-container, #222c62));--_tree-transition-duration: var(--forge-tree-transition-duration, var(--forge-animation-duration-short4, .2s));--_tree-transition-timing: var(--forge-tree-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_tree-shape: var(--forge-tree-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-padding: var(--forge-tree-padding, var(--forge-spacing-medium, 16px));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px))}.forge-tree{--_tree-item-check-display: var(--forge-tree-item-check-display, none);--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, none);display:flex;flex-direction:column;gap:var(--_tree-item-gap)}.forge-tree.indent-lines{--_tree-item-indent-line-display: var(--forge-tree-item-indent-line-display, block)}.forge-tree.multiple{--_tree-item-check-display: var(--forge-tree-item-check-display, block);--forge-tree-item-selected-background: transparent}";var be=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,I=(r,e,t,i)=>{for(var s=i>1?void 0:i?ve(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&be(e,t,s),s};const X="forge-tree";let g=class extends N{constructor(){super(),this.accordion=!1,this.indentLines=!1,this.mode="single",this.selectionFollowsFocus=!1,this._keyActionController=new Z(this,{actions:[{key:["ArrowUp","ArrowDown"],handler:this._handleArrowUpOrDown.bind(this),allowRepeat:!0},{key:"ArrowLeft",handler:this._handleArrowLeft.bind(this),allowRepeat:!0},{key:"ArrowRight",handler:this._handleArrowRight.bind(this),allowRepeat:!0},{key:"Home",handler:this._handleHome.bind(this)},{key:"End",handler:this._handleEnd.bind(this)},{key:"*",handler:this._handleAsterisk.bind(this)},{key:[{key:"a",modifier:"ctrl"},{key:"a",modifier:"meta"}],handler:this._handleA.bind(this)},{key:["Enter"," "],handler:this._handleEnterOrSpace.bind(this)}],searchHandler:this._search.bind(this)}),this._selectionController=new ge(this),this._internals=this.attachInternals(),this._updateContext()}get value(){return this._selectionController.value}set value(r){this._selectionController.value=r}connectedCallback(){super.connectedCallback(),this.tabIndex=0,O(this,this._internals,{role:"tree"}),this.addEventListener("focusin",this._handleFocusIn.bind(this)),this.addEventListener("focusout",this._handleFocusOut.bind(this))}willUpdate(r){r.has("accordion")&&F(this),(r.has("indentLines")||r.has("mode"))&&this._updateContext(),r.has("mode")&&this._selectionController.cleanup()}render(){return x`
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
    `}_updateContext(){this._context={indentLines:this.indentLines,mode:this.mode}}_handleClick(r){if(!de(r))return;const e=pe(r);if(e){if(e.leaf){if(this.mode==="list")return;r.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e);return}if(this.mode==="leaf"||this.mode==="list"){this._toggleOpen(e,r.altKey&&e.open);return}if(fe(r)){this._toggleOpen(e,r.altKey&&e.open);return}r.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e)}}_handleArrowUpOrDown(r){const e=d(r);if(!e)return;const t=r.key==="ArrowDown"?C(e):L(e);t&&(r.shiftKey&&this.mode==="multiple"&&this._selectionController.toggle(t,!0),this._focusItem(t))}_handleArrowLeft(r){const e=d(r);if(e){if(!e.open){const t=u(e);t&&this._focusItem(t)}this._toggleOpen(e,!1,!1)}}_handleArrowRight(r){const e=d(r);if(!(!e||e.leaf)){if(e.open){const t=y(e);t&&this._focusItem(t)}this._toggleOpen(e,!1,!0)}}_handleHome(r){const e=d(r);if(!e)return;if(r.shiftKey&&(r.metaKey||r.ctrlKey)&&this.mode==="multiple"){let i=L(e);for(;i;)this._selectionController.toggle(i,!0),i=L(i)}const t=y(this);t&&this._focusItem(t)}_handleEnd(r){const e=d(r);if(!e)return;if(r.shiftKey&&(r.metaKey||r.ctrlKey)&&this.mode==="multiple"){let i=C(e);for(;i;)this._selectionController.toggle(i,!0),i=C(i)}let t=T(this);for(;t&&t.open;)t=T(t);t&&this._focusItem(t)}_handleAsterisk(r){const e=d(r);e&&Q(e,!0).forEach(t=>this._toggleOpen(t,!1,!0))}_handleA(){this.mode==="multiple"&&this._selectionController.selectAll()}_handleEnterOrSpace(r){const e=d(r);if(e){if(e.leaf){if(this.mode==="list")return;r.shiftKey&&this._selectionController.extend(e),this._selectionController.toggle(e);return}r.key==="Enter"?this._toggleOpen(e,r.altKey&&e.open):this._selectionController.toggle(e)}}_handleFocusIn(r){if(r.target===this){const t=this._lastFocusedItem??y(this);if(!t)return;this._focusItem(t)}const e=r.target;e&&f(e)&&(this._lastFocusedItem&&(this._lastFocusedItem.tabIndex=-1),e.tabIndex=0,this._lastFocusedItem=e,this.tabIndex=-1)}_handleFocusOut(r){const e=r.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)}_handleOpen(r){if(!this.accordion)return;const e=d(r);if(!e||!e.open)return;const t=he(r);F(this),t.forEach(i=>i.open=!0)}_handleUpdate(r){r.stopPropagation(),console.log(r)}_search(r,e){const t=d(e);if(!t)return;const i=ue(t,r);i&&this._focusItem(i)}_toggleOpen(r,e=!1,t){r.open=t??!r.open,!r.open&&e&&F(r);const i=new CustomEvent("forge-tree-item-open",{bubbles:!0,composed:!0});r.dispatchEvent(i),i.defaultPrevented}_focusItem(r){r.focus(),this.mode!=="multiple"&&this.selectionFollowsFocus&&this._selectionController.toggle(r,!0)}};g.styles=B(_e);I([_({type:Boolean})],g.prototype,"accordion",2);I([_({type:Boolean,attribute:"indent-lines"})],g.prototype,"indentLines",2);I([_({type:String})],g.prototype,"mode",2);I([_({type:Boolean,attribute:"selection-follows-focus"})],g.prototype,"selectionFollowsFocus",2);I([_({type:Array})],g.prototype,"value",1);I([le({context:X})],g.prototype,"_context",2);g=I([q("forge-tree")],g);const xe=':host{display:block;outline:none}.forge-tree-item{--_tree-item-selected-background: var(--forge-tree-item-selected-background, var(--forge-theme-primary-container-low, #e8eaf6));--_tree-item-min-block-size: var(--forge-tree-item-min-block-size, var(--forge-spacing-xlarge, 32px));--_tree-item-shape: var(--forge-tree-item-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_tree-item-padding-inline: var(--forge-tree-item-padding-inline, var(--forge-spacing-xxsmall, 4px));--_tree-item-padding-inline-start: var(--forge-tree-item-padding-inline-start, var(--_tree-item-padding-inline));--_tree-item-padding-inline-end: var(--forge-tree-item-padding-inline-end, var(--_tree-item-padding-inline));--_tree-item-gap: var(--forge-tree-item-gap, var(--forge-spacing-xxxsmall, 2px));--_tree-item-header-inline-gap: var(--forge-tree-item-header-inline-gap, var(--forge-spacing-xsmall, 8px));--_tree-item-indent-size: var(--forge-tree-item-indent-size, var(--forge-spacing-medium, 16px));--_tree-item-leaf-inset: var(--forge-tree-item-leaf-inset, var(--forge-spacing-large, 24px));--_tree-item-indent-line-style: var(--forge-tree-item-indent-line-style, solid);--_tree-item-indent-line-width: var(--forge-tree-item-indent-line-width, var(--forge-border-thin, 1px));--_tree-item-indent-line-color: var(--forge-tree-item-indent-line-color, var(--forge-theme-outline, #e0e0e0));--_tree-item-indent-line-offset: var(--forge-tree-item-indent-line-offset, 11.5px)}.forge-tree-item{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-text-low))}.forge-tree-item .header{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);display:flex;align-items:center;gap:var(--_tree-item-header-inline-gap);position:relative;border-radius:var(--_tree-item-shape);min-block-size:var(--_tree-item-min-block-size);padding-inline-start:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-padding-inline-start));padding-inline-end:var(--_tree-item-padding-inline-end)}.forge-tree-item .leaf-spacer{inline-size:var(--_tree-item-leaf-inset)}.forge-tree-item .content{overflow:hidden;margin-inline-end:auto;white-space:nowrap;text-overflow:ellipsis}.forge-tree-item .expand-icon{display:flex}.forge-tree-item .checkbox{--forge-icon-color: var(--_tree-item-checkbox-color);display:var(--_tree-item-check-display)}.forge-tree-item .children{display:flex;flex-direction:column;gap:var(--_tree-item-gap);position:relative;margin-block-start:var(--_tree-item-gap)}.forge-tree-item .children:after{display:var(--_tree-item-indent-line-display);position:absolute;left:calc(var(--_tree-item-indent-size) * var(--_tree-item-level) + var(--_tree-item-indent-line-offset) + var(--_tree-item-padding-inline-start));block-size:100%;inline-size:var(--_tree-item-indent-line-width);border-inline-start-style:var(--_tree-item-indent-line-style);border-inline-start-width:var(--_tree-item-indent-line-width);border-inline-start-color:var(--_tree-item-indent-line-color);pointer-events:none;content:""}.forge-tree-item.interactive .header{cursor:pointer}.forge-tree-item.indeterminate{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}:host(:is(:state(leaf),:--leaf)) .expand-icon{display:none}:host(:is(:state(leaf),:--leaf)) .children{display:none}:host(:not(:is(:state(open),:--open))) .children{display:none}:host(:is(:state(selected),:--selected)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary));background:var(--_tree-item-selected-background)}:host(:is(:state(selected),:--selected)) forge-state-layer{--forge-state-layer-color: var(--forge-theme-primary)}:host(:is(:state(indeterminate),:--indeterminate)) .header{--_tree-item-checkbox-color: var(--forge-tree-item-checkbox-color, var(--forge-theme-tertiary))}:host(:is(:state(indeterminate),:--indeterminate)) forge-state-layer{--forge-state-layer-color: var(--forge-theme-primary)}forge-focus-indicator{--forge-focus-indicator-shape: var(--_tree-item-shape);z-index:1}';var ye=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,p=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ie(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&ye(e,t,s),s},$,R;let l=class extends(R=N,$=m,R){constructor(){super(),this.selected=!1,this.open=!1,this[$]=!1,this._level=0,this._leaf=!0,this._checkboxIcon="check_box_outline_blank",this._internals=this.attachInternals(),ne.define([ee,te,re])}get level(){return this._level}get leaf(){return!this._children.length}get indeterminate(){return this[m]}connectedCallback(){super.connectedCallback(),O(this,this._internals,{role:"treeitem"}),this.tabIndex=-1,this._level=me(this),this._placeInParent(),this._setLeaf()}willUpdate(r){r.has("open")&&this._setOpen(),r.has("selected")&&this._setSelected(),r.has(m)&&S(this._internals,"indeterminate",this.indeterminate),(r.has("selected")||r.has(m))&&(this._checkboxIcon=this.indeterminate?"indeterminate_check_box":this.selected?"check_box":"check_box_outline_blank")}render(){return x`
      <div
        part="root"
        class=${V({"forge-tree-item":!0,interactive:!this._leaf||this._context.mode!=="list"})}
        style=${se({"--_tree-item-level":this.level})}>
        <div part="header" class="header">
          ${this._leaf?x`<span class="leaf-spacer"></span>`:x`
                <span part="expand-icon" class="expand-icon">
                  <slot name="expand-icon">
                    <forge-open-icon orientation="horizontal" rotation="half" .open="${this.open}"></forge-open-icon>
                  </slot>
                </span>
              `}
          ${this._context.mode==="multiple"?x`<forge-icon id="checkbox" class="checkbox" part="checkbox" .name="${this._checkboxIcon}"></forge-icon>`:z}
          <slot name="start"></slot>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <slot name="end"></slot>
          ${this._context.mode!=="list"||!this._leaf?x`<forge-state-layer></forge-state-layer>`:z}
          <forge-focus-indicator target=":host" focus-mode="focus" inward></forge-focus-indicator>
        </div>
        <div role="group" class="children" part="children">
          <slot name="children" @slotchange="${this._setLeaf}"></slot>
        </div>
      </div>
    `}_placeInParent(){const r=this.parentElement;(r==null?void 0:r.tagName.toLowerCase())==="forge-tree-item"&&(this.slot="children")}_setLeaf(){this._leaf=this.leaf,this._setOpen(),S(this._internals,"leaf",this._leaf)}_setOpen(){O(this,this._internals,{ariaExpanded:this.leaf?null:this.open?"true":"false"}),S(this._internals,"open",!this.leaf&&this.open)}_setSelected(){O(this,this._internals,{ariaSelected:this.selected?"true":"false"}),S(this._internals,"selected",this.selected)}};l.styles=B(xe);p([_()],l.prototype,"value",2);p([_({type:Boolean})],l.prototype,"selected",2);p([_({type:Boolean})],l.prototype,"open",2);p([_({attribute:!1})],l.prototype,$,2);p([ce({context:X,subscribe:!0})],l.prototype,"_context",2);p([P()],l.prototype,"_level",2);p([P()],l.prototype,"_leaf",2);p([P()],l.prototype,"_checkboxIcon",2);p([ie({slot:"children",flatten:!0})],l.prototype,"_children",2);l=p([q("forge-tree-item")],l);const H="forge-tree",we={title:"Components/Tree",render:r=>x`
      <forge-tree .accordion=${r.accordion} .indentLines=${r.indentLines} .mode=${r.mode} .selectionFollowsFocus=${r.selectionFollowsFocus}>
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
    `,component:H,argTypes:{...Y({tagName:H,controls:{accordion:{control:{type:"boolean"}},indentLines:{control:{type:"boolean"}},mode:{control:{type:"select",options:["single","multiple","leaf","off"]}},selectionFollowsFocus:{control:{type:"boolean"}},value:{control:{type:"text"}}}})},args:{accordion:!1,indentLines:!1,mode:"single",selectionFollowsFocus:!1,value:""}},E={};var j,M,U;E.parameters={...E.parameters,docs:{...(j=E.parameters)==null?void 0:j.docs,source:{originalSource:"{}",...(U=(M=E.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};const ke=["Demo"],Me=Object.freeze(Object.defineProperty({__proto__:null,Demo:E,__namedExportsOrder:ke,default:we},Symbol.toStringTag,{value:"Module"}));export{E as D,Me as T};
