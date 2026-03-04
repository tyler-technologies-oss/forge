import{A as i,b as n}from"./iframe-6jvvl83j.js";import{o as s}from"./style-map-OsH3dYIv.js";import{g as c,b as d}from"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import{I as g,p as m,D as l}from"./tyler-icons-_ZRRE207.js";import"./card-ylDKlB-w.js";import"./button-area-B5Na-g1k.js";import"./icon-button-Bs31_lcM.js";import"./focus-indicator-uWMef9QC.js";import"./state-layer-CDycYdPe.js";import"./tooltip-D6IG9xiN.js";import"./overlay-CeKA2Vs0.js";import{s as p}from"./decorators-1bDp89Ox.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([m,l]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
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
    `},component:r,decorators:[p(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{R as B,o as D};
