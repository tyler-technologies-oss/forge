import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-BMUBXmXw.js";import{n as i,t as a}from"./decorators-H52BnBL2.js";import{o,t as s}from"./icon-CNNuo8Sp.js";import{Q as c,t as l}from"./tyler-icons-CLXzO0Q_.js";import{t as u}from"./app-bar-DWVaF7iL.js";import{t as d}from"./button-BI18qJIr.js";import{t as f}from"./card-orfgCoxN.js";import{t as p}from"./scaffold-NUY7AQ8t.js";var m;function h(){return(h=e((()=>{m=`.container{position:relative;overflow:hidden}.skip-to-main-content{background:var(--forge-theme-secondary);color:var(--forge-theme-on-secondary);height:24px;transition:transform var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);z-index:var(--forge-z-index-tooltip);border-radius:0 0 var(--forge-shape-medium) var(--forge-shape-medium);justify-content:center;align-items:center;padding:8px;display:flex;position:absolute;left:16px;transform:translateY(-100%)}.skip-to-main-content:focus{transform:translateY(0%)}`})))()}var g=t({Demo:()=>v,__namedExportsOrder:()=>y,default:()=>_}),_,v,y;function b(){return(b=e((()=>{r(),l(),a(),s(),p(),u(),f(),d(),h(),o.define(c),_={title:`Recipes/Accessibility/Skip To Main Content`,decorators:[i(m)],render:()=>n`
    <div class="container">
      <a class="skip-to-main-content" href="javascript: void(0);" onclick="event.preventDefault(); document.getElementById('content').focus();">
        Skip to main content
      </a>

      <forge-app-bar title-text="App Title">
        <forge-icon slot="logo" name="forge_logo"></forge-icon>
      </forge-app-bar>
      <main class="content" id="content" tabindex="0">
        <forge-card class="card">
          <forge-button variant="raised" onclick="document.querySelector('.skip-to-main-content').focus()"> Focus skip to main content link </forge-button>
        </forge-card>
      </main>
    </div>
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},v={},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y=[`Demo`]})))()}export{g as n,b as r,v as t};