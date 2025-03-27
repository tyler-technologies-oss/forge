import{C as p,j as f,B as c,k as h,l as d}from"./constants-DHnR0122.js";import{c as n}from"./feature-detection-C61kIZu7.js";import"./index-CiLSBptl.js";import{F as m}from"./focus-indicator-B_9E-jM6.js";import{S as u}from"./state-layer-DA2sYK0k.js";const v=`${p}skip-link`,g={TARGET:"target",THEME:"theme",MUTED:"muted",PERSISTENT:"persistent",INLINE:"inline",SKIP_URL_CHANGE:"skip-url-change"},_={...g},b={ANCHOR:"a"},e={elementName:v,observedAttributes:g,attributes:_,selectors:b},y=`<template>
  <a class="forge-skip-link" part="anchor">
    <slot>Skip to main content</slot>
    <forge-focus-indicator part="focus-indicator"></forge-focus-indicator>
    <forge-state-layer exportparts="surface:state-layer"></forge-state-layer>
  </a>
</template>
`,x=':host{--_skip-link-inset: var(--forge-skip-link-inset, var(--forge-spacing-xsmall, 8px) var(--forge-spacing-medium, 16px));--_skip-link-z-index: var(--forge-skip-link-z-index, var(--forge-z-index-popup, 10));--_skip-link-transition-duration: var(--forge-skip-link-transition-duration, var(--forge-animation-duration-short4, .2s));--_skip-link-transition-timing-function: var(--forge-skip-link-transition-timing-function, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)))}:host{transition-property:opacity,transform;transition-duration:var(--_skip-link-transition-duration);transition-timing-function:var(--_skip-link-transition-timing-function);display:block;position:fixed;inset:var(--_skip-link-inset);z-index:var(--_skip-link-z-index);block-size:fit-content;inline-size:fit-content;opacity:0;transform:translateY(-100%)}:host([hidden]){display:none}:host(:where(:focus-within,[persistent])){transition-property:opacity,transform;transition-duration:var(--_skip-link-transition-duration);transition-timing-function:var(--_skip-link-transition-timing-function);transform:translateY(0);opacity:1}.forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-secondary, #ffc107));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-secondary, #000000));--_skip-link-shape: var(--forge-skip-link-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_skip-link-elevation: var(--forge-skip-link-elevation, 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12));--_skip-link-padding-block: var(--forge-skip-link-padding-block, var(--forge-spacing-xsmall, 8px));--_skip-link-padding-inline: var(--forge-skip-link-padding-inline, var(--forge-spacing-medium, 16px));--_skip-link-focus-indicator-color: var(--forge-skip-link-focus-indicator-color, var(--_skip-link-background))}.forge-skip-link{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);display:block;outline:none;box-shadow:var(--_skip-link-elevation);border-radius:var(--_skip-link-shape);background:var(--_skip-link-background);padding-block:var(--_skip-link-padding-block);padding-inline:var(--_skip-link-padding-inline);cursor:pointer;color:var(--_skip-link-color);text-decoration:underline}:host([theme=primary]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-primary, #3f51b5));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-primary, #ffffff))}:host([theme=primary][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-primary-container-high, #b6bde3));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-primary-container-high, #000000))}:host([theme=secondary]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-secondary, #ffc107));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-secondary, #000000))}:host([theme=secondary][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-secondary-container-high, #ffe7a1));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-secondary-container-high, #000000))}:host([theme=tertiary]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-tertiary, #3d5afe));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-tertiary, #ffffff))}:host([theme=tertiary][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-tertiary-container-high, #b5c0ff));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-tertiary-container-high, #000000))}:host([theme=success]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-success, #2e7d32));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-success, #ffffff))}:host([theme=success][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-success-container-high, #b0ceb1));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-success-container-high, #000000))}:host([theme=error]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-error, #b00020));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-error, #ffffff))}:host([theme=error][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-error-container-high, #e19eaa));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-error-container-high, #000000))}:host([theme=warning]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-warning, #d14900));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-warning, #ffffff))}:host([theme=warning][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-warning-container-high, #eeba9e));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-warning-container-high, #000000))}:host([theme=info]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-info, #1565c0));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-info, #ffffff))}:host([theme=info][muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-info-container-high, #a6c4e7));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-info-container-high, #000000))}:host(:where(:not([theme]),[theme=default])[muted]) .forge-skip-link{--_skip-link-background: var(--forge-skip-link-background, var(--forge-theme-secondary-container-high, #ffe7a1));--_skip-link-color: var(--forge-skip-link-color, var(--forge-theme-on-secondary-container-high, #000000))}:host([inline]){position:absolute;transform:none}forge-focus-indicator{--forge-focus-indicator-color: var(--_skip-link-focus-indicator-color);--forge-focus-indicator-shape: var(--_skip-link-shape)}@media (prefers-reduced-motion: reduce){:host{--_skip-link-transition-duration: var(--forge-skip-link-transition-duration, 0s)}}';var E=Object.getOwnPropertyDescriptor,C=(i,r,t,a)=>{for(var o=a>1?void 0:a?E(r,t):r,s=i.length-1,k;s>=0;s--)(k=i[s])&&(o=k(o)||o);return o};let l=class extends c{constructor(){super(),this._target="",this._theme="default",this._muted=!1,this._persistent=!1,this._inline=!1,this._skipUrlChange=!1,this._clickListener=i=>this._handleClick(i),h(this,y,x),this._anchorElement=d(this,e.selectors.ANCHOR)}static get observedAttributes(){return Object.values(e.observedAttributes)}attributeChangedCallback(i,r,t){switch(i){case e.observedAttributes.TARGET:this.target=t;break;case e.observedAttributes.THEME:this.theme=t;break;case e.observedAttributes.MUTED:this.muted=n(t);break;case e.observedAttributes.PERSISTENT:this.persistent=n(t);break;case e.observedAttributes.INLINE:this.inline=n(t);break;case e.observedAttributes.SKIP_URL_CHANGE:this.skipUrlChange=n(t);break}}get target(){return this._target}set target(i){this._target!==i&&(this._target=i,this.setAttribute(e.attributes.TARGET,this._target),this._anchorElement.href=`#${this._target}`)}get theme(){return this._theme}set theme(i){this._theme!==i&&(this._theme=i,this.setAttribute(e.attributes.THEME,this._theme))}get muted(){return this._muted}set muted(i){this._muted!==i&&(this._muted=i,this.toggleAttribute(e.attributes.MUTED,this._muted))}get persistent(){return this._persistent}set persistent(i){this._persistent!==i&&(this._persistent=i,this.toggleAttribute(e.attributes.PERSISTENT,this._persistent))}get inline(){return this._inline}set inline(i){this._inline!==i&&(this._inline=i,this.toggleAttribute(e.attributes.INLINE,this._inline))}get skipUrlChange(){return this._skipUrlChange}set skipUrlChange(i){if(this._skipUrlChange!==i){if(this._skipUrlChange=i,this.toggleAttribute(e.attributes.SKIP_URL_CHANGE,this._skipUrlChange),this._skipUrlChange){this._anchorElement.addEventListener("click",this._clickListener);return}this._anchorElement.removeEventListener("click",this._clickListener)}}_handleClick(i){i.preventDefault();const r=document.getElementById(this._target);r==null||r.focus(),r==null||r.scrollIntoView({behavior:"smooth"})}};l=C([f({name:e.elementName,dependencies:[m,u]})],l);
