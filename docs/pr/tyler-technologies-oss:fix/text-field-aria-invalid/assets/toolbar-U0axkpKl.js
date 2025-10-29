import{C as b,j as v,B as h,k as c}from"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import{c as g}from"./feature-detection-B-sRDmdg.js";const p=`${b}toolbar`,l={INVERTED:"inverted"},_={...l},o={elementName:p,observedAttributes:l,attributes:_},f=`<template>
  <div class="forge-toolbar" part="root">
    <div class="section" part="before-section-start">
      <slot name="before-start"></slot>
    </div>
    <div class="inner center" part="inner">
      <div class="section" part="section-start">
        <slot name="start"></slot>
        <slot></slot>
      </div>
      <div class="section center" part="section-center">
        <slot name="center"></slot>
      </div>
      <div class="section end" part="section-end">
        <slot name="end"></slot>
      </div>
    </div>
    <div class="section end" part="after-section-end">
      <slot name="after-end"></slot>
    </div>
  </div>
</template>
`,m=":host{display:block}:host([hidden]){display:none}.forge-toolbar{--_toolbar-background: var(--forge-toolbar-background, var(--forge-theme-surface, #ffffff));--_toolbar-height: var(--forge-toolbar-height, 56px);--_toolbar-min-height: var(--forge-toolbar-min-height, var(--_toolbar-height));--_toolbar-divider-width: var(--forge-toolbar-divider-width, var(--forge-border-thin, 1px));--_toolbar-divider-style: var(--forge-toolbar-divider-style, solid);--_toolbar-divider-color: var(--forge-toolbar-divider-color, var(--forge-theme-outline, #e0e0e0));--_toolbar-shape: var(--forge-toolbar-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_toolbar-start-start-shape: var(--forge-toolbar-start-start-shape, var(--_toolbar-shape));--_toolbar-start-end-shape: var(--forge-toolbar-start-end-shape, var(--_toolbar-shape));--_toolbar-end-start-shape: var(--forge-toolbar-end-start-shape, 0);--_toolbar-end-end-shape: var(--forge-toolbar-end-end-shape, 0);--_toolbar-padding: var(--forge-toolbar-padding, var(--forge-spacing-medium, 16px));--_toolbar-padding-block: var(--forge-toolbar-padding-block, 0);--_toolbar-padding-inline: var(--forge-toolbar-padding-inline, var(--_toolbar-padding));--_toolbar-columns: var(--forge-toolbar-columns, auto 1fr auto)}.forge-toolbar{display:grid;grid-template-columns:var(--_toolbar-columns);height:var(--_toolbar-height);min-height:var(--_toolbar-min-height);box-sizing:border-box;padding-inline:0;border-block-end-width:var(--_toolbar-divider-width);border-block-end-style:var(--_toolbar-divider-style);border-block-end-color:var(--_toolbar-divider-color);border-start-start-radius:var(--_toolbar-start-start-shape);border-start-end-radius:var(--_toolbar-start-end-shape);border-end-start-radius:var(--_toolbar-end-start-shape);border-end-end-radius:var(--_toolbar-end-end-shape);background:var(--_toolbar-background)}.inner{display:grid;grid-template-columns:var(--_toolbar-columns);padding-inline:var(--_toolbar-padding-inline);padding-block:var(--_toolbar-padding-block);box-sizing:border-box}.inner.center{min-width:0}.section{display:flex;align-items:center;width:100%;box-sizing:border-box}.section.center{justify-content:center;min-width:0}.section.end{justify-content:end}:host([inverted]) .forge-toolbar{--_toolbar-start-start-shape: var(--forge-toolbar-start-start-shape, 0);--_toolbar-start-end-shape: var(--forge-toolbar-start-end-shape, 0);--_toolbar-end-start-shape: var(--_toolbar-shape);--_toolbar-end-end-shape: var(--_toolbar-shape);border-block-end:none;border-block-start-width:var(--_toolbar-divider-width);border-block-start-style:var(--_toolbar-divider-style);border-block-start-color:var(--_toolbar-divider-color)}:host(:is([no-divider],[no-border])) .forge-toolbar{border:none}:host([no-padding]) .forge-toolbar{--_toolbar-padding: var(--forge-toolbar-padding, 0)}:host([auto-height]) .forge-toolbar{--_toolbar-height: var(--forge-toolbar-height, auto)}::slotted(:is(h1,h2,h3,h4,h5,h6,p)){margin:0}";var u=Object.getOwnPropertyDescriptor,k=(r,e,a,s)=>{for(var t=s>1?void 0:s?u(e,a):e,n=r.length-1,i;n>=0;n--)(i=r[n])&&(t=i(t)||t);return t};let d=class extends h{constructor(){super(),this._inverted=!1,c(this,f,m)}static get observedAttributes(){return Object.values(o.observedAttributes)}attributeChangedCallback(r,e,a){switch(r){case o.observedAttributes.INVERTED:this.inverted=g(a);break}}get inverted(){return this._inverted}set inverted(r){this._inverted!==r&&(this._inverted=r,this.toggleAttribute(o.attributes.INVERTED,this._inverted))}};d=k([v({name:o.elementName})],d);export{d as T};
