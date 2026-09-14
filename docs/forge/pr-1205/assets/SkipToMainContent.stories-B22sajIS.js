import{b as t}from"./iframe-BJPqycEt.js";import{I as e,t as r}from"./tyler-icons-DNkpPon9.js";import{s as n}from"./decorators-C-6GqXtv.js";import"./service-adapter-8tADcN_b.js";import"./scaffold-DVCC5lGr.js";import"./app-bar-profile-button-CF4BOGc0.js";import"./menu-CEHEj-7z.js";import"./linear-progress-C6Yw2NU-.js";import"./list-DgxEhhpR.js";import"./popover-DmcVXRTb.js";import"./overlay-Dzu_blL_.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-PcZLAGQ_.js";import"./avatar-5ILapoRQ.js";import"./icon-button-BZVzCxro.js";import"./focus-indicator-DFu3RSBr.js";import"./state-layer-BUK1_NC2.js";import"./card-N3qjjXm_.js";import"./button-BRy-f3-q.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
