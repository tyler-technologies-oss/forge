import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{S as r,p as i}from"./iframe-CebKObJP.js";import{C as a,S as o,t as s,x as c}from"./dist-CPhmYI86.js";import{p as l,r as u,s as d}from"./async-directive-BUe4G5yg.js";import{n as f,t as p}from"./base-lit-element-C_IqN1_h.js";import{s as m,x as h}from"./utils-B2Tk8obI.js";import{a as g,i as _,o as v,t as y}from"./icon-DTQwimRS.js";import{Bt as b,kt as x,t as S}from"./tyler-icons-CLXzO0Q_.js";import{p as C}from"./constants-jVWZdget.js";import{t as w}from"./decorate-2OK4V6AF.js";import{n as T,t as E}from"./icon-button-BbUSIC3F.js";import{t as D}from"./icon-button-DNkXDhJe.js";import{a as O,i as k,t as A}from"./text-field-Ba2hY42s.js";var j;function M(){return(M=e((()=>{j=`:host{display:inline-block}.container,.inner{gap:var(--forge-spacing-xxsmall,4px);display:flex}.container{flex-direction:column}.inner{align-items:center}::slotted(:is([slot=label],[slot=support-text])){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-font-size-scale,.75)));font-weight:var(--forge-typography-label1-font-weight,400);line-height:var(--forge-typography-label1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-label-line-height-scale,1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing,.0357143em);text-transform:var(--forge-typography-label1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-label1-text-decoration,inherit);text-decoration:var(--forge-typography-label1-text-decoration,inherit)}::slotted([slot=label]){color:var(--forge-theme-text-high,#000000de)}::slotted([slot=support-text]){color:var(--forge-theme-text-medium,#0009)}:host(:state(required)) ::slotted([slot=label]):before{content:"*";color:var(--forge-theme-error,#b00020);margin-inline-end:var(--forge-spacing-xxsmall,4px)}:host(:state(invalid)) ::slotted(:where([slot=label],[slot=support-text])){color:var(--forge-theme-error,#b00020)}:host(:state(invalid)) forge-icon-button{color:var(--forge-theme-error,#b00020);--forge-icon-button-focus-indicator-color:var(--forge-theme-error,#b00020)}`})))()}var N,P;function F(){return(F=e((()=>{i(),u(),s(),S(),f(),m(),D(),y(),A(),T(),g(),O(),M(),N=`forge-quantity-field`,P=class extends p{static{this[a]=N}static{this[o]=[E,_,k]}static{v.define([x,b])}static{this.styles=r(j)}#e;constructor(){super(),this.invalid=!1,this.required=!1,this.decrementLabel=`Decrement`,this.incrementLabel=`Increment`,this.#e=this.attachInternals()}willUpdate(e){e.has(`required`)&&h(this.#e,`required`,this.required),e.has(`invalid`)&&h(this.#e,`invalid`,this.invalid)}render(){return n`
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
    `}#t(){return this._defaultSlotElements.find(e=>e.tagName===`INPUT`)}#n(){let e=this.#t();e?.stepDown(),e?.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}#r(){let e=this.#t();e?.stepUp(),e?.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}},w([l({type:Boolean})],P.prototype,`invalid`,void 0),w([l({type:Boolean})],P.prototype,`required`,void 0),w([l({attribute:`decrement-label`})],P.prototype,`decrementLabel`,void 0),w([l({attribute:`increment-label`})],P.prototype,`incrementLabel`,void 0),w([d()],P.prototype,`_defaultSlotElements`,void 0),c(N,P)})))()}function I(){return(I=e((()=>{C()})))()}function L(){return(L=e((()=>{s(),F(),I()})))()}var R=t({Demo:()=>W,__namedExportsOrder:()=>G,default:()=>U}),z,B,V,H,U,W,G;function K(){return(K=e((()=>{i(),L(),{action:z}=__STORYBOOK_MODULE_ACTIONS__,B=`forge-quantity-field`,V=z(`change`),H=z(`input`),U={title:`Components/Quantity Field`,component:B,render:e=>n`
    <forge-quantity-field .invalid=${e.invalid} .required=${e.required}>
      <label slot="label" for="quantity">Quantity</label>
      <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2" @change=${V} @input=${H} />
      <span slot="support-text">Enter a quantity</span>
    </forge-quantity-field>
  `,argTypes:{invalid:{control:`boolean`},required:{control:`boolean`}},args:{invalid:!1,required:!1}},W={},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{}`,...W.parameters?.docs?.source}}},G=[`Demo`]})))()}export{R as n,K as r,W as t};