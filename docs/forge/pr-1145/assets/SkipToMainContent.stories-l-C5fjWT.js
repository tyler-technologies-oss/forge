import{b as t}from"./iframe-oVCy0CKL.js";import{I as e,t as r}from"./tyler-icons-B5QTbAtT.js";import{s as n}from"./decorators-D5KMQAbE.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-l7cEUk27.js";import"./app-bar-profile-button-DnsOTPmD.js";import"./menu-DiFQqMy1.js";import"./linear-progress-BvuLf7up.js";import"./list-IUhRNIec.js";import"./popover-98RIrDc_.js";import"./overlay-BduRS6k-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-0tvJWIW1.js";import"./avatar-DFDqZrkN.js";import"./icon-button-BkuiL2Hq.js";import"./focus-indicator-PC490wMa.js";import"./state-layer-DRsbBcDh.js";import"./card-BhaGv1yy.js";import"./button-BLRO6C8h.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
