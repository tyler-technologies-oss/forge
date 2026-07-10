import{b as t}from"./iframe-DN09JPRV.js";import{I as e,t as r}from"./tyler-icons-BYsm4hFB.js";import{s as n}from"./decorators-LCUw7P1X.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-F_aQKixv.js";import"./app-bar-profile-button-CPvO2fR6.js";import"./menu-C6XxP5Qf.js";import"./linear-progress-Do3VWKo6.js";import"./list-C6KTZLjy.js";import"./popover-B1xBEbVI.js";import"./overlay-D2OUOcFY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CHMON4uU.js";import"./avatar-RV7TjiZK.js";import"./icon-button-L1vH1jaS.js";import"./focus-indicator-h9nBYyaY.js";import"./state-layer-CezKS0dV.js";import"./card-By5QV1S0.js";import"./button-DkpvNBOQ.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
