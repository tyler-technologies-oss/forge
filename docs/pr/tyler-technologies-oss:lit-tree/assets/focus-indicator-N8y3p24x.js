import{C as m,j as b,B as w,k as y}from"./constants-9n5_0r7k.js";import{B as C,c as u}from"./base-adapter-B6TJxM93.js";import{c as h}from"./feature-detection-DRCh51Sa.js";import"./index-BgGCUUFB.js";const g="forge-aria-controls-placeholder";function U(e,t){const i=e.toLowerCase().indexOf(t.toLowerCase());if(i!==-1){const o=i+t.length,s=document.createElement("span"),n=document.createElement("span");return n.style.fontWeight="bold",n.textContent=e.substring(i,o),s.appendChild(document.createTextNode(e.substring(0,i))),s.appendChild(n),s.appendChild(document.createTextNode(e.substring(o))),s}}function H(e,{capture:t=!0,pointerenter:r=!0,focusin:i=!0}={}){let o;const s=()=>{typeof o=="function"&&o()};return{userInteraction:new Promise(v=>{const f={once:!0,capture:t},l=p=>{i&&e.removeEventListener("focusin",_,f),v(p)},_=p=>{r&&e.removeEventListener("pointerenter",l,f),v(p)};o=()=>{r&&e.removeEventListener("pointerenter",l,f),i&&e.removeEventListener("focusin",_,f)},r&&e.addEventListener("pointerenter",l,f),i&&e.addEventListener("focusin",_,f)}),destroy:s}}function j(e,t){return t===0?0:e/100*t}function W(e,t,r,i=0,o=100){const s=r-t,n=e-t;return!s||!n?i:n*o/s+i}function V(...e){return Math.min(...e.map(t=>t??Number.POSITIVE_INFINITY))}function z(e,t){if(!(e&&t))return!1;const r=e.getBoundingClientRect(),i=t.getBoundingClientRect();return!(r.top>i.bottom||r.right<i.left||r.bottom<i.top||r.left>i.right)}function G({x:e,y:t},r){if(!r)return!1;const{top:i,left:o,bottom:s,right:n}=r.getBoundingClientRect();return e>=o&&e<=n&&t>=i&&t<=s}function E(e,t){let r=null;return t&&(r=L(e,t)),r||e.parentElement}function L(e,t){const r=e.getRootNode();return t===":host"&&r instanceof ShadowRoot?r.host:r.querySelector(`#${t}`)}function $(e,t,r=!0){return r&&t.append(...e.childNodes),e.insertAdjacentElement("beforebegin",t),e.remove(),t}function q(e,t=","){return e.split(t).map(r=>r.trim())}function X(e){const t=window.devicePixelRatio||1;return Math.round(e*t)/t}function Y(){if(document.getElementById(g))return;const t=document.createElement("div");t.id=g,document.body.appendChild(t)}function J(e){const t=document.getElementById(g);t&&e.setAttribute("aria-controls",t.id)}function K(e=0){return new Promise(t=>setTimeout(t,e))}function Q(){return new Promise(e=>requestAnimationFrame(()=>e()))}function Z(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function tt(e){if(typeof e.checkVisibility=="function")return e.checkVisibility();const t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"&&t.visibility!=="collapse"&&t.opacity!=="0"&&t.getPropertyValue("content-visibility")!=="hidden"}class T extends C{constructor(t){super(t),this._targetElement=null}destroy(){this._targetElement=null}hasTargetElement(){return!!this._targetElement}addTargetListener(t,r){var i;(i=this._targetElement)==null||i.addEventListener(t,r)}removeTargetListener(t,r){var i;(i=this._targetElement)==null||i.removeEventListener(t,r)}getTargetElement(){return this._targetElement}setTargetElement(t){this._targetElement=t}trySetTarget(t){this._targetElement=E(this._component,t)}isActive(t,r){const i=r??this._targetElement;return!!(i!=null&&i.matches(t))}}const A=`${m}focus-indicator`,O={TARGET:"target",ACTIVE:"active",INWARD:"inward",CIRCULAR:"circular",ALLOW_FOCUS:"allow-focus",FOCUS_MODE:"focus-mode"},I={...O},F={FOCUS_MODE:"focusin"},a={elementName:A,attributes:I,defaults:F};class k{constructor(t){this._adapter=t,this._target=null,this._active=!1,this._inward=!1,this._circular=!1,this._allowFocus=!1,this._focusMode=a.defaults.FOCUS_MODE,this._interactionListener=r=>this._onInteraction(r)}initialize(){this._adapter.hasTargetElement()||this._adapter.trySetTarget(this._target),this._addListeners()}destroy(){this._removeListeners(),this._adapter.destroy()}_addListeners(){this._adapter.addTargetListener(this._focusMode,this._interactionListener),this._adapter.addTargetListener("focusout",this._interactionListener),this._adapter.addTargetListener("pointerdown",this._interactionListener)}_removeListeners(){this._adapter.removeTargetListener(this._focusMode,this._interactionListener),this._adapter.removeTargetListener("focusout",this._interactionListener),this._adapter.removeTargetListener("pointerdown",this._interactionListener)}_onInteraction(t){const r=t.target;switch(t.type){case this._focusMode:this.active=this._adapter.isActive(this._allowFocus?":focus":":focus-visible",r);break;case"focusout":this.active=!1;break;case"pointerdown":this.active=this._allowFocus?this._adapter.isActive(":focus",r):this._adapter.isActive(":focus-visible",r);break}}get targetElement(){return this._adapter.getTargetElement()}set targetElement(t){this._removeListeners(),this._adapter.setTargetElement(t),this._addListeners()}get target(){return this._adapter.getHostAttribute(a.attributes.TARGET)}set target(t){this._target!==t&&(this._target=t,this._adapter.isConnected&&this._adapter.trySetTarget(t),this._adapter.toggleHostAttribute(a.attributes.TARGET,!!this._target,this._target))}get active(){return this._active}set active(t){t=!!t,this._active!==t&&(this._active=t,this._adapter.toggleHostAttribute(a.attributes.ACTIVE,this._active))}get inward(){return this._inward}set inward(t){t=!!t,this._inward!==t&&(this._inward=t,this._adapter.toggleHostAttribute(a.attributes.INWARD,this._inward))}get circular(){return this._circular}set circular(t){t=!!t,this._circular!==t&&(this._circular=t,this._adapter.toggleHostAttribute(a.attributes.CIRCULAR,this._circular))}get allowFocus(){return this._allowFocus}set allowFocus(t){t=!!t,this._allowFocus!==t&&(this._allowFocus=t,this._adapter.toggleHostAttribute(a.attributes.ALLOW_FOCUS,this._allowFocus))}get focusMode(){return this._focusMode}set focusMode(t){if(t??(t=a.defaults.FOCUS_MODE),this._focusMode!==t){this._adapter.isConnected&&this._removeListeners(),this._focusMode=t,this._adapter.isConnected&&this._addListeners();const r=this._focusMode!==a.defaults.FOCUS_MODE;this._adapter.toggleHostAttribute(a.attributes.FOCUS_MODE,r,this._focusMode)}}}const M=`<template></template>
`,R=":host{--_focus-indicator-display: var(--forge-focus-indicator-display, flex);--_focus-indicator-width: var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));--_focus-indicator-active-width: var(--forge-focus-indicator-active-width, 6px);--_focus-indicator-color: var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));--_focus-indicator-shape: var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));--_focus-indicator-duration: var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, .6s));--_focus-indicator-easing: var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(.2, 0, 0, 1)));--_focus-indicator-shape-start-start: var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));--_focus-indicator-shape-start-end: var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));--_focus-indicator-shape-end-end: var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));--_focus-indicator-shape-end-start: var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));--_focus-indicator-outward-offset: var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));--_focus-indicator-inward-offset: var(--forge-focus-indicator-inward-offset, 0px);--_focus-indicator-offset-block: var(--forge-focus-indicator-offset-block, 0);--_focus-indicator-offset-inline: var(--forge-focus-indicator-offset-inline, 0)}:host{animation-delay:0s,calc(var(--_focus-indicator-duration) * .25);animation-duration:calc(var(--_focus-indicator-duration) * .25),calc(var(--_focus-indicator-duration) * .75);animation-timing-function:var(--_focus-indicator-easing);box-sizing:border-box;color:var(--_focus-indicator-color);display:none;pointer-events:none;position:absolute;margin-block:var(--_focus-indicator-offset-block);margin-inline:var(--_focus-indicator-offset-inline)}:host([hidden]){display:none}:host([active]){display:var(--_focus-indicator-display)}:host(:not([inward])){animation-name:forge-focus-indicator-outward-grow,forge-focus-indicator-outward-shrink;border-end-end-radius:calc(var(--_focus-indicator-shape-end-end) + var(--_focus-indicator-outward-offset));border-end-start-radius:calc(var(--_focus-indicator-shape-end-start) + var(--_focus-indicator-outward-offset));border-start-end-radius:calc(var(--_focus-indicator-shape-start-end) + var(--_focus-indicator-outward-offset));border-start-start-radius:calc(var(--_focus-indicator-shape-start-start) + var(--_focus-indicator-outward-offset));inset:calc(-1 * var(--_focus-indicator-outward-offset));outline:var(--_focus-indicator-width) solid currentColor}:host([inward]){animation-name:forge-focus-indicator-inward-grow,forge-focus-indicator-inward-shrink;border-end-end-radius:calc(var(--_focus-indicator-shape-end-end) - var(--_focus-indicator-inward-offset));border-end-start-radius:calc(var(--_focus-indicator-shape-end-start) - var(--_focus-indicator-inward-offset));border-start-end-radius:calc(var(--_focus-indicator-shape-start-end) - var(--_focus-indicator-inward-offset));border-start-start-radius:calc(var(--_focus-indicator-shape-start-start) - var(--_focus-indicator-inward-offset));border:var(--_focus-indicator-width) solid currentColor;inset:var(--_focus-indicator-inward-offset)}:host([circular]){--_focus-indicator-shape: var(--forge-focus-indicator-shape, 50%)}@keyframes forge-focus-indicator-outward-grow{0%{outline-width:0}to{outline-width:var(--_focus-indicator-active-width)}}@keyframes forge-focus-indicator-outward-shrink{0%{outline-width:var(--_focus-indicator-active-width)}}@keyframes forge-focus-indicator-inward-grow{0%{border-width:0}to{border-width:var(--_focus-indicator-active-width)}}@keyframes forge-focus-indicator-inward-shrink{0%{border-width:var(--_focus-indicator-active-width)}}@media (prefers-reduced-motion){:host{animation:none}}";var S=Object.defineProperty,x=Object.getOwnPropertyDescriptor,d=(e,t,r,i)=>{for(var o=i>1?void 0:i?x(t,r):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(o=(i?n(t,r,o):n(o))||o);return i&&o&&S(t,r,o),o};let c=class extends w{static get observedAttributes(){return Object.values(a.attributes)}constructor(){super(),y(this,M,R),this._core=new k(new T(this))}connectedCallback(){this._core.initialize()}disconnectedCallback(){this._core.destroy()}attributeChangedCallback(e,t,r){switch(e){case a.attributes.TARGET:this.target=r;break;case a.attributes.ACTIVE:this.active=h(r);break;case a.attributes.INWARD:this.inward=h(r);break;case a.attributes.CIRCULAR:this.circular=h(r);break;case a.attributes.ALLOW_FOCUS:this.allowFocus=h(r);break;case a.attributes.FOCUS_MODE:this.focusMode=r;break}}};d([u()],c.prototype,"targetElement",2);d([u()],c.prototype,"target",2);d([u()],c.prototype,"active",2);d([u()],c.prototype,"inward",2);d([u()],c.prototype,"circular",2);d([u()],c.prototype,"allowFocus",2);d([u()],c.prototype,"focusMode",2);c=d([b({name:a.elementName})],c);export{c as F,a,Y as b,q as c,H as d,E as e,Q as f,z as g,tt as h,G as i,Z as j,X as k,L as l,U as m,V as n,W as o,j as p,$ as r,J as s,K as t};
