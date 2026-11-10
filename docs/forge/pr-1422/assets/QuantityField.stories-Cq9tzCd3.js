import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-BbUsXXnT.js";import{a,d as o,t as s}from"./decorators-Ci1onliJ.js";import{C as c,S as l,t as u,x as d}from"./dist-CPhmYI86.js";import{n as f,t as p}from"./base-lit-element-DvCODc3f.js";import{p as m}from"./constants-Bpi-_RbP.js";import{a as h,i as g,o as _,t as v}from"./icon-CdA8CuQQ.js";import{t as y}from"./decorate-DvwEnSYK.js";import{Ft as b,Kt as x,t as S}from"./tyler-icons-kuH1S-j5.js";import{s as C,x as w}from"./utils-B2Tk8obI.js";import{n as T,t as E}from"./icon-button-DL0Bo8LM.js";import{t as D}from"./icon-button-Cw3e2eGB.js";import{a as O,i as k,t as A}from"./text-field-DOSDaHDC.js";var j;function M(){return(M=e((()=>{j=`:host{display:inline-block}.container,.inner{gap:var(--forge-spacing-xxsmall,4px);display:flex}.container{flex-direction:column}.inner{align-items:center}::slotted(:is([slot=label],[slot=support-text])){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-font-size-scale,.75)));font-weight:var(--forge-typography-label1-font-weight,400);line-height:var(--forge-typography-label1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-line-height-scale,1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing,.0357143em);text-transform:var(--forge-typography-label1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-label1-text-decoration,inherit);text-decoration:var(--forge-typography-label1-text-decoration,inherit)}::slotted([slot=label]){color:var(--forge-theme-text-high,#000000de)}::slotted([slot=support-text]){color:var(--forge-theme-text-medium,#0009)}:host(:state(required)) ::slotted([slot=label]):before{content:"*";color:var(--forge-theme-error,#b00020);margin-inline-end:var(--forge-spacing-xxsmall,4px)}:host(:state(invalid)) ::slotted(:where([slot=label],[slot=support-text])){color:var(--forge-theme-error,#b00020)}:host(:state(invalid)) forge-icon-button{color:var(--forge-theme-error,#b00020);--forge-icon-button-focus-indicator-color:var(--forge-theme-error,#b00020)}`})))()}var N,P;function F(){return(F=e((()=>{i(),s(),u(),S(),f(),C(),D(),v(),A(),T(),h(),O(),M(),N=`forge-quantity-field`,P=class extends p{static{this[c]=N}static{this[l]=[E,g,k]}static{_.define([b,x])}static{this.styles=r(j)}#e;constructor(){super(),this.invalid=!1,this.required=!1,this.decrementLabel=`Decrement`,this.incrementLabel=`Increment`,this.#e=this.attachInternals()}willUpdate(e){e.has(`required`)&&w(this.#e,`required`,this.required),e.has(`invalid`)&&w(this.#e,`invalid`,this.invalid)}render(){return n`
      <div class="container">
        <slot name="label"></slot>
        <div class="inner">
          <slot name="decrement-button" @click=${this.#n}>
            <forge-icon-button shape="squared" aria-label=${this.decrementLabel}>
              <slot name="decrement-icon">
                <forge-icon name="minus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
          <forge-text-field .invalid=${this.invalid} .required=${this.required}>
            <slot></slot>
          </forge-text-field>
          <slot name="increment-button" @click=${this.#r}>
            <forge-icon-button shape="squared" aria-label=${this.incrementLabel}>
              <slot name="increment-icon">
                <forge-icon name="plus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
        </div>
        <slot name="support-text"></slot>
      </div>
    `}#t(){return this._defaultSlotElements.find(e=>e.tagName===`INPUT`)}#n(){let e=this.#t();e?.stepDown(),e?.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}#r(){let e=this.#t();e?.stepUp(),e?.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}},y([o({type:Boolean})],P.prototype,`invalid`,void 0),y([o({type:Boolean})],P.prototype,`required`,void 0),y([o({attribute:`decrement-label`})],P.prototype,`decrementLabel`,void 0),y([o({attribute:`increment-label`})],P.prototype,`incrementLabel`,void 0),y([a()],P.prototype,`_defaultSlotElements`,void 0),d(N,P)})))()}function I(){return(I=e((()=>{m()})))()}function L(){return(L=e((()=>{u(),F(),I()})))()}var R=t({Demo:()=>W,__namedExportsOrder:()=>G,default:()=>U}),z,B,V,H,U,W,G;function K(){return(K=e((()=>{i(),L(),{action:z}=__STORYBOOK_MODULE_ACTIONS__,B=`forge-quantity-field`,V=z(`change`),H=z(`input`),U={title:`Components/Quantity Field`,component:B,render:e=>n`
    <forge-quantity-field .invalid=${e.invalid} .required=${e.required}>
      <label slot="label" for="quantity">Quantity</label>
      <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2" @change=${V} @input=${H} />
      <span slot="support-text">Enter a quantity</span>
    </forge-quantity-field>
  `,argTypes:{invalid:{control:`boolean`},required:{control:`boolean`}},args:{invalid:!1,required:!1}},W={},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{}`,...W.parameters?.docs?.source}}},G=[`Demo`]})))()}export{R as n,K as r,W as t};