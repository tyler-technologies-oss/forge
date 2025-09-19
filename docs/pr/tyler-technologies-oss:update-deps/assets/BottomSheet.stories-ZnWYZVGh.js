import{E as l,x as m}from"./iframe-CIxyDGlH.js";import{g as p,a as c}from"./utils-D7XrLKwY.js";import{s as d}from"./decorators-sF-29HcM.js";import{o as f}from"./style-map-l48G0zrc.js";import{n as u,e as g}from"./ref-CqjIMQPV.js";import"./feature-detection-BwPJgXni.js";import"./bottom-sheet-uQt0svWI.js";import"./dialog-CYY7E81K.js";import"./backdrop-uKV88UE6.js";import"./button-Bjtey6FZ.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./state-layer-CLjAHnoF.js";import"./toolbar-BtzJRWgQ.js";const s="forge-bottom-sheet",b={title:"Components/Bottom Sheet",render:e=>{const r=c(e),n=r?f(r):l,t=g();function a(){t.value.open=!t.value.open}function i(){t.value.open=!1}return m`
      <forge-button variant="raised" @click=${a}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${u(t)}
        aria-labelledby="title"
        aria-describedby="message"
        .open=${e.open}
        .mode=${e.mode}
        .persistent=${e.persistent}
        .fullscreen=${e.fullscreen}
        aria-labelledby="title"
        aria-describedby="message"
        style=${n}>
        <div class="content">
          <h2 id="title">Bottom Sheet Title</h2>
          <p id="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec urna et felis.</p>
        </div>
        <forge-toolbar>
          <forge-button slot="end" @click=${i}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `},component:s,decorators:[d(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)],argTypes:{...p({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const h=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:h,default:b},Symbol.toStringTag,{value:"Module"}));export{j as B,o as D};
