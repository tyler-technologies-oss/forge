import{a as n,i as r,g,b as f,d as x,e as I}from"./constants-NErMj_Tj.js";import{t as _}from"./feature-detection-CY6TVbRZ.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */const c=Symbol("privateIsFocusable"),l=Symbol("externalTabIndex"),u=Symbol("isUpdatingTabIndex"),h=Symbol("updateTabIndex");function y(o){var s,a,d;class e extends o{constructor(){super(...arguments),this[d]=!1,this[a]=null,this[s]=!1}get[n](){return this[c]}set[n](t){this[n]!==t&&(this[c]=t,this[h]())}connectedCallback(){var t;this[n]=!0,(t=super.connectedCallback)==null||t.call(this)}attributeChangedCallback(t,b,p){var m;if((m=super.attributeChangedCallback)==null||m.call(this,t,b,p),!(t!=="tabindex"||this[u])){if(!this.hasAttribute("tabindex")){this[l]=null,this[h]();return}this[l]=this.tabIndex}}[(d=c,a=l,s=u,h)](){const t=this[n]?0:-1,b=this[l]??t;this[u]=!0,this.tabIndex=b,this[u]=!1}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */function C(o){const a=class a extends o{get form(){return this[r].form}get labels(){return this[r].labels}get name(){return this.getAttribute("name")??""}set name(e){_(this,!!e,"name",e)}[g](){return this[f]()}formDisabledCallback(e){this.disabled=e}set[x](e){const i=e==="select"?document.createElement("select"):document.createElement("input");i.setAttribute("type",e),i.name="internal",this._inputElement=i}[I](e){if(this._inputElement)return this[r].validity.customError?this[r].validationMessage:(Object.entries(e).forEach(([i,t])=>this._inputElement[i]=t),this._inputElement.validationMessage)}};a.formAssociated=!0;let s=a;return s}export{C as W,y as a};
