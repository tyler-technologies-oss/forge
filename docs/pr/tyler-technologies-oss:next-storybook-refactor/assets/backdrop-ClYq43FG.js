import{C as d,v as p,B as m,w as f,x as h,h as c}from"./constants-Ds_Uvk97.js";const _=`${d}backdrop`,b={VISIBLE:"visible",FIXED:"fixed"},g={...b},u={ENTERING:"entering",EXITING:"exiting"},v={ROOT:".forge-backdrop"},i={elementName:_,observedAttributes:b,attributes:g,classes:u,selectors:v},k=`<template>
  <div class="forge-backdrop" part="root"></div>
</template>`,E="@keyframes enter{0%{opacity:0}to{opacity:var(--_backdrop-opacity)}}@keyframes exit{0%{opacity:var(--_backdrop-opacity)}to{opacity:0}}:host{display:contents}:host([hidden]){display:none}.forge-backdrop{--_backdrop-background: var(--forge-backdrop-background, #000);--_backdrop-opacity: var(--forge-backdrop-opacity, .54);--_backdrop-z-index: var(--forge-backdrop-z-index, var(--forge-z-index-backdrop, 7));--_backdrop-enter-animation-duration: var(--forge-backdrop-enter-animation-duration, var(--forge-animation-duration-short4, .2s));--_backdrop-enter-animation-easing: var(--forge-backdrop-enter-animation-easing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_backdrop-exit-animation-duration: var(--forge-backdrop-exit-animation-duration, var(--forge-animation-duration-short1, 50ms));--_backdrop-exit-animation-easing: var(--forge-backdrop-exit-animation-easing, var(--forge-animation-easing-emphasized-accelerate, cubic-bezier(.3, 0, .8, .15)))}.forge-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;contain:content;z-index:var(--_backdrop-z-index);background:var(--_backdrop-background);opacity:0;animation-fill-mode:forwards}:host([fixed]) .forge-backdrop{position:fixed}:host([visible]) .forge-backdrop{opacity:var(--_backdrop-opacity)}:host([visible]) .forge-backdrop.entering{animation-name:enter;animation-duration:var(--_backdrop-enter-animation-duration);animation-timing-function:var(--_backdrop-enter-animation-easing)}:host([visible]) .forge-backdrop.exiting{animation-name:exit;animation-duration:var(--_backdrop-exit-animation-duration);animation-timing-function:var(--_backdrop-exit-animation-easing)}";var x=Object.defineProperty,y=Object.getOwnPropertyDescriptor,I=(t,o,e,r)=>{for(var a=r>1?void 0:r?y(o,e):o,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=(r?s(o,e,a):s(a))||a);return r&&a&&x(o,e,a),a};let l=class extends m{constructor(){super(),this._visible=!1,this._fixed=!1,f(this,k,E),this._rootElement=h(this,i.selectors.ROOT)}static get observedAttributes(){return Object.values(i.observedAttributes)}disconnectedCallback(){this._animationController&&(this._animationController.abort(),this._animationController=void 0),this.classList.remove(i.classes.ENTERING,i.classes.EXITING)}attributeChangedCallback(t,o,e){switch(t){case i.attributes.VISIBLE:this.visible=c(e);break;case i.attributes.FIXED:this.fixed=c(e);break}}async _applyVisibility(t,{animate:o}={animate:!0}){if(this._visible===t)return;if(this._visible=t,!this.isConnected)return this.toggleAttribute(i.attributes.VISIBLE,this._visible),Promise.resolve();if(!o){this.toggleAttribute(i.attributes.VISIBLE,this._visible);return}const e=this._visible,r=e?i.classes.ENTERING:i.classes.EXITING;this._animationController&&(this._animationController.abort(),this._rootElement.classList.remove(i.classes.ENTERING,i.classes.EXITING)),this._animationController=new AbortController;const a=new Promise(n=>{var s;this._rootElement.addEventListener("animationend",()=>{e||this.removeAttribute(i.attributes.VISIBLE),this._rootElement.classList.remove(r),n()},{once:!0,signal:(s=this._animationController)==null?void 0:s.signal})});return e&&this.setAttribute(i.attributes.VISIBLE,""),this._rootElement.classList.add(r),a}show(){this._applyVisibility(!0,{animate:!1})}hide(){this._applyVisibility(!1,{animate:!1})}fadeIn(){return this._applyVisibility(!0)}fadeOut(){return this._applyVisibility(!1)}get visible(){return this._visible}set visible(t){t=!!t,this._visible!==t&&this._applyVisibility(t)}get fixed(){return this._fixed}set fixed(t){t=!!t,this._fixed!==t&&(this._fixed=t,this.toggleAttribute(i.attributes.FIXED,this._fixed))}};l=I([p({name:i.elementName})],l);export{i as B,l as a};