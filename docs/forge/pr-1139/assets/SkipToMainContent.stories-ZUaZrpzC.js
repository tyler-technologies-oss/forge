import{b as t}from"./iframe-BBqNUtqv.js";import{I as e,t as r}from"./tyler-icons-fQPhzpbf.js";import{s as i}from"./decorators-D6cvJtbR.js";import"./service-adapter-8tADcN_b.js";import"./icon-BeLCtqW2.js";import"./scaffold-D43obOQJ.js";import"./app-bar-profile-button-DO8LPKFt.js";import"./menu-C2B6p4S0.js";import"./linear-progress-BFUUfMoR.js";import"./list-mhgDPYym.js";import"./popover-By2PcE5Z.js";import"./overlay-CRZNSrJB.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-PgUpsvgP.js";import"./avatar-Moz453hk.js";import"./icon-button-ChuE_xy5.js";import"./focus-indicator-CE-2THdp.js";import"./state-layer-Cd1l0S13.js";import"./card-DuBAKo1q.js";import"./button-BtXQ1IZV.js";const n=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[i(n)],render:()=>t`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const s=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:s,default:a},Symbol.toStringTag,{value:"Module"}));export{o as D,M as S};
