import"./lit-element-JplMEnZc.js";import{x as i}from"./lit-html-paDGiEfB.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-DOnQS6BC.js";import{I as s}from"./icon-DB7kP3Ec.js";import"./feature-detection-DRCh51Sa.js";import"./scaffold-D66s8WNO.js";import"./app-bar-profile-button-Dkt2yknz.js";import"./state-layer-Bf3rUq66.js";import"./focus-indicator-COi7jdIi.js";import"./index-BmocOEUj.js";import"./badge-Dp1fyGkw.js";import"./menu-CYOw_Alz.js";import"./linear-progress-CqfIuBkR.js";import"./list-CHxmoizQ.js";import"./popover-DHJf1hjV.js";import"./overlay-D0uIIChk.js";import"./skeleton-D2S3-1Sc.js";import"./avatar-D_XGi29H.js";import"./icon-button-DxiF-tf5.js";import"./card-C10NOeAn.js";import"./button-CTEnnZLo.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(c)],render:()=>i`
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
