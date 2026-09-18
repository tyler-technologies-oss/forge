import{r as P,b as v,A as N}from"./iframe-Y92HmdHZ.js";import{o as I}from"./if-defined-DHZHEvAj.js";import{C as U,a as W,F as R}from"./service-adapter-8tADcN_b.js";import{B as L,t as F}from"./base-lit-element-DXQv51bq.js";import{n as S}from"./property-4XXebId8.js";import{n as T,e as x}from"./ref-C9xd_Bhv.js";import{t as Y}from"./utils-DKysp6Us.js";import{t as k}from"./utils-DU-9AqTO.js";import{T as G}from"./toolbar-xc73DdA4.js";import"./button-BUQjmV8l.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import"./stack-CSbxxxDz.js";import"./icon-button-BG-KzVAg.js";import"./tyler-icons-SWWw4qdQ.js";import"./menu-Croe9Yxl.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";import"./split-view-AhArCsJo.js";import"./card-De0-ErPh.js";const H=":host{display:block;position:relative}forge-toolbar[auto-height]{--forge-toolbar-min-height: var(--_toolbar-height)}#end-small,#end-large{margin-inline-start:var(--forge-spacing-medium, 16px)}[slot=start]{padding-block:var(--forge-spacing-xxxsmall, 2px)}:host(:state(small)) #end-large,:host(:state(large)) #end-small{visibility:hidden;position:absolute}";var q=Object.defineProperty,K=Object.getOwnPropertyDescriptor,B=e=>{throw TypeError(e)},b=(e,t,o,r)=>{for(var i=r>1?void 0:r?K(t,o):t,_=e.length-1,E;_>=0;_--)(E=e[_])&&(i=(r?E(t,o,i):E(i))||i);return r&&i&&q(t,o,i),i},O=(e,t,o)=>t.has(e)||B("Cannot "+o),a=(e,t,o)=>(O(e,t,"read from private field"),o?o.call(e):t.get(e)),s=(e,t,o)=>t.has(e)?B("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),m=(e,t,o,r)=>(O(e,t,"write to private field"),t.set(e,o),o),d=(e,t,o)=>(O(e,t,"access private method"),o),D,M,z,g,h,c,u,f,l,w,y,C,$;const V=24,Z=100,A="forge-responsive-toolbar";let n=class extends(z=L,M=U,D=W,z){constructor(){super(),s(this,l),this.noBorder=!1,this.inverted=!1,this.resizeDelay=Z,s(this,g,x()),s(this,h,x()),s(this,c),s(this,u),s(this,f),s(this,y,()=>{var e;(e=a(this,u))==null||e.call(this)}),m(this,c,this.attachInternals())}connectedCallback(){super.connectedCallback(),d(this,l,w).call(this),R.observe(this,a(this,y))}disconnectedCallback(){super.disconnectedCallback(),m(this,f,void 0),R.unobserve(this)}willUpdate(e){e.has("resizeDelay")&&this.resizeDelay!==e.get("resizeDelay")&&d(this,l,w).call(this)}render(){return v`
      <forge-toolbar auto-height ?no-divider=${this.noBorder} ?inverted=${this.inverted} @slotchange=${d(this,l,C)}>
        <slot name="before-start" slot="before-start"></slot>
        <div ${T(a(this,g))} slot="start">
          <slot name="start"></slot>
        </div>
        <div slot="end" id="end-large" ${T(a(this,h))}>
          <slot name="end-large"></slot>
        </div>
        <div slot="end" id="end-small">
          <slot name="end-small"></slot>
        </div>
        <slot name="after-end" slot="after-end"></slot>
      </forge-toolbar>
    `}};g=new WeakMap;h=new WeakMap;c=new WeakMap;u=new WeakMap;f=new WeakMap;l=new WeakSet;w=function(){m(this,u,Y(()=>requestAnimationFrame(()=>d(this,l,C).call(this)),this.resizeDelay))};y=new WeakMap;C=function(){const e=a(this,g).value?.getBoundingClientRect().right||0,t=a(this,h).value?.getBoundingClientRect().left||0,r=e+V>=t?"small":"large";a(this,f)!==r&&(m(this,f,r),k(a(this,c),"small",r==="small"),k(a(this,c),"large",r==="large"),d(this,l,$).call(this,r))};$=function(e){const t=new CustomEvent("forge-responsive-toolbar-update",{bubbles:!0,composed:!0,cancelable:!0,detail:{state:e}});this.dispatchEvent(t)};n[M]=A;n[D]=[G];n.styles=P(H);b([S({type:Boolean,attribute:"no-border"})],n.prototype,"noBorder",2);b([S({type:Boolean})],n.prototype,"inverted",2);b([S({type:Number,attribute:"resize-delay"})],n.prototype,"resizeDelay",2);n=b([F(A)],n);const{action:j}=__STORYBOOK_MODULE_ACTIONS__,J=j("forge-responsive-toolbar-update"),Q="forge-responsive-toolbar",X={title:"Components/Responsive Toolbar",render:e=>{const t=[{label:"Add User ",value:"add-user",variant:"text"},{label:"Remove User",value:"remove-user",variant:"outlined"},{label:"Third action",value:"third-action",variant:"raised"}];return v`
      <forge-split-view auto-close-threshold="120">
        <forge-split-view-panel>
          <div class="container">
            <forge-card no-padding>
              <forge-responsive-toolbar @forge-responsive-toolbar-update=${J} ?no-border=${e.noBorder} ?inverted=${e.inverted}>
                <forge-icon-button aria-label="Icon button demo" slot="before-start">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <div slot="start" class="title forge-typography--heading4">${e.title}</div>
                <forge-stack inline alignment="center" slot="end-large">
                  ${t.map(o=>v`<forge-button variant=${I(o.variant)}>${o.label}</forge-button>`)}
                </forge-stack>
                <div slot="end-small">
                  <forge-menu .options=${t} id="example-menu">
                    <forge-icon-button aria-label="Open menu">
                      <forge-icon name="more_vert" external></forge-icon>
                    </forge-icon-button>
                  </forge-menu>
                </div>
                ${e.afterEnd?v`<div slot="after-end"><forge-button>After end</forge-button></div>`:N}
              </forge-responsive-toolbar>
              <div class="info">
                <forge-stack inline alignment="start">
                  <p>Resize the split view component to see the responsive behavior.</p>
                  <forge-icon name="arrow_forward" external></forge-icon>
                </forge-stack>
              </div>
            </forge-card>
          </div>
        </forge-split-view-panel>
        <forge-split-view-panel size="150"></forge-split-view-panel>
      </forge-split-view>

      <style>
        .title {
          white-space: nowrap;
        }

        forge-split-view {
          height: 300px;
        }

        .info {
          padding: 16px;
          margin-top: 64px;
          display: flex;
          justify-content: end;
        }

        .info p {
          margin: 0;
        }

        forge-split-view forge-split-view-panel:last-child {
          background-color: var(--forge-theme-surface-dim);
          display: grid;
          place-content: center;
          place-items: center;
          text-align: center;
        }
      </style>
    `},component:Q,argTypes:{title:{control:"text"},noBorder:{control:"boolean"},inverted:{control:"boolean"},afterEnd:{control:"boolean",name:"Show after-end slot content"}},args:{title:"User management",noBorder:!1,inverted:!1,afterEnd:!1}},p={args:{afterEnd:!1}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    afterEnd: false
  }
}`,...p.parameters?.docs?.source}}};const ee=["Demo"],Te=Object.freeze(Object.defineProperty({__proto__:null,Demo:p,__namedExportsOrder:ee,default:X},Symbol.toStringTag,{value:"Module"}));export{p as D,Te as R};
