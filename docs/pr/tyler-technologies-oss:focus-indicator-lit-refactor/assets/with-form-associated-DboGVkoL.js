import{a as r,i as l,g as f,b as g,d as x,e as I}from"./constants-BGCYAxRd.js";import{t as _}from"./feature-detection-tRmgbRLz.js";import"./service-adapter-BykFeYYZ.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */const b=Symbol("privateIsFocusable"),u=Symbol("externalTabIndex"),o=Symbol("isUpdatingTabIndex"),h=Symbol("updateTabIndex");function k(c){var s,i,d;class e extends c{constructor(){super(...arguments),this[d]=!1,this[i]=null,this[s]=!1}get[r](){return this[b]}set[r](t){this[r]!==t&&(this[b]=t,this[h]())}connectedCallback(){var t;this[r]=!0,(t=super.connectedCallback)==null||t.call(this)}attributeChangedCallback(t,a,p){var m;if((m=super.attributeChangedCallback)==null||m.call(this,t,a,p),!(t!=="tabindex"||this[o])){if(!this.hasAttribute("tabindex")){this[u]=null,this[h]();return}this[u]=this.tabIndex}}[(d=b,i=u,s=o,h)](){const t=this[r]?0:-1,a=this[u]??t;this[o]=!0,this.tabIndex=a,this[o]=!1}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */function v(c){const i=class i extends c{get form(){return this[l].form}get labels(){return this[l].labels}get name(){return this.getAttribute("name")??""}set name(e){_(this,!!e,"name",e)}[f](){return this[g]()}formDisabledCallback(e){this.disabled=e}set[x](e){const n=e==="select"?document.createElement("select"):document.createElement("input");n.setAttribute("type",e),n.name="internal",this._inputElement=n}[I](e){if(this._inputElement){if(this[l].validity.customError)return this[l].validationMessage;if(this._inputElement){const n=Object.entries(e);for(const[t,a]of n)this._inputElement[t]=a}return this._inputElement.validationMessage}}};i.formAssociated=!0;let s=i;return s}export{v as W,k as a};
