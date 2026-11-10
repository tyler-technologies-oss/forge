import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,r as c,t as l}from"./decorators-DcQFeJ4p.js";import{t as u}from"./class-map-DEew1OiS.js";import{t as d}from"./class-map-8zp5OV2u.js";var f;function p(){return(p=e((()=>{f=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-inline-message {
  --_inline-message-background:var(--forge-inline-message-background, var(--forge-theme-info-container-low, #e3edf7));
  --_inline-message-color:var(--forge-inline-message-color, var(--forge-theme-text-high, rgba(0, 0, 0, 0.87)));
  --_inline-message-shape:var(--forge-inline-message-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_inline-message-padding:var(--forge-inline-message-padding, var(--forge-spacing-small, 12px));
  --_inline-message-padding-inline:var(--forge-inline-message-padding-inline, var(--_inline-message-padding));
  --_inline-message-padding-block:var(--forge-inline-message-padding-block, var(--_inline-message-padding));
  --_inline-message-border-width:var(--forge-inline-message-border-width, var(--forge-border-thin, 1px));
  --_inline-message-border-style:var(--forge-inline-message-border-style, none);
  --_inline-message-border-color:var(--forge-inline-message-border-color, var(--forge-theme-info-container, #c7daf0));
  --_inline-message-gap:var(--forge-inline-message-gap, var(--forge-spacing-small, 12px));
  --_inline-message-icon-gap:var(--forge-inline-message-icon-gap, var(--_inline-message-gap));
  --_inline-message-content-gap:var(--forge-inline-message-content-gap, var(--_inline-message-gap));
  --_inline-message-icon-color:var(--forge-inline-message-icon-color, var(--forge-theme-on-info-container-low, #0b3768));
}

.forge-inline-message {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  background: var(--_inline-message-background);
  color: var(--_inline-message-color);
  border-radius: var(--_inline-message-shape);
  border-width: var(--_inline-message-border-width);
  border-style: var(--_inline-message-border-style);
  border-color: var(--_inline-message-border-color);
  display: flex;
  align-items: center;
  gap: var(--_inline-message-icon-gap);
  box-sizing: border-box;
  padding-inline: var(--_inline-message-padding-inline);
  padding-block: var(--_inline-message-padding-block);
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
}

.forge-inline-message:not(:has(.forge-inline-message__icon)) {
  grid-template-columns: 1fr;
}

.forge-inline-message__title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-heading1-font-weight, 500);
  line-height: var(--forge-typography-heading1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-heading1-letter-spacing, 0.0178571429em);
  text-transform: var(--forge-typography-heading1-text-transform, inherit);
  text-decoration: var(--forge-typography-heading1-text-decoration, inherit);
}

.forge-inline-message__icon {
  color: var(--_inline-message-icon-color);
  align-self: start;
  grid-row: 1/span 2;
}

:host {
  display: block;
}

.forge-inline-message {
  --forge-inline-message-background: var(--forge-theme-error-container-low, #f6e0e4);
  --forge-inline-message-color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-inline-message-icon-color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-inline-message-border-color: var(--forge-theme-error-container, #ecc2c9);
  --forge-inline-message-border-style: solid;
}
.forge-inline-message__title {
  font-weight: bold;
}
.forge-inline-message__title--empty {
  display: none;
}
.forge-inline-message__content {
  overflow-wrap: anywhere;
}
.forge-inline-message:has(.forge-inline-message__title--empty) {
  grid-template-rows: auto;
}
.forge-inline-message:has(.forge-inline-message__title--empty) .forge-inline-message__icon {
  grid-row: auto;
  align-self: center;
}

:host([density=small]) .forge-inline-message {
  --forge-inline-message-padding: var(--forge-spacing-xsmall, 8px);
  --forge-inline-message-gap: var(--forge-spacing-xsmall, 8px);
  --forge-inline-message-content-gap: var(--forge-spacing-xxsmall, 4px);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));
  font-weight: var(--forge-typography-body2-font-weight, 400);
  line-height: var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-body2-letter-spacing, 0.015625em);
  text-transform: var(--forge-typography-body2-text-transform, inherit);
  text-decoration: var(--forge-typography-body2-text-decoration, inherit);
}
:host([density=small]) .forge-inline-message__icon {
  height: 20px;
  width: 20px;
}

::slotted(*) {
  margin-block: 0;
  overflow-wrap: anywhere;
}`})))()}var m,h;function g(){return(g=e((()=>{p(),i(),l(),d(),m=`forge-ai-error-message`,h=class extends r{constructor(...e){super(...e),this.density=`medium`}static{this.styles=n(f)}#e(){this.requestUpdate()}get#t(){let e=u({"forge-inline-message__title":!0,"forge-inline-message__title--empty":this._titleNodes.length===0});return t`
      <div class=${e}>
        <slot name="title" @slotchange=${this.#e}></slot>
      </div>
    `}render(){return t`
      <div class="forge-inline-message">
        <svg
          class="forge-inline-message__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          fill="currentColor"
          aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" />
        </svg>
        ${this.#t}
        <div class="forge-inline-message__content">
          <slot></slot>
        </div>
      </div>
    `}},a([o({type:String,reflect:!0})],h.prototype,`density`,void 0),a([c({slot:`title`,flatten:!0})],h.prototype,`_titleNodes`,void 0),h=a([s(m)],h)})))()}function _(){return(_=e((()=>{g()})))()}export{_ as t};