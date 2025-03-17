import"./lit-element-JplMEnZc.js";import{x as c,E as d}from"./lit-html-paDGiEfB.js";import{b as f,g as u}from"./utils-DWPQW4DQ.js";import{s as g}from"./decorators-DOnQS6BC.js";import{o as b}from"./style-map-C9nPWcxA.js";import{n as h,e as y}from"./ref-DJjbfkOF.js";import"./feature-detection-DRCh51Sa.js";import"./bottom-sheet-irm73eKs.js";import"./dialog-CLmuz5Eb.js";import"./backdrop-CpAR1sZH.js";import"./button-BGYCwjxN.js";import"./focus-indicator-CcRMHyPf.js";import"./index-CiLSBptl.js";import"./state-layer-CeKzZv66.js";import"./toolbar-DrgqBcwu.js";const s="forge-bottom-sheet",S={title:"Components/Bottom Sheet",render:e=>{const r=f(e),l=r?b(r):d,t=y();function m(){t.value.open=!t.value.open}function p(){t.value.open=!1}return c`
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
  `)],argTypes:{...u({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};var n,a,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const v=["Demo"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{L as B,o as D};
