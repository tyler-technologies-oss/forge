import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as u}from"./decorators-DcQFeJ4p.js";import{t as d}from"./ai-reasoning-header-CZvSqroo.js";import{t as f}from"./ai-chat-interface-DhifI1b6.js";import{t as p}from"./ai-chat-header-CT7uKciU.js";import{t as m}from"./ai-gradient-container-BG5fEAmM.js";var h;function g(){return(g=e((()=>{h=`:host {
  display: block;
}

.reasoning {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}
.reasoning.expanded {
  max-height: 500px;
}

.content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  padding: var(--forge-spacing-medium, 16px);
}`})))()}var _,v;function y(){return(y=e((()=>{g(),a(),u(),_=`forge-ai-reasoning`,v=class extends i{constructor(...e){super(...e),this.expanded=!1}static{this.styles=r(h)}render(){return n`
      <slot name="header" @forge-ai-reasoning-header-toggle=${this._handleHeaderToggle}></slot>
      <div class="reasoning ${this.expanded?`expanded`:``}">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}_handleHeaderToggle(e){this.expanded=e.detail.expanded}},o([s({type:Boolean,reflect:!0})],v.prototype,`expanded`,void 0),v=o([l(_)],v)})))()}var b;function x(){return(x=e((()=>{b=`:host {
  display: block;
}

.reasoning-content {
  padding: 0.5rem 0;
}`})))()}var S,C;function w(){return(w=e((()=>{x(),a(),u(),S=`forge-ai-reasoning-content`,C=class extends i{constructor(...e){super(...e),this._displayedText=``,this._fullText=``,this._animationId=null,this._hasStarted=!1}static{this.styles=r(b)}firstUpdated(){setTimeout(()=>{this._extractTextAndAnimate()},100)}_handleSlotChange(){this._hasStarted||this._extractTextAndAnimate()}_extractTextAndAnimate(){if(this._hasStarted)return;let e=this.shadowRoot?.querySelector(`slot`);if(e){let t=e.assignedNodes({flatten:!0});this._fullText=t.map(e=>e.textContent||``).join(``).trim(),this._fullText&&(this._hasStarted=!0,this._startTypingAnimation())}}_startTypingAnimation(){this._animationId&&clearTimeout(this._animationId),this._displayedText=``;let e=0,t=()=>{e<this._fullText.length?(this._displayedText=this._fullText.substring(0,e+1),e++,this._animationId=setTimeout(t,10)):this._animationId=null};t()}render(){return this._hasStarted?n`
        <div class="reasoning-content">
          <span class="animated-text">${this._displayedText}</span>
        </div>
      `:n`
      <div class="reasoning-content">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `}},o([c()],C.prototype,`_displayedText`,void 0),C=o([l(S)],C)})))()}function T(){return(T=e((()=>{w()})))()}function E(){return(E=e((()=>{y(),w(),T()})))()}var D=t({Demo:()=>j,__namedExportsOrder:()=>M,default:()=>A}),O,k,A,j,M;function N(){return(N=e((()=>{a(),E(),d(),m(),f(),p(),O=`forge-ai-reasoning`,k=n`<style>
  .gradient-story-chat {
    block-size: 800px;
    inline-size: 100%;
  }
</style>`,A={title:`AI/Components/Tools & Reasoning/Reasoning`,component:O,argTypes:{expanded:{control:`boolean`,description:`Whether the reasoning is expanded`}},args:{expanded:!0},render:e=>{let t=[`Based on the provided information, I can reason through this step by step:`,`Observation: The user is asking about a complex technical problem.`,`Analysis: Multiple factors need to be considered including performance, scalability, and maintainability.`,`Evaluation: The proposed solution addresses the core requirements while maintaining code quality.`,`Conclusion: This approach provides the best balance of functionality and maintainability. Therefore, I recommend proceeding with the suggested implementation.`],r=n`
      ${k}
      <forge-ai-gradient-container class="gradient-story-chat">
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-reasoning .expanded=${e.expanded} id="reasoning-container">
            <forge-ai-reasoning-header slot="header" .expanded=${e.expanded}>
              <span slot="reasoning-title">Thinking...</span>
              <span slot="title">AI Reasoning Process</span>
            </forge-ai-reasoning-header>
          </forge-ai-reasoning>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `;return setTimeout(()=>{let e=document.getElementById(`reasoning-container`),n=e?.querySelector(`forge-ai-reasoning-header`);e&&n&&!e.hasAttribute(`data-content-loaded`)&&(e.setAttribute(`data-content-loaded`,`true`),t.forEach((r,i)=>{setTimeout(()=>{i===0&&(n.reasoning=!0);let a=document.createElement(`forge-ai-reasoning-content`);a.textContent=r,e.appendChild(a),i===t.length-1&&setTimeout(()=>{n.reasoning=!1},r.length*10+500)},i*2e3)}))},100),r}},j={},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M=[`Demo`]})))()}export{j as n,N as r,D as t};