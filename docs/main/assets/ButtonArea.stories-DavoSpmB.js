import"./lit-element-Dk2-kgKT.js";import{k as c,D as m}from"./lit-html-DZH-Jm0H.js";import{s as p}from"./style-map-DxfbqtuX.js";import{a as d}from"./chunk-454WOBUV-CM0pFb8Z.js";import{b as g,g as l}from"./utils-CCkBKb7B.js";import"./constants-DjE6emXm.js";import{I as f}from"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import{j as u,y as b}from"./index-ByifSpfC.js";import"./card-UYpuS1ee.js";import"./button-area-B6hDHYsN.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./icon-button-Bwf4zXUE.js";import"./tooltip-CeIZUV-W.js";import"./overlay-BjQy6-wl.js";import{s as v}from"./decorators-DvEJi2JG.js";const y="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",r="forge-button-area";f.define([u,b]);const h=d("click"),x={title:"Components/Button Area",render:t=>{const e=g(t),s=e?p(e):m;return c`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${h} style=${s}>
          <div class="content">
            <div>
              <div>Heading</div>
              <div>Content</div>
            </div>
            <forge-icon-button>
              <forge-icon role="img" name="favorite" aria-label="A heart graphic"></forge-icon>
            </forge-icon-button>
            <forge-tooltip>Favorite</forge-tooltip>
            <forge-icon name="chevron_right"></forge-icon>
          </div>
        </forge-button-area>
      </forge-card>
    `},component:r,decorators:[v(y)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:r})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const A=["Demo"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{H as B,o as D};
