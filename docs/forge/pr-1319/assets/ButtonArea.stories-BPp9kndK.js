import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{l as a,m as o,s}from"./utils-Cppiha4b.js";import{n as c,t as l}from"./decorators-v5gVx1cJ.js";import{o as u,t as d}from"./icon-DzM2_TPc.js";import{C as f,K as p,t as m}from"./tyler-icons-CLXzO0Q_.js";import{t as h}from"./icon-button-Dibkr9Dk.js";import{t as g}from"./tooltip-Ke7Idkd8.js";import{r as _,t as v}from"./style-map-C_WKUe4Y.js";import{t as y}from"./button-area-CsoVQyTR.js";import{t as b}from"./card-Bo_4vCUn.js";var x;function S(){return(S=e((()=>{x=`forge-card{--forge-card-padding:0;width:320px;max-width:100%}.content{align-items:center;gap:8px;padding:16px;display:flex}.content>:first-child{margin-inline-end:auto}`})))()}var C=t({Demo:()=>O,__namedExportsOrder:()=>k,default:()=>D}),w,T,E,D,O,k;function A(){return(A=e((()=>{i(),v(),o(),d(),m(),b(),y(),h(),g(),S(),l(),{action:w}=__STORYBOOK_MODULE_ACTIONS__,T=`forge-button-area`,u.define([p,f]),E=w(`click`),D={title:`Components/Button Area`,render:e=>{let t=a(e),i=t?_(t):r;return n`
      <forge-card>
        <forge-button-area ?disabled=${e.disabled} @click=${E} style=${i}>
          <button slot="button" aria-labelledby="button-heading"></button>
          <div class="content">
            <div>
              <div id="button-heading">Heading</div>
              <div>Content</div>
            </div>
            <forge-icon-button forge-ignore>
              <forge-icon role="img" name="favorite" aria-label="A heart graphic"></forge-icon>
            </forge-icon-button>
            <forge-tooltip>Favorite</forge-tooltip>
            <forge-icon name="chevron_right"></forge-icon>
          </div>
        </forge-button-area>
      </forge-card>
    `},component:T,decorators:[c(x)],parameters:{actions:{disable:!0}},argTypes:{...s({tagName:T})},args:{}},O={},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{}`,...O.parameters?.docs?.source}}},k=[`Demo`]})))()}export{O as n,A as r,C as t};