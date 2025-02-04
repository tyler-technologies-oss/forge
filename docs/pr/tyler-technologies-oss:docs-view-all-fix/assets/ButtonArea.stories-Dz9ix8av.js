import"./lit-element-JplMEnZc.js";import{x as c,E as m}from"./lit-html-paDGiEfB.js";import{o as d}from"./style-map-C9nPWcxA.js";import{a as p}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{b as g,g as l}from"./utils-cDewhVsU.js";import"./feature-detection-ONR9WHvu.js";import{I as f}from"./icon-B5S0VGIT.js";import"./index-BmocOEUj.js";import{j as u,y as b}from"./index-ByifSpfC.js";import"./card-WC0g-TsN.js";import"./button-area-DruBtSaC.js";import"./focus-indicator-R2otSvsR.js";import"./state-layer-B7GOb8iB.js";import"./icon-button-DfODsaKD.js";import"./tooltip-D0ywHBAv.js";import"./overlay-DAcircNE.js";import{s as y}from"./decorators-DOnQS6BC.js";const v="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",r="forge-button-area";f.define([u,b]);const h=p("click"),x={title:"Components/Button Area",render:t=>{const e=g(t),s=e?d(e):m;return c`
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
