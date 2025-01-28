import{C as u,q as _,m as f,H as E,p as b,b as c,o as v,B as C}from"./constants-CFf81ck9.js";import{B as y,c as h}from"./base-adapter-Dh44vCkH.js";import{a as D,W as S}from"./with-default-aria-CAIVLMQ_.js";import{D as l,a as L}from"./dialog-OBCaSmJf.js";import"./backdrop-BfAMrGKq.js";import{g as B}from"./event-utils-C1SDeUaq.js";const p=`${u}bottom-sheet`,m={PERSISTENT:"persistent",MODE:"mode",OPEN:"open",FULLSCREEN:"fullscreen"},H={...m},A={DRAGGING:"dragging",FULLSCREEN:"fullscreen"},O={DIALOG:l.elementName,SURFACE:".surface",CONTENT_BODY:"[forge-bottom-sheet-body]",INITIAL_FOCUS:`:is([autofocus], [${p}-focus])`},N={BEFORE_CLOSE:"forge-bottom-sheet-before-close",CLOSE:"forge-bottom-sheet-close",OPEN:"forge-bottom-sheet-open",READY:"forge-bottom-sheet-ready",DRAG_START:"forge-bottom-sheet-drag-start",DRAGGED:"forge-bottom-sheet-dragged",DRAG_END:"forge-bottom-sheet-drag-end",DRAG_CANCEL:"forge-bottom-sheet-drag-cancel",FULLSCREEN:"forge-bottom-sheet-fullscreen"},P={mode:"nonmodal"},s={elementName:p,observedAttributes:m,attributes:H,classes:A,selectors:O,events:N,defaults:P};class F extends y{constructor(e){super(e),this._dialogElement=_(e,s.selectors.DIALOG),this._surfaceElement=_(e,s.selectors.SURFACE)}setDialogProperty(e,t){this._dialogElement[e]=t}addDialogListener(e,t){this._dialogElement.addEventListener(e,t)}removeDialogListener(e,t){this._dialogElement.removeEventListener(e,t)}initialize(){this._component[f]({role:"dialog",ariaModal:this._component.mode==="modal"||this._component.mode==="inline-modal"?"true":"false"},{setAttribute:!0})}open(){this._dialogElement.mode=this._component.mode,this._dialogElement.open=!0}close(){this._dialogElement.open=!1}trySetInitialFocus(){window.requestAnimationFrame(()=>{if(this._component.open&&this._component.isConnected){const e=this._component.querySelector(s.selectors.INITIAL_FOCUS);e==null||e.focus()}})}isScrollable(){const e=this._getContentElement();return e?e.scrollHeight>e.offsetHeight:!1}isContentChild(e){const t=this._getContentElement();return(t==null?void 0:t.contains(e))??!1}setDragging(e){this._dialogElement.classList.toggle(s.classes.DRAGGING,e)}setFullscreen(e){this._dialogElement.classList.toggle(s.classes.FULLSCREEN,e)}isFullscreen(){return this._dialogElement.classList.contains(s.classes.FULLSCREEN)}setContainerHeight(e){if(e!=null){const t=Math.min(100,100*e/window.innerHeight);this._dialogElement.style.setProperty("--forge-dialog-max-height",`${t}%`)}else this._dialogElement.style.removeProperty("--forge-dialog-max-height")}getContainerBounds(){return this._surfaceElement.getBoundingClientRect()}setDragTargetHandler(e,t){this._surfaceElement.addEventListener(e,t)}removeDragTargetHandler(e,t){this._surfaceElement.removeEventListener(e,t)}setBodyScrollHandler(e){const t=this._getContentElement();t==null||t.addEventListener("scroll",e)}_getContentElement(){return Array.from(E(this._component,s.selectors.CONTENT_BODY,!1))[0]??null}setBodyListener(e,t,o){document.body.addEventListener(e,t,o)}removeBodyListener(e,t){document.body.removeEventListener(e,t)}}class R{constructor(e){this._adapter=e,this._open=!1,this._mode=s.defaults.mode,this._persistent=!1,this._fullscreen=!1,this._isDragging=!1,this._bodyScrollHandler=()=>this._onBodyScroll(),this._dragStartHandler=this._onDragStart.bind(this),this._dragMoveHandler=this._onDragMove.bind(this),this._dragEndHandler=this._onDragEnd.bind(this),this._dragCancelHandler=this._onDragCancel.bind(this),this._dialogDismissListener=this._onDialogDismiss.bind(this),this._dialogBeforeCloseListener=this._onDialogBeforeClose.bind(this)}initialize(){this._adapter.initialize(),this._adapter.setDialogProperty("persistent",this._persistent),this._adapter.setDialogProperty("mode",this._mode),this._adapter.setDialogProperty("fullscreen",this._fullscreen),this._open&&this._openBottomSheet()}_openBottomSheet(){this._fullscreen&&this._adapter.setFullscreen(!0),this._adapter.addDialogListener(l.events.BEFORE_CLOSE,this._dialogBeforeCloseListener),this._adapter.addDialogListener(l.events.CLOSE,this._dialogDismissListener),this._adapter.open(),this._adapter.isScrollable()&&this._initScrollableHandlers(),this._adapter.trySetInitialFocus(),this._adapter.setBodyAttribute(s.attributes.OPEN,"true"),this._adapter.dispatchHostEvent(new CustomEvent(s.events.OPEN,{bubbles:!0}))}_closeBottomSheet(){this._adapter.removeDialogListener(l.events.BEFORE_CLOSE,this._dialogBeforeCloseListener),this._adapter.removeDialogListener(l.events.CLOSE,this._dialogDismissListener),this._adapter.close(),this._adapter.dispatchHostEvent(new CustomEvent(s.events.CLOSE,{bubbles:!0})),this._open=!1,this._adapter.setFullscreen(!1)}_onDialogDismiss(){this._closeBottomSheet()}_onDialogBeforeClose(e){const t=new CustomEvent(s.events.BEFORE_CLOSE,{bubbles:!0,cancelable:!0});this._adapter.dispatchHostEvent(t),t.defaultPrevented&&e.preventDefault()}_initScrollableHandlers(){!this._adapter.isFullscreen()&&this._adapter.isScrollable()&&(this._adapter.setDragTargetHandler("mousedown",this._dragStartHandler),this._adapter.setDragTargetHandler("touchstart",this._dragStartHandler),this._adapter.setBodyScrollHandler(this._bodyScrollHandler))}_onBodyScroll(){!this._adapter.isFullscreen()&&!this._isDragging&&(this._adapter.setFullscreen(!0),this._adapter.dispatchHostEvent(new CustomEvent(s.events.FULLSCREEN,{bubbles:!0,detail:!0})))}_onDragStart(e){if(this._adapter.isFullscreen()){const i=B(e);if(this._adapter.isScrollable()&&this._adapter.isContentChild(i[0]))return}e.stopPropagation();const t=this._adapter.getContainerBounds(),o=e instanceof MouseEvent?e.clientY:e.touches[0].clientY;this._dragContext={top:o-t.top,height:t.height},this._adapter.setBodyListener("mousemove",this._dragMoveHandler,{passive:!1}),this._adapter.setBodyListener("touchmove",this._dragMoveHandler,{passive:!1}),this._adapter.setBodyListener("mouseup",this._dragEndHandler),this._adapter.setBodyListener("touchend",this._dragEndHandler),this._adapter.setBodyListener("touchcancel",this._dragCancelHandler)}_onDragMove(e){if(e.stopPropagation(),e.preventDefault(),!this._dragContext)return;const t=e instanceof MouseEvent?e.clientY:e.touches[0].clientY,o={y:window.innerHeight-t+this._dragContext.top};if(!this._isDragging){this._isDragging=!0;const a=new CustomEvent(s.events.DRAG_START,{bubbles:!0,detail:o,cancelable:!0});if(this._adapter.dispatchHostEvent(a),a.defaultPrevented)return;this._adapter.setDragging(!0)}const i=this._adapter.isFullscreen()?o:{y:Math.max(o.y,this._dragContext.height)};if(!this._lastPosition||i.y!==this._lastPosition.y){const a=new CustomEvent(s.events.DRAGGED,{bubbles:!0,detail:i,cancelable:!0});if(this._adapter.dispatchHostEvent(a),a.defaultPrevented)return;this._lastPosition={...i,clientY:t},this._adapter.setContainerHeight(i.y)}}_onDragEnd(){if(this._lastPosition){const e=this._lastPosition.clientY,t=this._dragContext;if(t){const o=this._adapter.isFullscreen();o&&e>0?this._adapter.setFullscreen(!1):!o&&e<t.height+t.top&&this._adapter.setFullscreen(!0);const i=new CustomEvent(s.events.FULLSCREEN,{bubbles:!0,detail:o});this._adapter.dispatchHostEvent(i)}}if(this._isDragging){const e=new CustomEvent(s.events.DRAG_END,{bubbles:!0});this._adapter.dispatchHostEvent(e)}this._dragComplete()}_onDragCancel(){if(this._isDragging){const e=new CustomEvent(s.events.DRAG_CANCEL,{bubbles:!0});this._adapter.dispatchHostEvent(e)}this._dragComplete()}_dragComplete(){this._adapter.setDragging(!1),this._adapter.removeBodyListener("mousemove",this._dragMoveHandler),this._adapter.removeBodyListener("touchmove",this._dragMoveHandler),this._adapter.removeBodyListener("mouseup",this._dragEndHandler),this._adapter.removeBodyListener("touchend",this._dragEndHandler),this._adapter.removeBodyListener("touchcancel",this._dragCancelHandler),this._adapter.setContainerHeight(null),this._lastPosition=void 0,this._dragContext=void 0,this._isDragging=!1}get open(){return this._open}set open(e){e=!!e,this._open!==e&&(this._open=e,this._adapter.isConnected&&(this._open?this._openBottomSheet():this._closeBottomSheet()),this._adapter.toggleHostAttribute(s.attributes.OPEN,e))}get mode(){return this._mode}set mode(e){if(e||(e=s.defaults.mode),this._mode!==e){this._mode=e,this._adapter.setDialogProperty("mode",this._mode);const t=this._mode!==s.defaults.mode;this._adapter.toggleHostAttribute(s.attributes.MODE,t,this._mode)}}get persistent(){return this._persistent}set persistent(e){e=!!e,this._persistent!==e&&(this._persistent=e,this._adapter.setDialogProperty("persistent",this._persistent),this._adapter.toggleHostAttribute(s.attributes.PERSISTENT,this._persistent))}get fullscreen(){return this._fullscreen}set fullscreen(e){this._fullscreen!==e&&(this._fullscreen=e,this._adapter.setFullscreen(this._fullscreen),this._adapter.toggleHostAttribute(s.attributes.FULLSCREEN,this._fullscreen))}}const w=`<template>
  <forge-dialog class="dialog" preset="bottom-sheet" exportparts="surface" role="presentation">
    <div class="surface" part="root">
      <slot></slot>
    </div>
  </forge-dialog>
</template>
`,T="@keyframes forge-dialog-zoom-in{0%{opacity:var(--_dialog-zoom-opacity);scale:var(--_dialog-zoom-scale)}to{opacity:1;scale:1}}@keyframes forge-dialog-zoom-out{0%{opacity:1;scale:1}to{opacity:var(--_dialog-zoom-opacity);scale:var(--_dialog-zoom-scale)}}@keyframes forge-dialog-fade-in{0%{opacity:var(--_dialog-fade-opacity)}to{opacity:1}}@keyframes forge-dialog-fade-out{0%{opacity:1}to{opacity:var(--_dialog-fade-opacity)}}@keyframes forge-dialog-slide-in{0%{opacity:var(--_dialog-slide-opacity);translate:var(--_dialog-slide-translate)}to{opacity:1;translate:0 0}}@keyframes forge-dialog-slide-out{0%{opacity:1;translate:0 0}to{opacity:var(--_dialog-slide-opacity);translate:var(--_dialog-slide-translate)}}:host{display:contents}:host([hidden]){display:none}.dialog{--_bottom-sheet-desktop-max-width: var(--forge-bottom-sheet-desktop-max-width, 50%);--_bottom-sheet-desktop-max-height: var(--forge-bottom-sheet-desktop-max-height, 50%);--_bottom-sheet-animation-duration: var(--forge-bottom-sheet-animation-duration, var(--forge-animation-duration-medium1, .25s));--_bottom-sheet-animation-timing: var(--forge-bottom-sheet-animation-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)))}.surface{width:100%;display:inline-flex;flex-direction:column}.dialog.dragging::part(surface){transition:none}:host([open]) forge-dialog.fullscreen{--forge-dialog-max-height: 100%}:host([open]) forge-dialog.fullscreen::part(surface){transition:max-height var(--_bottom-sheet-animation-duration) var(--_bottom-sheet-animation-timing)}forge-dialog{--forge-dialog-width: var(--_bottom-sheet-desktop-max-width);--forge-dialog-max-height: var(--_bottom-sheet-desktop-max-height)}@media (max-width: 600px){forge-dialog{--forge-dialog-shape: 0;--forge-dialog-max-width: 100vw;--forge-dialog-width: 100vw}}";var x=Object.defineProperty,M=Object.getOwnPropertyDescriptor,d=(r,e,t,o)=>{for(var i=o>1?void 0:o?M(e,t):e,a=r.length-1,g;a>=0;a--)(g=r[a])&&(i=(o?g(e,t,i):g(i))||i);return o&&i&&x(e,t,i),i};let n=class extends D(S(C)){static get observedAttributes(){return Object.values(s.observedAttributes)}constructor(){super(),b(this,w,T),this._core=new R(new F(this))}connectedCallback(){this._core.initialize()}attributeChangedCallback(r,e,t){switch(r){case s.attributes.OPEN:this.open=c(t);break;case s.attributes.MODE:this.mode=t;break;case s.observedAttributes.PERSISTENT:this.persistent=c(t);break;case s.attributes.FULLSCREEN:this.fullscreen=c(t);break}}};d([h()],n.prototype,"open",2);d([h()],n.prototype,"mode",2);d([h()],n.prototype,"persistent",2);d([h()],n.prototype,"fullscreen",2);n=d([v({name:s.elementName,dependencies:[L]})],n);
