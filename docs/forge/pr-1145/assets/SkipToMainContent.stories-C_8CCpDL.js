import{b as t}from"./iframe-ZKsQ3dxk.js";import{I as e,t as r}from"./tyler-icons-tW5eMRUE.js";import{s as n}from"./decorators-DGsIMoD5.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-l7cEUk27.js";import"./app-bar-profile-button-CnE6PBrJ.js";import"./menu-Cz5xb5sT.js";import"./linear-progress-BvuLf7up.js";import"./list-BUojCRje.js";import"./popover-CJE61R5F.js";import"./overlay-BZbN9o6E.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BneGiueD.js";import"./avatar-8UCryvLF.js";import"./icon-button-CfxoQW4h.js";import"./focus-indicator-vJw9eHJN.js";import"./state-layer-DRsbBcDh.js";import"./card-CZ-3g9yo.js";import"./button-_yJ7umJ0.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
