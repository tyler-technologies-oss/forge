import{b as t}from"./iframe-BK3r3gy1.js";import{I as e,t as r}from"./tyler-icons-uU9Yd7lf.js";import{s as i}from"./decorators-BSSWS7wq.js";import"./service-adapter-8tADcN_b.js";import"./icon-CXw8uXM_.js";import"./scaffold-4YYLz8U4.js";import"./app-bar-profile-button-Bc88X_6L.js";import"./menu-oM4UPGdx.js";import"./linear-progress-D8EbdkBB.js";import"./list-CRxpAe8T.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-CAo0Ux7j.js";import"./avatar-B9BCroA5.js";import"./icon-button-Mxsm8Q6s.js";import"./focus-indicator-BBtCjyD8.js";import"./state-layer-Kw6pmYRH.js";import"./card-Ck5qVP45.js";import"./button-558tNDpa.js";const n=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[i(n)],render:()=>t`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const s=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:s,default:a},Symbol.toStringTag,{value:"Module"}));export{o as D,M as S};
