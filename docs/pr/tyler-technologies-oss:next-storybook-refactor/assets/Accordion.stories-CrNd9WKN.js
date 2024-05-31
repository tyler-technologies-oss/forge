import{x as _}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{s as v}from"./decorators-B79PnA5z.js";import{z as u,C,v as E,B as P,c as b,g as L}from"./constants-DpGSBZ-i.js";import{E as i,a as S}from"./expansion-panel-BMVlKlR1.js";import{B as N,F as O}from"./base-adapter-e-2Q9d5t.js";import"./divider-B9mKFKGJ.js";class A extends N{constructor(e){super(e)}getHostElement(){return this._component}isNestedPanel(e){return!e||!this._component.contains(e)?!1:u(e,this._component).some(n=>n.tagName.toLocaleLowerCase()===i.elementName)}getChildPanels(e){return e?Array.from(this._component.querySelectorAll(e)):Array.from(this._component.children).filter(n=>n.tagName.toLocaleLowerCase()===i.elementName)}addEventListener(e,t,n,o){n.addEventListener(e,t,o||!1)}removeEventListener(e,t,n){n.removeEventListener(e,t)}}const T=`${C}accordion`,x={PANEL_SELECTOR:"panel-selector"},s={elementName:T,attributes:x};class y{constructor(e){this._adapter=e}initialize(){this._attachListeners()}disconnect(){this._detachListeners()}_attachListeners(){this._hostInteractionCallback=e=>this._hostInteraction(e),this._adapter.addEventListener(i.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement())}_detachListeners(){this._hostInteractionCallback&&(this._adapter.removeEventListener(i.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement()),this._hostInteractionCallback=void 0)}_hostInteraction(e){switch(e.type){case i.events.TOGGLE:if(e.detail){e.stopPropagation();const t=e.target;if(this._adapter.isNestedPanel(t))return;this._adapter.getChildPanels(this._panelSelector).forEach(n=>{t!==n&&!this._adapter.isNestedPanel(n)&&(n.open=!1)})}break}}get panelSelector(){return this._panelSelector}set panelSelector(e){this._panelSelector!==e&&(this._panelSelector=e,this._adapter.setHostAttribute(s.attributes.PANEL_SELECTOR,this._panelSelector))}}var w=Object.defineProperty,I=Object.getOwnPropertyDescriptor,m=(r,e,t,n)=>{for(var o=n>1?void 0:n?I(e,t):e,c=r.length-1,l;c>=0;c--)(l=r[c])&&(o=(n?l(e,t,o):l(o))||o);return n&&o&&w(e,t,o),o};let p=class extends P{static get observedAttributes(){return[s.attributes.PANEL_SELECTOR]}constructor(){super(),this._foundation=new y(new A(this))}initializedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(r,e,t){switch(r){case s.attributes.PANEL_SELECTOR:this.panelSelector=t;break}}};m([O()],p.prototype,"panelSelector",2);p=m([E({name:s.elementName,dependencies:[S]})],p);const R="forge-accordion{width:200px;display:inline-block}forge-accordion forge-expansion-panel>div{display:flex;justify-content:space-between;align-items:center}",d="forge-accordion",k={title:"Components/Accordion",render:r=>b(d,r),component:d,decorators:[v(R)],parameters:{actions:{disable:!0}},argTypes:{...L({tagName:d,exclude:["panelSelector"]})},args:{}},a={render:()=>_`
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
    `};var f,h,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const D=["Demo"],X=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,__namedExportsOrder:D,default:k},Symbol.toStringTag,{value:"Module"}));export{X as A,a as D};
