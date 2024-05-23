import{x as O}from"./lit-element-Dm2J4qPi.js";import{C as R,m as w,n as f,r as L,o as N,p as P,F as p,b as B,B as D,d as F,q as M,c as z,g as W,s as k,I as j,u as X}from"./base-button-adapter-BOzk34V1.js";import"./icon-button-B3iH2T6a.js";const G=`${R}avatar`,$={IMAGE_URL:"image-url",TEXT:"text",LETTER_COUNT:"letter-count"},H={DEFAULT_LETTER_COUNT:2},q={ROOT:".forge-avatar",DEFAULT_SLOT:".forge-avatar > slot:not([name])"},K={BACKGROUND_VARNAME:"--forge-avatar-background"},a={elementName:G,attributes:$,numbers:H,selectors:q,strings:K};class V extends w{constructor(t){super(t),this._root=f(this._component,a.selectors.ROOT),this._defaultSlot=f(this._component,a.selectors.DEFAULT_SLOT)}async setBackgroundImageUrl(t){return this._root.classList.add("forge-avatar--image"),new Promise(e=>{const r=new Image;r.onload=()=>{this._root.style.backgroundImage=`url(${r.src})`,e(!0)},r.onerror=()=>{this._root.classList.remove("forge-avatar--image"),e(!1)},r.src=t})}removeBackgroundImage(){this._root.style.removeProperty("background-image"),this._root.classList.remove("forge-avatar--image")}setText(t){this._defaultSlot.textContent=t}clearText(){L(this._defaultSlot)}}class J{constructor(t){this._adapter=t,this._text="",this._letterCount=a.numbers.DEFAULT_LETTER_COUNT,this._initialized=!1}initialize(){this._render(),this._initialized=!0}disconnect(){this._initialized=!1}_render(){this._setText(),this._setBackgroundImageUrl()}async _setBackgroundImageUrl(){this._imageUrl?await this._adapter.setBackgroundImageUrl(this._imageUrl)&&this._adapter.clearText():this._adapter.removeBackgroundImage()}_setText(){const t=this._getTextContent(this._text,this._letterCount);t?this._adapter.setText(t):this._adapter.clearText()}_getTextContent(t,e){if(!t||!N(t)||e<=0)return"";let r;return e===1?r=t[0].toUpperCase():r=(t.match(/\S+/g)||[]).slice(0,e).reduce((n,i)=>n+=i[0].toUpperCase(),""),r}get text(){return this._text}set text(t){this._text!==t&&(this._text=t||"",this._adapter.setHostAttribute(a.attributes.TEXT,this._text),this._initialized&&this._render())}get letterCount(){return this._letterCount}set letterCount(t){this._letterCount!==t&&(this._letterCount=t,this._adapter.setHostAttribute(a.attributes.LETTER_COUNT,P(this._letterCount)?this._letterCount.toString():""),this._initialized&&this._render())}get imageUrl(){return this._imageUrl}set imageUrl(t){this._imageUrl!==t&&(this._imageUrl=t,this._initialized&&this._render())}}const Q=`<template>
  <div class="forge-avatar" aria-hidden="true" part="root">
    <slot></slot>
  </div>
</template>`,Y=':host{contain:content;display:inline-block}:host([hidden]){display:none}.forge-avatar{--_avatar-size: var(--forge-avatar-size, 40px);--_avatar-background: var(--forge-avatar-background, var(--forge-theme-tertiary, #3d5afe));--_avatar-color: var(--forge-avatar-color, var(--forge-theme-on-tertiary, #ffffff));--_avatar-transition-duration: var(--forge-avatar-transition-duration, var(--forge-animation-duration-short4, .2s));--_avatar-transition-timing: var(--forge-avatar-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_avatar-shape: var(--forge-avatar-shape, var(--forge-shape-round, 50%))}.forge-avatar{display:flex;align-items:center;justify-content:center;overflow:hidden;transition:height var(--_avatar-transition-duration) var(--_avatar-transition-timing),width var(--_avatar-transition-duration) var(--_avatar-transition-timing);border-radius:var(--_avatar-shape);box-sizing:border-box;width:var(--_avatar-size);height:var(--_avatar-size);background-color:var(--_avatar-background);background-position:center;background-repeat:no-repeat;background-size:cover;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-subheading2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-subheading2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-font-size-scale, 1)));font-weight:var(--forge-typography-subheading2-font-weight, 400);line-height:var(--forge-typography-subheading2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-subheading2-letter-spacing, normal);text-transform:var(--forge-typography-subheading2-text-transform, inherit);text-decoration:var(--forge-typography-subheading2-text-decoration, inherit);color:var(--_avatar-color)}.forge-avatar--image{background-color:inherit}';var Z=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,u=(o,t,e,r)=>{for(var s=r>1?void 0:r?tt(t,e):t,n=o.length-1,i;n>=0;n--)(i=o[n])&&(s=(r?i(t,e,s):i(s))||s);return r&&s&&Z(t,e,s),s};let h=class extends D{static get observedAttributes(){return[a.attributes.TEXT,a.attributes.LETTER_COUNT,a.attributes.IMAGE_URL]}constructor(){super(),F(this,Q,Y),this._foundation=new J(new V(this))}connectedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(o,t,e){switch(o){case a.attributes.TEXT:this.text=e;break;case a.attributes.LETTER_COUNT:this.letterCount=M(e);break;case a.attributes.IMAGE_URL:this.imageUrl=e;break}}};u([p()],h.prototype,"text",2);u([p()],h.prototype,"letterCount",2);u([p()],h.prototype,"imageUrl",2);h=u([B({name:a.elementName})],h);const m="forge-avatar",et={title:"Components/Avatar",render:o=>z(m,o),component:m,parameters:{actions:{disable:!0}},argTypes:{...W({tagName:m})},args:{text:"Tyler Forge",letterCount:2}},c={},rt="https://cdn.forge.tylertech.com/v1/icons/svg/custom/forge_logo.svg",g={parameters:{controls:{disable:!0}},args:{imageUrl:rt}},l={...k,render:()=>(j.define(X),O`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},d={...k,render:o=>O`
      <forge-icon-button aria-label="Icon button with avatar">
        ${z(m,o)}
      </forge-icon-button>
    `};var _,v,b;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:"{}",...(b=(v=c.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var y,T,C;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    imageUrl
  }
}`,...(C=(T=g.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var x,E,U;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconPerson);
    return html\`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    \`;
  }
}`,...(U=(E=l.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var A,I,S;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\`
      <forge-icon-button aria-label="Icon button with avatar">
        \${customElementStoryRenderer(component, args)}
      </forge-icon-button>
    \`;
  }
}`,...(S=(I=d.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};const at=["Demo","WithImage","WithIcon","WithIconButton"],it=Object.freeze(Object.defineProperty({__proto__:null,Demo:c,WithIcon:l,WithIconButton:d,WithImage:g,__namedExportsOrder:at,default:et},Symbol.toStringTag,{value:"Module"}));export{it as A,c as D,l as W,g as a,d as b};
