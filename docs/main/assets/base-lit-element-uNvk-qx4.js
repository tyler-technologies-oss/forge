import{f as l,u as d,e as p,a as h}from"./lit-element-CYrSCkDY.js";import"./lit-html-CuBe1DX_.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=e=>(s,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(e,s)}):customElements.define(e,s)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:l},y=(e=u,s,t)=>{const{kind:n,metadata:r}=t;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),a.set(t.name,e),n==="accessor"){const{name:o}=t;return{set(i){const c=s.get.call(this);s.set.call(this,i),this.requestUpdate(o,c,e)},init(i){return i!==void 0&&this.P(o,void 0,e),i}}}if(n==="setter"){const{name:o}=t;return function(i){const c=this[o];s.call(this,i),this.requestUpdate(o,c,e)}}throw Error("Unsupported decorator location: "+n)};function g(e){return(s,t)=>typeof t=="object"?y(e,s,t):((n,r,a)=>{const o=r.hasOwnProperty(a);return r.constructor.createProperty(a,o?{...n,wrapped:!0}:n),o?Object.getOwnPropertyDescriptor(r,a):void 0})(e,s,t)}function S(e){const s=e.shadowRoot,t=e.constructor.styles,n=e.ownerDocument.defaultView;if(!(!p||!s||!t||!n))if(Array.isArray(t)&&t.length){const r=t.map(a=>{const o=new n.CSSStyleSheet;return o.replaceSync(a.toString()),o});s.adoptedStyleSheets=r}else{const r=new n.CSSStyleSheet;r.replaceSync(t.toString()),s.adoptedStyleSheets=[r]}}class b extends h{adoptedCallback(){S(this)}}export{b as B,g as n,w as t};
