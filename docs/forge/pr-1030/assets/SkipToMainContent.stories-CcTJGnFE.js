import{b as t}from"./iframe-DriYmvez.js";import{I as e,t as r}from"./tyler-icons-Bwr0J3kB.js";import{s as n}from"./decorators-wPI47f_7.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-BPWJeG4e.js";import"./app-bar-profile-button-CZSZDzCD.js";import"./menu-DL5uemw5.js";import"./linear-progress-C_nfyJF6.js";import"./list-B3MPjcuq.js";import"./popover-COK8oi_U.js";import"./overlay-BB80zovl.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CerfHp_D.js";import"./avatar-BFren0Xn.js";import"./icon-button-3w-6zUmZ.js";import"./focus-indicator-BrbZv0xw.js";import"./state-layer-BAlZ4sKA.js";import"./card-BFqXM32B.js";import"./button-DFgZemWW.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
