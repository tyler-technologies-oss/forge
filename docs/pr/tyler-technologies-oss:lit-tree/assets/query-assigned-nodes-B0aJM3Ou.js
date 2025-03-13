/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u=(t,o,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(t,o,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function a(t){return(o,e)=>{const{slot:r}=t??{},c="slot"+(r?`[name=${r}]`:":not([name])");return u(o,e,{get(){var s;const n=(s=this.renderRoot)==null?void 0:s.querySelector(c);return(n==null?void 0:n.assignedNodes(t))??[]}})}}export{u as e,a as n};
