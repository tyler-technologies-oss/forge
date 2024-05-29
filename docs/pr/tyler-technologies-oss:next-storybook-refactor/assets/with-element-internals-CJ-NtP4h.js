import{q as o,t as l,u as c,k as u}from"./constants-P8PPbvcA.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function f(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function h(t,e,s,{setAttribute:r}={setAttribute:!0}){Object.entries(s).forEach(([a,n])=>{o()&&(e[a]=n);const i=f(a);(r||!t.hasAttribute(i))&&l(t,n!=null,i,n)})}function A(t){class e extends t{[c](r,a){h(this,this[u],r,a)}}return e}function b(t){class e extends t{constructor(...r){super(...r),this[u]=this.attachInternals()}}return e}export{A as W,b as a};
