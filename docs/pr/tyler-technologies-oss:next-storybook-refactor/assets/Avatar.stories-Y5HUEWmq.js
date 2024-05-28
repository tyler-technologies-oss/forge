import{x as p}from"./lit-element-Co407TGG.js";import"./lit-html-Cxzf5Fb2.js";import{C as k,h as _,m as R,n as w,e as L,B as N,f as P,l as B,c as z,a as D,s as F}from"./constants-DBYIoA5U.js";import{B as j,r as M,F as f,I as W,b as $}from"./icon-glGa22iA.js";import"./icon-button-B9ssFr4i.js";import"./base-button-adapter-DSGOs1ZP.js";const X=`${k}avatar`,G={IMAGE_URL:"image-url",TEXT:"text",LETTER_COUNT:"letter-count"},H={DEFAULT_LETTER_COUNT:2},K={ROOT:".forge-avatar",DEFAULT_SLOT:".forge-avatar > slot:not([name])"},V={BACKGROUND_VARNAME:"--forge-avatar-background"},o={elementName:X,attributes:G,numbers:H,selectors:K,strings:V};class q extends j{constructor(t){super(t),this._root=_(this._component,o.selectors.ROOT),this._defaultSlot=_(this._component,o.selectors.DEFAULT_SLOT)}async setBackgroundImageUrl(t){return this._root.classList.add("forge-avatar--image"),new Promise(e=>{const r=new Image;r.onload=()=>{this._root.style.backgroundImage=`url(${r.src})`,e(!0)},r.onerror=()=>{this._root.classList.remove("forge-avatar--image"),e(!1)},r.src=t})}removeBackgroundImage(){this._root.style.removeProperty("background-image"),this._root.classList.remove("forge-avatar--image")}setText(t){this._defaultSlot.textContent=t}clearText(){M(this._defaultSlot)}}class J{constructor(t){this._adapter=t,this._text="",this._letterCount=o.numbers.DEFAULT_LETTER_COUNT,this._initialized=!1}initialize(){this._render(),this._initialized=!0}disconnect(){this._initialized=!1}_render(){this._setText(),this._setBackgroundImageUrl()}async _setBackgroundImageUrl(){this._imageUrl?await this._adapter.setBackgroundImageUrl(this._imageUrl)&&this._adapter.clearText():this._adapter.removeBackgroundImage()}_setText(){const t=this._getTextContent(this._text,this._letterCount);t?this._adapter.setText(t):this._adapter.clearText()}_getTextContent(t,e){if(!t||!R(t)||e<=0)return"";let r;return e===1?r=t[0].toUpperCase():r=(t.match(/\S+/g)||[]).slice(0,e).reduce((s,i)=>s+=i[0].toUpperCase(),""),r}get text(){return this._text}set text(t){this._text!==t&&(this._text=t||"",this._adapter.setHostAttribute(o.attributes.TEXT,this._text),this._initialized&&this._render())}get letterCount(){return this._letterCount}set letterCount(t){this._letterCount!==t&&(this._letterCount=t,this._adapter.setHostAttribute(o.attributes.LETTER_COUNT,w(this._letterCount)?this._letterCount.toString():""),this._initialized&&this._render())}get imageUrl(){return this._imageUrl}set imageUrl(t){this._imageUrl!==t&&(this._imageUrl=t,this._initialized&&this._render())}}const Q=`<template>
  <div class="forge-avatar" aria-hidden="true" part="root">
    <slot></slot>
  </div>
</template>`,Y=':host{contain:content;display:inline-block}:host([hidden]){display:none}.forge-avatar{--_avatar-size: var(--forge-avatar-size, 40px);--_avatar-background: var(--forge-avatar-background, var(--forge-theme-tertiary, #3d5afe));--_avatar-color: var(--forge-avatar-color, var(--forge-theme-on-tertiary, #ffffff));--_avatar-transition-duration: var(--forge-avatar-transition-duration, var(--forge-animation-duration-short4, .2s));--_avatar-transition-timing: var(--forge-avatar-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_avatar-shape: var(--forge-avatar-shape, var(--forge-shape-round, 50%))}.forge-avatar{display:flex;align-items:center;justify-content:center;overflow:hidden;transition:height var(--_avatar-transition-duration) var(--_avatar-transition-timing),width var(--_avatar-transition-duration) var(--_avatar-transition-timing);border-radius:var(--_avatar-shape);box-sizing:border-box;width:var(--_avatar-size);height:var(--_avatar-size);background-color:var(--_avatar-background);background-position:center;background-repeat:no-repeat;background-size:cover;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-subheading2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-subheading2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-font-size-scale, 1)));font-weight:var(--forge-typography-subheading2-font-weight, 400);line-height:var(--forge-typography-subheading2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-subheading2-letter-spacing, normal);text-transform:var(--forge-typography-subheading2-text-transform, inherit);text-decoration:var(--forge-typography-subheading2-text-decoration, inherit);color:var(--_avatar-color)}.forge-avatar--image{background-color:inherit}';var Z=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,u=(a,t,e,r)=>{for(var n=r>1?void 0:r?tt(t,e):t,s=a.length-1,i;s>=0;s--)(i=a[s])&&(n=(r?i(t,e,n):i(n))||n);return r&&n&&Z(t,e,n),n};let m=class extends N{static get observedAttributes(){return[o.attributes.TEXT,o.attributes.LETTER_COUNT,o.attributes.IMAGE_URL]}constructor(){super(),P(this,Q,Y),this._foundation=new J(new q(this))}connectedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(a,t,e){switch(a){case o.attributes.TEXT:this.text=e;break;case o.attributes.LETTER_COUNT:this.letterCount=B(e);break;case o.attributes.IMAGE_URL:this.imageUrl=e;break}}};u([f()],m.prototype,"text",2);u([f()],m.prototype,"letterCount",2);u([f()],m.prototype,"imageUrl",2);m=u([L({name:o.elementName})],m);const h="forge-avatar",et={title:"Components/Avatar",render:a=>z(h,a),component:h,parameters:{actions:{disable:!0}},argTypes:{...D({tagName:h})},args:{text:"Tyler Forge",letterCount:2}},g={},c={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"/ruby.jpg"},render:({imageUrl:a})=>p`
      <forge-avatar image-url=${a}></forge-avatar>
    `},l={parameters:{controls:{include:/^--/}},render:()=>(W.define($),p`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},d={...F,render:a=>p`
      <forge-icon-button aria-label="Icon button with avatar">
        ${z(h,a)}
      </forge-icon-button>
    `};var v,b,y;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(y=(b=g.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var T,C,x;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|imageUrl/
    }
  },
  args: {
    imageUrl: '/ruby.jpg'
  },
  render: ({
    imageUrl
  }) => {
    return html\`
      <forge-avatar image-url=\${imageUrl}></forge-avatar>
    \`;
  }
}`,...(x=(C=c.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var U,E,A;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--/
    }
  },
  render: () => {
    IconRegistry.define(tylIconPerson);
    return html\`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    \`;
  }
}`,...(A=(E=l.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var I,O,S;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\`
      <forge-icon-button aria-label="Icon button with avatar">
        \${customElementStoryRenderer(component, args)}
      </forge-icon-button>
    \`;
  }
}`,...(S=(O=d.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const rt=["Demo","WithImage","WithIcon","WithIconButton"],ct=Object.freeze(Object.defineProperty({__proto__:null,Demo:g,WithIcon:l,WithIconButton:d,WithImage:c,__namedExportsOrder:rt,default:et},Symbol.toStringTag,{value:"Module"}));export{ct as A,g as D,l as W,c as a,d as b};
