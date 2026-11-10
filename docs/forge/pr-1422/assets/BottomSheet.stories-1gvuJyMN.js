import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-BbUsXXnT.js";import{l as a,m as o,s}from"./utils-C90un5XN.js";import{r as c,t as l}from"./style-map-C_WKUe4Y.js";import{i as u,n as d,t as f}from"./ref-CKV-hb40.js";import{t as p}from"./button-6zjUplxX.js";import{t as m}from"./toolbar-BJddCJGC.js";import{n as h,t as g}from"./decorators-D1191oN3.js";import{t as _}from"./bottom-sheet-bCk0bB4G.js";var v=t({Demo:()=>x,__namedExportsOrder:()=>S,default:()=>b}),y,b,x,S;function C(){return(C=e((()=>{i(),o(),g(),l(),f(),_(),p(),m(),y=`forge-bottom-sheet`,b={title:`Components/Bottom Sheet`,render:e=>{let t=a(e),i=t?c(t):r,o=d();function s(){o.value&&(o.value.open=!o.value.open)}function l(){o.value&&(o.value.open=!1)}return n`
      <forge-button variant="raised" @click=${s}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${u(o)}
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
          <forge-button slot="end" @click=${l}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `},component:y,decorators:[h(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)],argTypes:{...s({tagName:y,controls:{mode:{control:`select`,options:[`modal`,`inline-modal`,`nonmodal`]}}})},args:{open:!1,mode:`modal`,persistent:!1,fullscreen:!1}},x={},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S=[`Demo`]})))()}export{x as n,C as r,v as t};