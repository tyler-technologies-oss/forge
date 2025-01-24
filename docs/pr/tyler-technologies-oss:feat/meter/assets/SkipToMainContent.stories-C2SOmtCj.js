import"./lit-element-JplMEnZc.js";import{x as i}from"./lit-html-paDGiEfB.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-DOnQS6BC.js";import{I as s}from"./icon-PniqSQTM.js";import"./feature-detection-DRCh51Sa.js";import"./scaffold-cFX8hrtM.js";import"./app-bar-profile-button-CL0nfb6i.js";import"./state-layer-CG0HAXrj.js";import"./focus-indicator-BvNL19jq.js";import"./index-BmocOEUj.js";import"./badge-LAte7Gqu.js";import"./menu-LYuqVHBN.js";import"./linear-progress-BPNzmgXS.js";import"./list-B4vuF0gc.js";import"./popover-Dufij8YF.js";import"./overlay-B3mdiStP.js";import"./skeleton-C-ZOJzmn.js";import"./avatar-450rL_nF.js";import"./icon-button-Byrj13fN.js";import"./card-BuFJU_rL.js";import"./button-Cc7D3D0l.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(c)],render:()=>i`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],E=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,E as S};
