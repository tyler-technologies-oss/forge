import{C as y,q as d,F as w,m as l,i as m,G as v,p as k,j as E,b as h,h as O,g as z,e as g,k as A,A as b,x,o as L,B as N}from"./constants-CFf81ck9.js";import{B as C,c as n}from"./base-adapter-Dh44vCkH.js";import"./index-BmocOEUj.js";import{W as D,a as I}from"./with-form-associated-CVqCUEW0.js";import{W as S,a as F}from"./with-default-aria-CAIVLMQ_.js";import{W as P}from"./with-label-aware-CjYHyB6d.js";import{F as R}from"./focus-indicator-DesOnyyZ.js";import{S as H}from"./state-layer-COSQHCpS.js";const p=`${y}switch`,u={ON:"on",SELECTED:"selected",DEFAULT_ON:"default-on",VALUE:"value",DENSE:"dense",DISABLED:"disabled",REQUIRED:"required",READONLY:"readonly",ICON:"icon",LABEL_POSITION:"label-position",TABINDEX:"tabindex"},T={...u},q={HIDDEN:"hidden"},B={ROOT:".forge-switch",LABEL:"#label",ICON_ON:"#icon-on",ICON_OFF:"#icon-off",STATE_LAYER:"forge-state-layer"},V={CHANGE:`${p}-change`},j={ON:"on",OFF:"off"},e={attributes:T,observedAttributes:u,classes:q,selectors:B,elementName:p,events:V,state:j};class U extends C{constructor(t){super(t),this._rootElement=d(t,e.selectors.ROOT),this._labelElement=d(t,e.selectors.LABEL),this._iconOnElement=d(t,e.selectors.ICON_ON),this._iconOffElement=d(t,e.selectors.ICON_OFF),this._stateLayerElement=d(t,e.selectors.STATE_LAYER)}setOn(t){this._component[w](),this._component[l]({ariaChecked:t?"true":"false"})}setDisabled(t){this._component[m]=!t,this._component[l]({ariaDisabled:t?"true":"false"}),this._stateLayerElement.disabled=t}setRequired(t){this._component[w](),this._component[l]({ariaRequired:t?"true":"false"})}setReadonly(t){this._component[l]({ariaReadOnly:t?"true":"false"}),this._stateLayerElement.disabled=t}setIconVisibility(t){const i=t==="none"||t==="off",r=t==="none"||t==="on";v(this._iconOnElement,i,e.classes.HIDDEN),v(this._iconOffElement,r,e.classes.HIDDEN)}setLabelPosition(t){this._labelElement.remove(),t==="start"?this._rootElement.prepend(this._labelElement):this._rootElement.append(this._labelElement)}syncValue(t){const i=t?new FormData:null,r=t?e.state.ON:e.state.OFF;i&&t&&i.append(this._component.name,t),this._component.setFormValue(i,r)}}class W{constructor(t){this._adapter=t,this._on=!1,this._defaultOn=!1,this._value="on",this._dense=!1,this._disabled=!1,this._required=!1,this._readonly=!1,this._icon="both",this._labelPosition="end",this._clickListener=()=>this._handleChange(),this._keydownListener=i=>this._handleKeydown(i),this._keyupListener=i=>this._handleKeyup(i)}get _submittedValue(){return this._on?this._value:null}initialize(){this._adapter.addHostListener("click",this._clickListener,{capture:!0}),this._adapter.addHostListener("keydown",this._keydownListener),this._adapter.addHostListener("keyup",this._keyupListener,{capture:!0}),this._adapter.setIconVisibility(this._icon),this._adapter.syncValue(this._submittedValue)}_handleKeydown(t){t.key===" "&&t.preventDefault()}_handleKeyup(t){t.key===" "&&this._handleChange()}_handleChange(){if(this._readonly)return;const t=this._on,i=!this._on;this._on=i;const r=new Event("change",{cancelable:!0,bubbles:!0}),c=new CustomEvent(e.events.CHANGE,{detail:i,bubbles:!0,cancelable:!0});this._adapter.dispatchHostEvent(r),this._adapter.dispatchHostEvent(c),this._on=t,!(r.defaultPrevented||c.defaultPrevented)&&(this.on=i)}_setOnAttribute(){this._adapter.toggleHostAttribute(e.attributes.ON,this._on),this._adapter.toggleHostAttribute(e.attributes.SELECTED,this._on)}get on(){return this._on}set on(t){this._on!==t&&(this._on=t,this._adapter.setOn(this._on),this._adapter.syncValue(this._submittedValue),this._setOnAttribute())}get defaultOn(){return this._defaultOn}set defaultOn(t){this._defaultOn!==t&&(this._defaultOn=t,this._adapter.toggleHostAttribute(e.attributes.DEFAULT_ON,this._defaultOn))}get value(){return this._value}set value(t){this._value!==t&&(this._value=t,this._adapter.syncValue(this._submittedValue),(typeof this._value=="string"||this._value==null)&&this._adapter.toggleHostAttribute(e.attributes.VALUE,!0,this._value))}get dense(){return this._dense}set dense(t){this._dense!==t&&(this._dense=t,this._adapter.toggleHostAttribute(e.attributes.DENSE,this._dense))}get disabled(){return this._disabled}set disabled(t){this._disabled!==t&&(this._disabled=t,this._adapter.setDisabled(this._disabled),this._adapter.toggleHostAttribute(e.attributes.DISABLED,this._disabled))}get required(){return this._required}set required(t){this._required!==t&&(this._required=t,this._adapter.setRequired(this._required),this._adapter.toggleHostAttribute(e.attributes.REQUIRED,this._required))}get readonly(){return this._readonly}set readonly(t){this._readonly!==t&&(this._readonly=t,this._adapter.setReadonly(this._readonly),this._adapter.toggleHostAttribute(e.attributes.READONLY,this._readonly))}get icon(){return this._icon}set icon(t){this._icon!==t&&(this._icon=t,this._adapter.setIconVisibility(this._icon),this._adapter.setHostAttribute(e.attributes.ICON,this._icon))}get labelPosition(){return this._labelPosition}set labelPosition(t){this._labelPosition!==t&&(this._labelPosition=t,this._adapter.setLabelPosition(this._labelPosition),this._adapter.setHostAttribute(e.attributes.LABEL_POSITION,this._labelPosition))}}const M=`<template>
  <div class="forge-switch" part="switch">
    <div id="container" class="container">
      <div class="track" part="track"></div>
      <div class="handle" part="handle">
        <div id="icon-off" class="icon icon__off" part="icon-off">
          <slot name="icon-off">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </slot>
        </div>
        <div id="icon-on" class="icon icon__on" part="icon-on">
          <slot name="icon-on">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
          </slot>
        </div>
        <forge-state-layer target=":host" exportparts="surface:state-layer"></forge-state-layer>
      </div>
      <forge-focus-indicator target=":host" part="focus-indicator"></forge-focus-indicator>
    </div>
    <label id="label" class="label" part="label">
      <slot></slot>
    </label>
  </div>
</template>
`,Y=':host{display:inline-block;outline:none;-webkit-tap-highlight-color:transparent}:host([hidden]){display:none}.forge-switch{--_switch-handle-size: var(--forge-switch-handle-size, 20px);--_switch-handle-scale: var(--forge-switch-handle-scale, 1);--_switch-handle-elevation: var(--forge-switch-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12));--_switch-track-border-width: var(--forge-switch-track-border-width, 0);--_switch-track-border-color: var(--forge-switch-track-border-color, transparent);--_switch-icon-color: var(--forge-switch-icon-color, var(--forge-theme-on-tertiary, #ffffff));--_switch-icon-size: var(--forge-switch-icon-size, 16px);--_switch-icon-scale: var(--forge-switch-icon-scale, 1);--_switch-state-layer-size: var(--forge-switch-state-layer-size, 40px);--_switch-state-layer-dense-size: var(--forge-switch-state-layer-dense-size, 28px);--_switch-handle-on-color: var(--forge-switch-handle-on-color, var(--forge-theme-tertiary, #3d5afe));--_switch-handle-off-color: var(--forge-switch-handle-off-color, var(--forge-theme-surface-container-high, #9e9e9e));--_switch-handle-width: var(--forge-switch-handle-width, var(--_switch-handle-size));--_switch-handle-height: var(--forge-switch-handle-height, var(--_switch-handle-size));--_switch-handle-on-scale: var(--forge-switch-handle-on-scale, var(--_switch-handle-scale));--_switch-handle-off-scale: var(--forge-switch-handle-off-scale, var(--_switch-handle-scale));--_switch-handle-shape: var(--forge-switch-handle-shape, calc(var(--forge-shape-round, 50%) * var(--forge-shape-factor, 1)));--_switch-handle-on-elevation: var(--forge-switch-handle-on-elevation, var(--_switch-handle-elevation));--_switch-handle-off-elevation: var(--forge-switch-handle-off-elevation, var(--_switch-handle-elevation));--_switch-track-on-color: var(--forge-switch-track-on-color, var(--forge-theme-tertiary-container, #d0d7ff));--_switch-track-off-color: var(--forge-switch-track-off-color, var(--forge-theme-surface-container, #e0e0e0));--_switch-track-width: var(--forge-switch-track-width, 36px);--_switch-track-height: var(--forge-switch-track-height, 14px);--_switch-track-shape: var(--forge-switch-track-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));--_switch-track-on-border-width: var(--forge-switch-track-on-border-width, var(--_switch-track-border-width));--_switch-track-off-border-width: var(--forge-switch-track-off-border-width, var(--_switch-track-border-width));--_switch-track-on-border-color: var(--forge-switch-track-on-border-color, var(--_switch-track-border-color));--_switch-track-off-border-color: var(--forge-switch-track-off-border-color, var(--_switch-track-border-color));--_switch-icon-on-color: var(--forge-switch-icon-on-color, var(--_switch-icon-color));--_switch-icon-off-color: var(--forge-switch-icon-off-color, var(--_switch-icon-color));--_switch-icon-on-size: var(--forge-switch-icon-on-size, var(--_switch-icon-size));--_switch-icon-off-size: var(--forge-switch-icon-off-size, var(--_switch-icon-size));--_switch-icon-on-scale: var(--forge-switch-icon-on-scale, var(--_switch-icon-scale));--_switch-icon-off-scale: var(--forge-switch-icon-off-scale, var(--_switch-icon-scale));--_switch-gap: var(--forge-switch-gap, 0);--_switch-justify: var(--forge-switch-justify, start);--_switch-direction: var(--forge-switch-direction, initial);--_switch-state-layer-width: var(--forge-switch-state-layer-width, var(--_switch-state-layer-size));--_switch-state-layer-height: var(--forge-switch-state-layer-height, var(--_switch-state-layer-size));--_switch-state-layer-on-color: var(--forge-switch-state-layer-on-color, var(--_switch-handle-on-color));--_switch-state-layer-off-color: var(--forge-switch-state-layer-off-color, var(--_switch-color));--_switch-state-layer-dense-width: var(--forge-switch-state-layer-dense-width, var(--_switch-state-layer-dense-size));--_switch-state-layer-dense-height: var(--forge-switch-state-layer-dense-height, var(--_switch-state-layer-dense-size));--_switch-disabled-opacity: var(--forge-switch-disabled-opacity, .38);--_switch-handle-active-on-color: var(--forge-switch-handle-active-on-color, var(--_switch-handle-on-color));--_switch-handle-active-off-color: var(--forge-switch-handle-active-off-color, var(--_switch-handle-off-color));--_switch-handle-active-scale: var(--forge-switch-handle-active-scale, 1.2);--_switch-handle-active-on-scale: var(--forge-switch-handle-active-on-scale, var(--_switch-handle-active-scale));--_switch-handle-active-off-scale: var(--forge-switch-handle-active-off-scale, var(--_switch-handle-active-scale));--_switch-handle-active-elevation: var(--forge-switch-handle-active-elevation, var(--_switch-handle-elevation));--_switch-handle-active-on-elevation: var(--forge-switch-handle-active-on-elevation, var(--_switch-handle-active-elevation));--_switch-handle-active-off-elevation: var(--forge-switch-handle-active-off-elevation, var(--_switch-handle-active-elevation));--_switch-track-active-on-color: var(--forge-switch-track-active-on-color, var(--_switch-track-on-color));--_switch-track-active-off-color: var(--forge-switch-track-active-off-color, var(--_switch-track-off-color));--_switch-track-active-on-border-width: var(--forge-switch-track-active-on-border-width, var(--_switch-track-on-border-width));--_switch-track-active-off-border-width: var(--forge-switch-track-active-off-border-width, var(--_switch-track-off-border-width));--_switch-track-active-on-border-color: var(--forge-switch-track-active-on-border-color, var(--_switch-track-on-border-color));--_switch-track-active-off-border-color: var(--forge-switch-track-active-off-border-color, var(--_switch-track-off-border-color));--_switch-icon-active-on-color: var(--forge-switch-icon-active-on-color, var(--_switch-icon-on-color));--_switch-icon-active-off-color: var(--forge-switch-icon-active-off-color, var(--_switch-icon-off-color));--_switch-icon-active-on-scale: var(--forge-switch-icon-active-on-scale, var(--_switch-icon-on-scale));--_switch-icon-active-off-scale: var(--forge-switch-icon-active-off-scale, var(--_switch-icon-off-scale));--_switch-animation-duration: var(--forge-switch-animation-duration, var(--forge-animation-duration-short2, .1s));--_switch-animation-timing: var(--forge-switch-animation-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)));--_switch-active-animation-timing: var(--forge-switch-active-animation-timing, var(--forge-animation-easing-linear, cubic-bezier(0, 0, 1, 1)))}.forge-switch{display:flex;position:relative;flex-direction:var(--_switch-direction);flex-shrink:0;align-items:center;justify-content:var(--_switch-justify);gap:var(--_switch-gap);--_switch-current-state-layer-width: var(--_switch-state-layer-width);--_switch-current-state-layer-height: var(--_switch-state-layer-height)}.forge-switch .container{position:relative;align-items:center;display:flex;block-size:max(var(--_switch-handle-height),var(--_switch-track-height),var(--_switch-current-state-layer-height));cursor:pointer}.forge-switch .input{position:absolute;z-index:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;margin:0;inline-size:100%;block-size:100%;cursor:unset}.forge-switch .track{transition-property:background-color,border-color,border-width;transition-duration:var(--_switch-animation-duration);transition-timing-function:var(--_switch-animation-timing);box-sizing:border-box;margin-inline:calc(max(var(--_switch-handle-width),var(--_switch-current-state-layer-width)) / 2 - calc(var(--_switch-track-height) / 2));border-width:var(--_switch-track-off-border-width);border-color:var(--_switch-track-off-border-color);border-style:solid;border-radius:var(--_switch-track-shape);inline-size:var(--_switch-track-width);block-size:var(--_switch-track-height);background-color:var(--_switch-track-off-color)}.forge-switch .handle{position:absolute;justify-content:center;align-items:center;display:flex;transition-property:translate;transition-duration:var(--_switch-animation-duration);transition-timing-function:var(--_switch-animation-timing);border-radius:var(--_switch-handle-shape);inline-size:var(--_switch-current-state-layer-width);block-size:var(--_switch-current-state-layer-height)}.forge-switch .handle:before{content:"";position:relative;display:block;scale:var(--_switch-handle-off-scale);transition:background-color var(--_switch-animation-duration) var(--_switch-animation-timing),box-shadow var(--_switch-animation-duration) var(--_switch-animation-timing),scale var(--_switch-animation-duration) var(--_switch-active-animation-timing);box-shadow:var(--_switch-handle-off-elevation);border-radius:var(--_switch-handle-shape);inline-size:var(--_switch-handle-width);block-size:var(--_switch-handle-height);background-color:var(--_switch-handle-off-color)}.forge-switch .icon{position:absolute;align-items:center;justify-content:center;display:flex;transition-property:opacity,scale;transition-duration:var(--_switch-animation-duration);transition-timing-function:var(--_switch-animation-timing);inline-size:var(--_switch-icon-off-size);block-size:var(--_switch-icon-off-size);color:var(--_switch-icon-off-color);fill:var(--_switch-icon-off-color);font-size:var(--_switch-icon-off-size);--forge-icon-font-size: var(--_switch-icon-off-size)}.forge-switch .icon__on{--forge-icon-font-size: var(--_switch-icon-on-size);inline-size:var(--_switch-icon-on-size);block-size:var(--_switch-icon-on-size);color:var(--_switch-icon-on-color);fill:var(--_switch-icon-on-color);font-size:var(--_switch-icon-on-size);opacity:0;scale:.4}.forge-switch .icon__off{opacity:1;scale:var(--_switch-icon-off-scale)}.forge-switch .label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .8125)));font-weight:var(--forge-typography-label2-font-weight, 400);line-height:var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label2-letter-spacing, .0096153846em);text-transform:var(--forge-typography-label2-text-transform, inherit);text-decoration:var(--forge-typography-label2-text-decoration, inherit)}.forge-switch .label:empty{display:none}.forge-switch .hidden{display:none}.forge-switch ::slotted([slot=input]){position:absolute;z-index:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;margin:0;inline-size:100%;block-size:100%;cursor:unset}:host([on]) .track{border-width:var(--_switch-track-on-border-width);border-color:var(--_switch-track-on-border-color);background-color:var(--_switch-track-on-color)}:host([on]) .handle{translate:calc(var(--_switch-track-width) - calc(var(--_switch-track-height) / 2) * 2)}:host([on]) .handle:before{scale:var(--_switch-handle-on-scale);box-shadow:var(--_switch-handle-on-elevation);background-color:var(--_switch-handle-on-color)}:host([on]) .handle .icon__on{opacity:1;scale:var(--_switch-icon-on-scale)}:host([on]) .handle .icon__off{opacity:0;scale:.4}:host([on]) forge-state-layer{--forge-state-layer-color: var(--_switch-state-layer-on-color)}:host(:not([disabled]):not([readonly])) .forge-switch .container:active .track{border-width:var(--_switch-track-active-off-border-width);border-color:var(--_switch-track-active-off-border-color);background-color:var(--_switch-track-active-off-color)}:host(:not([disabled]):not([readonly])) .forge-switch .container:active .handle:before{scale:var(--_switch-handle-active-off-scale);box-shadow:var(--_switch-handle-active-off-elevation);background-color:var(--_switch-handle-active-off-color)}:host(:not([disabled]):not([readonly])) .forge-switch .container:active .handle .icon{scale:var(--_switch-icon-active-off-scale);color:var(--_switch-icon-active-off-color);fill:var(--_switch-icon-active-off-color)}:host(:not([disabled]):not([readonly])[on]) .forge-switch .container:active .track{border-width:var(--_switch-track-active-on-border-width);border-color:var(--_switch-track-active-on-border-color);background-color:var(--_switch-track-active-on-color)}:host(:not([disabled]):not([readonly])[on]) .forge-switch .container:active .handle:before{scale:var(--_switch-handle-active-on-scale);box-shadow:var(--_switch-handle-active-on-elevation);background-color:var(--_switch-handle-active-on-color)}:host(:not([disabled]):not([readonly])[on]) .forge-switch .container:active .handle .icon{scale:var(--_switch-icon-active-on-scale);color:var(--_switch-icon-active-on-color);fill:var(--_switch-icon-active-on-color)}:host([dense]) .forge-switch{--_switch-current-state-layer-width: var(--_switch-state-layer-dense-width);--_switch-current-state-layer-height: var(--_switch-state-layer-dense-height)}:host([disabled]) .forge-switch .container{opacity:var(--_switch-disabled-opacity);cursor:not-allowed}:host([disabled]) .forge-switch .handle:before{box-shadow:none}:host([readonly]) .forge-switch .container{cursor:not-allowed}@media (prefers-reduced-motion){.switch{--_switch-animation-duration: var(--forge-switch-animation-duration, 0s)}}forge-state-layer{--forge-state-layer-color: var(--_switch-state-layer-off-color)}forge-focus-indicator{--forge-focus-indicator-shape: var(--_switch-track-shape);--forge-focus-indicator-outward-offset: 0px}';var K=Object.defineProperty,G=Object.getOwnPropertyDescriptor,s=(a,t,i,r)=>{for(var c=r>1?void 0:r?G(t,i):t,f=a.length-1,_;f>=0;f--)(_=a[f])&&(c=(r?_(t,i,c):_(c))||c);return r&&c&&K(t,i,c),c};let o=class extends D(P(I(S(F(N))))){static get observedAttributes(){return Object.values(e.observedAttributes)}constructor(){super(),k(this,M,Y),this[E]="checkbox",this._core=new W(new U(this))}connectedCallback(){super.connectedCallback(),this[l]({role:"switch",ariaChecked:this.on?"true":"false",ariaDisabled:this.disabled?"true":"false",ariaRequired:this.required?"true":"false"}),this._core.initialize()}attributeChangedCallback(a,t,i){switch(a){case e.observedAttributes.ON:case e.observedAttributes.SELECTED:this.on=h(i);break;case e.observedAttributes.DEFAULT_ON:this.defaultOn=h(i);break;case e.observedAttributes.VALUE:this.value=i;break;case e.observedAttributes.DENSE:this.dense=h(i);break;case e.observedAttributes.DISABLED:this.disabled=h(i);break;case e.observedAttributes.REQUIRED:this.required=h(i);break;case e.observedAttributes.READONLY:this.readonly=h(i);break;case e.observedAttributes.ICON:this.icon=i;break;case e.observedAttributes.LABEL_POSITION:this.labelPosition=i;break}super.attributeChangedCallback(a,t,i)}[O](){return this.on?this.value:null}[z](){return this.on?e.state.ON:e.state.OFF}[w](){this[g].setValidity({valueMissing:this.required&&!this.on},this[A]({checked:this.on,required:this.required}))}formResetCallback(){this.on=this.defaultOn}formStateRestoreCallback(a){this.on=a===e.state.ON}labelClickedCallback(){this.click(),this.focus()}labelChangedCallback(a){this[l]({ariaLabel:a})}setFormValue(a,t){if(this[g].setFormValue(a,t),t){const i=b(t)?t:t[this.name];this.on=i===e.state.ON;return}b(a)?this.on=!!a:a!=null&&a[this.name]?this.on=!!a[this.name]:this.on=!1}toggle(a){x(a)?this._core.on=a:this._core.on=!this._core.on}};s([n()],o.prototype,"on",2);s([n({name:"on"})],o.prototype,"selected",2);s([n()],o.prototype,"defaultOn",2);s([n()],o.prototype,"value",2);s([n()],o.prototype,"dense",2);s([n()],o.prototype,"disabled",2);s([n()],o.prototype,"required",2);s([n()],o.prototype,"readonly",2);s([n()],o.prototype,"icon",2);s([n()],o.prototype,"labelPosition",2);o=s([L({name:e.elementName,dependencies:[R,H]})],o);export{e as S};
