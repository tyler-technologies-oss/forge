import{b as t}from"./iframe-BE2YYubE.js";import{I as e,t as r}from"./tyler-icons-6dw6loW8.js";import{s as n}from"./decorators-BkzpGKpL.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-D_SIXSFE.js";import"./app-bar-profile-button-CQXsTajz.js";import"./menu-dV8ezMaH.js";import"./linear-progress-DP1CUIRM.js";import"./list-BTunZZ_4.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-GtWTw1E9.js";import"./icon-button-fxZQ4D_Y.js";import"./focus-indicator-CxG-eluM.js";import"./state-layer-CK5iHsfr.js";import"./card-BQK3Mjgx.js";import"./button-DZDlJWlu.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
