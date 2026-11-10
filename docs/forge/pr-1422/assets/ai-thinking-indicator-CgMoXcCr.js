import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,p as c,t as l}from"./decorators-DcQFeJ4p.js";var u;function d(){return(d=e((()=>{u=`:host {
  --_ai-thinking-indicator-dot-color: var(--forge-ai-thinking-indicator-dot-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  --_ai-thinking-indicator-dot-size: var(--forge-ai-thinking-indicator-dot-size, 6px);
  --_ai-thinking-indicator-gap: var(--forge-ai-thinking-indicator-gap, var(--forge-spacing-xxsmall, 4px));
  --_ai-thinking-indicator-animation-duration: var(--forge-ai-thinking-indicator-animation-duration, 2s);
  display: inline-block;
  box-sizing: border-box;
}

.thinking-indicator {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-small, 12px);
  height: calc(var(--_ai-thinking-indicator-dot-size) * 2);
}

.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--_ai-thinking-indicator-gap);
}

.dot {
  width: var(--_ai-thinking-indicator-dot-size);
  height: var(--_ai-thinking-indicator-dot-size);
  background-color: var(--_ai-thinking-indicator-dot-color);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8) translateY(0);
  animation: thinking-animation var(--_ai-thinking-indicator-animation-duration) ease-in-out infinite;
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.15s;
}

.dot-3 {
  animation-delay: 0.3s;
}

@keyframes thinking-animation {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(0);
  }
  10% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  20% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  30% {
    opacity: 1;
    transform: scale(1.2) translateY(-4px);
  }
  40% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(-2px);
  }
  60% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  70% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  80% {
    opacity: 0.7;
    transform: scale(0.9) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(0);
  }
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
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  user-select: none;
  white-space: nowrap;
  background: linear-gradient(90deg, var(--forge-theme-text-low, rgba(0, 0, 0, 0.38)) 0%, var(--forge-theme-text-high, rgba(0, 0, 0, 0.87)) 50%, var(--forge-theme-text-low, rgba(0, 0, 0, 0.38)) 100%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
/* Respect user's reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: thinking-animation-reduced var(--_ai-thinking-indicator-animation-duration) ease-in-out infinite;
  }
  @keyframes thinking-animation-reduced {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  .status-text {
    animation: none;
    background: none;
    -webkit-text-fill-color: unset;
    color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  }
}`})))()}var f,p,m;function h(){return(h=e((()=>{d(),a(),l(),f=`forge-ai-thinking-indicator`,p=`Thinking...,Processing...,Reviewing...,Considering...,Evaluating...,Analyzing...,Assessing...,Auditing...,Deliberating...,Adjudicating...,Cogitating...,Ruminating...,Percolating...,Marshaling...,Collating...,Parsing...,Distilling...,Forging...,Refining...,Reconciling...,Finalizing...,Validating...,Verifying...,Contemplating...,Pondering...,Weighing...,Scrutinizing...,Examining...,Investigating...,Deducing...,Inferring...,Reasoning...,Synthesizing...,Formulating...,Compiling...,Consulting...,Cross-referencing...,Interpreting...,Untangling...,Sifting...,Triangulating...`.split(`,`),m=class extends i{constructor(...e){super(...e),this.showText=!1,this.initialDelay=0,this.cycleInterval=5e3,this.#e=``,this.#t=-1,this.#i=t`
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
  `}static{this.styles=r(u)}#e;#t;#n;#r;#i;connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.#a()}disconnectedCallback(){super.disconnectedCallback(),this.#s()}updated(e){e.has(`showText`)&&this.#a()}#a(){this.#s(),this.showText&&this.#o()}#o(){this.#r=window.setTimeout(()=>{this.#c(),this.#n=window.setInterval(()=>{this.#c()},this.cycleInterval)},this.initialDelay)}#s(){this.#r&&=(clearTimeout(this.#r),void 0),this.#n&&=(clearInterval(this.#n),void 0),this.#e=``,this.#t=-1}#c(){let e;do e=Math.floor(Math.random()*p.length);while(e===this.#t&&p.length>1);this.#t=e,this.#e=p[e],this.requestUpdate()}get#l(){return!this.showText||!this.#e?n:t`<div class="status-text" aria-live="polite">${this.#e}</div>`}render(){return t`
      <div class="thinking-indicator">
        <div class="dots-container">${this.#i}</div>
        ${this.#l}
      </div>
    `}},o([s({type:Boolean,attribute:`show-text`})],m.prototype,`showText`,void 0),o([s({type:Number,attribute:`initial-delay`})],m.prototype,`initialDelay`,void 0),o([s({type:Number,attribute:`cycle-interval`})],m.prototype,`cycleInterval`,void 0),m=o([c(f)],m)})))()}function g(){return(g=e((()=>{h()})))()}export{g as t};