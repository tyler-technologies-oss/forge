import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{_ as a,g as o,l as s,m as c,o as l,s as u}from"./utils-BifgMLEM.js";import{n as d,t as f}from"./decorators-CjEroPVL.js";import{t as p}from"./class-map-DEew1OiS.js";import{t as m}from"./class-map-8zp5OV2u.js";import{o as h,t as g}from"./icon-BDzt98o-.js";import{Nt as _,t as v}from"./tyler-icons-CLXzO0Q_.js";import{t as y}from"./icon-button-CSN2n-kp.js";import{t as b}from"./button-I2ZLPCXL.js";import{r as x,t as S}from"./style-map-C_WKUe4Y.js";import{t as C}from"./toolbar-CFNwOC98.js";import{t as w}from"./card-BIAePCFL.js";import{t as T}from"./scaffold-NUY7AQ8t.js";var E;function D(){return(D=e((()=>{E=`.demo-card{max-width:400px}.demo-card .forge-card-header-container{justify-content:space-between;align-items:center;display:flex}.demo-card .forge-card-header-container h3{margin:0}.demo-card .forge-card-footer{justify-content:flex-end;gap:var(--forge-spacing-medium);display:flex}.scaffold-card{--forge-card-padding:0;--forge-card-height:300px;width:400px}.card-content{margin:0;padding:16px}`})))()}var O=t({CSSOnly:()=>P,Demo:()=>j,Scaffold:()=>N,Styled:()=>M,__namedExportsOrder:()=>F,default:()=>A}),k,A,j,M,N,P,F;function I(){return(I=e((()=>{i(),c(),g(),v(),f(),m(),S(),w(),y(),b(),T(),C(),D(),k=`forge-card`,A={title:`Components/Card`,render:e=>{let t=l(k,e);return t.textContent=e.text,t},component:k,decorators:[d(E)],parameters:{actions:{disable:!0}},argTypes:{...u({tagName:k})},args:{raised:!1,text:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?`}},j={},M={...a,render:()=>(h.define([_]),n`
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
    `)},N={...a,render:()=>n`
    <forge-card class="scaffold-card">
      <forge-scaffold>
        <forge-toolbar slot="header">
          <h1 slot="start">Lorem ipsum</h1>
        </forge-toolbar>

        <p slot="body" tabindex="0" class="card-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas
          sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <forge-toolbar slot="footer" inverted>
          <forge-button type="outlined" slot="end"> Cancel </forge-button>
          <forge-button type="unelevated" slot="end" style="margin-left: 8px;"> Ok </forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-card>
  `},P={...o,render:({text:e,raised:t,...i})=>{let a=s(i),o=a?x(a):r;return n` <div class="forge-card" class=${p({"forge-card":!0,"forge-card--raised":t})} style=${o}>${e}</div> `}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-card class="scaffold-card">
      <forge-scaffold>
        <forge-toolbar slot="header">
          <h1 slot="start">Lorem ipsum</h1>
        </forge-toolbar>

        <p slot="body" tabindex="0" class="card-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas
          sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero
          necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <forge-toolbar slot="footer" inverted>
          <forge-button type="outlined" slot="end"> Cancel </forge-button>
          <forge-button type="unelevated" slot="end" style="margin-left: 8px;"> Ok </forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-card>
  \`
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F=[`Demo`,`Styled`,`Scaffold`,`CSSOnly`]})))()}export{M as a,N as i,O as n,I as o,j as r,P as t};