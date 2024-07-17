import{x as c,T as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as p}from"./style-map-D0ILlpbs.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as g,g as l}from"./utils-BJOK626P.js";import"./constants-DjE6emXm.js";import{I as f}from"./icon-DjINFoyU.js";import"./index-Dh0vMUMR.js";import{j as u,w as v}from"./index-CIZ3m0iD.js";import"./card-AhK8i1VF.js";import"./button-area-wDc4dDo9.js";import"./focus-indicator-BPFZRBe9.js";import"./state-layer-D8bHAvjj.js";import"./icon-button-B2LQlK1e.js";import"./tooltip-9A6XBLdW.js";import"./overlay-CyEwb-fW.js";import{s as b}from"./decorators-EVhofM2Q.js";const y="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",e="forge-button-area";f.define([u,v]);const h=d("click"),x={title:"Components/Button Area",render:t=>{const r=g(t),s=r?p(r):m;return c`
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
    `},component:e,decorators:[b(y)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:e})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const A=["Demo"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{H as B,o as D};
