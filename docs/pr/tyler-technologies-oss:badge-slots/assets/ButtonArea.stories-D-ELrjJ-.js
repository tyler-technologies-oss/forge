import"./lit-element-BuSzPo2N.js";import{E as c,x as m}from"./lit-html-Ox1a2bD1.js";import{o as d}from"./style-map-CeIg-cuG.js";import{a as g}from"./index-B-lxVbXh.js";import{g as p,b as l}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import{I as f,p as u,D as b}from"./icon-Bqgt-0wI.js";import"./index-CiLSBptl.js";import"./card-Cvm6cje1.js";import"./button-area-DkxJjLzq.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./icon-button-BkG6pY8m.js";import"./tooltip-BRjtM3KC.js";import"./overlay-D__9laOM.js";import{s as v}from"./decorators-CiKOYuay.js";const y="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",r="forge-button-area";f.define([u,b]);const h=g("click"),x={title:"Components/Button Area",render:t=>{const e=l(t),s=e?d(e):c;return m`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${h} style=${s}>
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
    `},component:r,decorators:[v(y)],parameters:{actions:{disable:!0}},argTypes:{...p({tagName:r})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const A=["Demo"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:A,default:x},Symbol.toStringTag,{value:"Module"}));export{z as B,o as D};
