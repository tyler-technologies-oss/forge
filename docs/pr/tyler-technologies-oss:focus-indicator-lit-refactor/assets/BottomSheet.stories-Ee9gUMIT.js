import{E as p,x as d}from"./iframe-Dusku7t3.js";import{g as f,a as u}from"./utils-D0zOu5id.js";import{s as g}from"./decorators-DtyRfpnz.js";import{o as b}from"./style-map-C8mGDCe8.js";import{n as h,e as y}from"./ref-BvC3Wnqa.js";import"./service-adapter-BykFeYYZ.js";import"./bottom-sheet-B0-LCUir.js";import"./dialog-bZFrz6KW.js";import"./backdrop-BqEK3-r8.js";import"./button-DNlRsDtE.js";import"./focus-indicator-B6EU3cOJ.js";import"./state-layer-BRTtEqto.js";import"./toolbar-Bv8KpWT6.js";const s="forge-bottom-sheet",S={title:"Components/Bottom Sheet",render:e=>{const r=u(e),l=r?b(r):p,t=y();function m(){t.value.open=!t.value.open}function c(){t.value.open=!1}return d`
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
          <forge-button slot="end" @click=${c}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `},component:s,decorators:[g(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)],argTypes:{...f({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};var n,a,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const v=["Demo"],w=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:v,default:S},Symbol.toStringTag,{value:"Module"}));export{w as B,o as D};
