import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{l as a,m as o,s}from"./utils-C3ow8Ikc.js";import{n as c,t as l}from"./decorators-B2qNZTl0.js";import{t as u}from"./button-DoiHRyaz.js";import{r as d,t as f}from"./style-map-C_WKUe4Y.js";import{t as p}from"./toolbar-BPwJn0tl.js";import{t as m}from"./bottom-sheet-Cve2TWRV.js";import{i as h,n as g,t as _}from"./ref-DN8O4ptj.js";var v=t({Demo:()=>x,__namedExportsOrder:()=>S,default:()=>b}),y,b,x,S;function C(){return(C=e((()=>{i(),o(),l(),f(),_(),m(),u(),p(),y=`forge-bottom-sheet`,b={title:`Components/Bottom Sheet`,render:e=>{let t=a(e),i=t?d(t):r,o=g();function s(){o.value&&(o.value.open=!o.value.open)}function c(){o.value&&(o.value.open=!1)}return n`
      <forge-button variant="raised" @click=${s}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${h(o)}
        aria-labelledby="title"
        aria-describedby="message"
        .open=${e.open}
        .mode=${e.mode}
        .persistent=${e.persistent}
        .fullscreen=${e.fullscreen}
        aria-labelledby="title"
        aria-describedby="message"
        style=${i}>
        <div class="content">
          <h2 id="title">Bottom Sheet Title</h2>
          <p id="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec urna et felis.</p>
        </div>
        <forge-toolbar>
          <forge-button slot="end" @click=${c}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `},component:y,decorators:[c(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)],argTypes:{...s({tagName:y,controls:{mode:{control:`select`,options:[`modal`,`inline-modal`,`nonmodal`]}}})},args:{open:!1,mode:`modal`,persistent:!1,fullscreen:!1}},x={},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S=[`Demo`]})))()}export{x as n,C as r,v as t};