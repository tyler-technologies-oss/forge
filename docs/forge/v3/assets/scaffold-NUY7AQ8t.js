import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{p as t,t as n,u as r}from"./dist-CPhmYI86.js";import{n as i,t as a}from"./base-component-CGp5CyH9.js";import{n as o,p as s}from"./constants-jVWZdget.js";import{t as c}from"./decorate-2OK4V6AF.js";var l,u,d,f;function p(){return(p=e((()=>{s(),l=`${o}scaffold`,u={VIEWPORT:`viewport`},d={...u},f={elementName:l,observedAttributes:u,attributes:d}})))()}var m;function h(){return(h=e((()=>{m=`<template>
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
`})))()}var g;function _(){return(_=e((()=>{g=`:host{--_scaffold-height:var(--forge-scaffold-height,100%);--_scaffold-width:var(--forge-scaffold-width,100%);width:var(--_scaffold-width);height:var(--_scaffold-height);display:block}:host([hidden]){display:none}.forge-scaffold{--_scaffold-overflow:var(--forge-scaffold-overflow,initial);--_scaffold-body-position:var(--forge-scaffold-body-position,relative);height:var(--_scaffold-height);width:var(--_scaffold-width);overflow:var(--_scaffold-overflow);grid-template:"left header right""left body right"1fr"left footer right"/auto 1fr auto;display:grid;position:relative}.header{grid-area:header;min-width:0;min-height:0}.body{position:var(--_scaffold-body-position);width:var(--_scaffold-width);min-width:0;min-height:0;overflow:var(--_scaffold-overflow);grid-template:"body-left body-header body-right""body-left body-inner body-right"1fr"body-left body-footer body-right"/auto 1fr auto;grid-area:body;display:grid}::slotted(*){min-width:0;min-height:0}::slotted([slot=left]){grid-area:left}::slotted([slot=right]){grid-area:right}::slotted([slot=body-left]){grid-area:body-left}::slotted([slot=body-right]){grid-area:body-right}::slotted([slot=body-header]){grid-area:body-header}::slotted([slot=body]){grid-area:body-inner;overflow:auto}::slotted([slot=body-footer]){grid-area:body-footer}::slotted([slot=footer]){grid-area:footer}::slotted([slot=left]),::slotted([slot=right]),::slotted([slot=body-left]),::slotted([slot=body]),::slotted([slot=body-right]){overflow:auto}:host([viewport]){--_scaffold-height:var(--forge-scaffold-height,100dvh);--_scaffold-width:var(--forge-scaffold-width,100dvw)}`})))()}var v;function y(){return(y=e((()=>{n(),i(),p(),h(),_(),v=class extends a{static get observedAttributes(){return Object.values(f.observedAttributes)}constructor(){super(),t(this,m,g)}attributeChangedCallback(e,t,n){switch(e){case f.observedAttributes.VIEWPORT:this.viewport=n!==null}}get viewport(){return this.hasAttribute(f.attributes.VIEWPORT)}set viewport(e){this.toggleAttribute(f.attributes.VIEWPORT,!!e)}},v=c([r({name:f.elementName})],v)})))()}function b(){return(b=e((()=>{n(),y(),p()})))()}export{v as n,y as r,b as t};