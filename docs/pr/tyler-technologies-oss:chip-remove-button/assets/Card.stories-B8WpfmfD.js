import{x as n,E as m}from"./iframe-7bgTGKC7.js";import{g as p,s as c,r as g,c as f,a as b}from"./utils-DF51qB8z.js";import"./service-adapter-CffG5Lhq.js";import{I as v,E as y}from"./icon-kuXwuZAY.js";import"./index-5CPwzmQS.js";import{s as q}from"./decorators-C2qEljey.js";import{e as h}from"./class-map-Ccg7ypfC.js";import{o as x}from"./style-map-8Ng_MoAP.js";import"./card-31EeRefQ.js";import"./icon-button-BRdhOy60.js";import"./focus-indicator-CoRMRfCA.js";import"./state-layer-gAgMwMHF.js";import"./button-DH3Lg7cK.js";import"./scaffold-BrokB2Ba.js";import"./toolbar-U0axkpKl.js";const S=".demo-card{max-width:400px}.demo-card .forge-card-header-container{display:flex;justify-content:space-between;align-items:center}.demo-card .forge-card-header-container h3{margin:0}.demo-card .forge-card-footer{display:flex;justify-content:flex-end;gap:var(--forge-spacing-medium)}.scaffold-card{width:400px;--forge-card-padding: 0;--forge-card-height: 300px}.card-content{padding:16px;margin:0}",i="forge-card",C={title:"Components/Card",render:a=>{const s=f(i,a);return s.textContent=a.text,s},component:i,decorators:[q(S)],parameters:{actions:{disable:!0}},argTypes:{...p({tagName:i})},args:{raised:!1,text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?"}},e={},r={...c,render:()=>(v.define([y]),n`
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
    `)},t={...c,render:()=>n`
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
    `},o={...g,render:({text:a,raised:s,...l})=>{const d=b(l),u=d?x(d):m;return n` <div class="forge-card" class=${h({"forge-card":!0,"forge-card--raised":s})} style=${u}>${a}</div> `}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const M=["Demo","Styled","Scaffold","CSSOnly"],K=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:e,Scaffold:t,Styled:r,__namedExportsOrder:M,default:C},Symbol.toStringTag,{value:"Module"}));export{K as C,e as D,r as S,o as a,t as b};
