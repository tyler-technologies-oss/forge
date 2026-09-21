import{b as t}from"./iframe-BaLQ_A2d.js";import{I as e,t as r}from"./tyler-icons-DfIaYIv7.js";import{s as n}from"./decorators-Dq8gzDyS.js";import"./service-adapter-DlT-lJx7.js";import"./scaffold-D8DtzjhO.js";import"./app-bar-menu-button-DrBTzQf-.js";import"./app-bar-profile-button-DpM6C9r4.js";import"./menu-Bpyhfaa_.js";import"./linear-progress-VpC6qUWa.js";import"./list-CtFWDf9k.js";import"./popover-BqWv_wJF.js";import"./overlay-DFZfpbSi.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnMa3F30.js";import"./list-item-Bra_7jX-.js";import"./avatar-BzhNyOik.js";import"./icon-button-IKvoqhNZ.js";import"./card-BdewD5or.js";import"./button-C5R_qqOK.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
