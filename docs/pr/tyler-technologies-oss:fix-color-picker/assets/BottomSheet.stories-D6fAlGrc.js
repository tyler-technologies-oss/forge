import{E as c,x as d}from"./iframe-D16yKRLu.js";import{g as f,a as u}from"./utils-CwQ2mEzo.js";import{s as g}from"./decorators-B6_piezP.js";import{o as b}from"./style-map-CoFm7nfi.js";import{n as h,e as y}from"./ref-C_aqJkpv.js";import"./feature-detection-CY6TVbRZ.js";import"./bottom-sheet-BUXtQmmm.js";import"./dialog-BAjKLc2i.js";import"./backdrop-Bv12Tb1U.js";import"./button-CLmfPElC.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./toolbar-CJj-iw1_.js";const s="forge-bottom-sheet",S={title:"Components/Bottom Sheet",render:e=>{const r=u(e),l=r?b(r):c,t=y();function m(){t.value.open=!t.value.open}function p(){t.value.open=!1}return d`
      <forge-button variant="raised" @click=${m}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${h(t)}
        aria-labelledby="title"
        aria-describedby="message"
        .open=${e.open}
        .mode=${e.mode}
        .persistent=${e.persistent}
        .fullscreen=${e.fullscreen}
        aria-labelledby="title"
        aria-describedby="message"
        style=${l}>
        <div class="content">
          <h2 id="title">Bottom Sheet Title</h2>
          <p id="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec urna et felis.</p>
        </div>
        <forge-toolbar>
          <forge-button slot="end" @click=${p}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `},component:s,decorators:[g(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)],argTypes:{...f({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};var n,a,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const v=["Demo"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{z as B,o as D};
