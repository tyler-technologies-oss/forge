import{D as d}from"./lit-html-DZH-Jm0H.js";import{r as a}from"./directive-helpers-DnQ__Q7V.js";import{i as A,t as _,e as $}from"./directive-Ctav8iJK.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=(t,s)=>{var i;const e=t._$AN;if(e===void 0)return!1;for(const h of e)(i=h._$AO)==null||i.call(h,s,!1),o(h,s);return!0},r=t=>{let s,e;do{if((s=t._$AM)===void 0)break;e=s._$AN,e.delete(t),t=s}while((e==null?void 0:e.size)===0)},l=t=>{for(let s;s=t._$AM;t=s){let e=s._$AN;if(e===void 0)s._$AN=e=new Set;else if(e.has(t))break;e.add(t),v(s)}};function f(t){this._$AN!==void 0?(r(this),this._$AM=t,l(this)):this._$AM=t}function u(t,s=!1,e=0){const i=this._$AH,h=this._$AN;if(h!==void 0&&h.size!==0)if(s)if(Array.isArray(i))for(let n=e;n<i.length;n++)o(i[n],!1),r(i[n]);else i!=null&&(o(i,!1),r(i));else o(this,t)}const v=t=>{t.type==_.CHILD&&(t._$AP??(t._$AP=u),t._$AQ??(t._$AQ=f))};class p extends A{constructor(){super(...arguments),this._$AN=void 0}_$AT(s,e,i){super._$AT(s,e,i),l(this),this.isConnected=s._$AU}_$AO(s,e=!0){var i,h;s!==this.isConnected&&(this.isConnected=s,s?(i=this.reconnected)==null||i.call(this):(h=this.disconnected)==null||h.call(this)),e&&(o(this,s),r(this))}setValue(s){if(a(this.t))this.t._$AI(s,this);else{const e=[...this.t._$AH];e[this.i]=s,this.t._$AI(e,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=()=>new Y;class Y{}const c=new WeakMap,y=$(class extends p{render(t){return d}update(t,[s]){var i;const e=s!==this.Y;return e&&this.Y!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=s,this.ht=(i=t.options)==null?void 0:i.host,this.rt(this.ct=t.element)),d}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const s=this.ht??globalThis;let e=c.get(s);e===void 0&&(e=new WeakMap,c.set(s,e)),e.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),e.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,s;return typeof this.Y=="function"?(t=c.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(s=this.Y)==null?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});export{y as K,w as i};
