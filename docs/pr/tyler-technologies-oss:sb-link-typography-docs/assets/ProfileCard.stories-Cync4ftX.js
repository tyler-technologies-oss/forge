import{x as i}from"./iframe-CmPrhNEs.js";import{I as a,f as n}from"./icon-ANstxuR5.js";import{s}from"./decorators-G5bWuNzq.js";import"./feature-detection-CY6TVbRZ.js";import"./card-DdwiOD4f.js";import"./button-DKtxCkrw.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./icon-button-BWhggrld.js";import"./toolbar-CJj-iw1_.js";const c="forge-card{--forge-card-padding: 0;width:300px}.container{display:flex;justify-content:center;justify-items:center;flex-direction:column;align-content:center;align-items:center;margin-block-end:var(--forge-spacing-medium)}.container h2{margin:0}.avatar img{width:100px;height:100px;border-radius:50%;margin-block-start:var(--forge-spacing-medium);margin-block-end:var(--forge-spacing-xsmall)}.location{margin-block-end:var(--forge-spacing-medium)}.overflow{overflow:hidden;text-overflow:ellipsis;width:180px;text-align:center;white-space:nowrap}";a.define(n);const l={title:"Recipes/Card/Profile",decorators:[s(c)],render:()=>i`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},e={};var o,r,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};const d=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:d,default:l},Symbol.toStringTag,{value:"Module"}));export{e as D,k as P};
