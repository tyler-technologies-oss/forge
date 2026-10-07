import{b as t}from"./iframe-Doaa3Kdk.js";import{t as e}from"./tyler-icons-NVf08gHb.js";import{s as r}from"./decorators-D0J9WVEL.js";import"./service-adapter-8tADcN_b.js";import{I as i}from"./icon-ozIZoPIz.js";import"./scaffold-Ca9xBuAs.js";import"./app-bar-menu-button-BI3-6Nbs.js";import"./app-bar-profile-button-CYjUw1jw.js";import"./menu-CX3Zlgon.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BGzEP44Z.js";import"./popover-K4jtrW_G.js";import"./overlay-DNJXwLw8.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CC97axfM.js";import"./list-item-MbhLyvqr.js";import"./avatar-dCcjkuLa.js";import"./icon-button-Ck8_ypsD.js";import"./card-DwPfAMk0.js";import"./button-BsMnzWz3.js";const n=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";i.define(e);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[r(n)],render:()=>t`
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
