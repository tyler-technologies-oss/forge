var p=r=>{throw TypeError(r)};var m=(r,o,e)=>o.has(r)||p("Cannot "+e);var a=(r,o,e)=>(m(r,o,"read from private field"),e?e.call(r):o.get(r)),y=(r,o,e)=>o.has(r)?p("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(r):o.set(r,e);var l=(r,o,e)=>(m(r,o,"access private method"),e);import{r as T,b as n}from"./iframe-CYwqMFpx.js";import{n as w}from"./query-assigned-nodes-D8SsSM9e.js";import{n as _}from"./when-CI7b_ccM.js";import{t as O,C as A}from"./service-adapter-gy1PbA1l.js";import{h as d,B as M}from"./base-lit-element-CB18vL01.js";const P=':host{height:100%;--_content-scaffold-header-height: var(--forge-content-scaffold-header-height, auto);--_content-scaffold-header-background: var(--forge-content-scaffold-header-background, transparent);--_content-scaffold-header-min-height: var(--forge-content-scaffold-header-min-height, 48px);--_content-scaffold-body-height: var(--forge-content-scaffold-body-height, auto);--_content-scaffold-body-padding-inline: var(--forge-content-scaffold-body-padding-inline, var(--forge-spacing-medium, 16px));--_content-scaffold-body-padding-block: var(--forge-content-scaffold-body-padding-block, var(--forge-spacing-xxsmall, 4px));--_content-scaffold-footer-height: var(--forge-content-scaffold-footer-height, auto);--_content-scaffold-footer-full-padding: var(--forge-content-scaffold-footer-full-padding, var(--forge-spacing-small, 12px));--_content-scaffold-footer-background: var(--forge-content-scaffold-footer-background, transparent);--_content-scaffold-footer-min-height: var(--forge-content-scaffold-footer-min-height, 48px)}.outer-container{display:grid;grid-template-rows:auto 1fr auto;height:100%}.header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . end";background-color:var(--_content-scaffold-header-background);height:var(--_content-scaffold-header-height);min-height:var(--_content-scaffold-header-min-height);border-start-start-radius:12px;border-start-end-radius:12px}.header-full-content{display:block;height:auto}.header-start-container{grid-area:start;display:flex;align-items:center}.header-start-container slot[name=header-start]::slotted(*){margin-inline-start:var(--forge-spacing-medium, 16px)}.header-end{grid-area:end;display:flex;align-items:center;width:100%;margin-inline-end:var(--forge-spacing-xsmall, 8px)}.body::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.body::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.body::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.body{overflow-y:auto;height:var(--_content-scaffold-body-height)}.body-inner{padding-inline:var(--_content-scaffold-body-padding-inline);padding-block:var(--_content-scaffold-body-padding-block)}.footer{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . end";background-color:var(--_content-scaffold-footer-background);height:var(--_content-scaffold-footer-height);min-height:var(--_content-scaffold-footer-min-height);padding-inline:var(--forge-spacing-medium, 16px);padding-block-end:var(--forge-spacing-xxsmall, 4px);border-end-start-radius:12px;border-end-end-radius:12px}.footer-start{grid-area:start}.footer-end{grid-area:end}.footer-full-content{display:block;padding:var(--_content-scaffold-footer-full-padding)}';var C=Object.defineProperty,$=(r,o,e,v)=>{for(var s=void 0,h=r.length-1,u;h>=0;h--)(u=r[h])&&(s=u(o,e,s)||s);return s&&C(o,e,s),s},k,x;const N="forge-content-scaffold";var t,g,b,E,F,c;const f=class f extends(x=M,k=A,x){constructor(){super(...arguments);y(this,t)}render(){return n`
      <div class="outer-container" @slotchange=${l(this,t,c)}>
        ${a(this,t,E)}
        <div class="body" ${d()}>
          <div class="body-inner">
            <slot name="body"></slot>
          </div>
        </div>
        ${a(this,t,F)}
      </div>
    `}};t=new WeakSet,g=function(){return n`<slot name="header" @slotchange=${l(this,t,c)}></slot>`},b=function(){return n`<slot name="footer" @slotchange=${l(this,t,c)}></slot>`},E=function(){const e=this._slottedHeaderNodes.length>0;return _(e,()=>n`<div class="header-full-content">${a(this,t,g)}</div>`,()=>n`
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
        ${a(this,t,g)}
      `)},F=function(){const e=this._slottedFooterNodes.length>0;return _(e,()=>n`<div class="footer-full-content">${a(this,t,b)}</div>`,()=>n`
        <div class="footer" ${d()}>
          <div class="footer-start" ${d()}>
            <slot name="footer-start"></slot>
          </div>
          <div class="footer-end" ${d()}>
            <slot name="footer-end"></slot>
          </div>
        </div>
        ${a(this,t,b)}
      `)},c=function(e){const v=e.target.name;["header","footer"].includes(v)&&this.requestUpdate()},f[k]=N,f.styles=T(P);let i=f;$([w({slot:"header",flatten:!0})],i.prototype,"_slottedHeaderNodes");$([w({slot:"footer",flatten:!0})],i.prototype,"_slottedFooterNodes");O(N,i);export{i as C};
