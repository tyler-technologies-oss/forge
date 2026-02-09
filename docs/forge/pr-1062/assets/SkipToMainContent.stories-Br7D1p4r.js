import{b as t}from"./iframe-C59kGrZS.js";import{I as e,t as r}from"./tyler-icons-B0WPf66k.js";import{s as n}from"./decorators-CNFYiqI8.js";import"./service-adapter-CffG5Lhq.js";import"./scaffold-B_qTjcmL.js";import"./app-bar-profile-button-iS-G50gm.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-CcblENpV.js";import"./index-DTwfV0k0.js";import"./menu-Y_IBkdk1.js";import"./linear-progress-CsYLd0m5.js";import"./list-W62pTBYF.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar-zpoj8KJW.js";import"./icon-button-DlkFfYJR.js";import"./card-D-xhIFNO.js";import"./button-CJiBebGB.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
