import{x as _}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{z as v,C as u,v as C,B as E,c as P,g as L}from"./constants-DTwaRlry.js";import{E as i,a as N}from"./expansion-panel-TLksdJ5R.js";import"./open-icon-cgpobDUq.js";import{B as O,F as S}from"./base-adapter-BrqXnkkD.js";import"./divider-CEe2sIm-.js";class b extends O{constructor(e){super(e)}getHostElement(){return this._component}isNestedPanel(e){return!e||!this._component.contains(e)?!1:v(e,this._component).some(n=>n.tagName.toLocaleLowerCase()===i.elementName)}getChildPanels(e){return e?Array.from(this._component.querySelectorAll(e)):Array.from(this._component.children).filter(n=>n.tagName.toLocaleLowerCase()===i.elementName)}addEventListener(e,t,n,o){n.addEventListener(e,t,o||!1)}removeEventListener(e,t,n){n.removeEventListener(e,t)}}const A=`${u}accordion`,T={PANEL_SELECTOR:"panel-selector"},s={elementName:A,attributes:T};class x{constructor(e){this._adapter=e}initialize(){this._attachListeners()}disconnect(){this._detachListeners()}_attachListeners(){this._hostInteractionCallback=e=>this._hostInteraction(e),this._adapter.addEventListener(i.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement())}_detachListeners(){this._hostInteractionCallback&&(this._adapter.removeEventListener(i.events.TOGGLE,this._hostInteractionCallback,this._adapter.getHostElement()),this._hostInteractionCallback=void 0)}_hostInteraction(e){switch(e.type){case i.events.TOGGLE:if(e.detail){e.stopPropagation();const t=e.target;if(this._adapter.isNestedPanel(t))return;this._adapter.getChildPanels(this._panelSelector).forEach(n=>{t!==n&&!this._adapter.isNestedPanel(n)&&(n.open=!1)})}break}}get panelSelector(){return this._panelSelector}set panelSelector(e){this._panelSelector!==e&&(this._panelSelector=e,this._adapter.setHostAttribute(s.attributes.PANEL_SELECTOR,this._panelSelector))}}var w=Object.defineProperty,y=Object.getOwnPropertyDescriptor,m=(r,e,t,n)=>{for(var o=n>1?void 0:n?y(e,t):e,c=r.length-1,l;c>=0;c--)(l=r[c])&&(o=(n?l(e,t,o):l(o))||o);return n&&o&&w(e,t,o),o};let p=class extends E{static get observedAttributes(){return[s.attributes.PANEL_SELECTOR]}constructor(){super(),this._foundation=new x(new b(this))}initializedCallback(){this._foundation.initialize()}disconnectedCallback(){this._foundation.disconnect()}attributeChangedCallback(r,e,t){switch(r){case s.attributes.PANEL_SELECTOR:this.panelSelector=t;break}}};m([S()],p.prototype,"panelSelector",2);p=m([C({name:s.elementName,dependencies:[N]})],p);const d="forge-accordion",I={title:"Components/Accordion",render:r=>P(d,r),component:d,parameters:{actions:{disable:!0}},argTypes:{...L({tagName:d,exclude:["panelSelector"]})},args:{}},a={render:()=>_`
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
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const R=["Demo"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,__namedExportsOrder:R,default:I},Symbol.toStringTag,{value:"Module"}));export{H as A,a as D};
