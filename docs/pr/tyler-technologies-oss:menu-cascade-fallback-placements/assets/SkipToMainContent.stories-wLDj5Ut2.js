import{x as n}from"./iframe-CA3KmJ8P.js";import{I as i,d as a}from"./icon-B8CdcxqJ.js";import{s}from"./decorators-D3LF5jcQ.js";import"./feature-detection-uS6p5jc8.js";import"./scaffold-CGyusmPL.js";import"./app-bar-profile-button-DScxmScP.js";import"./state-layer-BFwsAUDA.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./menu-BfPyyeAQ.js";import"./linear-progress-2PahUgVv.js";import"./list-z5iQB-6r.js";import"./popover-xi3V_Oll.js";import"./overlay-D-bkGTD9.js";import"./skeleton-C4EH8VF8.js";import"./avatar-C5R7m1uP.js";import"./icon-button-DkluvO-9.js";import"./card-GruM3ltq.js";import"./button-r2EMLpWm.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";i.define(a);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[s(c)],render:()=>n`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,O as S};
