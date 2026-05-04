import{b as t}from"./iframe-BYO1bXoJ.js";import{I as e,t as r}from"./tyler-icons-7uX1bPDw.js";import{s as n}from"./decorators-BiM_1B21.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-D6_2VrU0.js";import"./app-bar-profile-button-C3sUBGjO.js";import"./menu-SXsmU0nM.js";import"./linear-progress-DEYvX0ZE.js";import"./list-CUmFk2WX.js";import"./popover-CuKDZ7_o.js";import"./overlay-D9banag4.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-Pe-gyKWB.js";import"./icon-button-BImepwl9.js";import"./focus-indicator-DqIVBzGS.js";import"./state-layer-7HWBWBQu.js";import"./card-5StB8P4_.js";import"./button-veE_5Z_L.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
