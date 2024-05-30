import{k as u,q as o,t as l,u as c}from"./constants-CNtkYrkV.js";function A(t){class e extends t{constructor(...r){super(...r),this[u]=this.attachInternals()}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function f(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function h(t,e,s,{setAttribute:r}={setAttribute:!0}){Object.entries(s).forEach(([a,n])=>{o()&&(e[a]=n);const i=f(a);(r||!t.hasAttribute(i))&&l(t,n!=null,i,n)})}function b(t){class e extends t{[c](r,a){h(this,this[u],r,a)}}return e}export{b as W,A as a};
