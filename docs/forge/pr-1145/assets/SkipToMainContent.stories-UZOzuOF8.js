import{b as t}from"./iframe-BWAobhOu.js";import{I as e,t as r}from"./tyler-icons-C2isZNDF.js";import{s as n}from"./decorators-B823tmM6.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-CufLEZ-a.js";import"./app-bar-profile-button-Dt1-aPj1.js";import"./menu-Db5tVldy.js";import"./linear-progress-CsGp1g6o.js";import"./list-BVxyNe29.js";import"./popover-CMixvJRM.js";import"./overlay-B2Oq3AqY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B7Gn8FGS.js";import"./avatar-CNy2wjid.js";import"./icon-button-CjKKMho2.js";import"./focus-indicator-DsmueVAt.js";import"./state-layer-Wu0zWm6m.js";import"./card-D9IB3zRq.js";import"./button-BZXwUSWo.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
