import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-Ci1onliJ.js";import{r as l}from"./dom-C1zFLlWW.js";var u;function d(){return(d=e((()=>{u=`@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
:host {
  display: block;
  --_ai-gradient-container-shape: var(--forge-ai-gradient-container-radius, calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1)));
  --forge-drawer-background: transparent;
  border: calc(var(--forge-shape-small, 2px) * var(--forge-shape-factor, 1)) solid transparent;
  border-radius: var(--_ai-gradient-container-shape);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

::slotted(*) {
  border-radius: var(--_ai-gradient-container-shape);
}

:host(:state(low)) {
  background-image: linear-gradient(var(--forge-theme-surface, #ffffff), var(--forge-theme-surface, #ffffff)), linear-gradient(to top, var(--forge-theme-tertiary-container-low, #e8ebff), var(--forge-theme-outline, #e0e0e0));
}

:host(:state(medium)) {
  background-image: linear-gradient(var(--forge-theme-surface, #ffffff), var(--forge-theme-surface, #ffffff)), linear-gradient(to top, var(--forge-theme-tertiary-container, #d0d7ff), var(--forge-theme-outline, #e0e0e0));
}

:host(:state(high)) {
  background-image: linear-gradient(var(--forge-theme-surface, #ffffff), var(--forge-theme-surface, #ffffff)), linear-gradient(to top, var(--forge-theme-tertiary, #3d5afe), var(--forge-theme-outline, #e0e0e0));
}

:host(:state(disabled)) {
  background-image: linear-gradient(var(--forge-theme-surface, #ffffff), var(--forge-theme-surface, #ffffff)), linear-gradient(to top, var(--forge-theme-text-low, rgba(0, 0, 0, 0.38)), var(--forge-theme-text-low, rgba(0, 0, 0, 0.38)));
}`})))()}var f,p;function m(){return(m=e((()=>{d(),i(),c(),f=`forge-ai-gradient-container`,p=class extends r{static{this.styles=n(u)}#e;constructor(){super(),this.variant=`medium`,this.#e=this.attachInternals(),this.#t()}willUpdate(e){e.has(`variant`)&&this.#t()}#t(){l(this.#e,`low`,this.variant===`low`),l(this.#e,`medium`,this.variant===`medium`),l(this.#e,`high`,this.variant===`high`),l(this.#e,`disabled`,this.variant===`disabled`)}render(){return t`<slot></slot>`}},a([o({type:String,attribute:`variant`})],p.prototype,`variant`,void 0),p=a([s(f)],p)})))()}export{m as t};