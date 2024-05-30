import{j as i,k as r,t as g,l as x,m as f,n as I,o as _}from"./constants-CNtkYrkV.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */const b=Symbol("privateIsFocusable"),l=Symbol("externalTabIndex"),u=Symbol("isUpdatingTabIndex"),h=Symbol("updateTabIndex");function T(o){var s,a,d;class e extends o{constructor(){super(...arguments),this[s]=!1,this[a]=null,this[d]=!1}get[i](){return this[b]}set[i](t){this[i]!==t&&(this[b]=t,this[h]())}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this[i]=!0}attributeChangedCallback(t,c,p){var m;if((m=super.attributeChangedCallback)==null||m.call(this,t,c,p),!(t!=="tabindex"||this[u])){if(!this.hasAttribute("tabindex")){this[l]=null,this[h]();return}this[l]=this.tabIndex}}[(s=b,a=l,d=u,h)](){const t=this[i]?0:-1,c=this[l]??t;this[u]=!0,this.tabIndex=c,this[u]=!1}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */function k(o){const a=class a extends o{get form(){return this[r].form}get labels(){return this[r].labels}get name(){return this.getAttribute("name")??""}set name(e){g(this,!!e,"name",e)}[x](){return this[f]()}formDisabledCallback(e){this.disabled=e}set[I](e){const n=e==="select"?document.createElement("select"):document.createElement("input");n.setAttribute("type",e),n.name="internal",this._inputElement=n}[_](e){if(this._inputElement)return this[r].validity.customError?this[r].validationMessage:(Object.entries(e).forEach(([n,t])=>this._inputElement[n]=t),this._inputElement.validationMessage)}};a.formAssociated=!0;let s=a;return s}export{k as W,T as a};
