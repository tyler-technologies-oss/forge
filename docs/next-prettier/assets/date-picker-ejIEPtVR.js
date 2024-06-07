import{C as h,F as _,k as d,P as c,G as m,n as E,o as f}from"./constants-BMnwgo1j.js";import{z as v}from"./index-BhA1MhXR.js";import{i as o,C}from"./calendar-CgGGxBDq.js";import"./index-Dh0vMUMR.js";import{I as b,a as I}from"./icon-CiIDkczu.js";import{I as g}from"./icon-button-Dqh4j6OB.js";import{t as D,s as V}from"./focus-indicator-WHVXAnYX.js";import"./state-layer-CoXZFfb6.js";import{P as A}from"./popover-BDS33NIt.js";import"./overlay-BEOKbUF9.js";import{B as y,C as P,D as k,a as w,b as S,c as T}from"./base-date-picker-core-B21qeoFz.js";import{l as M}from"./base-field-core-BIIB941U.js";const l=`${h}date-picker`,N={VALUE:"value"},O={INPUT:"input,input[forge-date-picker-input]"},L={CHANGE:`${l}-change`,OPEN:`${l}-open`,CLOSE:`${l}-close`,INPUT:`${l}-input`},a={elementName:l,selectors:O,events:L,observedAttributes:N};class z extends y{constructor(t){super(t),this._dropdownIdentifier=`forge-date-picker-${this._identifier}`}_initializeInput(){this._inputElement=this._component.querySelector(a.selectors.INPUT)}_initializeCalendarDropdown(){const t=this._getDefaultTargetElement();this._calendarDropdown=new P(t,this._dropdownIdentifier)}initializeMask(t){var e;(e=this._inputMask)==null||e.destroy(),this._inputMask=new k(this._inputElement,t)}destroyMask(){var t;(t=this._inputMask)==null||t.destroy(),this._inputMask=void 0}initializeAccessibility(){this._inputElement.setAttribute("autocomplete","off"),this._inputElement.setAttribute("autocorrect","off"),this._inputElement.setAttribute("autocapitalize","off"),this._inputElement.setAttribute("spellcheck","false"),this._inputElement.setAttribute("role","combobox"),this._inputElement.setAttribute("aria-live","assertive"),this._inputElement.setAttribute("aria-atomic","true"),this._inputElement.setAttribute("aria-haspopup","true"),this._inputElement.setAttribute("aria-expanded","false"),this._inputElement.setAttribute("aria-owns",this._dropdownIdentifier),D(),V(this._inputElement)}addInputListener(t,e,i){var s;(s=this._inputElement)==null||s.addEventListener(t,e,{capture:i})}removeInputListener(t,e,i){var s;(s=this._inputElement)==null||s.removeEventListener(t,e,{capture:i})}setInputValueChangedListener(t,e){this.destroyValueChangeListener();const i=M(t,this._inputElement,"value",e);this._valueChangeListeners.push(i)}hasInputElement(){return!!this._inputElement}attachCalendar(t,e){super.attachCalendar(t,e),this._inputElement.setAttribute("aria-expanded","true")}detachCalendar(){super.detachCalendar(),this._inputElement&&(this._inputElement.setAttribute("aria-expanded","false"),this._inputElement.removeAttribute("aria-activedescendant"))}setActiveDescendant(t){this._inputElement.setAttribute("aria-activedescendant",t)}setInputValue(t,e){this._inputElement.value!==t&&(this._inputElement.value=t,this._inputMask&&this._inputMask.updateMask(),e&&(this._inputElement.dispatchEvent(new Event("change")),this._inputElement.dispatchEvent(new Event("input"))))}isInputDisabled(){return this._inputElement.disabled}isInputFocused(){return _(this._component.ownerDocument)===this._inputElement}getInputValue(){return this._inputMask?this._inputMask.maskedValue:this._inputElement.value}setDisabled(t){this._inputElement.disabled=t,this._inputElement.setAttribute("aria-disabled",t.toString()),this._toggleElement&&(this._toggleElement.setAttribute("aria-disabled",t.toString()),this._toggleElement.hasOwnProperty("disabled")&&(this._toggleElement.disabled=t))}tryFocusInput(){this._inputElement.focus()}tryBlurInput(){this._inputElement.blur()}selectInputText(){this._inputElement.select()}emitInputEvent(t,e){d(this._inputElement,t,e)}}class x extends w{constructor(t){super(t),this._mode="single"}_initializeState(){this._value||(this._value=this._coerceDateValue(this._adapter.getInputValue()))}_emitChangeEvent(t,e){const i=this._getTypedValue(t);return this._adapter.emitHostEvent(a.events.CHANGE,i,!0,!e)?(this._setValue(t),!0):!1}_emitOpenEvent(){this._adapter.emitHostEvent(a.events.OPEN,void 0,!1)}_emitCloseEvent(){this._adapter.emitHostEvent(a.events.CLOSE,void 0,!1)}_onToday(){const t=new Date;t.setHours(0,0,0,0),this._onDateSelected({date:t,selected:!0,type:"date"})}_onClear(){this._onDateSelected({date:null,selected:!1,type:"date"})}_getCurrentValue(){return this._value}_setFormattedInputValue(t){const e=this._formatDate(this._value);e?this._adapter.setInputValue(e,t?!1:this._notifyInputValueChanges):this._allowInvalidDate||this._adapter.setInputValue("",t?!1:this._notifyInputValueChanges)}_setValue(t){(!t||this._isDateValueAcceptable(t))&&(this._value=t)}_onDateSelected(t){const e=t.date;if(t.type==="date"&&this._closeCalendar(!0),!this._emitChangeEvent(e))return;const i=this._formatDate(e);this._adapter.setInputValue(i,this._notifyInputValueChanges),this._formatInputValue(),c.isMobile||this._adapter.selectInputText()}_openCalendar(t){super._openCalendar(t);const e=this._getCurrentValue();e&&this._adapter.goToCalendarDate(new Date(e))}_applyMin(){this._value&&!this._isDateValueAcceptable(this._value)&&(this._emitChangeEvent(null,!0),this._setFormattedInputValue()),super._applyMin()}_applyMax(){this._value&&!this._isDateValueAcceptable(this._value)&&(this._emitChangeEvent(null,!0),this._setFormattedInputValue()),super._applyMax()}_applyDisabledDates(){this._value&&!this._isDateValueAcceptable(this._value)&&(this._emitChangeEvent(null,!0),this._setFormattedInputValue())}_applyDisabledDaysOfWeek(){this._value&&!this._isDateValueAcceptable(this._value)&&(this._emitChangeEvent(null,!0),this._setFormattedInputValue())}_handleInput(t){const e=this._getSanitizedDateString(t),i=this._coerceDateValue(e);this._masked&&this._adapter.emitInputEvent(a.events.INPUT,e),!o(i,this._value)&&this._isDateValueAcceptable(i)&&this._emitChangeEvent(i)}_onInputValueChanged(t){const e=this._getSanitizedDateString(t);if(this._masked&&e)return;const i=this._coerceDateValue(e);!o(i,this._value)&&this._isDateValueAcceptable(i)&&(this.value=i,this._emitChangeEvent(this._value))}_applyValue(){this._setFormattedInputValue(),this._open&&this._adapter.setCalendarValue(this._value)}get value(){const t=this._getTypedValue(this._value);return t?m(t)?new Date(t.getTime()):t:null}set value(t){this._value!==t&&(this._setValue(this._coerceDateValue(t)),this._isInitialized&&this._applyValue())}}const F=`<template>
  <slot></slot>
</template>
`,B=":host{display:block}:host([hidden]){display:none}";var U=Object.defineProperty,H=Object.getOwnPropertyDescriptor,$=(n,t,e,i)=>{for(var s=i>1?void 0:i?H(t,e):t,r=n.length-1,u;r>=0;r--)(u=n[r])&&(s=(i?u(t,e,s):u(s))||s);return i&&s&&U(t,e,s),s};let p=class extends S{static get observedAttributes(){return[...Object.values(T.observedAttributes),a.observedAttributes.VALUE]}constructor(){super(),b.define(v),f(this,F,B),this._core=new x(new z(this))}attributeChangedCallback(n,t,e){switch(n){case a.observedAttributes.VALUE:this.value=e;return}super.attributeChangedCallback(n,t,e)}};p=$([E({name:a.elementName,dependencies:[A,C,g,I]})],p);
