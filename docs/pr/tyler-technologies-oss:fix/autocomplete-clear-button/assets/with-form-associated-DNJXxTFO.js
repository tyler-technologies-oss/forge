import{a as r,i as l,g as p,b as f,d as g,e as x}from"./constants-DzQy6WDX.js";import{t as I}from"./feature-detection-B-sRDmdg.js";import"./service-adapter-CffG5Lhq.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */const b=Symbol("privateIsFocusable"),u=Symbol("externalTabIndex"),o=Symbol("isUpdatingTabIndex"),h=Symbol("updateTabIndex");function y(c){var s,i,d;class t extends c{constructor(){super(...arguments),this[d]=!1,this[i]=null,this[s]=!1}get[r](){return this[b]}set[r](e){this[r]!==e&&(this[b]=e,this[h]())}connectedCallback(){this[r]=!0,super.connectedCallback?.()}attributeChangedCallback(e,a,m){if(super.attributeChangedCallback?.(e,a,m),!(e!=="tabindex"||this[o])){if(!this.hasAttribute("tabindex")){this[u]=null,this[h]();return}this[u]=this.tabIndex}}[(d=b,i=u,s=o,h)](){const e=this[r]?0:-1,a=this[u]??e;this[o]=!0,this.tabIndex=a,this[o]=!1}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */function k(c){const i=class i extends c{get form(){return this[l].form}get labels(){return this[l].labels}get name(){return this.getAttribute("name")??""}set name(t){I(this,!!t,"name",t)}[p](){return this[f]()}formDisabledCallback(t){this.disabled=t}set[g](t){const n=t==="select"?document.createElement("select"):document.createElement("input");n.setAttribute("type",t),n.name="internal",this._inputElement=n}[x](t){if(this._inputElement){if(this[l].validity.customError)return this[l].validationMessage;if(this._inputElement){const n=Object.entries(t);for(const[e,a]of n)this._inputElement[e]=a}return this._inputElement.validationMessage}}};i.formAssociated=!0;let s=i;return s}export{k as W,y as a};
