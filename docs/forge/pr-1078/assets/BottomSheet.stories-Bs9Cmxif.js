import{A as l,b as m}from"./iframe-6jvvl83j.js";import{g as c,b as p}from"./utils-BQsOXphk.js";import{s as d}from"./decorators-1bDp89Ox.js";import{o as f}from"./style-map-OsH3dYIv.js";import{n as u,e as b}from"./ref-CcO1L0WB.js";import"./service-adapter-CoGDs2_3.js";import"./bottom-sheet-gC932635.js";import"./dialog-CMWG5v4z.js";import"./backdrop-JQaHonK5.js";import"./button-gG20MWYF.js";import"./focus-indicator-uWMef9QC.js";import"./state-layer-CDycYdPe.js";import"./toolbar-CJhTaBYA.js";const s="forge-bottom-sheet",g={title:"Components/Bottom Sheet",render:o=>{const r=p(o),a=r?f(r):l,e=b();function n(){e.value&&(e.value.open=!e.value.open)}function i(){e.value&&(e.value.open=!1)}return m`
      <forge-button variant="raised" @click=${n}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${u(e)}
        aria-labelledby="title"
        aria-describedby="message"
        .open=${o.open}
        .mode=${o.mode}
        .persistent=${o.persistent}
        .fullscreen=${o.fullscreen}
        aria-labelledby="title"
        aria-describedby="message"
        style=${a}>
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
  `)],argTypes:{...c({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const h=["Demo"],x=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:h,default:g},Symbol.toStringTag,{value:"Module"}));export{x as B,t as D};
