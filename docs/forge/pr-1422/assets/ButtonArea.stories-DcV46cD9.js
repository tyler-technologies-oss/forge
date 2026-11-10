import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-CbV23-8Y.js";import{l as a,m as o,s}from"./utils-CaRNnNM5.js";import{o as c,t as l}from"./icon-DTOjPWy9.js";import{D as u,Q as d,t as f}from"./tyler-icons-kuH1S-j5.js";import{r as p,t as m}from"./style-map-C_WKUe4Y.js";import{t as h}from"./card-Dq3fw6oM.js";import{t as g}from"./icon-button-D4UjEleU.js";import{t as _}from"./tooltip-Bj1aSRSt.js";import{n as v,t as y}from"./decorators--PUUPG6T.js";import{t as b}from"./button-area-DVvUhecQ.js";var x;function S(){return(S=e((()=>{x=`forge-card{--forge-card-padding:0;width:320px;max-width:100%}.content{align-items:center;gap:8px;padding:16px;display:flex}.content>:first-child{margin-inline-end:auto}`})))()}var C=t({Demo:()=>O,__namedExportsOrder:()=>k,default:()=>D}),w,T,E,D,O,k;function A(){return(A=e((()=>{i(),m(),o(),l(),f(),h(),b(),g(),_(),S(),y(),{action:w}=__STORYBOOK_MODULE_ACTIONS__,T=`forge-button-area`,c.define([d,u]),E=w(`click`),D={title:`Components/Button Area`,render:e=>{let t=a(e),i=t?p(t):r;return n`
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
    `},component:T,decorators:[v(x)],parameters:{actions:{disable:!0}},argTypes:{...s({tagName:T})},args:{}},O={},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{}`,...O.parameters?.docs?.source}}},k=[`Demo`]})))()}export{O as n,A as r,C as t};