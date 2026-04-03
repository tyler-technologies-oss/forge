import{A as i,b as n}from"./iframe-1amZ02A4.js";import{o as s}from"./style-map-DhE_eh_-.js";import{g as c,b as d}from"./utils-s6uih_-r.js";import"./service-adapter-CoGDs2_3.js";import{I as g,p as m,D as p}from"./tyler-icons-CzoCbVaa.js";import"./index-DTwfV0k0.js";import"./card-BvgwV_S5.js";import"./button-area-CDYs9pSf.js";import"./icon-button-DIbOVWXo.js";import"./focus-indicator-C5TEsO7E.js";import"./state-layer-DFBFTfpT.js";import"./tooltip-CZ9l9EMe.js";import"./overlay-xfWlPvUl.js";import{s as l}from"./decorators-IKJY96DA.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([m,p]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${b} style=${a}>
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
    `},component:r,decorators:[l(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{$ as B,o as D};
