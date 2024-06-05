import{x as c,T as d}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as f,g as u}from"./utils-Tr_H8vMI.js";import{s as g}from"./decorators-B79PnA5z.js";import{o as b}from"./style-map-D0ILlpbs.js";import{n as h,e as y}from"./ref-BorTy8X1.js";import"./bottom-sheet-BLPGhEjn.js";import"./dialog-BgSzVYZs.js";import"./backdrop-DkhyKz6z.js";import"./button-D5XxdyZ6.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import"./state-layer-b0IlkqgO.js";import"./toolbar-B2mSDDPY.js";const s="forge-bottom-sheet",S={title:"Components/Bottom Sheet",render:e=>{const r=f(e),l=r?b(r):d,t=y();function m(){t.value.open=!t.value.open}function p(){t.value.open=!1}return c`
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
  `)],argTypes:{...u({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};var n,a,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const v=["Demo"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{z as B,o as D};
