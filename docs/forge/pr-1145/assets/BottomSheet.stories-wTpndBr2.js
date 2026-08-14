import{A as l,b as m}from"./iframe-CX1-OGuF.js";import{g as c,b as p}from"./utils-C5IA10r7.js";import{s as d}from"./decorators-qUkueCKE.js";import{o as f}from"./style-map-B2UznZRL.js";import{n as u,e as b}from"./ref-oqaQl1KO.js";import"./service-adapter-8tADcN_b.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./backdrop-3KzDwztH.js";import"./button-D0Htf8_P.js";import"./focus-indicator-sdf0mJJv.js";import"./state-layer-Wu0zWm6m.js";import"./toolbar-yKvdxy5C.js";const s="forge-bottom-sheet",g={title:"Components/Bottom Sheet",render:o=>{const r=p(o),a=r?f(r):l,e=b();function n(){e.value&&(e.value.open=!e.value.open)}function i(){e.value&&(e.value.open=!1)}return m`
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
