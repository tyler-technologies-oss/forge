import{s as n,t as u}from"./feature-detection-B-sRDmdg.js";import"./service-adapter-CffG5Lhq.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function p(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function b(t,i,s,{setAttribute:o}={setAttribute:!0}){Object.entries(s).forEach(([e,r])=>{n()&&(i[e]=r);const a=p(e);(o||!t.hasAttribute(a))&&u(t,r!=null,a,r)})}export{b as s};
