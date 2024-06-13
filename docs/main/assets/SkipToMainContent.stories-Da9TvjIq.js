import{x as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-EVhofM2Q.js";import{I as s}from"./icon-CRQudG-b.js";import"./constants-D32Jr2uy.js";import"./scaffold-BmIot1by.js";import"./app-bar-profile-button-B1wScxS0.js";import"./state-layer-BRvIemvG.js";import"./focus-indicator-DCOk5mvy.js";import"./index-Dh0vMUMR.js";import"./badge-D_3MDpIf.js";import"./menu-CZIO_1KM.js";import"./linear-progress-DDuiLuf_.js";import"./list-dUPbNzHI.js";import"./popover-fL2nRo2T.js";import"./overlay-DiKhgH_u.js";import"./skeleton-BaEsbVV3.js";import"./profile-card-iLELcfNr.js";import"./avatar-DwiD4Mn-.js";import"./icon-button-BIREJzI3.js";import"./card-Dqt9DVr1.js";import"./button-BF9wbu_o.js";const m=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const c={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(m)],render:()=>i`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{o as D,F as S};
