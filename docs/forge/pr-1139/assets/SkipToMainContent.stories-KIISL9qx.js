import{b as t}from"./iframe-CXxaXhZf.js";import{I as e,t as r}from"./tyler-icons-DpmKLgjs.js";import{s as n}from"./decorators-x4UETFPz.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-D6_2VrU0.js";import"./app-bar-profile-button-DDW0v0SF.js";import"./menu-Ddmtk70l.js";import"./linear-progress-CKPFd0xY.js";import"./list-DDc9y0eC.js";import"./popover-BLJ_ad28.js";import"./overlay-JUy1eq72.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-DEM_UEQH.js";import"./icon-button-HQY-xv8q.js";import"./focus-indicator-CsnuHiKZ.js";import"./state-layer-Cnbc18vB.js";import"./card-DQaN4qiP.js";import"./button-fq-mk_M3.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const s=["Demo"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:s,default:a},Symbol.toStringTag,{value:"Module"}));export{o as D,z as S};
