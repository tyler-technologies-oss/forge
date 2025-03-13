import{C as w,l as y,B as A,j as L,k as T}from"./constants-9n5_0r7k.js";import{B as x,c as a}from"./base-adapter-B6TJxM93.js";import{I as S,c,b as f}from"./feature-detection-DRCh51Sa.js";import{O as i,V as d,a as k}from"./overlay-D-D6lM0z.js";import{f as D,h as O,c as P}from"./focus-indicator-N8y3p24x.js";import"./index-BgGCUUFB.js";import{W as z}from"./with-longpress-listener-BdUe1dXe.js";import{D as g,t as H}from"./dismissible-stack-C6sDCr8n.js";class R extends x{constructor(e){super(e),this._initializeOverlayElement()}get overlayElement(){return this._overlayElement}}const u=`${w}popover`,E={ARROW:"arrow",ANIMATION_TYPE:"animation-type",TRIGGER_TYPE:"trigger-type",LONGPRESS_DELAY:"longpress-delay",PERSISTENT_HOVER:"persistent-hover",HOVER_DELAY:"hover-delay",HOVER_DISMISS_DELAY:"hover-dismiss-delay",PRESET:"preset"},b={...E,OPEN:"open",HOST:"forge-popover-host",CONSTRAIN_VIEWPORT_WIDTH:"constrain-viewport-width"},I={ARROW:"arrow",EXITING:"exiting"},C={SURFACE:".forge-popover",HOST:`:is(forge-dialog,forge-popover,[${b.HOST}])`},N={ARROW:"arrow"},M={BEFORETOGGLE:`${u}-beforetoggle`,TOGGLE:`${u}-toggle`},F={TRIGGER_TYPE:"click",HOVER_DELAY:0,PRESET:"popover"},t={elementName:u,observedAttributes:E,attributes:b,classes:I,selectors:C,parts:N,events:M,defaults:F},G=500;class Y extends R{constructor(e){super(e),this._surfaceElement=y(this._component,t.selectors.SURFACE)}destroy(){this._surfaceElement.classList.remove(t.classes.EXITING),this.cleanupAnchorElement()}_initializeOverlayElement(){this._overlayElement=y(this._component,i.elementName)}tryLocateAnchorElement(e){this._overlayElement.anchorElement=this._tryFindAnchorElement(e),this._updateAnchorExpandedState(this._overlayElement.open)}initializeAnchorElement(){this._updateAnchorExpandedState(this._overlayElement.open)}cleanupAnchorElement(){this._updateAnchorExpandedState(null)}addAnchorListener(e,o){var r;this._overlayElement.anchorElement instanceof d||(r=this._overlayElement.anchorElement)==null||r.addEventListener(e,o)}removeAnchorListener(e,o){var r;this._overlayElement.anchorElement instanceof d||(r=this._overlayElement.anchorElement)==null||r.removeEventListener(e,o)}addSurfaceListener(e,o){this._surfaceElement.addEventListener(e,o)}removeSurfaceListener(e,o){this._surfaceElement.removeEventListener(e,o)}setOverlayOpen(e){this._surfaceElement.classList.remove(t.classes.EXITING),this._overlayElement.open=e,this._updateAnchorExpandedState(e)}async hide(){return S()?(this._surfaceElement.classList.remove(t.classes.EXITING),this._overlayElement.open=!1,this._updateAnchorExpandedState(!1),Promise.resolve()):(await D(),O(this._surfaceElement)?new Promise(e=>{this._surfaceElement.addEventListener("animationend",()=>{this._surfaceElement.classList.remove(t.classes.EXITING),this._overlayElement.open=!1,this._updateAnchorExpandedState(!1),e()},{once:!0}),this._surfaceElement.classList.add(t.classes.EXITING)}):(this._overlayElement.open=!1,this._updateAnchorExpandedState(!1),Promise.resolve()))}toggleArrow(e){var o;e?(this._arrowElement||(this._arrowElement=document.createElement("div"),this._arrowElement.classList.add(t.classes.ARROW),this._arrowElement.setAttribute("part",t.parts.ARROW)),this._surfaceElement.appendChild(this._arrowElement),this._overlayElement.arrowElement=this._arrowElement):((o=this._arrowElement)==null||o.remove(),this._arrowElement=void 0,this._overlayElement.arrowElement=void 0)}isChildElement(e){return this._component.contains(e)}tryAutofocus(){const e=()=>{if(this._component.open&&this._overlayElement.isConnected&&!this._component.matches(":focus-within")){const o=this._component.querySelector("[autofocus]");if(o)return o.focus(),!0}return!1};e()||window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{e()})})}hasFocus(){return this._component.matches(":focus-within")}captureFocusedElement(){return this._component.ownerDocument.activeElement}_tryFindAnchorElement(e){if(e){const r=this._component.getRootNode().querySelector(`#${e}`);if(r)return r}return this._component.previousElementSibling?this._component.previousElementSibling:null}_updateAnchorExpandedState(e){var o;this._overlayElement.anchorElement&&!(this._overlayElement.anchorElement instanceof d)&&!((o=this.overlayElement.anchorElement)!=null&&o.hasAttribute("aria-hidden"))&&this._overlayElement.anchorElement.setAttribute("aria-expanded",String(!!e))}}class B{constructor(e){this._adapter=e,this._lightDismissListener=o=>this._onOverlayLightDismiss(o)}initialize(){this.persistent||this._adapter.overlayElement.addEventListener(i.events.LIGHT_DISMISS,this._lightDismissListener)}destroy(){this._adapter.overlayElement.removeEventListener(i.events.LIGHT_DISMISS,this._lightDismissListener)}get overlayElement(){return this._adapter.overlayElement}get anchorElement(){return this._adapter.overlayElement.anchorElement}set anchorElement(e){this._adapter.overlayElement.anchorElement=e}get anchor(){return this._adapter.overlayElement.anchor}set anchor(e){this._adapter.overlayElement.anchor=e}get noAnchor(){return this._adapter.overlayElement.noAnchor}set noAnchor(e){this._adapter.overlayElement.noAnchor!==e&&(this._adapter.overlayElement.noAnchor=e,this._adapter.toggleHostAttribute(i.attributes.NO_ANCHOR,this._adapter.overlayElement.noAnchor))}get open(){return this._adapter.overlayElement.open}set open(e){this._adapter.overlayElement.open===e&&(this._adapter.overlayElement.open=e,this._adapter.toggleHostAttribute(i.attributes.OPEN,this._adapter.overlayElement.open))}get inline(){return this._adapter.overlayElement.inline}set inline(e){this._adapter.overlayElement.inline!==e&&(this._adapter.overlayElement.inline=e,this._adapter.toggleHostAttribute(i.attributes.INLINE,this._adapter.overlayElement.inline))}get placement(){return this._adapter.overlayElement.placement}set placement(e){this._adapter.overlayElement.placement!==e&&(this._adapter.overlayElement.placement=e,this._adapter.setHostAttribute(i.attributes.PLACEMENT,this._adapter.overlayElement.placement))}get positionStrategy(){return this._adapter.overlayElement.positionStrategy}set positionStrategy(e){this._adapter.overlayElement.positionStrategy!==e&&(this._adapter.overlayElement.positionStrategy=e,this._adapter.setHostAttribute(i.attributes.POSITION_STRATEGY,this._adapter.overlayElement.positionStrategy))}get offset(){return this._adapter.overlayElement.offset}set offset(e){this._adapter.overlayElement.offset!==e&&(this._adapter.overlayElement.offset=e)}get hide(){return this._adapter.overlayElement.hide}set hide(e){this._adapter.overlayElement.hide!==e&&(this._adapter.overlayElement.hide=e,this._adapter.toggleHostAttribute(i.attributes.HIDE,this._adapter.overlayElement.hide!==i.defaults.HIDE,String(this._adapter.overlayElement.hide)))}get persistent(){return this._adapter.overlayElement.persistent}set persistent(e){this._adapter.overlayElement.persistent!==e&&(this._adapter.overlayElement.persistent=e,this.persistent?this._adapter.overlayElement.removeEventListener(i.events.LIGHT_DISMISS,this._lightDismissListener):this._adapter.overlayElement.addEventListener(i.events.LIGHT_DISMISS,this._lightDismissListener),this._adapter.toggleHostAttribute(i.attributes.PERSISTENT,this._adapter.overlayElement.persistent))}get shift(){return this._adapter.overlayElement.shift}set shift(e){this._adapter.overlayElement.shift!==e&&(this._adapter.overlayElement.shift=e,this._adapter.toggleHostAttribute(i.attributes.SHIFT,this._adapter.overlayElement.shift))}get flip(){return this._adapter.overlayElement.flip}set flip(e){this._adapter.overlayElement.flip!==e&&(this._adapter.overlayElement.flip=e,this._adapter.toggleHostAttribute(i.attributes.FLIP,this._adapter.overlayElement.flip!==i.defaults.FLIP,String(this._adapter.overlayElement.flip)))}get boundary(){return this._adapter.overlayElement.boundary}set boundary(e){this._adapter.overlayElement.boundary!==e&&(this._adapter.overlayElement.boundary=e,this._adapter.toggleHostAttribute(i.attributes.BOUNDARY,!!this._adapter.overlayElement.boundary,this._adapter.overlayElement.boundary))}get boundaryElement(){return this._adapter.overlayElement.boundaryElement}set boundaryElement(e){this._adapter.overlayElement.boundaryElement!==e&&(this._adapter.overlayElement.boundaryElement=e)}get fallbackPlacements(){return this._adapter.overlayElement.fallbackPlacements}set fallbackPlacements(e){this._adapter.overlayElement.fallbackPlacements!==e&&(this._adapter.overlayElement.fallbackPlacements=e)}position(){this._adapter.overlayElement.position()}}class $ extends z(B){constructor(e){super(e),this._anchor=null,this._arrow=!1,this._animationType="zoom",this._triggerTypes=[t.defaults.TRIGGER_TYPE],this._persistentHover=!1,this._hoverDismissDelay=G,this._hoverDelay=t.defaults.HOVER_DELAY,this._preset=t.defaults.PRESET,this._previouslyFocusedElement=null,this._anchorClickListener=this._onAnchorClick.bind(this),this._anchorDoubleClickListener=this._onAnchorDoubleClick.bind(this),this._anchorMouseenterListener=this._onAnchorMouseenter.bind(this),this._anchorMouseleaveListener=this._onAnchorMouseleave.bind(this),this._popoverMouseenterListener=this._onPopoverMouseenter.bind(this),this._popoverMouseleaveListener=this._onPopoverMouseleave.bind(this),this._mousemoveListener=this._onMousemove.bind(this),this._anchorFocusListener=this._onAnchorFocus.bind(this),this._anchorBlurListener=this._onAnchorBlur.bind(this),this._popoverBlurListener=this._onPopoverBlur.bind(this),this._contextmenuListener=this._onContextmenu.bind(this)}initialize(){super.initialize(),this._adapter.tryApplyGlobalConfiguration(["placement","animationType","positionStrategy","shift","hide","flip","boundaryElement","fallbackPlacements","persistent","arrow"]),this.anchorElement||this._adapter.tryLocateAnchorElement(this._anchor),this._initializeTriggerListeners(),this._adapter.initializeAnchorElement()}destroy(){super.destroy(),this._adapter.destroy(),window.clearTimeout(this._hoverTimeout),window.clearTimeout(this._hoverAnchorLeaveTimeout),window.clearTimeout(this._popoverMouseleaveTimeout),this._previouslyFocusedElement=null,this.open&&this._closePopover(),this._removeTriggerListeners()}hideAsync(){return this._closePopover()}async _onOverlayLightDismiss(e){e.preventDefault(),this._requestDismiss(e.detail.reason)}dispatchBeforeToggleEvent({reason:e}){if(this._dispatchBeforetoggleEvent().defaultPrevented)return!1;const r=this._previouslyFocusedElement;return this._closePopover().then(()=>{this._dispatchToggleEvent(),e==="escape"&&r&&this._adapter.hasFocus()&&r.focus()}),!0}_openPopover({dispatchEvents:e=!0}={}){this.open||e&&this._dispatchBeforetoggleEvent().defaultPrevented||(this._previouslyFocusedElement=this._adapter.captureFocusedElement(),this._adapter.setOverlayOpen(!0),this.overlayElement.persistent||g.instance.add(this._adapter.hostElement),this._adapter.toggleHostAttribute(t.attributes.OPEN,this.open),this._adapter.tryAutofocus(),e&&this._dispatchToggleEvent())}async _closePopover(){this.open&&(this._previouslyFocusedElement=null,g.instance.remove(this._adapter.hostElement),this._animationType==="none"?this._adapter.setOverlayOpen(!1):await this._adapter.hide(),this._adapter.toggleHostAttribute(t.attributes.OPEN,this.open))}_dispatchBeforetoggleEvent(){const e=new CustomEvent(t.events.BEFORETOGGLE,{detail:{oldState:this.open?"open":"closed",newState:this.open?"closed":"open"},bubbles:!1,cancelable:!0});return this._adapter.dispatchHostEvent(e),e}_dispatchToggleEvent(){this._adapter.dispatchHostEvent(new CustomEvent(t.events.TOGGLE,{detail:{oldState:this.open?"closed":"open",newState:this.open?"open":"closed"},bubbles:!1}))}_initializeTriggerListeners(){if(this._triggerTypes.includes("manual"))return;let e=[...this._triggerTypes];e.includes("contextmenu")?e=["contextmenu"]:(e.includes("hover")&&e.includes("focus")&&e.splice(e.indexOf("focus"),1),e.includes("click")&&e.includes("doubleclick")&&e.splice(e.indexOf("doubleclick"),1));const o={click:()=>this._adapter.addAnchorListener("click",this._anchorClickListener),hover:()=>{this._adapter.addAnchorListener("mouseenter",this._anchorMouseenterListener),this._adapter.addAnchorListener("focusin",this._anchorFocusListener)},focus:()=>this._adapter.addAnchorListener("focusin",this._anchorFocusListener),longpress:()=>{this._adapter.overlayElement.anchorElement&&!(this._adapter.overlayElement.anchorElement instanceof d)&&this._startLongpressListener(this._adapter.overlayElement.anchorElement)},doubleclick:()=>this._adapter.addAnchorListener("dblclick",this._anchorDoubleClickListener),contextmenu:()=>this._adapter.addDocumentListener("contextmenu",this._contextmenuListener)};e.forEach(r=>{var n;return(n=o[r])==null?void 0:n.call(o)})}_removeTriggerListeners(){const e={click:()=>this._adapter.removeAnchorListener("click",this._anchorClickListener),hover:()=>{this._adapter.removeAnchorListener("mouseenter",this._anchorMouseenterListener),this._adapter.removeAnchorListener("mouseleave",this._anchorMouseleaveListener),this._adapter.removeAnchorListener("focusin",this._anchorFocusListener),this._adapter.removeAnchorListener("focusout",this._anchorBlurListener),this._adapter.removeHostListener("focusout",this._popoverBlurListener),this._tryRemoveHoverListeners()},focus:()=>{this._adapter.removeAnchorListener("focusin",this._anchorFocusListener),this._adapter.removeAnchorListener("focusout",this._anchorBlurListener),this._adapter.removeHostListener("focusout",this._popoverBlurListener)},longpress:()=>{this._adapter.overlayElement.anchorElement&&!(this._adapter.overlayElement.anchorElement instanceof d)&&this._stopLongpressListener(this._adapter.overlayElement.anchorElement)},doubleclick:()=>this._adapter.removeAnchorListener("dblclick",this._anchorDoubleClickListener),contextmenu:()=>this._adapter.removeDocumentListener("contextmenu",this._contextmenuListener)};this._triggerTypes.forEach(o=>{var r;return(r=e[o])==null?void 0:r.call(e)})}_startHoverListeners(){this._adapter.addDocumentListener("mousemove",this._mousemoveListener),this._adapter.addSurfaceListener("mouseenter",this._popoverMouseenterListener),this._adapter.addSurfaceListener("mouseleave",this._popoverMouseleaveListener)}_tryRemoveHoverListeners(){this._adapter.removeDocumentListener("mousemove",this._mousemoveListener),this._adapter.removeSurfaceListener("mouseenter",this._popoverMouseenterListener),this._adapter.removeSurfaceListener("mouseleave",this._popoverMouseleaveListener)}_requestDismiss(e){g.instance.requestDismiss(this._adapter.hostElement,{reason:e})}_requestClose(e){g.instance.dismiss(this._adapter.hostElement,{reason:e})}_onHoverClose(){var e;if(this.open){if(this._currentHoverCoords){const o=document.elementFromPoint(this._currentHoverCoords.x,this._currentHoverCoords.y);if(o&&(this._adapter.isChildElement(o)||!(this._adapter.overlayElement.anchorElement instanceof d)&&((e=this._adapter.overlayElement.anchorElement)==null?void 0:e.contains(o))))return}window.clearTimeout(this._hoverTimeout),this._tryRemoveHoverListeners(),this._requestClose("hover")}}_onAnchorClick(e){this.open?this._requestClose("click"):this._openPopover()}_onAnchorDoubleClick(){this.open?this._requestClose("doubleclick"):this._openPopover()}_onAnchorMouseenter(){window.clearTimeout(this._hoverAnchorLeaveTimeout),this._adapter.overlayElement.open||(this._persistentHover||this._adapter.addAnchorListener("mouseleave",this._anchorMouseleaveListener),this._hoverDelay?this._hoverTimeout=window.setTimeout(()=>{this._openPopover()},this._hoverDelay):this._openPopover())}_onAnchorMouseleave(){this._startHoverListeners(),window.clearTimeout(this._hoverTimeout),this._hoverAnchorLeaveTimeout=window.setTimeout(()=>{this._hoverAnchorLeaveTimeout=void 0,this._onHoverClose()},this._hoverDismissDelay)}_onPopoverMouseenter(){window.clearTimeout(this._hoverAnchorLeaveTimeout),window.clearTimeout(this._popoverMouseleaveTimeout)}_onPopoverMouseleave(){this._popoverMouseleaveTimeout=window.setTimeout(()=>{this._popoverMouseleaveTimeout=void 0,this._onHoverClose()},this._hoverDismissDelay)}_onMousemove(e){this._currentHoverCoords={x:e.pageX,y:e.pageY}}_onAnchorFocus(e){this._adapter.overlayElement.open||(this._adapter.addAnchorListener("focusout",this._anchorBlurListener),this._openPopover())}_onAnchorBlur(e){this._adapter.isChildElement(e.relatedTarget)?this._adapter.addHostListener("focusout",this._popoverBlurListener):this._requestClose("focus")}_onPopoverBlur({relatedTarget:e}){var n,h;const o=this._adapter.hasFocus(),r=!(this._adapter.overlayElement.anchorElement instanceof d)&&(((n=this._adapter.overlayElement.anchorElement)==null?void 0:n.matches(":focus-within"))||((h=this._adapter.overlayElement.anchorElement)==null?void 0:h.contains(e)));!o&&!r&&this._requestClose("focus")}_onLongpress(){this.open||this._openPopover()}_onContextmenu(e){e.preventDefault(),this.anchorElement=d.fromEvent(e),this.open||this._openPopover()}get open(){return this._adapter.overlayElement.open}set open(e){this._adapter.overlayElement.open!==e&&(e?this._openPopover({dispatchEvents:!1}):this._closePopover())}get anchorElement(){return this._adapter.overlayElement.anchorElement}set anchorElement(e){this._adapter.overlayElement.anchorElement!==e&&(this._adapter.isConnected&&(this._removeTriggerListeners(),this._adapter.cleanupAnchorElement()),this._adapter.overlayElement.anchorElement=e,this._adapter.isConnected&&(this._initializeTriggerListeners(),this._adapter.initializeAnchorElement()))}get anchor(){return this._anchor}set anchor(e){this._anchor!==e&&(this._anchor=e,this._adapter.isConnected&&(this._removeTriggerListeners(),this._adapter.cleanupAnchorElement(),this._adapter.tryLocateAnchorElement(this._anchor),this._initializeTriggerListeners(),this._adapter.initializeAnchorElement()))}get arrow(){return this._arrow}set arrow(e){e=!!e,this._arrow!==e&&(this._arrow=e,this._adapter.toggleArrow(e),this._adapter.toggleHostAttribute(t.attributes.ARROW,e))}get animationType(){return this._animationType}set animationType(e){this._animationType!==e&&(this._animationType=e,this._adapter.toggleHostAttribute(t.attributes.ANIMATION_TYPE,!!this._animationType,this._animationType))}get triggerType(){return this._triggerTypes.length===1?this._triggerTypes[0]:this._triggerTypes}set triggerType(e){this._triggerTypes!==e&&(this._adapter.isConnected&&this._removeTriggerListeners(),this._triggerTypes=Array.isArray(e)?e:[e],this._triggerTypes=this._triggerTypes.filter(o=>!!o),this._triggerTypes.length||(this._triggerTypes=[t.defaults.TRIGGER_TYPE]),this._adapter.isConnected&&this._initializeTriggerListeners())}get longpressDelay(){return this._longpressDelay}set longpressDelay(e){this._longpressDelay!==e&&(this._longpressDelay=e,this._adapter.setHostAttribute(t.attributes.LONGPRESS_DELAY,String(this._longpressDelay)))}get persistentHover(){return this._persistentHover}set persistentHover(e){e=!!e,this._persistentHover!==e&&(this._persistentHover=e,this._persistentHover&&this._triggerTypes.includes("hover")&&this._adapter.isConnected&&(this._removeTriggerListeners(),this._initializeTriggerListeners()),this._adapter.toggleHostAttribute(t.attributes.PERSISTENT_HOVER,e))}get hoverDelay(){return this._hoverDelay}set hoverDelay(e){(isNaN(e)||e<0)&&(e=t.defaults.HOVER_DELAY),this._hoverDelay!==e&&(this._hoverDelay=e,this._adapter.setHostAttribute(t.attributes.HOVER_DELAY,String(this._hoverDelay)))}get hoverDismissDelay(){return this._hoverDismissDelay}set hoverDismissDelay(e){this._hoverDismissDelay!==e&&(this._hoverDismissDelay=e,this._adapter.setHostAttribute(t.attributes.HOVER_DISMISS_DELAY,String(this._hoverDismissDelay)))}get preset(){return this._preset??t.defaults.PRESET}set preset(e){if(e=e??t.defaults.PRESET,this._preset!==e){this._preset=e;const o=e!==t.defaults.PRESET;this._adapter.toggleHostAttribute(t.attributes.PRESET,o,this._preset)}}}var q=Object.defineProperty,l=(p,e,o,r)=>{for(var n=void 0,h=p.length-1,_;h>=0;h--)(_=p[h])&&(n=_(e,o,n)||n);return n&&q(e,o,n),n};class s extends A{constructor(){super()}position(){this._core.position()}attributeChangedCallback(e,o,r){switch(e){case i.observedAttributes.ANCHOR:this.anchor=r;break;case i.observedAttributes.NO_ANCHOR:this.noAnchor=c(r);break;case i.observedAttributes.OPEN:this.open=c(r);break;case i.observedAttributes.INLINE:this.inline=c(r);break;case i.observedAttributes.PLACEMENT:this.placement=r;break;case i.observedAttributes.POSITION_STRATEGY:this.positionStrategy=r;break;case i.observedAttributes.HIDE:this.hide=r;break;case i.observedAttributes.PERSISTENT:this.persistent=c(r);break;case i.observedAttributes.SHIFT:this.shift=c(r);break;case i.observedAttributes.FLIP:this.flip=r;break;case i.observedAttributes.BOUNDARY:this.boundary=r;break}}get overlay(){return this._core.overlayElement}}l([a()],s.prototype,"anchorElement");l([a()],s.prototype,"anchor");l([a()],s.prototype,"noAnchor");l([a()],s.prototype,"open");l([a()],s.prototype,"inline");l([a()],s.prototype,"placement");l([a()],s.prototype,"positionStrategy");l([a()],s.prototype,"offset");l([a()],s.prototype,"shift");l([a()],s.prototype,"hide");l([a()],s.prototype,"persistent");l([a()],s.prototype,"flip");l([a()],s.prototype,"boundary");l([a()],s.prototype,"boundaryElement");l([a()],s.prototype,"fallbackPlacements");const W=`<template>
  <forge-overlay exportparts="root:overlay">
    <div class="forge-popover" part="surface">
      <slot></slot>
    </div>
  </forge-overlay>
</template>
`,X='@keyframes zoomin{0%{transform:scale(.8)}to{transform:scale(1)}}@keyframes zoomout{0%{transform:scale(1)}to{transform:scale(.8)}}@keyframes slidein{0%{transform:translate(var(--_popover-slidein-x)) translateY(var(--_popover-slidein-y))}to{transform:translate(0) translateY(0)}}@keyframes slideout{0%{transform:translate(0) translateY(0)}to{transform:translate(var(--_popover-slidein-x)) translateY(var(--_popover-slidein-y))}}@keyframes fadein{0%{opacity:0}to{opacity:1}}@keyframes fadeout{0%{opacity:1}to{opacity:0}}@layer base,animation,preset,reduced-motion;@layer base{:host{display:contents;--forge-theme-surface: var(--forge-theme-surface-bright, #ffffff)}:host([hidden]){display:none}forge-overlay{--_popover-width: var(--forge-popover-width, auto);--_popover-height: var(--forge-popover-height, auto);--_popover-min-width: var(--forge-popover-min-width, none);--_popover-max-width: var(--forge-popover-max-width, none);--_popover-min-height: var(--forge-popover-min-height, none);--_popover-max-height: var(--forge-popover-max-height, none);--_popover-background: var(--forge-popover-background, var(--forge-theme-surface-bright, #ffffff));--_popover-border-radius: var(--forge-popover-border-radius, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));--_popover-box-shadow: var(--forge-popover-box-shadow, var(--forge-theme-surface-bright-shadow, 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12)));--_popover-border-width: var(--forge-popover-border-width, 0);--_popover-border-style: var(--forge-popover-border-style, solid);--_popover-border-color: var(--forge-popover-border-color, var(--forge-theme-outline, #e0e0e0));--_popover-overflow: var(--forge-popover-overflow, initial);--_popover-arrow-size: var(--forge-popover-arrow-size, 12px);--_popover-arrow-height: var(--forge-popover-arrow-height, var(--_popover-arrow-size));--_popover-arrow-width: var(--forge-popover-arrow-width, var(--_popover-arrow-size));--_popover-arrow-background-color: var(--forge-popover-arrow-background-color, var(--_popover-background));--_popover-arrow-top-rotation: var(--forge-popover-arrow-top-rotation, 135deg);--_popover-arrow-right-rotation: var(--forge-popover-arrow-right-rotation, 225deg);--_popover-arrow-bottom-rotation: var(--forge-popover-arrow-bottom-rotation, 315deg);--_popover-arrow-left-rotation: var(--forge-popover-arrow-left-rotation, 45deg);--_popover-arrow-border-width: var(--forge-popover-arrow-border-width, var(--forge-border-thin, 1px));--_popover-animation-enter-duration: var(--forge-popover-animation-enter-duration, var(--forge-animation-duration-short3, .15s));--_popover-animation-enter-timing: var(--forge-popover-animation-enter-timing, var(--forge-animation-easing-decelerate, cubic-bezier(0, 0, 0, 1)));--_popover-animation-exit-duration: var(--forge-popover-animation-exit-duration, var(--forge-animation-duration-short2, .1s));--_popover-animation-exit-timing: var(--forge-popover-animation-exit-timing, var(--forge-animation-easing-accelerate, cubic-bezier(.3, 0, 1, 1)));--_popover-zoom-enter-duration: var(--forge-popover-zoom-enter-duration, var(--_popover-animation-enter-duration));--_popover-zoom-enter-timing: var(--forge-popover-zoom-enter-timing, var(--_popover-animation-enter-timing));--_popover-zoom-exit-duration: var(--forge-popover-zoom-exit-duration, var(--_popover-animation-exit-duration));--_popover-zoom-exit-timing: var(--forge-popover-zoom-exit-timing, var(--_popover-animation-exit-timing));--_popover-slide-enter-duration: var(--forge-popover-slide-enter-duration, var(--_popover-animation-enter-duration));--_popover-slide-enter-timing: var(--forge-popover-slide-enter-timing, var(--_popover-animation-enter-timing));--_popover-slide-exit-duration: var(--forge-popover-slide-exit-duration, var(--_popover-animation-exit-duration));--_popover-slide-exit-timing: var(--forge-popover-slide-exit-timing, var(--_popover-animation-exit-timing));--_popover-slide-offset: var(--forge-popover-slide-offset, 24px);--_popover-fade-enter-duration: var(--forge-popover-fade-enter-duration, var(--forge-animation-duration-medium2, .3s));--_popover-fade-enter-timing: var(--forge-popover-fade-enter-timing, var(--_popover-animation-enter-timing));--_popover-fade-exit-duration: var(--forge-popover-fade-exit-duration, var(--_popover-animation-exit-duration));--_popover-fade-exit-timing: var(--forge-popover-fade-exit-timing, var(--_popover-animation-exit-timing));--_popover-position-inline-start: var(--forge-popover-position-inline-start, auto);--_popover-position-inline-end: var(--forge-popover-position-inline-end, auto);--_popover-position-block-start: var(--forge-popover-position-block-start, auto);--_popover-position-block-end: var(--forge-popover-position-block-end, auto);--_popover-preset-dropdown-max-height: var(--forge-popover-preset-dropdown-max-height, 256px);--_popover-preset-dropdown-overflow: var(--forge-popover-preset-dropdown-overflow, auto visible);--_popover-preset-dropdown-padding-block: var(--forge-popover-preset-dropdown-padding-block, var(--forge-spacing-xsmall, 8px));--_popover-preset-list-padding-block: var(--forge-popover-preset-list-padding-block, var(--forge-spacing-xsmall, 8px))}.forge-popover{--_popover-arrow-translate-x: 0;--_popover-arrow-translate-y: 0;--_popover-arrow-rotation: 0;--_popover-slidein-x: 0;--_popover-slidein-y: 0;--_popover-zoomin-origin: 50% 50% 0;--_popover-arrow-clip-path: polygon(calc(var(--_popover-border-width) * -1) calc(var(--_popover-border-width) * -1), calc(100% + var(--_popover-border-width)) calc(var(--_popover-border-width) * -1), calc(100% + var(--_popover-border-width)) calc(100% + var(--_popover-border-width)))}.forge-popover{position:relative;overflow:var(--_popover-overflow);box-sizing:border-box;background:var(--_popover-background);border-radius:var(--_popover-border-radius);box-shadow:var(--_popover-box-shadow);border-width:var(--_popover-border-width);border-style:var(--_popover-border-style);border-color:var(--_popover-border-color);width:var(--_popover-width);height:var(--_popover-height);min-width:var(--_popover-min-width);max-width:var(--_popover-max-width);min-height:var(--_popover-min-height);max-height:var(--_popover-max-height)}.forge-popover::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.forge-popover::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-popover::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.forge-popover::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.forge-popover::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.forge-popover::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}:host([open][no-anchor]) forge-overlay{--forge-overlay-position-inline-start: var(--_popover-position-inline-start);--forge-overlay-position-inline-end: var(--_popover-position-inline-end);--forge-overlay-position-block-start: var(--_popover-position-block-start);--forge-overlay-position-block-end: var(--_popover-position-block-end)}:host([arrow]) .forge-popover{--_popover-border-width: var(--_popover-arrow-border-width)}:host([arrow]) .arrow{position:absolute;background-color:var(--_popover-arrow-background-color);height:var(--_popover-arrow-height);width:var(--_popover-arrow-width);box-shadow:var(--_popover-box-shadow);border-width:var(--_popover-border-width);border-style:var(--_popover-border-style);border-color:var(--_popover-border-color);transform:translate(var(--_popover-arrow-translate-x),var(--_popover-arrow-translate-y)) rotate(var(--_popover-arrow-rotation));clip-path:var(--_popover-arrow-clip-path)}:host([arrow]) forge-overlay[position-placement^=top] .arrow{--_popover-arrow-translate-y: var(--forge-popover-arrow-translate-y, calc(var(--_popover-border-width) * -1));--_popover-arrow-rotation: var(--forge-popover-arrow-rotation, var(--_popover-arrow-top-rotation))}:host([arrow]) forge-overlay[position-placement^=right] .arrow{--_popover-arrow-translate-x: var(--forge-popover-arrow-translate-x, var(--_popover-border-width));--_popover-arrow-rotation: var(--forge-popover-arrow-rotation, var(--_popover-arrow-right-rotation))}:host([arrow]) forge-overlay[position-placement^=bottom] .arrow{--_popover-arrow-translate-y: var(--forge-popover-arrow-translate-y, var(--_popover-border-width));--_popover-arrow-rotation: var(--forge-popover-arrow-rotation, var(--_popover-arrow-bottom-rotation))}:host([arrow]) forge-overlay[position-placement^=left] .arrow{--_popover-arrow-translate-x: var(--forge-popover-arrow-translate-x, calc(var(--_popover-border-width) * -1));--_popover-arrow-rotation: var(--forge-popover-arrow-rotation, var(--_popover-arrow-left-rotation))}}@layer preset{:host([preset=dropdown]) .forge-popover{--_popover-max-height: var(--_popover-preset-dropdown-max-height);--_popover-overflow: var(--_popover-preset-dropdown-overflow);padding-block:var(--_popover-preset-dropdown-padding-block)}:host([preset=list]) .forge-popover{padding-block:var(--_popover-preset-list-padding-block)}:host([constrain-viewport-width]) .forge-popover{--_popover-max-width: var(--forge-popover-max-width, 100vw)}}@layer animation{:host(:not([animation-type])) .forge-popover,:host([animation-type=zoom]) .forge-popover{animation-duration:var(--_popover-zoom-enter-duration);animation-timing-function:var(--_popover-zoom-enter-timing);animation-name:fadein,zoomin;transform-origin:var(--_popover-zoomin-origin)}:host(:not([animation-type])) forge-overlay[open][position-placement^=top]:not([position-placement*="-"]) .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=top]:not([position-placement*="-"]) .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, bottom center)}:host(:not([animation-type])) forge-overlay[open][position-placement^=top][position-placement$=-start] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=top][position-placement$=-start] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, bottom left)}:host(:not([animation-type])) forge-overlay[open][position-placement^=top][position-placement$=-end] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=top][position-placement$=-end] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, bottom right)}:host(:not([animation-type])) forge-overlay[open][position-placement^=right]:not([position-placement*="-"]) .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=right]:not([position-placement*="-"]) .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, left center)}:host(:not([animation-type])) forge-overlay[open][position-placement^=right][position-placement$=-start] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=right][position-placement$=-start] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, left top)}:host(:not([animation-type])) forge-overlay[open][position-placement^=right][position-placement$=-end] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=right][position-placement$=-end] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, left bottom)}:host(:not([animation-type])) forge-overlay[open][position-placement^=bottom]:not([position-placement*="-"]) .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=bottom]:not([position-placement*="-"]) .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, top center)}:host(:not([animation-type])) forge-overlay[open][position-placement^=bottom][position-placement$=-start] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=bottom][position-placement$=-start] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, top left)}:host(:not([animation-type])) forge-overlay[open][position-placement^=bottom][position-placement$=-end] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=bottom][position-placement$=-end] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, top right)}:host(:not([animation-type])) forge-overlay[open][position-placement^=left]:not([position-placement*="-"]) .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=left]:not([position-placement*="-"]) .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, right center)}:host(:not([animation-type])) forge-overlay[open][position-placement^=left][position-placement$=-start] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=left][position-placement$=-start] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, right top)}:host(:not([animation-type])) forge-overlay[open][position-placement^=left][position-placement$=-end] .forge-popover,:host([animation-type=zoom]) forge-overlay[open][position-placement^=left][position-placement$=-end] .forge-popover{--_popover-zoomin-origin: var(--forge-popover-zoomin-origin, right bottom)}:host(:not([animation-type])) forge-overlay[open] .forge-popover.exiting,:host([animation-type=zoom]) forge-overlay[open] .forge-popover.exiting{animation-duration:var(--_popover-zoom-exit-duration);animation-timing-function:var(--_popover-zoom-exit-timing);animation-name:fadeout,zoomout}:host([animation-type=slide]) .forge-popover{animation-duration:var(--_popover-slide-enter-duration);animation-timing-function:var(--_popover-slide-enter-timing);animation-name:fadein,slidein}:host([animation-type=slide]) forge-overlay[open][position-placement^=top] .forge-popover{--_popover-slidein-y: var(--forge-popover-slidein-y, var(--_popover-slide-offset))}:host([animation-type=slide]) forge-overlay[open][position-placement^=right] .forge-popover{--_popover-slidein-x: var(--forge-popover-slidein-x, calc(var(--_popover-slide-offset) * -1))}:host([animation-type=slide]) forge-overlay[open][position-placement^=bottom] .forge-popover{--_popover-slidein-y: var(--forge-popover-slidein-y, calc(var(--_popover-slide-offset) * -1))}:host([animation-type=slide]) forge-overlay[open][position-placement^=left] .forge-popover{--_popover-slidein-x: var(--forge-popover-slidein-x, var(--_popover-slide-offset))}:host([animation-type=slide]) forge-overlay[open] .forge-popover.exiting{animation-duration:var(--_popover-slide-exit-duration);animation-timing-function:var(--_popover-slide-exit-timing);animation-name:fadeout,slideout}:host([animation-type=fade]) .forge-popover{animation-duration:var(--_popover-fade-enter-duration);animation-timing-function:var(--_popover-fade-enter-timing);animation-name:fadein}:host([animation-type=fade]) .forge-popover.exiting{animation-duration:var(--_popover-fade-exit-duration);animation-timing-function:var(--_popover-fade-exit-timing);animation-name:fadeout}}forge-overlay[clipped-x] .forge-popover{width:auto;min-width:0;max-width:100vw;overflow-x:auto}forge-overlay[clipped-y] .forge-popover{height:auto;min-height:0;max-height:100vh;overflow-y:auto}@layer reduced-motion{@media (prefers-reduced-motion: reduce){.forge-popover,.forge-popover.exiting{animation:none}}}';var j=Object.defineProperty,U=Object.getOwnPropertyDescriptor,m=(p,e,o,r)=>{for(var n=r>1?void 0:r?U(e,o):e,h=p.length-1,_;h>=0;h--)(_=p[h])&&(n=(r?_(e,o,n):_(n))||n);return r&&n&&j(e,o,n),n};let v=class extends s{static get observedAttributes(){return[...Object.values(i.observedAttributes),...Object.values(t.observedAttributes)]}[H](p){return this._core.dispatchBeforeToggleEvent(p)}constructor(){super(),T(this,W,X),this._core=new $(new Y(this))}connectedCallback(){this._core.initialize()}disconnectedCallback(){this._core.destroy()}attributeChangedCallback(p,e,o){switch(p){case t.observedAttributes.ARROW:this.arrow=c(o);return;case t.observedAttributes.ANIMATION_TYPE:this.animationType=o;return;case t.observedAttributes.TRIGGER_TYPE:this.triggerType=o!=null&&o.trim()?P(o):t.defaults.TRIGGER_TYPE;return;case t.observedAttributes.LONGPRESS_DELAY:this.longpressDelay=f(o);return;case t.observedAttributes.PERSISTENT_HOVER:this.persistentHover=c(o);return;case t.observedAttributes.HOVER_DELAY:this.hoverDelay=f(o);return;case t.observedAttributes.HOVER_DISMISS_DELAY:this.hoverDismissDelay=f(o);return;case t.observedAttributes.PRESET:this.preset=o;return}super.attributeChangedCallback(p,e,o)}hideAsync(){return this._core.hideAsync()}};m([a()],v.prototype,"arrow",2);m([a()],v.prototype,"animationType",2);m([a()],v.prototype,"triggerType",2);m([a()],v.prototype,"longpressDelay",2);m([a()],v.prototype,"persistentHover",2);m([a()],v.prototype,"hoverDelay",2);m([a()],v.prototype,"hoverDismissDelay",2);m([a()],v.prototype,"preset",2);v=m([L({name:t.elementName,dependencies:[k]})],v);export{v as P,t as a};
