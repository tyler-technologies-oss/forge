import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-Ci1onliJ.js";import{r as l}from"./dom-C1zFLlWW.js";import{t as u}from"./ai-gradient-container2-By0vINXT.js";import{t as d}from"./ai-icon-BaXkBmeK.js";var f;function p(){return(p=e((()=>{f=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-fab {
  --_fab-display:var(--forge-fab-display, inline-flex);
  --_fab-gap:var(--forge-fab-gap, var(--forge-spacing-xsmall, 8px));
  --_fab-background:var(--forge-fab-background, var(--forge-theme-secondary, #ffc107));
  --_fab-color:var(--forge-fab-color, var(--forge-theme-on-secondary, #000000));
  --_fab-size:var(--forge-fab-size, 56px);
  --_fab-padding:var(--forge-fab-padding, var(--forge-spacing-xsmall, 8px));
  --_fab-shadow:var(--forge-fab-shadow, 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12));
  --_fab-hover-shadow:var(--forge-fab-hover-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_fab-active-shadow:var(--forge-fab-active-shadow, 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-shadow:var(--forge-fab-lowered-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-hover-shadow:var(--forge-fab-lowered-hover-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-active-shadow:var(--forge-fab-lowered-active-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
  --_fab-transition-duration:var(--forge-fab-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_fab-transition-timing:var(--forge-fab-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_fab-shape:var(--forge-fab-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_fab-shape-start-start:var(--forge-fab-shape-start-start, var(--_fab-shape));
  --_fab-shape-start-end:var(--forge-fab-shape-start-end, var(--_fab-shape));
  --_fab-shape-end-start:var(--forge-fab-shape-end-start, var(--_fab-shape));
  --_fab-shape-end-end:var(--forge-fab-shape-end-end, var(--_fab-shape));
  --_fab-extended-padding:var(--forge-fab-extended-padding, var(--forge-spacing-medium-large, 20px));
  --_fab-extended-min-width:var(--forge-fab-extended-min-width, 96px);
  --_fab-density-small-size:var(--forge-fab-density-small-size, 40px);
  --_fab-density-medium-size:var(--forge-fab-density-medium-size, var(--_fab-size));
  --_fab-density-large-size:var(--forge-fab-density-large-size, 96px);
  --_fab-disabled-cursor:var(--forge-fab-disabled-cursor, not-allowed);
  --_fab-disabled-background:var(--forge-fab-disabled-background, var(--forge-theme-surface-container, #e0e0e0));
  --_fab-disabled-color:var(--forge-fab-disabled-color, var(--forge-theme-on-surface-container, #000000));
  --_fab-disabled-opacity:var(--forge-fab-disabled-opacity, 0.38);
}

.forge-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-button-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-button-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-button-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-button-font-weight, 500);
  line-height: var(--forge-typography-button-line-height, normal);
  letter-spacing: var(--forge-typography-button-letter-spacing, 0.0714285714em);
  text-transform: var(--forge-typography-button-text-transform, inherit);
  text-decoration: var(--forge-typography-button-text-decoration, inherit);
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--_fab-gap);
  z-index: 0;
  background: var(--_fab-background);
  color: var(--_fab-color);
  cursor: pointer;
  box-shadow: var(--_fab-shadow);
  box-sizing: border-box;
  height: var(--_fab-density-medium-size);
  min-width: var(--_fab-density-medium-size);
  padding-inline: var(--_fab-padding);
  border-width: medium;
  border-style: none;
  border-color: currentColor;
  border-top-left-radius: var(--_fab-shape-start-start);
  border-top-right-radius: var(--_fab-shape-start-end);
  border-bottom-left-radius: var(--_fab-shape-end-start);
  border-bottom-right-radius: var(--_fab-shape-end-end);
  user-select: none;
  white-space: nowrap;
  transition-property: box-shadow, background, color;
  transition-duration: var(--_fab-transition-duration);
  transition-timing-function: var(--_fab-transition-timing);
}

.forge-fab:hover {
  --_fab-shadow:var(--_fab-hover-shadow);
}

.forge-fab:active {
  --_fab-shadow:var(--_fab-active-shadow);
}

.forge-fab:not(:disabled) {
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

.forge-fab:not(:disabled)::before {
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

.forge-fab:not(:disabled):hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}

.forge-fab:not(:disabled):active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.18);
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
.forge-fab:not(:disabled) {
  outline: none;
}

.forge-fab:not(:disabled):focus-visible::after {
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

.forge-fab:not(:disabled):focus-visible::after {
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

.forge-fab:not(:disabled) {
  --forge-focus-indicator-color: var(--_fab-background);
  --forge-focus-indicator-shape-start-start: var(--_fab-shape-start-start);
  --forge-focus-indicator-shape-start-end: var(--_fab-shape-start-end);
  --forge-focus-indicator-shape-end-start: var(--_fab-shape-end-start);
  --forge-focus-indicator-shape-end-end: var(--_fab-shape-end-end);
}

.forge-fab--extended {
  --_fab-padding:var(--_fab-extended-padding);
  min-width: var(--_fab-extended-min-width);
}

.forge-fab:disabled {
  cursor: var(--_fab-disabled-cursor);
  --_fab-background:var(--_fab-disabled-background);
  --_fab-color:var(--_fab-disabled-color);
  pointer-events: none;
  opacity: var(--_fab-disabled-opacity);
  pointer-events: auto;
  cursor: not-allowed;
}

.forge-fab--dense, .forge-fab--small {
  --_fab-size:var(--_fab-density-small-size);
}

.forge-fab--large {
  --_fab-size:var(--_fab-density-large-size);
  --_fab-shape:var(--forge-fab-shape, calc(var(--forge-shape-extra-large, 16px) * var(--forge-shape-factor, 1)));
}

.forge-fab--flat {
  --_fab-shadow:var(--_fab-lowered-shadow);
}

.forge-fab--flat:hover {
  --_fab-shadow:var(--_fab-lowered-hover-shadow);
}

.forge-fab--flat:active {
  --_fab-shadow:var(--_fab-lowered-active-shadow);
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
:host {
  display: inline-block;
  --_ai-fab-background: var(--forge-ai-fab-background, transparent);
  --_ai-fab-outline-color: var(--forge-ai-fab-outline-color, transparent);
}

forge-ai-gradient-container {
  border-radius: 100%;
  border-color: var(--_ai-fab-outline-color);
}

.ai-fab {
  --forge-fab-border-width: 0;
  background: var(--_ai-fab-background);
  position: relative;
  z-index: 1;
  padding: var(--forge-spacing-small, 12px);
}
.ai-fab forge-ai-icon {
  color: var(--forge-theme-primary, #3f51b5);
  font-size: 36px;
}

:host(:state(extended)) {
  --_ai-fab-text-color: var(--forge-ai-fab-text-color, var(--forge-theme-primary, #3f51b5));
}
:host(:state(extended)) forge-ai-gradient-container {
  border-radius: var(--forge-spacing-xxxlarge, 56px);
}
:host(:state(extended)) {
  --forge-fab-shape: var(--forge-spacing-xxxlarge, 56px);
  --forge-fab-color: var(--_ai-fab-text-color);
}

:host(:state(disabled)) forge-ai-icon {
  --forge-ai-icon-fill-color: var(--forge-theme-text-low);
}`})))()}var m,h;function g(){return(g=e((()=>{u(),d(),p(),i(),c(),m=`forge-ai-fab`,h=class extends r{static{this.styles=n(f)}#e;constructor(){super(),this.disabled=!1,this.extended=!1,this.label=`Open AI assistant`,this.#e=this.attachInternals(),this.#t()}willUpdate(e){(e.has(`disabled`)||e.has(`extended`))&&this.#t()}#t(){l(this.#e,`disabled`,this.disabled),l(this.#e,`extended`,this.extended)}render(){return t`
      <forge-ai-gradient-container variant=${this.disabled?`disabled`:`high`}>
        <button aria-label=${this.label} class="forge-fab ai-fab ${this.extended?`forge-fab--small forge-fab--extended`:``}" .disabled=${this.disabled}>
          <slot name="icon">
            <forge-ai-icon></forge-ai-icon>
          </slot>
          ${this.extended?t`<slot></slot>`:``}
        </button>
      </forge-ai-gradient-container>
    `}},a([o({type:Boolean,reflect:!0})],h.prototype,`disabled`,void 0),a([o({type:Boolean,reflect:!0})],h.prototype,`extended`,void 0),a([o({type:String})],h.prototype,`label`,void 0),h=a([s(m)],h)})))()}function _(){return(_=e((()=>{g()})))()}export{_ as t};