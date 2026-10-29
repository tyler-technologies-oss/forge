import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,o as r,t as i}from"./lit-html-SpIZ5SkX.js";import{_ as a,l as o,m as s,s as c}from"./utils-BktKkMbo.js";import{t as l}from"./focus-indicator-CElv01V7.js";import{t as u}from"./state-layer-C1eYwx6g.js";import{r as d,t as f}from"./style-map-C_WKUe4Y.js";import{t as p}from"./card-DXbg2Pew.js";var m=t({CSSOnly:()=>y,Demo:()=>_,WithCard:()=>v,__namedExportsOrder:()=>b,default:()=>g}),h,g,_,v,y,b;function x(){return(x=e((()=>{r(),f(),s(),u(),l(),p(),h=`forge-state-layer`,g={title:`Components/State Layer`,render:e=>{let t=o(e),r=t?d(t):i;return n`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px;">Click me</button>
        <forge-state-layer target="target-btn" .disabled=${e.disabled} style=${r}> </forge-state-layer>
      </div>
    `},component:h,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:h,exclude:[`targetElement`,`target`]})},args:{disabled:!1}},_={},v={...a,render:()=>n`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${d({width:`300px`,outline:`none`,position:`relative`})}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    `},y={...a,render:()=>n` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> `},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const style = {
      width: '300px',
      outline: 'none',
      position: 'relative'
    };
    return html\`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=\${styleMap(style)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator></forge-focus-indicator>
        <forge-state-layer></forge-state-layer>
      </forge-card>
    \`;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\` <button class="forge-state-layer forge-state-layer__target" style="height: 100px; width: 100px;">CSS-only</button> \`
}`,...y.parameters?.docs?.source}}},b=[`Demo`,`WithCard`,`CSSOnly`]})))()}export{x as a,v as i,_ as n,m as r,y as t};