import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-DcQFeJ4p.js";var l;function u(){return(u=e((()=>{l=`:host {
  display: inline-block;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner svg {
  animation: rotate 1.4s linear infinite;
}
.spinner--extra-small {
  width: 16px;
  height: 16px;
}
.spinner--small {
  width: 24px;
  height: 24px;
}
.spinner--medium {
  width: 32px;
  height: 32px;
}
.spinner--large {
  width: 48px;
  height: 48px;
}

.track {
  stroke: var(--forge-ai-spinner-track-color, var(--forge-theme-outline-low, #9e9e9e));
  opacity: 0.2;
}

.indicator {
  stroke: var(--forge-ai-spinner-color, var(--forge-theme-primary, #3f51b5));
  stroke-linecap: round;
  stroke-dasharray: 125.6;
  stroke-dashoffset: 125.6;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 125.6;
    transform: rotate(0deg);
  }
  50% {
    stroke-dashoffset: 31.4;
    transform: rotate(240deg);
  }
  100% {
    stroke-dashoffset: 125.6;
    transform: rotate(720deg);
  }
}`})))()}var d,f;function p(){return(p=e((()=>{u(),i(),c(),d=`forge-ai-spinner`,f=class extends r{constructor(...e){super(...e),this.size=`medium`}static{this.styles=n(l)}render(){return t`
      <div class="spinner spinner--${this.size}">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle class="track" cx="24" cy="24" r="20" fill="none" stroke-width="4"></circle>
          <circle class="indicator" cx="24" cy="24" r="20" fill="none" stroke-width="4"></circle>
        </svg>
      </div>
    `}},a([o({type:String})],f.prototype,`size`,void 0),f=a([s(d)],f)})))()}export{p as t};