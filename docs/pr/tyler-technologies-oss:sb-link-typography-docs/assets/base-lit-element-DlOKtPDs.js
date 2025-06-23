import{a as l,u as d,e as h,i as p}from"./iframe-Bc1Hm-RY.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=t=>(s,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,s)}):customElements.define(t,s)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:l},y=(t=u,s,e)=>{const{kind:o,metadata:r}=e;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(e.name,t),o==="accessor"){const{name:n}=e;return{set(i){const c=s.get.call(this);s.set.call(this,i),this.requestUpdate(n,c,t)},init(i){return i!==void 0&&this.C(n,void 0,t,i),i}}}if(o==="setter"){const{name:n}=e;return function(i){const c=this[n];s.call(this,i),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+o)};function w(t){return(s,e)=>typeof e=="object"?y(t,s,e):((o,r,a)=>{const n=r.hasOwnProperty(a);return r.constructor.createProperty(a,o),n?Object.getOwnPropertyDescriptor(r,a):void 0})(t,s,e)}function S(t){const s=t.shadowRoot,e=t.constructor.styles,o=t.ownerDocument.defaultView;if(!(!h||!s||!e||!o))if(Array.isArray(e)&&e.length){const r=e.map(a=>{const n=new o.CSSStyleSheet;return n.replaceSync(a.toString()),n});s.adoptedStyleSheets=r}else{const r=new o.CSSStyleSheet;r.replaceSync(e.toString()),s.adoptedStyleSheets=[r]}}class g extends p{adoptedCallback(){S(this)}}export{g as B,w as n,m as t};
