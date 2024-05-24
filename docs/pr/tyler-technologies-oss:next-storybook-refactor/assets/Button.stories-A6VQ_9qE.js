import{x as m}from"./lit-element-Dm2J4qPi.js";import{C as H,m as j,n as k,v as b,W,w as G,b as F,j as E,q as V,F as f,a as K,B as q,c as U,d as X,s as J,I as Q,G as Y}from"./base-button-adapter-BUuYOIy2.js";import"./button-BWRfv2at.js";var Z={name:"forge_logo",data:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>'};const rr=`${H}circular-progress`,er={DETERMINATE:"determinate",PROGRESS:"progress",THEME:"theme",TRACK:"track"},tr={INDETERMINATE:"forge-circular-progress--indeterminate"},or={ROOT:".forge-circular-progress",DETERMINATE_PROGRESS_CIRCLE:".progress",TEMPLATES:"svg, .spinner"},t={elementName:rr,attributes:er,classes:tr,selectors:or},ar=`<svg viewBox="0 0 4800 4800">
  <circle class="track-background" pathLength="100"></circle>
</svg>

<div class="spinner">
  <div class="left">
    <div class="circle"></div>
  </div>
  <div class="right">
    <div class="circle"></div>
  </div>
</div>
`,nr=`<svg viewBox="0 0 4800 4800">
  <circle class="track-background" pathLength="100"></circle>
  <circle class="track" pathLength="100"></circle>
  <circle class="progress" pathLength="100" stroke-dashoffset="100"></circle>
</svg>
`;class sr extends j{constructor(r){super(r),this._rootElement=k(this._component,t.selectors.ROOT)}initialize(){this._component[b]({role:"progressbar",ariaValueMin:"0",ariaValueMax:"1"})}setDeterminate(r){this._tryResetTemplate(),this._rootElement.classList.toggle(t.classes.INDETERMINATE,!r),r?(this._rootElement.insertAdjacentHTML("beforeend",nr),this._determinateProgressCircleElement=k(this._component,t.selectors.DETERMINATE_PROGRESS_CIRCLE)):(this._rootElement.insertAdjacentHTML("beforeend",ar),this._component[b]({ariaValueNow:null}),this._determinateProgressCircleElement=void 0)}setProgress(r){var o;this._component[b]({ariaValueNow:`${r}`}),(o=this._determinateProgressCircleElement)==null||o.setAttribute("stroke-dashoffset",`${(1-r)*100}`)}_tryResetTemplate(){var o;const r=(o=this._component.shadowRoot)==null?void 0:o.querySelectorAll(t.selectors.TEMPLATES);r==null||r.forEach(n=>n.remove())}}class ir{constructor(r){this._adapter=r,this._determinate=!1,this._progress=0,this._theme="primary",this._track=!1}initialize(){this._adapter.initialize(),this._applyDeterminate()}_applyDeterminate(){this._adapter.setDeterminate(this._determinate),this._determinate&&this._adapter.setProgress(this._progress)}get determinate(){return this._determinate}set determinate(r){r=!!r,this._determinate!==r&&(this._determinate=r,this._applyDeterminate(),this._adapter.toggleHostAttribute(t.attributes.DETERMINATE,this._determinate))}get progress(){return this._progress}set progress(r){isNaN(r)&&(r=0),this._progress!==r&&(this._progress=r,this._determinate&&this._adapter.setProgress(this._progress),this._adapter.setHostAttribute(t.attributes.PROGRESS,`${this._progress}`))}get theme(){return this._theme}set theme(r){this._theme!==r&&(this._theme=r,this._adapter.toggleHostAttribute(t.attributes.THEME,!!this._theme,this._theme))}get track(){return this._track}set track(r){r=!!r,this._track!==r&&(this._track=r,this._adapter.toggleHostAttribute(t.attributes.TRACK,this._track))}}const cr=`<template>
  <div class="forge-circular-progress" part="progressbar">
    <slot class="center-content"></slot>
  </div>
</template>
`,lr=":host{--_circular-progress-size: var(--forge-circular-progress-size, 48px)}:host{display:inline-flex;vertical-align:middle;min-block-size:var(--_circular-progress-size);min-inline-size:var(--_circular-progress-size);position:relative;align-items:center;justify-content:center;transition:background-color var(--_circular-progress-theme-transition-duration) var(--_circular-progress-theme-transition-timing);contain:strict;content-visibility:auto}:host([hidden]){display:none}.forge-circular-progress{--_circular-progress-padding: var(--forge-circular-progress-padding, 0);--_circular-progress-track-width: var(--forge-circular-progress-track-width, 12);--_circular-progress-track-color: var(--forge-circular-progress-track-color, transparent);--_circular-progress-track-fill-color: var(--forge-circular-progress-track-fill-color, var(--forge-theme-tertiary-container, #d0d7ff));--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-tertiary, #3d5afe));--_circular-progress-arc-duration: var(--forge-circular-progress-arc-duration, 1333ms);--_circular-progress-theme-transition-duration: var(--forge-circular-progress-theme-transition-duration, var(--forge-animation-duration-short3, .15s));--_circular-progress-theme-transition-timing: var(--forge-circular-progress-theme-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(.2, 0, 0, 1)))}.forge-circular-progress{flex:1;align-self:stretch;margin:var(--_circular-progress-padding)}.forge-circular-progress--indeterminate{will-change:transform;animation:linear infinite linear-rotate;animation-duration:calc(var(--_circular-progress-arc-duration) * 360 / 306)}.forge-circular-progress,.spinner,.left,.right,.circle,svg{position:absolute;top:0;right:0;bottom:0;left:0}.center-content{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.left{overflow:hidden;top:0;right:50%;bottom:0;left:0}.left .circle{rotate:135deg;top:0;right:-100%;bottom:0;left:0}.right{overflow:hidden;top:0;right:0;bottom:0;left:50%}.right .circle{rotate:100deg;top:0;right:0;bottom:0;left:-100%;animation-delay:calc(-.5 * var(--_circular-progress-arc-duration)),0ms}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_circular-progress-size) * var(--_circular-progress-track-width) / 100);border-color:var(--_circular-progress-indicator-color) var(--_circular-progress-indicator-color) transparent transparent;transition:border-color var(--_circular-progress-theme-transition-duration) var(--_circular-progress-theme-transition-timing);will-change:transform;animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:var(--_circular-progress-arc-duration),calc(4 * var(--_circular-progress-arc-duration));animation-timing-function:cubic-bezier(.4,0,.2,1)}svg{transform:rotate(-90deg)}svg circle{cx:50%;cy:50%;r:calc(50% * (1 - var(--_circular-progress-track-width) / 100));stroke-width:calc(var(--_circular-progress-track-width) * 1%);stroke-dasharray:100;fill:transparent}.progress{transition:stroke-dashoffset .5s cubic-bezier(0,0,.2,1),stroke var(--_circular-progress-theme-transition-duration) var(--_circular-progress-theme-transition-timing);stroke:var(--_circular-progress-indicator-color)}.track{stroke:transparent}.track-background{transition:stroke var(--_circular-progress-theme-transition-duration) var(--_circular-progress-theme-transition-timing);stroke:var(--_circular-progress-track-color)}.spinner{will-change:transform;animation:infinite both rotate-arc;animation-duration:calc(4 * var(--_circular-progress-arc-duration));animation-timing-function:cubic-bezier(.4,0,.2,1)}:host(:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--_circular-progress-track-fill-color)}:host([theme=primary]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-primary, #3f51b5))}:host([theme=primary]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-primary-container, #d1d5ed))}:host([theme=secondary]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-secondary, #ffc107))}:host([theme=secondary]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-secondary-container, #fff0c3))}:host([theme=success]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-success, #2e7d32))}:host([theme=success]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-success-container, #cde0ce))}:host([theme=error]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-error, #b00020))}:host([theme=error]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-error-container, #ecc2c9))}:host([theme=warning]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-warning, #d14900))}:host([theme=warning]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-warning-container, #f4d3c2))}:host([theme=info]) .forge-circular-progress{--_circular-progress-indicator-color: var(--forge-circular-progress-indicator-color, var(--forge-theme-info, #1565c0))}:host([theme=info]:is([track],[determinate])) .forge-circular-progress{--_circular-progress-track-color: var(--forge-circular-progress-track-color, var(--forge-theme-info-container, #c7daf0))}@media screen and (forced-colors: active){.progress{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}";var gr=Object.defineProperty,ur=Object.getOwnPropertyDescriptor,p=(e,r,o,n)=>{for(var a=n>1?void 0:n?ur(r,o):r,h=e.length-1,v;h>=0;h--)(v=e[h])&&(a=(n?v(r,o,a):v(a))||a);return n&&a&&gr(r,o,a),a};let s=class extends W(G(q)){static get observedAttributes(){return[t.attributes.DETERMINATE,t.attributes.PROGRESS,t.attributes.THEME,t.attributes.TRACK]}constructor(){super(),F(this,cr,lr),this._foundation=new ir(new sr(this))}connectedCallback(){this._foundation.initialize()}attributeChangedCallback(e,r,o){switch(e){case t.attributes.DETERMINATE:this.determinate=E(o);break;case t.attributes.PROGRESS:this.progress=V(o);break;case t.attributes.THEME:this.theme=o;break;case t.attributes.TRACK:this.track=E(o);break}}};p([f()],s.prototype,"determinate",2);p([f()],s.prototype,"progress",2);p([f()],s.prototype,"theme",2);p([f()],s.prototype,"track",2);s=p([K({name:t.elementName})],s);const _="forge-button",dr={title:"Components/Button",render:e=>{const r=U(_,e);return r.textContent=e.text,r},component:_,argTypes:{...X({tagName:_,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised","link"]},theme:{control:{type:"select"},options:Y}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},i={},c={...J,render:()=>m`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},l={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:e})=>m`
      <forge-button .variant=${e}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `},g={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:e})=>m`
      <forge-button variant=${e}>Primary</forge-button>
      <forge-button variant=${e} theme="secondary">Secondary</forge-button>
      <forge-button variant=${e} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${e} theme="success">Success</forge-button>
      <forge-button variant=${e} theme="warning">Warning</forge-button>
      <forge-button variant=${e} theme="error">Error</forge-button>
      <forge-button variant=${e} theme="info">Info</forge-button>
    `},u={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:e,iconSlot:r})=>(Q.define(Z),m`
      <forge-button .variant=${e}>
        <forge-icon slot=${r} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},d={parameters:{controls:{include:["variant","theme","disabled"]}},args:{variant:"raised"},render:({variant:e,theme:r,disabled:o})=>m`
      <forge-button .variant=${e} .theme=${r} ?disabled=${o}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `};var y,T,S;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:"{}",...(S=(T=i.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var R,A,C;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    \`;
  }
}`,...(C=(A=c.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var w,P,x;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-button .variant=\${variant}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    \`;
  }
}`,...(x=(P=l.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var $,I,O;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-button variant=\${variant}>Primary</forge-button>
      <forge-button variant=\${variant} theme="secondary">Secondary</forge-button>
      <forge-button variant=\${variant} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=\${variant} theme="success">Success</forge-button>
      <forge-button variant=\${variant} theme="warning">Warning</forge-button>
      <forge-button variant=\${variant} theme="error">Error</forge-button>
      <forge-button variant=\${variant} theme="info">Info</forge-button>
    \`;
  }
}`,...(O=(I=g.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var M,N,L;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'iconSlot']
    }
  },
  argTypes: {
    iconSlot: {
      options: ['start', 'end'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    variant: 'raised',
    iconSlot: 'start'
  },
  render: ({
    variant,
    iconSlot
  }) => {
    IconRegistry.define(tylIconForgeLogo);
    return html\`
      <forge-button .variant=\${variant}>
        <forge-icon slot=\${iconSlot} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    \`;
  }
}`,...(L=(N=u.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var z,D,B;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'theme', 'disabled']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant,
    theme,
    disabled
  }) => {
    return html\`
      <forge-button .variant=\${variant} .theme=\${theme} ?disabled=\${disabled}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    \`;
  }
}`,...(B=(D=d.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};const mr=["Demo","Variants","Anchor","Themed","WithIcon","WithCircularProgress"],vr=Object.freeze(Object.defineProperty({__proto__:null,Anchor:l,Demo:i,Themed:g,Variants:c,WithCircularProgress:d,WithIcon:u,__namedExportsOrder:mr,default:dr},Symbol.toStringTag,{value:"Module"}));export{l as A,vr as B,i as D,g as T,c as V,u as W,d as a};
