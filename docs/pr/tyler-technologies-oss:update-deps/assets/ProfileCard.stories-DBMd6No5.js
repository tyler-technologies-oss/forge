import{x as o}from"./iframe-CIxyDGlH.js";import{I as r,g as t}from"./icon-FzRol6Tl.js";import{s as i}from"./decorators-sF-29HcM.js";import"./feature-detection-BwPJgXni.js";import"./card-CcH8hNVZ.js";import"./button-Bjtey6FZ.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./state-layer-CLjAHnoF.js";import"./icon-button-DpLi6_yQ.js";import"./toolbar-BtzJRWgQ.js";const a="forge-card{--forge-card-padding: 0;width:300px}.container{display:flex;justify-content:center;justify-items:center;flex-direction:column;align-content:center;align-items:center;margin-block-end:var(--forge-spacing-medium)}.container h2{margin:0}.avatar img{width:100px;height:100px;border-radius:50%;margin-block-start:var(--forge-spacing-medium);margin-block-end:var(--forge-spacing-xsmall)}.location{margin-block-end:var(--forge-spacing-medium)}.overflow{overflow:hidden;text-overflow:ellipsis;width:180px;text-align:center;white-space:nowrap}";r.define(t);const n={title:"Recipes/Card/Profile",decorators:[i(a)],render:()=>o`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const s=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:s,default:n},Symbol.toStringTag,{value:"Module"}));export{e as D,y as P};
