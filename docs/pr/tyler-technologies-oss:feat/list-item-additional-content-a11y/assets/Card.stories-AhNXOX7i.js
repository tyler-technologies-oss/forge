import{x as n,E as M}from"./iframe-C5EPRJGw.js";import{g as L,s as x,r as V,c as O,a as N}from"./utils-C_Nqz1Py.js";import"./feature-detection-uS6p5jc8.js";import{I as _,E as A}from"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import{s as T}from"./decorators-URl6pAro.js";import{e as P}from"./class-map-sM9kDHFr.js";import{o as $}from"./style-map-DoOdzgxO.js";import"./card-CBWgNCyZ.js";import"./icon-button-C-UNXlAt.js";import"./focus-indicator-BeibAi2h.js";import"./state-layer-C7sW6v-0.js";import"./button-DEhPRUdY.js";import"./scaffold-CGyusmPL.js";import"./toolbar-Byb6kcao.js";const w=".demo-card{max-width:400px}.demo-card .forge-card-header-container{display:flex;justify-content:space-between;align-items:center}.demo-card .forge-card-header-container h3{margin:0}.demo-card .forge-card-footer{display:flex;justify-content:flex-end;gap:var(--forge-spacing-medium)}.scaffold-card{width:400px;--forge-card-padding: 0;--forge-card-height: 300px}.card-content{padding:16px;margin:0}",i="forge-card",E={title:"Components/Card",render:a=>{const s=O(i,a);return s.textContent=a.text,s},component:i,decorators:[T(w)],parameters:{actions:{disable:!0}},argTypes:{...L({tagName:i})},args:{raised:!1,text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?"}},e={},r={...x,render:()=>(_.define([A]),n`
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
    `},o={...V,render:({text:a,raised:s,...S})=>{const d=N(S),C=d?$(d):M;return n` <div class="forge-card" class=${P({"forge-card":!0,"forge-card--raised":s})} style=${C}>${a}</div> `}};var c,l,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(l=e.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,p,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(h=(q=o.parameters)==null?void 0:q.docs)==null?void 0:h.source}}};const I=["Demo","Styled","Scaffold","CSSOnly"],Z=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:e,Scaffold:t,Styled:r,__namedExportsOrder:I,default:E},Symbol.toStringTag,{value:"Module"}));export{Z as C,e as D,r as S,o as a,t as b};
