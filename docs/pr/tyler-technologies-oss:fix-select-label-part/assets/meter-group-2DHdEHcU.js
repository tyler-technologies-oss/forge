import{r as y,a as x}from"./lit-element-B3QVTycr.js";import{x as d}from"./lit-html-CuBe1DX_.js";import{n,t as w}from"./property-2VT-dgmE.js";import{r as f}from"./state-3jnPnrDt.js";import{e as C,n as u}from"./key-item-Drd7rxXP.js";import{e as h}from"./class-map-CuXcqkpw.js";import{o as k}from"./style-map-CeP1Mntv.js";import{s as p}from"./a11y-utils-CCSbmmS7.js";import{a as v}from"./utils-CRxrUqQD.js";import{l as S}from"./feature-detection-C61kIZu7.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(e){return(r,t)=>{const{slot:m,selector:a}=e??{},l="slot"+(m?`[name=${m}]`:":not([name])");return C(r,t,{get(){var b;const c=(b=this.renderRoot)==null?void 0:b.querySelector(l),_=(c==null?void 0:c.assignedElements(e))??[];return a===void 0?_:_.filter($=>$.matches(a))}})}}const M=':host{display:inline}.forge-meter{--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-low, #e8ebff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary, #3d5afe));--_meter-height: var(--forge-meter-height, var(--forge-spacing-medium, 16px));--_meter-shape: var(--forge-meter-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_meter-inner-shape: var(--forge-meter-inner-shape, 0);--_meter-inner-elevation: var(--forge-meter-inner-elevation, 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12));--_meter-tickmarks: var(--forge-meter-tickmarks, 10);--_meter-tickmark-opacity: var(--forge-meter-tickmark-opacity, 54%);--_meter-transition-duration: var(--forge-meter-transition-duration, var(--forge-animation-duration-short4, .2s));--_meter-transition-timing: var(--forge-meter-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)))}.forge-meter{box-sizing:border-box}.forge-meter .heading{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit);display:flex;align-items:center;justify-content:space-between;line-height:normal}.forge-meter .heading.not-empty{margin-bottom:var(--forge-spacing-xxsmall, 4px)}.forge-meter .label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.forge-meter .value{color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}.forge-meter .track{position:relative;block-size:var(--_meter-height);border-radius:var(--_meter-shape);overflow:hidden;background:var(--_meter-background)}.forge-meter .track.segmented{--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-low, #f9e9e0));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning, #d14900));transition-property:background;transition-duration:var(--_meter-transition-duration);transition-timing-function:var(--_meter-transition-timing)}.forge-meter .track.segmented.least-optimal{--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-low, #f6e0e4));--_meter-color: var(--forge-meter-color, var(--forge-theme-error, #b00020))}.forge-meter .track.segmented.optimal{--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-low, #e6efe6));--_meter-color: var(--forge-meter-color, var(--forge-theme-success, #2e7d32))}.forge-meter .track.segmented .bar{transition-property:translate,box-shadow,background;transition-duration:var(--_meter-transition-duration);transition-timing-function:var(--_meter-transition-timing)}.forge-meter .track.lowest{--_meter-inner-elevation: var(--forge-meter-inner-elevation, 0)}.forge-meter .track.tickmarks:after{content:"";position:relative;display:block;width:100%;height:100%;margin-left:2px;background:repeating-linear-gradient(90deg,var(--_meter-color) 0px,var(--_meter-color) 1px,var(--_meter-background) 1px,var(--_meter-background) 2px,transparent 2px,transparent calc(100% / (var(--_meter-tickmarks) + 1) + 0px));background-position-x:-2px;opacity:var(--_meter-tickmark-opacity);pointer-events:none;transition-property:background;transition-duration:var(--_meter-transition-duration);transition-timing-function:var(--_meter-transition-timing)}.forge-meter .bar{position:absolute;left:-100%;width:100%;height:100%;border-radius:var(--_meter-inner-shape);box-shadow:var(--_meter-inner-elevation);background:var(--_meter-color);translate:var(--_meter-percentage) 0;transition-property:translate,box-shadow;transition-duration:var(--_meter-transition-duration);transition-timing-function:var(--_meter-transition-timing)}.forge-meter.grouped{display:block;position:absolute;z-index:var(--_meter-z-index);top:0;left:var(--_meter-inset);width:calc(var(--_meter-percentage) + var(--_meter-group-height) * .5);height:100%;border-radius:var(--_meter-inner-shape);border-top-left-radius:0;border-bottom-left-radius:0;margin-left:calc(-1 * var(--_meter-group-height) * .5);background:var(--_meter-color);box-shadow:var(--_meter-inner-elevation)}.forge-meter.grouped.muted{--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary-container-high, #b5c0ff))}.forge-meter.density--small{--_meter-height: var(--forge-meter-height, var(--forge-spacing-xsmall, 8px))}.forge-meter.density--medium{--_meter-height: var(--forge-meter-height, var(--forge-spacing-medium, 16px))}.forge-meter.density--large{--_meter-height: var(--forge-meter-height, var(--forge-spacing-large, 24px))}.forge-meter.shape--default{--_meter-shape: var(--forge-meter-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)))}.forge-meter.shape--rounded{--_meter-shape: var(--forge-meter-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)))}.forge-meter.shape--squared{--_meter-shape: var(--forge-meter-shape, 0)}.forge-meter.inner-shape--inherit{--_meter-inner-shape: var(--_meter-shape)}.forge-meter.muted .track{--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-minimum, #f7f8ff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary-container-high, #b5c0ff))}.forge-meter.muted .track.segmented{--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-minimum, #fdf8f5));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning-container-high, #eeba9e))}.forge-meter.muted .track.segmented.least-optimal{--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-minimum, #fcf5f6));--_meter-color: var(--forge-meter-color, var(--forge-theme-error-container-high, #e19eaa))}.forge-meter.muted .track.segmented.optimal{--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-minimum, #f7faf7));--_meter-color: var(--forge-meter-color, var(--forge-theme-success-container-high, #b0ceb1))}:host(:is(:state(vertical),:--vertical)){display:block}:host(:is(:state(vertical),:--vertical)) .forge-meter{display:flex;flex-direction:row-reverse;align-items:end;width:fit-content;height:100%;max-width:100%}:host(:is(:state(vertical),:--vertical)) .forge-meter .heading{flex-direction:column;align-items:start}:host(:is(:state(vertical),:--vertical)) .forge-meter .heading.not-empty{margin-bottom:0;margin-left:var(--forge-spacing-xsmall, 8px)}:host(:is(:state(vertical),:--vertical)) .forge-meter .track{width:var(--_meter-height);height:100%}:host(:is(:state(vertical),:--vertical)) .forge-meter .track.tickmarks:after{margin-top:-2px;margin-left:0;background:repeating-linear-gradient(0,var(--_meter-color) 0px,var(--_meter-color) 1px,var(--_meter-background) 1px,var(--_meter-background) 2px,transparent 2px,transparent calc(100% / (var(--_meter-tickmarks) + 1) + 0px));background-position-x:0;background-position-y:2px}:host(:is(:state(vertical),:--vertical)) .forge-meter .bar{left:initial;top:100%;translate:0 calc(-1 * var(--_meter-percentage))}:host(:is(:state(vertical),:--vertical)) .forge-meter.grouped{display:block;top:calc(100% - var(--_meter-percentage) - var(--_meter-inset));left:0;width:100%;height:calc(var(--_meter-percentage) + var(--_meter-group-height) * .5);max-width:initial;border-radius:var(--_meter-inner-shape);border-bottom-left-radius:0;border-bottom-right-radius:0;margin-left:0;margin-bottom:calc(-1 * var(--_meter-group-height) * .5)}.theme--primary:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-primary-container-low, #e8eaf6));--_meter-color: var(--forge-meter-color, var(--forge-theme-primary, #3f51b5))}.theme--primary:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-primary-container-low, #e8eaf6));--_meter-color: var(--forge-meter-color, var(--forge-theme-primary, #3f51b5))}.theme--primary.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-primary-container-minimum, #f7f8fc));--_meter-color: var(--forge-meter-color, var(--forge-theme-primary-container-high, #b6bde3))}.theme--primary.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-primary-container-minimum, #f7f8fc));--_meter-color: var(--forge-meter-color, var(--forge-theme-primary-container-high, #b6bde3))}.theme--secondary:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-secondary-container-low, #fff8e1));--_meter-color: var(--forge-meter-color, var(--forge-theme-secondary, #ffc107))}.theme--secondary:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-secondary-container-low, #fff8e1));--_meter-color: var(--forge-meter-color, var(--forge-theme-secondary, #ffc107))}.theme--secondary.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-secondary-container-minimum, #fffdf5));--_meter-color: var(--forge-meter-color, var(--forge-theme-secondary-container-high, #ffe7a1))}.theme--secondary.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-secondary-container-minimum, #fffdf5));--_meter-color: var(--forge-meter-color, var(--forge-theme-secondary-container-high, #ffe7a1))}.theme--tertiary:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-low, #e8ebff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary, #3d5afe))}.theme--tertiary:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-low, #e8ebff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary, #3d5afe))}.theme--tertiary.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-minimum, #f7f8ff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary-container-high, #b5c0ff))}.theme--tertiary.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-tertiary-container-minimum, #f7f8ff));--_meter-color: var(--forge-meter-color, var(--forge-theme-tertiary-container-high, #b5c0ff))}.theme--success:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-low, #e6efe6));--_meter-color: var(--forge-meter-color, var(--forge-theme-success, #2e7d32))}.theme--success:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-low, #e6efe6));--_meter-color: var(--forge-meter-color, var(--forge-theme-success, #2e7d32))}.theme--success.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-minimum, #f7faf7));--_meter-color: var(--forge-meter-color, var(--forge-theme-success-container-high, #b0ceb1))}.theme--success.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-success-container-minimum, #f7faf7));--_meter-color: var(--forge-meter-color, var(--forge-theme-success-container-high, #b0ceb1))}.theme--warning:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-low, #f9e9e0));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning, #d14900))}.theme--warning:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-low, #f9e9e0));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning, #d14900))}.theme--warning.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-minimum, #fdf8f5));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning-container-high, #eeba9e))}.theme--warning.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-warning-container-minimum, #fdf8f5));--_meter-color: var(--forge-meter-color, var(--forge-theme-warning-container-high, #eeba9e))}.theme--error:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-low, #f6e0e4));--_meter-color: var(--forge-meter-color, var(--forge-theme-error, #b00020))}.theme--error:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-low, #f6e0e4));--_meter-color: var(--forge-meter-color, var(--forge-theme-error, #b00020))}.theme--error.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-minimum, #fcf5f6));--_meter-color: var(--forge-meter-color, var(--forge-theme-error-container-high, #e19eaa))}.theme--error.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-error-container-minimum, #fcf5f6));--_meter-color: var(--forge-meter-color, var(--forge-theme-error-container-high, #e19eaa))}.theme--info:not(.muted) .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-info-container-low, #e3edf7));--_meter-color: var(--forge-meter-color, var(--forge-theme-info, #1565c0))}.theme--info:not(.muted).grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-info-container-low, #e3edf7));--_meter-color: var(--forge-meter-color, var(--forge-theme-info, #1565c0))}.theme--info.muted .track:not(.segmented){--_meter-background: var(--forge-meter-background, var(--forge-theme-info-container-minimum, #f6f9fc));--_meter-color: var(--forge-meter-color, var(--forge-theme-info-container-high, #a6c4e7))}.theme--info.muted .grouped{--_meter-background: var(--forge-meter-background, var(--forge-theme-info-container-minimum, #f6f9fc));--_meter-color: var(--forge-meter-color, var(--forge-theme-info-container-high, #a6c4e7))}@media (prefers-reduced-motion: reduce){.track{--_meter-transition-duration: var(--forge-meter-transition-duration, 0)}}@media (forced-colors: active){.track{border:1px solid CanvasText}.track .bar{background:CanvasText}.grouped{border-inline-end:1px solid Canvas!important;background:CanvasText!important}:host(:is(:state(vertical),:--vertical)) .grouped{border-block-start:1px solid CanvasText!important;border-inline-end:initial!important}}';var N=Object.defineProperty,P=Object.getOwnPropertyDescriptor,i=(e,r,t,m)=>{for(var a=m>1?void 0:m?P(r,t):r,l=e.length-1,c;l>=0;l--)(c=e[l])&&(a=(m?c(r,t,a):c(a))||a);return m&&a&&N(r,t,a),a};const V=new Map([["optimal","optimum-value"],["suboptimal","suboptimum-value"],["least-optimal","least-optimum-value"]]);let o=class extends x{constructor(){super(),this.value=0,this.min=0,this.max=1,this.tickmarks=!1,this.valueMode="manual",this.direction="horizontal",this.shape="default",this.innerShape="default",this.density="medium",this.theme="default",this.muted=!1,this._percentage=0,this._status="optimal",this._segmented=!1,this._grouped=!1,this._hasSlottedContent=!1,this._internals=this.attachInternals()}get percentage(){return this._percentage}get labels(){return this._internals.labels}get form(){return this._internals.form}connectedCallback(){super.connectedCallback(),p(this,this._internals,{role:"meter",ariaValueNow:`${this.value}`,ariaValueMin:`${this.min}`,ariaValueMax:`${this.max}`}),this._getGrouped()}willUpdate(e){const r=Array.from(e.keys());r.some(t=>["value","min","max","low","high","optimum"].includes(t.toString()))&&this._getStatus(),r.some(t=>["low","high"].includes(t.toString()))&&this._getSegmented(),e.forEach((t,m)=>{switch(m){case"value":p(this,this._internals,{ariaValueNow:`${this.value}`});break;case"min":p(this,this._internals,{ariaValueMin:`${this.min}`});break;case"max":p(this,this._internals,{ariaValueMax:`${this.max}`});break;case"direction":v(this._internals,"vertical",this.direction==="vertical");break}})}render(){const e={"inner-shape--inherit":this.innerShape==="inherit",muted:this.muted,[`density--${this.density}`]:!0,[`shape--${this.shape}`]:!0,[`theme--${this.theme}`]:!0};return this._grouped?d`
          <div
            part="root"
            class=${h({"forge-meter":!0,grouped:!0,...e})}
            style=${k({"--_meter-percentage":this._percentage+"%"})}></div>
        `:d`
          <div part="root" class=${h({"forge-meter":!0,...e})}>
            <div class=${h({heading:!0,"not-empty":this._hasSlottedContent})} @slotchange=${this._handleSlotChange}>
              <div class="label"><slot></slot></div>
              <div class="value">
                <slot name="value">${this.valueMode!=="manual"?d`${this.valueMode==="percentage"?`${this._percentage}%`:this.value}`:""}</slot>
              </div>
            </div>
            <div
              part="track"
              class=${h({track:!0,segmented:this._segmented,optimal:this._status==="optimal",suboptimal:this._status==="suboptimal","least-optimal":this._status==="least-optimal",lowest:this._percentage===0,tickmarks:this.tickmarks})}>
              <div part="bar" class="bar" style=${k({"--_meter-percentage":this._percentage+"%"})}></div>
            </div>
          </div>
        `}_getStatus(){const e=this.max-this.min;if(this._percentage=e?(this.value-this.min)/e*100:0,this._percentage=+Math.max(0,Math.min(100,this._percentage)).toFixed(3),isNaN(this._percentage)&&(this._percentage=0),this._grouped){const a=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(a)}const r=this.low??this.min,t=this.high??this.max,m=this.optimum??this.max;m<r?this._status=this.value<r?"optimal":this.value<t?"suboptimal":"least-optimal":m>t?this._status=this.value>t?"optimal":this.value>r?"suboptimal":"least-optimal":this._status=this.value<r||this.value>t?"suboptimal":"optimal",this._setValueState()}_getSegmented(){this._segmented=this.low!=null||this.high!=null}async _getGrouped(){const e=this.closest("forge-meter-group");this._grouped=!!e,e&&(await e.updateComplete,this.direction=e.direction,this.min=e.min,this.max=e.max)}_handleSlotChange(){const e=[...this._defaultNodes,...this._valueNodes].filter(r=>{var t;return!!((t=r.textContent)!=null&&t.trim())});this._hasSlottedContent=!!e.length}_setValueState(){V.forEach((e,r)=>v(this._internals,e,this._status===r))}};o.styles=y(M);o.formAssociated=!0;i([n({type:Number})],o.prototype,"value",2);i([n({type:Number})],o.prototype,"min",2);i([n({type:Number})],o.prototype,"max",2);i([n({type:Number})],o.prototype,"low",2);i([n({type:Number})],o.prototype,"high",2);i([n({type:Number})],o.prototype,"optimum",2);i([n({type:Boolean})],o.prototype,"tickmarks",2);i([n({attribute:"value-mode"})],o.prototype,"valueMode",2);i([n()],o.prototype,"direction",2);i([n()],o.prototype,"shape",2);i([n({attribute:"inner-shape"})],o.prototype,"innerShape",2);i([n()],o.prototype,"density",2);i([n()],o.prototype,"theme",2);i([n({type:Boolean})],o.prototype,"muted",2);i([f()],o.prototype,"_percentage",2);i([f()],o.prototype,"_status",2);i([f()],o.prototype,"_segmented",2);i([f()],o.prototype,"_grouped",2);i([f()],o.prototype,"_hasSlottedContent",2);i([u()],o.prototype,"_defaultNodes",2);i([u({slot:"value"})],o.prototype,"_valueNodes",2);o=i([w("forge-meter")],o);const A=':host{display:inline}.forge-meter-group{--_meter-group-background: var(--forge-meter-group-background, var(--forge-theme-surface-container-low, #ebebeb));--_meter-group-height: var(--forge-meter-group-height, var(--forge-spacing-medium, 16px));--_meter-group-shape: var(--forge-meter-group-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_meter-group-tickmarks: var(--forge-meter-group-tickmarks, 10);--_meter-group-tickmark-color: var(--forge-meter-group-tickmark-color, var(--forge-theme-outline-high, #212121));--_meter-group-tickmark-opacity: var(--forge-meter-group-tickmark-opacity, 54%)}.forge-meter-group{box-sizing:border-box}.forge-meter-group .heading{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .75)));font-weight:var(--forge-typography-label1-font-weight, 400);line-height:var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-label1-text-transform, inherit);text-decoration:var(--forge-typography-label1-text-decoration, inherit);display:flex;align-items:center;justify-content:space-between;line-height:normal}.forge-meter-group .heading.not-empty{margin-bottom:var(--forge-spacing-xxsmall, 4px)}.forge-meter-group .label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.forge-meter-group .value{color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}.forge-meter-group .track{position:relative;height:var(--_meter-group-height);border-radius:var(--_meter-group-shape);overflow:hidden;background:var(--_meter-group-background)}.forge-meter-group .track.tickmarks:after{content:"";position:relative;display:block;z-index:9999;width:100%;height:100%;margin-left:-1px;background:repeating-linear-gradient(90deg,var(--_meter-group-tickmark-color) 0px,var(--_meter-group-tickmark-color) 1px,transparent 1px,transparent calc(100% / (var(--_meter-group-tickmarks) + 1) + 0px));opacity:var(--_meter-group-tickmark-opacity);pointer-events:none}.forge-meter-group .track.inner-shape--inherit{--forge-meter-inner-shape: var(--_meter-group-shape)}.forge-meter-group .track.shape--default{--_meter-group-shape: var(--forge-meter-group-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)))}.forge-meter-group .track.shape--rounded{--_meter-group-shape: var(--forge-meter-group-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)))}.forge-meter-group .track.shape--squared{--_meter-group-shape: var(--forge-meter-group-shape, 0)}.forge-meter-group .track.density--small{--_meter-group-height: var(--forge-meter-group-height, var(--forge-spacing-xsmall, 8px))}.forge-meter-group .track.density--medium{--_meter-group-height: var(--forge-meter-group-height, var(--forge-spacing-medium, 16px))}.forge-meter-group .track.density--large{--_meter-group-height: var(--forge-meter-group-height, var(--forge-spacing-large, 24px))}:host(:is(:state(vertical),:--vertical)){display:block}:host(:is(:state(vertical),:--vertical)) .forge-meter-group{display:flex;flex-direction:row-reverse;align-items:end;width:fit-content;height:100%;max-width:100%}:host(:is(:state(vertical),:--vertical)) .forge-meter-group .heading{flex-direction:column;align-items:start}:host(:is(:state(vertical),:--vertical)) .forge-meter-group .heading.not-empty{margin-bottom:0;margin-left:var(--forge-spacing-xsmall, 8px)}:host(:is(:state(vertical),:--vertical)) .forge-meter-group .track{width:var(--_meter-group-height);height:100%}:host(:is(:state(vertical),:--vertical)) .forge-meter-group .track.tickmarks:after{margin-top:1px;margin-left:0;background:repeating-linear-gradient(90deg,var(--_meter-group-tickmark-color),true 0px,var(--_meter-group-tickmark-color),true 1px,transparent 1px,transparent calc(100% / (var(--_meter-group-tickmarks) + 1) + 0px))}@media (forced-colors: active){.track{border:1px solid CanvasText}}';var E=Object.defineProperty,O=Object.getOwnPropertyDescriptor,g=(e,r,t,m)=>{for(var a=m>1?void 0:m?O(r,t):r,l=e.length-1,c;l>=0;l--)(c=e[l])&&(a=(m?c(r,t,a):c(a))||a);return m&&a&&E(r,t,a),a};let s=class extends x{constructor(){super(),this.min=0,this.max=1,this.tickmarks=!1,this.direction="horizontal",this.density="default",this.shape="default",this.innerShape="default",this._hasSlottedHeadingContent=!1,this._debounceMeterChange=S(this._handleMeterChange.bind(this),0),this._internals=this.attachInternals()}get labels(){return this._internals.labels}get form(){return this._internals.form}connectedCallback(){super.connectedCallback(),p(this,this._internals,{role:"group"})}willUpdate(e){const r=Array.from(e.keys());r.includes("direction")&&v(this._internals,"vertical",this.direction==="vertical"),r.some(t=>["direction","min","max"].includes(t.toString()))&&this._syncMeters()}render(){return d`
      <div part="root" class="forge-meter-group" @change=${this._debounceMeterChange}>
        <div class=${h({heading:!0,"not-empty":this._hasSlottedHeadingContent})} @slotchange=${this._handleHeadingSlotChange}>
          <div class="label"><slot name="label"></slot></div>
          <div class="value"><slot name="value"></slot></div>
        </div>
        <div
          part="track"
          class=${h({track:!0,tickmarks:this.tickmarks,[`density--${this.density}`]:!0,[`inner-shape--${this.innerShape}`]:!0,[`shape--${this.shape}`]:!0})}>
          <slot @slotchange=${this._debounceMeterChange}></slot>
        </div>
      </div>
    `}_syncMeters(){this._meters.forEach(e=>{e.direction=this.direction,e.min=this.min,e.max=this.max})}_handleMeterChange(e){e.stopPropagation(),this._meters.reduce((r,t,m,a)=>(t.style.setProperty("--_meter-z-index",`${a.length-m}`),t.style.setProperty("--_meter-inset",`${r}%`),r+t.percentage),0)}_handleHeadingSlotChange(){const e=[...this._labelNodes,...this._valueNodes].filter(r=>{var t;return!!((t=r.textContent)!=null&&t.trim())});this._hasSlottedHeadingContent=!!e.length}};s.styles=y(A);s.formAssociated=!0;g([n({type:Number})],s.prototype,"min",2);g([n({type:Number})],s.prototype,"max",2);g([n({type:Boolean})],s.prototype,"tickmarks",2);g([n()],s.prototype,"direction",2);g([n()],s.prototype,"density",2);g([n()],s.prototype,"shape",2);g([n({attribute:"inner-shape"})],s.prototype,"innerShape",2);g([f()],s.prototype,"_hasSlottedHeadingContent",2);g([u({slot:"label"})],s.prototype,"_labelNodes",2);g([u({slot:"value"})],s.prototype,"_valueNodes",2);g([z({selector:"forge-meter"})],s.prototype,"_meters",2);s=g([w("forge-meter-group")],s);
