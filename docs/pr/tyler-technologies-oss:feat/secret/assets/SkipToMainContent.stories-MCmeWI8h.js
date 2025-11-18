import{x as t}from"./iframe-CSGc-9i1.js";import{d as e}from"./tyler-icons-DSFxyJDy.js";import{s as r}from"./decorators-B8ICsM6K.js";import{I as n}from"./icon-8E01u_jy.js";import"./service-adapter-CffG5Lhq.js";import"./scaffold-BrokB2Ba.js";import"./app-bar-profile-button-51V83pf6.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-D44tT1xv.js";import"./index-5CPwzmQS.js";import"./menu-loaz4Jm2.js";import"./linear-progress-r0Hzg69v.js";import"./list-DtNhvwRU.js";import"./popover-BAoNoe3k.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-CUpcDMQk.js";import"./icon-button-Bg2-fVpI.js";import"./card-DHzr1c62.js";import"./button-Bki5-cWt.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";n.define(e);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[r(i)],render:()=>t`
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
