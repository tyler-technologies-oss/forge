import"./lit-element-BuSzPo2N.js";import{E as c,x as d}from"./lit-html-Ox1a2bD1.js";import{g as f,b as u}from"./utils-C9ubTmun.js";import{s as g}from"./decorators-CiKOYuay.js";import{o as b}from"./style-map-CeIg-cuG.js";import{n as h,e as y}from"./ref-DxjK-Y8K.js";import"./feature-detection-CY6TVbRZ.js";import"./bottom-sheet-CgdS1vNC.js";import"./dialog-DEObTM6-.js";import"./backdrop-Bv12Tb1U.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./toolbar-CJj-iw1_.js";const s="forge-bottom-sheet",S={title:"Components/Bottom Sheet",render:e=>{const r=u(e),l=r?b(r):c,t=y();function m(){t.value.open=!t.value.open}function p(){t.value.open=!1}return d`
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
  `)],argTypes:{...f({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};var n,a,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const v=["Demo"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{L as B,o as D};
