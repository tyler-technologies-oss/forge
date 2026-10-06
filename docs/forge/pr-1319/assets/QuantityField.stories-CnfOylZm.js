var v=t=>{throw TypeError(t)};var u=(t,o,e)=>o.has(t)||v("Cannot "+e);var g=(t,o,e)=>(u(t,o,"read from private field"),e?e.call(t):o.get(t)),h=(t,o,e)=>o.has(t)?v("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(t):o.set(t,e),E=(t,o,e,m)=>(u(t,o,"write to private field"),m?m.call(t,e):o.set(t,e),e),s=(t,o,e)=>(u(t,o,"access private method"),e);import{h as w,b as T}from"./iframe-Bsuj_4wG.js";import{C as N,a as $}from"./service-adapter-8tADcN_b.js";import{n as f}from"./property-CgXqkJjc.js";import{o as M}from"./query-assigned-elements-43hYArgI.js";import{t as P}from"./component-utils-vOrACU0E.js";import{Y as z,Z as A}from"./tyler-icons-_o7MAz4c.js";import{B as R}from"./base-lit-element-ZeoUMCRz.js";import{t as _}from"./utils-C31il88P.js";import{I as U}from"./icon-button-BRi3tEJf.js";import{a as B,I as C}from"./icon-CCr3iGf2.js";import{a as Y}from"./text-field-DQXkglfR.js";import"./base-field-CUFB2h0Q.js";import"./focus-indicator-6vgszVnP.js";import"./label-nfa9NigO.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";const k=':host{display:inline-block}.container,.inner{display:flex;gap:var(--forge-spacing-xxsmall, 4px)}.container{flex-direction:column}.inner{align-items:center}::slotted(:is([slot=label],[slot=support-text])){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}::slotted([slot=label]){color:var(--forge-theme-text-high, rgba(0, 0, 0, .87))}::slotted([slot=support-text]){color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}:host(:state(required)) ::slotted([slot=label]):before{content:"*";color:var(--forge-theme-error, #b00020);margin-inline-end:var(--forge-spacing-xxsmall, 4px)}:host(:state(invalid)) ::slotted(:where([slot=label],[slot=support-text])){color:var(--forge-theme-error, #b00020)}:host(:state(invalid)) forge-icon-button{color:var(--forge-theme-error, #b00020);--forge-icon-button-focus-indicator-color: var(--forge-theme-error, #b00020)}';var j=Object.defineProperty,p=(t,o,e,m)=>{for(var n=void 0,d=t.length-1,y;d>=0;d--)(y=t[d])&&(n=y(o,e,n)||n);return n&&j(o,e,n),n},x,q,I;const O="forge-quantity-field";var i,r,b,S,D;const c=class c extends(I=R,q=N,x=$,I){constructor(){super();h(this,r);h(this,i);this.invalid=!1,this.required=!1,this.decrementLabel="Decrement",this.incrementLabel="Increment",E(this,i,this.attachInternals())}willUpdate(e){e.has("required")&&_(g(this,i),"required",this.required),e.has("invalid")&&_(g(this,i),"invalid",this.invalid)}render(){return T`
      <div class="container">
        <slot name="label"></slot>
        <div class="inner">
          <slot name="decrement-button" @click=${s(this,r,S)}>
            <forge-icon-button shape="squared" aria-label=${this.decrementLabel}>
              <slot name="decrement-icon">
                <forge-icon name="minus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
          <forge-text-field .invalid=${this.invalid} .required=${this.required}>
            <slot></slot>
          </forge-text-field>
          <slot name="increment-button" @click=${s(this,r,D)}>
            <forge-icon-button shape="squared" aria-label=${this.incrementLabel}>
              <slot name="increment-icon">
                <forge-icon name="plus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
        </div>
        <slot name="support-text"></slot>
      </div>
    `}};i=new WeakMap,r=new WeakSet,b=function(){return this._defaultSlotElements.find(e=>e.tagName==="INPUT")},S=function(){const e=s(this,r,b).call(this);e?.stepDown(),e?.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},D=function(){const e=s(this,r,b).call(this);e?.stepUp(),e?.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},c[q]=O,c[x]=[U,B,Y],C.define([z,A]),c.styles=w(k);let a=c;p([f({type:Boolean})],a.prototype,"invalid");p([f({type:Boolean})],a.prototype,"required");p([f({attribute:"decrement-label"})],a.prototype,"decrementLabel");p([f({attribute:"increment-label"})],a.prototype,"incrementLabel");p([M()],a.prototype,"_defaultSlotElements");P(O,a);const{action:L}=__STORYBOOK_MODULE_ACTIONS__,G="forge-quantity-field",K=L("change"),Q=L("input"),Z={title:"Components/Quantity Field",component:G,render:t=>T`
    <forge-quantity-field .invalid=${t.invalid} .required=${t.required}>
      <label slot="label" for="quantity">Quantity</label>
      <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2" @change=${K} @input=${Q} />
      <span slot="support-text">Enter a quantity</span>
    </forge-quantity-field>
  `,argTypes:{invalid:{control:"boolean"},required:{control:"boolean"}},args:{invalid:!1,required:!1}},l={};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};const F=["Demo"],me=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,__namedExportsOrder:F,default:Z},Symbol.toStringTag,{value:"Module"}));export{l as D,me as Q};
