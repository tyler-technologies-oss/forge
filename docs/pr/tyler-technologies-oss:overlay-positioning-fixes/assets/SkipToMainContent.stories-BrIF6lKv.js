import"./lit-element-B3QVTycr.js";import{x as i}from"./lit-html-CuBe1DX_.js";import{t as n}from"./index-fxMNKkgx.js";import{s as a}from"./decorators-CBntP_d2.js";import{I as s}from"./icon-DNSPAaK0.js";import"./feature-detection-C61kIZu7.js";import"./scaffold-CWDbFKLY.js";import"./app-bar-profile-button-Bo28iW7z.js";import"./state-layer-DA2sYK0k.js";import"./focus-indicator-B_9E-jM6.js";import"./index-CiLSBptl.js";import"./badge-DmYwJsoi.js";import"./menu-C1mUnqqH.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-Dh1-Do6h.js";import"./overlay-B56HkyOr.js";import"./skeleton-Cfb12itF.js";import"./avatar-CawfXDqL.js";import"./icon-button-BgvK8Gih.js";import"./card-CmSOzucO.js";import"./button-DOA_SM9C.js";const c=".container{position:relative;overflow:hidden}.skip-to-main-content{display:flex;align-items:center;justify-content:center;position:absolute;left:16px;background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;padding:8px;transform:translateY(-100%);transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium)}.skip-to-main-content:focus{transform:translateY(0)}";s.define(n);const m={title:"Recipes/Accessibility/Skip To Main Content",decorators:[a(c)],render:()=>i`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},o={};var t,e,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const p=["Demo"],E=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{o as D,E as S};
