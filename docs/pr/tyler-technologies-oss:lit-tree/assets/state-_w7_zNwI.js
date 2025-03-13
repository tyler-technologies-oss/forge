import{u as d,f as l}from"./lit-element-JplMEnZc.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:l},p=(t=u,r,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,t),s==="accessor"){const{name:n}=e;return{set(a){const c=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,c,t)},init(a){return a!==void 0&&this.P(n,void 0,t),a}}}if(s==="setter"){const{name:n}=e;return function(a){const c=this[n];r.call(this,a),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+s)};function h(t){return(r,e)=>typeof e=="object"?p(t,r,e):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(t,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(t){return h({...t,state:!0,attribute:!1})}export{h as n,g as r,m as t};
