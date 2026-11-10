import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as u}from"./decorators-Ci1onliJ.js";import{n as d}from"./when-Daf2bbVy.js";import{n as f}from"./utils-CxMT1tHj.js";import{t as p}from"./ai-spinner2-3vV61SKj.js";import{r as m,t as h}from"./unsafe-html-DLpnvkX2.js";var g;function _(){return(_=e((()=>{g=`@keyframes forge-focus-indicator-outward-grow {
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
:host {
  display: block;
}

.summary {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  padding-block: var(--forge-spacing-xxsmall, 4px);
  margin-block: var(--forge-spacing-xsmall, 8px);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  text-align: start;
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  outline: none;
  --_state-layer-display: var(--forge-state-layer-display, flex);
  --_state-layer-color: var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color: var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity: var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color: var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration: var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration: var(--forge-state-layer-animation-duration, 375ms);
}
.summary::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}
.summary:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.summary:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}

.status-icon {
  display: flex;
  align-items: center;
}

.status-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  min-width: 0;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.chevron {
  flex-shrink: 0;
  transition: transform var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.summary[aria-expanded=true] .chevron,
.row-button[aria-expanded=true] .chevron {
  transform: rotate(180deg);
}

.focus-indicator {
  position: absolute;
  display: none;
}

:host .summary:focus .focus-indicator,
:host .row-button:focus .focus-indicator {
  --_focus-indicator-display: var(--forge-focus-indicator-display, flex);
  --_focus-indicator-width: var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
  --_focus-indicator-active-width: var(--forge-focus-indicator-active-width, 6px);
  --_focus-indicator-color: var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
  --_focus-indicator-shape: var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
  --_focus-indicator-duration: var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
  --_focus-indicator-easing: var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
  --_focus-indicator-shape-start-start: var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
  --_focus-indicator-shape-start-end: var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-end: var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-start: var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
  --_focus-indicator-outward-offset: var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
  --_focus-indicator-inward-offset: var(--forge-focus-indicator-inward-offset, 0px);
  --_focus-indicator-offset-block: var(--forge-focus-indicator-offset-block, 0);
  --_focus-indicator-offset-inline: var(--forge-focus-indicator-offset-inline, 0);
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
  animation-name: forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink;
  border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) - var(--_focus-indicator-inward-offset));
  border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) - var(--_focus-indicator-inward-offset));
  border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) - var(--_focus-indicator-inward-offset));
  border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) - var(--_focus-indicator-inward-offset));
  border: var(--_focus-indicator-width) solid currentColor;
  inset: var(--_focus-indicator-inward-offset);
}
:host .summary:focus .focus-indicator::before,
:host .row-button:focus .focus-indicator::before {
  content: "";
}
:host .summary:focus .focus-indicator,
:host .row-button:focus .focus-indicator {
  display: block;
  --forge-focus-indicator-shape: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}
:host .code-card__header[aria-expanded=true]:focus .focus-indicator {
  --forge-focus-indicator-shape-end-start: 0px;
  --forge-focus-indicator-shape-end-end: 0px;
}

.timeline {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}
.timeline.expanded {
  grid-template-rows: 1fr;
}

.timeline-content {
  overflow: hidden;
  min-height: 0;
  padding-inline-start: var(--forge-spacing-small, 12px);
}

.timeline-row {
  position: relative;
  padding-inline-start: var(--forge-spacing-large, 24px);
  padding-block-end: var(--forge-spacing-medium, 16px);
}
.timeline-row::before {
  content: "";
  position: absolute;
  inset-block-start: calc(28px + 4px);
  inset-block-end: -4px;
  inset-inline-start: calc(28px / 2);
  width: 1px;
  background-color: var(--forge-theme-outline, #e0e0e0);
}
.timeline-row:last-child::before {
  display: none;
}

.row-header {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-small, 12px);
  width: 100%;
  min-height: 28px;
  margin-inline-start: calc(-1 * var(--forge-spacing-large, 24px));
}
.row-header:has(.code-card) {
  align-items: flex-start;
}

.row-button {
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  padding-block: var(--forge-spacing-xsmall, 8px);
  padding-inline: 0 var(--forge-spacing-xsmall, 8px);
  text-align: start;
  color: inherit;
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  outline: none;
  --_state-layer-display: var(--forge-state-layer-display, flex);
  --_state-layer-color: var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color: var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity: var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color: var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration: var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration: var(--forge-state-layer-animation-duration, 375ms);
}
.row-button::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}
.row-button:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.row-button:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}

.row-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--forge-theme-primary-container, #d1d5ed);
  color: var(--forge-theme-primary, #3f51b5);
}
:host(:state(debug-mode)) .row-marker {
  margin-block-start: var(--forge-spacing-xxsmall, 4px);
}
.row-marker--complete {
  background-color: var(--forge-theme-success-container, #cde0ce);
  color: var(--forge-theme-on-success-container, #19441b);
}
.row-marker--error {
  background-color: var(--forge-theme-error-container, #ecc2c9);
  color: var(--forge-theme-on-error-container, #5f0011);
}

.row-label {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: var(--forge-spacing-xxxsmall, 2px);
}

.row-name {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.8125)));
  font-weight: var(--forge-typography-label2-font-weight, 400);
  line-height: var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label2-letter-spacing, 0.0096153846em);
  text-transform: var(--forge-typography-label2-text-transform, inherit);
  text-decoration: var(--forge-typography-label2-text-decoration, inherit);
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  line-height: normal;
  font-weight: 500;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
}

.code-card {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  overflow: hidden;
  background-color: var(--forge-theme-surface, #ffffff);
}

.code-card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-small, 12px);
  width: 100%;
  padding-block: var(--forge-spacing-xsmall, 8px);
  padding-inline: var(--forge-spacing-small, 12px);
  border: none;
  cursor: pointer;
  text-align: start;
  background-color: var(--forge-theme-surface-container-minimum, #f5f5f5);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1)) calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1)) 0 0;
}
.code-card__header[aria-expanded=false] {
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}
.code-card__header[aria-expanded=true] {
  border-block-end: 1px solid var(--forge-theme-outline, #e0e0e0);
}

.code-card__title {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  flex: 1;
  min-width: 0;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.code-card__name {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-card__status {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding-block: var(--forge-spacing-xxxsmall, 2px);
  padding-inline: var(--forge-spacing-xsmall, 8px);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  background-color: var(--forge-theme-surface-container, #e0e0e0);
}
.code-card__status[data-status=complete] {
  color: var(--forge-theme-on-success-container, #19441b);
  background-color: var(--forge-theme-success-container, #cde0ce);
}
.code-card__status[data-status=error] {
  color: var(--forge-theme-on-error-container, #5f0011);
  background-color: var(--forge-theme-error-container, #ecc2c9);
}

.code-card__code::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.code-card__code::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.code-card__code::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.code-card__code::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.code-card__code::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.code-card__code::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.code-card__code {
  font-family: monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 0;
  padding: var(--forge-spacing-small, 12px);
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
  overflow: auto;
  max-height: 320px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.code-card__code .token-key {
  color: var(--forge-theme-primary, #3f51b5);
}
.code-card__code .token-string {
  color: var(--forge-theme-success, #2e7d32);
}
.code-card__code .token-number {
  color: var(--forge-theme-primary, #3f51b5);
}
.code-card__code .token-boolean {
  color: var(--forge-theme-tertiary, #3d5afe);
}
.code-card__code .token-null {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}`})))()}var v,y,b;function x(){return(x=e((()=>{p(),_(),a(),u(),h(),v=`forge-ai-tool-call-indicator`,y=2e3,b=class extends i{constructor(...e){super(...e),this.#e=this.attachInternals(),this.toolCalls=[],this.debugMode=!1,this._expanded=!1,this._expandedRows=new Set,this.#t=t`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
    </svg>
  `,this.#n=t`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path
        d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68zM4.26 5.67A9.9 9.9 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9zM2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8 8 0 0 1 4.06 13zm5.04 5.37-1.43 1.37A10 10 0 0 0 11 22v-2a8 8 0 0 1-3.9-1.63m9.72-3.18-4.11-4.11c.41-1.04.18-2.26-.68-3.11-.9-.91-2.25-1.09-3.34-.59l1.94 1.94-1.35 1.36-1.99-1.95c-.54 1.09-.29 2.44.59 3.35.86.86 2.08 1.08 3.12.68l4.11 4.1c.18.19.45.19.63 0l1.04-1.03c.22-.18.22-.5.04-.64" />
    </svg>
  `,this.#r=t`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2 1 21h22zm0 3.99L19.53 19H4.47zM11 10v4h2v-4zm0 6v2h2v-2z" />
    </svg>
  `,this.#i=t`
    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  `,this.#a=t`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" fill="currentColor" aria-hidden="true">
      <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z" />
    </svg>
  `}static{this.styles=r(g)}#e;#t;#n;#r;#i;#a;get#o(){return this.toolCalls.length}get#s(){return this.toolCalls.some(e=>!f(e,this.tools?.get(e.name)))}get#c(){if(this.#s)return;let e=this.toolCalls.map(e=>e.startTimestamp??0).filter(e=>e>0),t=this.toolCalls.map(e=>e.endTimestamp??0).filter(e=>e>0);if(e.length&&t.length)return Math.max(...t)-Math.min(...e)}get#l(){let e=this.#c??0;return e<1e3?`${e}ms`:`${Math.round(e/1e3)}s`}get#u(){if(this.#s)return`Running tools...`;let e=this.#c,t=`Used ${this.#o} ${this.#o===1?`tool`:`tools`}`;return e===void 0?t:`${t} · ${this.#l}`}willUpdate(e){e.has(`debugMode`)&&this.#e.states[this.debugMode?`add`:`delete`](`debug-mode`)}#d(){this._expanded=!this._expanded}#f(e){let t=new Set(this._expandedRows);t.has(e)?t.delete(e):t.add(e),this._expandedRows=t}#p(e){return this._expandedRows.has(e)}#m(e){if(!this.debugMode)return!1;let t=!!e.args&&Object.keys(e.args).length>0,n=e.status===`complete`&&e.result!==void 0,r=e.status===`error`;return t||n||r}#h(e){let{startTimestamp:t,endTimestamp:n}=e;if(!t||!n||n<t)return;let r=n-t;return r<1e3?`${r}ms`:`${(r/1e3).toFixed(1)}s`}#g(e){let t;try{t=JSON.stringify(e,null,2)}catch{t=String(e)}return t===void 0&&(t=String(e)),t.length>y?`${t.slice(0,y)}… (truncated)`:t}#_(e){let n=this.#g(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,e=>{let t=`token-number`;return/^"/.test(e)?t=/:$/.test(e)?`token-key`:`token-string`:/true|false/.test(e)?t=`token-boolean`:/null/.test(e)&&(t=`token-null`),`<span class="${t}">${e}</span>`});return t`${m(n)}`}#v(e){return e.status===`error`?t`<span class="row-marker row-marker--error">${this.#r}</span>`:f(e,this.tools?.get(e.name))?t`<span class="row-marker row-marker--complete">${this.#t}</span>`:t`<span class="row-marker"><forge-ai-spinner size="small"></forge-ai-spinner></span>`}#y(e){let t={tool_name:e.name,tool_call_id:e.id,status:e.status},n=this.#h(e);return n&&(t.duration=n),e.args&&Object.keys(e.args).length>0&&(t.input=e.args),e.result!==void 0&&(t.output=e.result),t}#b(e){let r=this.#h(e);return r?t`<span class="code-card__status" data-status=${e.status}>${r}</span>`:n}#x(e){let n=this.#p(e.id),r=`detail-${e.id}`,i=this.tools?.get(e.name)?.displayName??e.name;return t`
      <div class="code-card">
        <button
          class="code-card__header row-button"
          type="button"
          aria-expanded=${n}
          aria-controls=${r}
          @click=${()=>this.#f(e.id)}>
          <span class="code-card__title">${this.#a}<span class="code-card__name">${i}</span></span>
          ${this.#b(e)} ${this.#i}
          <span class="focus-indicator"></span>
        </button>
        ${d(n,()=>t`
            <div id=${r} class="code-card__body" role="region">
              <pre class="code-card__code">${this.#_(this.#y(e))}</pre>
            </div>
          `)}
      </div>
    `}#S(e){if(this.#m(e))return t`
        <div class="timeline-row" data-status=${e.status}>
          <div class="row-header">${this.#v(e)}${this.#x(e)}</div>
        </div>
      `;let n=this.tools?.get(e.name)?.displayName??e.name;return t`
      <div class="timeline-row" data-status=${e.status}>
        <div class="row-header">
          ${this.#v(e)}
          <span class="row-label">
            <span class="row-name">${n}${this.#b(e)}</span>
          </span>
        </div>
      </div>
    `}get#C(){return t`
      <div class="timeline ${this._expanded?`expanded`:``}">
        <div class="timeline-content">${this.toolCalls.map(e=>this.#S(e))}</div>
      </div>
    `}render(){if(!this.#o)return n;let e=this.#s?t`<forge-ai-spinner size="small"></forge-ai-spinner>`:t`<span class="status-icon">${this.#n}</span>`;return t`
      <button class="summary" type="button" aria-expanded=${this._expanded} @click=${this.#d}>
        ${e}
        <span class="status-text">${this.#u}</span>
        ${this.#i}
        <span class="focus-indicator"></span>
      </button>
      ${this.#C}
    `}},o([s({attribute:!1})],b.prototype,`toolCalls`,void 0),o([s({attribute:!1})],b.prototype,`tools`,void 0),o([s({type:Boolean,reflect:!0,attribute:`debug-mode`})],b.prototype,`debugMode`,void 0),o([c()],b.prototype,`_expanded`,void 0),o([c()],b.prototype,`_expandedRows`,void 0),b=o([l(v)],b)})))()}function S(){return(S=e((()=>{x()})))()}export{S as t};