import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{t as o}from"./overlay2-6JDRhH76.js";import{d as s,l as c,o as l,p as u,t as d}from"./decorators-DcQFeJ4p.js";import{n as f}from"./when-Daf2bbVy.js";import{t as p}from"./class-map-DEew1OiS.js";import{t as m}from"./class-map-8zp5OV2u.js";var h;function g(){return(g=e((()=>{h=`@keyframes slidein {
  from {
    opacity: 0;
    transform: translateX(var(--_tooltip-slidein-x)) translateY(var(--_tooltip-slidein-y));
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}
:host {
  display: contents;
  position: relative;
}

.ai-tooltip {
  --_tooltip-background: var(--forge-tooltip-background, var(--forge-theme-surface-inverse, #333333));
  --_tooltip-color: var(--forge-tooltip-color, var(--forge-theme-on-surface-inverse, #ffffff));
  --_tooltip-shape: var(--forge-tooltip-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_tooltip-padding: var(--forge-tooltip-padding, var(--forge-spacing-xsmall, 8px));
  --_tooltip-padding-block: var(--forge-tooltip-padding-block, var(--_tooltip-padding));
  --_tooltip-padding-inline: var(--forge-tooltip-padding-inline, var(--_tooltip-padding));
  --_tooltip-width: var(--forge-tooltip-width, max-content);
  --_tooltip-max-width: var(--forge-tooltip-max-width, 320px);
  --_tooltip-elevation: var(--forge-tooltip-elevation, var(--forge-theme-surface-bright-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)));
  --_tooltip-content-align: var(--forge-tooltip-content-align, center);
  --_tooltip-border-width: var(--forge-tooltip-border-width, 0);
  --_tooltip-border-style: var(--forge-tooltip-border-style, solid);
  --_tooltip-border-color: var(--forge-tooltip-border-color, var(--forge-theme-outline, #e0e0e0));
  --_tooltip-animation-timing: var(--forge-tooltip-animation-timing, var(--forge-animation-easing-decelerate, cubic-bezier(0, 0, 0, 1)));
  --_tooltip-animation-duration: var(--forge-tooltip-animation-duration, var(--forge-animation-duration-short3, 150ms));
  --_tooltip-animation-offset: var(--forge-tooltip-animation-offset, 24px);
  --_tooltip-arrow-size: var(--forge-tooltip-arrow-size, 8px);
  --_tooltip-arrow-height: var(--forge-tooltip-arrow-height, var(--_tooltip-arrow-size));
  --_tooltip-arrow-width: var(--forge-tooltip-arrow-width, var(--_tooltip-arrow-size));
  --_tooltip-arrow-shape: var(--forge-tooltip-arrow-shape, calc(var(--forge-shape-small, 2px) * var(--forge-shape-factor, 1)));
  --_tooltip-arrow-rotation: var(--forge-tooltip-arrow-rotation, 0deg);
  --_tooltip-arrow-top-rotation: var(--forge-tooltip-arrow-top-rotation, 315deg);
  --_tooltip-arrow-right-rotation: var(--forge-tooltip-arrow-right-rotation, 45deg);
  --_tooltip-arrow-bottom-rotation: var(--forge-tooltip-arrow-bottom-rotation, 135deg);
  --_tooltip-arrow-left-rotation: var(--forge-tooltip-arrow-left-rotation, 225deg);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  position: relative;
  background: var(--_tooltip-background);
  color: var(--_tooltip-color);
  border-radius: var(--_tooltip-shape);
  border-width: var(--_tooltip-border-width);
  border-style: var(--_tooltip-border-style);
  border-color: var(--_tooltip-border-color);
  padding-block: var(--_tooltip-padding-block);
  padding-inline: var(--_tooltip-padding-inline);
  box-shadow: var(--_tooltip-elevation);
  width: var(--_tooltip-width);
  max-width: var(--_tooltip-max-width);
  text-align: var(--_tooltip-content-align);
  line-height: normal;
  white-space: normal;
  animation-duration: var(--_tooltip-animation-duration);
  animation-timing-function: var(--_tooltip-animation-timing);
  animation-name: slidein;
  animation-fill-mode: forwards;
  position: relative;
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0, 0, 0, 1);
  animation-name: tooltip-fadein, tooltip-scalein;
  transform-origin: center center;
}
.ai-tooltip__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--forge-tooltip-background, var(--forge-theme-surface-inverse, #333333));
  transform: rotate(45deg);
  z-index: -1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

forge-ai-overlay[data-position-placement^=top] .ai-tooltip {
  margin-block-end: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=bottom] .ai-tooltip {
  margin-block-start: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=left] .ai-tooltip {
  margin-inline-end: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=right] .ai-tooltip {
  margin-inline-start: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=top]:not([data-position-placement*="-"]) .ai-tooltip {
  transform-origin: bottom center;
}
forge-ai-overlay[data-position-placement^=top][data-position-placement$=-start] .ai-tooltip {
  transform-origin: bottom left;
}
forge-ai-overlay[data-position-placement^=top][data-position-placement$=-end] .ai-tooltip {
  transform-origin: bottom right;
}
forge-ai-overlay[data-position-placement^=top] .ai-tooltip__arrow {
  bottom: -5px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
}

forge-ai-overlay[data-position-placement^=right]:not([data-position-placement*="-"]) .ai-tooltip {
  transform-origin: left center;
}
forge-ai-overlay[data-position-placement^=right][data-position-placement$=-start] .ai-tooltip {
  transform-origin: left top;
}
forge-ai-overlay[data-position-placement^=right][data-position-placement$=-end] .ai-tooltip {
  transform-origin: left bottom;
}
forge-ai-overlay[data-position-placement^=right] .ai-tooltip__arrow {
  left: -5px;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
}

forge-ai-overlay[data-position-placement^=bottom]:not([data-position-placement*="-"]) .ai-tooltip {
  transform-origin: top center;
}
forge-ai-overlay[data-position-placement^=bottom][data-position-placement$=-start] .ai-tooltip {
  transform-origin: top left;
}
forge-ai-overlay[data-position-placement^=bottom][data-position-placement$=-end] .ai-tooltip {
  transform-origin: top right;
}
forge-ai-overlay[data-position-placement^=bottom] .ai-tooltip__arrow {
  top: -5px;
  clip-path: polygon(0 0, 0 100%, 100% 0);
}

forge-ai-overlay[data-position-placement^=left]:not([data-position-placement*="-"]) .ai-tooltip {
  transform-origin: right center;
}
forge-ai-overlay[data-position-placement^=left][data-position-placement$=-start] .ai-tooltip {
  transform-origin: right top;
}
forge-ai-overlay[data-position-placement^=left][data-position-placement$=-end] .ai-tooltip {
  transform-origin: right bottom;
}
forge-ai-overlay[data-position-placement^=left] .ai-tooltip__arrow {
  right: -5px;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.tooltip-content--hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

@keyframes tooltip-fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes tooltip-scalein {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}`})))()}var _;function v(){return(v=e((()=>{o(),g(),i(),d(),m(),_=class extends r{constructor(...e){super(...e),this.for=``,this.text=``,this.placement=`top`,this.trigger=`hover`,this.open=!1,this.delay=500,this.hideDelay=0,this._anchorElement=null,this.#e=null,this.#t=null,this._handleShow=()=>{this._clearTimeouts(),this.delay>0?this.#e=window.setTimeout(()=>{this.open=!0},this.delay):this.open=!0},this._handleHide=()=>{this._clearTimeouts(),this.hideDelay>0?this.#t=window.setTimeout(()=>{this.open=!1},this.hideDelay):this.open=!1},this._handleToggle=()=>{this.open=!this.open},this._handleAnchorClick=()=>{this._clearTimeouts(),this.open=!1},this._handleKeyDown=e=>{e.key===`Escape`&&this.open&&(this.open=!1)},this._onOverlayToggle=e=>{e.target===e.currentTarget&&(this.open=e.detail.open,this.dispatchEvent(new CustomEvent(`forge-ai-tooltip-toggle`,{detail:e.detail,bubbles:!0,composed:!0})))}}static{this.styles=n(h)}#e;#t;connectedCallback(){super.connectedCallback(),this._findAnchorElement(),this._attachEventListeners(),this._updateHostAttributes(),!this._anchorElement&&this.for&&setTimeout(()=>{this._findAnchorElement(),this._attachEventListeners()},0)}disconnectedCallback(){super.disconnectedCallback(),this._detachEventListeners(),this._clearTimeouts(),document.removeEventListener(`keydown`,this._handleKeyDown)}updated(e){super.updated(e),e.has(`for`)&&(this._detachEventListeners(),this._findAnchorElement(),this._attachEventListeners()),e.has(`open`)&&(this._updateHostAttributes(),this.open?(document.addEventListener(`keydown`,this._handleKeyDown),this.updateComplete.then(()=>{let e=this.shadowRoot?.querySelector(`forge-ai-overlay`);e&&this._arrowElement&&(e.arrowElement=this._arrowElement)})):document.removeEventListener(`keydown`,this._handleKeyDown))}_findAnchorElement(){if(!this.for)this._anchorElement=null;else{if(this._anchorElement=document.getElementById(this.for),!this._anchorElement){let e=this.getRootNode();e!==document&&`querySelector`in e&&(this._anchorElement=e.querySelector(`#${this.for}`))}this._anchorElement||console.warn(`Tooltip anchor element with id "${this.for}" not found`)}}_updateHostAttributes(){this.setAttribute(`role`,this.open?`tooltip`:`none`),this.setAttribute(`aria-hidden`,String(!this.open)),this.open?this.setAttribute(`aria-live`,`polite`):this.removeAttribute(`aria-live`)}_attachEventListeners(){if(this._anchorElement)switch(this.trigger){case`hover`:this._anchorElement.addEventListener(`mouseenter`,this._handleShow),this._anchorElement.addEventListener(`mouseleave`,this._handleHide),this._anchorElement.addEventListener(`focusin`,this._handleShow),this._anchorElement.addEventListener(`focusout`,this._handleHide),this._anchorElement.addEventListener(`click`,this._handleAnchorClick);break;case`focus`:this._anchorElement.addEventListener(`focusin`,this._handleShow),this._anchorElement.addEventListener(`focusout`,this._handleHide);break;case`click`:this._anchorElement.addEventListener(`click`,this._handleToggle)}}_detachEventListeners(){this._anchorElement&&(this._anchorElement.removeEventListener(`mouseenter`,this._handleShow),this._anchorElement.removeEventListener(`mouseleave`,this._handleHide),this._anchorElement.removeEventListener(`focusin`,this._handleShow),this._anchorElement.removeEventListener(`focusout`,this._handleHide),this._anchorElement.removeEventListener(`click`,this._handleToggle),this._anchorElement.removeEventListener(`click`,this._handleAnchorClick))}_clearTimeouts(){this.#e&&=(clearTimeout(this.#e),null),this.#t&&=(clearTimeout(this.#t),null)}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get#n(){return this.text.trim().length>0?t`${this.text}`:t`<slot></slot>`}render(){let e={"tooltip-content":!0,"tooltip-content--hidden":!this.open};return t`
      ${f(this.open,()=>t` <!-- Overlay for visual presentation when open -->
            <forge-ai-overlay
              .anchor=${this._anchorElement}
              .placement=${this.placement}
              flip
              shift
              .open=${this.open}
              @forge-ai-overlay-toggle=${this._onOverlayToggle}>
              <div class="ai-tooltip">
                <div class="ai-tooltip__arrow"></div>
                ${this.#n}
              </div>
            </forge-ai-overlay>`,()=>t`
          <!-- Content shown when closed for accessibility -->
          <div class=${p(e)}>${this.#n}</div>
        `)}
    `}},a([s()],_.prototype,`for`,void 0),a([s()],_.prototype,`text`,void 0),a([s()],_.prototype,`placement`,void 0),a([s()],_.prototype,`trigger`,void 0),a([s({type:Boolean,reflect:!0})],_.prototype,`open`,void 0),a([s({type:Number})],_.prototype,`delay`,void 0),a([s({type:Number,attribute:`hide-delay`})],_.prototype,`hideDelay`,void 0),a([c()],_.prototype,`_anchorElement`,void 0),a([l(`.ai-tooltip__arrow`)],_.prototype,`_arrowElement`,void 0),_=a([u(`forge-ai-tooltip`)],_)})))()}export{v as t};