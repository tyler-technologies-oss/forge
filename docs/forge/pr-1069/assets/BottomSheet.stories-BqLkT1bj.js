import{A as l,b as m}from"./iframe-5LTq8wZ1.js";import{g as c,b as p}from"./utils-DLgMzbe-.js";import{s as d}from"./decorators-CQvurcvu.js";import{o as f}from"./style-map-B1hZUNKj.js";import{n as u,e as b}from"./ref-CqL3_LjC.js";import"./service-adapter-CffG5Lhq.js";import"./bottom-sheet-DCXcVNc8.js";import"./dialog-CvQkKqsY.js";import"./backdrop-ZqVEdIYI.js";import"./button-PV3UPUps.js";import"./focus-indicator-BUDKaCFA.js";import"./state-layer-u9rLNX9t.js";import"./toolbar-BK4uxBaY.js";const s="forge-bottom-sheet",g={title:"Components/Bottom Sheet",render:o=>{const r=p(o),a=r?f(r):l,e=b();function n(){e.value&&(e.value.open=!e.value.open)}function i(){e.value&&(e.value.open=!1)}return m`
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
