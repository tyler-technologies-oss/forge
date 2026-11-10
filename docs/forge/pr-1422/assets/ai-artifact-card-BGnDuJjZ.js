import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as u}from"./decorators-DcQFeJ4p.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";var p;function m(){return(m=e((()=>{p=`@keyframes fadein {
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
  --_accent-color: var(--forge-ai-artifact-card-accent-color, var(--forge-theme-primary, #3f51b5));
  --_border-radius: var(--forge-ai-artifact-card-border-radius, 12px);
  display: block;
}

:host([hidden]),
:host([data-collapsed]) {
  display: none;
}

/*
 * Hover and press feedback come from the Forge state layer. The active ring is drawn outside the border
 * with a spread shadow rather than a thicker border, so the card's layout never shifts between states.
 */
.artifact-card {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  gap: var(--forge-ai-artifact-card-gap, var(--forge-spacing-small, 12px));
  padding: var(--forge-ai-artifact-card-padding, var(--forge-spacing-xsmall, 8px) var(--forge-spacing-small, 12px));
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: var(--_border-radius);
  background: var(--forge-ai-artifact-card-background, var(--forge-theme-surface, #ffffff));
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
  outline: none;
  transition: box-shadow 150ms ease, border-color 150ms ease;
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
.artifact-card::before {
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
.artifact-card:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.artifact-card:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}
.artifact-card:disabled {
  opacity: 0.5;
  cursor: default;
}
.artifact-card:disabled::before {
  display: none;
}

:host([active]) .artifact-card {
  border-color: color-mix(in srgb, var(--_accent-color) 40%, transparent);
  background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--_accent-color) 8%, transparent);
}

.focus-indicator {
  position: absolute;
  display: none;
}

.artifact-card:focus-visible .focus-indicator {
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
  display: block;
  --forge-focus-indicator-shape: var(--_border-radius);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--forge-spacing-xlarge, 32px);
  height: var(--forge-spacing-xlarge, 32px);
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: 6px;
  background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
}

.icon svg,
.icon ::slotted(*) {
  display: block;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
}

.subtitle {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-label1-font-weight, 400);
  line-height: var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-label1-text-transform, inherit);
  text-decoration: var(--forge-typography-label1-text-decoration, inherit);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--forge-spacing-xlarge, 32px);
  height: var(--forge-spacing-xlarge, 32px);
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.action svg,
.action ::slotted(*) {
  display: block;
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/*
 * The default arrow promises the card opens something, which the active card already is. Its space is
 * kept so the text doesn't reflow when a card becomes active. Slotted action icons stay visible.
 */
:host([active]) .arrow {
  visibility: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/*
 * Inside a group the card becomes a list row: the group draws the border, corners, and dividers,
 * so the row gives those up and shows active as a fill rather than a ring.
 */
.artifact-card--grouped {
  min-height: var(--forge-spacing-xxxlarge, 56px);
  border: none;
  border-radius: 0;
}

/*
 * Square, because the group clips its rows to its own rounded corners. The group hands the top and bottom
 * rows its inner radius so their rings follow the curve instead of being cut off.
 */
.artifact-card--grouped:focus-visible .focus-indicator {
  --forge-focus-indicator-shape-start-start: var(--_forge-ai-artifact-card-group-start-radius, 0px);
  --forge-focus-indicator-shape-start-end: var(--_forge-ai-artifact-card-group-start-radius, 0px);
  --forge-focus-indicator-shape-end-start: var(--_forge-ai-artifact-card-group-end-radius, 0px);
  --forge-focus-indicator-shape-end-end: var(--_forge-ai-artifact-card-group-end-radius, 0px);
}

:host([active]) .artifact-card--grouped {
  background: color-mix(in srgb, var(--_accent-color) 8%, transparent);
  box-shadow: none;
}`})))()}var h,g,_,v;function y(){return(y=e((()=>{m(),a(),u(),f(),h=`forge-ai-artifact-card`,g=`data-collapsed`,_=`forge-ai-artifact-card-group`,v=class extends i{constructor(...e){super(...e),this.titleText=``,this.subtitleText=``,this.assetId=``,this.active=!1,this.disabled=!1,this._grouped=!1,this.#e=t`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
    </svg>
  `,this.#t=t`
    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5.25 5.25H12.75V12.75M5.25 12.75L12.75 5.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `}static{this.styles=r(p)}#e;#t;connectedCallback(){super.connectedCallback(),this.#n()}#n(){this._grouped=this.parentElement?.tagName.toLowerCase()===_,this._grouped?this.setAttribute(`role`,`listitem`):(this.getAttribute(`role`)===`listitem`&&this.removeAttribute(`role`),this.removeAttribute(g))}#r(){this.disabled||this.dispatchEvent(new CustomEvent(`forge-ai-artifact-card-open`,{detail:{assetId:this.assetId},bubbles:!0,composed:!0}))}get#i(){return this.actionLabel?t`<span class="sr-only">${this.actionLabel}</span>`:n}render(){return t`
      <button
        class=${d({"artifact-card":!0,"artifact-card--grouped":this._grouped})}
        type="button"
        aria-current=${this.active?`true`:n}
        ?disabled=${this.disabled}
        @click=${this.#r}>
        <span class="icon" aria-hidden="true">
          <slot name="icon">${this.#e}</slot>
        </span>
        <span class="text">
          <span class="title">${this.titleText}</span>
          <span class="subtitle">${this.subtitleText}</span>
        </span>
        <span class="action" aria-hidden="true">
          <slot name="action-icon">${this.#t}</slot>
        </span>
        ${this.#i}
        <span class="focus-indicator"></span>
      </button>
    `}},o([s({attribute:`title-text`})],v.prototype,`titleText`,void 0),o([s({attribute:`subtitle-text`})],v.prototype,`subtitleText`,void 0),o([s({attribute:`action-label`})],v.prototype,`actionLabel`,void 0),o([s({attribute:`asset-id`})],v.prototype,`assetId`,void 0),o([s({type:Boolean,reflect:!0})],v.prototype,`active`,void 0),o([s({type:Boolean,reflect:!0})],v.prototype,`disabled`,void 0),o([c()],v.prototype,`_grouped`,void 0),v=o([l(h)],v)})))()}function b(){return(b=e((()=>{y()})))()}export{g as n,y as r,b as t};