import{f as d,u as l}from"./lit-element-B3QVTycr.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=e=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(e,r)}):customElements.define(e,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:d},u=(e=p,r,t)=>{const{kind:s,metadata:i}=t;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(t.name,e),s==="accessor"){const{name:n}=t;return{set(a){const c=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,c,e)},init(a){return a!==void 0&&this.P(n,void 0,e),a}}}if(s==="setter"){const{name:n}=t;return function(a){const c=this[n];r.call(this,a),this.requestUpdate(n,c,e)}}throw Error("Unsupported decorator location: "+s)};function m(e){return(r,t)=>typeof t=="object"?u(e,r,t):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(e,r,t)}export{m as n,f as t};
