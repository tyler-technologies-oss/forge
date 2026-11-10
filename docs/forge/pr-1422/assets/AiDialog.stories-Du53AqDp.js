import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as u}from"./decorators-Ci1onliJ.js";import{n as d}from"./when-Daf2bbVy.js";import{i as f,n as p,t as m}from"./ref-CKV-hb40.js";import{t as h}from"./ai-chat-interface-CAxWu6mk.js";import{t as g}from"./ai-chat-header-3ROKo4HO.js";import{t as _}from"./ai-prompt-iYuT5w8U.js";import{t as v}from"./ai-user-message-N-i96lpR.js";import{t as y}from"./ai-response-message-ByBw4OFQ.js";import{t as b}from"./ai-modal-CbaYmrX5.js";import{n as x,t as S}from"./drag-controller-CsAQOv2H.js";import{t as C}from"./ai-fab-vpZj4hbJ.js";var w;function T(){return(T=e((()=>{w=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-icon-button {
  --_icon-button-display:var(--forge-icon-button-display, inline-flex);
  --_icon-button-size:var(--forge-icon-button-size, 48px);
  --_icon-button-gap:var(--forge-icon-button-gap, 0);
  --_icon-button-icon-color:var(--forge-icon-button-icon-color, currentColor);
  --_icon-button-background-color:var(--forge-icon-button-background-color, none);
  --_icon-button-icon-size:var(--forge-icon-button-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1.5));
  --_icon-button-cursor:var(--forge-icon-button-cursor, pointer);
  --_icon-button-padding:var(--forge-icon-button-padding, var(--forge-spacing-xxsmall, 4px));
  --_icon-button-border:var(--forge-icon-button-border, none);
  --_icon-button-shadow:var(--forge-icon-button-shadow, none);
  --_icon-button-transition-duration:var(--forge-icon-button-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_icon-button-transition-timing:var(--forge-icon-button-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_icon-button-shape:var(--forge-icon-button-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_icon-button-shape-start-start:var(--forge-icon-button-shape-start-start, var(--_icon-button-shape));
  --_icon-button-shape-start-end:var(--forge-icon-button-shape-start-end, var(--_icon-button-shape));
  --_icon-button-shape-end-start:var(--forge-icon-button-shape-end-start, var(--_icon-button-shape));
  --_icon-button-shape-end-end:var(--forge-icon-button-shape-end-end, var(--_icon-button-shape));
  --_icon-button-shape-squared:var(--forge-icon-button-shape-squared, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_icon-button-outlined-border-width:var(--forge-icon-button-outlined-border-width, 1px);
  --_icon-button-outlined-border-style:var(--forge-icon-button-outlined-border-style, solid);
  --_icon-button-outlined-border-color:var(--forge-icon-button-outlined-border-color, var(--_icon-button-icon-color));
  --_icon-button-tonal-icon-color:var(--forge-icon-button-tonal-icon-color, var(--forge-theme-on-primary-container, #222c62));
  --_icon-button-tonal-background-color:var(--forge-icon-button-tonal-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-filled-icon-color:var(--forge-icon-button-filled-icon-color, var(--forge-theme-on-primary, #ffffff));
  --_icon-button-filled-background-color:var(--forge-icon-button-filled-background-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-raised-shadow:var(--forge-icon-button-raised-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-hover-shadow:var(--forge-icon-button-raised-hover-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-active-shadow:var(--forge-icon-button-raised-active-shadow, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-disabled-shadow:var(--forge-icon-button-raised-disabled-shadow, none);
  --_icon-button-density-small-size:var(--forge-icon-button-density-small-size, 24px);
  --_icon-button-density-small-padding:var(--forge-icon-button-density-small-padding, var(--forge-spacing-xxxsmall, 2px));
  --_icon-button-density-small-icon-size:var(--forge-icon-button-density-small-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1.125));
  --_icon-button-density-medium-size:var(--forge-icon-button-density-medium-size, 36px);
  --_icon-button-density-medium-padding:var(--forge-icon-button-density-medium-padding, var(--forge-spacing-xxsmall, 4px));
  --_icon-button-density-large-size:var(--forge-icon-button-density-large-size, var(--_icon-button-size));
  --_icon-button-toggle-on-background-color:var(--forge-icon-button-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-toggle-on-icon-color:var(--forge-icon-button-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-outlined-toggle-on-background-color:var(--forge-icon-button-outlined-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-outlined-toggle-on-icon-color:var(--forge-icon-button-outlined-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-tonal-toggle-background-color:var(--forge-icon-button-tonal-toggle-background-color, var(--forge-theme-surface-container-low, #ebebeb));
  --_icon-button-tonal-toggle-on-background-color:var(--forge-icon-button-tonal-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-tonal-toggle-on-icon-color:var(--forge-icon-button-tonal-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-background-color:var(--forge-icon-button-filled-toggle-background-color, var(--forge-theme-surface-container-low, #ebebeb));
  --_icon-button-filled-toggle-icon-color:var(--forge-icon-button-filled-toggle-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-on-background-color:var(--forge-icon-button-filled-toggle-on-background-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-on-icon-color:var(--forge-icon-button-filled-toggle-on-icon-color, var(--forge-theme-on-primary, #ffffff));
  --_icon-button-disabled-cursor:var(--forge-icon-button-disabled-cursor, not-allowed);
  --_icon-button-disabled-opacity:var(--forge-icon-button-disabled-opacity, 0.38);
  --_icon-button-popover-icon-padding:var(--forge-icon-button-popover-icon-padding, var(--forge-spacing-xsmall, 8px));
  --_icon-button-focus-indicator-color:var(--forge-icon-button-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
}

.forge-icon-button {
  display: var(--_icon-button-display);
  position: relative;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  z-index: 0;
  display: var(--_icon-button-display);
  align-items: center;
  justify-content: center;
  gap: var(--_icon-button-gap);
  box-sizing: border-box;
  height: var(--_icon-button-density-large-size);
  min-width: var(--_icon-button-density-large-size);
  border: var(--_icon-button-border);
  border-start-start-radius: var(--_icon-button-shape-start-start);
  border-start-end-radius: var(--_icon-button-shape-start-end);
  border-end-start-radius: var(--_icon-button-shape-end-start);
  border-end-end-radius: var(--_icon-button-shape-end-end);
  padding: var(--_icon-button-padding);
  box-shadow: var(--_icon-button-shadow);
  color: var(--_icon-button-icon-color);
  background: var(--_icon-button-background-color);
  font-size: var(--_icon-button-icon-size);
  cursor: var(--_icon-button-cursor);
  user-select: none;
  transition-property: box-shadow, background;
  transition-duration: var(--_icon-button-transition-duration);
  transition-timing-function: var(--_icon-button-transition-timing);
}

.forge-icon-button img, .forge-icon-button svg {
  height: var(--_icon-button-icon-size);
  width: var(--_icon-button-icon-size);
}

.forge-icon-button svg {
  fill: currentColor;
}

.forge-icon-button:not(:disabled) {
  --_state-layer-display:var(--forge-state-layer-display, flex);
  --_state-layer-color:var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color:var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity:var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color:var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration:var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration:var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration:var(--forge-state-layer-animation-duration, 375ms);
}

.forge-icon-button:not(:disabled)::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration:var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}

.forge-icon-button:not(:disabled):hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}

.forge-icon-button:not(:disabled):active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.18);
}

.forge-icon-button:not(:disabled) {
  --forge-state-layer-color: var(--_icon-button-icon-color);
}

@keyframes forge-focus-indicator-outward-grow {
  from {
    outline-width: 0;
  }
  to {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-outward-shrink {
  from {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-grow {
  from {
    border-width: 0;
  }
  to {
    border-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-shrink {
  from {
    border-width: var(--_focus-indicator-active-width);
  }
}
.forge-icon-button:not(:disabled) {
  outline: none;
}

.forge-icon-button:not(:disabled):focus-visible::after {
  --_focus-indicator-display:var(--forge-focus-indicator-display, flex);
  --_focus-indicator-width:var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
  --_focus-indicator-active-width:var(--forge-focus-indicator-active-width, 6px);
  --_focus-indicator-color:var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
  --_focus-indicator-shape:var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
  --_focus-indicator-duration:var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
  --_focus-indicator-easing:var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
  --_focus-indicator-shape-start-start:var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
  --_focus-indicator-shape-start-end:var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-end:var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-start:var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
  --_focus-indicator-outward-offset:var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
  --_focus-indicator-inward-offset:var(--forge-focus-indicator-inward-offset, 0px);
  --_focus-indicator-offset-block:var(--forge-focus-indicator-offset-block, 0);
  --_focus-indicator-offset-inline:var(--forge-focus-indicator-offset-inline, 0);
}

.forge-icon-button:not(:disabled):focus-visible::after {
  animation-delay: 0s, calc(var(--_focus-indicator-duration) * 0.25);
  animation-duration: calc(var(--_focus-indicator-duration) * 0.25), calc(var(--_focus-indicator-duration) * 0.75);
  animation-timing-function: var(--_focus-indicator-easing);
  box-sizing: border-box;
  color: var(--_focus-indicator-color);
  display: none;
  pointer-events: none;
  position: absolute;
  margin-block: var(--_focus-indicator-offset-block);
  margin-inline: var(--_focus-indicator-offset-inline);
  animation-name: forge-focus-indicator-outward-grow, forge-focus-indicator-outward-shrink;
  border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) + var(--_focus-indicator-outward-offset));
  border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) + var(--_focus-indicator-outward-offset));
  border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) + var(--_focus-indicator-outward-offset));
  border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) + var(--_focus-indicator-outward-offset));
  inset: calc(-1 * var(--_focus-indicator-outward-offset));
  outline: var(--_focus-indicator-width) solid currentColor;
  content: "";
  display: block;
}

.forge-icon-button:not(:disabled) {
  --forge-focus-indicator-color: var(--_icon-button-focus-indicator-color);
  --forge-focus-indicator-shape: var(--_icon-button-shape);
}

.forge-icon-button:not(:disabled):where(.forge-icon-button--text, :not(:where(.forge-icon-button--outlined, .forge-icon-button--tonal, .forge-icon-button--filled, .forge-icon-button--raised))) {
  --forge-focus-indicator-outward-offset: 0px;
}

.forge-icon-button--outlined {
  border-width: var(--_icon-button-outlined-border-width);
  border-style: var(--_icon-button-outlined-border-style);
  border-color: var(--_icon-button-outlined-border-color);
}

.forge-icon-button--tonal {
  --_icon-button-icon-color:var(--_icon-button-tonal-icon-color);
  --_icon-button-background-color:var(--_icon-button-tonal-background-color);
}

.forge-icon-button--filled, .forge-icon-button--raised {
  --_icon-button-icon-color:var(--_icon-button-filled-icon-color);
  --_icon-button-background-color:var(--_icon-button-filled-background-color);
}

.forge-icon-button--raised {
  --_icon-button-shadow:var(--_icon-button-raised-shadow);
}

.forge-icon-button--raised:hover {
  --_icon-button-raised-shadow:var(--_icon-button-raised-hover-shadow);
}

.forge-icon-button--raised:active {
  --_icon-button-raised-shadow:var(--_icon-button-raised-active-shadow);
}

.forge-icon-button--squared {
  --_icon-button-shape:var(--_icon-button-shape-squared);
}

.forge-icon-button--small {
  --_icon-button-size:var(--_icon-button-density-small-size);
  --_icon-button-icon-size:var(--_icon-button-density-small-icon-size);
  --_icon-button-padding:var(--_icon-button-density-small-padding);
}

.forge-icon-button--small > * {
  font-size: var(--_icon-button-density-small-icon-size);
}

.forge-icon-button--medium {
  --_icon-button-size:var(--_icon-button-density-medium-size);
  --_icon-button-padding:var(--_icon-button-density-medium-padding);
}

.forge-icon-button:disabled {
  pointer-events: none;
  opacity: var(--_icon-button-disabled-opacity);
  pointer-events: auto;
  cursor: not-allowed;
}

.forge-icon-button forge-circular-progress {
  --forge-circular-progress-indicator-color: var(--_icon-button-icon-color);
  --forge-circular-progress-track-color: transparent;
  --forge-circular-progress-size: 1em;
}

.ai-icon-button > svg {
  fill: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

:host {
  display: contents;
}

forge-ai-chat-interface {
  flex-grow: 1;
}

.ai-dialog {
  position: fixed;
  overflow: visible;
  box-sizing: border-box;
  background: var(--forge-theme-surface-bright, #ffffff);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  border: none;
  outline: none;
  width: 420px;
  height: calc(100vh - 72px);
  padding: 0;
  inset: auto;
  bottom: var(--forge-spacing-medium, 16px);
  right: var(--forge-spacing-medium, 16px);
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0, 0, 0, 1);
  animation-name: fadein, zoomin;
  transform-origin: right bottom;
}
.ai-dialog:popover-open::backdrop {
  display: none;
}
.ai-dialog.closing {
  animation-duration: 100ms;
  animation-timing-function: cubic-bezier(0.3, 0, 1, 1);
  animation-name: fadeout, zoomout;
  animation-fill-mode: forwards;
  transform-origin: right bottom;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes zoomin {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes zoomout {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.8);
  }
}
.drag-handle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: opacity 150ms ease, visibility 150ms ease;
  cursor: grab;
}
.drag-handle:active {
  cursor: grabbing;
}

.ai-dialog:hover .drag-handle,
.ai-dialog:focus-within .drag-handle {
  opacity: 1;
  visibility: visible;
}

.ai-dialog.dragging {
  opacity: 0.7;
  transition: none;
}`})))()}var E,D,O,k;function A(){return(A=e((()=>{b(),x(),T(),a(),u(),m(),E=768,D=100,O=`forge-ai-dialog`,k=class extends i{constructor(...e){super(...e),this.open=!1,this.expanded=!1,this.label=`AI Assistant`,this._isFullscreen=window.innerWidth<=E,this._isClosing=!1,this.#t=p(),this.#n=p(),this.#r=p(),this.#s=n`<slot></slot>`,this.#p=e=>{let t=this._isFullscreen;if(this._isFullscreen=e.matches,t!==this._isFullscreen){let e=new CustomEvent(`forge-ai-dialog-fullscreen-change`,{bubbles:!0,composed:!0,detail:{isFullscreen:this._isFullscreen}});this.dispatchEvent(e)}(t||this.expanded)!==(this._isFullscreen||this.expanded)&&this.open&&this.requestUpdate()},this.#y=e=>{e.key===`Escape`&&(e.preventDefault(),this.close())}}static{this.styles=r(w)}get isFullscreen(){return this._isFullscreen}#e;#t;#n;#r;#i;#a;#o;connectedCallback(){super.connectedCallback(),this.#u(),this.#d()}disconnectedCallback(){super.disconnectedCallback(),this.#f(),this.#v(),this.#o&&=(clearTimeout(this.#o),void 0)}updated(e){super.updated(e),(e.has(`open`)||e.has(`expanded`)||e.has(`_isFullscreen`))&&((e.has(`open`)&&!this.open||(e.has(`expanded`)||e.has(`_isFullscreen`))&&(this._isFullscreen||this.expanded))&&this.#a?.resetPosition(),this.#m())}#s;get#c(){let e=[`ai-dialog`,this.#a?.isDragging?`dragging`:``,this._isClosing?`closing`:``].filter(Boolean).join(` `);return n`
      <dialog
        ${f(this.#t)}
        aria-modal="false"
        aria-label=${this.label}
        popover="manual"
        class="${e}"
        @toggle=${this.#h}>
        <button
          ${f(this.#r)}
          id="drag-handle"
          aria-label="Move dialog"
          class="forge-icon-button forge-icon-button--small ai-icon-button drag-handle"
          tabindex="0"
          @pointerdown=${this.#a?.handlePointerDown}
          @keydown=${this.#a?.handleKeyDown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M20 9H4v2h16zM4 15h16v-2H4z" />
          </svg>
        </button>
        ${this.#s}
      </dialog>
    `}get#l(){return n`
      <forge-ai-modal ${f(this.#n)} label=${this.label} @forge-ai-modal-close=${this.#g}> ${this.#s} </forge-ai-modal>
    `}render(){let e=this._isFullscreen||this.expanded;return d(e,()=>this.#l,()=>this.#c)}show(){this.open=!0}close(){this.expanded&&=!1,this.open=!1,this.#a?.resetPosition();let e=new CustomEvent(`forge-ai-dialog-close`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}toggle(){this.open?this.close():this.show()}#u(){this.#e=window.matchMedia(`(max-width: ${E}px)`),this.#e.addEventListener(`change`,this.#p),this.#p(this.#e)}#d(){this.#a=new S(this,{targetElementRef:this.#t,dragHandleRef:this.#r,snapToViewport:!0,constrainKeyboardNavigation:!0,keyboardStep:10,snapAnimationDuration:200,allowOutOfBounds:!0})}#f(){this.#e?.removeEventListener(`change`,this.#p)}#p;#m(){let e=this._isFullscreen||this.expanded;if(this.#o&&=(clearTimeout(this.#o),void 0),e){this.#v(),this._isClosing=!1;let e=this.#n.value;e&&(this.open?e.open||e.show():e.open&&e.close())}else{let e=this.#t.value;e&&(this.open?(this._isClosing=!1,this.#_(),e.showPopover()):(this.#v(),this._isClosing=!0,this.#o=window.setTimeout(()=>{this._isClosing=!1,e.hidePopover(),this.#o=void 0},D)))}}#h(e){if(e.target!==e.currentTarget)return;let t=this.open;this.open=e.newState===`open`,this.open&&!t?this.#_():!this.open&&t&&this.#v()}#g(){this.close()}#_(){this.#i||(this.#i=new AbortController,document.addEventListener(`keydown`,this.#y,{signal:this.#i.signal}))}#v(){this.#i&&=(this.#i.abort(),void 0)}#y},o([s({type:Boolean})],k.prototype,`open`,void 0),o([s({type:Boolean})],k.prototype,`expanded`,void 0),o([s({type:String})],k.prototype,`label`,void 0),o([c()],k.prototype,`_isFullscreen`,void 0),o([c()],k.prototype,`_isClosing`,void 0),k=o([l(O)],k)})))()}function j(){return(j=e((()=>{A()})))()}var M=t({Demo:()=>I,__namedExportsOrder:()=>L,default:()=>F}),N,P,F,I,L;function R(){return(R=e((()=>{a(),m(),j(),h(),g(),_(),v(),y(),C(),N=`forge-ai-dialog`,P=n`<style>
  .dialog-story-fab {
    position: fixed;
    inset-block-end: var(--forge-spacing-large);
    inset-inline-end: var(--forge-spacing-large);
    z-index: 1000;
  }
  .dialog-story-host {
    min-block-size: 300px;
  }
</style>`,F={title:`AI/Components/Containers/Dialog`,component:N,argTypes:{open:{control:{type:`boolean`},description:`Controls whether the dialog is open`},expanded:{control:{type:`boolean`},description:`Controls whether the dialog is displayed in an expanded state`},label:{control:{type:`text`},description:`Accessible label announced by screen readers when the dialog opens`}},args:{open:!1,expanded:!1,label:`AI Assistant`},render:e=>{let t=p(),r=n`
      <forge-ai-dialog ${f(t)} ?open=${e.open} ?expanded=${e.expanded} label=${e.label}>
        <forge-ai-chat-interface>
          <forge-ai-chat-header
            slot="header"
            ?show-expand-button=${window.innerWidth>768}
            show-minimize-button
            ?expanded=${e.expanded}
            @forge-ai-chat-header-expand=${()=>{let e=t.value;e&&(e.expanded=!e.expanded)}}
            @forge-ai-chat-header-minimize=${()=>{t.value?.close()}}>
          </forge-ai-chat-header>
          <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
          <forge-ai-response-message>
            I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
            maintaining type safety.
          </forge-ai-response-message>

          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-dialog>
    `,i=n` <forge-ai-fab class="dialog-story-fab" @click=${()=>t.value?.show()}> </forge-ai-fab> `;return n`
      ${P}
      <div class="dialog-story-host">
        <div>
          <h2>AI Dialog Demo (Atomic Composition)</h2>
          <p>Click the FAB in the bottom right corner to open the AI dialog.</p>
          <p>This demo shows manual composition of ai-dialog + ai-chat-interface components.</p>
        </div>
        ${i} ${r}
      </div>
    `}},I={},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{}`,...I.parameters?.docs?.source}}},L=[`Demo`]})))()}export{I as n,R as r,M as t};