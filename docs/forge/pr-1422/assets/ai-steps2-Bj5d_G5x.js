import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as u}from"./decorators-DcQFeJ4p.js";import{n as d}from"./when-Daf2bbVy.js";import{n as f,t as p}from"./markdown-CMYSPfDT.js";import{r as m,t as h}from"./unsafe-html-DLpnvkX2.js";var g;function _(){return(_=e((()=>{g=`@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
:host {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-small, 12px);
}

.summary {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  padding-block: var(--forge-spacing-xxsmall, 4px);
  padding-inline: var(--forge-spacing-xsmall, 8px);
  border: none;
  background-color: var(--forge-theme-surface-container-minimum, #f5f5f5);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  cursor: pointer;
  text-align: start;
  position: relative;
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
}

.chevron {
  flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.summary[aria-expanded=true] .chevron {
  transform: rotate(0deg);
}

.focus-indicator {
  position: absolute;
  display: none;
}

:host .summary:focus .focus-indicator {
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
:host .summary:focus .focus-indicator::before {
  content: "";
}
:host .summary:focus .focus-indicator {
  display: block;
  --forge-focus-indicator-shape: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}

.steps {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-xsmall, 8px);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  font-size: var(--forge-ai-markdown-font-size, 0.875rem);
  line-height: var(--forge-ai-markdown-line-height, 1.5rem);
  color: var(--forge-theme-on-surface, #000000);
  overflow-wrap: break-word;
}
.steps h1,
.steps h2,
.steps h3,
.steps h4,
.steps h5,
.steps h6 {
  margin: 1.75rem 0 var(--forge-spacing-small, 12px);
}
.steps strong {
  font-weight: 500;
}
.steps a {
  color: var(--forge-theme-primary, #3f51b5);
}
.steps hr {
  border: none;
  border-top: 1px solid var(--forge-theme-outline, #e0e0e0);
}
.steps code {
  color: var(--forge-theme-on-surface-container-low, #000000);
  background-color: var(--forge-theme-surface-container-low, #ebebeb);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  padding: var(--forge-spacing-xxxsmall, 2px) var(--forge-spacing-xxsmall, 4px);
  font-size: 0.75em;
}
.steps pre {
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
}
.steps pre:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
.steps pre code {
  display: block;
  padding: var(--forge-spacing-xsmall, 8px) var(--forge-spacing-small, 12px);
  color: var(--forge-theme-on-surface-container-minimum, #000000);
  background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  white-space: pre;
}
.steps [data-scroll-region=table] {
  max-width: 100%;
  overflow-x: auto;
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  margin-block: var(--forge-spacing-medium, 16px);
}
.steps [data-scroll-region=table]:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
.steps [data-scroll-region=table] table {
  margin-block: 0;
}
.steps table {
  width: 100%;
  border-spacing: 0;
  background-color: var(--forge-theme-surface, #ffffff);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  overflow: hidden;
  margin-block: var(--forge-spacing-medium, 16px);
}
.steps table thead {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  font-weight: bold;
  text-align: left;
  font-size: calc(var(--forge-typography-font-size, 1rem) * 0.75);
  box-sizing: border-box;
}
.steps table tr {
  height: 36px;
  height: 32px;
}
.steps table tr:nth-child(even) {
  background-color: var(--forge-theme-surface-dim, #fafafa);
}
.steps table tr:last-child td {
  border-bottom: none;
}
.steps table th,
.steps table td {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-label1-font-weight, 400);
  line-height: var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-label1-text-transform, inherit);
  text-decoration: var(--forge-typography-label1-text-decoration, inherit);
  padding-block: var(--forge-spacing-xsmall, 8px);
  padding-inline-start: var(--forge-spacing-xsmall, 8px);
  padding-inline-end: var(--forge-spacing-medium, 16px);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--forge-theme-outline, #e0e0e0);
}
.steps table th {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.8125)));
  font-weight: var(--forge-typography-label2-font-weight, 400);
  line-height: var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label2-letter-spacing, 0.0096153846em);
  text-transform: var(--forge-typography-label2-text-transform, inherit);
  text-decoration: var(--forge-typography-label2-text-decoration, inherit);
  font-weight: 600;
}
.steps > p:has(+ ol),
.steps > p:has(+ ul) {
  margin-block-end: var(--forge-spacing-small, 12px);
}
.steps > ul {
  list-style-type: disc;
  padding-inline-start: 1.6875rem;
}
.steps > ol {
  padding-inline-start: 1.75rem;
}
.steps > ol,
.steps > ul {
  margin: var(--forge-spacing-xsmall, 8px) 0;
  margin-block-end: var(--forge-spacing-medium, 16px);
}
.steps > :first-child {
  margin-block-start: 0;
}
.steps > p {
  margin-block-end: var(--forge-spacing-medium, 16px);
  overflow-wrap: anywhere;
}
.steps > p:first-child {
  margin-block-start: 0;
}
.steps > p:last-child {
  margin-block-end: 0;
}
.steps-count {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  font-weight: 700;
  text-transform: uppercase;
}

.timeline {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--forge-animation-duration-medium2, 300ms) var(--forge-animation-easing-decelerate, cubic-bezier(0, 0, 0, 1));
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
  inset-block-start: calc((var(--forge-spacing-medium-large, 20px) - var(--forge-spacing-xsmall, 8px)) / 2);
  inset-block-end: calc(-1 * var(--forge-spacing-xsmall, 8px));
  inset-inline-start: calc((var(--forge-spacing-medium-large, 20px) - 1px) / 2);
  width: 1px;
  background-color: var(--forge-theme-outline, #e0e0e0);
}
.timeline-row:last-child::before {
  display: none;
}

.row-header {
  display: flex;
  align-items: flex-start;
  gap: var(--forge-spacing-small, 12px);
  width: 100%;
  min-height: var(--forge-spacing-medium-large, 20px);
  margin-inline-start: calc(-1 * var(--forge-spacing-large, 24px));
}

.row-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--forge-spacing-medium-large, 20px);
  height: var(--forge-spacing-medium-large, 20px);
  border-radius: calc(var(--forge-shape-round, 50%) * var(--forge-shape-factor, 1));
}
.row-marker::before {
  content: "";
  flex-shrink: 0;
  width: var(--forge-spacing-xsmall, 8px);
  height: var(--forge-spacing-xsmall, 8px);
  border-radius: calc(var(--forge-shape-round, 50%) * var(--forge-shape-factor, 1));
  background-color: currentColor;
  position: relative;
  z-index: 1;
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
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  line-height: normal;
  font-weight: 500;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
}

.step-card {
  width: 100%;
}
.step-card-title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  font-weight: 700;
}
.step-card-result {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
}

.row-name strong,
.step-card-title strong {
  font-weight: 700;
}`})))()}function*v(e,t){let n=typeof t==`function`;if(e!==void 0){let r=-1;for(let i of e)r>-1&&(yield n?t(r):t),r++,yield i}}var y,b,x;function S(){return(S=e((()=>{p(),_(),a(),u(),h(),y=`forge-ai-steps`,b=2e3,x=class extends i{constructor(...e){super(...e),this.steps=[],this.running=!1,this._expanded=!0,this.#e=t`
    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  `,this.#t=t`<span class="row-marker"></span>`}static{this.styles=r(g)}#e;#t;#n(e,n){return t`${m(f(e,n))}`}get#r(){let e=this.steps.map(e=>t`<span>${this.#n(e.label,{links:!1})}</span>`),n=e.slice(0,2),r=e.length-n.length;return r>0?t`${v(n,t`, `)} +${r} more`:t`${v(n,t`, `)}`}#i(){this._expanded=!this._expanded}#a(e){return t`
      <div class="timeline-row" data-status=${e.status??`complete`}>
        <div class="row-header">
          ${this.#t}
          <span class="row-label">
            <span class="row-name">${this.#n(e.label)}</span>
          </span>
        </div>
      </div>
    `}#o(e){let n=e.detail;if(!n)return this.#a(e);let r=n.length>b?`${n.slice(0,b)}… (truncated)`:n;return t`
      <div class="timeline-row" data-status=${e.status??`complete`}>
        <div class="row-header">
          ${this.#t}
          <div class="step-card">
            <span class="step-card-title">${this.#n(e.label)}</span>
            <div class="step-card-body">
              <div class="step-card-result">${this.#n(r)}</div>
            </div>
          </div>
        </div>
      </div>
    `}get#s(){return this.running||this._expanded}get#c(){return t`
      <div id="timeline-content" class="timeline ${this.#s?`expanded`:``}" aria-hidden=${this.#s?`false`:`true`}>
        <div class="timeline-content">${this.steps.map(e=>this.#o(e))}</div>
      </div>
    `}get#l(){return d(!this.running,()=>t`
        <button class="summary" type="button" aria-expanded=${this._expanded} aria-controls="timeline-content" @click=${this.#i}>
          ${this.#e}
          <span class="status-text">${this.#r}</span>
          <span class="focus-indicator"></span>
        </button>
      `)}get#u(){let e=this.steps.length;return`${e} step${e===1?``:`s`}`}willUpdate(e){e.has(`running`)&&!this.running&&e.get(`running`)===!0&&(this._expanded=!1)}render(){return this.steps.length===0?n:t`
      <div class="steps">
        <div class="steps-count">${this.#u}</div>
        ${this.#l} ${this.#c}
      </div>
    `}},o([s({attribute:!1})],x.prototype,`steps`,void 0),o([s({type:Boolean,reflect:!0})],x.prototype,`running`,void 0),o([c()],x.prototype,`_expanded`,void 0),x=o([l(y)],x)})))()}export{S as t};