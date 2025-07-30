import{E as c,x as d}from"./iframe-lbQL-3vk.js";import{o as g}from"./style-map-CIaSIl6C.js";import{g as m,a as p}from"./utils-C0eAemYT.js";import"./feature-detection-uS6p5jc8.js";import{I as l,p as f,D as u}from"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./card-CktaMlIw.js";import"./button-area-Dgvn0HIt.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./icon-button-DkluvO-9.js";import"./tooltip-CcxiN_AO.js";import"./overlay-D-bkGTD9.js";import{s as b}from"./decorators-at_aTSgt.js";const v="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:y}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";l.define([f,u]);const _=y("click"),h={title:"Components/Button Area",render:t=>{const e=p(t),s=e?g(e):c;return d`
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
