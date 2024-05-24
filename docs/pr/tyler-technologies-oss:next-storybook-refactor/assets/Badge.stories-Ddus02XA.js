import{x as h}from"./lit-element-Dm2J4qPi.js";import{C as I,a as P,B as z,b as N,c as A,d as D,s as m,I as H,t as B,G as M}from"./base-button-adapter-BUuYOIy2.js";import"./icon-button-D0se3X1T.js";const C=`${I}badge`,R={DOT:"dot",HIDE:"hide",THEME:"theme",STRONG:"strong"},W={OPEN:"open"},G={ROOT:".forge-badge"},j={THEME:"default"},r={elementName:C,attributes:R,selectors:G,classes:W,defaults:j},L=`<template>\r
  <div class="forge-badge" part="root">\r
    <slot name="start"></slot>\r
    <div class="content" part="content">\r
      <slot></slot>\r
    </div>\r
    <slot name="end"></slot>\r
  </div>\r
</template>`,F=':host{display:flex;box-sizing:border-box}:host([hidden]){display:none}.forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-secondary, #ffc107));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-secondary, #000000));--_badge-shape: var(--forge-badge-shape, var(--forge-shape-full, 9999px));--_badge-height: var(--forge-badge-height, 20px);--_badge-min-width: var(--forge-badge-min-width, 0);--_badge-max-width: var(--forge-badge-max-width, auto);--_badge-padding-inline: var(--forge-badge-padding-inline, var(--forge-spacing-xsmall, 8px));--_badge-padding-block: var(--forge-badge-padding-block, 0);--_badge-border-width: var(--forge-badge-border-width, var(--forge-border-thin, 1px));--_badge-border-style: var(--forge-badge-border-style, none);--_badge-border-color: var(--forge-badge-border-color, var(--_badge-color));--_badge-gap: var(--forge-badge-gap, var(--forge-spacing-xsmall, 8px));--_badge-font-weight: var(--forge-badge-font-weight, bold);--_badge-dot-size: var(--forge-badge-dot-size, 8px);--_badge-dot-height: var(--forge-badge-dot-height, var(--_badge-dot-size));--_badge-dot-width: var(--forge-badge-dot-width, var(--_badge-dot-size));--_badge-dot-padding: var(--forge-badge-dot-padding, 0);--_badge-transition-duration: var(--forge-badge-transition-duration, var(--forge-animation-duration-short4, .2s));--_badge-transition-easing: var(--forge-badge-transition-easing, var(--forge-animation-easing-decelerate, cubic-bezier(0, 0, 0, 1)))}.forge-badge{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit);background:var(--_badge-background);color:var(--_badge-color);height:var(--_badge-height);min-width:var(--_badge-min-width);max-width:var(--_badge-max-width);border-width:var(--_badge-border-width);border-style:var(--_badge-border-style);border-color:var(--_badge-border-color);display:inline-flex;align-items:center;gap:var(--_badge-gap);border-radius:var(--_badge-shape);padding-inline:var(--_badge-padding-inline);padding-block:var(--_badge-padding-block);overflow:hidden;box-sizing:border-box;pointer-events:none;transition:transform var(--_badge-transition-duration) var(--_badge-transition-easing);font-weight:var(--_badge-font-weight);text-overflow:ellipsis;white-space:nowrap}.forge-badge .content{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}::slotted(:is([slot=start],[slot=end])){font-size:inherit}:host([hide]) .forge-badge{transform:scale(0)}:host([dot]) .forge-badge{--_badge-height: var(--_badge-dot-height);--_badge-min-width: var(--forge-badge-min-width, auto);padding:var(--_badge-dot-padding);width:var(--_badge-dot-width)}:host([dot]) .forge-badge>slot{display:none}:host([theme=primary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-primary-container, #d1d5ed));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-primary-container, #222c62))}:host([strong][theme=primary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-primary, #3f51b5));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-primary, #ffffff))}:host([theme=secondary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-secondary-container, #fff0c3));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-secondary-container, #8a6804))}:host([strong][theme=secondary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-secondary, #ffc107));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-secondary, #000000))}:host([theme=tertiary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-tertiary-container, #d0d7ff));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-tertiary-container, #213189))}:host([strong][theme=tertiary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-tertiary, #3d5afe));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-tertiary, #ffffff))}:host([theme=success]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-success-container, #cde0ce));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-success-container, #19441b))}:host([strong][theme=success]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-success, #2e7d32));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-success, #ffffff))}:host([theme=warning]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-warning-container, #f4d3c2));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-warning-container, #712700))}:host([strong][theme=warning]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-warning, #d14900));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-warning, #ffffff))}:host(:not([strong]):is([theme=error],[theme=danger])) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-error-container, #ecc2c9));--_badge-color: var(--forge-badge-color, var(--forge-theme-error, #b00020))}:host([strong]:is([theme=error],[theme=danger])) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-error, #b00020));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-error, #ffffff))}:host(:not([strong]):is([theme=info],[theme=info-primary])) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-info-container, #c7daf0));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-info-container, #0b3768))}:host([strong]:is([theme=info],[theme=info-primary])) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-info, #1565c0));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-info, #ffffff))}:host(:not([strong])[theme=info-secondary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-surface-container-low, #ebebeb));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-surface-container-low, #000000))}:host([strong][theme=info-secondary]) .forge-badge{--_badge-background: var(--forge-badge-background, var(--forge-theme-surface-inverse, #333333));--_badge-color: var(--forge-badge-color, var(--forge-theme-on-surface-inverse, #ffffff))}';var X=Object.defineProperty,$=Object.getOwnPropertyDescriptor,q=(e,o,f,s)=>{for(var a=s>1?void 0:s?$(o,f):o,b=e.length-1,i;b>=0;b--)(i=e[b])&&(a=(s?i(o,f,a):i(a))||a);return s&&a&&X(o,f,a),a};let l=class extends z{constructor(){super(),N(this,L,F)}get dot(){return this.hasAttribute(r.attributes.DOT)}set dot(e){this.toggleAttribute(r.attributes.DOT,e)}get theme(){return this.getAttribute(r.attributes.THEME)??r.defaults.THEME}set theme(e){this.setAttribute(r.attributes.THEME,e)}get strong(){return this.hasAttribute(r.attributes.STRONG)}set strong(e){this.toggleAttribute(r.attributes.STRONG,e)}get hide(){return this.hasAttribute(r.attributes.HIDE)}set hide(e){this.hasAttribute(r.attributes.HIDE)!==e&&this.toggleAttribute(r.attributes.HIDE,e)}};l=q([P({name:r.elementName})],l);const c="forge-badge",J={title:"Components/Badge",render:e=>{const o=A(c,e);return o.innerHTML=e.text,o},component:c,parameters:{actions:{disable:!0}},argTypes:{...D({tagName:c,controls:{theme:{control:"select",options:["default",...M,"info-primary","info-secondary"]}}})},args:{text:"Status"}},g={},t={...m,render:()=>h`
    <div style="display: flex; gap: 8px;">
      <forge-badge theme="default">default</forge-badge>
      <forge-badge theme="primary">Primary</forge-badge>
      <forge-badge theme="secondary">Secondary</forge-badge>
      <forge-badge theme="tertiary">Tertiary</forge-badge>
      <forge-badge theme="success">Success</forge-badge>
      <forge-badge theme="error">Error</forge-badge>
      <forge-badge theme="warning">Warning</forge-badge>
      <forge-badge theme="info">Info</forge-badge>
      <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    `},n={...m,args:{strong:!0},render:()=>h`
    <div style="display: flex; gap: 8px;">
      <forge-badge strong theme="default">default</forge-badge>
      <forge-badge strong theme="primary">Primary</forge-badge>
      <forge-badge strong theme="secondary">Secondary</forge-badge>
      <forge-badge strong theme="tertiary">Tertiary</forge-badge>
      <forge-badge strong theme="success">Success</forge-badge>
      <forge-badge strong theme="error">Error</forge-badge>
      <forge-badge strong theme="warning">Warning</forge-badge>
      <forge-badge strong theme="info">Info</forge-badge>
      <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    `},d={...m,render:()=>(H.define(B),h`
    <forge-icon-button>
      <forge-icon name="notifications" style="position: absolute;"></forge-icon>
      <forge-badge slot="badge">1</forge-badge>
    </forge-icon-button>
    `)};var v,u,p;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(p=(u=g.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var y,_,w;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <div style="display: flex; gap: 8px;">
      <forge-badge theme="default">default</forge-badge>
      <forge-badge theme="primary">Primary</forge-badge>
      <forge-badge theme="secondary">Secondary</forge-badge>
      <forge-badge theme="tertiary">Tertiary</forge-badge>
      <forge-badge theme="success">Success</forge-badge>
      <forge-badge theme="error">Error</forge-badge>
      <forge-badge theme="warning">Warning</forge-badge>
      <forge-badge theme="info">Info</forge-badge>
      <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    \`;
  }
}`,...(w=(_=t.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var x,k,S;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    strong: true
  },
  render: () => {
    return html\`
    <div style="display: flex; gap: 8px;">
      <forge-badge strong theme="default">default</forge-badge>
      <forge-badge strong theme="primary">Primary</forge-badge>
      <forge-badge strong theme="secondary">Secondary</forge-badge>
      <forge-badge strong theme="tertiary">Tertiary</forge-badge>
      <forge-badge strong theme="success">Success</forge-badge>
      <forge-badge strong theme="error">Error</forge-badge>
      <forge-badge strong theme="warning">Warning</forge-badge>
      <forge-badge strong theme="info">Info</forge-badge>
      <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    \`;
  }
}`,...(S=(k=n.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var E,T,O;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html\`
    <forge-icon-button>
      <forge-icon name="notifications" style="position: absolute;"></forge-icon>
      <forge-badge slot="badge">1</forge-badge>
    </forge-icon-button>
    \`;
  }
}`,...(O=(T=d.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};const K=["Demo","Themed","Strong","WithIconButton"],Y=Object.freeze(Object.defineProperty({__proto__:null,Demo:g,Strong:n,Themed:t,WithIconButton:d,__namedExportsOrder:K,default:J},Symbol.toStringTag,{value:"Module"}));export{Y as B,g as D,n as S,t as T,d as W};
