import{C as h,j as n,B as g,k as b}from"./constants-BGCYAxRd.js";import"./service-adapter-BykFeYYZ.js";const c=`${h}scaffold`,f={VIEWPORT:"viewport"},v={...f},o={elementName:c,observedAttributes:f,attributes:v},y=`<template>
  <div class="forge-scaffold" part="root">
    <slot name="left"></slot>
    <div class="header" part="header">
      <slot name="header"></slot>
    </div>
    <div class="body" part="body">
      <slot name="body-left"></slot>
      <slot name="body-header"></slot>
      <slot name="body"></slot>
      <slot name="body-footer"></slot>
      <slot name="body-right"></slot>
    </div>
    <slot name="footer"></slot>
    <slot name="right"></slot>
  </div>
</template>
`,m=':host{--_scaffold-height: var(--forge-scaffold-height, 100%);--_scaffold-width: var(--forge-scaffold-width, 100%)}:host{display:block;width:var(--_scaffold-width);height:var(--_scaffold-height)}:host([hidden]){display:none}.forge-scaffold{--_scaffold-overflow: var(--forge-scaffold-overflow, initial);--_scaffold-body-position: var(--forge-scaffold-body-position, relative)}.forge-scaffold{position:relative;display:grid;grid-template-areas:"left header right" "left body right" "left footer right";grid-template-rows:auto 1fr auto;grid-template-columns:auto 1fr auto;height:var(--_scaffold-height);width:var(--_scaffold-width);overflow:var(--_scaffold-overflow)}.header{grid-area:header;min-width:0;min-height:0}.body{position:var(--_scaffold-body-position);display:grid;grid-area:body;grid-template-areas:"body-left body-header body-right" "body-left body-inner body-right" "body-left body-footer body-right";grid-template-rows:auto 1fr auto;grid-template-columns:auto 1fr auto;width:var(--_scaffold-width);min-width:0;min-height:0;overflow:var(--_scaffold-overflow)}::slotted(*){min-width:0;min-height:0}::slotted([slot=left]){grid-area:left}::slotted([slot=right]){grid-area:right}::slotted([slot=body-left]){grid-area:body-left}::slotted([slot=body-right]){grid-area:body-right}::slotted([slot=body-header]){grid-area:body-header}::slotted([slot=body]){overflow:auto;grid-area:body-inner}::slotted([slot=body-footer]){grid-area:body-footer}::slotted([slot=footer]){grid-area:footer}::slotted([slot=left]),::slotted([slot=right]),::slotted([slot=body-left]),::slotted([slot=body]),::slotted([slot=body-right]){overflow:auto}:host([viewport]){--_scaffold-height: var(--forge-scaffold-height, 100dvh);--_scaffold-width: var(--forge-scaffold-width, 100dvw)}';var p=Object.getOwnPropertyDescriptor,w=(t,r,a,d)=>{for(var e=d>1?void 0:d?p(r,a):r,s=t.length-1,l;s>=0;s--)(l=t[s])&&(e=l(e)||e);return e};let i=class extends g{static get observedAttributes(){return Object.values(o.observedAttributes)}constructor(){super(),b(this,y,m)}attributeChangedCallback(t,r,a){switch(t){case o.observedAttributes.VIEWPORT:this.viewport=a!==null;break}}get viewport(){return this.hasAttribute(o.attributes.VIEWPORT)}set viewport(t){this.toggleAttribute(o.attributes.VIEWPORT,!!t)}};i=w([n({name:o.elementName})],i);export{i as S};
