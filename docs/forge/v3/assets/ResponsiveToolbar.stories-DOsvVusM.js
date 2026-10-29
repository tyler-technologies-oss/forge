import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{S as i,p as a}from"./iframe-C-z8vi0w.js";import{C as o,Ot as s,S as c,o as l,t as u,x as d}from"./dist-CPhmYI86.js";import{p as f,r as p}from"./async-directive-CWs39nbJ.js";import{n as m,t as h}from"./base-lit-element-D-rjkAjt.js";import{s as g,x as _}from"./utils-B2Tk8obI.js";import{t as v}from"./icon-BrLOytZD.js";import{p as y}from"./constants-jVWZdget.js";import{t as b}from"./decorate-2OK4V6AF.js";import{t as x}from"./icon-button-CZACX3Xp.js";import{t as S}from"./menu-PRJFkmR1.js";import{t as C}from"./button-BCGxI4mr.js";import{n as w,r as T,t as E}from"./toolbar-D1sAxtpp.js";import{r as D,t as O}from"./if-defined-B1ve8lTA.js";import{i as k,n as A,t as j}from"./ref-tIG-hx5K.js";import{t as M}from"./card-DXbg2Pew.js";import{t as N}from"./split-view-BzQQAL-_.js";import{t as P}from"./stack-C9oeEXu0.js";var F;function I(){return(I=e((()=>{F=`:host{display:block;position:relative}forge-toolbar[auto-height]{--forge-toolbar-min-height:var(--_toolbar-height)}#end-small,#end-large{margin-inline-start:var(--forge-spacing-medium,16px)}[slot=start]{padding-block:var(--forge-spacing-xxxsmall,2px)}:host(:state(small)) #end-large,:host(:state(large)) #end-small{visibility:hidden;position:absolute}`})))()}var L,R,z,B;function V(){return(V=e((()=>{a(),p(),j(),u(),m(),g(),E(),T(),I(),L=24,R=100,z=`forge-responsive-toolbar`,B=class extends h{static{this[o]=z}static{this[c]=[w]}static{this.styles=i(F)}#e;#t;#n;#r;#i;constructor(){super(),this.noBorder=!1,this.inverted=!1,this.resizeDelay=R,this.#e=A(),this.#t=A(),this.#o=()=>{this.#r?.()},this.#n=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.#a(),l.observe(this,this.#o)}disconnectedCallback(){super.disconnectedCallback(),this.#i=void 0,l.unobserve(this)}willUpdate(e){e.has(`resizeDelay`)&&this.resizeDelay!==e.get(`resizeDelay`)&&this.#a()}render(){return n`
      <forge-toolbar auto-height ?no-divider=${this.noBorder} ?inverted=${this.inverted} @slotchange=${this.#s}>
        <slot name="before-start" slot="before-start"></slot>
        <div ${k(this.#e)} slot="start">
          <slot name="start"></slot>
        </div>
        <div slot="end" id="end-large" ${k(this.#t)}>
          <slot name="end-large"></slot>
        </div>
        <div slot="end" id="end-small">
          <slot name="end-small"></slot>
        </div>
        <slot name="after-end" slot="after-end"></slot>
      </forge-toolbar>
    `}#a(){this.#r=s(()=>requestAnimationFrame(()=>this.#s()),this.resizeDelay)}#o;#s(){let e=this.#e.value?.getBoundingClientRect().right||0,t=this.#t.value?.getBoundingClientRect().left||0,n=e+L>=t?`small`:`large`;this.#i!==n&&(this.#i=n,_(this.#n,`small`,n===`small`),_(this.#n,`large`,n===`large`),this.#c(n))}#c(e){let t=new CustomEvent(`forge-responsive-toolbar-update`,{bubbles:!0,composed:!0,cancelable:!0,detail:{state:e}});this.dispatchEvent(t)}},b([f({type:Boolean,attribute:`no-border`})],B.prototype,`noBorder`,void 0),b([f({type:Boolean})],B.prototype,`inverted`,void 0),b([f({type:Number,attribute:`resize-delay`})],B.prototype,`resizeDelay`,void 0),d(z,B)})))()}function H(){return(H=e((()=>{y()})))()}function U(){return(U=e((()=>{u(),V(),H()})))()}var W=t({Demo:()=>J,__namedExportsOrder:()=>Y,default:()=>q}),G,K,q,J,Y;function X(){return(X=e((()=>{a(),O(),U(),C(),P(),x(),v(),S(),N(),M(),{action:G}=__STORYBOOK_MODULE_ACTIONS__,K=G(`forge-responsive-toolbar-update`),q={title:`Components/Responsive Toolbar`,render:e=>{let t=[{label:`Add User `,value:`add-user`,variant:`text`},{label:`Remove User`,value:`remove-user`,variant:`outlined`},{label:`Third action`,value:`third-action`,variant:`raised`}];return n`
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
                  ${t.map(e=>n`<forge-button variant=${D(e.variant)}>${e.label}</forge-button>`)}
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