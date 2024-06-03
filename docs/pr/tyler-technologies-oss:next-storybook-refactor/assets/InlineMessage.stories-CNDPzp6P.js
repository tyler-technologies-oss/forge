import{x as y}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{C as b,z as _,B as x,A as w,t as E,c as k,g as T,s as z,G as M}from"./constants-CYeMfgsl.js";const S=`${b}inline-message`,O={THEME:"theme"},N={THEME:"info"},r={elementName:S,attributes:O,defaults:N},Q=`<template>
  <div class="forge-inline-message" part="root">
    <slot name="icon"></slot>
    <div class="container" part="container">
      <slot name="title"></slot>
      <slot></slot>
    </div>
  </div>
</template>`,C=':host{display:flex}:host([hidden]){display:none}.forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-info-container-low, #e3edf7));--_inline-message-color: var(--forge-inline-message-color, var(--forge-theme-text-high, rgba(0, 0, 0, .87)));--_inline-message-shape: var(--forge-inline-message-shape, var(--forge-shape-medium, 4px));--_inline-message-padding: var(--forge-inline-message-padding, var(--forge-spacing-small, 12px));--_inline-message-padding-inline: var(--forge-inline-message-padding-inline, var(--_inline-message-padding));--_inline-message-padding-block: var(--forge-inline-message-padding-block, var(--_inline-message-padding));--_inline-message-border-width: var(--forge-inline-message-border-width, var(--forge-border-thin, 1px));--_inline-message-border-style: var(--forge-inline-message-border-style, none);--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-info-container, #c7daf0));--_inline-message-gap: var(--forge-inline-message-gap, var(--forge-spacing-small, 12px));--_inline-message-icon-gap: var(--forge-inline-message-icon-gap, var(--_inline-message-gap));--_inline-message-content-gap: var(--forge-inline-message-content-gap, var(--_inline-message-gap));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-info-container-low, #0b3768))}.forge-inline-message{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);background:var(--_inline-message-background);color:var(--_inline-message-color);border-radius:var(--_inline-message-shape);border-width:var(--_inline-message-border-width);border-style:var(--_inline-message-border-style);border-color:var(--_inline-message-border-color);display:flex;gap:var(--_inline-message-icon-gap);box-sizing:border-box;padding-inline:var(--_inline-message-padding-inline);padding-block:var(--_inline-message-padding-block)}.forge-inline-message .container{display:flex;flex-direction:column;gap:var(--_inline-message-content-gap)}::slotted([slot=title]){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-font-size-scale, .875)));font-weight:var(--forge-typography-heading1-font-weight, 500);line-height:var(--forge-typography-heading1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-heading1-letter-spacing, .0178571429em);text-transform:var(--forge-typography-heading1-text-transform, inherit);text-decoration:var(--forge-typography-heading1-text-decoration, inherit)}::slotted([slot=icon]){color:var(--_inline-message-icon-color)}:host([theme=primary]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-primary-container-low, #e8eaf6));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-primary-container-low, #222c62));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-primary-container, #d1d5ed))}:host([theme=secondary]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-secondary-container, #fff0c3));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-secondary-container, #8a6804));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-secondary, #ffc107))}:host([theme=tertiary]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-tertiary-container-low, #e8ebff));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-tertiary-container-low, #213189));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-tertiary-container, #d0d7ff))}:host([theme=success]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-success-container-low, #e6efe6));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-success-container-low, #19441b));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-success-container, #cde0ce))}:host([theme=warning]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-warning-container-low, #f9e9e0));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-warning-container-low, #712700));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-warning-container, #f4d3c2))}:host(:is([theme=error],[theme=danger])) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-error-container-low, #f6e0e4));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-error-container-low, #5f0011));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-error-container, #ecc2c9))}:host([theme=info-secondary]) .forge-inline-message{--_inline-message-background: var(--forge-inline-message-background, var(--forge-theme-surface-container-low, #ebebeb));--_inline-message-icon-color: var(--forge-inline-message-icon-color, var(--forge-theme-on-surface-container-low, #000000));--_inline-message-border-color: var(--forge-inline-message-border-color, var(--forge-theme-surface-container, #e0e0e0))}';var P=Object.defineProperty,A=Object.getOwnPropertyDescriptor,I=(e,n,t,s)=>{for(var i=s>1?void 0:s?A(n,t):n,g=e.length-1,l;g>=0;g--)(l=e[g])&&(i=(s?l(n,t,i):l(i))||i);return s&&i&&P(n,t,i),i};let d=class extends x{constructor(){super(),w(this,Q,C)}get theme(){return this.getAttribute(r.attributes.THEME)??r.defaults.THEME}set theme(e){E(this,e!==r.defaults.THEME,r.attributes.THEME,e)}};d=I([_({name:r.elementName})],d);const m="forge-inline-message",H={title:"Components/Inline Message",render:e=>{const n=k(m,e);return n.textContent=e.text,n},component:m,parameters:{actions:{disable:!0}},argTypes:{...T({tagName:m,controls:{theme:{control:{type:"select"},options:M}}})},args:{text:"Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation."}},o={},a={...z,render:()=>y`
    <div style="display: flex; gap: 16px; flex-direction: column">
      <forge-inline-message theme="error">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="warning">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="success">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="info-primary">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="info-secondary">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>
  </div>
    `};var c,f,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(p=(f=o.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var v,h,u;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <div style="display: flex; gap: 16px; flex-direction: column">
      <forge-inline-message theme="error">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="warning">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="success">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="info-primary">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>

      <forge-inline-message theme="info-secondary">
        <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
      </forge-inline-message>
  </div>
    \`;
  }
}`,...(u=(h=a.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const D=["Demo","Themed"],G=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,Themed:a,__namedExportsOrder:D,default:H},Symbol.toStringTag,{value:"Module"}));export{o as D,G as I,a as T};
