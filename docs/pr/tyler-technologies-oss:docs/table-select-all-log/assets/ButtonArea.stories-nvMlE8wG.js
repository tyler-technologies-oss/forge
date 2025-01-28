import"./lit-element-CgJqSpuc.js";import{x as c,E as m}from"./lit-html-paDGiEfB.js";import{o as p}from"./style-map-C9nPWcxA.js";import{a as d}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{b as g,g as l}from"./utils-tyit5L24.js";import"./constants-CFf81ck9.js";import{I as f}from"./icon-FszQmWVN.js";import"./index-BmocOEUj.js";import{j as u,y as b}from"./index-ByifSpfC.js";import"./card-CgGa1_Bt.js";import"./button-area-Dixm_br9.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./icon-button-CSqhF-TJ.js";import"./tooltip-DtM9-QOp.js";import"./overlay-DUpFUxF7.js";import{s as v}from"./decorators-DJTA_amK.js";const y="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",e="forge-button-area";f.define([u,b]);const h=d("click"),x={title:"Components/Button Area",render:t=>{const r=g(t),s=r?p(r):m;return c`
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
    `},component:e,decorators:[v(y)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:e})},args:{}},o={};var i,a,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const A=["Demo"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{H as B,o as D};
