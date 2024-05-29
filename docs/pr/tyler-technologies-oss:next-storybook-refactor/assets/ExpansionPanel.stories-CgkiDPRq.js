import{x as _,T as y}from"./lit-element-BOOoordI.js";import{T as d}from"./lit-html-BWgXkSvR.js";import{a as A}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as q,a as T}from"./constants-CGWcLB8c.js";import{i as C,t as Y,e as L,o as N}from"./style-map-CkvVWuL1.js";import{f as V}from"./directive-helpers-DYUueT8w.js";import"./expansion-panel-mfpuhfTh.js";import"./card-g0WjjDNa.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const c=(e,t)=>{var i;const o=e._$AN;if(o===void 0)return!1;for(const n of o)(i=n._$AO)==null||i.call(n,t,!1),c(n,t);return!0},u=e=>{let t,o;do{if((t=e._$AM)===void 0)break;o=t._$AN,o.delete(e),e=t}while((o==null?void 0:o.size)===0)},x=e=>{for(let t;t=e._$AM;e=t){let o=t._$AN;if(o===void 0)t._$AN=o=new Set;else if(o.has(e))break;o.add(e),M(t)}};function w(e){this._$AN!==void 0?(u(this),this._$AM=e,x(this)):this._$AM=e}function E(e,t=!1,o=0){const i=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(i))for(let r=o;r<i.length;r++)c(i[r],!1),u(i[r]);else i!=null&&(c(i,!1),u(i));else c(this,e)}const M=e=>{e.type==Y.CHILD&&(e._$AP??(e._$AP=E),e._$AQ??(e._$AQ=w))};class S extends C{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,o,i){super._$AT(t,o,i),x(this),this.isConnected=t._$AU}_$AO(t,o=!0){var i,n;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(n=this.disconnected)==null||n.call(this)),o&&(c(this,t),u(this))}setValue(t){if(V(this._$Ct))this._$Ct._$AI(t,this);else{const o=[...this._$Ct._$AH];o[this._$Ci]=t,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=()=>new O;class O{}const l=new WeakMap,j=L(class extends S{render(e){return d}update(e,[t]){var i;const o=t!==this.Y;return o&&this.Y!==void 0&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),d}rt(e){if(typeof this.Y=="function"){const t=this.ht??globalThis;let o=l.get(t);o===void 0&&(o=new WeakMap,l.set(t,o)),o.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),o.set(this.Y,e),e!==void 0&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){var e,t;return typeof this.Y=="function"?(e=l.get(this.ht??globalThis))==null?void 0:e.get(this.Y):(t=this.Y)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),m="forge-expansion-panel",k=A("forge-expansion-panel-toggle"),z=A("forge-expansion-panel-animation-complete"),D={title:"Components/Expansion Panel",component:m,render:e=>{const t=q(e),o=t?N(t):y,i=H();function n(r){var p;k(),(p=i.value)==null||p.setAttribute("aria-expanded",r.detail.toString())}return _`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${o}
        @forge-expansion-panel-toggle=${n}
        @forge-expansion-panel-animation-complete=${z}>
        <button ${j(i)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
        <div id="content" role="group">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </div>
      </forge-expansion-panel>
    `},argTypes:{...T({tagName:m,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},s={},a={render:({open:e,animationType:t,orientation:o})=>_`
      <forge-card>
        <forge-expansion-panel .open=${e} .animationType=${t} .orientation=${o}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    `};var h,f,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var $,v,b;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: ({
    open,
    animationType,
    orientation
  }) => {
    return html\`
      <forge-card>
        <forge-expansion-panel .open=\${open} .animationType=\${animationType} .orientation=\${orientation}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    \`;
  }
}`,...(b=(v=a.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const P=["Demo","WithCard"],J=Object.freeze(Object.defineProperty({__proto__:null,Demo:s,WithCard:a,__namedExportsOrder:P,default:D},Symbol.toStringTag,{value:"Module"}));export{s as D,J as E};
