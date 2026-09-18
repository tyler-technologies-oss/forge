import{r as E,b as d}from"./iframe-Y92HmdHZ.js";import{h as n,B as N,t as S}from"./base-lit-element-DXQv51bq.js";import{n as m}from"./query-assigned-nodes-D8SsSM9e.js";import{n as _}from"./when-CI7b_ccM.js";import{C as O}from"./service-adapter-8tADcN_b.js";const F=':host{height:100%;--_content-scaffold-header-height: var(--forge-content-scaffold-header-height, auto);--_content-scaffold-header-background: var(--forge-content-scaffold-header-background, transparent);--_content-scaffold-header-min-height: var(--forge-content-scaffold-header-min-height, 48px);--_content-scaffold-body-height: var(--forge-content-scaffold-body-height, auto);--_content-scaffold-body-padding-inline: var(--forge-content-scaffold-body-padding-inline, var(--forge-spacing-medium, 16px));--_content-scaffold-body-padding-block: var(--forge-content-scaffold-body-padding-block, var(--forge-spacing-xxsmall, 4px));--_content-scaffold-footer-height: var(--forge-content-scaffold-footer-height, auto);--_content-scaffold-footer-full-padding: var(--forge-content-scaffold-footer-full-padding, var(--forge-spacing-small, 12px));--_content-scaffold-footer-background: var(--forge-content-scaffold-footer-background, transparent);--_content-scaffold-footer-min-height: var(--forge-content-scaffold-footer-min-height, 48px)}.outer-container{display:grid;grid-template-rows:auto 1fr auto;height:100%}.header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . end";background-color:var(--_content-scaffold-header-background);height:var(--_content-scaffold-header-height);min-height:var(--_content-scaffold-header-min-height);border-start-start-radius:12px;border-start-end-radius:12px}.header-full-content{display:block;height:auto}.header-start-container{grid-area:start;display:flex;align-items:center}.header-start-container slot[name=header-start]::slotted(*){margin-inline-start:var(--forge-spacing-medium, 16px)}.header-end{grid-area:end;display:flex;align-items:center;width:100%;margin-inline-end:var(--forge-spacing-xsmall, 8px)}.body::-webkit-scrollbar{height:var(--forge-scrollbar-height, 16px);width:var(--forge-scrollbar-width, 16px)}.body::-webkit-scrollbar-track{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-track:hover{background-color:var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-corner{background-color:var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb))}.body::-webkit-scrollbar-thumb{height:var(--forge-scrollbar-thumb-min-height, 32px);width:var(--forge-scrollbar-thumb-min-width, 32px);border-radius:var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));border-width:var(--forge-scrollbar-border-width, 3px);border-style:solid;border-color:transparent;background-color:var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));background-clip:content-box}.body::-webkit-scrollbar-thumb:hover{background-color:var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e))}.body{overflow-y:auto;height:var(--_content-scaffold-body-height)}.body-inner{padding-inline:var(--_content-scaffold-body-padding-inline);padding-block:var(--_content-scaffold-body-padding-block)}.footer{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . end";background-color:var(--_content-scaffold-footer-background);height:var(--_content-scaffold-footer-height);min-height:var(--_content-scaffold-footer-min-height);padding-inline:var(--forge-spacing-medium, 16px);padding-block-end:var(--forge-spacing-xxsmall, 4px);border-end-start-radius:12px;border-end-end-radius:12px}.footer-start{grid-area:start}.footer-end{grid-area:end}.footer-full-content{display:block;padding:var(--_content-scaffold-footer-full-padding)}';var T=Object.defineProperty,P=Object.getOwnPropertyDescriptor,y=e=>{throw TypeError(e)},b=(e,t,o,l)=>{for(var a=l>1?void 0:l?P(t,o):t,f=e.length-1,h;f>=0;f--)(h=e[f])&&(a=(l?h(t,o,a):h(a))||a);return l&&a&&T(t,o,a),a},k=(e,t,o)=>t.has(e)||y("Cannot "+o),s=(e,t,o)=>(k(e,t,"read from private field"),o?o.call(e):t.get(e)),A=(e,t,o)=>t.has(e)?y("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),p=(e,t,o)=>(k(e,t,"access private method"),o),x,u,r,g,v,w,$,c;const C="forge-content-scaffold";let i=class extends(u=N,x=O,u){constructor(){super(...arguments),A(this,r)}render(){return d`
      <div class="outer-container" @slotchange=${p(this,r,c)}>
        ${s(this,r,w)}
        <div class="body" ${n()}>
          <div class="body-inner">
            <slot name="body"></slot>
          </div>
        </div>
        ${s(this,r,$)}
      </div>
    `}};r=new WeakSet;g=function(){return d`<slot name="header" @slotchange=${p(this,r,c)}></slot>`};v=function(){return d`<slot name="footer" @slotchange=${p(this,r,c)}></slot>`};w=function(){const e=this._slottedHeaderNodes.length>0;return _(e,()=>d`<div class="header-full-content">${s(this,r,g)}</div>`,()=>d`
        <div class="header" ${n()}>
          <div class="header-start-container">
            <div ${n()}>
              <slot name="before-header-start"></slot>
            </div>
            <slot name="header-start"></slot>
          </div>
          <div class="header-end" ${n()}>
            <slot name="header-end"></slot>
          </div>
        </div>
        ${s(this,r,g)}
      `)};$=function(){const e=this._slottedFooterNodes.length>0;return _(e,()=>d`<div class="footer-full-content">${s(this,r,v)}</div>`,()=>d`
        <div class="footer" ${n()}>
          <div class="footer-start" ${n()}>
            <slot name="footer-start"></slot>
          </div>
          <div class="footer-end" ${n()}>
            <slot name="footer-end"></slot>
          </div>
        </div>
        ${s(this,r,v)}
      `)};c=function(e){const t=e.target.name;["header","footer"].includes(t)&&this.requestUpdate()};i[x]=C;i.styles=E(F);b([m({slot:"header",flatten:!0})],i.prototype,"_slottedHeaderNodes",2);b([m({slot:"footer",flatten:!0})],i.prototype,"_slottedFooterNodes",2);i=b([S(C)],i);export{i as C};
