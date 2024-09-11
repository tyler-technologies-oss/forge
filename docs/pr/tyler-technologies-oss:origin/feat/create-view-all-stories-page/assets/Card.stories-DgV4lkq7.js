import"./lit-element-Dk2-kgKT.js";import{k as n,D as M}from"./lit-html-DZH-Jm0H.js";import{c as L,g as V,s as x,r as O,b as N}from"./utils-D1kchwVb.js";import"./constants-DjE6emXm.js";import{I as _}from"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import{z as A}from"./index-ByifSpfC.js";import{s as T}from"./decorators-DvEJi2JG.js";import{R as P}from"./class-map-D93gIiBE.js";import{s as $}from"./style-map-DxfbqtuX.js";import"./card-DdiAyW6J.js";import"./icon-button-XdSjYqUR.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./button-C5f1g9CL.js";import"./scaffold-R2qvsZCm.js";import"./toolbar-CtEd8mqT.js";const w=".demo-card{max-width:400px}.demo-card .forge-card-header-container{display:flex;justify-content:space-between;align-items:center}.demo-card .forge-card-header-container h3{margin:0}.demo-card .forge-card-footer{display:flex;justify-content:flex-end;gap:var(--forge-spacing-medium)}.scaffold-card{width:400px;--forge-card-padding: 0;--forge-card-height: 300px}.card-content{padding:16px;margin:0}",i="forge-card",I={title:"Components/Card",render:a=>{const s=L(i,a);return s.textContent=a.text,s},component:i,decorators:[T(w)],parameters:{actions:{disable:!0}},argTypes:{...V({tagName:i})},args:{raised:!1,text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?"}},e={},r={...x,render:()=>(_.define([A]),n`
      <div class="demo-card">
        <forge-card>
          <div class="forge-card-header-container">
            <h3 class="forge-typography--heading4">This is the card title</h3>
            <forge-icon-button aria-label="View more actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </div>

          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus
              numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
            </p>
          </div>

          <div class="forge-card-footer">
            <forge-button variant="outlined">Cancel</forge-button>
            <forge-button variant="raised">OK</forge-button>
          </div>
        </forge-card>
      </div>
    `)},t={...x,render:()=>n`
      <forge-card class="scaffold-card">
        <forge-scaffold>
          <forge-toolbar slot="header">
            <h1 slot="start">Lorem ipsum</h1>
          </forge-toolbar>

          <p slot="body" tabindex="0" class="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
            necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur
            illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
            necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
          </p>

          <forge-toolbar slot="footer" inverted>
            <forge-button type="outlined" slot="end"> Cancel </forge-button>
            <forge-button type="unelevated" slot="end" style="margin-left: 8px;"> Ok </forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-card>
    `},o={...O,render:({text:a,raised:s,...S})=>{const d=N(S),C=d?$(d):M;return n` <div class="forge-card" class=${P({"forge-card":!0,"forge-card--raised":s})} style=${C}>${a}</div> `}};var c,l,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(l=e.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,p,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconMoreVert]);
    return html\`
      <div class="demo-card">
        <forge-card>
          <div class="forge-card-header-container">
            <h3 class="forge-typography--heading4">This is the card title</h3>
            <forge-icon-button aria-label="View more actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </div>

          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus
              numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
            </p>
          </div>

          <div class="forge-card-footer">
            <forge-button variant="outlined">Cancel</forge-button>
            <forge-button variant="raised">OK</forge-button>
          </div>
        </forge-card>
      </div>
    \`;
  }
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,b,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-card class="scaffold-card">
        <forge-scaffold>
          <forge-toolbar slot="header">
            <h1 slot="start">Lorem ipsum</h1>
          </forge-toolbar>

          <p slot="body" tabindex="0" class="card-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
            necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur
            illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
            necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
          </p>

          <forge-toolbar slot="footer" inverted>
            <forge-button type="outlined" slot="end"> Cancel </forge-button>
            <forge-button type="unelevated" slot="end" style="margin-left: 8px;"> Ok </forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-card>
    \`;
  }
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,q,h;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...removeSourceStyleTagParams,
  render: ({
    text,
    raised,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-card': true,
      'forge-card--raised': raised
    };
    return html\` <div class="forge-card" class=\${classMap(classes)} style=\${style}>\${text}</div> \`;
  }
}`,...(h=(q=o.parameters)==null?void 0:q.docs)==null?void 0:h.source}}};const R=["Demo","Styled","Scaffold","CSSOnly"],re=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:e,Scaffold:t,Styled:r,__namedExportsOrder:R,default:I},Symbol.toStringTag,{value:"Module"}));export{re as C,e as D,r as S,o as a,t as b};
