import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{t as o}from"./overlay2-6JDRhH76.js";import{d as s,o as c,p as l,t as u}from"./decorators-DcQFeJ4p.js";var d;function f(){return(f=e((()=>{d=`:host {
  display: contents;
  overflow: visible;
}

.ai-popover {
  position: relative;
  background: var(--forge-theme-surface-bright, #ffffff);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  box-shadow: var(--forge-theme-surface-bright-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  box-sizing: border-box;
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0, 0, 0, 1);
  animation-name: fadein, scalein;
  transform-origin: center center;
  overflow: visible;
}
.ai-popover__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--forge-theme-surface-bright, #ffffff);
  transform: rotate(45deg);
  border: 1px solid var(--forge-theme-surface-container, #e0e0e0);
}

forge-ai-overlay[data-position-placement^=top] .ai-popover:has(.ai-popover__arrow) {
  margin-block-end: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=bottom] .ai-popover:has(.ai-popover__arrow) {
  margin-block-start: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=left] .ai-popover:has(.ai-popover__arrow) {
  margin-inline-end: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=right] .ai-popover:has(.ai-popover__arrow) {
  margin-inline-start: var(--forge-spacing-small, 12px);
}

forge-ai-overlay[data-position-placement^=top]:not([data-position-placement*="-"]) .ai-popover {
  transform-origin: bottom center;
}
forge-ai-overlay[data-position-placement^=top][data-position-placement$=-start] .ai-popover {
  transform-origin: bottom left;
}
forge-ai-overlay[data-position-placement^=top][data-position-placement$=-end] .ai-popover {
  transform-origin: bottom right;
}
forge-ai-overlay[data-position-placement^=top] .ai-popover__arrow {
  bottom: -6px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
}

forge-ai-overlay[data-position-placement^=right]:not([data-position-placement*="-"]) .ai-popover {
  transform-origin: left center;
}
forge-ai-overlay[data-position-placement^=right][data-position-placement$=-start] .ai-popover {
  transform-origin: left top;
}
forge-ai-overlay[data-position-placement^=right][data-position-placement$=-end] .ai-popover {
  transform-origin: left bottom;
}
forge-ai-overlay[data-position-placement^=right] .ai-popover__arrow {
  left: -6px;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
}

forge-ai-overlay[data-position-placement^=bottom]:not([data-position-placement*="-"]) .ai-popover {
  transform-origin: top center;
}
forge-ai-overlay[data-position-placement^=bottom][data-position-placement$=-start] .ai-popover {
  transform-origin: top left;
}
forge-ai-overlay[data-position-placement^=bottom][data-position-placement$=-end] .ai-popover {
  transform-origin: top right;
}
forge-ai-overlay[data-position-placement^=bottom] .ai-popover__arrow {
  top: -6px;
  clip-path: polygon(0 0, 0 100%, 100% 0);
}

forge-ai-overlay[data-position-placement^=left]:not([data-position-placement*="-"]) .ai-popover {
  transform-origin: right center;
}
forge-ai-overlay[data-position-placement^=left][data-position-placement$=-start] .ai-popover {
  transform-origin: right top;
}
forge-ai-overlay[data-position-placement^=left][data-position-placement$=-end] .ai-popover {
  transform-origin: right bottom;
}
forge-ai-overlay[data-position-placement^=left] .ai-popover__arrow {
  right: -6px;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scalein {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}`})))()}var p;function m(){return(m=e((()=>{o(),f(),i(),u(),p=class extends r{constructor(...e){super(...e),this.anchor=null,this.placement=`bottom-start`,this.flip=!1,this.shift=!1,this.autoSize=!1,this.open=!1,this.arrow=!1,this.offset=void 0,this.dismissMode=`auto`,this._onOverlayToggle=e=>{e.target===e.currentTarget&&(this.open=e.detail.open,this.dispatchEvent(new CustomEvent(`forge-ai-popover-toggle`,{detail:e.detail,bubbles:!0,composed:!0})))}}static{this.styles=n(d)}render(){return t`
      <forge-ai-overlay
        .anchor=${this.anchor}
        .placement=${this.placement}
        .flip=${this.flip}
        .shift=${this.shift}
        .autoSize=${this.autoSize}
        .offset=${this.offset}
        .open=${this.open}
        .arrowElement=${this.arrow?this._arrowElement:null}
        .dismissMode=${this.dismissMode}
        @forge-ai-overlay-toggle=${this._onOverlayToggle}>
        <div class="ai-popover">
          ${this.arrow?t`<div class="ai-popover__arrow"></div>`:null}
          <slot></slot>
        </div>
      </forge-ai-overlay>
    `}},a([s({type:Object})],p.prototype,`anchor`,void 0),a([s()],p.prototype,`placement`,void 0),a([s({type:Boolean})],p.prototype,`flip`,void 0),a([s({type:Boolean})],p.prototype,`shift`,void 0),a([s({type:Boolean,attribute:`auto-size`})],p.prototype,`autoSize`,void 0),a([s({type:Boolean,reflect:!0})],p.prototype,`open`,void 0),a([s({type:Boolean})],p.prototype,`arrow`,void 0),a([s({type:Object})],p.prototype,`offset`,void 0),a([s({attribute:`dismiss-mode`})],p.prototype,`dismissMode`,void 0),a([c(`.ai-popover__arrow`)],p.prototype,`_arrowElement`,void 0),p=a([l(`forge-ai-popover`)],p)})))()}export{m as t};