import{x as E}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{C as _,e as u,B as b,f as P,i as A,c as T,a as L}from"./constants-CGWcLB8c.js";import{E as l,a as N}from"./expansion-panel-mfpuhfTh.js";import{B as O,e as S,F as w}from"./index-kSD1OPJ4.js";class x extends O{constructor(e){super(e)}getHostElement(){return this._component}isNestedPanel(e){return!e||!this._component.contains(e)?!1:S(e,this._component).some(t=>t.tagName.toLocaleLowerCase()===l.elementName)}getChildPanels(e){return e?Array.from(this._component.querySelectorAll(e)):Array.from(this._component.children).filter(t=>t.tagName.toLocaleLowerCase()===l.elementName)}addEventListener(e,r,t,o){t.addEventListener(e,r,o||!1)}removeEventListener(e,r,t){t.removeEventListener(e,r)}}const y=`${_}accordion`,I={PANEL_SELECTOR:"panel-selector"},c={elementName:y,attributes:I};class R{constructor(e){this._adapter=e}initialize(){this._attachListeners()}disconnect(){this._detachListeners()}_attachListeners(){this._hostInteractionCallback=e=>this._hostInteraction(e),this._adapter.addEventListener(l.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement())}_detachListeners(){this._hostInteractionCallback&&(this._adapter.removeEventListener(l.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement()),this._hostInteractionCallback=void 0)}_hostInteraction(e){switch(e.type){case l.events.TOGGLE:if(e.detail){e.stopPropagation();const r=e.target;if(this._adapter.isNestedPanel(r))return;this._adapter.getChildPanels(this._panelSelector).forEach(t=>{r!==t&&!this._adapter.isNestedPanel(t)&&(t.open=!1)})}break}}get panelSelector(){return this._panelSelector}set panelSelector(e){this._panelSelector!==e&&(this._panelSelector=e,this._adapter.setHostAttribute(c.attributes.PANEL_SELECTOR,this._panelSelector))}}var D=Object.defineProperty,V=Object.getOwnPropertyDescriptor,C=(n,e,r,t)=>{for(var o=t>1?void 0:t?V(e,r):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(t?a(e,r,o):a(o))||o);return t&&o&&D(e,r,o),o};let v=class extends b{static get observedAttributes(){return[c.attributes.PANEL_SELECTOR]}constructor(){super(),this._foundation=new R(new x(this))}initializedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(n,e,r){switch(n){case c.attributes.PANEL_SELECTOR:this.panelSelector=r;break}}};C([w()],v.prototype,"panelSelector",2);v=C([u({name:c.elementName,dependencies:[N]})],v);const $=`${_}divider`,j={VERTICAL:"vertical"},s={elementName:$,attributes:j},G=`<template>
  <div class="forge-divider" part="root"></div>
</template>`,B=":host{--_divider-margin: var(--forge-divider-margin, 0)}:host{display:block;contain:content;margin:var(--_divider-margin)}:host([hidden]){display:none}.forge-divider{--_divider-color: var(--forge-divider-color, var(--forge-theme-outline, #e0e0e0));--_divider-width: var(--forge-divider-width, var(--forge-border-thin, 1px));--_divider-border-style: var(--forge-divider-border-style, solid)}.forge-divider{border:none;border-bottom-color:var(--_divider-color);border-bottom-width:var(--_divider-width);border-bottom-style:var(--_divider-border-style);height:0}:host([vertical]){display:inline-block;height:100%}:host([vertical]) .forge-divider{border:none;border-right-color:var(--_divider-color);border-right-width:var(--_divider-width);border-right-style:var(--_divider-border-style);height:100%;width:0}";var k=Object.defineProperty,z=Object.getOwnPropertyDescriptor,F=(n,e,r,t)=>{for(var o=t>1?void 0:t?z(e,r):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(t?a(e,r,o):a(o))||o);return t&&o&&k(e,r,o),o};let h=class extends b{static get observedAttributes(){return[s.attributes.VERTICAL]}constructor(){super(),P(this,G,B)}attributeChangedCallback(n,e,r){switch(n){case s.attributes.VERTICAL:this.vertical=A(r);break}}get vertical(){return this.hasAttribute(s.attributes.VERTICAL)}set vertical(n){this.toggleAttribute(s.attributes.VERTICAL,n)}};h=F([u({name:s.elementName})],h);const p="forge-accordion",H={title:"Components/Accordion",render:n=>T(p,n),component:p,parameters:{actions:{disable:!0}},argTypes:{...L({tagName:p,exclude:["panelSelector"]})},args:{}},d={render:()=>E`
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
}`,...(m=(f=d.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const M=["Demo"],U=Object.freeze(Object.defineProperty({__proto__:null,Demo:d,__namedExportsOrder:M,default:H},Symbol.toStringTag,{value:"Module"}));export{U as A,d as D};
