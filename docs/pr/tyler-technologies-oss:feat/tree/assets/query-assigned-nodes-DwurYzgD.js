/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(t,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(t,r,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function c(t){return(r,e)=>{const{slot:o}=t??{},n="slot"+(o?`[name=${o}]`:":not([name])");return s(r,e,{get(){return this.renderRoot?.querySelector(n)?.assignedNodes(t)??[]}})}}export{s as e,c as n};
