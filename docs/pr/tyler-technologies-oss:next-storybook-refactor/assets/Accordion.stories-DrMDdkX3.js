import{x as E}from"./lit-element-Co407TGG.js";import"./lit-html-Cxzf5Fb2.js";import{j as P,w as A,C as _,F as T,e as u,B as b,f as L,h as N,c as O,g as S}from"./icon-DXSQMaWm.js";import{E as l,a as w}from"./expansion-panel-BsOasg49.js";class x extends P{constructor(e){super(e)}getHostElement(){return this._component}isNestedPanel(e){return!e||!this._component.contains(e)?!1:A(e,this._component).some(t=>t.tagName.toLocaleLowerCase()===l.elementName)}getChildPanels(e){return e?Array.from(this._component.querySelectorAll(e)):Array.from(this._component.children).filter(t=>t.tagName.toLocaleLowerCase()===l.elementName)}addEventListener(e,r,t,n){t.addEventListener(e,r,n||!1)}removeEventListener(e,r,t){t.removeEventListener(e,r)}}const y=`${_}accordion`,I={PANEL_SELECTOR:"panel-selector"},c={elementName:y,attributes:I};class R{constructor(e){this._adapter=e}initialize(){this._attachListeners()}disconnect(){this._detachListeners()}_attachListeners(){this._hostInteractionCallback=e=>this._hostInteraction(e),this._adapter.addEventListener(l.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement())}_detachListeners(){this._hostInteractionCallback&&(this._adapter.removeEventListener(l.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement()),this._hostInteractionCallback=void 0)}_hostInteraction(e){switch(e.type){case l.events.TOGGLE:if(e.detail){e.stopPropagation();const r=e.target;if(this._adapter.isNestedPanel(r))return;this._adapter.getChildPanels(this._panelSelector).forEach(t=>{r!==t&&!this._adapter.isNestedPanel(t)&&(t.open=!1)})}break}}get panelSelector(){return this._panelSelector}set panelSelector(e){this._panelSelector!==e&&(this._panelSelector=e,this._adapter.setHostAttribute(c.attributes.PANEL_SELECTOR,this._panelSelector))}}var D=Object.defineProperty,V=Object.getOwnPropertyDescriptor,C=(o,e,r,t)=>{for(var n=t>1?void 0:t?V(e,r):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(n=(t?a(e,r,n):a(n))||n);return t&&n&&D(e,r,n),n};let h=class extends b{static get observedAttributes(){return[c.attributes.PANEL_SELECTOR]}constructor(){super(),this._foundation=new R(new x(this))}initializedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(o,e,r){switch(o){case c.attributes.PANEL_SELECTOR:this.panelSelector=r;break}}};C([T()],h.prototype,"panelSelector",2);h=C([u({name:c.elementName,dependencies:[w]})],h);const j=`${_}divider`,$={VERTICAL:"vertical"},s={elementName:j,attributes:$},G=`<template>
  <div class="forge-divider" part="root"></div>
</template>`,k=":host{--_divider-margin: var(--forge-divider-margin, 0)}:host{display:block;contain:content;margin:var(--_divider-margin)}:host([hidden]){display:none}.forge-divider{--_divider-color: var(--forge-divider-color, var(--forge-theme-outline, #e0e0e0));--_divider-width: var(--forge-divider-width, var(--forge-border-thin, 1px));--_divider-border-style: var(--forge-divider-border-style, solid)}.forge-divider{border:none;border-bottom-color:var(--_divider-color);border-bottom-width:var(--_divider-width);border-bottom-style:var(--_divider-border-style);height:0}:host([vertical]){display:inline-block;height:100%}:host([vertical]) .forge-divider{border:none;border-right-color:var(--_divider-color);border-right-width:var(--_divider-width);border-right-style:var(--_divider-border-style);height:100%;width:0}";var z=Object.defineProperty,B=Object.getOwnPropertyDescriptor,F=(o,e,r,t)=>{for(var n=t>1?void 0:t?B(e,r):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(n=(t?a(e,r,n):a(n))||n);return t&&n&&z(e,r,n),n};let v=class extends b{static get observedAttributes(){return[s.attributes.VERTICAL]}constructor(){super(),L(this,G,k)}attributeChangedCallback(o,e,r){switch(o){case s.attributes.VERTICAL:this.vertical=N(r);break}}get vertical(){return this.hasAttribute(s.attributes.VERTICAL)}set vertical(o){this.toggleAttribute(s.attributes.VERTICAL,o)}};v=F([u({name:s.elementName})],v);const p="forge-accordion",H={title:"Components/Accordion",render:o=>O(p,o),component:p,parameters:{actions:{disable:!0}},argTypes:{...S({tagName:p,exclude:["panelSelector"]})},args:{}},d={render:()=>E`
      <forge-accordion>
        <forge-expansion-panel>
          <div  slot="header">
            Panel One 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel One Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Two 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Two Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Three 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Three Content</div>
        </forge-expansion-panel>
      </forge-accordion>
    `};var g,f,m;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-accordion>
        <forge-expansion-panel>
          <div  slot="header">
            Panel One 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel One Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Two 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Two Content</div>
        </forge-expansion-panel>
        <forge-divider></forge-divider>
        <forge-expansion-panel>
          <div  slot="header">
            Panel Three 
            <forge-open-icon></forge-open-icon>
          </div>
          <div>Panel Three Content</div>
        </forge-expansion-panel>
      </forge-accordion>
    \`;
  }
}`,...(m=(f=d.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const M=["Demo"],Q=Object.freeze(Object.defineProperty({__proto__:null,Demo:d,__namedExportsOrder:M,default:H},Symbol.toStringTag,{value:"Module"}));export{Q as A,d as D};
