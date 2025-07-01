import{x as n}from"./iframe-Cb3H7on6.js";import{I as i,d as a}from"./icon-B8CdcxqJ.js";import{s}from"./decorators-BOROzdqF.js";import"./feature-detection-uS6p5jc8.js";import"./scaffold-CGyusmPL.js";import"./app-bar-profile-button-Y2ffrCrh.js";import"./state-layer-BFwsAUDA.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./menu-CEgQL4Wc.js";import"./linear-progress-2PahUgVv.js";import"./list-CWXU2VGN.js";import"./popover-CkPGSxIK.js";import"./overlay-rvLcgp1q.js";import"./skeleton-C4EH8VF8.js";import"./avatar-D17LLjCx.js";import"./icon-button-DkluvO-9.js";import"./card-CN3bfTD2.js";import"./button-r2EMLpWm.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";i.define(a);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[s(c)],render:()=>n`
    <div class="container">
      <a class="skip-to-main-content" href="javascript: void(0);" onclick="event.preventDefault(); document.getElementById('content').focus();">
        Skip to main content
      </a>

      <forge-app-bar title-text="App Title">
        <forge-icon slot="logo" name="forge_logo"></forge-icon>
      </forge-app-bar>
      <main class="content" id="content" tabindex="0">
        <forge-card class="card">
          <forge-button variant="raised" onclick="document.querySelector('.skip-to-main-content').focus()"> Focus skip to main content link </forge-button>
        </forge-card>
      </main>
    </div>
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,O as S};
