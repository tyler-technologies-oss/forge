import{u,f as b,r as f,a as y}from"./lit-element-JplMEnZc.js";import{x as v}from"./lit-html-paDGiEfB.js";import{s as h}from"./a11y-utils-BOPvdiVn.js";import{e as _}from"./class-map-D55lQyt8.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:b},x=(r=k,t,e)=>{const{kind:a,metadata:o}=e;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),i.set(e.name,r),a==="accessor"){const{name:l}=e;return{set(n){const p=t.get.call(this);t.set.call(this,n),this.requestUpdate(l,p,r)},init(n){return n!==void 0&&this.P(l,void 0,r),n}}}if(a==="setter"){const{name:l}=e;return function(n){const p=this[l];t.call(this,n),this.requestUpdate(l,p,r)}}throw Error("Unsupported decorator location: "+a)};function d(r){return(t,e)=>typeof e=="object"?x(r,t,e):((a,o,i)=>{const l=o.hasOwnProperty(i);return o.constructor.createProperty(i,l?{...a,wrapped:!0}:a),l?Object.getOwnPropertyDescriptor(o,i):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(r){return d({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=(r,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(r){return(t,e)=>{const{slot:a}=r??{},o="slot"+(a?`[name=${a}]`:":not([name])");return w(t,e,{get(){var l;const i=(l=this.renderRoot)==null?void 0:l.querySelector(o);return(i==null?void 0:i.assignedNodes(r))??[]}})}}const C=":host{display:block}.forge-key{--_key-gap: var(--forge-key-gap, var(--forge-spacing-medium, 16px));--_key-direction: var(--forge-key-direction, row)}.forge-key{box-sizing:border-box;display:flex;flex-direction:var(--_key-direction);gap:var(--_key-gap);flex-wrap:wrap}";var $=Object.defineProperty,O=Object.getOwnPropertyDescriptor,j=(r,t,e,a)=>{for(var o=a>1?void 0:a?O(t,e):t,i=r.length-1,l;i>=0;i--)(l=r[i])&&(o=(a?l(t,e,o):l(o))||o);return a&&o&&$(t,e,o),o};let g=class extends y{constructor(){super(),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),h(this,this._internals,{role:"list"})}render(){return v`<div part="root" class="forge-key"><slot></slot></div>`}};g.styles=f(C);g=j([m("forge-key")],g);const D=':host{display:inline}.forge-key-item{--_key-item-icon-color: var(--forge-key-item-icon-color, var(--forge-theme-tertiary, #3d5afe));--_key-item-label-color: var(--forge-key-item-label-color, var(--forge-theme-text-high, rgba(0, 0, 0, .87)));--_key-item-value-color: var(--forge-key-item-value-color, var(--forge-theme-text-medium, rgba(0, 0, 0, .6)));--_key-item-gap: var(--forge-key-item-gap, var(--forge-spacing-xsmall, 8px));--_key-item-icon-size: var(--forge-key-item-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1))}.forge-key-item{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit);box-sizing:border-box;display:grid;grid-template:"icon label" "icon value";column-gap:var(--_key-item-gap);inline-size:fit-content;line-height:normal}.forge-key-item.inline{grid-template:"icon label value";grid-template-columns:auto 1fr auto;align-items:center;inline-size:auto}.forge-key-item.no-value{grid-template:"icon label";align-items:center}.forge-key-item.no-value .value{display:none}.forge-key-item:not(.inline,.no-value) .label{padding-block-start:1px}.icon{--forge-icon-size: var(--_key-item-icon-size);grid-area:icon;color:var(--_key-item-icon-color)}.label{grid-area:label;color:var(--_key-item-label-color)}.value{grid-area:value;color:var(--_key-item-value-color)}.default-icon{block-size:calc(var(--_key-item-icon-size) - 1px);inline-size:calc(var(--_key-item-icon-size) - 1px);border-radius:50%;background:currentColor}';var S=Object.defineProperty,I=Object.getOwnPropertyDescriptor,c=(r,t,e,a)=>{for(var o=a>1?void 0:a?I(t,e):t,i=r.length-1,l;i>=0;i--)(l=r[i])&&(o=(a?l(t,e,o):l(o))||o);return a&&o&&S(t,e,o),o};let s=class extends y{constructor(){super(),this.inline=!1,this._hasValue=!1,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),h(this,this._internals,{role:"listitem"}),this._handleSlotChange()}render(){return v`
      <div part="root" class=${_({"forge-key-item":!0,inline:this.inline,"no-value":!this._hasValue})}>
        <div part="icon" class="icon">
          <slot name="icon">
            <div class="default-icon"></div>
          </slot>
        </div>
        <div part="label" class="label">
          <slot></slot>
        </div>
        <div part="value" class="value" @slotchange=${this._handleSlotChange}>
          <slot name="value"></slot>
        </div>
      </div>
    `}_handleSlotChange(){const r=this._valueNodes.filter(t=>{var e;return!!((e=t.textContent)!=null&&e.trim())});this._hasValue=!!r.length}};s.styles=f(D);c([d({type:Boolean})],s.prototype,"inline",2);c([z()],s.prototype,"_hasValue",2);c([P({slot:"value"})],s.prototype,"_valueNodes",2);s=c([m("forge-key-item")],s);export{P as a,w as e,d as n,z as r,m as t};
