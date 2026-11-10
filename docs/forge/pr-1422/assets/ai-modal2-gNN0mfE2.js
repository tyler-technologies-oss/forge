import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,l as s,o as c,p as l,t as u}from"./decorators-Ci1onliJ.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";import{r as p}from"./dom-C1zFLlWW.js";var m;function h(){return(h=e((()=>{m=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
@keyframes forge-dialog-zoom-in {
  from {
    opacity: var(--_dialog-zoom-opacity);
    scale: var(--_dialog-zoom-scale);
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
@keyframes forge-dialog-zoom-out {
  from {
    opacity: 1;
    scale: 1;
  }
  to {
    opacity: var(--_dialog-zoom-opacity);
    scale: var(--_dialog-zoom-scale);
  }
}
@keyframes forge-dialog-fade-in {
  from {
    opacity: var(--_dialog-fade-opacity);
  }
  to {
    opacity: 1;
  }
}
@keyframes forge-dialog-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: var(--_dialog-fade-opacity);
  }
}
@keyframes forge-dialog-slide-in {
  from {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@keyframes forge-dialog-slide-out {
  from {
    opacity: 1;
    translate: 0 0;
  }
  to {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog {
  --_dialog-background:var(--forge-dialog-background, var(--forge-theme-surface-bright, #ffffff));
  --_dialog-shape:var(--forge-dialog-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_dialog-elevation:var(--forge-dialog-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12));
  --_dialog-spacing:var(--forge-dialog-spacing, auto);
  --_dialog-block-start-spacing:var(--forge-dialog-block-start-spacing, var(--_dialog-spacing));
  --_dialog-block-end-spacing:var(--forge-dialog-block-end-spacing, var(--_dialog-spacing));
  --_dialog-inline-start-spacing:var(--forge-dialog-inline-start-spacing, var(--_dialog-spacing));
  --_dialog-inline-end-spacing:var(--forge-dialog-inline-end-spacing, var(--_dialog-spacing));
  --_dialog-padding:var(--forge-dialog-padding, 0);
  --_dialog-width:var(--forge-dialog-width, fit-content);
  --_dialog-height:var(--forge-dialog-height, fit-content);
  --_dialog-min-width:var(--forge-dialog-min-width, 0);
  --_dialog-max-width:var(--forge-dialog-max-width, calc(100% - var(--forge-spacing-xxlarge, 48px)));
  --_dialog-min-height:var(--forge-dialog-min-height, 0);
  --_dialog-max-height:var(--forge-dialog-max-height, calc(100% - var(--forge-spacing-xxlarge, 48px)));
  --_dialog-z-index:var(--forge-dialog-z-index, var(--forge-z-index-dialog, 8));
  --_dialog-move-handle-color:var(--forge-dialog-move-handle-color, currentColor);
  --_dialog-move-handle-size:var(--forge-dialog-move-handle-size, 24px);
  --_dialog-move-handle-hover-cursor:var(--forge-dialog-move-handle-hover-cursor, grab);
  --_dialog-move-handle-active-cursor:var(--forge-dialog-move-handle-active-cursor, grabbing);
  --_dialog-move-handle-spacing:var(--forge-dialog-move-handle-spacing, calc(var(--forge-spacing-xxsmall, 4px) * -1) 0 0);
  --_dialog-move-transition-duration:var(--forge-dialog-move-transition-duration, var(--forge-animation-duration-short4, 200ms));
  --_dialog-move-transition-easing:var(--forge-dialog-move-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_dialog-moving-opacity:var(--forge-dialog-moving-opacity, 0.54);
  --_dialog-enter-animation-duration:var(--forge-dialog-enter-animation-duration, var(--forge-animation-duration-medium1, 250ms));
  --_dialog-enter-animation-easing:var(--forge-dialog-enter-animation-easing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_dialog-exit-animation-duration:var(--forge-dialog-exit-animation-duration, var(--forge-animation-duration-short2, 100ms));
  --_dialog-exit-animation-easing:var(--forge-dialog-exit-animation-easing, var(--forge-animation-easing-emphasized-accelerate, cubic-bezier(0.3, 0, 0.8, 0.15)));
  --_dialog-zoom-opacity:var(--forge-dialog-zoom-opacity, 0);
  --_dialog-zoom-scale:var(--forge-dialog-zoom-scale, 0.8);
  --_dialog-fade-opacity:var(--forge-dialog-fade-opacity, 0);
  --_dialog-slide-opacity:var(--forge-dialog-slide-opacity, 0);
  --_dialog-slide-translate:var(--forge-dialog-slide-translate, 0 -30%);
  --_dialog-backdrop-opacity:var(--forge-dialog-backdrop-opacity, var(--forge-backdrop-opacity, 0.54));
  --_dialog-nonmodal-elevation:var(--forge-dialog-nonmodal-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_dialog-fullscreen-enter-animation-duration:var(--forge-dialog-fullscreen-enter-animation-duration, var(--forge-animation-duration-medium1, 250ms));
  --_dialog-fullscreen-exit-animation-duration:var(--forge-dialog-fullscreen-exit-animation-duration, var(--forge-animation-duration-short2, 100ms));
  --_dialog-position-x:var(--forge-dialog-position-x, 0);
  --_dialog-position-y:var(--forge-dialog-position-y, 0);
  --_dialog-preset-sheet-enter-animation-duration:var(--forge-dialog-preset-sheet-enter-animation-duration, var(--forge-animation-duration-medium1, 250ms));
  --_dialog-preset-sheet-exit-animation-duration:var(--forge-dialog-preset-sheet-exit-animation-duration, var(--forge-animation-duration-short3, 150ms));
  --_backdrop-background:var(--forge-backdrop-background, #000);
  --_backdrop-opacity:var(--forge-backdrop-opacity, 0.54);
  --_backdrop-z-index:var(--forge-backdrop-z-index, var(--forge-z-index-backdrop, 7));
  --_backdrop-enter-animation-duration:var(--forge-backdrop-enter-animation-duration, var(--forge-animation-duration-short4, 200ms));
  --_backdrop-enter-animation-easing:var(--forge-backdrop-enter-animation-easing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_backdrop-exit-animation-duration:var(--forge-backdrop-exit-animation-duration, var(--forge-animation-duration-short1, 50ms));
  --_backdrop-exit-animation-easing:var(--forge-backdrop-exit-animation-easing, var(--forge-animation-easing-emphasized-accelerate, cubic-bezier(0.3, 0, 0.8, 0.15)));
  --forge-theme-surface: var(--forge-theme-surface-bright, #ffffff);
}

.forge-dialog {
  position: fixed;
  inset: 0;
  z-index: var(--_dialog-z-index);
  background-color: rgba(0, 0, 0, 0);
  color: inherit;
  border: none;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  display: flex;
  background: var(--_dialog-background);
  box-shadow: var(--_dialog-elevation);
  z-index: var(--_dialog-z-index);
  overflow: hidden;
  border-radius: var(--_dialog-shape);
  margin-block-start: var(--_dialog-block-start-spacing);
  margin-block-end: var(--_dialog-block-end-spacing);
  margin-inline-start: var(--_dialog-inline-start-spacing);
  margin-inline-end: var(--_dialog-inline-end-spacing);
  padding: var(--_dialog-padding);
  width: var(--_dialog-width);
  height: var(--_dialog-height);
  min-width: var(--_dialog-min-width);
  max-width: var(--_dialog-max-width);
  min-height: var(--_dialog-min-height);
  max-height: var(--_dialog-max-height);
  box-sizing: border-box;
  animation-duration: var(--_dialog-exit-animation-duration);
  animation-timing-function: var(--_dialog-exit-animation-easing);
  position: fixed;
  transition-property: display, opacity, overlay, scale;
  transition-behavior: allow-discrete;
}

.forge-dialog > forge-scaffold {
  height: auto;
}

.forge-dialog--fullscreen {
  --_dialog-enter-animation-duration:var(--_dialog-fullscreen-enter-animation-duration);
  --_dialog-exit-animation-duration:var(--_dialog-fullscreen-exit-animation-duration);
  height: 100%;
  width: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
  box-shadow: none;
}

.forge-dialog:not(:modal) {
  --_dialog-elevation:var(--_dialog-nonmodal-elevation);
  pointer-events: all;
}

.forge-dialog--moveable {
  user-select: none;
  transition-property: opacity;
  transition-duration: var(--_dialog-move-transition-duration);
  transition-timing-function: var(--_dialog-move-transition-easing);
}

.forge-dialog--moved {
  margin: 0;
}

.forge-dialog--moving {
  opacity: var(--_dialog-moving-opacity);
}

.forge-dialog__move-handle {
  fill: var(--_dialog-move-handle-color);
  height: var(--_dialog-move-handle-size);
  width: var(--_dialog-move-handle-size);
  margin: var(--_dialog-move-handle-spacing);
  touch-action: none;
}

.forge-dialog__move-handle:hover {
  cursor: var(--_dialog-move-handle-hover-cursor);
}

.forge-dialog__move-handle:active {
  cursor: var(--_dialog-move-handle-active-cursor);
}

.forge-dialog__move-handle-container {
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
}

.forge-dialog--top {
  --_dialog-block-start-spacing:var(--forge-dialog-block-start-spacing, 0);
  top: 0;
  bottom: auto;
}

.forge-dialog--top-right {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: 0;
  left: auto;
  right: 0;
  bottom: auto;
}

.forge-dialog--top-left {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: 0;
  left: 0;
  right: auto;
  bottom: auto;
}

.forge-dialog--bottom {
  --_dialog-block-end-spacing:var(--forge-dialog-block-end-spacing, 0);
  top: auto;
  bottom: 0;
}

.forge-dialog--bottom-right {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: auto;
  left: auto;
  right: 0;
  bottom: 0;
}

.forge-dialog--bottom-left {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: auto;
  left: 0;
  right: auto;
  bottom: 0;
}

.forge-dialog--right {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: auto;
  left: auto;
  right: 0;
  bottom: auto;
}

.forge-dialog--left {
  --_dialog-spacing:var(--forge-dialog-spacing, 0);
  top: auto;
  left: 0;
  right: auto;
  bottom: auto;
}

.forge-dialog--custom {
  margin: 0;
  top: var(--_dialog-position-x);
  left: var(--_dialog-position-y);
}

.forge-dialog--bottom-sheet {
  --_dialog-enter-animation-duration:var(--_dialog-preset-sheet-enter-animation-duration);
  --_dialog-exit-animation-duration:var(--_dialog-preset-sheet-exit-animation-duration);
  --_dialog-max-width:var(--forge-dialog-max-width, none);
  --_dialog-max-height:var(--forge-dialog-max-height, none);
  inset: auto;
  display: inline-flex;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  --_dialog-slide-translate:var(--forge-dialog-slide-translate, 0 100%);
}

.forge-dialog--bottom-sheet.forge-dialog {
  transition-property: display, opacity, overlay, translate;
}

.forge-dialog--bottom-sheet.forge-dialog[open] {
  translate: 0 0;
}

@starting-style {
  .forge-dialog--bottom-sheet.forge-dialog[open] {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog--bottom-sheet.forge-dialog:not([open]) {
  opacity: var(--_dialog-slide-opacity);
  scale: 1;
  translate: var(--_dialog-slide-translate);
}

.forge-dialog--left-sheet {
  --_dialog-enter-animation-duration:var(--_dialog-preset-sheet-enter-animation-duration);
  --_dialog-exit-animation-duration:var(--_dialog-preset-sheet-exit-animation-duration);
  --_dialog-max-width:var(--forge-dialog-max-width, none);
  --_dialog-max-height:var(--forge-dialog-max-height, none);
  inset: auto;
  display: inline-flex;
  left: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  --_dialog-slide-translate:var(--forge-dialog-slide-translate, -100% 0);
}

.forge-dialog--left-sheet.forge-dialog {
  transition-property: display, opacity, overlay, translate;
}

.forge-dialog--left-sheet.forge-dialog[open] {
  translate: 0 0;
}

@starting-style {
  .forge-dialog--left-sheet.forge-dialog[open] {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog--left-sheet.forge-dialog:not([open]) {
  opacity: var(--_dialog-slide-opacity);
  scale: 1;
  translate: var(--_dialog-slide-translate);
}

.forge-dialog--right-sheet {
  --_dialog-enter-animation-duration:var(--_dialog-preset-sheet-enter-animation-duration);
  --_dialog-exit-animation-duration:var(--_dialog-preset-sheet-exit-animation-duration);
  --_dialog-max-width:var(--forge-dialog-max-width, none);
  --_dialog-max-height:var(--forge-dialog-max-height, none);
  inset: auto;
  display: inline-flex;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  --_dialog-slide-translate:var(--forge-dialog-slide-translate, 100% 0);
}

.forge-dialog--right-sheet.forge-dialog {
  transition-property: display, opacity, overlay, translate;
}

.forge-dialog--right-sheet.forge-dialog[open] {
  translate: 0 0;
}

@starting-style {
  .forge-dialog--right-sheet.forge-dialog[open] {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog--right-sheet.forge-dialog:not([open]) {
  opacity: var(--_dialog-slide-opacity);
  scale: 1;
  translate: var(--_dialog-slide-translate);
}

.forge-dialog--top-sheet {
  --_dialog-enter-animation-duration:var(--_dialog-preset-sheet-enter-animation-duration);
  --_dialog-exit-animation-duration:var(--_dialog-preset-sheet-exit-animation-duration);
  --_dialog-max-width:var(--forge-dialog-max-width, none);
  --_dialog-max-height:var(--forge-dialog-max-height, none);
  inset: auto;
  display: inline-flex;
  top: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  --_dialog-slide-translate:var(--forge-dialog-slide-translate, 0 -100%);
}

.forge-dialog--top-sheet.forge-dialog {
  transition-property: display, opacity, overlay, translate;
}

.forge-dialog--top-sheet.forge-dialog[open] {
  translate: 0 0;
}

@starting-style {
  .forge-dialog--top-sheet.forge-dialog[open] {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog--top-sheet.forge-dialog:not([open]) {
  opacity: var(--_dialog-slide-opacity);
  scale: 1;
  translate: var(--_dialog-slide-translate);
}

.forge-dialog::backdrop {
  --forge-backdrop-opacity: var(--_backdrop-opacity);
  --forge-backdrop-enter-animation-duration: var(--_backdrop-enter-animation-duration);
  --forge-backdrop-enter-animation-easing: var(--_backdrop-enter-animation-easing);
  --forge-backdrop-exit-animation-duration: var(--_backdrop-exit-animation-duration);
  --forge-backdrop-exit-animation-easing: var(--_backdrop-exit-animation-easing);
  position: absolute;
  inset: 0;
  z-index: var(--_backdrop-z-index);
  background: var(--_backdrop-background);
  opacity: 0;
  animation-fill-mode: forwards;
  transition-property: display, opacity, overlay;
}

.forge-dialog[open] {
  opacity: 1;
  scale: 1;
  transition-duration: var(--_dialog-enter-animation-duration);
  transition-timing-function: var(--_dialog-enter-animation-easing);
}

@starting-style {
  .forge-dialog[open] {
    opacity: var(--_dialog-zoom-opacity);
    scale: var(--_dialog-zoom-scale);
  }
}
.forge-dialog[open]::backdrop {
  opacity: var(--_backdrop-opacity);
  transition-duration: var(--_backdrop-enter-animation-duration);
  transition-timing-function: var(--_backdrop-enter-animation-easing);
}

@starting-style {
  .forge-dialog[open]::backdrop {
    opacity: 0;
  }
}
.forge-dialog:not([open]) {
  animation-duration: var(--_dialog-enter-animation-duration);
  animation-timing-function: var(--_dialog-enter-animation-easing);
  display: none;
  opacity: var(--_dialog-zoom-opacity);
  scale: var(--_dialog-zoom-scale);
  transition-duration: var(--_dialog-exit-animation-duration);
  transition-timing-function: var(--_dialog-exit-animation-easing);
}

.forge-dialog:not([open])::backdrop {
  transition-duration: var(--_backdrop-exit-animation-duration);
  transition-timing-function: var(--_backdrop-exit-animation-easing);
}

.forge-dialog--animation-fade.forge-dialog {
  transition-property: display, opacity, overlay;
}

@starting-style {
  .forge-dialog--animation-fade.forge-dialog[open] {
    opacity: var(--_dialog-fade-opacity);
  }
}
.forge-dialog--animation-fade.forge-dialog:not([open]) {
  opacity: var(--_dialog-fade-opacity);
  scale: 1;
}

.forge-dialog--animation-slide.forge-dialog {
  transition-property: display, opacity, overlay, translate;
}

.forge-dialog--animation-slide.forge-dialog[open] {
  translate: 0 0;
}

@starting-style {
  .forge-dialog--animation-slide.forge-dialog[open] {
    opacity: var(--_dialog-slide-opacity);
    translate: var(--_dialog-slide-translate);
  }
}
.forge-dialog--animation-slide.forge-dialog:not([open]) {
  opacity: var(--_dialog-slide-opacity);
  scale: 1;
  translate: var(--_dialog-slide-translate);
}

.forge-dialog--animation-none {
  --_dialog-enter-animation-duration:var(--forge-dialog-enter-animation-duration, 0s);
  --_dialog-exit-animation-duration:var(--forge-dialog-exit-animation-duration, 0s);
  --_backdrop-enter-animation-duration:var(--forge-backdrop-enter-animation-duration, 0s);
  --_backdrop-exit-animation-duration:var(--forge-backdrop-exit-animation-duration, 0s);
}

@media (prefers-reduced-motion) {
  .forge-dialog.forge-dialog {
    transition-property: display, opacity, overlay;
  }
  @starting-style {
    .forge-dialog.forge-dialog[open] {
      opacity: var(--_dialog-fade-opacity);
    }
  }
  .forge-dialog.forge-dialog:not([open]) {
    opacity: var(--_dialog-fade-opacity);
    scale: 1;
  }
}
:host {
  display: contents;
}

.forge-dialog::backdrop {
  position: fixed;
}

dialog.forge-dialog:not(.forge-dialog--fullscreen) {
  height: var(--forge-ai-modal-height, 80vh);
  width: var(--forge-ai-modal-width, 80vw);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}`})))()}var g,_;function v(){return(v=e((()=>{h(),i(),u(),f(),g=768,_=class extends r{static{this.styles=n(m)}#e;#t;#n;constructor(){super(),this.open=!1,this.sizeStrategy=`auto`,this.label=`AI Assistant`,this._autoFullscreen=window.innerWidth<=g,this.#n=`programmatic`,this.#l=e=>{let t=this._autoFullscreen;if(this._autoFullscreen=e.matches,t!==this._autoFullscreen&&(this.#r(),this.fullscreen===void 0)){let e=new CustomEvent(`forge-ai-modal-fullscreen-change`,{bubbles:!0,composed:!0,detail:{isFullscreen:this._autoFullscreen}});this.dispatchEvent(e)}},this.#t=this.attachInternals(),this.#r()}render(){let e={"forge-dialog":!0,"forge-dialog--fullscreen":this.sizeStrategy===`fixed`?this.fullscreen??!1:this.fullscreen??this._autoFullscreen};return t`
      <dialog
        class=${d(e)}
        aria-label=${this.label}
        @close=${this.#i}
        @click=${this.#a}
        @keydown=${this.#o}>
        <slot></slot>
      </dialog>
    `}connectedCallback(){super.connectedCallback(),this.#s()}disconnectedCallback(){super.disconnectedCallback(),this.#c()}updated(e){e.has(`open`)&&(this.open?this._dialog&&!this._dialog.open&&(this.setAttribute(`data-handles-escape`,``),this._dialog.showModal(),this.dispatchEvent(new CustomEvent(`forge-ai-modal-open`,{bubbles:!0,composed:!0}))):e.get(`open`)===!0&&(this._dialog?.open&&this._dialog.close(),this.removeAttribute(`data-handles-escape`),this.dispatchEvent(new CustomEvent(`forge-ai-modal-close`,{bubbles:!0,composed:!0,detail:{reason:this.#n}})),this.#n=`programmatic`)),(e.has(`fullscreen`)||e.has(`sizeStrategy`))&&this.#r()}#r(){let e=this.sizeStrategy===`fixed`?this.fullscreen??!1:this.fullscreen??this._autoFullscreen;p(this.#t,`fullscreen`,e)}#i(){this.open&&(this.#n=`escape`),this.open=!1}#a(e){e.target===this._dialog&&(e.stopPropagation(),this.#n=`backdrop`,this.open=!1)}#o(e){e.key===`Escape`&&e.stopPropagation()}show(){this.open=!0}close(){this.#n=`programmatic`,this.open=!1}#s(){this.#e=window.matchMedia(`(max-width: ${g}px)`),this.#e.addEventListener(`change`,this.#l),this.#l(this.#e)}#c(){this.#e?.removeEventListener(`change`,this.#l)}#l},a([c(`dialog`)],_.prototype,`_dialog`,void 0),a([o({type:Boolean})],_.prototype,`open`,void 0),a([o({type:Boolean})],_.prototype,`fullscreen`,void 0),a([o({type:String,attribute:`size-strategy`})],_.prototype,`sizeStrategy`,void 0),a([o({type:String})],_.prototype,`label`,void 0),a([s()],_.prototype,`_autoFullscreen`,void 0),_=a([l(`forge-ai-modal`)],_)})))()}export{v as t};