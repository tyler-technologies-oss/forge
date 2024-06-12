import{x as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a}from"./index-TSSE1zcJ.js";import{s as n}from"./decorators-EVhofM2Q.js";import{I as s}from"./icon-DdNu5rAq.js";import"./constants-CmaEVTEu.js";import"./card-DN6gyC_G.js";import"./button-DqH9YfaW.js";import"./focus-indicator-CexacDHl.js";import"./index-Dh0vMUMR.js";import"./state-layer-DjEoH8hN.js";import"./icon-button-Cqg7QjNu.js";import"./toolbar-Ckx80VFe.js";const c="forge-card{--forge-card-padding: 0;width:300px}.container{display:flex;justify-content:center;justify-items:center;flex-direction:column;align-content:center;align-items:center;margin-block-end:var(--forge-spacing-medium)}.container h2{margin:0}.avatar img{width:100px;height:100px;border-radius:50%;margin-block-start:var(--forge-spacing-medium);margin-block-end:var(--forge-spacing-xsmall)}.location{margin-block-end:var(--forge-spacing-medium)}.overflow{overflow:hidden;text-overflow:ellipsis;width:180px;text-align:center;white-space:nowrap}";s.define(a);const l={title:"Recipes/Card/Profile",decorators:[n(c)],render:()=>i`
    <forge-card>
      <div class="container">
        <div class="avatar">
          <img src="https://png.pngtree.com/svg/20170602/0db185fb9c.svg" alt="Avatar">
        </div>
        <h2 class="forge-typography--heading4 overflow">Rick Dalton</h2>
        <span class="location">Hollywood, CA</span>
        <div class="overflow">
          <a href="mailto:email@tylertech.com">rick.dalton@tylertech.com</a>
        </div>
      </div>
      <forge-toolbar inverted>
        <forge-button slot="start">View Profile</forge-button>
        <forge-icon-button slot="end" aria-label="View notifications">
          <forge-icon name="notifications"></forge-icon>
        </forge-icon-button>
      </div>
    </forge-card>
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var e,r,t;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:"{}",...(t=(r=o.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};const m=["Demo"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{o as D,P};
