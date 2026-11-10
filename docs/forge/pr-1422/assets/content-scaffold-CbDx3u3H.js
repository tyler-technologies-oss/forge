import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,g as r}from"./iframe-BbUsXXnT.js";import{r as i,t as a}from"./decorators-Ci1onliJ.js";import{n as o}from"./when-Daf2bbVy.js";import{C as s,t as c,x as l}from"./dist-CPhmYI86.js";import{n as u,o as d,s as f,t as p}from"./base-lit-element-DvCODc3f.js";import{p as m}from"./constants-Bpi-_RbP.js";import{t as h}from"./decorate-DvwEnSYK.js";var g;function _(){return(_=e((()=>{g=`:host{--_content-scaffold-header-height:var(--forge-content-scaffold-header-height,auto);--_content-scaffold-header-background:var(--forge-content-scaffold-header-background,transparent);--_content-scaffold-header-min-height:var(--forge-content-scaffold-header-min-height,48px);--_content-scaffold-body-height:var(--forge-content-scaffold-body-height,auto);--_content-scaffold-body-padding-inline:var(--forge-content-scaffold-body-padding-inline,var(--forge-spacing-medium,16px));--_content-scaffold-body-padding-block:var(--forge-content-scaffold-body-padding-block,var(--forge-spacing-xxsmall,4px));--_content-scaffold-footer-height:var(--forge-content-scaffold-footer-height,auto);--_content-scaffold-footer-full-padding:var(--forge-content-scaffold-footer-full-padding,var(--forge-spacing-small,12px));--_content-scaffold-footer-background:var(--forge-content-scaffold-footer-background,transparent);--_content-scaffold-footer-min-height:var(--forge-content-scaffold-footer-min-height,48px);height:100%}.outer-container{grid-template-rows:auto 1fr auto;height:100%;display:grid}.header{background-color:var(--_content-scaffold-header-background);height:var(--_content-scaffold-header-height);min-height:var(--_content-scaffold-header-min-height);border-start-start-radius:12px;border-start-end-radius:12px;grid-template-columns:auto 1fr auto;grid-template-areas:"start.end";align-items:center;display:grid}.header-full-content{height:auto;display:block}.header-start-container{grid-area:start;align-items:center;display:flex}.header-start-container slot[name=header-start]::slotted(*){margin-inline-start:var(--forge-spacing-medium,16px)}.header-end{width:100%;grid-area:end;align-items:center;margin-inline-end:var(--forge-spacing-xsmall,8px);display:flex}.body::-webkit-scrollbar{height:var(--forge-scrollbar-height,16px);width:var(--forge-scrollbar-width,16px)}.body::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container,var(--forge-theme-surface-container-low,#ebebeb))}.body::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover,var(--forge-theme-surface-container-low,#ebebeb))}.body::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container,var(--forge-theme-surface-container-low,#ebebeb))}.body::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height,32px);width:var(--forge-scrollbar-thumb-min-width,32px);border-radius:var(--forge-scrollbar-border-radius,calc(var(--forge-shape-full,9999px) * var(--forge-shape-factor,1)));border-width:var(--forge-scrollbar-border-width,3px);background-color:var(--forge-scrollbar-thumb-container,var(--forge-theme-surface-container-medium,#c2c2c2));background-clip:content-box;border-style:solid;border-color:#0000}.body::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover,var(--forge-theme-surface-container-high,#9e9e9e))}.body{height:var(--_content-scaffold-body-height);overflow-y:auto}.body-inner{padding-inline:var(--_content-scaffold-body-padding-inline);padding-block:var(--_content-scaffold-body-padding-block)}.footer{background-color:var(--_content-scaffold-footer-background);height:var(--_content-scaffold-footer-height);min-height:var(--_content-scaffold-footer-min-height);padding-inline:var(--forge-spacing-medium,16px);border-end-end-radius:12px;border-end-start-radius:12px;grid-template-columns:auto 1fr auto;grid-template-areas:"start.end";align-items:center;padding-block-end:var(--forge-spacing-xxsmall,4px);display:grid}.footer-start{grid-area:start}.footer-end{grid-area:end}.footer-full-content{padding:var(--_content-scaffold-footer-full-padding);display:block}`})))()}var v,y;function b(){return(b=e((()=>{r(),a(),c(),u(),f(),_(),v=`forge-content-scaffold`,y=class extends p{static{this[s]=v}static{this.styles=n(g)}get#e(){return t`<slot name="header" @slotchange=${this.#i}></slot>`}get#t(){return t`<slot name="footer" @slotchange=${this.#i}></slot>`}get#n(){let e=this._slottedHeaderNodes.length>0;return o(e,()=>t`<div class="header-full-content">${this.#e}</div>`,()=>t`
        <div class="header" ${d()}>
          <div class="header-start-container">
            <div ${d()}>
              <slot name="before-header-start"></slot>
            </div>
            <slot name="header-start"></slot>
          </div>
          <div class="header-end" ${d()}>
            <slot name="header-end"></slot>
          </div>
        </div>
        ${this.#e}
      `)}get#r(){let e=this._slottedFooterNodes.length>0;return o(e,()=>t`<div class="footer-full-content">${this.#t}</div>`,()=>t`
        <div class="footer" ${d()}>
          <div class="footer-start" ${d()}>
            <slot name="footer-start"></slot>
          </div>
          <div class="footer-end" ${d()}>
            <slot name="footer-end"></slot>
          </div>
        </div>
        ${this.#t}
      `)}render(){return t`
      <div class="outer-container" @slotchange=${this.#i}>
        ${this.#n}
        <div class="body" ${d()}>
          <div class="body-inner">
            <slot name="body"></slot>
          </div>
        </div>
        ${this.#r}
      </div>
    `}#i(e){let t=e.target.name;[`header`,`footer`].includes(t)&&this.requestUpdate()}},h([i({slot:`header`,flatten:!0})],y.prototype,`_slottedHeaderNodes`,void 0),h([i({slot:`footer`,flatten:!0})],y.prototype,`_slottedFooterNodes`,void 0),l(v,y)})))()}function x(){return(x=e((()=>{m()})))()}function S(){return(S=e((()=>{c(),b(),x()})))()}export{y as n,b as r,S as t};