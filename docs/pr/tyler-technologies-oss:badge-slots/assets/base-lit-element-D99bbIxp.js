import{f as l,u as d,e as p,i as h}from"./lit-element-BuSzPo2N.js";import"./lit-html-Ox1a2bD1.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:l},y=(t=u,r,e)=>{const{kind:o,metadata:s}=e;let a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(e.name,t),o==="accessor"){const{name:n}=e;return{set(i){const c=r.get.call(this);r.set.call(this,i),this.requestUpdate(n,c,t)},init(i){return i!==void 0&&this.C(n,void 0,t,i),i}}}if(o==="setter"){const{name:n}=e;return function(i){const c=this[n];r.call(this,i),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+o)};function g(t){return(r,e)=>typeof e=="object"?y(t,r,e):((o,s,a)=>{const n=s.hasOwnProperty(a);return s.constructor.createProperty(a,o),n?Object.getOwnPropertyDescriptor(s,a):void 0})(t,r,e)}function S(t){const r=t.shadowRoot,e=t.constructor.styles,o=t.ownerDocument.defaultView;if(!(!p||!r||!e||!o))if(Array.isArray(e)&&e.length){const s=e.map(a=>{const n=new o.CSSStyleSheet;return n.replaceSync(a.toString()),n});r.adoptedStyleSheets=s}else{const s=new o.CSSStyleSheet;s.replaceSync(e.toString()),r.adoptedStyleSheets=[s]}}class b extends h{adoptedCallback(){S(this)}}export{b as B,g as n,w as t};
