var T=e=>{throw TypeError(e)};var B=(e,r,t)=>r.has(e)||T("Cannot "+t);var a=(e,r,t)=>(B(e,r,"read from private field"),t?t.call(e):r.get(e)),y=(e,r,t)=>r.has(e)?T("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),x=(e,r,t,l)=>(B(e,r,"write to private field"),l?l.call(e,t):r.set(e,t),t),g=(e,r,t)=>(B(e,r,"access private method"),t);import{b as i,r as j}from"./iframe-DQLkTsj5.js";import{n as U,e as Y}from"./ref-DGfk93r-.js";import{t as W,C as G,a as K}from"./service-adapter-DlT-lJx7.js";import{n as v}from"./property-CTzj-79N.js";import{e as q}from"./base-button-DBIl4sjK.js";import{n as $}from"./query-assigned-nodes-D8SsSM9e.js";import{o as w}from"./style-map-DmjQRv9U.js";import{n as C}from"./when-CI7b_ccM.js";import{K as F,I as H,D as J}from"./tyler-icons-DPuUJ4cJ.js";import{c as D,B as Q}from"./base-lit-element-D917_3Iy.js";import{B as V}from"./button-DT_Na7FY.js";import{C as X}from"./circular-progress-BL_OHw4o.js";import{D as Z}from"./dialog-D41xgR_D.js";import{I as tt}from"./icon-button-CMY5cmct.js";const et=':host{display:contents}.outer-container{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:var(--forge-spacing-medium, 16px);gap:var(--forge-spacing-medium, 16px);max-width:480px}.title-container{display:grid;grid-template-columns:1fr auto;align-items:start;gap:var(--forge-spacing-medium, 16px)}.close-button-container{height:24px;margin-block-start:-10px;margin-inline-end:-10px}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-font-size-scale, 1.25)));font-weight:var(--forge-typography-heading4-font-weight, 500);line-height:var(--forge-typography-heading4-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-line-height-scale, 1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing, .005em);text-transform:var(--forge-typography-heading4-text-transform, inherit);text-decoration:var(--forge-typography-heading4-text-decoration, inherit);text-wrap:balance;word-break:break-all}h1{margin:0}.message-container{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);color:inherit}.actions-container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center;flex-wrap:wrap;flex-direction:row;justify-content:end}';var ot=Object.defineProperty,c=(e,r,t,l)=>{for(var n=void 0,p=e.length-1,_;p>=0;p--)(_=e[p])&&(n=_(r,t,n)||n);return n&&ot(r,t,n),n},E,N,S;const O="forge-confirmation-dialog";var b,o,z,f,I,d,R,M,P,k,m,A,L;const u=class u extends(S=Q,N=G,E=K,S){constructor(){super(...arguments);y(this,o);y(this,b);y(this,f);y(this,d);this.open=!1,this.isBusy=!1,this.busyLabel="Loading",x(this,f,i`<slot name="title" id="confirmation-dialog-title" class="title"></slot>`),x(this,d,i`<slot name="secondary-button-text" id="secondary-button-slot"></slot>`)}willUpdate(t){t.has("isBusy")&&x(this,b,this.isBusy&&this._primaryButtonRef?`${this._primaryButtonRef.clientWidth}px`:void 0)}render(){const t=this._slottedTitleNodes.length>0;return i`
      <forge-dialog
        @slotchange=${g(this,o,L)}
        @forge-dialog-before-close=${g(this,o,A)}
        @forge-dialog-close=${()=>this.isBusy=!1}
        fullscreen-threshold="0"
        ?open=${this.open}
        .label=${this.label||D(this._slottedTitleNodes)||""}
        .description=${this.description||D(this._slottedMessageNodes)||""}>
        <div class="outer-container">
          <div class="title-container" style=${w({display:t?"grid":"none"})}>
            ${a(this,o,z)}
            <div class="close-button-container">${a(this,o,I)}</div>
          </div>
          <div class="message-container">
            <slot name="message" id="confirmation-message"></slot>
          </div>
          <div class="actions-container">${a(this,o,P)} ${a(this,o,k)}</div>
        </div>
      </forge-dialog>
    `}};b=new WeakMap,o=new WeakSet,z=function(){const t=this._slottedTitleNodes.length>0;return C(t,()=>i`<h1>${a(this,f)}</h1>`,()=>i`${a(this,f)}`)},f=new WeakMap,I=function(){return i`
      <forge-icon-button autofocus aria-label="Close confirmation dialog" @click=${()=>g(this,o,m).call(this,!1)}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    `},d=new WeakMap,R=function(){return this.isBusy?a(this,o,M):i`<slot name="primary-button-text" id="primary-button-slot">Confirm</slot>`},M=function(){return i`<forge-circular-progress slot="end" aria-label=${this.busyLabel}></forge-circular-progress>`},P=function(){const t=this._slottedSecondaryButtonTextNodes.length>0;return C(t,()=>i`
        <forge-button variant="outlined" ?disabled=${this.isBusy} id="secondary-button" @click=${()=>g(this,o,m).call(this,!1)}>
          ${a(this,d)}
        </forge-button>
      `,()=>i`${a(this,d)}`)},k=function(){return i`
      <forge-button
        ?disabled=${this.isBusy}
        variant="raised"
        id="primary-button"
        style=${w({minWidth:a(this,b)})}
        @click=${()=>g(this,o,m).call(this,!0)}>
        ${a(this,o,R)}
      </forge-button>
    `},m=function(t,l="action",n){const p=new CustomEvent("forge-confirmation-dialog-action",{bubbles:!0,composed:!0,cancelable:!0,detail:{value:t,reason:l}});this.dispatchEvent(p),p.defaultPrevented&&n?n?.preventDefault():p.defaultPrevented||(this.open=!1,this.isBusy=!1)},A=function(t){if(t.detail.reason==="backdrop"){t.preventDefault();return}g(this,o,m).call(this,!1,"light-dismiss",t)},L=function(t){const l=t.target.name;["title","secondary-button-text","primary-button-text"].includes(l)&&this.requestUpdate()},u[N]=O,u[E]=[V,X,Z,tt,F],H.define([J]),u.styles=j(et);let s=u;c([v({type:Boolean})],s.prototype,"open");c([v()],s.prototype,"label");c([v()],s.prototype,"description");c([v({type:Boolean,attribute:"is-busy"})],s.prototype,"isBusy");c([v({type:String,attribute:"busy-label"})],s.prototype,"busyLabel");c([$({slot:"title",flatten:!0})],s.prototype,"_slottedTitleNodes");c([$({slot:"message",flatten:!0})],s.prototype,"_slottedMessageNodes");c([$({slot:"secondary-button-text",flatten:!0})],s.prototype,"_slottedSecondaryButtonTextNodes");c([q("#primary-button")],s.prototype,"_primaryButtonRef");W(O,s);const{action:rt}=__STORYBOOK_MODULE_ACTIONS__,it="forge-confirmation-dialog",nt=rt("forge-confirmation-dialog-action"),at={title:"Components/Confirmation Dialog",render:e=>{const r=Y();function t(){const n=r.value;n.open=!n.open}function l(n){nt(n),e.preventDefault&&n.preventDefault()}return i`
      <forge-button variant="raised" @click=${t}>Show Confirmation Dialog</forge-button>
      <forge-confirmation-dialog ${U(r)} @forge-confirmation-dialog-action=${l} .isBusy=${e.isBusy}>
        ${e.title.length?i`<span slot="title">${e.title}</span>`:""}
        ${e.message.length?i`<span slot="message">${e.message}</span>`:""}
        ${e.secondaryButtonText.length?i`<span slot="secondary-button-text">${e.secondaryButtonText}</span>`:""}
        ${e.primaryButtonText.length?i`<span slot="primary-button-text">${e.primaryButtonText}</span>`:""}
      </forge-confirmation-dialog>
    `},component:it,argTypes:{isBusy:{control:"boolean"},title:{control:"text"},message:{control:"text"},secondaryButtonText:{control:"text"},primaryButtonText:{control:"text"},preventDefault:{control:"boolean"}},args:{isBusy:!1,title:"Delete selected images?",message:"Images will be permanently removed from your account and all synced devices.",secondaryButtonText:"No",primaryButtonText:"Yes",preventDefault:!1}},h={};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{}",...h.parameters?.docs?.source}}};const st=["Demo"],_t=Object.freeze(Object.defineProperty({__proto__:null,Demo:h,__namedExportsOrder:st,default:at},Symbol.toStringTag,{value:"Module"}));export{_t as C,h as D};
