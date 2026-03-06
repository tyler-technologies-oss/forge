import{A as l,b as m}from"./iframe-HlIX8nsI.js";import{g as c,b as p}from"./utils-DhPatzMP.js";import{s as d}from"./decorators-D7VHZGxl.js";import{o as f}from"./style-map-CJVXeR4e.js";import{n as u,e as b}from"./ref-DHmNwni-.js";import"./service-adapter-CoGDs2_3.js";import"./bottom-sheet-DDpnIaAl.js";import"./dialog-DnEdA4Zv.js";import"./backdrop-oZnGSNKb.js";import"./button-C32nRzKT.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import"./toolbar-DZNz2UmX.js";const s="forge-bottom-sheet",g={title:"Components/Bottom Sheet",render:o=>{const r=p(o),a=r?f(r):l,e=b();function n(){e.value&&(e.value.open=!e.value.open)}function i(){e.value&&(e.value.open=!1)}return m`
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
