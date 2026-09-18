import{r as T,b as _}from"./iframe-Y92HmdHZ.js";import{C,a as D}from"./service-adapter-8tADcN_b.js";import{B as M,t as L}from"./base-lit-element-DXQv51bq.js";import{n as f}from"./property-4XXebId8.js";import{o as P}from"./query-assigned-elements-43hYArgI.js";import{M as N,I as $,Z as A,_ as z}from"./tyler-icons-SWWw4qdQ.js";import{t as g}from"./utils-DU-9AqTO.js";import{I as Q}from"./icon-button-BG-KzVAg.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import{a as R}from"./text-field-DSbKfCGl.js";import"./base-field-CkmJM5z3.js";import"./label-DSSUgOwJ.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";const U=':host{display:inline-block}.container,.inner{display:flex;gap:var(--forge-spacing-xxsmall, 4px)}.container{flex-direction:column}.inner{align-items:center}::slotted(:is([slot=label],[slot=support-text])){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit)}::slotted([slot=label]){color:var(--forge-theme-text-high, rgba(0, 0, 0, .87))}::slotted([slot=support-text]){color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}:host(:state(required)) ::slotted([slot=label]):before{content:"*";color:var(--forge-theme-error, #b00020);margin-inline-end:var(--forge-spacing-xxsmall, 4px)}:host(:state(invalid)) ::slotted(:where([slot=label],[slot=support-text])){color:var(--forge-theme-error, #b00020)}:host(:state(invalid)) forge-icon-button{color:var(--forge-theme-error, #b00020);--forge-icon-button-focus-indicator-color: var(--forge-theme-error, #b00020)}';var B=Object.defineProperty,F=Object.getOwnPropertyDescriptor,E=e=>{throw TypeError(e)},i=(e,t,o,s)=>{for(var n=s>1?void 0:s?F(t,o):t,d=e.length-1,m;d>=0;d--)(m=e[d])&&(n=(s?m(t,o,n):m(n))||n);return s&&n&&B(t,o,n),n},u=(e,t,o)=>t.has(e)||E("Cannot "+o),v=(e,t,o)=>(u(e,t,"read from private field"),o?o.call(e):t.get(e)),y=(e,t,o)=>t.has(e)?E("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),Y=(e,t,o,s)=>(u(e,t,"write to private field"),t.set(e,o),o),c=(e,t,o)=>(u(e,t,"access private method"),o),x,q,b,l,a,h,w,I;const O="forge-quantity-field";let r=class extends(b=M,q=C,x=D,b){constructor(){super(),y(this,a),this.invalid=!1,this.required=!1,this.decrementLabel="Decrement",this.incrementLabel="Increment",y(this,l),Y(this,l,this.attachInternals())}willUpdate(e){e.has("required")&&g(v(this,l),"required",this.required),e.has("invalid")&&g(v(this,l),"invalid",this.invalid)}render(){return _`
      <div class="container">
        <slot name="label"></slot>
        <div class="inner">
          <slot name="decrement-button" @click=${c(this,a,w)}>
            <forge-icon-button shape="squared" aria-label=${this.decrementLabel}>
              <slot name="decrement-icon">
                <forge-icon name="minus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
          <forge-text-field .invalid=${this.invalid} .required=${this.required}>
            <slot></slot>
          </forge-text-field>
          <slot name="increment-button" @click=${c(this,a,I)}>
            <forge-icon-button shape="squared" aria-label=${this.incrementLabel}>
              <slot name="increment-icon">
                <forge-icon name="plus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
        </div>
        <slot name="support-text"></slot>
      </div>
    `}};l=new WeakMap;a=new WeakSet;h=function(){return this._defaultSlotElements.find(e=>e.tagName==="INPUT")};w=function(){const e=c(this,a,h).call(this);e?.stepDown(),e?.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};I=function(){const e=c(this,a,h).call(this);e?.stepUp(),e?.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),e?.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};r[q]=O;r[x]=[Q,N,R];$.define([A,z]);r.styles=T(U);i([f({type:Boolean})],r.prototype,"invalid",2);i([f({type:Boolean})],r.prototype,"required",2);i([f({attribute:"decrement-label"})],r.prototype,"decrementLabel",2);i([f({attribute:"increment-label"})],r.prototype,"incrementLabel",2);i([P()],r.prototype,"_defaultSlotElements",2);r=i([L(O)],r);const{action:S}=__STORYBOOK_MODULE_ACTIONS__,k="forge-quantity-field",G=S("change"),W=S("input"),K={title:"Components/Quantity Field",component:k,render:e=>_`
    <forge-quantity-field .invalid=${e.invalid} .required=${e.required}>
      <label slot="label" for="quantity">Quantity</label>
      <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2" @change=${G} @input=${W} />
      <span slot="support-text">Enter a quantity</span>
    </forge-quantity-field>
  `,argTypes:{invalid:{control:"boolean"},required:{control:"boolean"}},args:{invalid:!1,required:!1}},p={};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source}}};const Z=["Demo"],ce=Object.freeze(Object.defineProperty({__proto__:null,Demo:p,__namedExportsOrder:Z,default:K},Symbol.toStringTag,{value:"Module"}));export{p as D,ce as Q};
