import{b as t}from"./iframe-CG34Pyww.js";import{I as e,t as r}from"./tyler-icons-DJO2-615.js";import{s as n}from"./decorators-gJDr_H8z.js";import"./service-adapter-CoGDs2_3.js";import"./index-DTwfV0k0.js";import"./scaffold-cHzeNvE0.js";import"./app-bar-profile-button-CaekFkjS.js";import"./menu-C-s5Ok3q.js";import"./linear-progress-CdLostcG.js";import"./list-BOJcxtba.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-CvthT5-E.js";import"./icon-button-BOixoLth.js";import"./focus-indicator-684J3Eeo.js";import"./state-layer-n7PzpGlA.js";import"./card-mllA_MQ3.js";import"./button-C38ZBOvE.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const s=["Demo"],T=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:s,default:a},Symbol.toStringTag,{value:"Module"}));export{o as D,T as S};
