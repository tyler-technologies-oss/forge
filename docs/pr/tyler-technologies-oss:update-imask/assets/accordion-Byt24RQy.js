import{C as _,j as d,B as m}from"./constants-9n5_0r7k.js";import{B as u,c as E}from"./base-adapter-B6TJxM93.js";import{e as C}from"./feature-detection-DRCh51Sa.js";import{E as c,e as N,a as f}from"./expansion-panel-ZMnNMdaj.js";class P extends u{constructor(e){super(e)}isNestedPanel(e){return!e||!this._component.contains(e)?!1:C(e,this._component).some(t=>t.tagName.toLocaleLowerCase()===c.elementName)}getChildPanels(e){return e?Array.from(this._component.querySelectorAll(e)):Array.from(this._component.children).filter(t=>t.tagName.toLocaleLowerCase()===c.elementName)}}const p=`${_}accordion`,S={PANEL_SELECTOR:"panel-selector"},A={TOGGLE:`${p}-toggle`},n={elementName:p,attributes:S,events:A};class b{constructor(e){this._adapter=e,this._hostInteractionCallback=this._hostInteraction.bind(this)}initialize(){this._attachListeners()}_attachListeners(){this._adapter.addHostListener(c.events.TOGGLE,this._hostInteractionCallback)}_hostInteraction(e){if(!e.detail||this._panelSelector&&!e.target.matches(this._panelSelector)||(e.stopPropagation(),this._adapter.isNestedPanel(e.target)))return;this._adapter.getChildPanels(this._panelSelector).forEach(t=>{e.target!==t&&!this._adapter.isNestedPanel(t)&&t.open&&t[N](!1)}),this._adapter.dispatchHostEvent(new CustomEvent(n.events.TOGGLE,{detail:e.target,bubbles:!0,composed:!0}))}get panelSelector(){return this._panelSelector}set panelSelector(e){this._panelSelector!==e&&(this._panelSelector=e,this._adapter.setHostAttribute(n.attributes.PANEL_SELECTOR,this._panelSelector))}}var L=Object.defineProperty,O=Object.getOwnPropertyDescriptor,h=(a,e,s,t)=>{for(var r=t>1?void 0:t?O(e,s):e,o=a.length-1,i;o>=0;o--)(i=a[o])&&(r=(t?i(e,s,r):i(r))||r);return t&&r&&L(e,s,r),r};let l=class extends m{static get observedAttributes(){return[n.attributes.PANEL_SELECTOR]}constructor(){super(),this._core=new b(new P(this))}connectedCallback(){this._core.initialize()}attributeChangedCallback(a,e,s){switch(a){case n.attributes.PANEL_SELECTOR:this.panelSelector=s;break}}};h([E()],l.prototype,"panelSelector",2);l=h([d({name:n.elementName,dependencies:[f]})],l);
