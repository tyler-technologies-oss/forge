import{C as v,j as c,B as h,k as g}from"./constants-9n5_0r7k.js";import{c as p}from"./feature-detection-DRCh51Sa.js";const _=`${v}toolbar`,l={INVERTED:"inverted"},f={...l},b={TOOLBAR:"forge-toolbar"},m={TOOLBAR:`.${b.TOOLBAR}`,BEFORE_START:"slot[name=before-start]",START_SLOT:"slot[name=start]",CENTER_SLOT:"slot[name=center]",END_SLOT:"slot[name=end]",AFTER_END:"slot[name=after-end]"},s={elementName:_,observedAttributes:l,attributes:f,classes:b,selectors:m},u=`<template>
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
`,T=":host{display:block}:host([hidden]){display:none}.forge-toolbar{--_toolbar-background: var(--forge-toolbar-background, var(--forge-theme-surface, #ffffff));--_toolbar-height: var(--forge-toolbar-height, 56px);--_toolbar-min-height: var(--forge-toolbar-min-height, var(--_toolbar-height));--_toolbar-divider-width: var(--forge-toolbar-divider-width, var(--forge-border-thin, 1px));--_toolbar-divider-style: var(--forge-toolbar-divider-style, solid);--_toolbar-divider-color: var(--forge-toolbar-divider-color, var(--forge-theme-outline, #e0e0e0));--_toolbar-shape: var(--forge-toolbar-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_toolbar-start-start-shape: var(--forge-toolbar-start-start-shape, var(--_toolbar-shape));--_toolbar-start-end-shape: var(--forge-toolbar-start-end-shape, var(--_toolbar-shape));--_toolbar-end-start-shape: var(--forge-toolbar-end-start-shape, 0);--_toolbar-end-end-shape: var(--forge-toolbar-end-end-shape, 0);--_toolbar-padding: var(--forge-toolbar-padding, var(--forge-spacing-medium, 16px));--_toolbar-padding-block: var(--forge-toolbar-padding-block, 0);--_toolbar-padding-inline: var(--forge-toolbar-padding-inline, var(--_toolbar-padding));--_toolbar-columns: var(--forge-toolbar-columns, auto 1fr auto)}.forge-toolbar{display:grid;grid-template-columns:var(--_toolbar-columns);height:var(--_toolbar-height);min-height:var(--_toolbar-min-height);box-sizing:border-box;padding-inline:0;border-block-end-width:var(--_toolbar-divider-width);border-block-end-style:var(--_toolbar-divider-style);border-block-end-color:var(--_toolbar-divider-color);border-start-start-radius:var(--_toolbar-start-start-shape);border-start-end-radius:var(--_toolbar-start-end-shape);border-end-start-radius:var(--_toolbar-end-start-shape);border-end-end-radius:var(--_toolbar-end-end-shape);background:var(--_toolbar-background)}.inner{display:grid;grid-template-columns:var(--_toolbar-columns);padding-inline:var(--_toolbar-padding-inline);padding-block:var(--_toolbar-padding-block);box-sizing:border-box}.section{display:flex;align-items:center;width:100%;box-sizing:border-box}.section.center{justify-content:center}.section.end{justify-content:end}:host([inverted]) .forge-toolbar{--_toolbar-start-start-shape: var(--forge-toolbar-start-start-shape, 0);--_toolbar-start-end-shape: var(--forge-toolbar-start-end-shape, 0);--_toolbar-end-start-shape: var(--_toolbar-shape);--_toolbar-end-end-shape: var(--_toolbar-shape);border-block-end:none;border-block-start-width:var(--_toolbar-divider-width);border-block-start-style:var(--_toolbar-divider-style);border-block-start-color:var(--_toolbar-divider-color)}:host(:is([no-divider],[no-border])) .forge-toolbar{border:none}:host([no-padding]) .forge-toolbar{--_toolbar-padding: var(--forge-toolbar-padding, 0)}:host([auto-height]) .forge-toolbar{--_toolbar-height: var(--forge-toolbar-height, auto)}::slotted(:is(h1,h2,h3,h4,h5,h6,p)){margin:0}";var O=Object.defineProperty,E=Object.getOwnPropertyDescriptor,k=(o,t,e,a)=>{for(var r=a>1?void 0:a?E(t,e):t,n=o.length-1,d;n>=0;n--)(d=o[n])&&(r=(a?d(t,e,r):d(r))||r);return a&&r&&O(t,e,r),r};let i=class extends h{constructor(){super(),this._inverted=!1,g(this,u,T)}static get observedAttributes(){return Object.values(s.observedAttributes)}attributeChangedCallback(o,t,e){switch(o){case s.observedAttributes.INVERTED:this.inverted=p(e);break}}get inverted(){return this._inverted}set inverted(o){this._inverted!==o&&(this._inverted=o,this.toggleAttribute(s.attributes.INVERTED,this._inverted))}};i=k([c({name:s.elementName})],i);export{i as T};
