import{x}from"./lit-element-Co407TGG.js";import"./lit-html-Cxzf5Fb2.js";import{a as b}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{C as y,e as w,B as q,f as E,h as C,c as A,g as T}from"./icon-DXSQMaWm.js";import"./expansion-panel-BsOasg49.js";const P=`${y}card`,_={RAISED:"raised"},S={..._},s={elementName:P,observedAttributes:_,attributes:S},O=`<template>
  <div class="forge-card" part="root">
    <slot></slot>
  </div>
</template>`,L=":host{display:block}:host([hidden]){display:none}.forge-card{--_card-background: var(--forge-card-background, var(--forge-theme-surface, #ffffff));--_card-height: var(--forge-card-height, 100%);--_card-width: var(--forge-card-width, 100%);--_card-outline-color: var(--forge-card-outline-color, var(--forge-theme-outline, #e0e0e0));--_card-outline-width: var(--forge-card-outline-width, var(--forge-border-thin, 1px));--_card-outline-style: var(--forge-card-outline-style, solid);--_card-elevation: var(--forge-card-elevation, none);--_card-padding: var(--forge-card-padding, var(--forge-spacing-medium, 16px));--_card-shape: var(--forge-card-shape, var(--forge-shape-medium, 4px));--_card-overflow: var(--forge-card-overflow, hidden);--_card-raised-elevation: var(--forge-card-raised-elevation, 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12));--_card-raised-outline-width: var(--forge-card-raised-outline-width, 0)}.forge-card{background:var(--_card-background);border-color:var(--_card-outline-color);border-width:var(--_card-outline-width);border-style:var(--_card-outline-style);border-radius:var(--_card-shape);box-shadow:var(--_card-elevation);box-sizing:border-box;padding:var(--_card-padding);overflow:var(--_card-overflow);height:var(--_card-height);width:var(--_card-width);-webkit-tap-highlight-color:transparent}:host([raised]) .forge-card{--_card-elevation: var(--_card-raised-elevation);--_card-outline-width: var(--_card-raised-outline-width)}:host([no-padding]) .forge-card{--_card-padding: var(--forge-card-padding, 0)}";var D=Object.defineProperty,N=Object.getOwnPropertyDescriptor,j=(r,t,e,a)=>{for(var o=a>1?void 0:a?N(t,e):t,d=r.length-1,c;d>=0;d--)(c=r[d])&&(o=(a?c(t,e,o):c(o))||o);return a&&o&&D(t,e,o),o};let p=class extends q{constructor(){super(),this._raised=!1,E(this,O,L)}static get observedAttributes(){return Object.values(s.observedAttributes)}attributeChangedCallback(r,t,e){switch(r){case s.attributes.RAISED:this.raised=C(e);break}}get raised(){return this._raised}set raised(r){r=!!r,this._raised!==r&&(this._raised=r,this.toggleAttribute(s.attributes.RAISED,this._raised))}};p=j([w({name:s.elementName})],p);const l="forge-expansion-panel",$=b("forge-expansion-panel-toggle"),R=b("forge-expansion-panel-animation-complete"),B={title:"Components/Expansion Panel",component:l,render:r=>{const t=A(l,r),e=document.createElement("button");e.slot="header",e.textContent="Toggle",e.setAttribute("type","button"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","content"),t.appendChild(e);const a=document.createElement("div");return a.id="content",a.setAttribute("role","group"),a.innerHTML=`
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
    `,t.appendChild(a),t.addEventListener("forge-expansion-panel-toggle",$),t.addEventListener("forge-expansion-panel-animation-complete",R),t},argTypes:{...T({tagName:l,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},n={},i={render:({open:r,animationType:t,orientation:e})=>x`
      <forge-card>
        <forge-expansion-panel .open=${r} .animationType=${t} .orientation=${e}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    `};var u,m,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(g=(m=n.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,v,h;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(h=(v=i.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};const I=["Demo","WithCard"],W=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,WithCard:i,__namedExportsOrder:I,default:B},Symbol.toStringTag,{value:"Module"}));export{n as D,W as E};
