import{x as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-EVhofM2Q.js";import{I as s}from"./icon-DHVNhAh1.js";import"./constants-ngK8be3i.js";import"./scaffold-Ce6_N1O1.js";import"./app-bar-profile-button-DfQ-kIqS.js";import"./state-layer-BisR_hRI.js";import"./focus-indicator-C4Z5XP1c.js";import"./index-Dh0vMUMR.js";import"./badge-BZranFcT.js";import"./menu-B33KPFUT.js";import"./linear-progress-5Vpr-9_G.js";import"./list-w9uxrOZD.js";import"./popover-CnzyzWS6.js";import"./overlay-D7ruZE35.js";import"./skeleton-Cvltx7WE.js";import"./avatar-CwCdFbd4.js";import"./icon-button-DNIpFQC2.js";import"./card-BC8Ik9n4.js";import"./button-GqT3ELiS.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(c)],render:()=>i`
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
