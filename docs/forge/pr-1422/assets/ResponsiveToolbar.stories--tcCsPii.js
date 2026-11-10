import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{T as i,g as a}from"./iframe-CbV23-8Y.js";import{d as o,t as s}from"./decorators-DcQFeJ4p.js";import{C as c,Ot as l,S as u,o as d,t as f,x as p}from"./dist-CPhmYI86.js";import{n as m,t as h}from"./base-lit-element-BTojiV2b.js";import{p as g}from"./constants-Bpi-_RbP.js";import{t as _}from"./icon-DTOjPWy9.js";import{t as v}from"./decorate-DvwEnSYK.js";import{r as y,t as b}from"./if-defined-B1ve8lTA.js";import{s as x,x as S}from"./utils-B2Tk8obI.js";import{t as C}from"./stack-vA2I5ICp.js";import{i as w,n as T,t as E}from"./ref-DZ35M6As.js";import{t as D}from"./card-Dq3fw6oM.js";import{t as O}from"./icon-button-D4UjEleU.js";import{t as k}from"./button-5s54CFRd.js";import{t as A}from"./menu-BrgcSs3D.js";import{n as j,r as M,t as N}from"./toolbar-8xhAwSg5.js";import{t as P}from"./split-view-BVl0oO8_.js";var F;function I(){return(I=e((()=>{F=`:host{display:block;position:relative}forge-toolbar[auto-height]{--forge-toolbar-min-height:var(--_toolbar-height)}#end-small,#end-large{margin-inline-start:var(--forge-spacing-medium,16px)}[slot=start]{padding-block:var(--forge-spacing-xxxsmall,2px)}:host(:state(small)) #end-large,:host(:state(large)) #end-small{visibility:hidden;position:absolute}`})))()}var L,R,z,B;function V(){return(V=e((()=>{a(),s(),E(),f(),m(),x(),N(),M(),I(),L=24,R=100,z=`forge-responsive-toolbar`,B=class extends h{static{this[c]=z}static{this[u]=[j]}static{this.styles=i(F)}#e;#t;#n;#r;#i;constructor(){super(),this.noBorder=!1,this.inverted=!1,this.resizeDelay=R,this.#e=T(),this.#t=T(),this.#o=()=>{this.#r?.()},this.#n=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.#a(),d.observe(this,this.#o)}disconnectedCallback(){super.disconnectedCallback(),this.#i=void 0,d.unobserve(this)}willUpdate(e){e.has(`resizeDelay`)&&this.resizeDelay!==e.get(`resizeDelay`)&&this.#a()}render(){return n`
      <forge-toolbar auto-height ?no-divider=${this.noBorder} ?inverted=${this.inverted} @slotchange=${this.#s}>
        <slot name="before-start" slot="before-start"></slot>
        <div ${w(this.#e)} slot="start">
          <slot name="start"></slot>
        </div>
        <div slot="end" id="end-large" ${w(this.#t)}>
          <slot name="end-large"></slot>
        </div>
        <div slot="end" id="end-small">
          <slot name="end-small"></slot>
        </div>
        <slot name="after-end" slot="after-end"></slot>
      </forge-toolbar>
    `}#a(){this.#r=l(()=>requestAnimationFrame(()=>this.#s()),this.resizeDelay)}#o;#s(){let e=this.#e.value?.getBoundingClientRect().right||0,t=this.#t.value?.getBoundingClientRect().left||0,n=e+L>=t?`small`:`large`;this.#i!==n&&(this.#i=n,S(this.#n,`small`,n===`small`),S(this.#n,`large`,n===`large`),this.#c(n))}#c(e){let t=new CustomEvent(`forge-responsive-toolbar-update`,{bubbles:!0,composed:!0,cancelable:!0,detail:{state:e}});this.dispatchEvent(t)}},v([o({type:Boolean,attribute:`no-border`})],B.prototype,`noBorder`,void 0),v([o({type:Boolean})],B.prototype,`inverted`,void 0),v([o({type:Number,attribute:`resize-delay`})],B.prototype,`resizeDelay`,void 0),p(z,B)})))()}function H(){return(H=e((()=>{g()})))()}function U(){return(U=e((()=>{f(),V(),H()})))()}var W=t({Demo:()=>J,__namedExportsOrder:()=>Y,default:()=>q}),G,K,q,J,Y;function X(){return(X=e((()=>{a(),b(),U(),k(),C(),O(),_(),A(),P(),D(),{action:G}=__STORYBOOK_MODULE_ACTIONS__,K=G(`forge-responsive-toolbar-update`),q={title:`Components/Responsive Toolbar`,render:e=>{let t=[{label:`Add User `,value:`add-user`,variant:`text`},{label:`Remove User`,value:`remove-user`,variant:`outlined`},{label:`Third action`,value:`third-action`,variant:`raised`}];return n`
      <forge-split-view auto-close-threshold="120">
        <forge-split-view-panel>
          <div class="container">
            <forge-card no-padding>
              <forge-responsive-toolbar @forge-responsive-toolbar-update=${K} ?no-border=${e.noBorder} ?inverted=${e.inverted}>
                <forge-icon-button aria-label="Icon button demo" slot="before-start">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <div slot="start" class="title forge-typography--heading4">${e.title}</div>
                <forge-stack inline alignment="center" slot="end-large">
                  ${t.map(e=>n`<forge-button variant=${y(e.variant)}>${e.label}</forge-button>`)}
                </forge-stack>
                <div slot="end-small">
                  <forge-menu .options=${t} id="example-menu">
                    <forge-icon-button aria-label="Open menu">
                      <forge-icon name="more_vert" external></forge-icon>
                    </forge-icon-button>
                  </forge-menu>
                </div>
                ${e.afterEnd?n`<div slot="after-end"><forge-button>After end</forge-button></div>`:r}
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
    `},component:`forge-responsive-toolbar`,argTypes:{title:{control:`text`},noBorder:{control:`boolean`},inverted:{control:`boolean`},afterEnd:{control:`boolean`,name:`Show after-end slot content`}},args:{title:`User management`,noBorder:!1,inverted:!1,afterEnd:!1}},J={args:{afterEnd:!1}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    afterEnd: false
  }
}`,...J.parameters?.docs?.source}}},Y=[`Demo`]})))()}export{W as n,X as r,J as t};