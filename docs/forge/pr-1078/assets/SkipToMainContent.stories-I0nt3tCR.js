import{b as t}from"./iframe-6jvvl83j.js";import{I as e,t as r}from"./tyler-icons-_ZRRE207.js";import{s as n}from"./decorators-1bDp89Ox.js";import"./service-adapter-CoGDs2_3.js";import"./scaffold-DRWrbyLH.js";import"./app-bar-profile-button-CpnTpsBC.js";import"./state-layer-CDycYdPe.js";import"./focus-indicator-uWMef9QC.js";import"./menu-C6DBPHOx.js";import"./linear-progress-DAF_c_Qg.js";import"./list-n8XxbbWm.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BEzRyBrd.js";import"./avatar-CpjMD2dN.js";import"./icon-button-Bs31_lcM.js";import"./card-ylDKlB-w.js";import"./button-gG20MWYF.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
