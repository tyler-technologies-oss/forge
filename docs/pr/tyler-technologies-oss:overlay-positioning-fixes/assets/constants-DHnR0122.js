import{g as h,h as d,j as g}from"./feature-detection-C61kIZu7.js";const S=Symbol("Forge custom element tag name"),c=Symbol("Forge custom element dependencies"),l=Symbol("Forge custom element parsed template"),u=Symbol("Forge custom element CSS text"),i=Symbol("Forge custom element CSSStyleSheet instances"),f=window.__forgeFlags__useConstructableStyleSheets!==!1&&window.ShadowRoot&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;function m(t){y(t[S],t),h(t[c])&&w(t[c])}function w(t){t.forEach(m)}function y(t,e,n){var o;(o=window==null?void 0:window.customElements)!=null&&o.get(t)||window.customElements.define(t,e,n)}function L(t,e){let n=t;for(;n.parentNode&&(n=n.parentNode,!!n.tagName);)if(!n.tagName||n.tagName.toLowerCase()===e.toLowerCase())return n;return null}function E(t){return new DOMParser().parseFromString(t,"text/html").querySelector("template")}function M(t,e){t.appendChild(E(e).content.cloneNode(!0))}function O(t,e,n,o=!1){t.attachShadow({mode:"open",delegatesFocus:o}),n&&C(t,n),p(t,e)}function p(t,e,{force:n}={force:!1}){const o=t.constructor;if(n||!o[l]){const s=e instanceof HTMLTemplateElement?e:E(e);o[l]=s}const a=o[l];t.shadowRoot.appendChild(a.content.cloneNode(!0))}function C(t,e,{force:n}={force:!1}){const o=t.constructor;if(!t.shadowRoot||!e){f&&(o[i]&&(o[i]=[]),t.shadowRoot&&(t.shadowRoot.adoptedStyleSheets=[]));return}if(e=e instanceof Array?e:[e],f){if(n||!o[i]){const a=t.ownerDocument.defaultView??window,s=new a.CSSStyleSheet,r=e.join(" ");s.replaceSync(r),o[u]=r,o[i]=[s]}t.shadowRoot.adoptedStyleSheets=o[i]}else{const a=document.createElement("style"),s=window.forgeNonce;s&&a.setAttribute("nonce",s),a.textContent=e.join(" "),t.shadowRoot.appendChild(a)}}function _(t){if(!f||!t.shadowRoot||!t.constructor[u]||!t.ownerDocument.defaultView)return;const e=new t.ownerDocument.defaultView.CSSStyleSheet;e.replaceSync(t.constructor[u]),t.shadowRoot.adoptedStyleSheets=[e]}function T(t,e){return t.shadowRoot.querySelector(e)}function P(t,e){return t.querySelector(e)}function D(t,e,n,o=!0,a=!1){let s;return typeof CustomEvent=="function"?s=new CustomEvent(e,{detail:n,bubbles:o,cancelable:a}):(s=document.createEvent("CustomEvent"),s.initCustomEvent(e,o,a,n)),t.dispatchEvent(s)}function F(t,e,n,o,a,s){const r=!!T(t,o);return s||(s=document.createComment(`(${n}) ${o}`)),e&&!r?d(a,s):!e&&r&&d(s,a),s}function v(t,e){function n(o){return!o||o===document||o===window?null:(o.assignedSlot&&(o=o.assignedSlot),o.closest(t)||n(o.getRootNode().host))}return n(e)}function A({name:t,dependencies:e,define:n=!0}){return o=>{b(o),t&&(o[S]=t),e&&e.length&&(o[c]=e),window.__forgeFlags__autoDefine!==!1&&n&&m(o)}}function b(t){const e=t.prototype.connectedCallback;t.prototype.connectedCallback=function(){this.isConnected&&(this._isInitialized||(R(this),typeof this.initializedCallback=="function"&&this.initializedCallback.apply(this),this._isInitialized=!0),typeof e=="function"&&e.apply(this))}}function R(t){const e=Object.getOwnPropertyNames(t).filter(n=>!n.startsWith("_"));for(const n of e){const o=t[n];delete t[n],t[n]=o}}class k extends HTMLElement{adoptedCallback(){this.shadowRoot&&_(this)}}const U="forge-",x=500,V="tyler-icons",H="https://cdn.forge.tylertech.com/",Y=g(),j="data-forge-deferred-label-target",q=Symbol("getFormValue"),B=Symbol("getFormState"),z=Symbol("setValidity"),K=Symbol("getValidityMessage"),$=Symbol("ElementInternals"),G=Symbol("inputType"),W=Symbol("isFocusable"),X=Symbol("setDefaultAria"),J=Symbol("updateTarget"),Q=Symbol("forgeLabelRef");export{k as B,U as C,j as D,V as I,x as K,W as a,q as b,Y as c,G as d,K as e,Q as f,B as g,D as h,$ as i,A as j,O as k,T as l,z as m,v as n,H as o,M as p,P as q,L as r,X as s,F as t,J as u,y as v};
