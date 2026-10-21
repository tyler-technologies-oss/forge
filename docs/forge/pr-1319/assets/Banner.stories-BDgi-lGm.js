import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{_ as i,m as a,n as o,o as s,s as c}from"./utils-Cppiha4b.js";import{o as l,t as u}from"./icon-DzM2_TPc.js";import{Pt as d,t as f}from"./tyler-icons-CLXzO0Q_.js";import{t as p}from"./icon-button-Dibkr9Dk.js";import{t as m}from"./button-oXbpcqR0.js";import{n as h,t as g}from"./banner-CRiI6W1t.js";var _=t({CSSOnly:()=>E,Combined:()=>T,Default:()=>C,Themed:()=>w,__namedExportsOrder:()=>D,default:()=>S}),v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{r(),f(),u(),g(),p(),m(),a(),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=`forge-banner`,b=v(`forge-banner-dismissed`),x=v(`forge-banner-before-dismiss`),S={title:`Components/Banner`,render:e=>{let t=s(`forge-banner`,e);return t.addEventListener(`forge-banner-dismissed`,b),t.addEventListener(`forge-banner-before-dismiss`,x),t.innerHTML=e.text,t},component:y,argTypes:{...c({tagName:y,exclude:[`canDismiss`],controls:{theme:{control:`select`,options:[...o,`info-secondary`]}}})},args:{theme:h.defaults.THEME,text:`Minim sunt eu laborum labore minim.`,dismissed:!1,persistent:!1}},C={},w={...i,render:()=>n`
    <div style="display: flex; gap: 12px; flex-direction: column;">
      <forge-banner theme="error">Error</forge-banner>
      <forge-banner theme="warning">Warning</forge-banner>
      <forge-banner theme="success">Success</forge-banner>
      <forge-banner theme="info">Info (default)</forge-banner>
      <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
    </div>
  `},T={...i,render:()=>(l.define(d),n`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    `)},E={...i,render:()=>n`
    <div class="forge-banner">
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72A6.873 6.873 0 005.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z" />
      </svg>
      <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
      <button type="button" class="forge-button forge-button--outlined">Learn more</button>
    </div>
  `},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; gap: 12px; flex-direction: column;">
      <forge-banner theme="error">Error</forge-banner>
      <forge-banner theme="warning">Warning</forge-banner>
      <forge-banner theme="success">Success</forge-banner>
      <forge-banner theme="info">Info (default)</forge-banner>
      <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
    </div>
  \`
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html\`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    \`;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div class="forge-banner">
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72A6.873 6.873 0 005.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z" />
      </svg>
      <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
      <button type="button" class="forge-button forge-button--outlined">Learn more</button>
    </div>
  \`
}`,...E.parameters?.docs?.source}}},D=[`Default`,`Themed`,`Combined`,`CSSOnly`]})))()}export{w as a,C as i,E as n,O as o,T as r,_ as t};