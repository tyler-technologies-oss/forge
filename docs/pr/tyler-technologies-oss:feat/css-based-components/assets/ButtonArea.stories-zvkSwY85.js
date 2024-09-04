import{x as c,T as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as p}from"./style-map-D0ILlpbs.js";import{a as d}from"./chunk-454WOBUV-CM0pFb8Z.js";import{b as g,g as l}from"./utils-CeeIIWTn.js";import"./constants-DjE6emXm.js";import{I as f}from"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import{j as u,y as b}from"./index-ByifSpfC.js";import"./card-AhK8i1VF.js";import"./button-area-JoSa9-qY.js";import"./focus-indicator-BpCDYqsq.js";import"./state-layer-DkOkOFSZ.js";import"./icon-button-B5lcHsAP.js";import"./tooltip-DHBxVVPY.js";import"./overlay-DasBtrG-.js";import{s as v}from"./decorators-EVhofM2Q.js";const y="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",e="forge-button-area";f.define([u,b]);const h=d("click"),x={title:"Components/Button Area",render:t=>{const r=g(t),s=r?p(r):m;return c`
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
