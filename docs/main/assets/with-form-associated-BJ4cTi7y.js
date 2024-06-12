import{i as n,e as r,t as p,g as f,f as x,h as I,j as _}from"./constants-CmaEVTEu.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */const h=Symbol("privateIsFocusable"),l=Symbol("externalTabIndex"),u=Symbol("isUpdatingTabIndex"),b=Symbol("updateTabIndex");function T(o){var s,a,d;class e extends o{constructor(){super(...arguments),this[s]=!1,this[a]=null,this[d]=!1}get[n](){return this[h]}set[n](t){this[n]!==t&&(this[h]=t,this[b]())}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this[n]=!0}attributeChangedCallback(t,c,g){var m;if((m=super.attributeChangedCallback)==null||m.call(this,t,c,g),!(t!=="tabindex"||this[u])){if(!this.hasAttribute("tabindex")){this[l]=null,this[b]();return}this[l]=this.tabIndex}}[(s=h,a=l,d=u,b)](){const t=this[n]?0:-1,c=this[l]??t;this[u]=!0,this.tabIndex=c,this[u]=!1}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */function y(o){const a=class a extends o{get form(){return this[r].form}get labels(){return this[r].labels}get name(){return this.getAttribute("name")??""}set name(e){p(this,!!e,"name",e)}[f](){return this[x]()}formDisabledCallback(e){this.disabled=e}set[I](e){const i=e==="select"?document.createElement("select"):document.createElement("input");i.setAttribute("type",e),i.name="internal",this._inputElement=i}[_](e){if(this._inputElement)return this[r].validity.customError?this[r].validationMessage:(Object.entries(e).forEach(([i,t])=>this._inputElement[i]=t),this._inputElement.validationMessage)}};a.formAssociated=!0;let s=a;return s}export{y as W,T as a};
