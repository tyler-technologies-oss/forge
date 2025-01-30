import{s as c,t as u}from"./feature-detection-ONR9WHvu.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function f(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function n(t,e,r,{setAttribute:o}={setAttribute:!0}){Object.entries(r).forEach(([s,a])=>{c()&&(e[s]=a);const i=f(s);(o||!t.hasAttribute(i))&&u(t,a!=null,i,a)})}function p(t,e,r){if(r)try{t.states.add(e)}catch{t.states.add(`--${e}`)}else try{t.states.delete(e)}catch{t.states.delete(`--${e}`)}}export{n as s,p as t};
