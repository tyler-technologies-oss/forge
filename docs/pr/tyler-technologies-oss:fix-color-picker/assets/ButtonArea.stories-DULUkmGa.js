import{E as c,x as d}from"./iframe-D16yKRLu.js";import{o as g}from"./style-map-CoFm7nfi.js";import{g as m,a as l}from"./utils-CwQ2mEzo.js";import"./feature-detection-CY6TVbRZ.js";import{I as p,o as f,C as u}from"./icon-Bh1zyXYd.js";import"./index-CiLSBptl.js";import"./card-C9ZEzKzF.js";import"./button-area-DkxJjLzq.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./icon-button-CuEKyh48.js";import"./tooltip-DJb4FXvJ.js";import"./overlay-CmLQVoKV.js";import{s as b}from"./decorators-B6_piezP.js";const v="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:y}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";p.define([f,u]);const _=y("click"),h={title:"Components/Button Area",render:t=>{const e=l(t),s=e?g(e):c;return d`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${_} style=${s}>
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
    `},component:r,decorators:[b(v)],parameters:{actions:{disable:!0}},argTypes:{...m({tagName:r})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const x=["Demo"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{F as B,o as D};
