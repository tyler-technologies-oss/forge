import{x as n}from"./iframe-BL13dRo5.js";import{I as i,d as a}from"./icon-eJOvSyyv.js";import{s}from"./decorators-uPZHYzeA.js";import"./service-adapter-BykFeYYZ.js";import"./scaffold-DGBqen_X.js";import"./app-bar-profile-button-D_2TncIo.js";import"./state-layer-BRTtEqto.js";import"./focus-indicator-DFzG-d7S.js";import"./index-CiLSBptl.js";import"./menu-Qg1eW1VP.js";import"./linear-progress-BTaob5x2.js";import"./list-CDPcagJC.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./avatar-D5vVnc0a.js";import"./icon-button-cJUUKUK2.js";import"./card-CVF6hqjN.js";import"./button-B31EV2cV.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";i.define(a);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[s(c)],render:()=>n`
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
