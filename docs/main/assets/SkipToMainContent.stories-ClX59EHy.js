import"./lit-element-CYrSCkDY.js";import{x as i}from"./lit-html-CuBe1DX_.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-CS5VvIVh.js";import{I as s}from"./icon-D5yjdXv8.js";import"./feature-detection-CY6TVbRZ.js";import"./scaffold-BHN26cwL.js";import"./app-bar-profile-button-3vKr-FtP.js";import"./state-layer-sxQMIn2c.js";import"./focus-indicator-NbLDNrYT.js";import"./index-CiLSBptl.js";import"./menu-BtdGoaKI.js";import"./linear-progress-BTmLtQyy.js";import"./list-DOSD_vEq.js";import"./popover-CwjND5aw.js";import"./overlay-8j8D8Fh1.js";import"./skeleton-DtUhqb6H.js";import"./avatar-CVjn8Dcc.js";import"./icon-button-4fx-LScl.js";import"./card-yIs7HpNo.js";import"./button-CutPPNni.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(c)],render:()=>i`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,C as S};
