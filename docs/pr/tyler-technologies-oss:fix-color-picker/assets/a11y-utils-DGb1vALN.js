import{s as n,t as u}from"./feature-detection-CY6TVbRZ.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */function c(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}function p(t,i,s,{setAttribute:o}={setAttribute:!0}){Object.entries(s).forEach(([e,r])=>{n()&&(i[e]=r);const a=c(e);(o||!t.hasAttribute(a))&&u(t,r!=null,a,r)})}export{p as s};
