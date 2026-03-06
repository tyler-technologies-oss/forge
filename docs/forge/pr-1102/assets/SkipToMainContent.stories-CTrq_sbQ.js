import{b as t}from"./iframe-HlIX8nsI.js";import{I as e,t as r}from"./tyler-icons-B1nAV5VC.js";import{s as n}from"./decorators-D7VHZGxl.js";import"./service-adapter-CoGDs2_3.js";import"./index-DTwfV0k0.js";import"./scaffold-WBY1Y1UI.js";import"./app-bar-profile-button-DxXsoE2G.js";import"./menu-MzeWWlwh.js";import"./linear-progress-Buvtsnzw.js";import"./list-2JCez8nQ.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";import"./avatar-CrzMonA2.js";import"./icon-button-kXhWo8t5.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import"./card-C7PNSpyL.js";import"./button-C32nRzKT.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
