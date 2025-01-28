import{e as o,s as u,t as l,m as c}from"./constants-CFf81ck9.js";function A(t){var e;class a extends(e=t,e){constructor(...r){super(...r),this[o]=this.attachInternals()}}return a}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function f(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function h(t,e,a,{setAttribute:s}={setAttribute:!0}){Object.entries(a).forEach(([r,n])=>{u()&&(e[r]=n);const i=f(r);(s||!t.hasAttribute(i))&&l(t,n!=null,i,n)})}function m(t){class e extends t{[c](s,r){h(this,this[o],s,r)}}return e}export{m as W,A as a};
