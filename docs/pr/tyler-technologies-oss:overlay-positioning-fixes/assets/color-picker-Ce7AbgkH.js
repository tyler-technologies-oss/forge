import{C as T,l,j as H,B as O,k as P}from"./constants-DHnR0122.js";import{B as V,c as g}from"./base-adapter-B_B1W7NX.js";import{B as _,l as B,c as I}from"./feature-detection-C61kIZu7.js";import{P as G}from"./index-RsKXMDm2.js";import{a as D,I as U}from"./icon-DNSPAaK0.js";import"./index-CiLSBptl.js";import{I as N}from"./icon-button-BgvK8Gih.js";import"./focus-indicator-B_9E-jM6.js";import"./state-layer-DA2sYK0k.js";import{a as M}from"./tooltip-C3leIcs0.js";import"./overlay-B56HkyOr.js";const S=`${T}color-picker`,z={VALUE:"value",ALLOW_OPACITY:"allow-opacity",DEBOUNCE_CHANGE_EVENT:"debounce-change-event"},Z={SLIDER_THUMB_ACTIVE:"forge-color-picker__slider-thumb--active"},W={GRADIENT:".forge-color-picker__gradient",GRADIENT_THUMB:".forge-color-picker__gradient-thumb",PREVIEW_COLOR:".forge-color-picker__color-preview",HEX_INPUT:"#forge-color-picker-hex-input",HUE_SLIDER:".forge-color-picker__hue-slider",HUE_SLIDER_THUMB:"#forge-color-picker-hue-thumb",OPACITY_SLIDER:".forge-color-picker__opacity-slider",OPACITY_SLIDER_THUMB:"#forge-color-picker-opacity-thumb",SLIDER_THUMB:".forge-color-picker__slider-thumb",COLOR_VALUE_HEX_CONTAINER:".forge-color-picker__color-hex",COLOR_VALUE_RGBA_CONTAINER:".forge-color-picker__color-rgba",COLOR_VALUE_HSVA_CONTAINER:".forge-color-picker__color-hsva",TYPE_BUTTON:"#forge-color-picker-type-button",COLOR_VALUE_RGBA_R:"#forge-color-picker-rgba-r-input",COLOR_VALUE_RGBA_G:"#forge-color-picker-rgba-g-input",COLOR_VALUE_RGBA_B:"#forge-color-picker-rgba-b-input",COLOR_VALUE_RGBA_A:"#forge-color-picker-rgba-a-input",COLOR_VALUE_HSVA_H:"#forge-color-picker-hsva-h-input",COLOR_VALUE_HSVA_S:"#forge-color-picker-hsva-s-input",COLOR_VALUE_HSVA_V:"#forge-color-picker-hsva-v-input",COLOR_VALUE_HSVA_A:"#forge-color-picker-hsva-a-input"},$={CHANGE:`${S}-change`},j={CHANGE_EVENT_DEBOUNCE_THRESHOLD:200},o={elementName:S,attributes:z,events:$,classes:Z,selectors:W,numbers:j},L="000000";var h=(i=>(i.HEX="hex",i.RGB="rgb",i.RGBA="rgba",i.HSV="hsv",i.HSVA="hsva",i))(h||{});class X extends V{constructor(e){super(e),this._gradientElement=l(e,o.selectors.GRADIENT),this._previewColorElement=l(e,o.selectors.PREVIEW_COLOR),this._hexInputElement=l(e,o.selectors.HEX_INPUT),this._rgbaInputRElement=l(e,o.selectors.COLOR_VALUE_RGBA_R),this._rgbaInputGElement=l(e,o.selectors.COLOR_VALUE_RGBA_G),this._rgbaInputBElement=l(e,o.selectors.COLOR_VALUE_RGBA_B),this._rgbaInputAElement=l(e,o.selectors.COLOR_VALUE_RGBA_A),this._hsvaInputHElement=l(e,o.selectors.COLOR_VALUE_HSVA_H),this._hsvaInputSElement=l(e,o.selectors.COLOR_VALUE_HSVA_S),this._hsvaInputVElement=l(e,o.selectors.COLOR_VALUE_HSVA_V),this._hsvaInputAElement=l(e,o.selectors.COLOR_VALUE_HSVA_A),this._hueSliderElement=l(e,o.selectors.HUE_SLIDER),this._hueSliderThumbElement=l(e,o.selectors.HUE_SLIDER_THUMB),this._opacitySliderElement=l(e,o.selectors.OPACITY_SLIDER),this._opacitySliderThumbElement=l(e,o.selectors.OPACITY_SLIDER_THUMB),this._hexValueContainerElement=l(e,o.selectors.COLOR_VALUE_HEX_CONTAINER),this._rgbaValueContainerElement=l(e,o.selectors.COLOR_VALUE_RGBA_CONTAINER),this._hsvaValueContainerElement=l(e,o.selectors.COLOR_VALUE_HSVA_CONTAINER),this._typeButtonElement=l(e,o.selectors.TYPE_BUTTON)}setPreviewColor(e){this._previewColorElement.style.backgroundColor=e}setHexInputValue(e){this._hexInputElement.value=e}setRgbaInputValue(e){this._rgbaInputRElement.value=e.r.toString(),this._rgbaInputGElement.value=e.g.toString(),this._rgbaInputBElement.value=e.b.toString(),this._rgbaInputAElement.value=e.a.toString()}setHsvaInputValue(e){this._hsvaInputHElement.value=e.h.toString(),this._hsvaInputSElement.value=e.s.toString(),this._hsvaInputVElement.value=e.v.toString(),this._hsvaInputAElement.value=e.a.toString()}updateA11y(e,t){this._hueSliderThumbElement.setAttribute("aria-valuenow",e.toString()),this._hueSliderThumbElement.setAttribute("aria-valuetext",e.toString()),this._opacitySliderThumbElement.setAttribute("aria-valuenow",t.toString()),this._opacitySliderThumbElement.setAttribute("aria-valuetext",t.toString())}setGradientColor(e){this._gradientElement.style.backgroundColor=e}getHueSliderElement(){return this._hueSliderElement}getOpacitySliderElement(){return this._opacitySliderElement}getGradientElement(){return this._gradientElement}setActiveValueType(e){switch(this._hexValueContainerElement.style.display="none",this._rgbaValueContainerElement.style.display="none",this._hsvaValueContainerElement.style.display="none",e){case h.HEX:this._hexValueContainerElement.style.removeProperty("display");break;case h.RGBA:this._rgbaValueContainerElement.style.removeProperty("display");break;case h.HSVA:this._hsvaValueContainerElement.style.removeProperty("display");break}}focusValueInput(e){switch(e){case h.HEX:this._hexInputElement.focus(),this._hexInputElement.select();break;case h.RGBA:this._rgbaInputRElement.focus(),this._rgbaInputRElement.select();break;case h.HSVA:this._hsvaInputHElement.focus(),this._hsvaInputHElement.select();break}}setTypeClickListener(e){this._typeButtonElement.addEventListener("click",e)}removeTypeClickListener(e){this._typeButtonElement.removeEventListener("click",e)}setHexInputListener(e,t){this._hexInputElement.addEventListener(e,t)}removeHexInputListener(e,t){this._hexInputElement.removeEventListener(e,t)}getHexInputValue(){return this._hexInputElement.value}setRgbaInputListener(e,t){this._rgbaInputRElement.addEventListener(e,t),this._rgbaInputGElement.addEventListener(e,t),this._rgbaInputBElement.addEventListener(e,t),this._rgbaInputAElement.addEventListener(e,t)}removeRgbaInputListener(e,t){this._rgbaInputRElement.removeEventListener(e,t),this._rgbaInputGElement.removeEventListener(e,t),this._rgbaInputBElement.removeEventListener(e,t),this._rgbaInputAElement.removeEventListener(e,t)}getRgbaInputValue(){return{r:parseInt(this._rgbaInputRElement.value,10),g:parseInt(this._rgbaInputGElement.value,10),b:parseInt(this._rgbaInputBElement.value,10),a:parseFloat(this._rgbaInputAElement.value)}}setHsvaInputListener(e,t){this._hsvaInputHElement.addEventListener(e,t),this._hsvaInputSElement.addEventListener(e,t),this._hsvaInputVElement.addEventListener(e,t),this._hsvaInputAElement.addEventListener(e,t)}removeHsvaInputListener(e,t){this._hsvaInputHElement.removeEventListener(e,t),this._hsvaInputSElement.removeEventListener(e,t),this._hsvaInputVElement.removeEventListener(e,t),this._hsvaInputAElement.removeEventListener(e,t)}getHsvaInputValue(){return{h:parseInt(this._hsvaInputHElement.value,10),s:parseInt(this._hsvaInputSElement.value,10),v:parseInt(this._hsvaInputVElement.value,10),a:parseFloat(this._hsvaInputAElement.value)}}toggleOpacityControls(e){e?(this._opacitySliderElement.style.removeProperty("display"),this._rgbaInputAElement.parentElement&&this._rgbaInputAElement.parentElement.style.removeProperty("display"),this._hsvaInputAElement.parentElement&&this._hsvaInputAElement.parentElement.style.removeProperty("display")):(this._opacitySliderElement.style.display="none",this._rgbaInputAElement.parentElement&&(this._rgbaInputAElement.parentElement.style.display="none"),this._hsvaInputAElement.parentElement&&(this._hsvaInputAElement.parentElement.style.display="none"))}}function R(i,e,t){const r=t.getBoundingClientRect();let n=i-r.left,s=e-r.top;return n>r.width?n=r.width:n<0&&(n=0),s>r.height?s=r.height:s<0&&(s=0),{x:n,y:s,height:r.height,width:r.width}}function b(i){let e,t,r;const n=i.h/60,s=i.s/100,a=i.v/100;if(s===0)return e=t=r=a,{r:Math.round(e*255),g:Math.round(t*255),b:Math.round(r*255),a:i.a};const c=Math.floor(n),v=n-c,p=a*(1-s),f=a*(1-s*v),y=a*(1-s*(1-v));switch(c){case 0:e=a,t=y,r=p;break;case 1:e=f,t=a,r=p;break;case 2:e=p,t=a,r=y;break;case 3:e=p,t=f,r=a;break;case 4:e=y,t=p,r=a;break;default:e=a,t=p,r=f}return{r:Math.round(e*255),g:Math.round(t*255),b:Math.round(r*255),a:i.a}}function m(i){return E(i.r)+E(i.g)+E(i.b)+(Math.round(i.a*255)+65536).toString(16).substr(-2)}function E(i){return("0"+i.toString(16)).slice(-2)}function F(i){const e=i.length===3||i.length===4,t=e?`${i.slice(0,1)}${i.slice(0,1)}`:i.slice(0,2),r=e?`${i.slice(1,2)}${i.slice(1,2)}`:i.slice(2,4),n=e?`${i.slice(2,3)}${i.slice(2,3)}`:i.slice(4,6),s=(e?`${i.slice(3,4)}${i.slice(3,4)}`:i.slice(6,8))||"ff";return{r:parseInt(t,16),g:parseInt(r,16),b:parseInt(n,16),a:parseFloat((parseInt(s,16)/255).toFixed(2))}}function K(i){return`rgba(${i.r}, ${i.g}, ${i.b}, ${i.a})`}function C(i,e){let t=i.replace(/^#/,"");return t.length===4?t=t.substring(0,3):t.length===8&&(t=t.substring(0,6)),`#${t}`}function Y(i){const e=i.r/255,t=i.g/255,r=i.b/255,n=Math.max(e,t,r),s=Math.min(e,t,r);let a=n,c=n;const v=n,p=n-s;if(c=n===0?0:p/n,n===s)a=0;else{switch(n){case e:a=(t-r)/p+(t<r?6:0);break;case t:a=(r-e)/p+2;break;case r:a=(e-t)/p+4;break}a/=6}return{h:Math.round(a*360),s:Math.round(c*100),v:Math.round(v*100),a:i.a}}function k(i){if(!i||typeof i!="string")return!1;switch(i.substring(0,1)==="#"&&(i=i.substring(1)),i.length){case 3:return/^[0-9A-F]{3}$/i.test(i);case 4:return/^[0-9A-F]{4}$/i.test(i);case 6:return/^[0-9A-F]{6}$/i.test(i);case 8:return/^[0-9A-F]{8}$/i.test(i);default:return!1}}function x(i){return _(i.r)&&i.r>=0&&i.r<=255&&_(i.g)&&i.g>=0&&i.g<=255&&_(i.b)&&i.b>=0&&i.b<=255&&_(i.a)&&i.a>=0&&i.a<=1}function A(i){return _(i.h)&&i.h>=0&&i.h<=360&&_(i.s)&&i.s>=0&&i.s<=100&&_(i.v)&&i.v>=0&&i.v<=100&&_(i.a)&&i.a>=0&&i.a<=1}class J{constructor(e,t){this._rootElement=e,this._changeListener=t,this._keydownListener=r=>this._onKeydown(r),this._downListener=r=>this._onDown(r),this._moveListener=r=>this._onMove(r),this._upListener=r=>this._onUp(r),this._initialize()}destroy(){this._unlisten()}setValue(e,t){window.requestAnimationFrame(()=>{const r=this._rootElement.getBoundingClientRect();this._xPercent=Math.round(r.width*(e/100)),this._yPercent=r.height-Math.round(r.height*(t/100)),this._setThumbPosition(this._xPercent,this._yPercent)})}_initialize(){this._thumbElement=this._rootElement.querySelector(o.selectors.GRADIENT_THUMB),this._listen(),this._setThumbPosition(this._xPercent,this._yPercent)}_listen(){this._rootElement.addEventListener("keydown",this._keydownListener),this._rootElement.addEventListener("mousedown",this._downListener),this._rootElement.addEventListener("touchstart",this._downListener)}_unlisten(){this._rootElement.removeEventListener("keydown",this._keydownListener),this._rootElement.removeEventListener("mousedown",this._downListener),this._rootElement.removeEventListener("touchstart",this._downListener),document.removeEventListener("mousemove",this._moveListener),document.removeEventListener("touchmove",this._moveListener),document.removeEventListener("mouseup",this._upListener),document.removeEventListener("touchend",this._upListener)}_onKeydown(e){const t=e.key==="Enter"||e.keyCode===13,r=e.key==="ArrowLeft"||e.keyCode===37,n=e.key==="ArrowUp"||e.keyCode===38,s=e.key==="ArrowRight"||e.keyCode===39,a=e.key==="ArrowDown"||e.keyCode===40,c=this._rootElement.getBoundingClientRect();if(a)e.preventDefault(),this._yPercent++;else if(n)e.preventDefault(),this._yPercent--;else if(r)e.preventDefault(),this._xPercent--;else if(s)e.preventDefault(),this._xPercent++;else if(t)e.preventDefault();else return;this._xPercent>c.width?this._xPercent=c.width:this._xPercent<0&&(this._xPercent=0),this._yPercent>c.height?this._yPercent=c.height:this._yPercent<0&&(this._yPercent=0),this._setThumbPosition(this._xPercent,this._yPercent),this._notify()}_onDown(e){e.preventDefault(),document.addEventListener("mousemove",this._moveListener),document.addEventListener("touchmove",this._moveListener),document.addEventListener("mouseup",this._upListener),document.addEventListener("touchend",this._upListener),this._updateThumbPosition(e)}_onMove(e){e.preventDefault(),this._updateThumbPosition(e)}_onUp(e){document.removeEventListener("mousemove",this._moveListener),document.removeEventListener("touchmove",this._moveListener),document.removeEventListener("mouseup",this._upListener),document.removeEventListener("touchend",this._upListener),this._updateThumbPosition(e),this._thumbElement.focus()}_updateThumbPosition(e){const t=/^mouse/.test(e.type),r=t?e.clientX:e.changedTouches[0].clientX,n=t?e.clientY:e.changedTouches[0].clientY,s=this._calculateSliderPercent(r,n);this._setThumbPosition(s.x,s.y),this._xPercent=parseInt((s.x/s.width*100).toString(),10),this._yPercent=Math.abs(parseInt((s.y/s.height*100).toString(),10)-100),this._notify()}_calculateSliderPercent(e,t){return R(e,t,this._rootElement)}_setThumbPosition(e,t){this._thumbElement.style.left=`${e}px`,this._thumbElement.style.top=`${t}px`}_notify(){typeof this._changeListener=="function"&&this._changeListener(this._xPercent,this._yPercent)}}class w{constructor(e,t){this._rootElement=e,this._changeListener=t,this._percent=1,this._min=0,this._max=1,this._step=.01,this._keydownListener=r=>this._onKeydown(r),this._downListener=r=>this._onDown(r),this._moveListener=r=>this._onMove(r),this._upListener=r=>this._onUp(r),this._initialize()}destroy(){this._unlisten()}setValue(e){this._percent=e,this._setThumbPosition(this._percent)}_initialize(){this._thumbElement=this._rootElement.querySelector(o.selectors.SLIDER_THUMB),this._listen(),this._setThumbPosition(this._percent)}_listen(){this._thumbElement.addEventListener("keydown",this._keydownListener),this._rootElement.addEventListener("mousedown",this._downListener),this._rootElement.addEventListener("touchstart",this._downListener)}_unlisten(){this._thumbElement.removeEventListener("keydown",this._keydownListener),this._rootElement.removeEventListener("mousedown",this._downListener),this._rootElement.removeEventListener("touchstart",this._downListener),document.removeEventListener("mousemove",this._moveListener),document.removeEventListener("touchmove",this._moveListener),document.removeEventListener("mouseup",this._upListener),document.removeEventListener("touchend",this._upListener)}_onKeydown(e){const t=e.key==="ArrowLeft"||e.keyCode===37,r=e.key==="ArrowRight"||e.keyCode===39,n=e.key==="Home"||e.keyCode===36,s=e.key==="End"||e.keyCode===35;t?(e.preventDefault(),this._percent-=this._step):r?(e.preventDefault(),this._percent+=this._step):n?(e.preventDefault(),this._percent=this._min):s&&(e.preventDefault(),this._percent=this._max),this._percent<this._min?this._percent=this._min:this._percent>this._max&&(this._percent=this._max),this._setThumbPosition(this._percent),this._notify()}_onDown(e){e.preventDefault(),document.addEventListener("mousemove",this._moveListener),document.addEventListener("touchmove",this._moveListener),document.addEventListener("mouseup",this._upListener),document.addEventListener("touchend",this._upListener),this._updateThumbPosition(e)}_onMove(e){e.preventDefault(),this._thumbElement.classList.add(o.classes.SLIDER_THUMB_ACTIVE),this._updateThumbPosition(e)}_onUp(e){this._thumbElement.classList.remove(o.classes.SLIDER_THUMB_ACTIVE),document.removeEventListener("mousemove",this._moveListener),document.removeEventListener("touchmove",this._moveListener),document.removeEventListener("mouseup",this._upListener),document.removeEventListener("touchend",this._upListener),this._updateThumbPosition(e),this._thumbElement.focus()}_updateThumbPosition(e){const t=/^mouse/.test(e.type)?e.clientX:e.changedTouches[0].clientX;this._percent=this._calculateSliderPercent(t),this._setThumbPosition(this._percent),this._notify()}_calculateSliderPercent(e){const t=R(e,0,this._rootElement);return parseFloat((t.x/t.width).toFixed(2))}_setThumbPosition(e){this._thumbElement.style.left=`${e*100}%`}_notify(){typeof this._changeListener=="function"&&this._changeListener(this._percent)}}class Q{constructor(e){this._adapter=e,this._value=null,this._allowOpacity=!0,this._hex=L,this._hsva={h:0,s:0,v:0,a:1},this._rgba={r:0,g:0,b:0,a:1},this._debounceChangeEvent=!1,this._valueType=h.HEX,this._initialized=!1,this._gradientSliderChangedListener=(t,r)=>this._onGradientSliderChanged(t,r),this._hueSliderChangedListener=t=>this._onHueSliderChanged(t),this._opacitySliderChangedListener=t=>this._onOpacitySliderChanged(t),this._typeClickListener=t=>this._onTypeClicked(t),this._hexInputChangedListener=t=>this._onHexInputChanged(),this._rgbaInputChangedListener=t=>this._onRgbaInputChanged(),this._hsvaInputChangedListener=t=>this._onHsvaInputChanged()}initialize(){this._initialized=!0,this._applyChangeEventTrigger(),this._adapter.setTypeClickListener(this._typeClickListener),this._adapter.setHexInputListener("input",this._hexInputChangedListener),this._adapter.setRgbaInputListener("input",this._rgbaInputChangedListener),this._adapter.setHsvaInputListener("input",this._hsvaInputChangedListener),this._gradientSlider=new J(this._adapter.getGradientElement(),this._gradientSliderChangedListener),this._hueSlider=new w(this._adapter.getHueSliderElement(),this._hueSliderChangedListener),this._opacitySlider=new w(this._adapter.getOpacitySliderElement(),this._opacitySliderChangedListener),this._initializeOpacity(),this._setColorFromHex(),this._adapter.setActiveValueType(this._valueType)}destroy(){this._adapter.removeTypeClickListener(this._typeClickListener),this._adapter.removeHexInputListener("input",this._hexInputChangedListener),this._adapter.removeRgbaInputListener("input",this._hexInputChangedListener),this._adapter.removeHsvaInputListener("input",this._hexInputChangedListener),this._gradientSlider.destroy(),this._hueSlider.destroy(),this._opacitySlider.destroy(),this._initialized=!1}_applyChangeEventTrigger(){this._debounceChangeEvent?this._triggerChangeEvent=B((e,t)=>{this._emitChangeEvent(e,t)},o.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD,!1):this._triggerChangeEvent=(e,t)=>this._emitChangeEvent(e,t)}_initializeOpacity(){this._hsva.a=1,this._adapter.toggleOpacityControls(this._allowOpacity),this._render()}_onTypeClicked(e){this._valueType===h.HEX?this._valueType=h.RGBA:this._valueType===h.RGBA?this._valueType=h.HSVA:this._valueType===h.HSVA&&(this._valueType=h.HEX),this._adapter.setActiveValueType(this._valueType),this._adapter.focusValueInput(this._valueType)}_onHexInputChanged(){const e=this._adapter.getHexInputValue();k(e)&&(this.value=e,this._triggerChangeEvent("input","hex"))}_onRgbaInputChanged(){const e=this._adapter.getRgbaInputValue();x(e)&&(this.value=m(e),this._triggerChangeEvent("input","rgba"))}_onHsvaInputChanged(){const e=this._adapter.getHsvaInputValue();A(e)&&(this.value=m(b(e)),this._triggerChangeEvent("input","hsva"))}_setColorFromHex(){this._rgba=F(this._hex),this._hsva=Y(this._rgba),this._initialized&&(this._gradientSlider.setValue(this._hsva.s,this._hsva.v),this._hueSlider.setValue(parseFloat((this._hsva.h/360).toFixed(2))),this._opacitySlider.setValue(this._hsva.a),this._render())}_onGradientSliderChanged(e,t){this._hsva.s=e,this._hsva.v=t,this._syncColors(),this._render(),this._triggerChangeEvent("slider","gradient")}_onHueSliderChanged(e){this._hsva.h=parseInt((360*e).toString(),10),this._syncColors(),this._setGradientColor(),this._render(),this._triggerChangeEvent("slider","hue")}_onOpacitySliderChanged(e){this._hsva.a=e,this._syncColors(),this._render(),this._triggerChangeEvent("slider","opacity")}_setGradientColor(){const e=b({h:this._hsva.h,s:100,v:100,a:1});this._adapter.setGradientColor(`rgb(${e.r}, ${e.g}, ${e.b})`)}_syncColors(){this._rgba=b(this._hsva),this._hex=m(this._rgba),this._value=this._hex||null}_render(){this._setGradientColor(),this._adapter.setPreviewColor(K(this._rgba)),this._adapter.setHexInputValue(`#${this._hex}`),this._adapter.setRgbaInputValue(this._rgba),this._adapter.setHsvaInputValue(this._hsva),this._adapter.updateA11y(this._hsva.h,Math.round(this._hsva.a*100))}_emitChangeEvent(e,t){const r={type:e,source:t,hex:C(this._hex).replace(/^#/,""),rgba:this._rgba,hsva:this._hsva};this._allowOpacity&&(r.alpha=this._hsva.a),this._adapter.emitHostEvent(o.events.CHANGE,r)}get value(){return C(this._hex)}set value(e){if(this._value!==e){if(this._value=e||L,!k(this._value))throw new Error("Invalid hex value provided.");this._hex=this._value.replace(/^#/,""),this._setColorFromHex(),this._adapter.setHostAttribute(o.attributes.VALUE,this._value)}}get rgba(){return this._rgba?{...this._rgba}:null}set rgba(e){e?x(e)&&(this.value=m(e)):this.value=null}get hsva(){return this._hsva?{...this._hsva}:null}set hsva(e){e?A(e)&&(this.value=m(b(e))):this.value=null}get opacity(){return this._hsva?this._hsva.a:null}set opacity(e){this._hsva.a!==e&&e!=null&&this._allowOpacity&&(e>=0&&e<=1?(this._hsva.a=e,this._syncColors(),this._initialized&&(this._opacitySlider.setValue(this._hsva.a),this._render())):console.warn(`The provided opacity value (${e}) must be between 0 and 1.`))}get allowOpacity(){return this._allowOpacity}set allowOpacity(e){this._allowOpacity=e,this._initialized&&this._initializeOpacity()}get debounceChangeEvent(){return this._debounceChangeEvent}set debounceChangeEvent(e){this._debounceChangeEvent!==e&&(this._debounceChangeEvent=e,this._initialized&&this._applyChangeEventTrigger())}}const q=`<template>
  <div class="forge-color-picker" part="root">
    <input type="color" tabindex="-1" class="forge-color-picker__input" spellcheck="false" autocomplete="off" aria-label="Color picker value" part="input" />
    <div class="forge-color-picker__container" part="container">
      <div class="forge-color-picker__gradient" tabindex="0" part="gradient">
        <div class="forge-color-picker__gradient-color" part="gradient-color"></div>
        <div class="forge-color-picker__gradient-thumb" part="gradient-thumb"></div>
      </div>
      <div class="forge-color-picker__control-preview" part="controls-preview-container">
        <div class="forge-color-picker__controls" part="controls-container">
          <div class="forge-color-picker__slider-control" part="hue-control-container">
            <div class="forge-color-picker__slider forge-color-picker__hue-slider" part="hue-control-slider">
              <div
                class="forge-color-picker__slider-thumb"
                id="forge-color-picker-hue-thumb"
                part="hue-control-slider-thumb"
                tabindex="0"
                role="slider"
                aria-label="Change hue"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow="0"
                aria-orientation="horizontal"
                aria-valuetext="0"></div>
            </div>
          </div>
          <div class="forge-color-picker__slider-control" part="opacity-control-container">
            <div class="forge-color-picker__canvas" part="opacity-control-canvas">
              <div class="forge-color-picker__slider forge-color-picker__opacity-slider" part="opacity-control-slider">
                <div
                  class="forge-color-picker__slider-thumb"
                  id="forge-color-picker-opacity-thumb"
                  part="opacity-control-slider-thumb"
                  tabindex="0"
                  role="slider"
                  aria-label="Change opacity"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="0"
                  aria-orientation="horizontal"
                  aria-valuetext="0"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="forge-color-picker__color-preview-container forge-color-picker__canvas" part="color-preview-container">
          <div class="forge-color-picker__color-preview" part="color-preview"></div>
        </div>
      </div>
      <div class="forge-color-picker__value" part="value-container">
        <div class="forge-color-picker__color-types" part="types-container">
          <div class="forge-color-picker__color-hex" part="hex-type-container">
            <div part="hex-type-label-wrapper">
              <label for="forge-color-picker-hex-input" part="hex-label">HEX</label>
            </div>
            <input
              type="text"
              id="forge-color-picker-hex-input"
              part="hex-input"
              style="width: 88px"
              maxlength="9"
              spellcheck="false"
              autocomplete="off"
              aria-label="HEX value" />
          </div>
          <div class="forge-color-picker__color-rgba" part="rgba-type-container">
            <div part="rgba-type-wrapper-r">
              <label for="forge-color-picker-rgba-r-input" part="rgba-type-label-r">R</label>
              <input
                type="number"
                id="forge-color-picker-rgba-r-input"
                part="rgba-type-input-r"
                min="0"
                max="255"
                maxlength="3"
                autocomplete="off"
                aria-label="Red" />
            </div>
            <div part="rgba-type-wrapper-g">
              <label for="forge-color-picker-rgba-g-input" part="rgba-type-label-g">G</label>
              <input
                type="number"
                id="forge-color-picker-rgba-g-input"
                part="rgba-type-input-g"
                min="0"
                max="255"
                maxlength="3"
                autocomplete="off"
                aria-label="Green" />
            </div>
            <div part="rgba-type-wrapper-b">
              <label for="forge-color-picker-rgba-b-input" part="rgba-type-label-b">B</label>
              <input
                type="number"
                id="forge-color-picker-rgba-b-input"
                part="rgba-type-input-b"
                min="0"
                max="255"
                maxlength="3"
                autocomplete="off"
                aria-label="Blue" />
            </div>
            <div part="rgba-type-wrapper-a">
              <label for="forge-color-picker-rgba-a-input" part="rgba-type-label-a">A</label>
              <input
                type="number"
                id="forge-color-picker-rgba-a-input"
                part="rgba-type-input-a"
                min="0"
                max="1"
                step="0.1"
                maxlength="3"
                autocomplete="off"
                aria-label="Alpha" />
            </div>
          </div>
          <div class="forge-color-picker__color-hsva" part="hsva-type-container">
            <div part="hsva-type-wrapper-h">
              <label for="forge-color-picker-hsva-h-input" part="hsva-type-label-h">H</label>
              <input
                type="number"
                id="forge-color-picker-hsva-h-input"
                part="hsva-type-input-h"
                min="0"
                max="360"
                maxlength="3"
                autocomplete="off"
                aria-label="Hue" />
            </div>
            <div part="hsva-type-wrapper-s">
              <label for="forge-color-picker-hsva-s-input" part="hsva-type-label-s">S</label>
              <input
                type="number"
                id="forge-color-picker-hsva-s-input"
                part="hsva-type-input-s"
                min="0"
                max="100"
                maxlength="3"
                autocomplete="off"
                aria-label="Saturation" />
            </div>
            <div part="hsva-type-wrapper-v">
              <label for="forge-color-picker-hsva-v-input" part="hsva-type-label-v">V</label>
              <input
                type="number"
                id="forge-color-picker-hsva-v-input"
                part="hsva-type-input-v"
                min="0"
                max="100"
                maxlength="3"
                autocomplete="off"
                aria-label="Value" />
            </div>
            <div part="hsva-type-wrapper-a">
              <label for="forge-color-picker-hsva-a-input" part="hsva-type-label-a">A</label>
              <input
                type="number"
                id="forge-color-picker-hsva-a-input"
                part="hsva-type-input-a"
                min="0"
                max="1"
                step="0.1"
                maxlength="3"
                autocomplete="off"
                aria-label="Alpha" />
            </div>
          </div>
        </div>
        <div class="forge-color-picker__type-button" part="type-container">
          <forge-icon-button part="type-button" id="forge-color-picker-type-button" aria-labelledby="type-button-tooltip" part="type-button-element">
            <forge-icon name="unfold_more" part="type-button-icon"></forge-icon>
          </forge-icon-button>
          <forge-tooltip placement="bottom" id="type-button-tooltip">Change color format</forge-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
`,ee='*{box-sizing:border-box}.forge-color-picker{width:var(--forge-color-picker-width, 272px);position:relative;display:inline-block;overflow:hidden}.forge-color-picker__input{height:1px;opacity:0;position:absolute;width:1px}.forge-color-picker__gradient{position:relative;outline:none}.forge-color-picker__gradient-color{background:linear-gradient(to bottom,#0000 0,#000),linear-gradient(to right,#fff 0,#fff0);height:152px}.forge-color-picker__gradient-thumb{border:1px solid #fff;border-radius:50%;cursor:pointer;display:inline-block;height:10px;width:10px;margin-left:-5px;margin-top:-5px;position:absolute;touch-action:none;-webkit-user-select:none;user-select:none;transition:left .2s cubic-bezier(.25,.8,.25,1) 0s,top .2s cubic-bezier(.25,.8,.25,1) 0s}.forge-color-picker__control-preview{display:flex;align-items:center;width:100%;padding:16px}.forge-color-picker__controls{flex:1;margin-right:16px}.forge-color-picker__slider{position:relative}.forge-color-picker__slider-thumb{outline:none;height:16px;width:16px;background-color:#fff;box-shadow:0 1px 2px #0000004d;position:absolute;border-radius:50%;top:calc(50% - 8px);margin-left:-8px;transition:left .4s cubic-bezier(.25,.8,.25,1)}.forge-color-picker__slider-thumb--active{transition:none}.forge-color-picker__slider-thumb:hover{cursor:pointer}.forge-color-picker__color-preview-container{border-radius:50%;box-shadow:0 0 2px #0000008a inset,0 0 2px #0000008a;overflow:hidden}.forge-color-picker__color-preview{height:32px;width:32px;transition:background-color .2s cubic-bezier(.25,.8,.25,1)}.forge-color-picker__value{display:flex;width:100%;align-items:center;padding:0 8px 16px 16px;font-size:12px}.forge-color-picker__color-types{flex:1}.forge-color-picker__color-types label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .8125)));font-weight:var(--forge-typography-label2-font-weight, 400);line-height:var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label2-letter-spacing, .0096153846em);text-transform:var(--forge-typography-label2-text-transform, inherit);text-decoration:var(--forge-typography-label2-text-decoration, inherit);color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}.forge-color-picker__color-types input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, .8125)));font-weight:var(--forge-typography-label2-font-weight, 400);line-height:var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));letter-spacing:var(--forge-typography-label2-letter-spacing, .0096153846em);text-transform:var(--forge-typography-label2-text-transform, inherit);text-decoration:var(--forge-typography-label2-text-decoration, inherit)}.forge-color-picker__color-types input[type=number],.forge-color-picker__color-types input[type=text]{border-color:var(--forge-theme-outline, #e0e0e0);color:var(--forge-theme-on-surface, #000000);background-color:transparent;padding:4px 8px;border-width:1px;border-style:solid;border-radius:4px;box-sizing:border-box;outline:none;transition-property:box-shadow,border-colo;transition-duration:var(--forge-animation-duration-short4, .2s);transition-timing-function:var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1))}.forge-color-picker__color-types input[type=number]:hover,.forge-color-picker__color-types input[type=text]:hover{border-color:var(--forge-theme-text-high, rgba(0, 0, 0, .87))}.forge-color-picker__color-types input[type=number]:focus,.forge-color-picker__color-types input[type=text]:focus{border-color:var(--forge-theme-primary, #3f51b5);box-shadow:0 0 0 1px inset var(--forge-theme-primary, #3f51b5)}.forge-color-picker__color-types input[type=number]{text-align:center;-moz-appearance:textfield}.forge-color-picker__color-types input[type=number]::-webkit-inner-spin-button,.forge-color-picker__color-types input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0}.forge-color-picker__color-hex{display:flex;flex-direction:column;justify-content:center;align-items:space-between}.forge-color-picker__canvas{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNnB4IiBoZWlnaHQ9IjZweCIgdmlld0JveD0iMCAwIDYgNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTAgKDU0OTgzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCA5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikdyb3VwLTkiPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTExIiBmaWxsPSIjRTBFMEUwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMTEtQ29weS0yIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIzIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMTEtQ29weSIgZmlsbD0iI0ZGRkZGRiIgeD0iMyIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMyI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTExLUNvcHktMyIgZmlsbD0iI0UwRTBFMCIgeD0iMyIgeT0iMyIgd2lkdGg9IjMiIGhlaWdodD0iMyI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)}.forge-color-picker__hue-slider{height:8px;background:linear-gradient(to right,red 0,#ff0 16%,#0f0,#0ff,#00f,#f0f 84%,#ff0004)}.forge-color-picker__opacity-slider{height:8px;margin-top:16px;background:linear-gradient(to right,#f000,red)}.forge-color-picker__color-rgba,.forge-color-picker__color-hsva{display:flex}.forge-color-picker__color-rgba div,.forge-color-picker__color-hsva div{margin-right:4px}.forge-color-picker__color-rgba label,.forge-color-picker__color-hsva label{display:block;text-align:center}.forge-color-picker__color-rgba input,.forge-color-picker__color-hsva input{width:44px}:host{display:inline-block}:host([hidden]){display:none}';var te=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,d=(i,e,t,r)=>{for(var n=r>1?void 0:r?ie(e,t):e,s=i.length-1,a;s>=0;s--)(a=i[s])&&(n=(r?a(e,t,n):a(n))||n);return r&&n&&te(e,t,n),n};let u=class extends O{static get observedAttributes(){return[o.attributes.VALUE,o.attributes.ALLOW_OPACITY,o.attributes.DEBOUNCE_CHANGE_EVENT]}constructor(){super(),U.define(G),P(this,q,ee),this._core=new Q(new X(this))}connectedCallback(){this._core.initialize()}disconnectedCallback(){this._core.destroy()}attributeChangedCallback(i,e,t){switch(i){case o.attributes.VALUE:this.value=t;break;case o.attributes.ALLOW_OPACITY:this.allowOpacity=I(t);break;case o.attributes.DEBOUNCE_CHANGE_EVENT:this.debounceChangeEvent=I(t);break}}};d([g()],u.prototype,"value",2);d([g()],u.prototype,"rgba",2);d([g()],u.prototype,"hsva",2);d([g()],u.prototype,"opacity",2);d([g()],u.prototype,"allowOpacity",2);d([g()],u.prototype,"debounceChangeEvent",2);u=d([H({name:o.elementName,dependencies:[N,M,D]})],u);
