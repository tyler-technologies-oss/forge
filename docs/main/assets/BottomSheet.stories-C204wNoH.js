import{E as l,x as m}from"./iframe-BnNJ1c1D.js";import{g as c,a as p}from"./utils-BkQyWQOx.js";import{s as d}from"./decorators-D1sM3mtL.js";import{o as f}from"./style-map-4FvYL1I6.js";import{n as u,e as g}from"./ref-BMpbqLXh.js";import"./service-adapter-CffG5Lhq.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./backdrop-BDRZVysw.js";import"./button-n5lu2Cl0.js";import"./focus-indicator-Di6NUjCA.js";import"./state-layer-gAgMwMHF.js";import"./toolbar-U0axkpKl.js";const s="forge-bottom-sheet",b={title:"Components/Bottom Sheet",render:e=>{const r=p(e),n=r?f(r):l,t=g();function a(){t.value.open=!t.value.open}function i(){t.value.open=!1}return m`
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
  `)],argTypes:{...c({tagName:s,controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]}}})},args:{open:!1,mode:"modal",persistent:!1,fullscreen:!1}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const h=["Demo"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:h,default:b},Symbol.toStringTag,{value:"Module"}));export{O as B,o as D};
