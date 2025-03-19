import"./lit-element-JplMEnZc.js";import{x as c,E as m}from"./lit-html-paDGiEfB.js";import{o as d}from"./style-map-C9nPWcxA.js";import{a as p}from"./index-Cf3axooF.js";import{b as g,g as l}from"./utils-C0KK1NN_.js";import"./feature-detection-DRCh51Sa.js";import{I as f}from"./icon-CND1_bFA.js";import"./index-CiLSBptl.js";import{j as u,y as b}from"./index-ByifSpfC.js";import"./card-C10NOeAn.js";import"./button-area-DtiTLFMd.js";import"./focus-indicator-BjVpbo_K.js";import"./state-layer-DCupnvce.js";import"./icon-button-DmyR8RGa.js";import"./tooltip-D2_zu5SB.js";import"./overlay-B9ywocRd.js";import{s as y}from"./decorators-DOnQS6BC.js";const v="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",r="forge-button-area";f.define([u,b]);const h=p("click"),x={title:"Components/Button Area",render:t=>{const e=g(t),s=e?d(e):m;return c`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${h} style=${s}>
          <button slot="button" aria-labelledby="button-heading"></button>
          <div class="content">
            <div>
              <div id="button-heading">Heading</div>
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
    `},component:r,decorators:[y(v)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:r})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const A=["Demo"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{H as B,o as D};
