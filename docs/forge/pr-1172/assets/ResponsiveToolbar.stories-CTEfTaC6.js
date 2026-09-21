var z=t=>{throw TypeError(t)};var y=(t,o,e)=>o.has(t)||z("Cannot "+e);var r=(t,o,e)=>(y(t,o,"read from private field"),e?e.call(t):o.get(t)),n=(t,o,e)=>o.has(t)?z("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(t):o.set(t,e),s=(t,o,e,l)=>(y(t,o,"write to private field"),l?l.call(t,e):o.set(t,e),e),p=(t,o,e)=>(y(t,o,"access private method"),e);import{r as M,b as _,A as P}from"./iframe-BQuUdi9A.js";import{o as U}from"./if-defined-BikPIWsk.js";import{F as B,g as L,t as F,C as j,a as Y}from"./service-adapter-DlT-lJx7.js";import{n as O}from"./property-DJvCC0I6.js";import{e as $,n as D}from"./ref-Bchl8AcG.js";import{B as H}from"./base-lit-element-CB0pz4XF.js";import{t as T}from"./utils-DU-9AqTO.js";import{T as q}from"./toolbar-u0CVrqbx.js";import"./button-0aFc-rvC.js";import"./stack-E4V9OTtJ.js";import"./icon-button-CqF7oM9r.js";import"./tyler-icons--haAADqW.js";import"./menu-D-lcVz-r.js";import"./linear-progress-VpC6qUWa.js";import"./list-DJY0Qsvo.js";import"./popover-C49q6_k0.js";import"./overlay-DlXgJPae.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnhVRD4Y.js";import"./list-item-ByLOjRzX.js";import"./split-view-CR0DiTXv.js";import"./card-D4nNosYG.js";const G=":host{display:block;position:relative}forge-toolbar[auto-height]{--forge-toolbar-min-height: var(--_toolbar-height)}#end-small,#end-large{margin-inline-start:var(--forge-spacing-medium, 16px)}[slot=start]{padding-block:var(--forge-spacing-xxxsmall, 2px)}:host(:state(small)) #end-large,:host(:state(large)) #end-small{visibility:hidden;position:absolute}";var K=Object.defineProperty,x=(t,o,e,l)=>{for(var d=void 0,a=t.length-1,R;a>=0;a--)(R=t[a])&&(d=R(o,e,d)||d);return d&&K(o,e,d),d},C,k,A;const V=24,Z=100,N="forge-responsive-toolbar";var c,f,g,b,m,i,S,E,w,I;const u=class u extends(A=H,k=j,C=Y,A){constructor(){super();n(this,i);n(this,c);n(this,f);n(this,g);n(this,b);n(this,m);n(this,E);this.noBorder=!1,this.inverted=!1,this.resizeDelay=Z,s(this,c,$()),s(this,f,$()),s(this,E,()=>{var e;(e=r(this,b))==null||e.call(this)}),s(this,g,this.attachInternals())}connectedCallback(){super.connectedCallback(),p(this,i,S).call(this),B.observe(this,r(this,E))}disconnectedCallback(){super.disconnectedCallback(),s(this,m,void 0),B.unobserve(this)}willUpdate(e){e.has("resizeDelay")&&this.resizeDelay!==e.get("resizeDelay")&&p(this,i,S).call(this)}render(){return _`
      <forge-toolbar auto-height ?no-divider=${this.noBorder} ?inverted=${this.inverted} @slotchange=${p(this,i,w)}>
        <slot name="before-start" slot="before-start"></slot>
        <div ${D(r(this,c))} slot="start">
          <slot name="start"></slot>
        </div>
        <div slot="end" id="end-large" ${D(r(this,f))}>
          <slot name="end-large"></slot>
        </div>
        <div slot="end" id="end-small">
          <slot name="end-small"></slot>
        </div>
        <slot name="after-end" slot="after-end"></slot>
      </forge-toolbar>
    `}};c=new WeakMap,f=new WeakMap,g=new WeakMap,b=new WeakMap,m=new WeakMap,i=new WeakSet,S=function(){s(this,b,L(()=>requestAnimationFrame(()=>p(this,i,w).call(this)),this.resizeDelay))},E=new WeakMap,w=function(){const e=r(this,c).value?.getBoundingClientRect().right||0,l=r(this,f).value?.getBoundingClientRect().left||0,a=e+V>=l?"small":"large";r(this,m)!==a&&(s(this,m,a),T(r(this,g),"small",a==="small"),T(r(this,g),"large",a==="large"),p(this,i,I).call(this,a))},I=function(e){const l=new CustomEvent("forge-responsive-toolbar-update",{bubbles:!0,composed:!0,cancelable:!0,detail:{state:e}});this.dispatchEvent(l)},u[k]=N,u[C]=[q],u.styles=M(G);let v=u;x([O({type:Boolean,attribute:"no-border"})],v.prototype,"noBorder");x([O({type:Boolean})],v.prototype,"inverted");x([O({type:Number,attribute:"resize-delay"})],v.prototype,"resizeDelay");F(N,v);const{action:J}=__STORYBOOK_MODULE_ACTIONS__,Q=J("forge-responsive-toolbar-update"),W="forge-responsive-toolbar",X={title:"Components/Responsive Toolbar",render:t=>{const o=[{label:"Add User ",value:"add-user",variant:"text"},{label:"Remove User",value:"remove-user",variant:"outlined"},{label:"Third action",value:"third-action",variant:"raised"}];return _`
      <forge-split-view auto-close-threshold="120">
        <forge-split-view-panel>
          <div class="container">
            <forge-card no-padding>
              <forge-responsive-toolbar @forge-responsive-toolbar-update=${Q} ?no-border=${t.noBorder} ?inverted=${t.inverted}>
                <forge-icon-button aria-label="Icon button demo" slot="before-start">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <div slot="start" class="title forge-typography--heading4">${t.title}</div>
                <forge-stack inline alignment="center" slot="end-large">
                  ${o.map(e=>_`<forge-button variant=${U(e.variant)}>${e.label}</forge-button>`)}
                </forge-stack>
                <div slot="end-small">
                  <forge-menu .options=${o} id="example-menu">
                    <forge-icon-button aria-label="Open menu">
                      <forge-icon name="more_vert" external></forge-icon>
                    </forge-icon-button>
                  </forge-menu>
                </div>
                ${t.afterEnd?_`<div slot="after-end"><forge-button>After end</forge-button></div>`:P}
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
    `},component:W,argTypes:{title:{control:"text"},noBorder:{control:"boolean"},inverted:{control:"boolean"},afterEnd:{control:"boolean",name:"Show after-end slot content"}},args:{title:"User management",noBorder:!1,inverted:!1,afterEnd:!1}},h={args:{afterEnd:!1}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    afterEnd: false
  }
}`,...h.parameters?.docs?.source}}};const ee=["Demo"],xe=Object.freeze(Object.defineProperty({__proto__:null,Demo:h,__namedExportsOrder:ee,default:X},Symbol.toStringTag,{value:"Module"}));export{h as D,xe as R};
