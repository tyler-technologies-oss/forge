import{r as A,b as i}from"./iframe-Y92HmdHZ.js";import{n as U,e as Y}from"./ref-C9xd_Bhv.js";import{s as F}from"./decorators-MNVuHF7U.js";import{s as W}from"./utils-DbbJplVM.js";import{C as G,a as q}from"./service-adapter-8tADcN_b.js";import{c as _,B as K,t as H}from"./base-lit-element-DXQv51bq.js";import{n}from"./property-4XXebId8.js";import{n as T}from"./query-assigned-nodes-D8SsSM9e.js";import{e as J}from"./class-map-COdHIAbq.js";import{n as d}from"./when-CI7b_ccM.js";import{B as Q}from"./button-BUQjmV8l.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import{C as V}from"./circular-progress-Bc1cF_P_.js";import{D as X}from"./dialog-C-zyrl9l.js";import{L as Z}from"./linear-progress-Dj7Wb6Io.js";const j=':host{display:contents;border-radius:inherit}.surface{padding:var(--forge-spacing-large, 24px);display:grid;gap:var(--forge-spacing-large, 24px)}.layout-container{display:flex;align-items:center;gap:var(--forge-spacing-large, 24px)}.layout-container .content{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px);width:100%}.message{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);flex:1 auto;margin-block:0;color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-font-size-scale, 1.25)));font-weight:var(--forge-typography-heading4-font-weight, 500);line-height:var(--forge-typography-heading4-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-line-height-scale, 1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing, .005em);text-transform:var(--forge-typography-heading4-text-transform, inherit);text-decoration:var(--forge-typography-heading4-text-decoration, inherit);margin:0}.progress-container{min-width:244px}forge-dialog.inline{border-radius:inherit}forge-dialog.inline::part(root){position:absolute;overflow:clip}forge-dialog.inline::part(root),forge-dialog.inline::part(backdrop){border-radius:inherit}.transparent{--forge-dialog-background: transparent;--forge-dialog-elevation: none}';var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,w=e=>{throw TypeError(e)},a=(e,t,o,p)=>{for(var c=p>1?void 0:p?te(t,o):t,y=e.length-1,u;y>=0;y--)(u=e[y])&&(c=(p?u(t,o,c):u(c))||c);return p&&c&&ee(t,o,c),c},v=(e,t,o)=>t.has(e)||w("Cannot "+o),l=(e,t,o)=>(v(e,t,"read from private field"),o?o.call(e):t.get(e)),x=(e,t,o)=>t.has(e)?w("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),C=(e,t,o,p)=>(v(e,t,"write to private field"),t.set(e,o),o),f=(e,t,o)=>(v(e,t,"access private method"),o),E,S,$,g,s,B,N,P,O,M,I,z,D,L,b,k;const R="forge-busy-indicator";let r=class extends($=K,S=G,E=q,$){constructor(){super(...arguments),x(this,s),this.open=!1,this.mode="fullscreen",this.headingLevel=1,this.cancelable=!1,this.variant="spinner",this.determinate=!1,this.progress=0,this.buffer=0,this.transparent=!1,x(this,g,null)}disconnectedCallback(){l(this,g)&&f(this,s,b).call(this),super.disconnectedCallback()}willUpdate(e){e.has("open")&&f(this,s,D).call(this)}render(){return i`
      <forge-dialog
        class=${J({inline:this.mode==="inline",transparent:this.transparent})}
        persistent
        fullscreen-threshold="0"
        .open=${this.open}
        .mode=${this.mode==="inline"?"inline-modal":"modal"}
        .label=${this.label||this.titleText||_(this._slottedTitleNodes)||""}
        .description=${this.description||this.message||_(this._slottedMessageNodes)||""}>
        <div class="surface" @slotchange=${f(this,s,k)}>
          ${l(this,s,B)}
          ${d(this.variant==="spinner"||this.variant==="message-only"||this.message||this.cancelable,()=>i`<div class="layout-container">${l(this,s,P)} ${l(this,s,O)}</div>`)}
          ${l(this,s,I)}
        </div>
      </forge-dialog>
    `}};g=new WeakMap;s=new WeakSet;B=function(){const e=!!this.titleText?.trim()||this._slottedTitleNodes.length>0;return d(e,()=>i`<div role="heading" aria-level=${this.headingLevel} id="title" class="title"><slot name="title">${this.titleText}</slot></div>`,()=>i`<slot name="title"></slot>`)};N=function(){const e=!!this.message?.trim()||this._slottedMessageNodes.length>0;return d(e,()=>i`<p id="message" class="message"><slot name="message">${this.message}</slot></p>`,()=>i`<slot name="message"></slot>`)};P=function(){return d(this.variant==="spinner",()=>i`<div>
          <forge-circular-progress class="spinner" aria-hidden="true" ?determinate="${this.determinate}" .progress=${this.progress}></forge-circular-progress>
        </div>`)};O=function(){const e=this.variant==="message-only"||this.message||this.cancelable;return d(e,()=>i`<div class="content">${l(this,s,N)} ${l(this,s,M)}</div>`)};M=function(){return d(this.cancelable,()=>i`<forge-button class="cancel-button" variant="outlined" @click=${f(this,s,z)}>
          <slot name="cancel-text">Cancel</slot>
        </forge-button>`)};I=function(){return d(this.variant==="progress",()=>i`<div class="progress-container">
          <forge-linear-progress
            aria-hidden="true"
            .determinate="${this.determinate}"
            .buffer=${this.buffer}
            .progress=${this.progress}></forge-linear-progress>
        </div>`)};z=function(){const e=new CustomEvent("forge-busy-indicator-cancel",{bubbles:!0,cancelable:!0});this.dispatchEvent(e),e.defaultPrevented||(this.open=!1)};D=function(){this.open&&this.mode==="fullscreen"?f(this,s,L).call(this):l(this,g)&&f(this,s,b).call(this)};L=function(){C(this,g,document.activeElement)};b=function(){l(this,g)?.focus({preventScroll:!0}),C(this,g,null)};k=function(e){const t=e.target.name;["title","message"].includes(t)&&this.requestUpdate()};r[S]=R;r[E]=[Q,V,X,Z];r.styles=A(j);a([n({type:Boolean})],r.prototype,"open",2);a([n({type:String})],r.prototype,"mode",2);a([n({attribute:"title-text"})],r.prototype,"titleText",2);a([n({attribute:"heading-level",type:Number})],r.prototype,"headingLevel",2);a([n()],r.prototype,"message",2);a([n()],r.prototype,"label",2);a([n()],r.prototype,"description",2);a([n({type:Boolean})],r.prototype,"cancelable",2);a([n()],r.prototype,"variant",2);a([n({type:Boolean})],r.prototype,"determinate",2);a([n({type:Number})],r.prototype,"progress",2);a([n({type:Number})],r.prototype,"buffer",2);a([n({type:Boolean})],r.prototype,"transparent",2);a([T({slot:"title",flatten:!0})],r.prototype,"_slottedTitleNodes",2);a([T({slot:"message",flatten:!0})],r.prototype,"_slottedMessageNodes",2);r=a([H(R)],r);const{action:re}=__STORYBOOK_MODULE_ACTIONS__,oe="forge-busy-indicator",ae=re("forge-busy-indicator-cancel"),se={title:"Components/Busy Indicator",component:oe,render:e=>{const t=Y();function o(){const p=t.value;p.open=!0,setTimeout(()=>p.open=!1,3e3)}return i`
      <forge-button variant="raised" @click=${o}>Show Busy Indicator</forge-button>
      <forge-busy-indicator
        ${U(t)}
        @forge-busy-indicator-cancel=${ae}
        .mode=${e.mode}
        .titleText="${e.titleText}"
        .message=${e.message}
        .cancelable=${e.cancelable}
        .variant=${e.variant}
        .determinate=${e.determinate}
        .progress=${e.progress}
        .buffer=${e.buffer}
        .transparent=${e.transparent}></forge-busy-indicator>
    `},argTypes:{mode:{control:"select",options:["modal","inline"]},variant:{control:"select",options:["spinner","progress","message-only"]}},args:{mode:"modal",titleText:"",message:"Please wait while we load your data...",cancelable:!1,variant:"spinner",progress:.5,buffer:1,determinate:!1,transparent:!1}},h={},m={...W,decorators:[F(`
    .parent {
      position: relative;
      height: 300px;
      border: 1px solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-large);
    }
  `)],render:()=>i`
    <div class="parent">
      <forge-busy-indicator open mode="inline" title-text="Loading" message="Please wait while we load your data..."></forge-busy-indicator>
    </div>
  `};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{}",...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
    .parent {
      position: relative;
      height: 300px;
      border: 1px solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-large);
    }
  \`)],
  render: () => html\`
    <div class="parent">
      <forge-busy-indicator open mode="inline" title-text="Loading" message="Please wait while we load your data..."></forge-busy-indicator>
    </div>
  \`
}`,...m.parameters?.docs?.source}}};const ne=["Demo","Inline"],Te=Object.freeze(Object.defineProperty({__proto__:null,Demo:h,Inline:m,__namedExportsOrder:ne,default:se},Symbol.toStringTag,{value:"Module"}));export{Te as B,h as D,m as I};
