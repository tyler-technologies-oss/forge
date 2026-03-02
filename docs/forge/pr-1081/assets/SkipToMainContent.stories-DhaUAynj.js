import{b as t}from"./iframe-Co1TxWa1.js";import{I as e,t as r}from"./tyler-icons-BS8_pNWa.js";import{s as n}from"./decorators-B0wVhVKv.js";import"./service-adapter-8tADcN_b.js";import"./index-DTwfV0k0.js";import"./scaffold-C0JMtL8O.js";import"./app-bar-profile-button-m8l9D5Lo.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-D-5vSThe.js";import"./menu-CkiVMedc.js";import"./linear-progress-Cnx_HyUf.js";import"./list-BIFSuh1A.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";import"./avatar-BoVD3kVh.js";import"./icon-button-Bgrx9pzH.js";import"./card-ZwrpMhrm.js";import"./button-DHNtJFdN.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
