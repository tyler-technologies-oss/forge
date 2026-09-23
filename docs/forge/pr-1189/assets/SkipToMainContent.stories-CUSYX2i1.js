import{b as t}from"./iframe-DhPPATOI.js";import{I as e,t as r}from"./icon-DaCKLlYs.js";import{s as n}from"./decorators-BUCTEMc-.js";import"./service-adapter-gy1PbA1l.js";import"./scaffold-BVJBr1z1.js";import"./app-bar-menu-button-DD6-mDnN.js";import"./app-bar-profile-button-kCSUMpdG.js";import"./menu-BDuuGK0D.js";import"./linear-progress-BGu4ylYb.js";import"./list-BQeID-EI.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-D0Kw-TGm.js";import"./list-item-Czcdb5bP.js";import"./avatar-Db8N8ihi.js";import"./icon-button-C2v-Sinx.js";import"./card-xZjk_lrn.js";import"./button-D5tK2bf-.js";const i=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";e.define(r);const a={title:"Recipes/Accessibility/Skip To Main Content",decorators:[n(i)],render:()=>t`
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
