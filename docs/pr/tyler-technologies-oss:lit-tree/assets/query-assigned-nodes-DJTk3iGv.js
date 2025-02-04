import{u,f as d}from"./lit-element-JplMEnZc.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=e=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(e,r)}):customElements.define(e,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:d},p=(e=l,r,t)=>{const{kind:s,metadata:a}=t;let n=globalThis.litPropertyMetadata.get(a);if(n===void 0&&globalThis.litPropertyMetadata.set(a,n=new Map),n.set(t.name,e),s==="accessor"){const{name:o}=t;return{set(i){const c=r.get.call(this);r.set.call(this,i),this.requestUpdate(o,c,e)},init(i){return i!==void 0&&this.P(o,void 0,e),i}}}if(s==="setter"){const{name:o}=t;return function(i){const c=this[o];r.call(this,i),this.requestUpdate(o,c,e)}}throw Error("Unsupported decorator location: "+s)};function f(e){return(r,t)=>typeof t=="object"?p(e,r,t):((s,a,n)=>{const o=a.hasOwnProperty(n);return a.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(a,n):void 0})(e,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(e){return f({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const h=(e,r,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(e,r,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(e){return(r,t)=>{const{slot:s}=e??{},a="slot"+(s?`[name=${s}]`:":not([name])");return h(r,t,{get(){var o;const n=(o=this.renderRoot)==null?void 0:o.querySelector(a);return(n==null?void 0:n.assignedNodes(e))??[]}})}}export{y as a,h as e,f as n,g as r,b as t};
