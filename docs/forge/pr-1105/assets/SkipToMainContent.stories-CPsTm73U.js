import{b as t}from"./iframe-C07_izNT.js";import{I as e,t as r}from"./tyler-icons-fP-z9z1i.js";import{s as n}from"./decorators-kT1b_Rs3.js";import"./service-adapter-8tADcN_b.js";import"./index-DTwfV0k0.js";import"./scaffold-Lrq4JV9O.js";import"./app-bar-profile-button-DsBoMkv6.js";import"./menu-DCHQAwat.js";import"./linear-progress-g34J3BlM.js";import"./list-D_-uWQM4.js";import"./popover-DSGvC3fA.js";import"./overlay-Bcsgewax.js";import"./skeleton-C_yfi0NG.js";import"./avatar-Q39TJc0M.js";import"./icon-button-DM1nATYu.js";import"./focus-indicator-CXn9rWMK.js";import"./state-layer-BsCfz34t.js";import"./card-CEQtzTox.js";import"./button-BHFcZZh0.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
