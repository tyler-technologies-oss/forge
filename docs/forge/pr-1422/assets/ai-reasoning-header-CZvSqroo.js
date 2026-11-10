import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-DcQFeJ4p.js";var l;function u(){return(u=e((()=>{l=`@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
:host {
  display: block;
}

.button-header {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  padding: 0;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
}
.button-header svg {
  fill: var(--forge-theme-text-medium);
  height: 24px;
  width: 24px;
}

.button-header-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));
  font-weight: var(--forge-typography-body2-font-weight, 400);
  line-height: var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-body2-letter-spacing, 0.015625em);
  text-transform: var(--forge-typography-body2-text-transform, inherit);
  text-decoration: var(--forge-typography-body2-text-decoration, inherit);
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  flex: 1;
}`})))()}var d,f;function p(){return(p=e((()=>{u(),i(),c(),d=`forge-ai-reasoning-header`,f=class extends r{constructor(...e){super(...e),this.expanded=!1,this.reasoning=!1}static{this.styles=n(l)}_handleClick(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent(`forge-ai-reasoning-header-toggle`,{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}render(){return t`
      <button class="button-header" type="button" @click=${this._handleClick} aria-expanded=${this.expanded}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path
            d="M3.5 19A1.5 1.5 0 0 1 5 20.5 1.5 1.5 0 0 1 3.5 22 1.5 1.5 0 0 1 2 20.5 1.5 1.5 0 0 1 3.5 19m5-3a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 8.5 21 2.5 2.5 0 0 1 6 18.5 2.5 2.5 0 0 1 8.5 16m6-1c-1.19 0-2.27-.5-3-1.35-.73.85-1.81 1.35-3 1.35-1.96 0-3.59-1.41-3.93-3.26A4.02 4.02 0 0 1 2 8a4 4 0 0 1 4-4l.77.07C7.5 3.41 8.45 3 9.5 3c1.19 0 2.27.5 3 1.35.73-.85 1.81-1.35 3-1.35 1.96 0 3.59 1.41 3.93 3.26A4.02 4.02 0 0 1 22 10a4 4 0 0 1-4 4l-.77-.07c-.73.66-1.68 1.07-2.73 1.07M6 6a2 2 0 0 0-2 2 2 2 0 0 0 2 2c.33 0 .64-.08.92-.22A2 2 0 0 0 6.5 11a2 2 0 0 0 2 2c.6 0 1.14-.27 1.5-.69l1.47-1.68L13 12.34c.38.4.91.66 1.5.66 1 0 1.83-.74 2-1.7.34.43.89.7 1.5.7a2 2 0 0 0 2-2 2 2 0 0 0-2-2c-.33 0-.64.08-.92.22A2 2 0 0 0 17.5 7a2 2 0 0 0-2-2c-.59 0-1.12.26-1.5.66l-1.53 1.71L11 5.69c-.36-.42-.9-.69-1.5-.69-1 0-1.83.74-2 1.7C7.16 6.27 6.61 6 6 6m2.5 11.5a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1" />
        </svg>
        <span class="button-header-text"> ${this.reasoning?t`<slot name="reasoning-title"></slot>`:t`<slot name="title"></slot>`} </span>
        ${this.expanded?t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>`:t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6z" />
            </svg>`}
      </button>
    `}},a([o({type:Boolean,reflect:!0})],f.prototype,`expanded`,void 0),a([o({type:Boolean,reflect:!0})],f.prototype,`reasoning`,void 0),f=a([s(d)],f)})))()}function m(){return(m=e((()=>{p()})))()}export{m as t};