import{C as l,n as h,B as g,o as k}from"./constants-BMnwgo1j.js";const v=`${l}skeleton`,p={elementName:v},_=`<template>
  <div class="forge-skeleton" part="root"></div>
</template>
`,f='@keyframes loading{25%,to{transform:translate(100%)}}:host{--_skeleton-animation-duration: var(--forge-skeleton-animation-duration, 1.5s);--_skeleton-width: var(--forge-skeleton-width, auto);--_skeleton-height: var(--forge-skeleton-height, 48px);--_skeleton-background: var(--forge-skeleton-background, var(--forge-theme-surface-container, #e0e0e0));--_skeleton-shape: var(--forge-skeleton-shape, var(--forge-shape-medium, 4px));--_skeleton-margin: var(--forge-skeleton-margin, var(--forge-spacing-medium, 16px) 0);--_skeleton-button-height: var(--forge-skeleton-button-height, var(--forge-button-height, 36px));--_skeleton-button-width: var(--forge-skeleton-button-width, 72px);--_skeleton-form-field-height: var(--forge-skeleton-form-field-height, 40px);--_skeleton-form-field-width: var(--forge-skeleton-form-field-width, 256px);--_skeleton-chip-height: var(--forge-skeleton-chip-height, 32px);--_skeleton-chip-width: var(--forge-skeleton-chip-width, 72px);--_skeleton-chip-shape: var(--forge-skeleton-chip-shape, var(--forge-shape-extra-large, 16px));--_skeleton-list-item-height: var(--forge-skeleton-list-item-height, 32px);--_skeleton-list-item-margin: var(--forge-skeleton-list-item-margin, 12px 8px);--_skeleton-text-height: var(--forge-skeleton-text-height, 1rem);--_skeleton-gradient-color: var(--forge-skeleton-gradient-color, var(--forge-theme-surface-container-low, #ebebeb));--_skeleton-avatar-size: var(--forge-skeleton-avatar-size, var(--forge-avatar-size, 40px));--_skeleton-avatar-shape: var(--forge-skeleton-avatar-shape, var(--forge-avatar-shape, var(--forge-shape-round, 50%)))}:host{height:var(--_skeleton-height);width:var(--_skeleton-width);margin:var(--_skeleton-margin);border-radius:var(--_skeleton-shape);background-color:var(--_skeleton-background);position:relative;display:block;overflow:hidden;box-sizing:border-box}:host([hidden]){display:none}.forge-skeleton{display:block}.forge-skeleton:after{position:absolute;display:block;width:100%;height:100%;transform:translate(-100%);background-repeat:no-repeat;background-image:linear-gradient(90deg,transparent,var(--_skeleton-gradient-color),transparent);animation:loading var(--_skeleton-animation-duration) ease-in infinite;content:""}:host([avatar]){--_skeleton-height: var(--_skeleton-avatar-size);--_skeleton-width: var(--_skeleton-avatar-size);--_skeleton-shape: var(--_skeleton-avatar-shape)}:host([list-item]){--_skeleton-height: var(--_skeleton-list-item-height);--_skeleton-margin: var(--_skeleton-list-item-margin)}:host([text]){--_skeleton-height: var(--_skeleton-text-height)}:host([stretch]){height:100%;width:100%}:host([chip]){--_skeleton-height: var(--_skeleton-chip-height);--_skeleton-width: var(--_skeleton-chip-width);--_skeleton-shape: var(--_skeleton-chip-shape)}:host([button]){--_skeleton-height: var(--_skeleton-button-height);--_skeleton-width: var(--_skeleton-button-width)}:host([form-field]){--_skeleton-height: var(--_skeleton-form-field-height);--_skeleton-width: var(--_skeleton-form-field-width)}';var d=Object.defineProperty,m=Object.getOwnPropertyDescriptor,c=(s,t,a,o)=>{for(var e=o>1?void 0:o?m(t,a):t,r=s.length-1,n;r>=0;r--)(n=s[r])&&(e=(o?n(t,a,e):n(e))||e);return o&&e&&d(t,a,e),e};let i=class extends g{constructor(){super(),k(this,_,f)}};i=c([h({name:p.elementName})],i);export{p as S,i as a};
