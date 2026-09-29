import{b as t}from"./iframe-CeKgC4Tg.js";import{t as e}from"./tyler-icons-BSgf1RSL.js";import{s as r}from"./decorators-CHwmppAJ.js";import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-BaAa1Ck7.js";import"./scaffold-ua4VSBPI.js";import"./app-bar-menu-button-CE3vqm4N.js";import"./app-bar-profile-button-DQqARlTH.js";import"./menu-nDrc3LKh.js";import"./linear-progress-kQO48laS.js";import"./list-Oak2HfaZ.js";import"./popover-BaM9yRL2.js";import"./overlay-B0nIhxxX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Cp3qj50X.js";import"./list-item-STGQfT7T.js";import"./avatar-DQkbUFZT.js";import"./icon-button-BgdhWm-e.js";import"./card-Dv3Ot_ZX.js";import"./button-DkeZ1DSR.js";const n=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";i.define(e);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[r(n)],render:()=>t`
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
